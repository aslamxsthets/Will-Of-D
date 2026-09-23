import { useState, useEffect, useRef, useCallback } from 'react';
import NumberTicker from '../UI/NumberTicker';
import DeadpoolLogo from '../UI/DeadpoolLogo';
import { getRandomDeadpoolQuote, playMoodSound, type DeadpoolQuote } from '../../data/deadpoolQuotes';

/**
 * Hero / comic cover.
 *
 * Layout strategy:
 *  - Thin top bar (issue label + poke button) anchored near the very top of
 *    the viewport so it never covers the Deadpool FACE in the centre.
 *  - A large empty "stage" zone lets the background artwork breathe.
 *  - Heading + CTAs + stats sit at the bottom half of the screen.
 *
 * Easter egg speech bubble:
 *  - Renders BELOW the poke button (not above, which clips behind the navbar).
 *  - The bubble is absolutely positioned relative to its parent container.
 *  - z-index 50 keeps it above section content but below the fixed navbar (z-40).
 */
export default function Hero() {
  const [quote, setQuote] = useState<DeadpoolQuote | null>(null);
  const [isWobbling, setIsWobbling] = useState(false);
  const quoteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerDeadpoolQuote = useCallback(() => {
    const next = getRandomDeadpoolQuote(quote);
    setQuote(next);
    playMoodSound(next.mood);

    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 400);

    if (quoteTimer.current) clearTimeout(quoteTimer.current);
    quoteTimer.current = setTimeout(() => {
      setQuote(null);
    }, 5500);
  }, [quote]);

  // Allow other components (e.g. Navbar logo) to trigger a quote remotely.
  useEffect(() => {
    const handleRemoteTrigger = () => triggerDeadpoolQuote();
    window.addEventListener('deadpool-quote', handleRemoteTrigger);
    return () => {
      window.removeEventListener('deadpool-quote', handleRemoteTrigger);
      if (quoteTimer.current) clearTimeout(quoteTimer.current);
    };
  }, [triggerDeadpoolQuote]);

  const scrollToRecruitment = () => {
    document.getElementById('recruitment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background scrims — calibrated so background Deadpool artwork shines through */}
      <div className="absolute inset-0 bg-gradient-to-b from-comic-black/40 via-transparent to-comic-black/80 pointer-events-none" />
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
      <div className="absolute inset-0 action-lines opacity-10 pointer-events-none" />

      {/* Decorative ink splatters — kept to the periphery, away from Deadpool's face */}
      <div className="ink-splatter top-[10%] left-[3%] w-32 h-32 opacity-30" />
      <div className="ink-splatter bottom-[12%] right-[5%] w-28 h-28 opacity-25" />

      {/* Comic frame border */}
      <div className="absolute inset-4 md:inset-8 border-4 border-comic-red/25 pointer-events-none" />

      {/* ── TOP BAR ─────────────────────────────────────────────────────────── */}
      {/* Sits just below the fixed navbar (pt-20). Deadpool's face/mask/gun    */}
      {/* sit roughly in the 30–70% vertical band — this bar stays above that.  */}
      <div className="relative z-10 flex flex-col items-start gap-3 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 md:px-12 pt-3">
        <span className="comic-caption text-[10px] sm:text-xs md:text-sm tracking-widest mt-1">
          ISSUE #01 • FIRST EDITION
        </span>

        {/* ── EASTER EGG TRIGGER + BUBBLE ─────────────────────────────────── */}
        {/* The bubble opens DOWNWARD from the button so it never overlaps the  */}
        {/* fixed navbar above.                                                  */}
        <div className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={triggerDeadpoolQuote}
            className={`group flex items-center gap-2 bg-comic-black/90 hover:bg-comic-black py-1.5 px-3 rounded-full border-2 border-comic-red hover:border-comic-yellow transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_#000] max-w-full ${
              isWobbling ? 'scale-95 rotate-6' : 'hover:scale-105 active:scale-95'
            }`}
            aria-label="Poke Deadpool for a 4th-wall breaking quote"
            title="Poke Deadpool!"
          >
            <DeadpoolLogo size="sm" withSwords={true} animated={true} />
            <span className="font-[var(--font-comic-display)] text-[10px] sm:text-xs md:text-sm text-comic-yellow tracking-wider whitespace-nowrap">
              ⚡ POKE ME!
            </span>
          </button>

          {/* Speech bubble — below the button, never touching the navbar */}
          {quote && (
            <div
              role="status"
              aria-live="polite"
              onClick={triggerDeadpoolQuote}
              className="absolute top-full mt-3 left-1/2 -translate-x-1/2 z-50 w-[min(18rem,calc(100vw-2rem))] sm:left-auto sm:right-0 sm:translate-x-0 sm:w-72 md:w-80 bg-white text-comic-black p-4 rounded-xl border-4 border-comic-red shadow-[5px_5px_0px_#000000] cursor-pointer animate-dp-bubble-in"
              title="Click for another quote!"
            >
              {/* Bubble tail — points UP to the button */}
              <div className="absolute -top-3.5 right-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-comic-red" />
              <div className="absolute -top-2 right-[26px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[11px] border-b-white" />

              {/* Header row */}
              <div className="flex items-center justify-between border-b-2 border-comic-red/30 pb-1.5 mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-comic-red font-[var(--font-comic-ui)]">
                  💬 DEADPOOL SAYS
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  tap again ⚡
                </span>
              </div>

              {/* Quote text */}
              <div className="font-[var(--font-comic-display)] text-base sm:text-lg text-center leading-snug text-comic-black">
                "{quote.text}"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CENTRE STAGE — Deadpool's face breathes here ────────────────────── */}
      {/* This spacer pushes content below the face area (roughly 40vh).        */}
      <div className="flex-1 min-h-[28vh] sm:min-h-[34vh] md:min-h-[38vh]" aria-hidden="true" />

      {/* ── LOWER CONTENT ────────────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pb-16">
        {/* Main heading with Electric Zap Glitch Effect */}
        <h1 className="comic-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-none text-shadow-comic">
          <span className="text-white">WILL OF</span>{' '}
          <span className="comic-zap-glitch">D</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/95 font-[var(--font-comic-body)] font-bold mb-4 max-w-2xl mx-auto text-shadow-comic">
          Learn. Build. Create. Belong.
        </p>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-white/80 mb-8 max-w-xl mx-auto text-shadow-comic">
          You're here because you're into Tech and Cybersecurity... 
          A tech community for people who build things, break things   and occasionally wonder why the code works after they stopped touching it.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button onClick={scrollToRecruitment} className="comic-btn text-base md:text-lg">
            JOIN THE COMMUNITY
          </button>
          <button onClick={scrollToAbout} className="comic-btn comic-btn-outline text-base md:text-lg">
            EXPLORE
          </button>
        </div>

      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
        <span className="page-indicator text-xs">01 / 07</span>
      </div>
    </section>
  );
}
