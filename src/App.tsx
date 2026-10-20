import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { companies } from './config/companies';
import { Icon } from './components/Icon';
import { Modal } from './components/Modal';
import { CriticalAlert } from './components/CriticalAlert';
import { severityLabel } from './components/NewsCard';
import { CompanyIdentity } from './components/CompanyIdentity';
import { loadPortal, type DemoScenario } from './lib/api';
import { formatDate, selectContent } from './lib/portal';
import type { NewsItem, PortalApp, PortalData } from './types';

import { usePage, pages } from './lib/navigation';
import { OverviewPage } from './pages/OverviewPage';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { NewsPage } from './pages/NewsPage';
import {
  ApplicationsSection,
  NewsSection,
  type PageProps,
} from './pages/Sections';

export default function App() {
  const page = usePage();
  const mainRef = useRef<HTMLElement>(null);
  const previousPage = useRef(page);
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

  useEffect(() => {
    document.title = `${pages[page].label} · Finchglow workspace`;
    if (previousPage.current !== page) {
      setQuery('');
      setSettledQuery('');
      setModal(null);
      mainRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
      previousPage.current = page;
    }
  }, [page]);

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

  const pageProps: PageProps = {
    data,
    content,
    company,
    loading,
    searching,
    isSearch,
    error,
    clearSearch,
    onApp: (item) => setModal({ kind: 'app', item }),
    onNews: (item) => setModal({ kind: 'news', item }),
    onHelp: () => setModal({ kind: 'help' }),
  };

  return (
    <div className="portal" style={themeStyle}>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to main content
      </a>
      <aside className="sidebar">
        <a
          className="group-logo"
          href="#/overview"
          onClick={clearSearch}
          aria-label="Finchglow workspace home"
        >
          <span className="supplied-logo">
            <img src="/brand/finchglow-supplied.png" alt="Finchglow Holdings" />
          </span>
        </a>
        <div className="workspace-label">
          <span /> STAFF WORKSPACE
        </div>
        <div className="company-control">
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
        <span className="nav-label">WORKSPACE</span>
        <nav aria-label="Workspace">
          <a
            className={page === 'overview' ? 'nav-home' : undefined}
            aria-current={page === 'overview' ? 'page' : undefined}
            href="#/overview"
            onClick={clearSearch}
          >
            <Icon name="grid" /> Overview
          </a>
          <a
            className={page === 'applications' ? 'nav-home' : undefined}
            aria-current={page === 'applications' ? 'page' : undefined}
            href="#/applications"
            onClick={clearSearch}
          >
            <Icon name="plane" /> My applications
          </a>
          <a
            className={page === 'news' ? 'nav-home' : undefined}
            aria-current={page === 'news' ? 'page' : undefined}
            href="#/news"
            onClick={clearSearch}
          >
            <Icon name="bell" /> News &amp; updates{' '}
            <span className="nav-count">
              {data ? selectContent(data, company.id).news.length : '–'}
            </span>
          </a>
        </nav>
        <div className="sidebar-note">
          <Icon name="globe" size={22} />
          <strong>Connected across the group.</strong>
          <p>One place for the tools and updates that move your day forward.</p>
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
            Workspace <span>/</span>{' '}
            <strong>{isSearch ? 'Search' : pages[page].label}</strong>
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

        <main id="main" ref={mainRef} tabIndex={-1}>
          <div className="page-heading">
            <div>
              <span className="eyebrow">YOUR WORKDAY, CONNECTED</span>
              <h1>
                {isSearch ? (
                  'Search your workspace'
                ) : page === 'overview' ? (
                  <>
                    Welcome back,{' '}
                    {data?.employee.name.split(' ')[0] ?? 'Samson'}
                    <span className="heading-period">.</span>
                  </>
                ) : (
                  pages[page].label
                )}
              </h1>
              <p>
                {isSearch
                  ? 'Find applications and updates across your selected workspace.'
                  : pages[page].description}
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

          <CompanyIdentity company={company} />

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

          {isSearch ? (
            <div className="search-page">
              <ApplicationsSection {...pageProps} />
              <NewsSection {...pageProps} />
            </div>
          ) : page === 'applications' ? (
            <ApplicationsPage {...pageProps} />
          ) : page === 'news' ? (
            <NewsPage {...pageProps} />
          ) : (
            <OverviewPage {...pageProps} />
          )}

          <footer className="page-footer">
            <span>
              Finchglow Holdings <span className="footer-dot">·</span> Better,
              together.
            </span>
            <span>Assessment prototype · Mock operational data</span>
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
