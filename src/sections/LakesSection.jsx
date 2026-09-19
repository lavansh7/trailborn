import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { lakes } from '../data/lakes';
import './LakesSection.css';

export default function LakesSection() {
  const containerRef = useRef(null);
  
  // We track the active index in state so React can render the correct classes.
  // Using a ref to prevent unnecessary React re-renders on every tick.
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const listener = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const numLakes = lakes.length;

  useLayoutEffect(() => {
    if (isReducedMotion) return;

    let ticking = false;

    const updateProgress = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - viewportHeight;
      
      if (scrollableDistance <= 0) return;

      let p = scrolled / scrollableDistance;
      p = Math.max(0, Math.min(1, p));
      
      setProgress(p);

      const rawIndex = Math.floor(p * numLakes);
      const newActiveIndex = Math.min(rawIndex, numLakes - 1);
      
      setActiveIndex((prev) => (prev !== newActiveIndex ? newActiveIndex : prev));
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    
    updateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, [isReducedMotion, numLakes]);

  // Reduced motion uses all static lakes
  const effectiveActiveIndex = isReducedMotion ? -1 : activeIndex;

  return (
    <section className="lakes" id="lakes" aria-labelledby="lakes-heading">
      <div className="sr-only">
        <h2 id="lakes-heading">Seven Glacial Lakes. One Continuous Traverse.</h2>
      </div>

      <div 
        className="lakes-cinematic-wrapper" 
        ref={containerRef}
        style={{ height: isReducedMotion ? 'auto' : `${numLakes * 80}vh` }}
      >
        <div className="lakes-cinematic-sticky">
          
          {/* Vertical Progress Rail */}
          <div className="lakes-progress-rail" aria-hidden="true">
            {lakes.map((lake, i) => (
              <div 
                key={`rail-${lake.id}`} 
                className={`lakes-progress-dot ${i === effectiveActiveIndex ? 'is-active' : ''}`} 
              />
            ))}
            <div 
              className="lakes-progress-line" 
              style={{ transform: `scaleY(${progress})` }}
            />
          </div>

          <div className="lakes-chapters">
            {lakes.map((lake, i) => {
              const isActive = i === effectiveActiveIndex;
              const stateClass = isReducedMotion ? 'is-static' : isActive ? 'is-active' : 'is-inactive';

              return (
                <article
                  key={lake.id}
                  className={`lake-chapter ${stateClass}`}
                  aria-label={`Lake ${lake.number}: ${lake.name}`}
                >
                  <div className="lake-chapter__bg-wrapper">
                    <div
                      className="lake-chapter__bg"
                      style={{ backgroundImage: `url(${lake.image})` }}
                      role="img"
                      aria-label={lake.alt}
                    />
                    <div className="lake-chapter__overlay" />
                  </div>

                  <div className="lake-chapter__content container">
                    <div className="lake-chapter__meta">
                      <span className="lake-chapter__number" aria-hidden="true">
                        {String(lake.number).padStart(2, '0')} <span className="lake-chapter__total">/ {String(numLakes).padStart(2, '0')}</span>
                      </span>
                    </div>

                    <div className="lake-chapter__text">
                      <h3 className="lake-chapter__name">
                        <span className="lake-chapter__name-inner">{lake.name}</span>
                      </h3>
                      <p className="lake-chapter__desc">
                        {lake.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
