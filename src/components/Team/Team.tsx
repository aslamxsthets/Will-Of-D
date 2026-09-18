import { teamMembers } from '../../data/team';

export default function Team() {
  return (
    <section id="team" className="relative py-20 md:py-32 px-4 bg-transparent overflow-hidden">
      <div className="absolute inset-0 halftone opacity-5" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="comic-caption text-xs mb-4 inline-block">CHAPTER 06</span>
          <h2 className="comic-heading text-3xl md:text-5xl lg:text-6xl text-white mt-4">
            MEET THE <span className="text-comic-red">CREW</span>
          </h2>
          <p className="mt-6 text-white/70 max-w-xl mx-auto font-[var(--font-comic-body)] text-lg">
            The people who make the chaos work.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="comic-panel p-5 text-center group">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-3 border-comic-red bg-comic-gray flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-[var(--font-comic-display)] text-comic-red">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-base font-bold text-white mb-1">
                {member.name}
              </h3>

              {/* Role */}
              <p className="text-sm text-comic-red font-[var(--font-comic-display)] tracking-wider mb-1">
                {member.role}
              </p>

              {/* Domain */}
              <p className="text-xs text-white/50 mb-2">
                {member.domain}
              </p>

              {/* Description */}
              <p className="text-xs text-white/60 font-[var(--font-comic-body)] leading-relaxed">
                {member.description}
              </p>

              {/* Social links */}
              {member.socials && (
                <div className="flex justify-center gap-3 mt-3">
                  {member.socials.github && (
                    <a href={member.socials.github} className="text-white/40 hover:text-comic-red transition-colors text-sm" aria-label={`${member.name}'s GitHub`}>
                      GH
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="text-white/40 hover:text-comic-red transition-colors text-sm" aria-label={`${member.name}'s LinkedIn`}>
                      IN
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="text-white/40 hover:text-comic-red transition-colors text-sm" aria-label={`${member.name}'s Twitter`}>
                      TW
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4">
        <span className="page-indicator text-xs">06 / 07</span>
      </div>
    </section>
  );
}
