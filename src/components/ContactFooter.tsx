import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  buildMailtoHref,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/portfolioLogic';
import { AgentBuildPanel } from './AgentBuildPanel';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactFooter() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [draftReady, setDraftReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setDraftReady(false);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setDraftReady(false);
      return;
    }
    setErrors({});
    setDraftReady(true);
  };

  const handleCopyDraft = async () => {
    const text = `To: ${PROFILE.contact.email}\nFrom: ${values.name.trim()} <${values.email.trim()}>\nSubject: ${values.subject.trim()}\n\n${values.message.trim()}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = buildMailtoHref(values, PROFILE.contact.email);

  return (
    <>
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-b border-white/[0.08] bg-[#09090B] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Headline + Direct Verified Channels (NO Instagram) */}
            <AgentBuildPanel
              agentName="connect.agent"
              componentTag="CONTACT CHANNELS"
              accent="rose"
              buildDurationMs={740}
              testId="panel-contact-channels"
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="font-mono-code text-[11px] font-semibold tracking-[0.18em] uppercase text-[#E11D48]">
                    04 / WHAT&apos;S NEXT
                  </p>
                  <h2
                    id="contact-heading"
                    className="font-display text-[clamp(2.9rem,6vw,5rem)] leading-[0.92] uppercase text-[#F1EFEB]"
                  >
                    LET&apos;S BUILD
                    <br />
                    <span className="text-[#E11D48]">SOMETHING</span>
                    <br />
                    <span className="text-[#E11D48]">REAL.</span>
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed text-[#C9C9D1]">
                    Open to collaborating on student projects, learning opportunities, hackathons, and conversations around AI/ML and software development.
                  </p>
                </div>

                {/* Direct Contact Links matching reference */}
                <div className="divide-y divide-white/[0.09] border-t border-b border-white/[0.09]">
                  <a
                    href={`mailto:${PROFILE.contact.email}`}
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <Mail className="h-4 w-4 text-[#E11D48] shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#9A9AA5]">
                          EMAIL
                        </p>
                        <p className="truncate text-sm font-medium text-[#F1EFEB] group-hover:text-[#E11D48] transition-colors">
                          {PROFILE.contact.email}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#9A9AA5] group-hover:text-[#E11D48] shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href={PROFILE.contact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <Github className="h-4 w-4 text-[#E11D48] shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#9A9AA5]">
                          GITHUB
                        </p>
                        <p className="truncate text-sm font-medium text-[#F1EFEB] group-hover:text-[#E11D48] transition-colors">
                          {PROFILE.contact.githubHandle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#9A9AA5] group-hover:text-[#E11D48] shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href={PROFILE.contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <Linkedin className="h-4 w-4 text-[#E11D48] shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#9A9AA5]">
                          LINKEDIN
                        </p>
                        <p className="truncate text-sm font-medium text-[#F1EFEB] group-hover:text-[#E11D48] transition-colors">
                          {PROFILE.contact.linkedinLabel}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[#9A9AA5] group-hover:text-[#E11D48] shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </AgentBuildPanel>

            {/* Middle Column: Validated Client-Side Contact Form (Honest about no backend) */}
            <AgentBuildPanel
              agentName="form.agent"
              componentTag="CONTACT FORM"
              accent="cyan"
              delayMs={100}
              buildDurationMs={780}
              testId="panel-contact-form"
              className="lg:col-span-4"
            >
              <div className="border border-white/[0.09] bg-[#101014] p-6 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#F1EFEB]">
                    Send a Message Draft
                  </h3>
                  <p className="text-xs leading-relaxed text-[#9A9AA5]">
                    This portfolio has no backend mail server. Submitting validates your message and prepares an email draft you can send directly or copy.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#C9C9D1]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="w-full border border-white/12 bg-[#09090B] px-3.5 py-2.5 text-sm text-[#F1EFEB] placeholder:text-[#666672] focus:border-[#E11D48] focus:outline-none"
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="text-xs text-[#FB7185]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#C9C9D1]"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="w-full border border-white/12 bg-[#09090B] px-3.5 py-2.5 text-sm text-[#F1EFEB] placeholder:text-[#666672] focus:border-[#E11D48] focus:outline-none"
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="text-xs text-[#FB7185]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="block font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#C9C9D1]"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={values.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      placeholder="Project idea or collaboration"
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className="w-full border border-white/12 bg-[#09090B] px-3.5 py-2.5 text-sm text-[#F1EFEB] placeholder:text-[#666672] focus:border-[#E11D48] focus:outline-none"
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" role="alert" className="text-xs text-[#FB7185]">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block font-mono-code text-[10px] tracking-[0.14em] uppercase text-[#C9C9D1]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Write your message..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className="w-full resize-y border border-white/12 bg-[#09090B] px-3.5 py-2.5 text-sm text-[#F1EFEB] placeholder:text-[#666672] focus:border-[#E11D48] focus:outline-none"
                    />
                    {errors.message && (
                      <p id="contact-message-error" role="alert" className="text-xs text-[#FB7185]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#C81034] px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase text-white hover:bg-[#E11D48] transition-colors cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Validate &amp; Prepare Email Draft</span>
                  </button>
                </form>

                {draftReady && (
                  <div
                    role="status"
                    className="border border-emerald-500/35 bg-emerald-950/25 p-4 space-y-3"
                  >
                    <p className="text-xs font-semibold text-emerald-300">
                      Draft validated (client-side only — not sent automatically).
                    </p>
                    <p className="text-xs text-[#C9C9D1]">
                      Choose an option below to send your message to {PROFILE.contact.email}:
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-1.5 bg-[#F1EFEB] px-3 py-2 text-xs font-semibold text-[#09090B] hover:bg-white transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Open in Email App</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyDraft}
                        className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-2 text-xs font-medium text-[#F1EFEB] hover:border-white transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Copy Draft</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </AgentBuildPanel>

            {/* Right Column: Crimson Editorial Accent Card matching reference "MAKE IT WORK." */}
            <AgentBuildPanel
              agentName="cta.agent"
              componentTag="FEATURED CTA"
              accent="amber"
              delayMs={180}
              buildDurationMs={780}
              testId="panel-contact-crimson-card"
              className="lg:col-span-3"
            >
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="group crimson-panel flex min-h-[300px] flex-col justify-between p-7 text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                <p className="font-mono-code text-[10px] font-semibold tracking-[0.16em] uppercase text-white/90">
                  {PROFILE.brandMark}® / CONNECT
                </p>

                <div className="my-6">
                  <p className="font-display text-5xl sm:text-6xl leading-[0.88] uppercase text-white">
                    MAKE IT
                  </p>
                  <p className="font-display text-5xl sm:text-6xl leading-[0.88] uppercase text-[#1A0408]">
                    WORK.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[10px] tracking-[0.14em] uppercase text-white/85">
                    EMAIL DIRECTLY
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </AgentBuildPanel>
          </div>
        </div>
      </section>

      {/* Editorial Footer matching reference */}
      <footer className="bg-[#09090B] py-8">
        <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <a
            href="#home"
            aria-label="G Sri Vignesh, home"
            className="font-display text-2xl tracking-wide text-[#F1EFEB] inline-flex items-start leading-none"
          >
            {PROFILE.brandMark}
            <span className="ml-0.5 text-[10px] font-sans font-bold text-[#E11D48]">®</span>
          </a>

          <p className="text-center font-mono-code text-[11px] tracking-[0.14em] uppercase text-[#9A9AA5]">
            {PROFILE.footerTagline}
          </p>

          <div className="flex items-center gap-5 font-mono-code text-[11px] tracking-[0.14em] uppercase text-[#9A9AA5]">
            <a
              href={PROFILE.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F1EFEB] transition-colors inline-flex items-center gap-1"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <a
              href={PROFILE.contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F1EFEB] transition-colors inline-flex items-center gap-1"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <a
              href="#home"
              className="hover:text-[#E11D48] transition-colors inline-flex items-center gap-1 text-[#C9C9D1]"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
