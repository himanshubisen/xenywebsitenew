import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Counter = ({ target }: { target: string }) => {
  const [count, setCount] = useState(0);
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isIntersecting) {
      setCount(0);
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (!isIntersecting || !isPageVisible) return;

    const match = target.match(/^(\d+)([%X]?)$/);
    if (!match) return;

    const targetNum = parseInt(match[1], 10);
    const suffix = match[2] || '';
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const increment = targetNum / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isIntersecting, isPageVisible, target]);

  const match = target.match(/^(\d+)([%X]?)$/);
  const suffix = match ? match[2] || '' : '';

  return <div ref={ref}>{count}{suffix}</div>;
};

export default Counter;