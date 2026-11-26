import { ArrowDown, ArrowUpRight, Award, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { useMotionControl } from '../context/MotionContext';

interface HeroSectionProps {
  onOpenCertificate: () => void;
}

export function HeroSection({ onOpenCertificate }: HeroSectionProps) {
  const { motionEnabled, rebuildEpoch } = useMotionControl();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero introduction"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#09090B]"
    >
      <div className="mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-[1320px] flex-col justify-between px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        {/* Top Metadata Strip matching reference */}
        <div className="flex flex-wrap items-start justify-between gap-3 text-[11px] tracking-[0.14em] uppercase">
          <div className="space-y-1">
            <p className="font-semibold text-[#E11D48]">
              TECH ENTHUSIAST / FUTURE AI/ML ENGINEER
            </p>
            <p className="text-[#9A9AA5]">
              B.TECH CSE – AI &amp; ML · MICROSOFT SPECIALIZATION
            </p>
          </div>
          <div className="text-right font-mono-code text-[#9A9AA5]">
            <span>ADITYA UNIVERSITY · 2026–2030</span>
          </div>
        </div>

        {/* Main Hero Composition: Giant Crimson Backdrop + Left Type + Center Portrait + Right Highlights */}
        <div
          key={rebuildEpoch}
          className="relative my-8 grid grid-cols-1 items-center gap-10 lg:my-6 lg:grid-cols-12 lg:gap-4"
        >
          {/* Oversized crimson display backdrop behind portrait matching the reference hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden text-center hidden lg:block"
          >
            <span className="font-display block text-[clamp(11rem,20vw,18.5rem)] leading-[0.82] tracking-[-0.02em] text-[#A80D2B]/70 [mask-image:radial-gradient(ellipse_78%_88%_at_50%_50%,rgba(0,0,0,0.95)_35%,rgba(0,0,0,0.32)_78%,rgba(0,0,0,0.12)_100%)]">
              PORTFOLIO
            </span>
          </div>

          {/* Left Column: Editorial Introduction & CTAs */}
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 lg:col-span-5 xl:col-span-4 space-y-5"
          >
            <div>
              <p className="font-script text-4xl sm:text-5xl text-[#F1EFEB] -mb-1 -rotate-2 origin-left drop-shadow-[0_2px_10px_rgba(9,9,11,0.9)]">
                {PROFILE.heroKicker}
              </p>
              <h1 className="font-display text-[clamp(3.3rem,6.5vw,5.4rem)] leading-[0.9] text-[#F1EFEB] uppercase [text-wrap:balance] drop-shadow-[0_4px_18px_rgba(9,9,11,0.95)]">
                G SRI
                <br />
                VIGNESH<span className="text-[#FF2A51]">.</span>
              </h1>
            </div>

            <div className="font-display text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[0.98] uppercase tracking-wide drop-shadow-[0_3px_14px_rgba(9,9,11,0.95)]">
              <p className="text-[#FF2A51]">{PROFILE.heroRoleLine1}</p>
              <p className="text-[#F1EFEB]">{PROFILE.heroRoleLine2}</p>
            </div>

            <p className="max-w-md text-[15px] leading-relaxed text-[#D4D4DC] drop-shadow-[0_2px_10px_rgba(9,9,11,0.9)]">
              {PROFILE.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="inline-flex items-center gap-3 bg-[#C81034] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#E11D48] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Explore My Work</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-medium text-[#F1EFEB] hover:text-[#FF2A51] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="h-4 w-4 text-[#FF2A51]" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono-code tracking-[0.14em] uppercase text-[#9A9AA5]">
              <MapPin className="h-3.5 w-3.5 text-[#E11D48] shrink-0" aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </div>
          </motion.div>

          {/* Center Column: Uploaded Professional Portrait tightly framed on subject */}
          <motion.div
            initial={motionEnabled ? { opacity: 0, scale: 0.96 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:col-span-4 lg:max-w-[400px]"
          >
            {/* Subtle crimson rim spotlight behind portrait matching reference */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_50%_45%,rgba(225,29,72,0.34),transparent_68%)] blur-xl"
            />
            <div className="relative overflow-hidden border border-white/12 bg-[#111115] aspect-[4/5]">
              <img
                src={PROFILE.portraitPath}
                alt="Portrait of G Sri Vignesh"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-[38%_42%] scale-[1.55] origin-[36%_44%] contrast-[1.06] brightness-[1.04]"
              />
              {/* Bottom obsidian gradient scrim blending into page floor */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/15 to-transparent"
              />
              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[10px] font-mono-code tracking-[0.14em] uppercase text-[#F1EFEB]/90">
                <span>G SRI VIGNESH</span>
                <span className="text-[#FF2A51]">CSE · AI &amp; ML</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Verified Academic & Project Highlights matching reference */}
          <motion.aside
            aria-label="Verified profile highlights"
            initial={motionEnabled ? { opacity: 0, x: 16 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 lg:col-span-3 xl:col-span-4 lg:pl-6 xl:pl-12"
          >
            <p className="mb-6 text-sm leading-relaxed text-[#C9C9D1] lg:text-right">
              Learning. Building.
              <br />
              Evolving every day.
            </p>

            <div className="divide-y divide-white/[0.1] border-t border-b border-white/[0.1]">
              <div className="flex items-center justify-between gap-4 py-4">
                <span className="font-display text-3xl sm:text-4xl text-[#E11D48] tabular-nums">
                  2026–30
                </span>
                <span className="text-right text-[11px] font-mono-code tracking-[0.1em] uppercase text-[#9A9AA5]">
                  B.TECH CSE
                  <br />
                  AI &amp; ML
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <span className="font-display text-3xl sm:text-4xl text-[#E11D48] tabular-nums">
                  1ST
                </span>
                <span className="text-right text-[11px] font-mono-code tracking-[0.1em] uppercase text-[#9A9AA5]">
                  MARKATHON
                  <br />
                  VEDA-2K26
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <span className="font-display text-3xl sm:text-4xl text-[#E11D48] tabular-nums">
                  04
                </span>
                <span className="text-right text-[11px] font-mono-code tracking-[0.1em] uppercase text-[#9A9AA5]">
                  LIVE SITES &amp;
                  <br />
                  PROTOTYPES
                </span>
              </div>
            </div>

            <div className="mt-5 flex lg:justify-end">
              <button
                type="button"
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-2 text-xs font-mono-code font-semibold tracking-[0.14em] uppercase text-[#F1EFEB] hover:text-[#E11D48] transition-colors cursor-pointer py-1.5 focus-visible:outline-2 focus-visible:outline-[#E11D48]"
              >
                <Award className="h-4 w-4 text-[#E11D48]" aria-hidden="true" />
                <span>View Markathon Certificate</span>
              </button>
            </div>
          </motion.aside>
        </div>

        {/* Hero Bottom Rail matching reference */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-4 text-[11px] font-mono-code tracking-[0.16em] uppercase text-[#9A9AA5]">
          <span>ADITYA UNIVERSITY · SURAMPALEM</span>
          <button
            type="button"
            onClick={() => scrollTo('work')}
            className="inline-flex items-center gap-2 text-[#C9C9D1] hover:text-[#E11D48] transition-colors cursor-pointer"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="h-3.5 w-3.5 text-[#E11D48]" aria-hidden="true" />
          </button>
          <span className="hidden sm:inline">{PROFILE.shortLocation}</span>
        </div>
      </div>
    </section>
  );
}
