# Validation record

Validated on 20 October 2026 using Node 24.19 and installed Google Chrome.

| Check                               | Result                                                               |
| ----------------------------------- | -------------------------------------------------------------------- |
| TypeScript strict check             | Pass                                                                 |
| Vite production build               | Pass                                                                 |
| Vitest component/domain tests       | 11 passed across 2 files                                             |
| Axe WCAG 2 A/AA + 2.1 AA scans      | 20 scans, zero violations                                            |
| Browser runtime errors              | Zero                                                                 |
| Horizontal overflow                 | None at 768, 390 and 320 CSS pixels                                  |
| Keyboard dialog                     | Enter opens; Tab stays inside; Escape closes and restores focus      |
| Search safety                       | Unmatched search does not hide the critical group alert              |
| Failed-refresh recovery             | Retains the critical alert, warns of staleness, retries successfully |
| Dependency audit after installation | Zero known vulnerabilities reported                                  |
| Workspace JS + CSS                  | 263.90 KiB raw; 81.83 KiB gzip                                       |
| Workspace code + default logos      | 562.09 KiB raw; 257.15 KiB gzip                                      |

The final browser run targeted the optimized production preview on port 4173.
The accessibility matrix includes six companies in each theme (12 scans), the three
narrower viewport sizes and one open-dialog state, plus the design reference in both
themes at 1440 and 390 px. Light and dark desktop screenshots, tablet/phone screenshots
and the reference page were inspected. Logo loading is asserted for each company.
Automated output can be regenerated with
`npm run test:browser`; generated reports are ignored by Git.

## Issues found and corrected

1. On phones, a flex row let the critical alert action squeeze its text. A two-column
   grid now gives the text the remaining width and places the action underneath.
2. Native dialog Tab navigation could leave the document's focused control. Explicit
   first/last control cycling now keeps focus inside and preserves Escape behavior.
3. The original test runner dependency had audit findings. Updating it removed those
   findings, followed by a passing test run.
4. Official subsidiary assets are white variants, which disappeared on white surfaces.
   Deep-blue logo plates now display the original artwork in both themes without
   recolouring or redrawing it. The candidate-supplied group logo is unchanged.

## Limits

This is not a WCAG conformance certification. Real NVDA/VoiceOver testing, physical
shared tablets, other browser engines, measured low-bandwidth performance and
production identity/integration tests remain outstanding. Compressed asset size is
not a measurement of Core Web Vitals. The API is simulated and there is no offline
cache or guaranteed incident delivery.
