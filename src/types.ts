export type IconName =
  | 'grid'
  | 'plane'
  | 'people'
  | 'book'
  | 'building'
  | 'briefcase'
  | 'sun'
  | 'moon'
  | 'search'
  | 'arrow'
  | 'bell'
  | 'help'
  | 'close'
  | 'check'
  | 'globe'
  | 'shield';
export type Severity = 'information' | 'warning' | 'critical';
export interface Company {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: IconName;
  accent: string;
  darkAccent: string;
}
export interface PortalApp {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: IconName;
  companies: string[];
}
export interface NewsItem {
  id: string;
  title: string;
  body: string;
  summary?: string;
  severity: Severity;
  companies: string[];
  date: string;
  author: string;
}
export interface PortalData {
  apps: PortalApp[];
  news: NewsItem[];
  employee: { name: string; companyId: string; role: string; appIds: string[] };
}
