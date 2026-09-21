import BlurFade from '../UI/BlurFade';
import SectionHeading from '../UI/SectionHeading';

export default function About() {
  const panels = [
    {
      title: '01. WHO ARE WE?',
      content: 'A student-driven community fighting on both sides of cybersecurity.\n\n🔵 Blue Team: Defend. Detect. Investigate.\n🔴 Red Team: Attack. Exploit. Break.\n*Legally, obviously.*',
      color: 'bg-comic-red',
    },
    {
      title: '02. WHAT DO WE BELIEVE?',
      content: 'Learning hits different when you actually do it.\n\nBuild it. Break it. Experiment. Share. Collaborate.\nRepeat until something awesome happens.',
      color: 'bg-purple-700',
    },
    {
      title: '03. WHAT DO WE BUILD?',
      content: 'More than PowerPoints.\n\nProjects. Ideas. Events. Challenges. Creative work. Technical solutions. Opportunities.\n\nIf someone says “What if we tried this?” - we\'re already interested.',
      color: 'bg-blue-700',
    },
    {
      title: '04. WHERE DO WE GO?',

      content: 'Beyond the classroom. Beyond the campus.\n\nWe\'re building a wider community where people can learn, create, compete, collaborate and grow.\n\nDifferent people. Different skills.\nOne hell of a community.',
      color: 'bg-emerald-700',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 px-4 bg-transparent overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full halftone opacity-5" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <SectionHeading
          chapter="CHAPTER 02"
          title={
            <>
              SO... WHO ARE <span className="text-comic-red">WE!!?</span>
            </>
          }
          subtitle="We're not another club collecting dust in a classroom. We're a student-driven tech community built by curious minds who learn by doing, building, breaking and creating together."
        />

        {/* Comic panels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {panels.map((panel, index) => (
            <BlurFade key={panel.title} delay={index * 100} direction="up">
              <div className="comic-panel p-6 md:p-8 relative group overflow-hidden">
                {/* Background halftone */}
                <div className="absolute inset-0 halftone opacity-5" />

                {/* Panel number */}
                <div className="absolute top-2 right-3 text-xs text-white/30 font-(--font-comic-display)">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Color accent bar */}
                <div className={`w-16 h-1.5 ${panel.color} mb-4 transition-all duration-300 group-hover:w-full`} />

                {/* Title */}
                <h3 className="text-lg md:text-xl font-(--font-comic-display) text-comic-red tracking-wider mb-3 relative z-10">
                  {panel.title}
                </h3>

                {/* Content */}
                <p className="text-white/80 text-base md:text-lg leading-relaxed relative z-10 font-(--font-comic-body)">
                  {panel.content}
                </p>

                {/* Corner decorations */}
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/20" />
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/10" />
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Speech bubble */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <div className="speech-bubble max-w-md text-center text-sm md:text-base">
            "We don't wait for opportunities. We build the damn things."
          </div>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-4 right-4">
        <span className="page-indicator text-xs">02 / 07</span>
      </div>
    </section>
  );
}
