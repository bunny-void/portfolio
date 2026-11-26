import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface MotionContextValue {
  motionEnabled: boolean;
  prefersReducedMotion: boolean;
  rebuildEpoch: number;
  toggleMotion: () => void;
  triggerRebuild: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [rebuildEpoch, setRebuildEpoch] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = (matches: boolean) => {
      setPrefersReducedMotion(matches);
      if (matches) {
        setMotionEnabled(false);
      }
    };
    apply(mq.matches);
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const value = useMemo<MotionContextValue>(
    () => ({
      motionEnabled,
      prefersReducedMotion,
      rebuildEpoch,
      toggleMotion: () => setMotionEnabled((prev) => !prev),
      triggerRebuild: () => {
        setMotionEnabled(true);
        setRebuildEpoch((prev) => prev + 1);
      },
    }),
    [motionEnabled, prefersReducedMotion, rebuildEpoch],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionControl() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error('useMotionControl must be used inside MotionProvider');
  }
  return ctx;
}
