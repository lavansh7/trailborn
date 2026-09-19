import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { itinerary, routeConditionNote } from '../data/itinerary';
import StrokeText from '../components/StrokeText';
import './RouteSection.css';

// SVG Configuration
const SVG_VIEWBOX = "0 0 1000 600";

// Route nodes with strict storytelling milestones defined by the user
const ROUTE_NODES = [
  { id: 'mcleod', name: 'McLeod Ganj', elevation: 1800, distance: '0 km', milestone: 0.00, x: 100, y: 450, day: 'Day 01' },
  { id: 'triund', name: 'Triund', elevation: 2850, distance: '9 km', milestone: 0.12, x: 250, y: 350, day: 'Day 01' },
  { id: 'snowline', name: 'Snowline Camp', elevation: 2900, distance: '10 km', milestone: 0.28, x: 350, y: 300, day: 'Day 01' },
  { id: 'nagdal', name: 'Nag Dal', elevation: 3500, distance: '14 km', milestone: 0.43, x: 450, y: 200, day: 'Day 02' },
  { id: 'kalikund', name: 'Kali Kund', elevation: 3700, distance: '16 km', milestone: 0.52, x: 550, y: 180, day: 'Day 02' },
  { id: 'camp6', name: '6th Lake Camp', elevation: 3800, distance: '18 km', milestone: 0.65, x: 650, y: 250, day: 'Day 02' },
  { id: 'lamdal', name: 'Lam Dal', elevation: 3900, distance: '22 km', milestone: 0.75, x: 750, y: 220, day: 'Day 03' },
  { id: 'karerilake', name: 'Kareri Lake', elevation: 2950, distance: '28 km', milestone: 0.87, x: 850, y: 350, day: 'Day 03' },
  { id: 'kareri', name: 'Kareri Village', elevation: 1800, distance: '35 km', milestone: 1.00, x: 900, y: 500, day: 'Day 04' },
];

const createSmoothPath = (points) => {
  return points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (pt.x - prev.x) * 0.5;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (pt.x - prev.x) * 0.5;
    const cpy2 = pt.y;
    return `${acc} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${pt.x} ${pt.y}`;
  }, '');
};

const routePathData = createSmoothPath(ROUTE_NODES);

