import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import DeadpoolLogo from '../UI/DeadpoolLogo';

/**
 * The final nav entry ("JOIN US") is rendered as a call-to-action button rather
 * than a plain link, so the primary action reads differently from navigation.
 */
const sectionItems = navItems.slice(0, -1);
const ctaItem = navItems[navItems.length - 1];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Passive, lightweight scroll observer for nav styling and active section
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Section visibility via IntersectionObserver (zero scroll layout thrashing)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  // Escape closes the mobile menu and restores focus to its toggle, so a
  // keyboard user is never stranded inside a menu they just dismissed.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  // Clicking or tapping outside the nav dismisses the mobile menu.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isMobileMenuOpen]);

  const scrollTo = useCallback((id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      // `scroll-margin-top` on the section keeps it clear of the fixed header.
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    setIsMobileMenuOpen(false);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-comic-black/95 backdrop-blur-md border-b-2 border-comic-red shadow-[0_2px_24px_rgba(0,0,0,0.7)]'
          : 'bg-gradient-to-b from-comic-black/85 to-transparent'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — returns to the very top of the page */}
          <a
            href="#hero"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
              window.dispatchEvent(new CustomEvent('deadpool-quote'));
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="WILL OF D Community - back to top and hear quote"
            title="WILL OF D Community - Click for dialogue!"
          >
            <DeadpoolLogo size="sm" withSwords={true} animated={true} />
            <span className="text-comic-red group-hover:text-comic-yellow" style={{ fontFamily: 'var(--font-comic-display)' }}>
              WILL OF <span className="text-base md:text-lg tracking-wider text-white group-hover:text-comic-red transition-colors" style={{ fontFamily: 'var(--font-comic-display)' }}>D</span>
              <span className="text-comic-red group-hover:text-comic-yellow" style={{ fontFamily: 'var(--font-comic-display)' }}> COMMUNITY</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {sectionItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-3 py-2 text-xs font-bold tracking-wider transition-colors duration-200 ${
                    isActive ? 'text-comic-red' : 'text-white hover:text-comic-red'
                  }`}
                  style={{ fontFamily: 'var(--font-comic-ui)' }}
                >
                  {item.label}
                  {/* Animated underline replaces the old permanent border, which
                      nudged the label sideways whenever the active item changed. */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-3 right-3 bottom-1 h-0.5 bg-comic-red origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => scrollTo(ctaItem.id)}
              className="comic-btn ml-3 !text-xs !px-5 !py-2"
            >
              {ctaItem.label}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="lg:hidden p-2 text-white hover:text-comic-red transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[26rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="bg-comic-black/95 border-t-2 border-comic-red px-4 py-4 space-y-1">
          {sectionItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                aria-current={isActive ? 'location' : undefined}
                className={`block w-full text-left px-4 py-3 text-sm font-bold tracking-wider transition-colors border-l-4 ${
                  isActive
                    ? 'text-comic-red border-comic-red bg-comic-red/10'
                    : 'text-white border-transparent hover:text-comic-red hover:border-comic-red/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => scrollTo(ctaItem.id)}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className="comic-btn w-full mt-3 text-sm"
          >
            {ctaItem.label}
          </button>
        </div>
      </div>
    </nav>
  );
}
