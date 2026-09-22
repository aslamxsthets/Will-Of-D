import { Instagram, Linkedin, Github } from 'lucide-react';
import { navItems } from '../../data/navigation';

const discordInviteUrl = 'https://discord.gg/TtaKc364H3';

function DiscordIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.076.076 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-comic-black border-t-2 border-comic-red/30 z-20">
      {/* Solid background to cover the fixed Will Of D image */}
      <div className="absolute inset-0 bg-comic-black" />
      
      {/* Back cover section */}
      <div className="relative py-16 md:py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 halftone opacity-5" />
        <div className="ink-splatter top-[20%] left-[10%] w-40 h-40 opacity-15" />
        <div className="ink-splatter bottom-[20%] right-[10%] w-32 h-32 opacity-10" />  
        
        <div className="relative max-w-3xl mx-auto">
          <span className="comic-caption text-xs mb-6 inline-block">BACK COVER</span>
          
          <h2 className="comic-heading text-2xl md:text-4xl lg:text-5xl text-white mt-6 mb-6 leading-tight">
            ONCE UPON A TIME....<br />
            <span className="text-comic-red">OKAY, FORGET THAT. THINGS GOT COMPLICATED, BTW</span>
          </h2>

          <p className="text-white/60 font-[var(--font-comic-body)] text-base md:text-lg mb-8 max-w-lg mx-auto">
            Might as well join us.<br />
            Come to learn.<br />
            Stay to build.<br />
            Break something along the way.<br /><br />
            Don't worry - we'll probably blame the firewall.
          </p>

          <a
            href={discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="comic-btn inline-flex items-center gap-2 text-lg mb-8"
          >
            <DiscordIcon size={22} />
            JOIN THE COMMUNITY
          </a>

          {/* Social links */}
          <div className="flex justify-center gap-6 mt-8">
            <a href="https://www.instagram.com/_poeteee.aj/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-comic-red transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/aj49/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-comic-red transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="https://discord.gg/NYdQ2HUHq" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-comic-red transition-colors" aria-label="Discord">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
            </a>
            <a href="https://github.com/aslamxsthets/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-comic-red transition-colors" aria-label="GitHub">
              <Github size={20} />
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
              <a
                href="#hero"
                className="block text-2xl font-[var(--font-comic-display)] text-comic-red tracking-wider mb-2 hover:text-white transition-colors"
              >
                WILL OF D COMMUNITY
              </a>
              <p className="text-white/50 text-sm font-[var(--font-comic-body)]">
                Learn. Build. Create. Belong.
              </p>
            </div>

            {/* Navigation */}
            <nav aria-label="Footer navigation">
              <h4 className="text-sm font-bold text-white/90 mb-3 tracking-wider">NAVIGATE</h4>
              <div className="space-y-2">
                {navItems.slice(0, 6).map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className="block text-sm text-white/65 hover:text-comic-red transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold text-white/90 mb-3 tracking-wider">CONTACT</h4>
              <div className="space-y-2 text-sm text-white/65">
                <p>
                  <a
                    href="mailto:willofd@example.edu"
                    className="hover:text-comic-red transition-colors"
                  >
                    willofd@example.edu
                  </a>
                </p>
                <p>Student Activity Center</p>
                <p className="text-white/45 text-xs mt-2">
                  Contact information is a placeholder.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-white/45 text-xs">
              © {new Date().getFullYear()} Will Of D Community. All rights reserved.
            </p>
            <p className="text-white/35 text-xs mt-1 font-[var(--font-comic-body)]">
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
