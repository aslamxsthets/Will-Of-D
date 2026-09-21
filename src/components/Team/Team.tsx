import { useState } from 'react';
import { teamMembers } from '../../data/team';
import SectionHeading from '../UI/SectionHeading';

// Domain color mapping for comic aesthetic
const domainColors: Record<string, string> = {
  Leadership: '#ffd700',
};

export default function Team() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; name: string } | null>(null);

  return (
    <section id="team" className="relative py-20 md:py-32 px-4 bg-transparent overflow-hidden">
      {/* Background halftone atmosphere */}
      <div className="absolute inset-0 halftone opacity-5 pointer-events-none" />
      <div className="ink-splatter top-[15%] left-[4%] w-44 h-44 opacity-20 pointer-events-none" />
      <div className="ink-splatter bottom-[15%] right-[4%] w-52 h-52 opacity-15 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <SectionHeading
          chapter="CHAPTER 06"
          title={
            <>
              MEET THE <span className="comic-zap-glitch">COMMUNITY</span>
            </>
          }
          subtitle="The brilliant minds and operatives who make the chaos work."
        />

        {/* Team dossiers grid */}
        <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-3xl">
          {teamMembers.map((member, index) => {
            const accentColor = domainColors[member.domain] || '#c41e2a';
            const isLeader = member.domain === 'Leadership';

            return (
              <div
                key={member.id}
                className="comic-card-dossier p-5 group flex flex-col justify-between relative overflow-hidden w-full max-w-[320px]"
                style={{
                  boxShadow: `5px 5px 0px #000000, 9px 9px 0px ${accentColor}26`,
                }}
              >
                {/* Comic Halftone texture */}
                <div className="absolute inset-0 halftone opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none" />

                {/* Top colored accent stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
                  style={{ backgroundColor: accentColor }}
                />

                {/* Top Dossier Bar */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className="comic-tape text-[10px] tracking-wider uppercase"
                      style={{
                        backgroundColor: isLeader ? '#ffd700' : accentColor,
                        color: '#000',
                      }}
                    >
                      {isLeader ? ' Commando' : `OP #${String(index + 1).padStart(2, '0')}`}
                    </span>
                    <span className="text-[10px] font-black text-white/30 font-[var(--font-comic-display)] tracking-widest">
                      SEC-0{member.id}
                    </span>
                  </div>

                  {/* Comic Avatar Frame */}
                  <div className="text-center mb-4">
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => member.image && setSelectedImage({ src: member.image, name: member.name })}
                        className="block rounded-full focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-black"
                        aria-label={`View full profile photo for ${member.name}`}
                        disabled={!member.image}
                      >
                        <div
                          className="w-20 h-20 rounded-full border-4 border-black bg-comic-dark flex items-center justify-center overflow-hidden transform group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300 relative z-10"
                          style={{
                            boxShadow: `3px 3px 0px #000, 0 0 12px ${accentColor}40`,
                          }}
                        >
                          {/* Inner comic radial pattern */}
                          <div className="absolute inset-0 halftone opacity-20 pointer-events-none" />
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover object-center cursor-pointer"
                            />
                          ) : (
                            <span
                              className="text-2xl font-[var(--font-comic-display)] tracking-wider font-extrabold relative z-10"
                              style={{ color: accentColor }}
                            >
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Comic tape badge at bottom corner of avatar */}
                      <span
                        className="absolute -bottom-1 -right-2 text-[9px] font-bold px-1.5 py-0.5 rounded border border-black z-20 shadow-[1px_1px_0px_#000] font-[var(--font-comic-body)]"
                        style={{
                          backgroundColor: accentColor,
                          color: '#000',
                        }}
                      >
                        ACTIVE
                      </span>
                    </div>

                    {/* Operative Name */}
                    <h3 className="text-lg font-bold text-white tracking-wide mt-3 mb-0.5 font-[var(--font-comic-body)]">
                      {member.name}
                    </h3>

                    {/* Role in Comic Display Font */}
                    <p
                      className="text-sm font-[var(--font-comic-display)] tracking-wider mb-2 font-bold"
                      style={{ color: accentColor }}
                    >
                      {member.role.split('\n').map((line, lineIndex) => (
                        <span key={`${member.id}-role-${lineIndex}`} className="block">
                          {line}
                        </span>
                      ))}
                    </p>

                    {/* Domain Comic Tag */}
                    <span className="comic-tag text-[10px] uppercase">
                      {member.domain}
                    </span>
                  </div>

                  {/* Operative Quote / Description in Comic Speech Balloon */}
                  <div className="comic-speech-tagline text-xs mb-4 text-white/80 leading-relaxed text-center">
                    "{member.description}"
                  </div>
                </div>

                {/* Social Links Bar */}
                {member.socials && (
                  <div className="flex items-center justify-center gap-2 pt-3 border-t border-black/40 relative z-10">
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        className="comic-social-btn"
                        aria-label={`${member.name}'s GitHub`}
                        title="GitHub Profile"
                      >
                        GH
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="comic-social-btn"
                        aria-label={`${member.name}'s LinkedIn`}
                        title="LinkedIn Profile"
                      >
                        IN
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="comic-social-btn"
                        aria-label={`${member.name}'s Twitter`}
                        title="Twitter / X Profile"
                      >
                        TW
                      </a>
                    )}
                    {member.socials.portfolio && (
                      <a
                        href={member.socials.portfolio}
                        className="comic-social-btn"
                        aria-label={`${member.name}'s Portfolio`}
                        title="Portfolio Website"
                      >
                        PORT
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white text-sm font-bold border border-white/30 px-3 py-1.5 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Close image preview"
            >
              CLOSE
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="w-full max-h-[80vh] object-contain rounded-2xl border-4 border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Page number */}
      <div className="absolute bottom-4 right-4">
        <span className="page-indicator text-xs">06 / 07</span>
      </div>
    </section>
  );
}

