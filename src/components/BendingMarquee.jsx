import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import './BendingMarquee.css';

const DEFAULT_ITEMS = [
  'SEVEN LAKES', '✦',
  'ONE RIDGE', '✦',
  '35 KM', '✦',
  '4 DAYS', '✦',
  '3 NIGHTS', '✦',
  'DHAULADHAR', '✦',
  'HIGH ALPINE WILDERNESS', '✦',
  '40% OFF FOR NMIMS STUDENTS', '✦'
];

export default function BendingMarquee({ items = DEFAULT_ITEMS, speed = 1.2 }) {
  const textPathRef = useRef(null);
  const measureRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // We append a trailing space so the end of the loop doesn't stick to the beginning
  const singleString = items.join('   ') + '   ';
  
  // We repeat the string enough times to fill the massive 3600px curve and have overflow
  const repeatedString = Array(10).fill(singleString).join('');

  useLayoutEffect(() => {
    if (isReducedMotion) {
      if (textPathRef.current) {
        // Just center it beautifully if motion is disabled
        textPathRef.current.setAttribute('startOffset', '50%');
        textPathRef.current.setAttribute('text-anchor', 'middle');
      }
      return;
    }

    let frameId;
    let offset = 0;

    const animate = () => {
      if (!textPathRef.current || !measureRef.current) return;
      
      const singleLoopWidth = measureRef.current.getComputedTextLength();
      
      // Protect against 0 width if fonts haven't loaded perfectly on first tick
      if (singleLoopWidth > 0) {
        offset -= speed;
        // Seamless perfect modulo loop
        if (offset <= -singleLoopWidth) {
          offset += singleLoopWidth;
        }
        textPathRef.current.setAttribute('startOffset', `${offset}px`);
      }
      
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isReducedMotion, speed]);

  return (
    <div className="bending-marquee-wrapper" aria-hidden="true">
      {/* Screen Reader Only static text */}
      <div className="sr-only">{items.filter(i => i !== '✦').join(', ')}</div>

      <div className="bending-marquee-inner">
        {/* We use a wide viewBox. The component will be forced to be at least this wide in CSS to avoid text shrinking on mobile. */}
        <svg 
          className="bending-marquee-svg" 
          viewBox="0 0 1200 300" 
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 
            Visible Ribbon Shape
            Top Edge: M 0,80 C 400,160 800,160 1200,80
            Bottom Edge: L 1200,190 C 800,270 400,270 0,190 Z
            This gives a 110px thick ribbon with a gentler curve.
          */}
          <path 
            d="M 0,110 C 400,150 800,150 1200,110 L 1200,180 C 800,220 400,220 0,180 Z" 
            fill="#f9f9f9" 
          />

          {/* 
            Invisible Text Path (Exactly in the middle)
            M 0,135 C 400,215 800,215 1200,135
            Extended tangentially left and right.
          */}
          <path 
            id="marquee-curve" 
            d="M -1200,25 L 0,145 C 400,185 800,185 1200,145 L 2400,25" 
            fill="none" 
          />

          {/* Hidden text used exclusively for exact pixel width measurement of a single loop */}
          <text 
            ref={measureRef} 
            className="bending-marquee-text" 
            opacity="0" 
            pointerEvents="none"
          >
            {singleString}
          </text>

          <text className="bending-marquee-text">
            <textPath 
              href="#marquee-curve" 
              ref={textPathRef} 
              startOffset="0px"
              dominantBaseline="middle"
            >
              {repeatedString}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}
