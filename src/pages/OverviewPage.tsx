import {
  ApplicationsSection,
  NewsSection,
  WorkspaceDetails,
  type PageProps,
} from './Sections';

export function OverviewPage(props: PageProps) {
  return (
    <div className="overview-page">
      <div className="content-columns">
        <ApplicationsSection {...props} limit={3} />
        <WorkspaceDetails {...props} />
      </div>
      <NewsSection {...props} limit={2} />
    </div>
  );
}
