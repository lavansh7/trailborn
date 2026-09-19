import { trek } from '../data/trek';
import './WhoShouldJoin.css';

export default function WhoShouldJoin() {
  return (
    <section className="who section" id="who" aria-labelledby="who-heading">
      <div className="container">
        <p className="section-label">Is This Trek For You?</p>
        <h2 id="who-heading" className="section-heading">
          Who Should Join
        </h2>

        <div className="who__grid">
          <div className="who__content">
            <p className="who__text">
              The 7 Lakes Trek is not a beginner trail. It is a point-to-point, alpine-style traverse through remote high-altitude terrain with no permanent shelters or support infrastructure along the route.
            </p>
            <p className="who__text">
              You should consider this trek if you have prior high-altitude trekking experience, a solid base level of fitness, and are comfortable spending multiple nights in tents at elevations above 3,000 m.
            </p>
            <p className="who__text">
              This trek is best suited for those who want to go beyond well-trodden tourist trails and experience the Dhauladhar range as genuine mountain terrain, not as a packaged day trip.
            </p>
          </div>

          <aside className="who__grade" aria-label="Trek difficulty grade">
            <span className="who__grade-label">Difficulty</span>
            <span className="who__grade-value">{trek.grade}</span>
            <div className="who__grade-bar" role="img" aria-label="Difficulty level: moderate to difficult">
              <div className="who__grade-fill" />
            </div>
            <ul className="who__grade-reqs">
              <li>Prior high-altitude experience</li>
              <li>Solid fitness base</li>
              <li>Comfort with multi-day camping</li>
              <li>Ability to carry personal daypack</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
