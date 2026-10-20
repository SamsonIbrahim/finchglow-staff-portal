# Finchglow · Group Staff Portal

A focused frontend assessment prototype by Samson Ibrahim, built with React,
TypeScript and Vite. One front door for six businesses: relevant applications,
visible operational alerts and company news.

Staff details, incidents and operational dates are illustrative. Company identities
use the candidate-supplied group logo and verified subsidiary assets.
The fixed date, 20 October 2026, keeps the demo reproducible. This is not an
official Finchglow service or an authenticated portal.

## Run

Use **Node 22.12 or newer** (validated with Node 24.19) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally http://127.0.0.1:5173).
Open `/design-system.html` on the same server for the live interface reference.

```sh
npm test          # component and domain tests
npm run build    # TypeScript check and optimized static build
npm run size     # measured raw and gzip asset sizes
npm run preview  # serve dist locally
npm run format:check
```

For real-browser checks, start the dev server in another terminal, install Google
Chrome, and run `npm run test:browser`. The script uses installed Chrome.
Alternatively set `BROWSER_CHANNEL=msedge`, or install Playwright Chromium and set
`BROWSER_CHANNEL=chromium`. Set `BASE_URL` to test a preview/deployed build.
Screenshots and a JSON accessibility report are written to ignored `artifacts/`.

## What's included

- Personalized home and employee home company, separate from the selected workspace.
- Six business identities configured in one file; switching changes the identity
  logo, accent, applications and news while preserving group-wide content.
- Employee app entitlements intersected with business availability.
- Information, warning and critical updates. Critical alerts appear above the
  workspace and **cannot be dismissed or hidden by search**.
- Debounced, case-insensitive search across app names/descriptions/categories and
  news title/body/author, with result counts and empty states.
- Initial loading, simulated slow responses, recoverable errors and stale-data
  warnings. Failed refreshes preserve previously loaded critical alerts.
- Responsive layouts and keyboard-accessible native controls.
- **Chosen extra: dark mode**, with system preference on first visit and a saved
  device preference. It supports late-shift desks without adding backend scope.
- App launches and support open explanatory dialogs; no fake external destinations.

Expand **Prototype testing controls** at the bottom to simulate normal, slow and
failed requests. “Try again” returns to a successful response.

## Design system and brand provenance

The interface is white-led with blue shared actions, dark text, restrained surfaces,
and semantic red/amber/green states. The application grid follows the greeting and
critical incident; a compact company strip replaces promotional artwork.

`src/tokens.css` defines primitive and semantic colour tokens, a 4 px spacing scale,
typography, radii, control sizing and motion. `src/styles.css` consumes those tokens.
The reference page at `/design-system.html` imports the same AppCard, CriticalAlert,
CompanyIdentity and Modal components as the workspace. It demonstrates both themes,
actual component interactions, disabled controls, empty states and status treatments.
It is a separate reviewer resource, not a staff navigation item.

