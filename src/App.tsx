import { useEffect, useState, type CSSProperties } from 'react';
import { companies } from './config/companies';
import { Icon } from './components/Icon';
import { Modal } from './components/Modal';
import { AppCard } from './components/AppCard';
import { CriticalAlert } from './components/CriticalAlert';
import { NewsCard, severityLabel } from './components/NewsCard';
import { loadPortal, type DemoScenario } from './lib/api';
import { formatDate, selectContent } from './lib/portal';
import type { NewsItem, PortalApp, PortalData } from './types';

export default function App() {
  const [companyId, setCompanyId] = useState(companies[0].id);
  const company =
    companies.find((item) => item.id === companyId) ?? companies[0];
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [scenario, setScenario] = useState<DemoScenario>('normal');
  const [request, setRequest] = useState(0);
  const [query, setQuery] = useState('');
  const [settledQuery, setSettledQuery] = useState('');
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  );
  const [modal, setModal] = useState<
    | { kind: 'app'; item: PortalApp }
    | { kind: 'news'; item: NewsItem }
    | { kind: 'help' }
    | null
  >(null);
  const content = data ? selectContent(data, company.id, settledQuery) : null;
  const searching = query !== settledQuery;
  const isSearch = Boolean(query.trim());

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    loadPortal(controller.signal, scenario)
      .then((result) => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [scenario, request]);

  useEffect(() => {
    const timer = setTimeout(() => setSettledQuery(query), 180);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('portal-theme', theme);
    } catch {
      /* Storage may be disabled on shared devices. */
    }
  }, [theme]);

  const retry = () => {
    setScenario('normal');
    setRequest((value) => value + 1);
  };
  const clearSearch = () => {
    setQuery('');
    setSettledQuery('');
  };
  const themeStyle = {
    '--brand': company.accent,
    '--brand-dark': company.darkAccent,
  } as CSSProperties;

  return (
    <div className="portal" style={themeStyle}>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <aside className="sidebar">
        <a
          className="group-logo"
          href="#main"
          aria-label="Finchglow workspace home"
        >
          <span className="brand-symbol" aria-hidden="true">
            f<span />
          </span>
          <span>
            finchglow<small>H O L D I N G S</small>
          </span>
        </a>
        <div className="workspace-label">THE GROUP WORKSPACE</div>
        <div className="company-control">
          <span className="company-symbol">
            <Icon name={company.icon} size={22} />
          </span>
          <div>
            <label htmlFor="company">Your workspace</label>
            <select
              id="company"
              value={company.id}
              onChange={(e) => setCompanyId(e.target.value)}
            >
              {companies.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <nav aria-label="Workspace">
          <a className="nav-home" href="#main" onClick={clearSearch}>
            <Icon name="grid" /> Overview <span className="nav-dot" />
          </a>
          <a href="#apps">
            <Icon name="plane" /> My applications
          </a>
          <a href="#news">
            <Icon name="bell" /> News & updates{' '}
            <span className="nav-count">{content?.news.length ?? '–'}</span>
          </a>
        </nav>
        <div className="sidebar-note">
          <div className="orbit-art" aria-hidden="true">
            <Icon name="globe" size={36} />
            <span>✦</span>
          </div>
          <strong>
            One group.
            <br />A world of possibilities.
          </strong>
          <p>
            Your people, tools and updates.
            <br />
            All connected.
          </p>
        </div>
        <button
          className="support-button"
          onClick={() => setModal({ kind: 'help' })}
        >
          <Icon name="help" /> Help & support <Icon name="arrow" size={16} />
        </button>
        <div className="sidebar-footer">
          <span className="avatar">SI</span>
          <div>
            <strong>{data?.employee.name ?? 'Samson Ibrahim'}</strong>
            <small>{data?.employee.role ?? 'Travel consultant'}</small>
          </div>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> <strong>Overview</strong>
          </div>
          <div className="search-box">
            <Icon name="search" size={19} />
            <label className="sr-only" htmlFor="search">
              Search apps and news
            </label>
            <input
              id="search"
              type="search"
              placeholder="Search apps, news and updates…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>
          <button
            className="icon-button theme-toggle"
            aria-label={
              theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            }
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} />
          </button>
          <span className="topbar-avatar avatar" aria-label="Samson Ibrahim">
            SI
          </span>
        </header>

        <main id="main" tabIndex={-1}>
          <div className="page-heading">
            <div>
              <span className="eyebrow">A LITTLE MORE CONNECTED</span>
              <h1>Your day. All in one place.</h1>
              <p>
                Welcome back, {data?.employee.name.split(' ')[0] ?? 'Samson'}.
                Let’s get you where you need to be.
              </p>
            </div>
            <div className="date-block">
              <span>TUESDAY</span>
              <time dateTime="2026-10-20">20 October 2026</time>
              <small>Demo workspace</small>
            </div>
          </div>

          {error && (
            <div className="error-banner" role="alert">
              <Icon name="shield" />
              <div>
                <strong>We couldn’t refresh your workspace.</strong>
                <p>
                  {data
                    ? 'Previously loaded updates are shown below. They may be out of date.'
                    : 'Alerts and apps are unavailable. Please retry before relying on this workspace.'}
                </p>
              </div>
              <button onClick={retry}>Try again</button>
            </div>
          )}

          {content?.critical.map((alert) => (
            <CriticalAlert
              key={alert.id}
              alert={alert}
              onRead={(item) => setModal({ kind: 'news', item })}
            />
          ))}

          {loading && (
            <div className="loading-message" role="status">
              <span className="spinner" />
              {data
                ? 'Refreshing workspace… Existing updates remain visible.'
                : 'Loading your apps and checking the latest alerts…'}
            </div>
          )}

          <section
            className="welcome-panel"
            aria-label={`${company.name} workspace`}
          >
            <div className="welcome-copy">
              <div className="company-eyebrow">
                <Icon name={company.icon} size={17} /> {company.name}
              </div>
              <h2>
                Good journeys start
                <br />
                with great teamwork.
              </h2>
              <p>{company.description}</p>
              <a href="#apps">
                Find your next tool <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="journey-art" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <span className="art-point point-one" />
              <span className="art-point point-two" />
              <span className="art-point point-three" />
              <div className="art-plane">
                <Icon name="plane" size={52} />
              </div>
              <span className="art-label">CONNECTED BY POSSIBILITY</span>
            </div>
          </section>

          <div className="search-status sr-only" role="status">
            {searching
              ? 'Searching apps and news…'
              : isSearch && content
                ? `${content.apps.length} apps and ${content.news.length} updates found.`
                : ''}
          </div>
          {isSearch && (
            <div className="search-summary">
              <p>
                {searching ? (
                  'Searching…'
                ) : (
                  <>
                    Results for <strong>“{settledQuery}”</strong> in{' '}
                    {company.name}
                  </>
                )}
              </p>
              <button className="text-button" onClick={clearSearch}>
                Clear search
              </button>
            </div>
          )}

          <div className="content-columns">
            <section
              id="apps"
              className="apps-section"
              aria-labelledby="apps-heading"
              aria-busy={loading || searching}
            >
              <div className="section-heading">
                <div>
                  <span className="eyebrow">READY WHEN YOU ARE</span>
                  <h2 id="apps-heading">
                    Your applications{' '}
                    <span className="count-pill">
                      {content?.apps.length ?? '–'}
                    </span>
                  </h2>
                </div>
                <span className="section-meta">Your everyday toolkit</span>
              </div>
              {!data && loading ? (
                <div className="apps-grid skeleton-grid" aria-hidden="true">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div className="skeleton-card" key={i} />
                  ))}
                </div>
              ) : content?.apps.length ? (
                <div className="apps-grid">
                  {content.apps.map((app) => (
                    <AppCard
                      key={app.id}
                      app={app}
                      onLaunch={(item) => setModal({ kind: 'app', item })}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Icon name="search" size={28} />
                  <h3>
                    {error && !data ? 'Apps are unavailable' : 'No apps found'}
                  </h3>
                  <p>
                    {error && !data
                      ? 'Retry loading your workspace using the button above.'
                      : 'Try a different keyword or switch your workspace.'}
                  </p>
                  {isSearch && (
                    <button className="text-button" onClick={clearSearch}>
                      Show all apps
                    </button>
                  )}
                </div>
              )}
              <div className="access-note">
                <Icon name="shield" size={17} />
                <span>
                  Tools are shown based on your access. Missing something?{' '}
                  <button
                    className="text-button"
                    onClick={() => setModal({ kind: 'help' })}
                  >
                    Get help
                  </button>
                </span>
              </div>
            </section>

            <aside className="at-a-glance" aria-labelledby="glance-heading">
              <span className="eyebrow">IN THE LOOP</span>
              <h2 id="glance-heading">At a glance</h2>
              <div className="glance-row">
                <span className="glance-icon">
                  <Icon name="building" />
                </span>
                <div>
                  <small>Your home company</small>
                  <strong>
                    {companies.find((c) => c.id === data?.employee.companyId)
                      ?.name ?? 'Travel Management'}
                  </strong>
                </div>
              </div>
              <div className="glance-row">
                <span className="glance-icon">
                  <Icon name="globe" />
                </span>
                <div>
                  <small>Part of something bigger</small>
                  <strong>{companies.length} businesses. One group.</strong>
                </div>
              </div>
              <div className="glance-divider" />
              <span className="mini-label">A BETTER WORKDAY</span>
              <h3>Make space to grow.</h3>
              <p>
                Small steps, new skills. Explore your learning opportunities.
              </p>
              <button
                className="text-button"
                onClick={() => {
                  const learning =
                    content?.apps.find((a) => a.id === 'learning') ??
                    data?.apps.find(
                      (a) =>
                        a.id === 'learning' &&
                        data.employee.appIds.includes(a.id),
                    );
                  if (learning) setModal({ kind: 'app', item: learning });
                }}
                disabled={!data}
              >
                Visit Learning hub <Icon name="arrow" size={16} />
              </button>
            </aside>
          </div>

          <section
            id="news"
            className="news-section"
            aria-labelledby="news-heading"
            aria-busy={loading || searching}
          >
            <div className="section-heading">
              <div>
                <span className="eyebrow">ACROSS YOUR WORLD</span>
                <h2 id="news-heading">
                  News & updates{' '}
                  <span className="count-pill">
                    {content?.news.length ?? '–'}
                  </span>
                </h2>
              </div>
              <span className="section-meta">
                For {company.shortName.toLowerCase()} & the group
              </span>
            </div>
            {!data && loading ? (
              <div className="news-grid" aria-hidden="true">
                {[1, 2, 3].map((i) => (
                  <div className="skeleton-card" key={i} />
                ))}
              </div>
            ) : content?.news.length ? (
              <div className="news-grid">
                {content.news.map((item) => (
                  <NewsCard
                    key={item.id}
                    item={item}
                    company={company}
                    onRead={(item) => setModal({ kind: 'news', item })}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Icon name="bell" size={28} />
                <h3>
                  {error && !data
                    ? 'Updates are unavailable'
                    : 'No matching updates'}
                </h3>
                <p>
                  {error && !data
                    ? 'Retry to check for important alerts.'
                    : 'Try a shorter search. Critical alerts always stay visible above.'}
                </p>
              </div>
            )}
          </section>
          <footer className="page-footer">
            <span>
              Finchglow Holdings <span className="footer-dot">·</span> Better,
              together.
            </span>
            <span>Assessment prototype · All content is fictional</span>
          </footer>
          <details className="demo-controls">
            <summary>Prototype testing controls</summary>
            <p>
              Simulate a response. Failed refreshes preserve existing alerts;
              “Try again” restores a normal response.
            </p>
            <label htmlFor="scenario">API response</label>
            <select
              id="scenario"
              value={scenario}
              onChange={(e) => setScenario(e.target.value as DemoScenario)}
            >
              <option value="normal">Normal</option>
              <option value="slow">Slow (3.5 seconds)</option>
              <option value="error">Failure</option>
            </select>
            <button onClick={() => setRequest((value) => value + 1)}>
              Reload data
            </button>
          </details>
        </main>
      </div>
      {modal && (
        <Modal
          title={
            modal.kind === 'help'
              ? 'A little help goes a long way.'
              : modal.kind === 'app'
                ? modal.item.name
                : modal.item.title
          }
          onClose={() => setModal(null)}
        >
          {modal.kind === 'app' ? (
            <>
              <p>
                <strong>{modal.item.name}</strong>
              </p>
              <p>{modal.item.description}.</p>
              <div className="dialog-note">
                <Icon name="shield" />
                <p>
                  This is a prototype launch. In production, this would open
                  your approved application through your company’s single
                  sign-on. No business system is connected.
                </p>
              </div>
            </>
          ) : modal.kind === 'news' ? (
            <>
              <span className={`badge ${modal.item.severity}`}>
                {severityLabel[modal.item.severity]}
              </span>
              <p>{modal.item.body}</p>
              <p className="muted">
                {modal.item.author} · {formatDate(modal.item.date)} · Fictional
                demo update
              </p>
            </>
          ) : (
            <>
              <p>
                For application access, contact your company’s IT service desk.
                For booking or payment disruption, follow the instructions in
                the critical update.
              </p>
              <div className="dialog-note">
                <Icon name="help" />
                <p>
                  Support routing is a prototype. A production version would
                  open the group’s existing service desk with your company and
                  app already selected.
                </p>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
