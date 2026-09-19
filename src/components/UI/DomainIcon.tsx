import { 
  Code2, 
  Palette, 
  Camera, 
  Calendar, 
  FileText, 
  Users,
  Wrench,
  BookOpen,
  Trophy,
  Globe,
  TrendingUp,
  Target,
  type LucideIcon 
} from 'lucide-react';

interface DomainIconProps {
  iconName: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Camera,
  Calendar,
  FileText,
  Users,
  Wrench,
  BookOpen,
  Trophy,
  Globe,
  TrendingUp,
  Target,
};

export default function DomainIcon({ iconName, color = '#c41e2a', size = 'md' }: DomainIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  const IconComponent = iconMap[iconName] || Code2;

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center border-2 relative overflow-hidden`}
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
      <IconComponent size={iconSizes[size]} className="relative z-10" />
    </div>
  );
}
