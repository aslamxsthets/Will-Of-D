import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface PageTurnState {
  rotateY: number;
  rotateX: number;
  scaleX: number;
  shadow: number;
  isTurning: boolean;
  curlAmount: number;
}

export function usePageTurn() {
  const [pageStates, setPageStates] = useState<Map<string, PageTurnState>>(new Map());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const rafId = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  const registerSection = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current.set(id, element);
    } else {
      sectionRefs.current.delete(id);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const updatePageTurns = () => {
      const newStates = new Map<string, PageTurnState>();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      sectionRefs.current.forEach((element, id) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const relativeScroll = scrollY - elementTop + viewportHeight;
        const progress = Math.max(0, Math.min(1, relativeScroll / (viewportHeight + rect.height)));

        let rotateY = 0;
        let rotateX = 0;
        let scaleX = 1;
        let shadow = 0;
        let isTurning = false;
        let curlAmount = 0;

        if (progress < 0.25) {
          // Page entering from below - slight lift and curl
          const enterProgress = progress / 0.25;
          const eased = 1 - Math.pow(1 - enterProgress, 3);
          rotateX = (1 - eased) * (isMobile ? 1 : 4);
          shadow = (1 - eased) * 0.2;
          curlAmount = (1 - eased) * 0.5;
        } else if (progress > 0.75) {
          // Page leaving - dramatic turn
          const leaveProgress = (progress - 0.75) / 0.25;
          const eased = Math.pow(leaveProgress, 2);
          isTurning = true;
          
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

        newStates.set(id, { rotateY, rotateX, scaleX, shadow, isTurning, curlAmount });
      });

      setPageStates(newStates);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updatePageTurns);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  return { pageStates, registerSection };
}
