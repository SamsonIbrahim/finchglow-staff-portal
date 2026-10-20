import type { Company } from '../types';
import { Icon } from './Icon';

export function CompanyIdentity({ company }: { company: Company }) {
  return (
    <section
      className="company-identity"
      aria-label={`${company.name} workspace`}
    >
      {company.logo ? (
        <div className="company-logo-plate">
          <img src={company.logo} alt={`${company.name} logo`} />
        </div>
      ) : (
        <span className="internal-unit-icon">
          <Icon name="building" size={24} />
        </span>
      )}
      <div className="company-identity-copy">
        <span className="eyebrow">CURRENT WORKSPACE</span>
        <strong>{company.name}</strong>
        <span>{company.function}</span>
      </div>
      <span className="company-context-label">Part of Finchglow Holdings</span>
    </section>
  );
}
