import { useState, useEffect } from 'react';

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    let animationFrameId;

    const handleScroll = () => {
      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // We want progress to start when the container hits the top of the viewport
      // and end when the bottom of the container hits the bottom of the viewport.
      
      const scrollableDistance = height - windowHeight;
      
      if (scrollableDistance <= 0) {
        setProgress(1);
        return;
      }

      // calculate how far we've scrolled past the top
      const scrolled = -top;
      
      let p = scrolled / scrollableDistance;
      
      // Clamp between 0 and 1
      if (p < 0) p = 0;
      if (p > 1) p = 1;

      setProgress(p);
    };

    const onScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [ref]);

  return progress;
}
