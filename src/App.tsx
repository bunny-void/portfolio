import { useEffect, useState } from 'react';
import { MotionProvider } from './context/MotionContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { AchievementSection } from './components/AchievementSection';
import { AboutSkillsSection } from './components/AboutSkillsSection';
import { JourneySection } from './components/JourneySection';
import { ContactFooter } from './components/ContactFooter';
import { AmbientCursors } from './components/AmbientCursors';
import { CertificateModal, ProjectDetailModal } from './components/PortfolioModals';
import type { ProjectItem } from './data/portfolioData';

const TRACKED_SECTIONS = ['home', 'work', 'about', 'skills', 'journey', 'contact'] as const;

function PortfolioShell() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [certificateOpen, setCertificateOpen] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.34;
      let current = 'home';

      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollMarker >= top) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F1EFEB] relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#E11D48] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <AmbientCursors />
      <Navbar activeSection={activeSection} />

      <main id="main-content" className="relative z-10">
        <HeroSection onOpenCertificate={() => setCertificateOpen(true)} />
        <WorkSection onSelectProject={setSelectedProject} />
        <AchievementSection onOpenCertificate={() => setCertificateOpen(true)} />
        <AboutSkillsSection />
        <JourneySection />
        <ContactFooter />
      </main>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CertificateModal
        open={certificateOpen}
        onClose={() => setCertificateOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <PortfolioShell />
    </MotionProvider>
  );
}
