import type { ReactNode } from 'react';
import BlurFade from './BlurFade';

interface SectionHeadingProps {
  /** Comic caption above the title, e.g. "CHAPTER 03". */
  chapter: string;
  /** Title content — include the red highlight span here. */
  title: ReactNode;
  /** Optional supporting line. */
  subtitle?: ReactNode;
  /**
   * Replaces the default subtitle styling entirely. Used by sections that want a
   * different treatment (e.g. the yellow comic-display line in Recruitment).
   */
  subtitleClassName?: string;
}

/**
 * Single source of truth for section headers. Before this existed, every
 * section repeated its own heading markup, which is why the caption/title
 * spacing and the text contrast drifted slightly from section to section.
 */
export default function SectionHeading({
  chapter,
  title,
  subtitle,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <BlurFade className="text-center mb-12 md:mb-16">
      <span className="comic-caption text-xs mb-4 inline-block">{chapter}</span>
      <h2 className="comic-heading text-3xl md:text-5xl lg:text-6xl text-white mt-4 text-shadow-comic">
        {title}
      </h2>
      {subtitle && (
        <p
          className={
            subtitleClassName ??
            'mt-6 text-white/75 max-w-2xl mx-auto font-[var(--font-comic-body)] text-base md:text-lg text-shadow-comic'
          }
        >
          {subtitle}
        </p>
      )}
    </BlurFade>
  );
}