import { recruitmentRoles } from '../../data/domains';
import DomainIcon from '../UI/DomainIcon';
import SectionHeading from '../UI/SectionHeading';

export default function Recruitment() {
  const scrollToForm = () => {
    document.getElementById('recruitment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="recruitment" className="relative py-20 md:py-32 px-4 overflow-hidden bg-transparent">
      {/* Background */}
      <div className="absolute inset-0 action-lines opacity-5" />
      <div className="ink-splatter top-[30%] left-[5%] w-56 h-56 opacity-20" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <SectionHeading
          chapter="CHAPTER 05"
          title={
            <>
              THE COMMUNITY IS <span className="text-comic-red">RECRUITING.</span>
            </>
          }
          subtitle="YOUR APPLICATION HAS ENTERED THE CHAT."
          subtitleClassName="mt-4 text-xl md:text-2xl text-comic-yellow font-[var(--font-comic-display)] tracking-wider text-shadow-comic"
        />

        {/* Recruitment copy */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="comic-panel p-6 md:p-8">
            <div className="space-y-4 text-white/80 font-[var(--font-comic-body)] text-base md:text-lg leading-relaxed">
              <p>
                You don't need a perfect resume. You don't need to know everything. 
                <span className="text-comic-red font-bold"> Everyone is welcome.</span>
              </p>
              <p>
                What matters is your curiosity. What matters is the willingness to learn. 
                What matters is showing up and being part of something bigger than yourself.
              </p>
              <p>
                Collaboration matters more than competition. Growth matters more than perfection. 
                And the best part? You'll discover strengths you didn't know you had.
                <span className="text-comic-red font-bold"> [Note: Every Weekends Classes Will Be Taken In Discord on Cybersecurity.]</span>
              </p>
            </div>
          </div>
        </div>

        {/* Available roles */}
        <div className="mb-12">
          <h3 className="text-center text-xl md:text-2xl font-[var(--font-comic-display)] text-white tracking-wider mb-8">
            AVAILABLE <span className="text-comic-red">TEAMS</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {recruitmentRoles.map((team) => (
              <div key={team.team} className="comic-panel p-4 text-center">
                <div className="flex justify-center mb-3">
                  <DomainIcon iconName={team.iconName} color="#c41e2a" size="md" />
                </div>
                <h4 className="text-sm font-[var(--font-comic-display)] text-comic-red tracking-wider mb-2">
                  {team.team}
                </h4>
                <div className="space-y-1">
                  {team.roles.map((role) => (
                    <div key={role} className="text-xs text-white/60">
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={scrollToForm} className="comic-btn text-lg md:text-xl animate-pulse-red">
            APPLY NOW
          </button>
          <p className="mt-4 text-white/50 text-sm font-[var(--font-comic-body)]">
            Scroll down to fill out your application →
          </p>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4">
        <span className="page-indicator text-xs">05 / 07</span>
      </div>
    </section>
  );
}
