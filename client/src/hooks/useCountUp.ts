import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
}

/**
 * Custom hook for animated number counting
 * Increments by 1 continuously until reaching the target value
 * @param end - The target number to count to
 * @param duration - Duration of the animation in milliseconds (default: 2000)
 * @param start - Starting number (default: 0)
 * @returns Current count value
 */
export function useCountUp({ 
  end, 
  duration = 2000, 
  start = 0
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const totalSteps = end - start;
    const stepDuration = duration / totalSteps;
    let currentCount = start;
    
    const counter = setInterval(() => {
      currentCount += 1;
      setCount(currentCount);
      
      if (currentCount >= end) {
        clearInterval(counter);
        setCount(end);
      }
    }, stepDuration);

    return () => clearInterval(counter);
  }, [end, start, duration, hasStarted]);

  const startCounting = () => {
    setHasStarted(true);
  };

  return { count, startCounting, hasStarted };
}
