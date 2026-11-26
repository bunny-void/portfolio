import type { ProjectCategory, ProjectItem } from '../data/portfolioData';

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory,
): ProjectItem[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(values: ContactFormValues): {
  isValid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedSubject = values.subject.trim();
  const trimmedMessage = values.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedSubject.length < 3) {
    errors.subject = 'Please enter a short subject (at least 3 characters).';
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'Please enter a message (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoHref(
  values: ContactFormValues,
  recipientEmail: string,
): string {
  const subject = encodeURIComponent(values.subject.trim() || 'Portfolio Inquiry');
  const bodyLines = [
    `Hi G Sri Vignesh,`,
    '',
    values.message.trim(),
    '',
    `— ${values.name.trim()} (${values.email.trim()})`,
  ];
  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

export function computeScrollProgress(
  scrollY: number,
  scrollHeight: number,
  innerHeight: number,
): number {
  const maxScroll = scrollHeight - innerHeight;
  if (maxScroll <= 0) return 0;
  const ratio = scrollY / maxScroll;
  return Math.max(0, Math.min(1, ratio));
}
