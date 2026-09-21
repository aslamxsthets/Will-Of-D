interface DeadpoolLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withSwords?: boolean;
  animated?: boolean;
}

const SIZE_MAP = {
  xs: { box: 28, swords: 36 },
  sm: { box: 36, swords: 46 },
  md: { box: 56, swords: 72 },
  lg: { box: 80, swords: 104 },
  xl: { box: 120, swords: 156 },
};

export default function DeadpoolLogo({
  size = 'md',
  className = '',
  withSwords = false,
  animated = false,
}: DeadpoolLogoProps) {
  const { box } = SIZE_MAP[size];

  return (
    <div
      className={`inline-flex items-center justify-center relative select-none ${
        animated ? 'transition-transform hover:scale-110 active:scale-95 duration-200' : ''
      } ${className}`}
      style={{ width: withSwords ? SIZE_MAP[size].swords : box, height: withSwords ? SIZE_MAP[size].swords : box }}
    >
      {/* Optional crossed katanas behind the emblem */}
      {withSwords && (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[2px_2px_0px_#000]"
          aria-hidden="true"
        >
          {/* Katana 1 (top-left to bottom-right) */}
          <line x1="12" y1="12" x2="88" y2="88" stroke="#d0d0d0" strokeWidth="4" strokeLinecap="round" />
          <line x1="8" y1="8" x2="22" y2="22" stroke="#c41e2a" strokeWidth="6" strokeLinecap="square" />
          <rect x="21" y="19" width="4" height="6" fill="#ffd700" transform="rotate(45 23 22)" />
          
          {/* Katana 2 (top-right to bottom-left) */}
          <line x1="88" y1="12" x2="12" y2="88" stroke="#d0d0d0" strokeWidth="4" strokeLinecap="round" />
          <line x1="92" y1="8" x2="78" y2="22" stroke="#c41e2a" strokeWidth="6" strokeLinecap="square" />
          <rect x="75" y="19" width="4" height="6" fill="#ffd700" transform="rotate(-45 77 22)" />
        </svg>
      )}

      {/* Main Deadpool Emblem SVG */}
      <svg
        viewBox="0 0 100 100"
        width={box}
        height={box}
        className="relative z-10 drop-shadow-[3px_3px_0px_#000000]"
        aria-label="Deadpool mask emblem"
      >
        <defs>
          <radialGradient id={`dp-grad-${size}`} cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#ff2a3b" />
            <stop offset="65%" stopColor="#c41e2a" />
            <stop offset="100%" stopColor="#7a0f18" />
          </radialGradient>
        </defs>

        {/* Outer Black Border & Crimson Circular Face */}
        <circle
          cx="50"
          cy="50"
          r="44"
          fill={`url(#dp-grad-${size})`}
          stroke="#050505"
          strokeWidth="7"
        />

        {/* Center vertical dividing mask seam */}
        <line
          x1="50"
          y1="6"
          x2="50"
          y2="94"
          stroke="#050505"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Left Black Eye Patch */}
        <path
          d="M 46 25 C 22 28, 16 52, 26 73 C 33 78, 44 73, 46 64 Z"
          fill="#0a0a0a"
          stroke="#050505"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Right Black Eye Patch */}
        <path
          d="M 54 25 C 78 28, 84 52, 74 73 C 67 78, 56 73, 54 64 Z"
          fill="#0a0a0a"
          stroke="#050505"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Left Expressive Squinting Eye */}
        <path
          d="M 32 46 Q 42 42, 43 49 Q 38 56, 29 53 Q 29 48, 32 46 Z"
          fill="#ffffff"
          stroke="#050505"
          strokeWidth="1.5"
        />

        {/* Right Expressive Squinting Eye */}
        <path
          d="M 68 46 Q 58 42, 57 49 Q 62 56, 71 53 Q 71 48, 68 46 Z"
          fill="#ffffff"
          stroke="#050505"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
