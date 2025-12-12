'use client';

import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: 'word' | 'char';
}

export default function TextReveal({
  text,
  className = '',
  delay = 50,
  splitBy = 'word'
}: TextRevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setRevealed(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  const splitText = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <div ref={ref} className={className}>
      {splitText.map((item, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{
            transitionDelay: `${index * (delay / splitText.length)}ms`
          }}
        >
          <span
            className={`inline-block transition-transform duration-500 ease-out ${
              revealed ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {item}
            {splitBy === 'word' && ' '}
          </span>
        </span>
      ))}
    </div>
  );
}

