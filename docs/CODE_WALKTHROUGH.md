# Understand the implementation

## Follow one user action

When someone selects Lagos Aviation Academy, React updates `companyId` in `App.tsx`.
The matching configuration supplies its verified logo and CSS accent variables.
`selectContent` receives the employee data, company ID and debounced query. It
returns apps, search-filtered news and a separate critical-alert collection.
React renders those results through cards and the critical banner.

No network call is needed to switch a company in this mock. A production endpoint
would receive company context and independently authorize it.

## The important ideas

**Types:** `Company`, `PortalApp`, `NewsItem` and `PortalData` define the shape of
data at compile time. They do not validate unknown JSON at runtime; an API adapter
would need runtime validation.

**Entitlements:** an app must both belong to the selected company (or group) and
appear in the employee's app IDs. Filtering on only company would accidentally
make every company app look authorized.

**Safety versus search:** critical alerts come from all relevant news before the
query is applied. This is why a search returning no matches cannot hide the outage.
Severity sorting puts critical before warning before information.

**Search:** the input is immediate; the filtering query updates after 180 ms.
Each keystroke cancels the previous timer. The status region announces searching
and result counts. The data set is small, so no external search service is needed.

**Asynchronous loading:** an effect creates an `AbortController`, starts loading
and calls the mock transport. Cleanup cancels obsolete work. The success path
replaces data; failure sets an error without erasing existing data. `finally` ends
loading only if the request has not been aborted.

**Mock API:** an abortable timer models latency. The error scenario rejects;
the normal path lazily imports the mock fixture. It tests states, not actual HTTP
reliability. Retry resets to normal intentionally so a demo can recover.

**Modal:** native `<dialog>` supplies modal semantics and background inertness.
The component opens it, handles Escape, cycles Tab between controls and returns
focus to its trigger on close. The browser test matters because JSDOM's dialog
polyfill cannot prove actual focus behavior.

**Theme:** the document stores a light/dark attribute, with semantic CSS variables
defined in `tokens.css`. Shared controls use blue; company accents identify the
selected business and never replace severity colours.
An early script reads a saved preference (or the OS preference) before React to
avoid a flash. Storage failures are caught for restricted/shared browsers.
Only this device preference is persisted.

**Responsive layout:** CSS grid adapts the app/news columns; the sidebar becomes
top navigation on smaller screens. The mobile critical banner uses a grid so its
action cannot squeeze the message into a narrow column. Optional secondary content
reflows below the applications on smaller viewports.

**Brand assets:** the uploaded group logo is unchanged on disk; CSS frames its artwork
area. Official white subsidiary variants use a deep-blue plate, preserving their
original appearance. Logos are not generated or redrawn. The facilities icon is
an ordinary UI symbol, not an asserted company mark.

**Live reference:** `design-system.html` is a second Vite entry importing the real
portal components. It gives reviewers a way to inspect tokens, themes and states
without adding implementation details to the staff experience.

## Before the interview

Try changing a mock article, adding a seventh company and removing an app entitlement.
Predict the behavior first, then verify it. Run a test, deliberately break the
relevant selector, and observe the failure before restoring the code. Practise
explaining why client-side entitlements are a UX demonstration rather than security.

Be candid about AI assistance. The assessment explicitly permits it; your ownership
comes from understanding, reviewing and being able to change the implementation.
