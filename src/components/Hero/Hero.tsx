import { useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import TextShimmer from '../UI/TextShimmer';
import NumberTicker from '../UI/NumberTicker';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Removed cursor-following effect - no more mouse jumping

  const scrollToRecruitment = () => {
    document.getElementById('recruitment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layers - transparent to show fixed Deadpool background */}
      <div className="absolute inset-0 bg-gradient-to-b from-comic-black/40 via-transparent to-comic-black/80" />
      <div className="absolute inset-0 halftone opacity-10" />
      <div className="absolute inset-0 action-lines opacity-10" />
      
      {/* Decorative ink splatters */}
      <div className="ink-splatter top-[10%] left-[5%] w-40 h-40 opacity-40" />
      <div className="ink-splatter bottom-[15%] right-[8%] w-32 h-32 opacity-30" />
      <div className="ink-splatter top-[60%] left-[70%] w-24 h-24 opacity-20" />

      {/* Comic frame border */}
      <div className="absolute inset-4 md:inset-8 border-4 border-comic-red/30 pointer-events-none" />
      <div className="absolute inset-6 md:inset-12 border-2 border-white/10 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Issue number */}
        <div className="mb-6">
          <span className="comic-caption text-xs md:text-sm">
            ISSUE #01 • FIRST EDITION
          </span>
        </div>

        {/* Hero visual */}
        <div
          className="relative mx-auto mb-8 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
        >
          {/* Deadpool-inspired emblem */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full border-4 border-comic-red bg-comic-red/10 animate-pulse-red" />
              {/* Inner design */}
              <div className="absolute inset-4 rounded-full border-4 border-white/80 bg-comic-black flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-5xl md:text-7xl lg:text-8xl font-[var(--font-comic-display)] text-comic-red leading-none">
                    DC
                  </div>
                  <div className="text-[10px] md:text-xs font-bold text-white tracking-[0.3em] mt-1">
                    CREW
                  </div>
                </div>
              </div>
              {/* Cross swords decoration - CSS based */}
              <div className="absolute -top-3 -left-3 w-8 h-8 opacity-60">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-comic-red transform -rotate-45 origin-left" />
                <div className="absolute top-1/2 left-0 w-2 h-2 bg-comic-red transform -rotate-45 -translate-y-1/2" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-8 h-8 opacity-60 rotate-180">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-comic-red transform -rotate-45 origin-left" />
                <div className="absolute top-1/2 left-0 w-2 h-2 bg-comic-red transform -rotate-45 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="comic-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight">
          <TextShimmer className="text-comic-red" duration={3} shimmerColor="rgba(196, 30, 42, 0.3)">
            DEADPOOL
          </TextShimmer>{' '}
          <span className="text-white">CREW</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 font-[var(--font-comic-body)] font-bold mb-8 max-w-2xl mx-auto">
          Learn. Build. Create. Belong.
        </p>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-white/60 mb-10 max-w-xl mx-auto">
          A student-driven community where curiosity turns into practical experience. 
          Technology, creativity, and collaboration — all in one crew.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button onClick={scrollToRecruitment} className="comic-btn text-base md:text-lg">
            JOIN THE CREW
          </button>
          <button onClick={scrollToAbout} className="comic-btn comic-btn-outline text-base md:text-lg">
            EXPLORE
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-[var(--font-comic-display)] text-comic-red">
              <NumberTicker value={250} suffix="+" />
            </div>
            <div className="text-[10px] md:text-xs font-bold text-white/70 tracking-wider mt-1">ACTIVE MEMBERS</div>
          </div>
          <div className="text-center border-x border-white/20">
            <div className="text-2xl md:text-4xl font-[var(--font-comic-display)] text-comic-red">
              <NumberTicker value={6} />
            </div>
            <div className="text-[10px] md:text-xs font-bold text-white/70 tracking-wider mt-1">CREW DOMAINS</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-[var(--font-comic-display)] text-comic-red">
              <NumberTicker value={1} />
            </div>
            <div className="text-[10px] md:text-xs font-bold text-white/70 tracking-wider mt-1">SHARED UNIVERSE</div>
          </div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <span className="page-indicator text-xs">01 / 07</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-comic-red rounded-full" />
        </div>
      </div>
    </section>
  );
}
