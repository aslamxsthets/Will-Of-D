import { useEffect, useRef, useState } from 'react';

interface WordPullUpProps {
  words: string;
  className?: string;
  delay?: number;
}

export default function WordPullUp({ words, className = '', delay = 0 }: WordPullUpProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const wordArray = words.split(' ');

  return (
    <div ref={ref} className={className}>
      {wordArray.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${i * 0.1}s`,
          }}
        >
          {word}{' '}
        </span>
      ))}
    </div>
  );
}
