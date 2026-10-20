# Implementation plan

## Product

One calm front door for staff across six businesses. Prioritize finding tools and
noticing operational disruption. Use mock company identities; do not imply these
are approved subsidiary brands. All employee, incident and news content is fictional.

## Sequence

1. Establish typed company configuration, entitlement data and mock API boundary.
2. Build a responsive home with persistent critical alerts, accessible company
   selection, app launcher, news and cross-content search.
3. Add the single optional feature: dark mode for late-shift teams.
4. Verify filtering, errors, keyboard interaction, mobile layout and accessibility.
5. Measure the production bundle and write the README, three-decision log and
   20-minute presentation guide.

## Acceptance

- Switching businesses changes identity and accent, apps and news; group alerts stay.
- Search filters apps and news but never suppresses critical alerts.
- Loading, empty and retryable failure states are explicit.
- Keyboard focus is visible; native controls retain expected semantics.
- A new company is a configuration addition, not a new component.
- No actual authentication or business systems are connected.

## Scope

React, TypeScript, Vite, plain CSS. No routing/state/UI libraries for a single screen.
Mock application launches explain the intended destination. Authentication, real
notifications, offline caching and persistent personal data remain production work.
Repository/zip first; public hosting and recruitment submission are separate actions.
