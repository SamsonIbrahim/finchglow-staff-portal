import { createRoot } from 'react-dom/client';
import { useEffect, useState, type CSSProperties } from 'react';
import { AppCard } from './components/AppCard';
import { CompanyIdentity } from './components/CompanyIdentity';
import { CriticalAlert } from './components/CriticalAlert';
import { Modal } from './components/Modal';
import { Icon } from './components/Icon';
import { companies } from './config/companies';
import { mockData } from './data/mock';
import './styles.css';
import './design-system.css';

const palette = [
  ['Surface', '--surface', 'Content stays on clean, neutral surfaces.'],
  ['Primary', '--primary', 'Shared actions, links and active navigation.'],
  ['Selected', '--selected', 'Quiet emphasis for selected items.'],
  ['Ink', '--text', 'Headings and primary content.'],
  ['Secondary', '--muted', 'Descriptions, dates and supporting context.'],
  ['Critical', '--critical', 'An incident requiring attention.'],
  ['Warning', '--warning', 'A caution or planned disruption.'],
  ['Success', '--success', 'A confirmed positive outcome.'],
];

function DesignSystem() {
  const [dark, setDark] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);
  return (
    <div className="design-guide">
      <header className="guide-header">
        <a href="/" aria-label="Back to staff workspace" className="group-logo">
          <span className="supplied-logo">
            <img src="/brand/finchglow-supplied.png" alt="Finchglow Holdings" />
          </span>
        </a>
        <div className="guide-header-actions">
          <a href="/" className="text-button">
            Open workspace <Icon name="arrow" size={16} />
          </a>
          <button
            className="icon-button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
        </div>
      </header>
      <main className="guide-main">
        <div className="guide-intro">
          <span className="eyebrow">
            FINCHGLOW STAFF PORTAL · INTERFACE SYSTEM 01
          </span>
          <h1>
            One group.
            <br />A considered system.
          </h1>
          <p>
            A shared visual language for everyday work: clear hierarchy,
            purposeful colour and familiar interactions across six workspaces.
          </p>
          <span className="guide-disclaimer">
            Assessment design proposal · Not an official corporate brand guide
          </span>
        </div>
        <section className="guide-section" aria-labelledby="principles-title">
          <div className="guide-section-heading">
            <span>01 / PRINCIPLES</span>
            <h2 id="principles-title">Every detail has a job.</h2>
          </div>
          <div className="principles-grid">
            <article>
              <span>01</span>
              <h3>Work comes first.</h3>
              <p>
                Applications are within easy reach. Decorative content never
                displaces a task or critical update.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Colour carries meaning.</h3>
              <p>
                Blue guides actions. Red signals urgency. Green confirms
                success. Labels reinforce every status.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Identity stays authentic.</h3>
              <p>
                The supplied group logo and verified subsidiary artwork stay
                intact. Shared controls stay familiar.
              </p>
            </article>
          </div>
        </section>
        <section className="guide-section" aria-labelledby="palette-title">
          <div className="guide-section-heading">
            <span>02 / SEMANTIC COLOUR</span>
            <h2 id="palette-title">White-led. Blue-connected.</h2>
            <p>
              These live swatches read the same semantic tokens as the
              workspace. Toggle the theme to inspect both modes.
            </p>
          </div>
          <div className="palette-grid">
            {palette.map(([name, token, description]) => (
              <article key={token}>
                <div
                  className="palette-swatch"
                  style={{ background: `var(${token})` }}
                />
                <h3>{name}</h3>
                <code>{token}</code>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <p className="guide-note">
            Light-theme text colours on white: primary 5.28:1 · secondary 4.97:1
            · critical 6.57:1 · success 5.92:1. Status is never conveyed by
            colour alone.
          </p>
        </section>
        <section className="guide-section" aria-labelledby="type-title">
          <div className="guide-section-heading">
            <span>03 / TYPE & RHYTHM</span>
            <h2 id="type-title">Hierarchy you can read.</h2>
          </div>
          <div className="type-specimens">
            <div>
              <span>34 / 1.25 · PAGE TITLE</span>
              <p className="type-title">Welcome back, Samson.</p>
            </div>
            <div>
              <span>22 / 1.4 · SECTION TITLE</span>
              <p className="type-section">Your applications</p>
            </div>
            <div>
              <span>16 / 1.5 · EMPHASIS</span>
              <p className="type-emphasis">
                Everything you need to get started.
              </p>
            </div>
            <div>
              <span>14 / 1.5 · BODY</span>
              <p>
                Find your tools, read the latest updates, and get on with your
                day.
              </p>
            </div>
            <div>
              <span>12 / 1.5 · SUPPORTING</span>
              <p className="type-caption">
                Published by Group technology · 20 October
              </p>
            </div>
          </div>
          <div className="spacing-scale">
            {[4, 8, 12, 16, 20, 24, 32, 40, 48].map((size) => (
              <div key={size}>
                <div style={{ width: size, height: size }} />
                <code>{size}</code>
              </div>
            ))}
          </div>
          <p className="guide-note">
            System fonts · 4 px base spacing scale · 6 / 10 / 14 px radii · 44
            px standard controls · 150 ms transitions · Reduced motion supported
          </p>
        </section>
        <section className="guide-section" aria-labelledby="components-title">
          <div className="guide-section-heading">
            <span>04 / SHARED COMPONENTS</span>
            <h2 id="components-title">Consistent from state to state.</h2>
            <p>
              These are the actual React components used by the portal. Open a
              tile or incident to inspect dialog behavior.
            </p>
          </div>
          <CriticalAlert
            alert={mockData.news[0]}
            onRead={() => setPreview('Critical incident detail')}
          />
          <div className="component-grid">
            <AppCard
              app={mockData.apps[0]}
              onLaunch={() => setPreview('Application launch')}
            />
            <div className="guide-controls">
              <h3>Actions & feedback</h3>
              <button
                className="primary-button"
                onClick={() => setPreview('Primary action')}
              >
                Primary action <Icon name="arrow" size={16} />
              </button>
              <button className="primary-button" disabled>
                Unavailable action
              </button>
              <button
                className="text-button"
                onClick={() => setPreview('Secondary action')}
              >
                Secondary action <Icon name="arrow" size={16} />
              </button>
              <div className="guide-badges">
                <span className="badge information">Information</span>
                <span className="badge warning">Warning</span>
                <span className="badge critical">Critical</span>
                <span className="badge success">Success</span>
              </div>
              <p>
                Tab through controls to inspect the visible focus ring. Escape
                closes a dialog and returns focus.
              </p>
            </div>
            <div className="empty-state">
              <Icon name="search" size={26} />
              <h3>No matching results</h3>
              <p>
                Empty states explain what happened and offer a useful next step.
              </p>
              <button
                className="text-button"
                onClick={() => setPreview('Clear search action')}
              >
                Clear search
              </button>
            </div>
          </div>
        </section>
        <section className="guide-section" aria-labelledby="identity-title">
          <div className="guide-section-heading">
            <span>05 / COMPANY IDENTITY</span>
            <h2 id="identity-title">
              Distinct identities. Shared foundations.
            </h2>
            <p>
              Each workspace has verified artwork and a configurable accent.
              Interface accents are accessible adaptations, not asserted
              official brand values. Shared Facilities uses an ordinary building
              icon, not a fabricated logo.
            </p>
          </div>
          <div className="identity-grid">
            {companies.map((company) => (
              <div
                key={company.id}
                style={
                  {
                    '--company-accent': dark
                      ? company.darkAccent
                      : company.accent,
                  } as CSSProperties
                }
              >
                <CompanyIdentity company={company} />
              </div>
            ))}
          </div>
        </section>
        <footer className="page-footer">
          <span>Finchglow Holdings · Staff portal assessment</span>
          <a className="text-button" href="/">
            Explore the workspace <Icon name="arrow" size={16} />
          </a>
        </footer>
      </main>
      {preview && (
        <Modal title={preview} onClose={() => setPreview(null)}>
          <p>
            This is a component preview. The same dialog handles application
            launches, news details and support information in the staff
            workspace.
          </p>
          <div className="dialog-note">
            <Icon name="check" />
            <p>
              Focus stays within the modal. Close it with Escape, the close
              button, or the return action.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
createRoot(document.getElementById('root')!).render(<DesignSystem />);
