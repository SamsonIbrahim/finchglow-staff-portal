import type { PortalApp } from '../types';
import { Icon } from './Icon';

export function AppCard({
  app,
  onLaunch,
}: {
  app: PortalApp;
  onLaunch: (app: PortalApp) => void;
}) {
  return (
    <button className="app-card" onClick={() => onLaunch(app)}>
      <div className="app-top">
        <span className={`app-icon icon-${app.icon}`}>
          <Icon name={app.icon} size={24} />
        </span>
        <Icon name="arrow" size={18} />
      </div>
      <h3>{app.name}</h3>
      <p>{app.description}</p>
      <span className="app-category">{app.category}</span>
    </button>
  );
}
