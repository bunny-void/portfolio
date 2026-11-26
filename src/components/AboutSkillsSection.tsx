import { ArrowUpRight } from 'lucide-react';
import { PROCESS_STEPS, PROFILE, SKILL_GROUPS } from '../data/portfolioData';
import { AgentBuildPanel } from './AgentBuildPanel';

export function AboutSkillsSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-white/[0.08] bg-[#09090B] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 space-y-20">
        {/* About Editorial Split matching reference "02 / BEHIND THE BUILD" */}
        <AgentBuildPanel
          agentName="bio.agent"
          componentTag="ABOUT SECTION"
          accent="cyan"
          buildDurationMs={720}
          testId="panel-about-intro"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6 space-y-3">
              <p className="font-mono-code text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E11D48]">
                02 / BEHIND THE BUILD
              </p>
              <h2
                id="about-heading"
                className="font-display text-[clamp(2.8rem,5.8vw,4.75rem)] leading-[0.94] uppercase text-[#F1EFEB] [text-wrap:balance]"
              >
                NOT JUST CODE.
                <br />
                THE MINDSET <span className="text-[#E11D48]">BEHIND IT.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-5 lg:pt-6">
              {PROFILE.aboutParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-[15px] leading-[1.75] text-[#C9C9D1]"
                >
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/[0.08] pt-5 text-xs">
                <div>
                  <p className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#E11D48]">
                    DEGREE TRACK
                  </p>
                  <p className="mt-1 font-semibold text-[#F1EFEB]">
                    {PROFILE.education.degree}
                  </p>
                  <p className="text-[#9A9AA5]">{PROFILE.education.specialization}</p>
                </div>
                <div>
                  <p className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#E11D48]">
                    CAMPUS &amp; LOCATION
                  </p>
                  <p className="mt-1 font-semibold text-[#F1EFEB]">
                    {PROFILE.education.university}, Surampalem
                  </p>
                  <p className="text-[#9A9AA5]">{PROFILE.location}</p>
                </div>
              </div>
            </div>
          </div>
        </AgentBuildPanel>

        {/* Skills Matrix (#skills anchor) matching reference ENGINEERING TOOLKIT */}
        <div id="skills" className="scroll-mt-24 space-y-8">
          <AgentBuildPanel
            agentName="type.agent"
            componentTag="SKILLS HEADER"
            accent="amber"
            buildDurationMs={600}
            testId="panel-skills-header"
          >
            <div className="space-y-2">
              <p className="font-mono-code text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E11D48]">
                WHAT I WORK WITH
              </p>
              <h3 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none uppercase text-[#F1EFEB]">
                SKILLS &amp; INTERESTS
              </h3>
            </div>
          </AgentBuildPanel>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SKILL_GROUPS.map((group, idx) => (
              <AgentBuildPanel
                key={group.id}
                agentName={group.agentName}
                componentTag="TOOLKIT PANEL"
                accent={group.agentAccent}
                delayMs={idx * 100}
                buildDurationMs={740}
                testId={`panel-skill-${group.id}`}
              >
                <div className="flex h-full flex-col justify-between border border-white/[0.09] bg-[#101014] p-6 space-y-6 hover:border-white/20 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-base font-bold text-[#F1EFEB]">{group.title}</h4>
                      <p className="mt-1 text-xs text-[#9A9AA5]">{group.subtitle}</p>
                    </div>
                    <span aria-hidden="true" className="font-mono-code text-xs text-[#E11D48]">
                      ×
                    </span>
                  </div>

                  {/* Clean square-bordered toolkit grid matching reference (zero fake percentages) */}
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <div
                        key={item.name}
                        className="border border-white/[0.11] bg-[#0B0B0F] px-3 py-2 text-xs text-[#F1EFEB]"
                      >
                        <span className="font-medium">{item.name}</span>
                        {item.note && (
                          <span className="ml-2 font-mono-code text-[10px] text-[#9A9AA5]">
                            · {item.note}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </AgentBuildPanel>
            ))}
          </div>
        </div>

        {/* How I Approach The Work (4-column editorial strip matching reference) */}
        <div className="space-y-8 pt-4">
          <AgentBuildPanel
            agentName="grid.agent"
            componentTag="PROCESS"
            accent="violet"
            buildDurationMs={620}
            testId="panel-process-header"
          >
            <div className="space-y-2">
              <p className="font-mono-code text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E11D48]">
                FROM CURIOSITY TO WORKING PROTOTYPE
              </p>
              <h3 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none uppercase text-[#F1EFEB]">
                HOW I APPROACH THE WORK
              </h3>
            </div>
          </AgentBuildPanel>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => (
              <AgentBuildPanel
                key={step.number}
                agentName={`step0${idx + 1}.agent`}
                componentTag="STEP"
                accent={idx % 2 === 0 ? 'rose' : 'cyan'}
                delayMs={idx * 90}
                buildDurationMs={680}
                testId={`panel-process-${step.number}`}
              >
                <div className="h-full border-t border-white/[0.12] pt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl text-[#E11D48] tabular-nums">
                      {step.number}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#9A9AA5]" aria-hidden="true" />
                  </div>
                  <h4 className="font-mono-code text-xs font-semibold tracking-[0.14em] uppercase text-[#F1EFEB]">
                    {step.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#9A9AA5]">
                    {step.description}
                  </p>
                </div>
              </AgentBuildPanel>
            ))}
          </div>
        </div>

        {/* Bold Editorial Statement matching reference "BUILD THE THING. MAKE IT MATTER." */}
        <AgentBuildPanel
          agentName="display.agent"
          componentTag="STATEMENT"
          accent="rose"
          buildDurationMs={700}
          testId="panel-editorial-banner"
        >
          <div className="border-t border-white/[0.08] pt-12 text-center">
            <p className="font-display text-[clamp(2.6rem,7.2vw,6.2rem)] leading-[0.94] tracking-tight uppercase text-[#F1EFEB]">
              LEARNING<span className="text-[#E11D48]">.</span> BUILDING
              <span className="text-[#E11D48]">.</span> EVOLVING
              <span className="text-[#E11D48]">.</span>
            </p>
          </div>
        </AgentBuildPanel>
      </div>
    </section>
  );
}
