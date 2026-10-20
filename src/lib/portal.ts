import type { NewsItem, PortalData } from '../types';

export const belongsTo = (audience: string[], company: string) =>
  audience.includes('group') || audience.includes(company);

export function selectContent(data: PortalData, company: string, query = '') {
  const term = query.trim().toLocaleLowerCase();
  const matches = (...text: string[]) => text.join(' ').toLocaleLowerCase().includes(term);
  const relevant = data.news.filter(item => belongsTo(item.companies, company));
  return {
    apps: data.apps.filter(app =>
      data.employee.appIds.includes(app.id) && belongsTo(app.companies, company) &&
      matches(app.name, app.description, app.category)),
    // Safety information is intentionally outside the search filter.
    critical: relevant.filter(item => item.severity === 'critical'),
    news: relevant.filter(item => matches(item.title, item.body, item.author))
      .sort((a, b) => rank[a.severity] - rank[b.severity] || b.date.localeCompare(a.date)),
  };
}
const rank: Record<NewsItem['severity'], number> = { critical: 0, warning: 1, information: 2 };

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'Africa/Lagos' }).format(new Date(date));
}
