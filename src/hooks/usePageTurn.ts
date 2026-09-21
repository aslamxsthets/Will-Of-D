import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** Live viewport size, supplied by App so breakpoint changes are picked up. */
export interface PageTurnMetrics {
  width: number;
  height: number;
}

/**
 * Comic page-turn scroll effect — PERFORMANCE EDITION v2.
 *
 * v1 called getBoundingClientRect() on every single scroll frame, which forces
 * a layout (style recalculation + geometry query) before each paint. That is
 * the primary source of upward-scroll jank.
 *
 * v2 caches each section's absolute top + height once (on mount/resize) and
 * reads only `window.scrollY` inside the rAF callback — a pure JS read with
 * zero layout cost. getBoundingClientRect is only called when `metrics`
 * changes (resize / orientation change), which is rare.
 *
 * State is still gone: CSS custom properties are written directly to DOM nodes.
 */
export function usePageTurn(metrics?: PageTurnMetrics) {
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const rafId = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  // Cached absolute positions: { top, height } per section element.
  // Keyed by the HTMLElement itself so lookup is O(1) during scroll.
  const positionCache = useRef<Map<HTMLElement, { top: number; height: number }>>(new Map());

  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    } else {
      const el = sectionRefs.current.get(id);
      if (el) positionCache.current.delete(el);
      sectionRefs.current.delete(id);
    }
  }, []);

  /** Re-read all positions from the DOM. Called once on mount + on resize. */
  const rebuildCache = useCallback(() => {
    positionCache.current.clear();
    const scrollY = window.scrollY;
    sectionRefs.current.forEach((element) => {
      const rect = element.getBoundingClientRect();
      positionCache.current.set(element, {
        top: rect.top + scrollY,
        height: rect.height,
      });
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      // Clear any leftover transforms set before reduced-motion was toggled on.
      sectionRefs.current.forEach((el) => {
        el.style.removeProperty('--pt-ry');
        el.style.removeProperty('--pt-rx');
        el.style.removeProperty('--pt-sx');
        el.style.removeProperty('--pt-sh');
        el.style.removeProperty('--pt-curl');
        el.style.removeProperty('--pt-turning');
      });
      return;
    }

    const viewportWidth = metrics?.width || window.innerWidth;
    const isMobile = viewportWidth < 768;
    const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

    // Build/rebuild the position cache whenever metrics (resize) changes.
    // Use a short rAF delay so layout is settled after a resize.
    const cacheFrame = requestAnimationFrame(rebuildCache);

    const updatePageTurns = () => {
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      positionCache.current.forEach((pos, element) => {
        const relativeScroll = scrollY - pos.top + viewportHeight;
        const progress = Math.max(0, Math.min(1, relativeScroll / (viewportHeight + pos.height)));

        let rotateY = 0;
        let rotateX = 0;
        let scaleX = 1;
        let shadow = 0;
        let curlAmount = 0;
        let isTurning = 0;

        if (progress < 0.25) {
          const enterProgress = progress / 0.25;
          const eased = 1 - Math.pow(1 - enterProgress, 3);
          rotateX = (1 - eased) * (isMobile ? 1 : 4);
          shadow = (1 - eased) * 0.2;
          curlAmount = (1 - eased) * 0.5;
        } else if (progress > 0.75) {
          const leaveProgress = (progress - 0.75) / 0.25;
          const eased = Math.pow(leaveProgress, 2);
          isTurning = 1;

          if (isMobile) {
            rotateY = eased * 6;
            rotateX = eased * 2;
            scaleX = 1 - eased * 0.02;
          } else if (isTablet) {
            rotateY = eased * 12;
            rotateX = eased * 4;
            scaleX = 1 - eased * 0.03;
          } else {
            rotateY = eased * 20;
            rotateX = eased * 6;
            scaleX = 1 - eased * 0.05;
          }
          shadow = eased * 0.6;
          curlAmount = eased;
        }

        element.style.setProperty('--pt-ry', `${rotateY.toFixed(3)}deg`);
        element.style.setProperty('--pt-rx', `${rotateX.toFixed(3)}deg`);
        element.style.setProperty('--pt-sx', scaleX.toFixed(4));
        element.style.setProperty('--pt-sh', shadow.toFixed(4));
        element.style.setProperty('--pt-curl', curlAmount.toFixed(4));
        element.style.setProperty('--pt-turning', String(isTurning));
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updatePageTurns);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(cacheFrame);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion, metrics, rebuildCache]);

  return { registerSection };
}
