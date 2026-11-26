import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotionControl } from '../context/MotionContext';
import {
  completePanelBuild,
  computeNextPanelPhase,
  type PanelPhase,
} from '../utils/panelState';

export type AgentAccent = 'violet' | 'cyan' | 'amber' | 'emerald' | 'rose';

interface AgentBuildPanelProps {
  children: React.ReactNode;
  className?: string;
  agentName?: string;
  componentTag?: string;
  accent?: AgentAccent;
  delayMs?: number;
  buildDurationMs?: number;
  testId?: string;
}

const ACCENT_MAP: Record<
  AgentAccent,
  {
    border: string;
    tagBg: string;
    tagText: string;
    cursorFill: string;
    badgeBorder: string;
    glow: string;
  }
> = {
  violet: {
    border: 'border-violet-400/75',
    tagBg: 'bg-violet-400',
    tagText: 'text-[#09090B]',
    cursorFill: '#A78BFA',
    badgeBorder: 'border-violet-400/70',
    glow: 'shadow-[0_0_24px_rgba(167,139,250,0.22)]',
  },
  cyan: {
    border: 'border-cyan-400/75',
    tagBg: 'bg-cyan-400',
    tagText: 'text-[#09090B]',
    cursorFill: '#22D3EE',
    badgeBorder: 'border-cyan-400/70',
    glow: 'shadow-[0_0_24px_rgba(34,211,238,0.22)]',
  },
  amber: {
    border: 'border-amber-400/75',
    tagBg: 'bg-amber-400',
    tagText: 'text-[#09090B]',
    cursorFill: '#FBBF24',
    badgeBorder: 'border-amber-400/70',
    glow: 'shadow-[0_0_24px_rgba(251,191,36,0.22)]',
  },
  emerald: {
    border: 'border-emerald-400/75',
    tagBg: 'bg-emerald-400',
    tagText: 'text-[#09090B]',
    cursorFill: '#34D399',
    badgeBorder: 'border-emerald-400/70',
    glow: 'shadow-[0_0_24px_rgba(52,211,153,0.22)]',
  },
  rose: {
    border: 'border-rose-500/80',
    tagBg: 'bg-rose-500',
    tagText: 'text-white',
    cursorFill: '#F43F5E',
    badgeBorder: 'border-rose-500/75',
    glow: 'shadow-[0_0_24px_rgba(244,63,94,0.25)]',
  },
};

