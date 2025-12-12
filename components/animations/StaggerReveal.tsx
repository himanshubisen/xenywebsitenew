'use client';

import { ReactNode, useEffect, useRef, useState, Children } from 'react';

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * Stagger reveal for multiple children (like cards, features, etc.)
 * Similar to epiminds.com staggered animations
 */
export default function StaggerReveal({
  children,
  className = '',
  staggerDelay = 100,
  direction = 'up'
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    observer.observe(container);

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  const directionMap = {
    up: 'translateY(30px)',
    down: 'translateY(-30px)',
    left: 'translateX(30px)',
    right: 'translateX(-30px)'
  };

  const childrenArray = Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translate(0, 0)' : directionMap[direction],
            transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * staggerDelay}ms, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * staggerDelay}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

