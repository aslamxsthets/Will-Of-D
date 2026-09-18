interface DomainIconProps {
  label: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function DomainIcon({ label, color = '#c41e2a', size = 'md' }: DomainIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center font-[var(--font-comic-display)] tracking-wider border-2 relative overflow-hidden`}
      style={{
        borderColor: color,
        color: color,
        background: `linear-gradient(135deg, ${color}15 0%, transparent 100%)`,
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-2 h-2"
        style={{ backgroundColor: color }}
      />
      <span className="relative z-10">{label}</span>
    </div>
  );
}
