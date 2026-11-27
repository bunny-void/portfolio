import type React from 'react';
import { ArrowUpRight, Award, ExternalLink, Maximize2, ShieldCheck } from 'lucide-react';
import { ACHIEVEMENT, TOOLS_MARQUEE } from '../data/portfolioData';
import { isBase64PdfDataUri, openOrDownloadPdf } from '../utils/openEmbeddedPdf';
import { AgentBuildPanel } from './AgentBuildPanel';

interface AchievementSectionProps {
  onOpenCertificate: () => void;
}

export function AchievementSection({ onOpenCertificate }: AchievementSectionProps) {
  const handlePdfClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isBase64PdfDataUri(ACHIEVEMENT.certificatePdfPath)) {
      e.preventDefault();
      openOrDownloadPdf(ACHIEVEMENT.certificatePdfPath);
    }
  };

  return (
    <>
      {/* Editorial Tools & Interests Marquee Divider matching reference */}
      <div
        aria-label="Technologies and focus areas"
        className="overflow-hidden border-b border-white/[0.08] bg-[#0D0D11] py-4"
      >
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...TOOLS_MARQUEE, ...TOOLS_MARQUEE].map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="flex items-center gap-10 whitespace-nowrap font-mono-code text-xs tracking-[0.18em] uppercase text-[#C9C9D1]"
            >
              <span>{item}</span>
              <span aria-hidden="true" className="text-[#E11D48]">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Spotlight Section matching reference "SMALL WINS. BIG MOMENTUM." */}
      <section
        id="achievement"
        aria-labelledby="achievement-heading"
        className="border-b border-white/[0.08] bg-[#09090B] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Split Headline */}
          <AgentBuildPanel
            agentName="award.agent"
            componentTag="RECOGNITION"
            accent="amber"
            buildDurationMs={680}
            testId="panel-achievement-header"
          >
            <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="font-mono-code text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E11D48]">
                  {ACHIEVEMENT.eyebrow}
                </p>
                <h2
                  id="achievement-heading"
                  className="font-display text-[clamp(2.6rem,5.5vw,4.5rem)] leading-[0.94] uppercase text-[#F1EFEB] [text-wrap:balance]"
                >
                  {ACHIEVEMENT.headlineTop}
                  <br />
                  <span className="text-[#E11D48]">– {ACHIEVEMENT.headlineBottom}</span>
                </h2>
              </div>

              <div className="font-display text-right text-2xl sm:text-3xl leading-[0.98] uppercase hidden lg:block">
                <p className="text-[#F1EFEB]">THE WORK.</p>
                <p className="text-[#E11D48]">THE RECOGNITION.</p>
              </div>
            </div>
          </AgentBuildPanel>

          {/* Bottom Split: Verified Certificate Preview + Highlight Rows */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left: Uploaded VEDA-2K26 Certificate of Merit */}
            <AgentBuildPanel
              agentName="cert.agent"
              componentTag="CERTIFICATE"
              accent="rose"
              buildDurationMs={800}
              testId="panel-achievement-certificate"
              className="lg:col-span-6"
            >
              <div className="border border-white/12 bg-[#101014] p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.12em] text-[#F1EFEB]">
                    <Award className="h-4 w-4 text-[#E11D48]" aria-hidden="true" />
                    <span>{ACHIEVEMENT.certificateTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenCertificate}
                    aria-label="Open full-size VEDA-2K26 Markathon certificate"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono-code uppercase tracking-[0.12em] text-[#E11D48] hover:text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Expand</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onOpenCertificate}
                  aria-label="View VEDA-2K26 Certificate of Merit for 1st Position in Markathon"
                  className="group relative block w-full overflow-hidden border border-white/10 bg-white aspect-[596/422] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
                >
                  <img
                    src={ACHIEVEMENT.certificateImagePath}
                    alt="Aditya University VEDA-2K26 Certificate of Merit awarded to G. Sri Vignesh for 1st Position in Markathon"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[#09090B]/0 group-hover:bg-[#09090B]/20 transition-colors flex items-end justify-end p-3">
                    <span className="bg-[#09090B]/90 border border-white/15 px-2.5 py-1 font-mono-code text-[10px] uppercase tracking-[0.14em] text-white opacity-95">
                      Click to inspect certificate
                    </span>
                  </div>
                </button>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-code text-[#9A9AA5]">
                  <span>{ACHIEVEMENT.position} · {ACHIEVEMENT.dates}</span>
                  <a
                    href={ACHIEVEMENT.certificatePdfPath}
                    onClick={handlePdfClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#F1EFEB] hover:text-[#E11D48] transition-colors"
                  >
                    <span>Open Original PDF</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </AgentBuildPanel>

            {/* Right: Editorial Numbered Recognition List matching reference */}
            <AgentBuildPanel
              agentName="copy.agent"
              componentTag="MILESTONE DETAILS"
              accent="cyan"
              delayMs={120}
              buildDurationMs={780}
              testId="panel-achievement-details"
              className="lg:col-span-6"
            >
              <div className="space-y-6">
                <p className="text-[15px] leading-relaxed text-[#C9C9D1]">
                  {ACHIEVEMENT.summary}
                </p>

                <ul className="divide-y divide-white/[0.09] border-t border-b border-white/[0.09]">
                  {ACHIEVEMENT.highlights.map((item) => (
                    <li key={item.index} className="flex items-start justify-between gap-4 py-5">
                      <div className="flex items-baseline gap-5">
                        <span className="font-display text-2xl sm:text-3xl text-[#E11D48] tabular-nums shrink-0">
                          {item.index}
                        </span>
                        <div className="space-y-1">
                          <h3 className="text-base font-semibold text-[#F1EFEB]">
                            {item.title}
                          </h3>
                          <p className="text-xs leading-relaxed text-[#9A9AA5]">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[#9A9AA5] shrink-0 mt-1" aria-hidden="true" />
                    </li>
                  ))}
                </ul>

                <div className="flex items-start gap-2.5 border border-white/[0.08] bg-[#101014] p-4 text-xs leading-relaxed text-[#9A9AA5]">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#E11D48] mt-0.5" aria-hidden="true" />
                  <span>{ACHIEVEMENT.disclaimer}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://bunny-void.github.io/mysore-sandal-soap/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C81034] px-5 py-3 text-xs font-semibold tracking-wider uppercase text-white hover:bg-[#E11D48] transition-colors"
                  >
                    <span>Visit Concept Website</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={onOpenCertificate}
                    className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#F1EFEB] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors cursor-pointer"
                  >
                    <span>Inspect Certificate</span>
                  </button>
                </div>
              </div>
            </AgentBuildPanel>
          </div>
        </div>
      </section>
    </>
  );
}
