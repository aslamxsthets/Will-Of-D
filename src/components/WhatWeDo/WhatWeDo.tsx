import { domains } from '../../data/domains';
import DomainIcon from '../UI/DomainIcon';
import SectionHeading from '../UI/SectionHeading';

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-20 md:py-32 px-4 overflow-hidden bg-transparent">
      {/* Background atmosphere */}
      <div className="absolute inset-0 action-lines opacity-10 pointer-events-none" />
      <div className="ink-splatter top-[20%] right-[5%] w-48 h-48 opacity-20" />
      <div className="ink-splatter bottom-[10%] left-[10%] w-36 h-36 opacity-15" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <SectionHeading
          chapter="CHAPTER 03"
          title={
            <>
              WHAT'S THE <span className="text-comic-red">MISSION?</span>
            </>
          }
          subtitle="Six domains. One community. Every skill set has a place here."
        />

        {/* Domain Comic Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {domains.map((domain, index) => (
            <div
              key={domain.id}
              className="comic-card-dossier p-6 relative group overflow-hidden flex flex-col justify-between"
              style={{
                boxShadow: `5px 5px 0px #000000, 9px 9px 0px ${domain.color}33`,
              }}
            >
              {/* Halftone background texture */}
              <div className="absolute inset-0 halftone opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none" />
              
              {/* Domain colored top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
                style={{ backgroundColor: domain.color }}
              />

              {/* Panel Top: Comic Header Tape + Number */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="comic-tape text-[11px] tracking-wider font-extrabold uppercase"
                    style={{ backgroundColor: domain.color, color: '#000' }}
                  >
                    MISSION FILE #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-black text-white/30 font-[var(--font-comic-display)] tracking-widest">
                    SEC-{domain.id.toUpperCase().slice(0, 3)}
                  </span>
                </div>

                {/* Icon & Title Row */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div
                    className="p-2.5 rounded-lg border-2 border-black bg-comic-black shadow-[3px_3px_0px_#000] transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex-shrink-0"
                    style={{ borderColor: domain.color }}
                  >
                    <DomainIcon iconName={domain.iconName} color={domain.color} size="md" />
                  </div>
                  <div>
                    <h3
                      className="text-xl md:text-2xl font-[var(--font-comic-display)] tracking-wider leading-none"
                      style={{ color: domain.color }}
                    >
                      {domain.title}
                    </h3>
                  </div>
                </div>

                {/* Comic Speech Tagline Balloon */}
                <div className="comic-speech-tagline mb-3.5 text-xs md:text-sm text-white/90">
                  &ldquo;{domain.tagline}&rdquo;
                </div>

                {/* Description */}
                <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-5 font-[var(--font-comic-body)]">
                  {domain.description}
                </p>
              </div>

              {/* Domain Skill Pills */}
              <div>
                <div className="text-[10px] font-bold text-white/40 tracking-wider uppercase mb-2">
                  FOCUS AREAS //
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {domain.items.map((item) => (
                    <span
                      key={item}
                      className="comic-tag text-[11px] rounded"
                      style={{
                        borderColor: `${domain.color}55`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comic ink corner notches */}
              <div
                className="absolute bottom-0 right-0 w-4 h-4 border-t-2 border-l-2 opacity-50"
                style={{ borderColor: domain.color }}
              />
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
