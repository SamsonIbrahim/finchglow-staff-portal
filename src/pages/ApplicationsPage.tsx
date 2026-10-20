import { ApplicationsSection, type PageProps } from './Sections';

export function ApplicationsPage(props: PageProps) {
  return (
    <div className="applications-page">
      <ApplicationsSection {...props} />
    </div>
  );
}