export function AgentBuildPanel({
  children,
  className = '',
  agentName = 'visual.agent',
  componentTag = 'COMPONENT',
  accent = 'cyan',
  delayMs = 0,
  buildDurationMs = 560,
  testId,
}: AgentBuildPanelProps) {
  const { motionEnabled, rebuildEpoch } = useMotionControl();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<PanelPhase>(motionEnabled ? 'hidden' : 'revealed');
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const phaseRef = useRef<PanelPhase>(phase);
  const timerRef = useRef<number | null>(null);

  phaseRef.current = phase;

  const clearBuildTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Measure panel size for authentic Figma-style blueprint dimension readout
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      setDimensions({
        w: Math.round(rect.width),
        h: Math.round(rect.height),
      });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Respond immediately to Motion Off toggle
  useEffect(() => {
    if (!motionEnabled) {
      clearBuildTimer();
      setPhase('revealed');
    }
  }, [motionEnabled]);

  // Handle "Rebuild page" trigger: reset to hidden, then immediately build if currently visible
  useEffect(() => {
    if (rebuildEpoch === 0 || !motionEnabled) return;
    clearBuildTimer();
    setPhase('hidden');
    const frameId = window.requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.94 && rect.bottom > 40;
      if (visible) {
        setPhase('building');
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [rebuildEpoch, motionEnabled]);

  // Viewport-gated IntersectionObserver + scroll-up hide reset
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !motionEnabled) return;

    const evaluateVisibility = (isIntersecting: boolean) => {
      const rect = el.getBoundingClientRect();
      const next = computeNextPanelPhase({
        currentPhase: phaseRef.current,
        isIntersecting,
        rectTop: rect.top,
        viewportHeight: window.innerHeight,
        motionEnabled,
      });
      if (next !== phaseRef.current) {
        if (next === 'hidden') {
          clearBuildTimer();
        }
        setPhase(next);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          evaluateVisibility(entry.isIntersecting);
        }
      },
      {
        threshold: [0, 0.1, 0.25],
        rootMargin: '0px 0px -32px 0px',
      },
    );

    observer.observe(el);

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 32 && rect.bottom > 40;
        evaluateVisibility(isVisible);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      clearBuildTimer();
    };
  }, [motionEnabled, rebuildEpoch]);

  // Run the timed cursor-drawing sequence ONLY while phase === 'building'
  useEffect(() => {
    if (phase !== 'building') return;
    clearBuildTimer();
    const effectiveDuration = Math.min(buildDurationMs, 640);
    timerRef.current = window.setTimeout(() => {
      setPhase((prev) => completePanelBuild(prev));
      timerRef.current = null;
    }, delayMs + effectiveDuration);

    return () => clearBuildTimer();
  }, [phase, delayMs, buildDurationMs]);

  const palette = ACCENT_MAP[accent];
  const isRevealed = phase === 'revealed';
  const isBuilding = phase === 'building';
  const totalSec = Math.min(buildDurationMs, 640) / 1000;
  const delaySec = delayMs / 1000;

  return (
    <div
      ref={containerRef}
      data-panel-state={phase}
      data-testid={testId}
      className={`relative ${className}`}
    >
      {/* Actual inner content — strictly hidden until the cursor + panel build animation completes */}
      <div
        className={`transition-all duration-200 ease-out will-change-transform ${
          isRevealed
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-1.5 scale-[0.99] pointer-events-none select-none'
        }`}
        aria-hidden={!isRevealed}
      >
        {children}
      </div>

      {/* Dormant wireframe outline when panel is hidden & waiting for scroll entry */}
      {phase === 'hidden' && motionEnabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-dashed border-white/[0.06] bg-[#0C0C10]/60"
        />
      )}

      {/* Active blueprint panel opening + animated agent cursor */}
      <AnimatePresence>
        {isBuilding && motionEnabled && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            className="pointer-events-none absolute inset-0 z-20 overflow-visible"
          >
            {/* Expanding wireframe panel dragged open from top-left to bottom-right */}
            <motion.div
              initial={{ scaleX: 0.06, scaleY: 0.08, opacity: 0.65 }}
              animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
              transition={{
                delay: delaySec,
                duration: totalSec * 0.82,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: '0% 0%' }}
              className={`absolute inset-0 blueprint-grid bg-[#0E0E14]/92 border ${palette.border} ${palette.glow}`}
            >
              {/* Subtle diagonal blueprint guide lines */}
              <svg
                className="absolute inset-0 h-full w-full opacity-20"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.35" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.35" />
              </svg>

              {/* Four corner selection handles */}
              <span className={`absolute -top-1 -left-1 h-2 w-2 border ${palette.border} bg-[#09090B]`} />
              <span className={`absolute -top-1 -right-1 h-2 w-2 border ${palette.border} bg-[#09090B]`} />
              <span className={`absolute -bottom-1 -left-1 h-2 w-2 border ${palette.border} bg-[#09090B]`} />
              <span className={`absolute -bottom-1 -right-1 h-2 w-2 border ${palette.border} bg-[#09090B]`} />

              {/* Top-left component type tag */}
              <div
                className={`absolute -top-5 left-0 px-1.5 py-0.5 font-mono-code text-[9px] font-semibold tracking-wider uppercase ${palette.tagBg} ${palette.tagText}`}
              >
                {componentTag}
              </div>

              {/* Bottom-left live dimensions readout */}
              {dimensions.w > 0 && (
                <div className="absolute bottom-2 left-2 bg-[#09090B]/90 border border-white/15 px-1.5 py-0.5 font-mono-code text-[10px] text-white/80">
                  {dimensions.w} × {dimensions.h}
                </div>
              )}
            </motion.div>

            {/* Animated agent cursor sweeping across the panel as it opens */}
            <motion.div
              initial={{ left: '6%', top: '8%', opacity: 0 }}
              animate={{
                left: ['6%', '72%', '92%'],
                top: ['8%', '56%', '88%'],
                opacity: [0, 1, 1],
              }}
              transition={{
                delay: delaySec,
                duration: totalSec * 0.86,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute z-30 -translate-x-1 -translate-y-1 flex items-start gap-1.5"
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                className="shrink-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
              >
                <path
                  d="M1 1L6.2 16.5L8.7 10.1L15 7.8L1 1Z"
                  fill={palette.cursorFill}
                  stroke="#09090B"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                className={`mt-2.5 bg-[#09090B]/95 border ${palette.badgeBorder} px-2 py-1 shadow-lg whitespace-nowrap`}
              >
                <div className="font-mono-code text-[10px] font-semibold leading-none text-white">
                  {agentName}
                </div>
                <div className="mt-0.5 font-mono-code text-[8px] tracking-wider uppercase text-white/60">
                  BUILDING {componentTag}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
