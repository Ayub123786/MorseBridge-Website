import React from 'react';

export default function ShimmerSkeleton({ aspectRatio = '16/9', height, borderRadius = 16, count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="mb-shimmer-skeleton"
          style={{
            aspectRatio: height ? undefined : aspectRatio,
            height: height || undefined,
            borderRadius,
            width: '100%',
          }}
        />
      ))}
    </>
  );
}
