import type { Company, NewsItem } from '../types';
import { formatDate } from '../lib/portal';
import { Icon } from './Icon';

export const severityLabel = {
  information: 'Information',
  warning: 'Warning',
  critical: 'Critical',
};

export function NewsCard({
  item,
  company,
  onRead,
}: {
  item: NewsItem;
  company: Company;
  onRead: (item: NewsItem) => void;
}) {
  return (
    <article className={`news-card severity-${item.severity}`}>
      <div className="news-meta">
        <span className={`badge ${item.severity}`}>
          <span />
          {severityLabel[item.severity]}
        </span>
        <span>
          {item.companies.includes('group') ? 'Group-wide' : company.shortName}
        </span>
      </div>
      <h3>
        <button onClick={() => onRead(item)}>{item.title}</button>
      </h3>
      <p>{item.body}</p>
      <div className="news-footer">
        <span>{item.author}</span>
        <time dateTime={item.date}>{formatDate(item.date)}</time>
        <Icon name="arrow" size={16} />
      </div>
    </article>
  );
}
