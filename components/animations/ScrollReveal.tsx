'use client';

import { ReactNode } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  className = ''
}: ScrollRevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const directionMap = {
    up: 'translateY',
    down: 'translateY',
    left: 'translateX',
    right: 'translateX'
  };

  const directionValue = {
    up: distance,
    down: -distance,
    left: distance,
    right: -distance
  };

  const transform = isVisible
    ? 'translate(0, 0)'
    : `${directionMap[direction]}(${directionValue[direction]}px)`;

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform,
        transitionDelay: `${delay}ms`,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
}

