# Implementation plan

## Product

One calm front door for staff across six assessment functions. Prioritize finding
tools and noticing operational disruption. Use the candidate-supplied group logo
and verified subsidiary artwork. Preserve Shared Facilities as an internal unit
with no invented logo. All employee, incident and news content is fictional.

## Sequence

1. Establish typed company configuration, entitlement data and mock API boundary.
2. Build a responsive home with persistent critical alerts, accessible company
   selection, app launcher, news and cross-content search.
3. Add the single optional feature: dark mode for late-shift teams.
4. Verify filtering, errors, keyboard interaction, mobile layout and accessibility.
5. Measure the production bundle and write the README, three-decision log and
   20-minute presentation guide.
6. Apply a white-led visual system with blue shared actions and separate semantic
   status colours. Document the same tokens and real components in a live reference.

## Acceptance

- Switching businesses changes identity and accent, apps and news; group alerts stay.
- Search filters apps and news but never suppresses critical alerts.
- Loading, empty and retryable failure states are explicit.
- Keyboard focus is visible; native controls retain expected semantics.
- A new company is a configuration addition, not a new component.
- No actual authentication or business systems are connected.
- Logo provenance is recorded; shared controls do not change meaning across brands.
- The design reference and workspace use the same components and design tokens.

## Scope

React, TypeScript, Vite, plain CSS. Three separate views use hash navigation and a shared shell without routing/state/UI libraries.
Mock application launches explain the intended destination. Authentication, real
notifications, offline caching and persistent personal data remain production work.
Repository/zip first; public hosting and recruitment submission are separate actions.
