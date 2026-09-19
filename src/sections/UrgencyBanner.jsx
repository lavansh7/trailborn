import { trek } from '../data/trek';
import './UrgencyBanner.css';

export default function UrgencyBanner() {
  return (
    <section className="urgency" aria-label="Trek batch information">
      <div className="container urgency-container">
        <span className="urgency__item">
          BATCH DEPARTS <strong className="urgency__highlight">{trek.dates.split('–')[0].trim()} {trek.dates.split('–')[1]?.trim().split(' ').slice(-1)}</strong>
        </span>
        <span className="urgency__dot" aria-hidden="true">•</span>
        <span className="urgency__item">
          Contact before <strong>{trek.contactDeadline}</strong> to secure your spot.
        </span>
        <span className="urgency__dot" aria-hidden="true">•</span>
        <span className="urgency__badge">
          <span className="urgency__badge-label">NMIMS Students</span>
          <span className="urgency__badge-value">40% OFF</span>
        </span>
      </div>
    </section>
  );
}
