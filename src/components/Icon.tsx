import type { IconName } from '../types';

const paths: Record<IconName, string> = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  plane: 'm22 2-7 20-4-9-9-4 20-7Z M22 2 11 13',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  book: 'M12 5v16 M12 5C8 2 4 3 2 4v15c3-1 6-1 10 2 M12 5c4-3 8-2 10-1v15c-3-1-6-1-10 2',
  building: 'M4 21V3h12v18 M16 9h4v12 M8 7h4 M8 11h4 M8 15h4 M9 21v-2h2v2 M2 21h20',
  briefcase: 'M9 7V3h6v4 M3 7h18v14H3z M3 12c6 4 12 4 18 0 M10 14h4',
  sun: 'M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5 19 19 M5 19l1.5-1.5 M17.5 6.5 19 5 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  moon: 'M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z',
  search: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
  help: 'M9 9a3 3 0 1 1 5 2c-2 1-2 1-2 3 M12 17h.01 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  close: 'm6 6 12 12 M6 18 18 6',
  check: 'm5 12 4 4L19 6',
  globe: 'M2 12h20 M12 2c6 6 6 14 0 20-6-6-6-14 0-20 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  shield: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6L12 2Z M12 7v6 M12 17h.01',
};
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
