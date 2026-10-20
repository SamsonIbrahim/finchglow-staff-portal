import type { Company } from '../types';

// Concept identities for the assessment, not official subsidiary brand assets.
// A seventh business needs one entry here and matching content/entitlements.
export const companies: Company[] = [
  { id: 'tmc', name: 'Travel Management', shortName: 'Travel desk', description: 'Corporate journeys, thoughtfully managed.', icon: 'briefcase', accent: '#16665e', darkAccent: '#87dace' },
  { id: 'academy', name: 'Aviation Academy', shortName: 'Academy', description: 'A place to learn. A world to explore.', icon: 'book', accent: '#6545a1', darkAccent: '#c5aeff' },
  { id: 'ota', name: 'Online Travel', shortName: 'Online travel', description: 'Helping the next journey take flight.', icon: 'globe', accent: '#155fa0', darkAccent: '#9acaff' },
  { id: 'b2b', name: 'Agent Partners', shortName: 'Agent partners', description: 'Better connections for our travel partners.', icon: 'people', accent: '#8c4d21', darkAccent: '#f3be92' },
  { id: 'holidays', name: 'Holidays & Experiences', shortName: 'Holidays', description: 'Make room for extraordinary experiences.', icon: 'sun', accent: '#a13f64', darkAccent: '#ffadc9' },
  { id: 'facilities', name: 'Shared Facilities', shortName: 'Facilities', description: 'Keeping every part of our group moving.', icon: 'building', accent: '#4c681f', darkAccent: '#c1df91' },
];
