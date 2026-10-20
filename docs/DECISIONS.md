# Decision log

## 1. Prominent incidents versus a quiet workspace

Staff need a fast launcher, but missing a payment outage can cause repeated charges
and support work. Critical updates therefore occupy a persistent, non-dismissible
banner before the apps and also appear in the severity-ordered feed. Search affects
apps/news but never the banner. Colour is reinforced by a shield, severity text and
explicit instructions.

Rejected: dismissible toasts and a notification-only inbox. They save space but are
too easy to miss. Cost: duplicated content and a taller mobile page. Failed refreshes
retain existing alerts with a stale-data warning; they never imply that an outage is
resolved. Real incident expiry, acknowledgement and offline delivery need backend
rules and are not claimed here.

## 2. Shared structure versus six bespoke experiences

The same components, navigation and content contracts serve every company.
Configuration changes identity icons and accessible accents; audience metadata
filters content. App visibility is the intersection of entitlement and company
availability, while group content remains visible.

Rejected: duplicated pages or conditionals for every subsidiary. They permit fast
one-off changes but make accessibility and later additions expensive. Cost: brands
have limited expressive range in this prototype. If OTA needs different navigation,
extend configuration with a validated navigation schema; fork a component only for
a demonstrated difference in user task, not merely a new logo. Current identities
are concepts rather than official brand assets.

## 3. A demonstrable slice versus infrastructure breadth

React local state, a typed mock transport, plain CSS and a few behavior-focused tests
are sufficient for one home screen. Dark mode is the single extra because it directly
supports late shifts and can be evaluated across all six brands. It persists only a
device appearance preference.

Rejected: a router/state framework, a comprehensive design-system package and an
offline service worker. They consume the assessment's limited scope without proving
the central user journey; stale incidents and shared-device storage also deserve
more careful design. Cost: no offline reload, real SSO or application handoff.
Production work starts at the transport/identity boundary, with server-enforced
authorization, freshness rules and assistive-technology testing.
