import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * Back-to-top control. Appears once the visitor has scrolled past roughly one
 * and a half viewports, and is removed from the tab order while hidden so it
 * never becomes an invisible keyboard trap.
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const update = () => {
      frameRef.current = 0;
      setIsVisible(window.scrollY > window.innerHeight * 1.5);
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`back-to-top ${isVisible ? 'is-visible' : ''}`}
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      <ChevronUp size={22} aria-hidden="true" />
    </button>
  );
}