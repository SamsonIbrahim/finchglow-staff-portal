# 20-minute presentation

Practice once before submitting. Keep a desktop browser and a 390 px responsive
viewport ready. Start in light mode, Travel Management, with an empty search.
Use your own words; do not describe checks you have not personally performed.

## 0:00–2:00 · Problem and assumptions

“Staff across six businesses need to reach their tools quickly and notice operational
disruption. I treated this as a work-starting surface, not a reporting dashboard.”

Explain the mock identity, fixed date and concept subsidiary brands. Mention the
limited scope: a home experience, no real backend or SSO.

## 2:00–6:00 · Desktop journey

1. Point out the greeting, selected workspace and separate employee home company.
2. Explain why the critical payment alert appears before the launcher.
3. Open the alert: clear instructions and next update, then Escape.
4. Launch Booking workspace. Explain that the dialog is an honest integration boundary.
5. Switch to Aviation Academy: identity/accent/apps/news change, group outage remains.
6. Search “leave” to locate People & HR. Search “zzzz” to show empty states while
   the critical alert remains visible; clear the search.

## 6:00–9:00 · Phone and accessibility

Resize to 390 px, then 320 px. Show the compact navigation, full-width alert text and
two-column app grid. Navigate by keyboard and show focus. Open an app with Enter,
cycle Tab/Shift+Tab, dismiss with Escape and show focus returned to the launcher.

Toggle dark mode. Explain semantic tokens, textual severity, contrast checks and
reduced motion. Be precise: automated axe checks and keyboard tests passed; an
actual NVDA/VoiceOver and physical-device audit remains work to do.

## 9:00–12:00 · Reliability and performance

At the bottom, open Prototype testing controls. Select Slow and show loading.
Select Failure and point out the stale-data message plus retained critical alert.
Click Try again. Explain that in-memory retention is not offline caching.

Show `npm run size` output. Explain system fonts, inline SVG, no UI framework,
local search and no network image requests. Avoid claiming a Lighthouse score.

## 12:00–16:00 · Code and three decisions

Open `companies.ts`, `portal.ts` and one component test. Trace:
company selection → pure selector → visible apps/news → reusable components.
Explain how a seventh business is added. Use the decision log to discuss incident
prominence, shared architecture and choosing dark mode over offline scope.

## 16:00–18:00 · Production boundary

Describe SSO through the identity provider and backend-for-frontend. Entitlements
must come from the server; client filtering is not security. Actual app launch
targets must be allowlisted. No secrets belong in the bundle.

## 18:00–20:00 · Next steps and success

Prioritize staff task testing, API integration, alert freshness/resolution and
assistive-technology testing. Measure time to the correct app, search success,
critical acknowledgement latency and real-device performance.

## Discussion preparation

**OTA wants its own branding/navigation:** clarify the user need; extend semantic
tokens and a navigation schema while keeping tested shared primitives. Avoid
branching an entire app for visual preference alone.

**A critical alert must reach staff on poor signal:** small priority payload, polling/
push with reconnect, last-known update with timestamp and expiry, local cache only
after a security review. An offline phone cannot receive a new alert; agree a
separate operational escalation channel. Do not promise guaranteed delivery.

**How did you test accessibility?** Explain the automated matrix and keyboard checks,
the two observed issues and their fixes, then acknowledge manual screen-reader and
physical-device coverage still needed.

**A company wants a conflicting feature:** discover the task, assess shared impact,
prototype an extension and validate it. Record the trade-off; do not frame consistency
as more important than users accomplishing their work.

**What would you rewrite first?** Replace the mock transport with a validated API
adapter and explicit freshness rules. As the page grows, extract data loading into a
hook and evaluate a server-state library for real caching/retries. Do not replace
working components merely to add abstraction.

## Submission check

- Open the source zip in a fresh folder and follow the README.
- Review every code module and explain the tests in your own words.
- Verify the submission includes repository link or zip, README and decision log.
- Personality test was already submitted separately, as confirmed by the candidate.
- The recruiter granted a Tuesday submission extension, as confirmed by the candidate.
- Send the submission yourself after reviewing it; this project does not send email.
