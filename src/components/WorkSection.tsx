import { useState } from 'react';
import { ArrowUpRight, Code2, ExternalLink, Github, Info, Layers, Trophy } from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/portfolioData';
import { filterProjects } from '../utils/portfolioLogic';
import { AgentBuildPanel } from './AgentBuildPanel';

interface WorkSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const FILTER_TABS: { value: ProjectCategory; label: string }[] = [
  { value: 'all', label: 'All Work' },
  { value: 'ai-ml', label: 'AI & ML' },
  { value: 'web-apps', label: 'Web Apps' },
  { value: 'concept', label: 'Concept' },
];

function ProjectPreviewMedia({ project }: { project: ProjectItem }) {
  if (project.previewType === 'screenshot' && project.previewImage) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0E0E12]">
        <img
          src={project.previewImage}
          alt={`Preview of ${project.title}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090B]/75 via-transparent to-[#09090B]/20"
        />
      </div>
    );
  }

  if (project.previewType === 'pose-diagram') {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D0D12] blueprint-grid flex items-center justify-center p-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(167,139,250,0.18),transparent_65%)]"
        />
        <div className="relative z-10 flex w-full max-w-sm items-center justify-between gap-4 border border-white/10 bg-[#09090B]/90 p-5">
          {/* Stylized MediaPipe Pose skeleton schematic */}
          <svg
            viewBox="0 0 120 150"
            className="h-32 w-24 shrink-0"
            aria-hidden="true"
          >
            <circle cx="60" cy="24" r="10" stroke="#A78BFA" strokeWidth="2.2" fill="none" />
            <line x1="60" y1="34" x2="60" y2="82" stroke="#22D3EE" strokeWidth="2.2" />
            <line x1="34" y1="48" x2="86" y2="48" stroke="#22D3EE" strokeWidth="2.2" />
            <line x1="34" y1="48" x2="22" y2="78" stroke="#A78BFA" strokeWidth="2.2" />
            <line x1="86" y1="48" x2="98" y2="78" stroke="#A78BFA" strokeWidth="2.2" />
            <line x1="60" y1="82" x2="42" y2="128" stroke="#34D399" strokeWidth="2.2" />
            <line x1="60" y1="82" x2="78" y2="128" stroke="#34D399" strokeWidth="2.2" />
            {[
              [60, 24], [34, 48], [86, 48], [22, 78], [98, 78],
              [60, 82], [42, 128], [78, 128],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.2" fill="#E11D48" />
            ))}
          </svg>
          <div className="space-y-2 text-left">
            <p className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-violet-300">
              MEDIAPIPE POSE · STREAMLIT
            </p>
            <p className="font-display text-xl tracking-wide text-[#F1EFEB]">
              IN-MEMORY POSE TRACKING
            </p>
            <p className="text-xs leading-relaxed text-[#9A9AA5]">
              Webcam skeleton overlay · Fall-pattern detector · Built-in Demo Mode
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D0D12] blueprint-grid flex items-center justify-center p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,72,0.16),transparent_65%)]"
      />
      <div className="relative z-10 w-full max-w-sm border border-white/10 bg-[#09090B]/92 p-5 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono-code text-[#9A9AA5]">
          <span className="inline-flex items-center gap-1.5 text-[#E11D48]">
            <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>bunny-void/{project.repoName}</span>
          </span>
          <span>TYPESCRIPT</span>
        </div>
        <p className="font-display text-2xl tracking-wide text-[#F1EFEB]">
          SANJEEVANI PHARMACY
        </p>
        <p className="text-xs leading-relaxed text-[#9A9AA5]">
          React 19 · TypeScript · Vite · Tailwind CSS · Zustand · React Router
        </p>
        <div className="pt-1 flex items-center gap-2 text-[11px] font-mono-code text-[#C9C9D1]">
          <Layers className="h-3.5 w-3.5 text-[#E11D48]" aria-hidden="true" />
          <span>Source code available on GitHub</span>
        </div>
      </div>
    </div>
  );
}

export function WorkSection({ onSelectProject }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const filteredProjects = filterProjects(PROJECTS, activeCategory);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-white/[0.08] bg-[#09090B] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AgentBuildPanel
          agentName="type.agent"
          componentTag="HEADING"
          accent="rose"
          buildDurationMs={640}
          testId="panel-work-header"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-8">
            <div className="space-y-3">
              <p className="font-mono-code text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E11D48]">
                01 / SELECTED WORK
              </p>
              <h2
                id="work-heading"
                className="font-display text-[clamp(2.8rem,6vw,4.75rem)] leading-[0.94] uppercase text-[#F1EFEB] [text-wrap:balance]"
              >
                WORK THAT <span className="text-[#E11D48]">SPEAKS.</span>
              </h2>
            </div>

            <div className="space-y-3 md:text-right">
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="inline-flex flex-wrap items-center gap-1 border border-white/10 bg-[#111115] p-1"
              >
                {FILTER_TABS.map((tab) => {
                  const selected = activeCategory === tab.value;
                  return (
                    <button
                      key={tab.value}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveCategory(tab.value)}
                      className={`px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selected
                          ? 'bg-[#E11D48] text-white'
                          : 'text-[#9A9AA5] hover:text-[#F1EFEB]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              <p role="status" className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[#9A9AA5]">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} verified
              </p>
            </div>
          </div>
        </AgentBuildPanel>

        {/* Project Grid — balanced 2x2 showcase for the 4 live projects + compact full-width row for companion repo */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredProjects.map((project, idx) => {
            const isTrailingRepoCard =
              project.previewType === 'repo-card' &&
              filteredProjects.length % 2 === 1 &&
              idx === filteredProjects.length - 1;
            return (
              <AgentBuildPanel
                key={project.id}
                agentName={project.agentName}
                componentTag={project.featured ? 'FEATURED CARD' : 'PROJECT CARD'}
                accent={project.agentAccent}
                delayMs={(idx % 2) * 140}
                buildDurationMs={600}
                testId={`panel-project-${project.id}`}
                className={isTrailingRepoCard ? 'lg:col-span-2' : ''}
              >
                <article
                  className={`group flex h-full flex-col border border-white/[0.09] bg-[#101014] transition-colors duration-200 hover:border-white/20 ${
                    isTrailingRepoCard ? 'lg:grid lg:grid-cols-12' : ''
                  }`}
                >
                  {/* Preview Surface */}
                  <div
                    className={`relative border-b border-white/[0.08] ${
                      isTrailingRepoCard ? 'lg:col-span-5 lg:border-b-0 lg:border-r' : ''
                    }`}
                  >
                    <ProjectPreviewMedia project={project} />
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                      <span className="bg-[#09090B]/90 border border-white/15 px-2.5 py-1 font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#F1EFEB]">
                        {project.categoryLabel}
                      </span>
                      {project.featuredLabel && (
                        <span className="inline-flex items-center gap-1.5 bg-[#C81034] px-2.5 py-1 font-mono-code text-[10px] font-semibold tracking-[0.12em] uppercase text-white">
                          <Trophy className="h-3 w-3" aria-hidden="true" />
                          <span>{project.featuredLabel}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div
                    className={`flex flex-1 flex-col justify-between p-6 space-y-5 ${
                      isTrailingRepoCard ? 'lg:col-span-7' : ''
                    }`}
                  >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] pb-4">
                      <div className="flex items-baseline gap-3.5">
                        <span className="font-display text-3xl leading-none text-[#E11D48] tabular-nums">
                          {project.index}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-[#F1EFEB]">
                            {project.title}
                          </h3>
                          <p className="mt-0.5 font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#9A9AA5]">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        aria-label={`Quick view ${project.title}`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-white/12 text-[#F1EFEB] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors cursor-pointer"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="text-sm leading-relaxed text-[#C9C9D1]">
                      {project.description}
                    </p>

                    {/* Clean unboxed technology list with typographic separators */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono-code text-[11px] text-[#9A9AA5]">
                      {project.technologies.map((tech, tIdx) => (
                        <span key={tech} className="inline-flex items-center gap-2">
                          <span>{tech}</span>
                          {tIdx < project.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-[#E11D48]">·</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {project.disclaimer && (
                      <p className="flex items-start gap-2 border border-white/[0.08] bg-[#0B0B0F] px-3 py-2 text-[11px] leading-relaxed text-[#9A9AA5]">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E11D48]" aria-hidden="true" />
                        <span>{project.disclaimer}</span>
                      </p>
                    )}
                  </div>

                  {/* Verified Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#C81034] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#E11D48] transition-colors whitespace-nowrap shrink-0"
                        >
                          <span>{project.liveLabel ?? 'Live Site'}</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-2 text-xs font-medium text-[#F1EFEB] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{project.repoName}</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-mono-code uppercase tracking-[0.12em] text-[#9A9AA5] hover:text-[#F1EFEB] transition-colors cursor-pointer py-1"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </article>
            </AgentBuildPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
