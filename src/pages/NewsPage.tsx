import { NewsSection, type PageProps } from './Sections';

export function NewsPage(props: PageProps) {
  return (
    <div className="news-page">
      <NewsSection {...props} />
    </div>
  );
}
