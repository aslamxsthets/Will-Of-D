import { navItems } from '../../data/navigation';

export default function Footer() {
  const scrollToForm = () => {
    document.getElementById('recruitment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-comic-black border-t-2 border-comic-red/30">
      {/* Back cover section */}
      <div className="relative py-16 md:py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 halftone opacity-5" />
        <div className="ink-splatter top-[20%] left-[10%] w-40 h-40 opacity-15" />
        <div className="ink-splatter bottom-[20%] right-[10%] w-32 h-32 opacity-10" />
        
        <div className="relative max-w-3xl mx-auto">
          <span className="comic-caption text-xs mb-6 inline-block">BACK COVER</span>
          
          <h2 className="comic-heading text-2xl md:text-4xl lg:text-5xl text-white mt-6 mb-6 leading-tight">
            EVERY CREW NEEDS A STORY.<br />
            <span className="text-comic-red">THIS ONE IS STILL BEING WRITTEN.</span>
          </h2>

          <p className="text-white/60 font-[var(--font-comic-body)] text-base md:text-lg mb-8 max-w-lg mx-auto">
            The next chapter could be yours. Whether you're here to build, create, learn, or just 
            find your people — there's a spot in the crew waiting for you.
          </p>

          <button onClick={scrollToForm} className="comic-btn text-lg mb-8">
            JOIN THE CREW
          </button>

          {/* Social links */}
          <div className="flex justify-center gap-6 mt-8">
            <a href="#" className="text-white/40 hover:text-comic-red transition-colors font-bold text-sm" aria-label="Instagram">
              INSTAGRAM
            </a>
            <a href="#" className="text-white/40 hover:text-comic-red transition-colors font-bold text-sm" aria-label="Twitter">
              TWITTER
            </a>
            <a href="#" className="text-white/40 hover:text-comic-red transition-colors font-bold text-sm" aria-label="Discord">
              DISCORD
            </a>
            <a href="#" className="text-white/40 hover:text-comic-red transition-colors font-bold text-sm" aria-label="GitHub">
              GITHUB
            </a>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="text-2xl font-[var(--font-comic-display)] text-comic-red tracking-wider mb-2">
                DEADPOOL CREW
              </div>
              <p className="text-white/50 text-sm font-[var(--font-comic-body)]">
                Learn. Build. Create. Belong.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-bold text-white/80 mb-3 tracking-wider">NAVIGATE</h4>
              <div className="space-y-2">
                {navItems.slice(0, 6).map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block text-sm text-white/50 hover:text-comic-red transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold text-white/80 mb-3 tracking-wider">CONTACT</h4>
              <div className="space-y-2 text-sm text-white/50">
                <p>deadpoolcrew@example.edu</p>
                <p>Student Activity Center</p>
                <p className="text-white/30 text-xs mt-2">
                  Contact information is a placeholder.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Deadpool Crew. All rights reserved.
            </p>
            <p className="text-white/20 text-xs mt-1 font-[var(--font-comic-body)]">
              "With great power comes great... responsibility to have fun."
            </p>
          </div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4">
        <span className="page-indicator text-xs">07 / 07</span>
      </div>
    </footer>
  );
}
