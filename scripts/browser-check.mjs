import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Uses installed Chrome; set BROWSER_CHANNEL=msedge or install Playwright Chromium
// and use BROWSER_CHANNEL=chromium. Start `npm run dev` in another terminal.
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || 'chrome',
  headless: true,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1100 },
  colorScheme: 'light',
});
const page = await context.newPage();
const failures = [];
const checks = [];
page.on('pageerror', (error) => failures.push(error.message));
await mkdir('artifacts', { recursive: true });
try {
  await page.goto(process.env.BASE_URL || 'http://127.0.0.1:5173/');
  await page.getByRole('alert', { name: 'Critical group alert' }).waitFor();
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark')
      await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    for (const company of [
      'tmc',
      'academy',
      'ota',
      'b2b',
      'holidays',
      'facilities',
    ]) {
      await page
        .getByLabel('Your workspace', { exact: true })
        .selectOption(company);
      for (const image of await page.locator('img').all()) {
        await image.evaluate(async (element) => {
          if (!element.complete) await element.decode();
          if (!element.naturalWidth)
            throw new Error(`Image did not load: ${element.src}`);
        });
      }
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      checks.push({ theme, company, violations: results.violations });
    }
    await page
      .getByLabel('Your workspace', { exact: true })
      .selectOption('tmc');
    await page.screenshot({
      path: `artifacts/desktop-${theme}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `artifacts/overview-${theme}.png` });
  }
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Horizontal overflow at ${width}px`,
    );
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    checks.push({ width, violations: results.violations });
    await page.screenshot({
      path: `artifacts/viewport-${width}.png`,
      fullPage: true,
    });
    if (width === 390)
      await page.screenshot({ path: 'artifacts/mobile-overview.png' });
  }
  await writeFile(
    'artifacts/browser-report.json',
    JSON.stringify({ checks, runtimeErrors: failures }, null, 2),
  );
  await page.getByRole('searchbox').fill('no-such-result');
  await page.getByRole('heading', { name: 'No apps found' }).waitFor();
  assert(
    await page.getByRole('alert', { name: 'Critical group alert' }).isVisible(),
  );
  await page
    .getByRole('button', { name: 'Clear search', exact: true })
    .first()
    .click();
  const launcher = page.getByRole('button', {
    name: /Booking workspace Flights/,
  });
  await launcher.focus();
  await page.keyboard.press('Enter');
  await page.getByRole('dialog', { name: 'Booking workspace' }).waitFor();
  for (let index = 0; index < 5; index++) {
    await page.keyboard.press('Tab');
    assert(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest('dialog')),
      ),
      'Focus escaped modal',
    );
  }
  const dialogScan = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  checks.push({ state: 'dialog', violations: dialogScan.violations });
  await page.keyboard.press('Escape');
  assert(
    await launcher.evaluate((element) => element === document.activeElement),
    'Focus did not return to launcher',
  );
  await page.getByText('Prototype testing controls').click();
  await page.getByLabel('API response').selectOption('error');
  await page.getByRole('button', { name: 'Try again' }).waitFor();
  assert(
    await page.getByRole('alert', { name: 'Critical group alert' }).isVisible(),
  );
  await page.getByRole('button', { name: 'Try again' }).click();
  await page
    .getByRole('button', { name: 'Try again' })
    .waitFor({ state: 'detached' });
  await page.goto(
    new URL(
      '/design-system.html',
      process.env.BASE_URL || 'http://127.0.0.1:5173/',
    ).href,
  );
  await page.getByRole('heading', { name: /One group/ }).waitFor();
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark')
      await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `Design system overflow at ${width}px`,
      );
      const scan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      checks.push({
        state: 'design-system',
        theme,
        width,
        violations: scan.violations,
      });
      await page.screenshot({
        path: `artifacts/design-system-${theme}-${width}.png`,
        fullPage: true,
      });
    }
  }
  await writeFile(
    'artifacts/browser-report.json',
    JSON.stringify({ checks, runtimeErrors: failures }, null, 2),
  );
  const violations = checks.flatMap((check) =>
    check.violations.map((v) => ({
      state: {
        theme: check.theme,
        company: check.company,
        width: check.width,
        state: check.state,
      },
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  );
  console.log(
    JSON.stringify(
      { scans: checks.length, violations, runtimeErrors: failures },
      null,
      2,
    ),
  );
  assert.equal(violations.length, 0, 'Accessibility violations found');
  assert.equal(failures.length, 0, 'Runtime errors found');
  console.log(
    'PASS: responsive overflow, search safety, keyboard dialog, focus restoration and failed-refresh recovery.',
  );
} finally {
  await browser.close();
}
