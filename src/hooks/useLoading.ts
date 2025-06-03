
import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  delay?: number;
  minDuration?: number;
}

export const useLoading = (
  isLoading: boolean, 
  options: UseLoadingOptions = {}
) => {
  const { delay = 0, minDuration = 500 } = options;
  const [showSkeleton, setShowSkeleton] = useState(delay === 0 ? isLoading : false);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    let minDurationTimer: NodeJS.Timeout;

    if (isLoading) {
      setLoadingStartTime(Date.now());
      
      if (delay > 0) {
        delayTimer = setTimeout(() => {
          setShowSkeleton(true);
        }, delay);
      } else {
        setShowSkeleton(true);
      }
    } else {
      const elapsed = loadingStartTime ? Date.now() - loadingStartTime : 0;
      const remainingTime = Math.max(0, minDuration - elapsed);
      
      if (remainingTime > 0) {
        minDurationTimer = setTimeout(() => {
          setShowSkeleton(false);
        }, remainingTime);
      } else {
        setShowSkeleton(false);
      }
    }

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(minDurationTimer);
    };
  }, [isLoading, delay, minDuration, loadingStartTime]);

  return showSkeleton;
};
