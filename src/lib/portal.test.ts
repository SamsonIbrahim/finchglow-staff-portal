import { describe, expect, it } from 'vitest';
import { mockData } from '../data/mock';
import { companies } from '../config/companies';
import { selectContent } from './portal';

describe('workspace visibility', () => {
  it('keeps group critical alerts visible in every company, even for unmatched searches', () => {
    for (const company of companies) {
      const result = selectContent(mockData, company.id, 'not-a-real-match');
      expect(result.critical.map((item) => item.id)).toContain('payment');
      expect(result.apps).toHaveLength(0);
      expect(result.news).toHaveLength(0);
    }
  });
  it('changes company content without granting extra application entitlements', () => {
    const restricted = {
      ...mockData,
      employee: { ...mockData.employee, appIds: ['hr'] },
    };
    expect(
      selectContent(restricted, 'academy').apps.map((app) => app.id),
    ).toEqual(['hr']);
    const academy = selectContent(mockData, 'academy');
    expect(academy.apps.map((app) => app.id)).toContain('academy');
    expect(academy.apps.map((app) => app.id)).not.toContain('bookings');
    expect(academy.news.map((item) => item.id)).not.toContain('corporate');
  });
  it('searches case-insensitively across app and news descriptions', () => {
    expect(
      selectContent(mockData, 'tmc', '  LEAVE ').apps.map((app) => app.id),
    ).toEqual(['hr']);
    expect(
      selectContent(mockData, 'tmc', 'airport transfers').news.map(
        (item) => item.id,
      ),
    ).toEqual(['corporate']);
  });
  it('supports a seventh company with configuration and data alone', () => {
    const data = {
      ...mockData,
      apps: [
        ...mockData.apps,
        { ...mockData.apps[0], id: 'new-tool', companies: ['new-company'] },
      ],
      employee: { ...mockData.employee, appIds: ['hr', 'new-tool'] },
    };
    expect(
      selectContent(data, 'new-company').apps.map((app) => app.id),
    ).toEqual(['hr', 'new-tool']);
    expect(selectContent(data, 'new-company').critical).toHaveLength(1);
  });
  it('prioritizes severity over chronological order', () => {
    expect(
      selectContent(mockData, 'tmc')
        .news.slice(0, 2)
        .map((item) => item.severity),
    ).toEqual(['critical', 'warning']);
  });
});
