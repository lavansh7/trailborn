import { trek } from '../data/trek';
import SplitText from '../components/SplitText';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-label="Hero">
      {/* Video / image background */}
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero/hero-poster.jpg"
        >
          <source src="/assets/hero/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay" />
      </div>

      {/* Main asymmetric content stack */}
      <div className="hero__content container">
        <div className="hero__main">
          
          {/* Eyebrow */}
          <p className="hero__eyebrow hero__anim-up" style={{ animationDelay: '0.2s' }}>
            DHAULADHAR RANGE &middot; HIMACHAL PRADESH
          </p>

          {/* Headline */}
          <SplitText
            tag="h1"
            text="SEVEN LAKES. ONE RIDGE. ZERO COMPROMISES."
            className="hero__headline hero__anim-up"
            delay={400}
            duration={1.2}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="left"
          />

          {/* Subheadline */}
          <p className="hero__sub hero__anim-up" style={{ animationDelay: '0.6s' }}>
            An alpine-style journey through the hidden landscapes of the Dhauladhar, where every ridge leads somewhere wild.
          </p>

          {/* CTA Buttons */}
          <div className="hero__actions hero__anim-up" style={{ animationDelay: '0.8s' }}>
            <button 
              className="hero__btn hero__btn--primary" 
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              EXPLORE THE TREK &rarr;
            </button>
            <button 
              className="hero__btn hero__btn--secondary" 
              onClick={() => document.getElementById('lakes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW ALL TREKS
            </button>
          </div>
          
        </div>
      </div>

      {/* Bottom Information Bar */}
      <div className="hero__bottom container hero__anim-up" style={{ animationDelay: '1.2s' }}>
        <div className="hero__bottom-left">
          <span className="hero__collection-num">01 / 04</span>
          <span className="hero__collection-label">TREK COLLECTION</span>
        </div>
        
        <div className="hero__bottom-right">
          <span className="hero__scroll-text">SCROLL TO EXPLORE &darr;</span>
          <div className="hero__scroll-line-wrap">
            <div className="hero__scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
