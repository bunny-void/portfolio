import React, { useEffect } from 'react';
import { Award, CheckCircle2, ExternalLink, Github, Info, X } from 'lucide-react';
import { ACHIEVEMENT, type ProjectItem } from '../data/portfolioData';
import { isBase64PdfDataUri, openOrDownloadPdf } from '../utils/openEmbeddedPdf';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-white/15 bg-[#101014] p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <p className="font-mono-code text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E11D48]">
              {project.index} / {project.subtitle}
            </p>
            <h3
              id="project-modal-title"
              className="font-display text-3xl sm:text-4xl tracking-wide uppercase text-[#F1EFEB]"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-[#F1EFEB] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {project.previewImage && (
          <div className="overflow-hidden border border-white/10 bg-[#09090B]">
            <img
              src={project.previewImage}
              alt={`Full preview of ${project.title}`}
              referrerPolicy="no-referrer"
              className="w-full max-h-64 object-cover object-top"
            />
          </div>
        )}

        <p className="text-sm leading-relaxed text-[#C9C9D1]">
          {project.description}
        </p>

        <div className="space-y-3">
          <h4 className="font-mono-code text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E11D48]">
            VERIFIED FEATURES
          </h4>
          <ul className="space-y-2.5">
            {project.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-sm text-[#E4E4EA]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D48]" aria-hidden="true" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-mono-code text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E11D48]">
            TECHNOLOGIES
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="border border-white/12 bg-[#09090B] px-3 py-1 font-mono-code text-xs text-[#F1EFEB]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.disclaimer && (
          <div className="flex items-start gap-2.5 border border-white/10 bg-[#09090B] p-3.5 text-xs leading-relaxed text-[#9A9AA5]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#E11D48]" aria-hidden="true" />
            <span>{project.disclaimer}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C81034] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#E11D48] transition-colors"
            >
              <span>{project.liveLabel ?? 'Open Live Website'}</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F1EFEB] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span>GitHub: {project.repoName}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
}

export function CertificateModal({ open, onClose }: CertificateModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-white/15 bg-[#101014] p-5 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono-code text-[11px] font-semibold tracking-[0.16em] uppercase text-[#E11D48]">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>{ACHIEVEMENT.position} · {ACHIEVEMENT.event}</span>
            </div>
            <h3
              id="certificate-modal-title"
              className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-[#F1EFEB]"
            >
              {ACHIEVEMENT.certificateTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate viewer"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-[#F1EFEB] hover:border-[#E11D48] hover:text-[#E11D48] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-hidden border border-white/12 bg-white aspect-[596/422]">
          <img
            src={ACHIEVEMENT.certificateImagePath}
            alt="Full-resolution Aditya University VEDA-2K26 Certificate of Merit for G. Sri Vignesh — 1st Position in Markathon"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#9A9AA5]">
          <span>
            {ACHIEVEMENT.organizer} · {ACHIEVEMENT.dates}
          </span>
          <a
            href={ACHIEVEMENT.certificatePdfPath}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              if (isBase64PdfDataUri(ACHIEVEMENT.certificatePdfPath)) {
                e.preventDefault();
                openOrDownloadPdf(ACHIEVEMENT.certificatePdfPath);
              }
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#C81034] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#E11D48] transition-colors"
          >
            <span>Open Original PDF</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
