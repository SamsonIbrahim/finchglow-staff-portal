import { Icon } from '../components/Icon';
import { AppCard } from '../components/AppCard';
import { NewsCard } from '../components/NewsCard';
import { companies } from '../config/companies';
import type { Company, NewsItem, PortalApp, PortalData } from '../types';
import type { selectContent } from '../lib/portal';

export interface PageProps {
  data: PortalData | null;
  content: ReturnType<typeof selectContent> | null;
  company: Company;
  loading: boolean;
  searching: boolean;
  isSearch: boolean;
  error: boolean;
  clearSearch: () => void;
  onApp: (app: PortalApp) => void;
  onNews: (news: NewsItem) => void;
  onHelp: () => void;
}

export function ApplicationsSection({
  data,
  content,
  loading,
  searching,
  isSearch,
  error,
  clearSearch,
  onApp,
  onHelp,
  limit,
}: PageProps & { limit?: number }) {
  return (
    <section
      id="apps"
      className="apps-section"
      aria-labelledby="apps-heading"
      aria-busy={loading || searching}
    >
      <div className="section-heading">
        <div>
          <h2 id="apps-heading">
            Your applications{' '}
            <span className="count-pill">{content?.apps.length ?? '–'}</span>
          </h2>
        </div>
        {limit ? (
          <a className="text-button section-link" href="#/applications">
            View all <Icon name="arrow" size={16} />
          </a>
        ) : (
          <span className="section-meta">Tools available to you</span>
        )}
      </div>
      {!data && loading ? (
        <div className="apps-grid skeleton-grid" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <div className="skeleton-card" key={i} />
          ))}
        </div>
      ) : content?.apps.length ? (
        <div className="apps-grid">
          {(limit ? content.apps.slice(0, limit) : content.apps).map((app) => (
            <AppCard key={app.id} app={app} onLaunch={onApp} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" size={28} />
          <h3>{error && !data ? 'Apps are unavailable' : 'No apps found'}</h3>
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
          <button className="text-button" onClick={onHelp}>
            Get help
          </button>
        </span>
      </div>
    </section>
  );
}

export function NewsSection({
  data,
  content,
  company,
  loading,
  searching,
  error,
  onNews,
  limit,
}: PageProps & { limit?: number }) {
  return (
    <section
      id="news"
      className="news-section"
      aria-labelledby="news-heading"
      aria-busy={loading || searching}
    >
      <div className="section-heading">
        <div>
          <h2 id="news-heading">
            {limit ? 'Latest updates' : 'News & updates'}{' '}
            <span className="count-pill">{content?.news.length ?? '–'}</span>
          </h2>
        </div>
        {limit ? (
          <a className="text-button section-link" href="#/news">
            View all updates <Icon name="arrow" size={16} />
          </a>
        ) : (
          <span className="section-meta">
            Company updates & group announcements
          </span>
        )}
      </div>
      {!data && loading ? (
        <div className="news-grid" aria-hidden="true">
          {[1, 2, 3].map((i) => (
            <div className="skeleton-card" key={i} />
          ))}
        </div>
      ) : content?.news.length ? (
        <div className="news-grid">
          {(limit ? content.news.slice(0, limit) : content.news).map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              company={company}
              onRead={onNews}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="bell" size={28} />
          <h3>
            {error && !data ? 'Updates are unavailable' : 'No matching updates'}
          </h3>
          <p>
            {error && !data
              ? 'Retry to check for important alerts.'
              : 'Try a shorter search. Critical alerts always stay visible above.'}
          </p>
        </div>
      )}
    </section>
  );
}

export function WorkspaceDetails({ data, content, onApp }: PageProps) {
  return (
    <aside className="at-a-glance" aria-labelledby="glance-heading">
      <span className="eyebrow">YOUR PEOPLE & PLACE</span>
      <h2 id="glance-heading">Workspace details</h2>
      <div className="glance-row">
        <span className="glance-icon">
          <Icon name="building" />
        </span>
        <div>
          <small>Your home company</small>
          <strong>
            {companies.find((c) => c.id === data?.employee.companyId)?.name ??
              'FCM Travel Nigeria'}
          </strong>
        </div>
      </div>
      <div className="glance-row">
        <span className="glance-icon">
          <Icon name="globe" />
        </span>
        <div>
          <small>Your role</small>
          <strong>{data?.employee.role ?? 'Travel consultant'}</strong>
        </div>
      </div>
      <div className="glance-divider" />
      <span className="mini-label">
        <Icon name="book" size={18} /> LEARNING & DEVELOPMENT
      </span>
      <h3>Your next skill starts here.</h3>
      <p>Explore courses and resources for your professional development.</p>
      <button
        className="text-button"
        onClick={() => {
          const learning =
            content?.apps.find((a) => a.id === 'learning') ??
            data?.apps.find(
              (a) => a.id === 'learning' && data.employee.appIds.includes(a.id),
            );
          if (learning) onApp(learning);
        }}
        disabled={!data}
      >
        Visit Learning hub <Icon name="arrow" size={16} />
      </button>
    </aside>
  );
}
