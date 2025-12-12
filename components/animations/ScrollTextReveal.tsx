'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: 'word' | 'char';
  staggerDelay?: number;
}

/**
 * Enhanced scroll-driven text reveal similar to epiminds.com
 * Words/characters reveal as you scroll through the viewport
 */
export default function ScrollTextReveal({
  text,
  className = '',
  delay = 0,
  splitBy = 'word',
  staggerDelay = 30
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerHeight = rect.height;
      
      // Calculate scroll progress through the container
      // Start revealing when container enters viewport
      const startPoint = windowHeight * 0.8; // Start when 80% down viewport
      const endPoint = windowHeight * 0.2; // End when 20% down viewport
      
      if (containerTop < startPoint && containerTop + containerHeight > endPoint) {
        const progress = Math.min(
          Math.max((startPoint - containerTop) / (startPoint - endPoint), 0),
          1
        );
        
        const splitText = splitBy === 'word' ? text.split(' ') : text.split('');
        const totalItems = splitText.length;
        const itemsToReveal = Math.floor(progress * totalItems);
        
        const newRevealed = new Set<number>();
        for (let i = 0; i <= itemsToReveal; i++) {
          newRevealed.add(i);
        }
        setRevealedIndices(newRevealed);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [text, splitBy]);

  const splitText = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <div ref={containerRef} className={className}>
      {splitText.map((item, index) => {
        const isRevealed = revealedIndices.has(index);
        const isLast = index === splitText.length - 1;
        return (
          <span key={index}>
            <span
              className="inline-block overflow-hidden"
              style={{
                transitionDelay: `${index * staggerDelay}ms`
              }}
            >
              <span
                className={`inline-block transition-all duration-700 ease-out ${
                  isRevealed
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-full opacity-0'
                }`}
              >
                {item}
              </span>
            </span>
            {splitBy === 'word' && !isLast && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