The uploaded group logo is stored unchanged as `public/brand/finchglow-supplied.png`.
CSS displays its artwork area without redrawing, recolouring or distorting it.
Subsidiary artwork was downloaded from the [official group website](https://www.finchglowholdings.com/).
Those assets are white variants and sit on a dark-blue plate in both themes.
The website's `#F2FAFF` surface and dark-text treatment informed the interface;
other interface colours are accessible adaptations, not asserted official brand values.

| Assessment function | Identity used                    | Source                                                               |
| ------------------- | -------------------------------- | -------------------------------------------------------------------- |
| Corporate TMC       | FCM Travel Nigeria               | [Group brand directory](https://www.finchglowholdings.com/)          |
| Academy             | Lagos Aviation Academy           | [Academy](https://lagosaviationacademy.com/)                         |
| OTA                 | Travelden                        | [Travelden](https://www.travelden.com/)                              |
| B2B                 | Finchglow Travels                | [Consolidator and B2B services](https://finchglowtravels.com/)       |
| Holidays            | Finchglow Holidays               | [Group brand directory](https://www.finchglowholdings.com/)          |
| Shared facilities   | Shared Facilities, internal unit | Required by the assessment; ordinary building icon, no invented logo |

The website also lists FinchGlobal. The assessment's six functions are intentionally
preserved instead of substituting FinchGlobal for shared facilities. The candidate
confirmed this interpretation.

Asset URLs (retrieved 20 October 2026): `/logos/FCM.svg`, `/logos/LAA.svg`,
`/logos/Fincglow%20Travels.svg`, `/logos/Finchglow%20Holidays.svg` and the group site's
`/_next/image?url=%2Flogos%2Ftravelden.png&w=640&q=75`, all on
`https://www.finchglowholdings.com`. Logos remain their owners' marks; this is an
assessment concept, not an official branded service.

## Architecture

| Location                  | Responsibility                                                   |
| ------------------------- | ---------------------------------------------------------------- |
| `src/config/companies.ts` | Business identity, icon and light/dark accent configuration      |
| `src/types.ts`            | Shared TypeScript data contracts                                 |
| `src/data/mock.ts`        | Fictional employee, entitlements, applications and updates       |
| `src/lib/api.ts`          | Abortable mock transport and deterministic failure scenarios     |
| `src/lib/portal.ts`       | Pure visibility, entitlement, search and severity ordering logic |
| `src/components/`         | App cards, news cards, critical alerts, icons and modal behavior |
| `src/App.tsx`             | Single-screen composition, loading/search/company/theme state    |
| `src/tokens.css`          | Primitive and semantic design tokens, including dark theme       |
| `src/styles.css`          | Shared component styles and responsive layout                    |
| `src/design-system.tsx`   | Live reference using the same tokens and components              |
| `scripts/`                | Bundle measurement and browser verification                      |

Local React state is enough for one screen. There is no router, global state
library, UI framework, icon package or remote font. The mock data is a separate
lazy-loaded chunk; the same `loadPortal` contract can later call a real endpoint.
Effects abort obsolete requests, including React Strict Mode's development replay.

To add a seventh business:

1. Add an entry to `companies.ts` with a unique ID, function, optional verified logo and accessible accents.
2. Assign that ID to relevant mock apps/news and grant the appropriate employee app IDs.
3. Verify its accents in both themes. No company-specific rendering branch is needed.

These client-side filters demonstrate UX behavior; they are **not a security boundary**.
The prototype intentionally allows switching to all six businesses for evaluation.
In production the server would return only authorized companies and resources.

## Accessibility and validation

Validated in installed Chrome at 1440 px desktop, 768 px tablet and 390/320 px phone
widths. The automated browser run includes:

- Axe WCAG 2 A/AA and 2.1 AA checks for all six companies in both themes, three
  narrower layouts and an open dialog, plus the design reference at desktop/phone
  widths in both themes: **20 scans, zero violations**.
- No horizontal overflow at tested widths.
- Keyboard app launch, dialog focus containment, Escape dismissal and focus return.
- Critical alert visibility during unmatched search and failed refresh, plus retry.
- Zero browser runtime errors.

**11 unit/component tests pass**, covering entitlement isolation, company filtering,
group alert persistence, severity ordering, search, configuration growth, errors,
dialogs and dark mode. TypeScript and the production build pass.

During review, mobile alert text was being squeezed by its action and dialog Tab
navigation could leave the modal. Both were fixed and rechecked.

The implementation includes semantic headings/landmarks, a skip link, visible
focus, labeled controls, live loading/search/error announcements, textual severity
labels and reduced-motion support. Automated checks do not establish full WCAG
conformance. Screen-reader testing with NVDA/VoiceOver and testing on physical
shared tablets remain outstanding; the browser tests use desktop Chrome emulation.

## Performance

Measured workspace JS + CSS, including the mock chunk: **263.90 KiB raw /
81.83 KiB gzip**. The default workspace's group and FCM logo assets add
**175.32 KiB gzip**, for a combined **257.15 KiB gzip** code-and-logo estimate.
The separate design reference has its own entry and does not add its page code
to the staff workspace. Run `npm run build && npm run size` for exact current figures.
Gzip sizes describe compressed build assets, not a measured network response or
Core Web Vitals score.

System fonts and inline interface icons avoid font or icon-package requests. The
supplied group logo and selected subsidiary logo are served locally; other company
logos load only when selected. The size script reports their cost separately from
code, including the default workspace total. No remote services or heavy component
library are involved. Search stays local.
Render-blocking resources are small; the mock data loads separately. A production
host should use Brotli/gzip and immutable caching for hashed assets, and revalidate
HTML. Do not cache authenticated incident responses as if they were static assets.

## Authentication and production boundary

Use the group's identity provider with OIDC Authorization Code + PKCE through a
backend-for-frontend. Store sessions in secure, HttpOnly, SameSite cookies; keep
tokens and secrets out of the frontend and localStorage. Validate tenant membership
and entitlements on the server for every data request and app launch. Use a
server-controlled destination allowlist; session presence alone must not authorize
a launch. Identity-provider federation can then provide SSO to each application.

Persisting theme is the only localStorage use. No authentication, payments,
telemetry, real employee data or actual system integration is implemented.

## Scope and next week

This is a single home experience. Authentication, real app launching, incident
delivery, offline caching, read acknowledgements and personal app ordering are
deliberately out of scope. There is no claim that an alert reaches someone who is
offline, and retained in-memory data does not survive a reload.

With another week, first validate tasks with contact-centre and facilities staff;
then connect an authenticated API, add schema validation and explicit freshness/
incident resolution semantics, test with assistive technology and physical devices,
and add a CI gate. Evaluate offline storage with expiry and data minimization only
after agreeing what can safely be cached on shared devices. Critical incidents also
need an agreed escalation channel outside this portal.

Measure time to launch the right app, search success/zero-result rate, task
completion with keyboard/screen reader, and critical alert acknowledgement latency
by business. Record real-device performance on representative slow connections;
avoid collecting search text or employee identifiers unnecessarily.

## Submission and presentation

- [Decision log](docs/DECISIONS.md): the three hardest trade-offs.
- [20-minute live demo](docs/DEMO.md): two screen sizes and discussion preparation.
- [Code walkthrough](docs/CODE_WALKTHROUGH.md): how to explain the implementation.
- [Implementation plan](docs/PLAN.md): initial scope and acceptance criteria.

The repository or source zip is the primary deliverable; a live deployment is
optional. Any static host can serve `dist/` after `npm run build`. No environment
variables are required. AI assisted the implementation and documentation; review
the code and rehearse the behavior before presenting it as your assessment work.
