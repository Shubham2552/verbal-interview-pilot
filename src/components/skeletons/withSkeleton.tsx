
import React from 'react';
import { useLoading } from '@/hooks/useLoading';

interface WithSkeletonOptions {
  delay?: number;
  minDuration?: number;
}

export function withSkeleton<T extends object>(
  Component: React.ComponentType<T>,
  SkeletonComponent: React.ComponentType,
  options: WithSkeletonOptions = {}
) {
  return React.forwardRef<any, T & { isLoading?: boolean }>((props, ref) => {
    const { isLoading = false, ...componentProps } = props;
    const showSkeleton = useLoading(isLoading, options);

    if (showSkeleton) {
      return <SkeletonComponent />;
    }

    return <Component ref={ref} {...(componentProps as T)} />;
  });
}
