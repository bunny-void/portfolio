import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Pause, Play, RotateCcw, X } from 'lucide-react';
import { NAV_ITEMS, PROFILE } from '../data/portfolioData';
import { useMotionControl } from '../context/MotionContext';
import { computeScrollProgress } from '../utils/portfolioLogic';

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const { motionEnabled, toggleMotion, triggerRebuild } = useMotionControl();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setScrollProgress(
        computeScrollProgress(
          window.scrollY,
          document.documentElement.scrollHeight,
          window.innerHeight,
        ),
      );
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#09090B]/92 backdrop-blur-md border-b border-white/[0.08]">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          aria-label="G Sri Vignesh, home"
          className="font-display text-2xl tracking-wide text-[#F1EFEB] whitespace-nowrap shrink-0 inline-flex items-start leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D48]"
        >
          {PROFILE.brandMark}
          <span className="ml-0.5 text-[11px] font-sans font-bold text-[#E11D48]">®</span>
        </a>

        {/* Zone 2: Primary Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6 lg:gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-current={isActive ? 'location' : undefined}
                className={`relative py-1 text-[13px] font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D48] ${
                  isActive
                    ? 'text-[#E11D48]'
                    : 'text-[#9A9AA5] hover:text-[#F1EFEB]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#E11D48] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Motion Controls + Primary CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={motionEnabled}
            aria-label={motionEnabled ? 'Turn scroll panel motion off' : 'Turn scroll panel motion on'}
            className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium text-[#9A9AA5] hover:text-[#F1EFEB] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5 px-2 focus-visible:outline-2 focus-visible:outline-[#E11D48]"
          >
            {motionEnabled ? (
              <Pause className="h-3.5 w-3.5 text-[#9A9AA5]" aria-hidden="true" />
            ) : (
              <Play className="h-3.5 w-3.5 text-[#E11D48]" aria-hidden="true" />
            )}
            <span>{motionEnabled ? 'Motion on' : 'Motion off'}</span>
          </button>

          <button
            type="button"
            onClick={triggerRebuild}
            aria-label="Replay panel build animations"
            className="hidden lg:inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#F1EFEB] hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5 px-2 focus-visible:outline-2 focus-visible:outline-[#E11D48]"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#E11D48]" aria-hidden="true" />
            <span>Rebuild page</span>
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="hidden sm:inline-flex items-center gap-1 text-[13px] font-semibold text-[#F1EFEB] hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 py-1.5 px-1 focus-visible:outline-2 focus-visible:outline-[#E11D48]"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#E11D48]" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-white/12 bg-[#111115] text-[#F1EFEB] hover:border-[#E11D48] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Crimson scroll progress hairline matching reference */}
      <div aria-hidden="true" className="h-[2px] w-full bg-white/[0.04] overflow-hidden">
        <div
          className="h-full w-full origin-left bg-[#E11D48] transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-b border-white/10 bg-[#0B0B0F] px-5 py-5 space-y-4"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`flex items-center justify-between py-2.5 px-2 text-base font-medium border-b border-white/[0.06] transition-colors ${
                    isActive ? 'text-[#E11D48]' : 'text-[#F1EFEB]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={toggleMotion}
              aria-pressed={motionEnabled}
              className="inline-flex items-center gap-1.5 border border-white/12 bg-[#111115] px-3 py-2 text-xs font-medium text-[#F1EFEB]"
            >
              {motionEnabled ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 text-[#E11D48]" />}
              <span>{motionEnabled ? 'Motion on' : 'Motion off'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                triggerRebuild();
                setMobileOpen(false);
              }}
              className="inline-flex items-center gap-1.5 border border-white/12 bg-[#111115] px-3 py-2 text-xs font-medium text-[#F1EFEB]"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#E11D48]" />
              <span>Rebuild page</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
