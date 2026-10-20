import type { NewsItem } from '../types';
import { Icon } from './Icon';

export function CriticalAlert({
  alert,
  onRead,
}: {
  alert: NewsItem;
  onRead: (item: NewsItem) => void;
}) {
  return (
    <section
      className="critical-banner"
      role="alert"
      aria-label="Critical group alert"
    >
      <span className="critical-icon">
        <Icon name="shield" size={23} />
      </span>
      <div>
        <div className="alert-kicker">
          <span className="severity-dot" /> CRITICAL INCIDENT{' '}
          <span>
            {alert.companies.includes('group')
              ? 'GROUP-WIDE'
              : 'YOUR WORKSPACE'}
          </span>
        </div>
        <h2>{alert.title}</h2>
        <p>{alert.summary ?? alert.body}</p>
      </div>
      <button onClick={() => onRead(alert)}>
        View update <Icon name="arrow" size={17} />
      </button>
    </section>
  );
}
