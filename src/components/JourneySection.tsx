import { useState } from 'react';
import { GraduationCap, Minus, Plus } from 'lucide-react';
import { JOURNEY_MILESTONES, PROFILE } from '../data/portfolioData';
import { AgentBuildPanel } from './AgentBuildPanel';

export function JourneySection() {
  const [expandedId, setExpandedId] = useState<string>(JOURNEY_MILESTONES[0].id);

  const toggleMilestone = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="border-b border-white/[0.08] bg-[#09090B] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header matching reference "03 / THE JOURNEY — KEEP BUILDING. KEEP LEARNING." */}
        <AgentBuildPanel
          agentName="timeline.agent"
          componentTag="SECTION HEADER"
          accent="rose"
          buildDurationMs={640}
          testId="panel-journey-header"
        >
          <div className="space-y-3">
            <p className="font-mono-code text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E11D48]">
              03 / THE JOURNEY
            </p>
            <h2
              id="journey-heading"
              className="font-display text-[clamp(2.8rem,6vw,4.75rem)] leading-[0.94] uppercase text-[#F1EFEB]"
            >
              KEEP BUILDING.
              <br />
              <span className="text-[#E11D48]">KEEP LEARNING.</span>
            </h2>
          </div>
        </AgentBuildPanel>

        {/* Split Layout: Interactive Milestones Left + Crimson Aditya University Card Right */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Expandable Timeline Rows */}
          <AgentBuildPanel
            agentName="journey.agent"
            componentTag="TIMELINE"
            accent="cyan"
            buildDurationMs={780}
            testId="panel-journey-timeline"
            className="lg:col-span-7"
          >
            <div className="divide-y divide-white/[0.09] border-t border-b border-white/[0.09]">
              {JOURNEY_MILESTONES.map((milestone) => {
                const isOpen = expandedId === milestone.id;
                return (
                  <div key={milestone.id} className="py-5">
                    <button
                      type="button"
                      onClick={() => toggleMilestone(milestone.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-4 text-left cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D48]"
                    >
                      <div className="grid flex-1 grid-cols-1 gap-1 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                        <span className="sm:col-span-3 font-mono-code text-xs font-medium text-[#E11D48] tabular-nums">
                          {milestone.period}
                        </span>
                        <span className="sm:col-span-6 text-base font-bold text-[#F1EFEB] group-hover:text-[#E11D48] transition-colors">
                          {milestone.role}
                        </span>
                        <span className="sm:col-span-3 sm:text-right text-xs text-[#9A9AA5]">
                          {milestone.organization}
                        </span>
                      </div>

                      <span className="mt-0.5 text-[#E11D48] shrink-0" aria-hidden="true">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mt-4 sm:pl-[25%] space-y-3">
                        <p className="font-mono-code text-[11px] text-[#E11D48]/90">
                          {milestone.location}
                        </p>
                        <p className="text-sm leading-relaxed text-[#C9C9D1]">
                          {milestone.summary}
                        </p>
                        <ul className="space-y-1.5 text-xs leading-relaxed text-[#9A9AA5]">
                          {milestone.highlights.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span aria-hidden="true" className="text-[#E11D48] mt-0.5">–</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AgentBuildPanel>

          {/* Right: Bold Crimson Education Card matching reference */}
          <AgentBuildPanel
            agentName="edu.agent"
            componentTag="EDUCATION CARD"
            accent="rose"
            delayMs={120}
            buildDurationMs={800}
            testId="panel-journey-education"
            className="lg:col-span-5"
          >
            <article className="crimson-panel p-7 sm:p-9 text-white shadow-2xl space-y-6">
              <div className="flex items-center gap-2 font-mono-code text-[11px] font-semibold tracking-[0.16em] uppercase text-white/90">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                <span>EDUCATION</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-4xl sm:text-5xl leading-[0.95] text-white">
                  {PROFILE.education.university}
                </h3>
                <p className="text-base font-semibold text-white/95">
                  {PROFILE.education.degree}
                </p>
                <p className="text-sm text-white/80">
                  {PROFILE.education.specialization}
                </p>
                <p className="pt-1 font-mono-code text-xs text-white/75">
                  {PROFILE.education.campus}
                </p>
              </div>

              <div className="border-t border-white/20 pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl sm:text-5xl tracking-wide text-white tabular-nums">
                    {PROFILE.education.duration}
                  </span>
                  <span className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-white/80">
                    B.TECH
                  </span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-5 space-y-1.5">
                <p className="text-sm font-bold text-white">
                  {PROFILE.education.status}
                </p>
                <p className="text-xs leading-relaxed text-white/85">
                  Building strong foundations in programming, artificial intelligence, machine learning, and modern software development.
                </p>
              </div>
            </article>
          </AgentBuildPanel>
        </div>
      </div>
    </section>
  );
}