export default function RouteSection() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const travellerRef = useRef(null);
  
  // DOM refs to bypass React state for 60fps tracking
  const nodeRefs = useRef([]);
  
  // State for content rendering
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useLayoutEffect(() => {
    if (isReducedMotion) return;

    let ticking = false;
    let pathLength = 0;
    
    if (pathRef.current) {
      pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = pathLength;
    }

    const updateRouteProgress = () => {
      if (!containerRef.current || !pathLength) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const scrolled = -rect.top;
      const scrollableDistance = rect.height - viewportHeight;
      
      let p = scrolled / scrollableDistance;
      p = Math.max(0, Math.min(1, p));

      // 1. Draw SVG Path
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = pathLength * (1 - p);
      }
      
      // 2. Move Traveller Marker
      if (travellerRef.current) {
        const targetLength = p >= 1 ? pathLength : p * pathLength;
        const point = pathRef.current.getPointAtLength(targetLength);
        travellerRef.current.setAttribute('cx', point.x);
        travellerRef.current.setAttribute('cy', point.y);
      }

      // 3. Evaluate Day Threshold (0-0.25, 0.25-0.5, etc.)
      const newDayIndex = Math.min(3, Math.floor(p * 4));
      setActiveDayIndex((prev) => (prev !== newDayIndex ? newDayIndex : prev));

      // 4. Determine Active Node and Update SVG Classes visually
      for (let i = 0; i < ROUTE_NODES.length; i++) {
        const node = ROUTE_NODES[i];
        const nextNode = ROUTE_NODES[i + 1];
        
        const gElement = nodeRefs.current[i];
        if (!gElement) continue;

        gElement.classList.remove('is-active', 'is-completed', 'is-upcoming');

        if (p >= node.milestone && (!nextNode || p < nextNode.milestone)) {
          gElement.classList.add('is-active');
        } else if (p >= node.milestone) {
          gElement.classList.add('is-completed');
        } else {
          gElement.classList.add('is-upcoming');
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateRouteProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      if (pathRef.current) pathLength = pathRef.current.getTotalLength();
      updateRouteProgress();
    }, { passive: true });
    
    updateRouteProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isReducedMotion]);

  // Reduced motion render (Static vertical list)
  if (isReducedMotion) {
    return (
      <section className="route-experience section" id="route">
        <div className="container">
          <h2 className="section-heading">The Traverse</h2>
          <div className="route-reduced-motion-list">
             {itinerary.map(day => (
               <article className="rm-day" key={day.day}>
                 <h3>Day {day.day}: {day.path.join(' → ')}</h3>
                 <p className="rm-meta">{day.distance} · {day.duration}</p>
                 <p>{day.description}</p>
               </article>
             ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="route-experience section" id="route" aria-labelledby="route-heading">
      <div className="container">
        <p className="section-label">Route &amp; Itinerary</p>
        <StrokeText
          text="THE TRAVERSE"
          strokeColor="#6db5c4"
          fillColor="#f0ede8"
          strokeWidth={1.4}
          drawDuration={1.6}
          fillDelay={0.2}
          stagger={0.05}
          ease="power2.out"
          trigger="scroll"
          fillMode="wipe"
          fontSize={80}
          fontWeight={600}
          letterSpacing={0}
          className="section-heading"
        />
      </div>

      {/* 400vh Scroll Container */}
      <div className="route-scroll-space" ref={containerRef}>
        
        {/* Sticky Stage pinning the UI to the viewport */}
        <div className="route-sticky-stage">
          
          <div className="container route-split-layout">
            
            {/* Left Column: Itinerary Storytelling */}
            <div className="route-content-col">
              <div className="route-days-stack">
                {itinerary.map((day, i) => {
                  const isActive = i === activeDayIndex;
                  return (
                    <article 
                      key={day.day} 
                      className={`route-day-card ${isActive ? 'is-active' : ''}`}
                      aria-hidden={!isActive}
                    >
                      <div className="route-day-indicator">
                        <span className="route-day-dot" aria-hidden="true" />
                        DAY 0{day.day} / 04
                      </div>
                      
                      <h3 className="route-day-title">
                        {day.editorialTitle}
                      </h3>
                      
                      <div className="route-day-path-line">
                        {day.path.map((waypoint, idx) => (
                          <span key={idx} className="waypoint-wrap">
                            <span className={`waypoint-text ${idx === 1 ? 'is-primary' : ''}`}>
                              {waypoint.toUpperCase()}
                            </span>
                            {idx < day.path.length - 1 && <span className="waypoint-arrow">&rarr;</span>}
                          </span>
                        ))}
                      </div>
                      
                      <div className="route-day-metrics">
                        <div className="metric-box">
                          <span className="metric-val">{day.distance.split(' ')[0]}</span>
                          <span className="metric-lbl">{day.distance.split(' ')[1]}</span>
                        </div>
                        <div className="metric-box">
                          <span className="metric-val">{day.duration.split(' ')[0]}</span>
                          <span className="metric-lbl">{day.duration.split(' ')[1]}</span>
                        </div>
                        <div className="metric-box">
                          <span className="metric-val">{day.altitude.split(' ')[0]}</span>
                          <span className="metric-lbl">{day.altitude.split(' ').slice(1).join(' ')}</span>
                        </div>
                      </div>
                      
                      <p className="route-day-desc">{day.description}</p>
                      
                      <div className="route-day-terrain">
                        {day.terrain}
                      </div>

                      {/* Final Complete Message for Day 4 */}
                      {i === 3 && activeDayIndex === 3 && (
                        <div className="route-final-state">EXPEDITION COMPLETE</div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Visual SVG Route */}
            <div className="route-map-col" aria-hidden="true">
              <svg className="route-map-topo" viewBox={SVG_VIEWBOX} preserveAspectRatio="xMidYMid slice">
                <path d="M 0 350 Q 300 100 600 350 T 1000 200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <path d="M 0 450 Q 200 250 500 450 T 1000 350" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                <path d="M 0 550 Q 400 400 700 550 T 1000 450" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
              </svg>

              <svg className="route-map-svg" viewBox={SVG_VIEWBOX} preserveAspectRatio="xMidYMid meet">
                {/* Dashed Future Path */}
                <path d={routePathData} fill="none" className="route-path-base" />
                
                {/* Solid Active Progress Path */}
                <path
                  ref={pathRef}
                  d={routePathData}
                  fill="none"
                  className="route-path-active"
                />

                {ROUTE_NODES.map((node, i) => (
                  <g 
                    key={node.id} 
                    ref={(el) => (nodeRefs.current[i] = el)} 
                    className={`route-node ${i === 0 ? 'is-active' : 'is-upcoming'}`}
                  >
                    <circle cx={node.x} cy={node.y} r="16" className="route-node-pulse" />
                    <circle cx={node.x} cy={node.y} r="6" className="route-node-marker" />
                    <text x={node.x} y={node.y - 18} textAnchor="middle" className="route-node-label">
                      {node.name}
                    </text>
                  </g>
                ))}

                <circle 
                  ref={travellerRef}
                  cx={ROUTE_NODES[0].x} 
                  cy={ROUTE_NODES[0].y} 
                  r="4" 
                  className="route-traveller" 
                />
              </svg>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
