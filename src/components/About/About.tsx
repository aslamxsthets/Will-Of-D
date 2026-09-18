import BlurFade from '../UI/BlurFade';

export default function About() {
  const panels = [
    {
      title: 'WHO WE ARE',
      content: 'A student-driven community where curiosity turns into practical experience.',
      color: 'bg-comic-red',
    },
    {
      title: 'WHAT WE BELIEVE',
      content: 'Learning becomes more powerful when people build, experiment, share, and collaborate.',
      color: 'bg-purple-700',
    },
    {
      title: 'WHAT WE BUILD',
      content: 'Projects, ideas, experiences, events, creative work, technical solutions, and opportunities.',
      color: 'bg-blue-700',
    },
    {
      title: "WHERE WE'RE GOING",
      content: 'Toward a stronger student community where people can learn, create, compete, collaborate, and grow.',
      color: 'bg-emerald-700',
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 px-4 bg-transparent overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full halftone opacity-5" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="comic-caption text-xs mb-4 inline-block">CHAPTER 02</span>
          <h2 className="comic-heading text-3xl md:text-5xl lg:text-6xl text-white mt-4">
            SO... WHO ARE <span className="text-comic-red">WE?</span>
          </h2>
          <p className="mt-6 text-white/70 max-w-2xl mx-auto font-[var(--font-comic-body)] text-lg">
            We're not just another student club. We're a crew — a collective of curious minds 
            who believe that the best way to learn is by doing, building, and creating together.
          </p>
        </div>

        {/* Comic panels grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {panels.map((panel, index) => (
            <BlurFade key={panel.title} delay={index * 100} direction="up">
            <div
              className="comic-panel p-6 md:p-8 relative group overflow-hidden"
            >
              {/* Background halftone */}
              <div className="absolute inset-0 halftone opacity-5" />
              
              {/* Panel number */}
              <div className="absolute top-2 right-3 text-xs font-bold text-white/30 font-[var(--font-comic-display)]">
                {String(index + 1).padStart(2, '0')}
              </div>
              
              {/* Color accent bar */}
              <div className={`w-16 h-1.5 ${panel.color} mb-4 transition-all duration-300 group-hover:w-full`} />
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-[var(--font-comic-display)] text-comic-red tracking-wider mb-3 relative z-10">
                {panel.title}
              </h3>
              
              {/* Content */}
              <p className="text-white/80 font-[var(--font-comic-body)] text-base md:text-lg leading-relaxed relative z-10">
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
            "We don't wait for opportunities. We build them."
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
