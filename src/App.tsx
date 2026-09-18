import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import WhatWeDo from './components/WhatWeDo/WhatWeDo';
import WhyJoin from './components/WhyJoin/WhyJoin';
import Recruitment from './components/Recruitment/Recruitment';
import RecruitmentForm from './components/RecruitmentForm/RecruitmentForm';
import Team from './components/Team/Team';
import Footer from './components/Footer/Footer';
import { usePageTurn } from './hooks/usePageTurn';
import { useReducedMotion } from './hooks/useReducedMotion';

function App() {
  const { pageStates, registerSection } = usePageTurn();
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Fixed Deadpool background that persists throughout scroll
  const FixedDeadpoolBackground = () => {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const footerStart = documentHeight - windowHeight * 1.5; // Start fading 1.5 viewports before end
        
        if (scrollY > footerStart) {
          const fadeProgress = (scrollY - footerStart) / (windowHeight * 0.5);
          setOpacity(Math.max(0, 1 - fadeProgress));
        } else {
          setOpacity(1);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div 
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300" 
        style={{ opacity }}
        aria-hidden="true"
      >
        {/* Deadpool silhouette */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: 'url(https://image.qwenlm.ai/generated-images/785ebe06-72cd-4148-b4c7-c2725ffb51ff/_result.png)',
            backgroundPosition: 'center 20%',
            backgroundSize: '80% auto',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Red energy glow from blades */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 35%, rgba(196, 30, 42, 0.25) 0%, rgba(196, 30, 42, 0.1) 25%, transparent 55%)',
            animation: 'blade-glow-pulse 3s ease-in-out infinite',
          }}
        />

        {/* Blade shine overlay */}
        <div className="absolute inset-0 blade-shine-overlay" />
        <div className="absolute inset-0 blade-glow-overlay" />

        {/* Light streak */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 w-1 h-full opacity-0"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
              animation: 'light-streak 6s ease-in-out infinite',
              transform: 'translateX(-50%) rotate(15deg)',
            }}
          />
        </div>

        {/* Sparkles on blades */}
        <div className="blade-sparkle" />
        <div className="blade-sparkle" />
        <div className="blade-sparkle" />
        <div className="blade-sparkle" />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-comic-black/60" />
      </div>
    );
  };

  const getSectionStyle = useCallback((id: string): React.CSSProperties => {
    if (reducedMotion) return {};
    if (isMobile) {
      // Simplified mobile effect - just a subtle lift
      const state = pageStates.get(id);
      if (!state) return {};
      if (state.curlAmount > 0) {
        return {
          transform: `translateY(${state.curlAmount * -5}px)`,
          opacity: 1 - state.curlAmount * 0.1,
          transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
        };
      }
      return {};
    }
    
    const state = pageStates.get(id);
    if (!state) return {};

    return {
      transform: `perspective(2000px) rotateY(${state.rotateY}deg) rotateX(${state.rotateX}deg) scaleX(${state.scaleX})`,
      transformOrigin: state.isTurning ? 'left center' : 'center center',
      transition: 'transform 0.12s ease-out',
      boxShadow: state.shadow > 0 
        ? `${state.shadow * -30}px 0 ${state.shadow * 60}px rgba(0,0,0,${state.shadow * 0.4}), inset ${state.shadow * 10}px 0 ${state.shadow * 20}px rgba(0,0,0,${state.shadow * 0.1})` 
        : 'none',
    };
  }, [pageStates, reducedMotion, isMobile]);

  const sectionRef = useCallback((id: string) => (el: HTMLElement | null) => {
    registerSection(id, el);
  }, [registerSection]);

  return (
    <div className="min-h-screen bg-comic-black relative">
      {/* Fixed Deadpool background visible throughout scroll */}
      <FixedDeadpoolBackground />
      
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero - Page 1 */}
        <div
          ref={sectionRef('hero')}
          style={getSectionStyle('hero')}
          className="page-section"
        >
          <Hero />
          <div className="page-edge" />
        </div>

        {/* Page divider - comic book page edge */}
        <div className="relative h-2 md:h-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-comic-red/20 to-transparent" />
          <div className="absolute inset-0 halftone-dense opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-comic-red/30" />
        </div>

        {/* About - Page 2 */}
        <div
          ref={sectionRef('about')}
          style={getSectionStyle('about')}
          className="page-section"
        >
          <About />
          <div className="page-edge" />
        </div>

        <div className="relative h-2 md:h-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-comic-red/20 to-transparent" />
          <div className="absolute inset-0 halftone-dense opacity-20" />
        </div>

        {/* What We Do - Page 3 */}
        <div
          ref={sectionRef('what-we-do')}
          style={getSectionStyle('what-we-do')}
          className="page-section"
        >
          <WhatWeDo />
          <div className="page-edge" />
        </div>

        <div className="relative h-2 md:h-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-comic-red/20 to-transparent" />
          <div className="absolute inset-0 halftone-dense opacity-20" />
        </div>

        {/* Why Join - Page 4 */}
        <div
          ref={sectionRef('why-join')}
          style={getSectionStyle('why-join')}
          className="page-section"
        >
          <WhyJoin />
          <div className="page-edge" />
        </div>

        <div className="relative h-2 md:h-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-comic-red/20 to-transparent" />
          <div className="absolute inset-0 halftone-dense opacity-20" />
        </div>

        {/* Recruitment - Page 5 */}
        <div
          ref={sectionRef('recruitment')}
          style={getSectionStyle('recruitment')}
          className="page-section"
        >
          <Recruitment />
          <div className="page-edge" />
        </div>

        {/* Recruitment Form - Part of Page 5 */}
        <section id="recruitment-form" className="relative py-16 md:py-24 px-4 overflow-hidden bg-transparent">
          <div className="absolute inset-0 halftone opacity-5" />
          <div className="page-edge" />
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="comic-caption text-xs mb-4 inline-block">APPLICATION FORM</span>
              <h2 className="comic-heading text-2xl md:text-4xl text-white mt-4">
                FILL IN YOUR <span className="text-comic-red">DETAILS</span>
              </h2>
              <p className="mt-4 text-white/60 font-[var(--font-comic-body)]">
                All fields marked with <span className="text-comic-red">*</span> are required.
              </p>
            </div>
            <RecruitmentForm />
          </div>
        </section>

        <div className="relative h-2 md:h-3 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-comic-red/20 to-transparent" />
          <div className="absolute inset-0 halftone-dense opacity-20" />
        </div>

        {/* Team - Page 6 */}
        <div
          ref={sectionRef('team')}
          style={getSectionStyle('team')}
          className="page-section"
        >
          <Team />
          <div className="page-edge" />
        </div>
      </main>

      {/* Footer / Back Cover - Page 7 */}
      <Footer />
    </div>
  );
}

export default App;
