import { useEffect, useState } from 'react';

export const pages = {
  overview: {
    label: 'Overview',
    description: 'Your tools, your team, and what needs your attention.',
  },
  applications: {
    label: 'My applications',
    description: 'Find and launch the tools available in your workspace.',
  },
  news: {
    label: 'News & updates',
    description:
      'Operational updates and stories from your company and the group.',
  },
} as const;
export type Page = keyof typeof pages;

function readPage(): Page {
  const slug = window.location.hash.slice(2);
  return Object.hasOwn(pages, slug) ? (slug as Page) : 'overview';
}

// Hash URLs preserve direct links, refresh and browser history on static hosts.
export function usePage() {
  const [page, setPage] = useState<Page>(readPage);
  useEffect(() => {
    const update = () => setPage(readPage());
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  return page;
}
