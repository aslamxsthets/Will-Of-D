import { domains } from '../../data/domains';

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-20 md:py-32 px-4 overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)' }}>
      {/* Background */}
      <div className="absolute inset-0 action-lines opacity-10" />
      <div className="ink-splatter top-[20%] right-[5%] w-48 h-48 opacity-20" />
      <div className="ink-splatter bottom-[10%] left-[10%] w-36 h-36 opacity-15" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="comic-caption text-xs mb-4 inline-block">CHAPTER 03</span>
          <h2 className="comic-heading text-3xl md:text-5xl lg:text-6xl text-white mt-4">
            WHAT'S THE <span className="text-comic-red">MISSION?</span>
          </h2>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto font-[var(--font-comic-body)] text-lg">
            Six domains. One crew. Every skill set has a place here.
          </p>
        </div>

        {/* Domain panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {domains.map((domain, index) => (
            <div
              key={domain.id}
              className="comic-panel p-6 relative group overflow-hidden"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 left-0 h-1 transition-all duration-500 group-hover:w-full w-0"
                style={{ backgroundColor: domain.color }}
              />
              <div
                className="absolute top-0 left-0 w-full h-0.5 opacity-50"
                style={{ backgroundColor: domain.color }}
              />
              
              {/* Background halftone */}
              <div className="absolute inset-0 halftone opacity-5 group-hover:opacity-10 transition-opacity" />
              
              {/* Panel number */}
              <div className="absolute top-3 right-3 text-xs font-bold text-white/20 font-[var(--font-comic-display)]">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{domain.icon}</div>

              {/* Title */}
              <h3
                className="text-lg md:text-xl font-[var(--font-comic-display)] tracking-wider mb-2"
                style={{ color: domain.color }}
              >
                {domain.title}
              </h3>

              {/* Tagline */}
              <p className="text-white/90 font-[var(--font-comic-body)] font-bold text-sm md:text-base mb-3 italic">
                &ldquo;{domain.tagline}&rdquo;
              </p>

              {/* Description */}
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                {domain.description}
              </p>

              {/* Items */}
              <div className="flex flex-wrap gap-2">
                {domain.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-1 border border-white/20 text-white/70 font-medium hover:border-white/40 transition-colors"
                    style={{ borderColor: `${domain.color}33` }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4">
        <span className="page-indicator text-xs">03 / 07</span>
      </div>
    </section>
  );
}
