import { useMotionControl } from '../context/MotionContext';

const AMBIENT_POINTS = [
  { top: '14%', left: '26%', color: '#FBBF24', drift: 'cursor-drift-a', rotate: '-10deg' },
  { top: '18%', left: '72%', color: '#F43F5E', drift: 'cursor-drift-b', rotate: '8deg' },
  { top: '44%', left: '4%', color: '#34D399', drift: 'cursor-drift-b', rotate: '-14deg' },
  { top: '52%', left: '94%', color: '#A78BFA', drift: 'cursor-drift-a', rotate: '12deg' },
  { top: '76%', left: '11%', color: '#22D3EE', drift: 'cursor-drift-a', rotate: '-6deg' },
  { top: '82%', left: '88%', color: '#FB7185', drift: 'cursor-drift-b', rotate: '10deg' },
];

export function AmbientCursors() {
  const { motionEnabled } = useMotionControl();

  return (
    <>
      {motionEnabled && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-10 overflow-hidden hidden lg:block"
        >
          {AMBIENT_POINTS.map((pt, i) => (
            <div
              key={i}
              style={{ top: pt.top, left: pt.left }}
              className={`absolute opacity-20 ${pt.drift}`}
            >
              <svg
                width="14"
                height="16"
                viewBox="0 0 16 18"
                fill="none"
                style={{ transform: `rotate(${pt.rotate})` }}
              >
                <path
                  d="M1 1L6.2 16.5L8.7 10.1L15 7.8L1 1Z"
                  fill="#09090B"
                  stroke={pt.color}
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* Bottom-right subtle indicator matching the reference portfolio */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-4 right-4 z-30 hidden sm:flex items-center gap-2.5 border border-white/12 bg-[#09090B]/92 px-3 py-1.5 backdrop-blur-sm"
      >
        <span className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#F1EFEB]/85">
          {motionEnabled ? 'PANELS BUILD ON SCROLL' : 'STATIC VIEW ACTIVE'}
        </span>
        <span className="font-mono-code text-[10px] tracking-[0.12em] uppercase text-[#E11D48]">
          ↕ SCROLL
        </span>
      </div>
    </>
  );
}
