import { trek } from '../data/trek';
import MorphSlider from '../components/MorphSlider';
import './AboutSection.css';

const stats = [
  { value: '35 km', label: 'Total Distance' },
  { value: `${trek.durationDays} Days, ${trek.durationNights} Nights`, label: 'Duration' },
  { value: '~4,200 m', label: 'Max Altitude' },
];

export default function AboutSection() {
  return (
    <section className="about section" id="overview" aria-labelledby="about-heading">
      <div className="about__inner container">
        <div className="about__text">
          <p className="section-label">The Trek</p>
          <h2 id="about-heading" className="section-heading">
            Why This Trek Is Different
          </h2>
          <p className="about__description">
            Most Dhauladhar treks visit a single destination — Triund, Indrahar Pass, or Kareri Lake alone. The 7 Lakes Trek is different. It is a continuous traverse across the high ridgeline connecting seven distinct glacial lakes, crossing from McLeod Ganj to Kareri through terrain that most trekkers never see.
          </p>
          <p className="about__description">
            This is not a loop. It is a point-to-point alpine-style trek — self-sufficient, mobile camps, no fixed lodges, no teahouses. You carry what you need and move through some of the most remote and visually stunning high-altitude landscape in Himachal Pradesh.
          </p>
        </div>

        <div className="about__visual-stats">
          <div className="about__visual-bg">
            <MorphSlider autoplay autoplayDelay={4} />
            <div className="about__visual-overlay" aria-hidden="true" />
          </div>
          <div className="about__stats" role="list" aria-label="Trek statistics">
            {stats.map((stat) => (
              <div className="about__stat" key={stat.label} role="listitem">
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
