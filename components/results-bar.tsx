'use client';
import { useEffect } from 'react';
import { animate, stagger } from 'motion';

export default function ({ isMax, percent }) {
  useEffect(() => {
    animate(
      '.result-bar',
      { transform: 'translateX(0)' },
      {
        delay: stagger(0.1),
        duration: 0.5,
        easing: 'ease-out',
      }
    );
  }, []);
  return (
    <span
      className={`result-bar absolute top-0 left-0 h-full ${
        isMax ? 'bg-primary/90' : 'bg-zinc-800'
      } rounded-lg z-0 -translate-x-full`}
      style={{
        width: `${percent}%`,
      }}
    />
  );
}
