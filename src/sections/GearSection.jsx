import { gearProvided, gearBring } from '../data/gear';
import './GearSection.css';

const ICONS = {
  tent: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L2 20h20L12 2z" /><line x1="12" y1="2" x2="12" y2="20" />
    </svg>
  ),
  'sleeping-bag': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 8v8" /><path d="M12 8v8" />
    </svg>
  ),
  meal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  guide: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  permit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  safety: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export default function GearSection() {
  return (
    <section className="gear section" id="gear" aria-labelledby="gear-heading">
      <div className="container">
        <p className="section-label">Gear &amp; Logistics</p>
        <h2 id="gear-heading" className="section-heading">
          What We Provide &amp; What You Bring
        </h2>

        <div className="gear__grid">
          {/* Provided */}
          <div className="gear__column">
            <h3 className="gear__column-title">What We Provide</h3>
            <ul className="gear__list" role="list">
              {gearProvided.map((g) => (
                <li className="gear__item" key={g.id}>
                  <div className="gear__icon-wrap" aria-hidden="true">
                    <span className="gear__icon">
                      {ICONS[g.icon] || ICONS.tent}
                    </span>
                  </div>
                  <div className="gear__item-content">
                    <strong className="gear__item-name">{g.item}</strong>
                    <p className="gear__item-desc">{g.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Bring */}
          <div className="gear__column">
            <h3 className="gear__column-title">What You Bring</h3>
            <ul className="gear__list" role="list">
              {gearBring.map((g) => (
                <li className="gear__item gear__item--bring" key={g.id}>
                  <div className="gear__check-wrap" aria-hidden="true">
                    <span className="gear__check">✓</span>
                  </div>
                  <div className="gear__item-content">
                    <strong className="gear__item-name">{g.item}</strong>
                    <p className="gear__item-desc">{g.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
