import DomainIcon from '../UI/DomainIcon';
import SectionHeading from '../UI/SectionHeading';

export default function WhyJoin() {
  const reasons = [
    {
      title: 'BUILD SOMETHING REAL',
      actionWord: 'BUILD.exe!',
      description: 'Skip the boring theory. Get your hands on Practical Experince by working on real projects with real impact.',
      iconName: 'Wrench',
      color: '#c41e2a',
    },
    {
      title: 'LEVEL UP',
      actionWord: 'LEVEL_UP.exe!',
      description: 'Learn by doing, not by staring at 47 tutorial tabs. Develop technical and creative skills through hands-on experience.',
      iconName: 'BookOpen',
      color: '#2196f3',
    },
    {
      title: 'COMPETE & CONQUER',
      actionWord: 'WIN.exe!',
      description: 'Hackathons. CTFs. Challenges. Competitions. Bring your skills, bring your team and maybe bring a backup plan.',
      iconName: 'Trophy',
      color: '#ffd700',
    },
    {
      title: 'FIND YOUR PEOPLE',
      actionWord: 'SQUAD_UP.exe!',
      description: 'Meet people who can speak your tech language Find teammates and build something bigger together.',
      iconName: 'Globe',
      color: '#9c27b0',
    },
    {
      title: 'GET BETTER',
      actionWord: 'GROW.exe!',
      description: 'Tech skills are only half the game Build confidence, leadership, problem-solving and the ability to survive group projects.',
      iconName: 'TrendingUp',
      color: '#4caf50',
    },
    {
      title: 'FIND YOUR CHAOS',
      actionWord: 'BELONG.exe !',
      description: 'Cybersecurity? Offensive? Defensive? Find your people in the community. Explore. Experiment. Find your thing.',
      iconName: 'Target',
      color: '#ff5722',
    },
  ];

  return (
    <section id="why-join" className="relative py-20 md:py-32 px-4 bg-transparent overflow-hidden">
      <div className="absolute inset-0 halftone opacity-5 pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <SectionHeading
          chapter="CHAPTER 04"
          title={
            <>
              WHY JOIN THE <span className="text-comic-red">COMMUNITY?</span>
            </>
          }
          subtitle="You don't have to be an expert. Just bring your curiosity."
        />

        {/* Reason panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="comic-card-dossier p-6 relative group overflow-hidden flex flex-col justify-between"
              style={{
                boxShadow: `5px 5px 0px #000000, 9px 9px 0px ${reason.color}33`,
              }}
            >
              {/* Comic Action Sound Effect Watermark in the background */}
              <div
                className="absolute -bottom-4 -right-4 text-4xl sm:text-5xl font-[var(--font-comic-display)] opacity-10 select-none pointer-events-none transform -rotate-12 group-hover:opacity-20 group-hover:scale-105 transition-all duration-300"
                style={{ color: reason.color }}
              >
                {reason.actionWord}
              </div>

              {/* Colored top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: reason.color }}
              />

              <div>
                {/* Panel Header */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="comic-tape text-[10px] tracking-wider uppercase font-black"
                    style={{ backgroundColor: reason.color, color: '#000' }}
                  >
                    PERK #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[11px] font-extrabold uppercase tracking-wider font-[var(--font-comic-display)]"
                    style={{ color: reason.color }}
                  >
                    {reason.actionWord}
                  </span>
                </div>

                {/* Icon box */}
                <div className="mb-4">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-black bg-comic-black flex items-center justify-center shadow-[3px_3px_0px_#000] group-hover:scale-110 transition-transform duration-200"
                    style={{ borderColor: reason.color }}
                  >
                    <DomainIcon iconName={reason.iconName} color={reason.color} size="md" />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-[var(--font-comic-display)] tracking-wider mb-2"
                  style={{ color: reason.color }}
                >
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 text-xs md:text-sm leading-relaxed font-[var(--font-comic-body)]">
                  {reason.description}
                </p>
              </div>

              {/* Bottom accent tag */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                  STATUS: VERIFIED
                </span>
                <span
                  className="text-xs font-black"
                  style={{ color: reason.color }}
                >
                  ✦ ✦ ✦
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Authentic Comic Speech Bubble */}
        <div className="mt-14 text-center">
          <div className="relative inline-block bg-white text-comic-black p-4 md:p-5 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#c41e2a] max-w-xl">
            <div className="text-xs font-black uppercase text-comic-red font-[var(--font-comic-ui)] tracking-wider mb-1">
              💥 COMMUNITY PROTOCOL
            </div>
            <p className="font-[var(--font-comic-display)] text-lg md:text-xl leading-snug">
              &ldquo;The best time to join was yesterday. The second best time is right now.&rdquo;
            </p>
            {/* Speech bubble pointy tail */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-black" />
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[12px] border-t-white" />
          </div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4">
        <span className="page-indicator text-xs">04 / 07</span>
      </div>
    </section>
  );
}
