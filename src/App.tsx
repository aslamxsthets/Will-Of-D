import { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import WhatWeDo from './components/WhatWeDo/WhatWeDo';
import WhyJoin from './components/WhyJoin/WhyJoin';
import Recruitment from './components/Recruitment/Recruitment';
import RecruitmentForm from './components/RecruitmentForm/RecruitmentForm';
import Team from './components/Team/Team';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/UI/ScrollProgress';
import BackToTop from './components/UI/BackToTop';
import BlurFade from './components/UI/BlurFade';
import { usePageTurn } from './hooks/usePageTurn';
import { useReducedMotion } from './hooks/useReducedMotion';

/* ---------------------------------------------------------------------------
   The background scene and the page divider are declared at module scope, NOT
   inside <App />. Defining them inside used to create a brand-new component
   type on every render, so React unmounted and remounted the whole background
   each time App re-rendered — which re-resolved the image and re-ran effects.
   --------------------------------------------------------------------------- */

/**
 * Fixed, full-viewport Deadpool scene.
 *
 * Layers, back to front:
 *   atmosphere -> parallax red bloom
 *   stage      -> fixed 16:9 box that reproduces `center / cover` exactly, so it
 *                 lines up pixel-for-pixel with the #dp-boot first-paint layer
 *                 in index.html and the hand-over is invisible
 *   parts      -> clipped body regions animated for the "GIF" motion
 *   vignette   -> foreground darkening, moved furthest on scroll for depth
 *   sweep      -> slow specular highlight travelling across the art
 *
 * `--dp-par` (a small px offset) is written directly to the node on scroll: the
 * layers then move by different amounts, which is what produces the 3D
 * parallax. It is scroll-driven on purpose — an earlier version followed the
 * mouse, which made the artwork jump around as the pointer crossed the page.
 */

function DeadpoolScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Hand over from the instant first-paint layer as soon as our own copy of the
  // image is decoded, so the swap can never show an empty frame.
  useEffect(() => {
    let cancelled = false;

    const reveal = () => {
      if (!cancelled) document.body.classList.add('dp-ready');
    };

    const image = new Image();
    image.src = `${import.meta.env.BASE_URL}Wade Wilson Deadpool GIF by Xbox.gif`;

    if (typeof image.decode === 'function') {
      image.decode().then(reveal).catch(reveal);
    } else {
      image.onload = reveal;
      image.onerror = reveal;
    }

    // Safety net: never leave the boot layer stacked over the page.
    const fallback = window.setTimeout(reveal, 3000);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  // Scroll-driven parallax. rAF-throttled, and capped to +-14px so the artwork
  // cannot drift or expose an edge.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || reducedMotion) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = window.scrollY / Math.max(1, window.innerHeight);

      // Vertical drift that drives the layer parallax.
      const offset = Math.max(-14, Math.min(14, progress * 6));
      scene.style.setProperty('--dp-par', offset.toFixed(2));

      // Additional Y rotation, capped at ~2.2deg: the artwork turns towards the
      // viewer as the page advances, which is what sells the 3D depth. Kept
      // small so the ink outline never appears to skew.
      const rotation = Math.max(0, Math.min(2.2, progress * 0.55));
      scene.style.setProperty('--dp-rot', `${rotation.toFixed(2)}deg`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div ref={sceneRef} className="dp-scene" aria-hidden="true">
      <img
        className="dp-gif"
        src={`${import.meta.env.BASE_URL}Wade Wilson Deadpool GIF by Xbox.gif`}
        alt=""
        aria-hidden="true"
      />
      <div className="dp-atmosphere" />

      <div className="dp-float">
        <div className="dp-stage">
          {/* Complete, static artwork. Never transformed, so the silhouette and
              the ink outline around the character can never tear or ghost. */}
          <div className="dp-layer dp-base" />

          {/* Moving regions, layered on top. Each contains only pixels identical
              to the base beneath it, which keeps every seam invisible. */}
          <div className="dp-layer dp-part dp-head" />
          <div className="dp-layer dp-part dp-arm" />
          <div className="dp-layer dp-part dp-torso" />
          <div className="dp-layer dp-part dp-drip" />
          <div className="dp-layer dp-part dp-word" />

          <div className="dp-glint" />
        </div>
      </div>

      <div className="dp-vignette" />
      <div className="dp-sweep" />
    </div>
  );
}

/** Comic page-edge divider between sections. */
function PageDivider() {
  return (
    <div className="relative h-3 md:h-4 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-comic-red/25 to-transparent" />
      <div className="absolute inset-0 halftone-dense opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-comic-red/30" />
    </div>
  );
}

function App() {
  const [pageTurnMetrics, setPageTurnMetrics] = useState({ width: 0, height: 0 });
  const { registerSection } = usePageTurn(pageTurnMetrics);

  // Report viewport changes so usePageTurn recalculates breakpoints on resize.
  useEffect(() => {
    const check = () => {
      setPageTurnMetrics((prev) =>
        prev.width === window.innerWidth && prev.height === window.innerHeight
          ? prev
          : { width: window.innerWidth, height: window.innerHeight }
      );
    };

    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);

    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  const sectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      registerSection(id, el);
    },
    [registerSection]
  );

  return (
    <div className="min-h-screen relative">
      {/* First tab stop: lets a keyboard user jump straight past the nav bar. */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <ScrollProgress />

      {/* Fixed 3D Deadpool scene, visible throughout the scroll */}
      <DeadpoolScene />

      <Navbar />

      {/* Content sits at z-10, above the z-0 scene, so the animated artwork is
          never painted over the copy. */}
      <main id="main-content" className="relative z-10">
        {/* Hero - Page 1 */}
        <div ref={sectionRef('hero')} className="page-section page-turn-animated">
          <Hero />
          <div className="page-edge" />
        </div>

        <PageDivider />

        {/* About - Page 2 */}
        <div ref={sectionRef('about')} className="page-section page-turn-animated">
          <div className="section-scrim" aria-hidden="true" />
          <About />
          <div className="page-edge" />
        </div>

        <PageDivider />

        {/* What We Do - Page 3 */}
        <div
          ref={sectionRef('what-we-do')}
          className="page-section page-turn-animated"
        >
          <div className="section-scrim" aria-hidden="true" />
          <WhatWeDo />
          <div className="page-edge" />
        </div>

        <PageDivider />

        {/* Why Join - Page 4 */}
        <div
          ref={sectionRef('why-join')}
          className="page-section page-turn-animated"
        >
          <div className="section-scrim" aria-hidden="true" />
          <WhyJoin />
          <div className="page-edge" />
        </div>

        <PageDivider />

        {/* Recruitment - Page 5 */}
        <div
          ref={sectionRef('recruitment')}
          className="page-section page-turn-animated"
        >
          <div className="section-scrim" aria-hidden="true" />
          <Recruitment />
          <div className="page-edge" />
        </div>

        {/* Recruitment Form - part of Page 5 */}
        <section
          id="recruitment-form"
          className="relative py-16 md:py-24 px-4 overflow-hidden"
        >
          <div className="section-scrim" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto">
            <BlurFade className="text-center mb-10">
              <span className="comic-caption text-xs mb-4 inline-block">APPLICATION FORM</span>
              <h2 className="comic-heading text-2xl md:text-4xl text-white mt-4 text-shadow-comic">
                FILL IN YOUR <span className="text-comic-red">DETAILS</span>
              </h2>
              <p className="mt-4 text-white/75 font-[var(--font-comic-body)] text-shadow-comic">
                All fields marked with <span className="text-comic-red">*</span> are required.
              </p>
            </BlurFade>
            <RecruitmentForm />
          </div>
        </section>

        <PageDivider />

        {/* Team - Page 6 */}
        <div ref={sectionRef('team')} className="page-section page-turn-animated">
          <div className="section-scrim" aria-hidden="true" />
          <Team />
          <div className="page-edge" />
        </div>
      </main>

      {/* Footer / Back Cover - Page 7 */}
      <Footer />

      <BackToTop />
    </div>
  );
}

export default App;