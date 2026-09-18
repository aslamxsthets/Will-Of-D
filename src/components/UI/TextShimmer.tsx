import { useEffect, useRef } from 'react';

interface TextShimmerProps {
  children: string;
  className?: string;
  duration?: number;
  shimmerColor?: string;
}

export default function TextShimmer({ 
  children, 
  className = '', 
  duration = 2,
  shimmerColor = 'rgba(196, 30, 42, 0.5)'
}: TextShimmerProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    text.style.backgroundImage = `linear-gradient(
      90deg,
      ${shimmerColor} 0%,
      rgba(255, 255, 255, 0.8) 50%,
      ${shimmerColor} 100%
    )`;
    text.style.backgroundSize = '200% 100%';
    text.style.backgroundRepeat = 'no-repeat';
    text.style.webkitBackgroundClip = 'text';
    text.style.backgroundClip = 'text';
    text.style.color = 'transparent';
    text.style.animation = `shimmer ${duration}s ease-in-out infinite`;
  }, [duration, shimmerColor]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
}
