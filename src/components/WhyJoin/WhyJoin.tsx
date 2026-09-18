export default function WhyJoin() {
  const reasons = [
    {
      title: 'REAL PROJECTS',
      description: 'Work on practical projects instead of only learning theory.',
      icon: '🔧',
      color: '#c41e2a',
    },
    {
      title: 'LEARN',
      description: 'Develop technical and creative skills through hands-on experiences.',
      icon: '📚',
      color: '#2196f3',
    },
    {
      title: 'COMPETITIONS',
      description: 'Prepare for hackathons, CTFs, competitions, and challenges.',
      icon: '🏆',
      color: '#ffd700',
    },
    {
      title: 'NETWORK',
      description: 'Meet students with different interests and skill sets.',
      icon: '🌐',
      color: '#9c27b0',
    },
    {
      title: 'GROW',
      description: 'Build confidence, communication skills, leadership, and technical ability.',
      icon: '🌱',
      color: '#4caf50',
    },
    {
      title: 'FIND YOUR PLACE',
      description: 'Explore different domains and discover where you fit into the crew.',
      icon: '🎯',
      color: '#ff5722',
    },
  ];

  return (
    <section id="why-join" className="relative py-20 md:py-32 px-4 comic-page overflow-hidden">
      <div className="absolute inset-0 halftone opacity-5" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="comic-caption text-xs mb-4 inline-block">CHAPTER 04</span>
          <h2 className="comic-heading text-3xl md:text-5xl lg:text-6xl text-white mt-4">
            WHY JOIN THE <span className="text-comic-red">CREW?</span>
          </h2>
          <p className="mt-6 text-white/70 max-w-xl mx-auto font-[var(--font-comic-body)] text-lg">
            You don't have to be an expert. Just bring your curiosity.
          </p>
        </div>

        {/* Reason panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="comic-panel p-6 relative group"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: reason.color }} />
              
              {/* Panel number */}
              <div className="absolute top-3 right-3 text-xs font-bold text-white/20 font-[var(--font-comic-display)]">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-4">{reason.icon}</div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-[var(--font-comic-display)] tracking-wider mb-2" style={{ color: reason.color }}>
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 text-sm md:text-base leading-relaxed font-[var(--font-comic-body)]">
                {reason.description}
              </p>

              {/* Bottom corner decoration */}
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/20" />
            </div>
          ))}
        </div>

        {/* Bottom speech bubble */}
        <div className="mt-12 text-center">
          <div className="inline-block speech-bubble max-w-lg text-sm md:text-base">
            "The best time to join was yesterday. The second best time is right now."
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
