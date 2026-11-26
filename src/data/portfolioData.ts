export type ProjectCategory = 'all' | 'ai-ml' | 'web-apps' | 'concept';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  featured?: boolean;
  featuredLabel?: string;
  description: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  liveLabel?: string;
  repoUrl: string;
  repoName: string;
  previewImage?: string;
  previewType: 'screenshot' | 'pose-diagram' | 'repo-card';
  disclaimer?: string;
  agentName: string;
  agentAccent: 'violet' | 'cyan' | 'amber' | 'emerald' | 'rose';
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  items: { name: string; note?: string }[];
  agentName: string;
  agentAccent: 'cyan' | 'amber' | 'violet';
}

export interface JourneyMilestone {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROFILE = {
  fullName: 'G SRI VIGNESH',
  brandMark: 'VIGNESH',
  identityLine: 'Tech Enthusiast · Aspiring AI/ML Engineer · Future Software Developer',
  heroKicker: "Hello, I'm",
  heroHeadline: 'G SRI VIGNESH.',
  heroRoleLine1: 'TECH ENTHUSIAST.',
  heroRoleLine2: 'FUTURE AI/ML ENGINEER.',
  tagline: 'Curious about technology. Passionate about innovation. Always building something new.',
  location: 'Kakinada, Andhra Pradesh, India',
  shortLocation: 'KAKINADA, AP · INDIA',
  portraitPath: '/assets/aistudio/meeee_2cd0c197.jpeg',
  education: {
    degree: 'B.Tech, CSE – AI & ML',
    specialization: 'Microsoft Specialization',
    university: 'Aditya University',
    campus: 'Surampalem, Andhra Pradesh, India',
    duration: '2026 – 2030',
    status: 'First-Year Student',
  },
  aboutParagraphs: [
    'I am G Sri Vignesh, a first-year B.Tech student in Computer Science & Engineering specializing in Artificial Intelligence & Machine Learning (Microsoft specialization) at Aditya University, Surampalem.',
    'I am passionate about programming, AI, machine learning, and software development. Starting from core foundations in C while actively learning Python and Java, I enjoy turning ideas into practical web interfaces, health-tech prototypes, and computer-vision experiments.',
  ],
  contact: {
    email: 'gsrivignesh8@gmail.com',
    githubUrl: 'https://github.com/bunny-void',
    githubHandle: '@bunny-void',
    linkedinUrl: 'https://www.linkedin.com/in/sri-vignesh-gunisetti-5675ab433',
    linkedinLabel: 'Sri Vignesh Gunisetti',
  },
  footerTagline: 'G SRI VIGNESH® — LEARNING. BUILDING. EVOLVING.',
} as const;

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const;

export const PROJECTS: ProjectItem[] = [
  {
    id: 'mysore-sandal-soap',
    index: '01',
    title: 'Mysore Sandal Soap',
    subtitle: 'CONCEPT WEBSITE · MARKATHON WINNER',
    category: 'concept',
    categoryLabel: 'Concept',
    featured: true,
    featuredLabel: 'MARKATHON 1ST PLACE',
    description:
      'An independent student concept website created using an AI website builder for the MARKATHON competition at Aditya University. It presents the product range and introduces the brand heritage in an interactive storefront layout.',
    features: [
      'Product catalog spanning Mysore Sandal Soaps, Agarbathi, Talc Powder, Handwash, Baby Shampoo, and Gift Sets',
      '1916 heritage story section highlighting distilled sandalwood oil craftsmanship',
      'Interactive shopping cart drawer, wishlist, promotional bundle showcase, account modal, and FAQ',
      'Responsive storefront navigation and category browsing across desktop and mobile',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'AI Website Builder'],
    liveUrl: 'https://bunny-void.github.io/mysore-sandal-soap/',
    liveLabel: 'Live Website',
    repoUrl: 'https://github.com/bunny-void/mysore-sandal-soap',
    repoName: 'mysore-sandal-soap',
    previewImage: '/assets/projects/mysore-sandal-soap.png',
    previewType: 'screenshot',
    disclaimer:
      'Independent student concept project built for the college MARKATHON competition. Not officially affiliated with Karnataka Soaps & Detergents Limited (KSDL).',
    agentName: 'visual.agent',
    agentAccent: 'amber',
  },
  {
    id: 'sanjeevani-ai',
    index: '02',
    title: 'Sanjeevani AI',
    subtitle: 'PERSONAL HEALTH GUARDIAN & AI COPILOT',
    category: 'ai-ml',
    categoryLabel: 'AI & ML',
    description:
      'An AI-powered personal health copilot prototype that organizes fragmented prescriptions, lab reports, and discharge summaries into structured records, plain-language explanations, and a unified health timeline.',
    features: [
      'Multimodal document understanding with Google Gemini for prescriptions, lab reports, and discharge summaries',
      'Plain-language summaries and abnormal lab-value explanations alongside a conversational Medical AI Copilot',
      'Bilingual interface supporting English and Telugu (తెలుగు) across summaries and assistant responses',
      'ABDM / FHIR-style prototype mapping architecture with daily wellness check-ins and medication schedule views',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Google Gemini API', 'Netlify'],
    liveUrl: 'https://polite-cascaron-8f0456.netlify.app/',
    liveLabel: 'Live App',
    repoUrl: 'https://github.com/bunny-void/sanjeevani-ai',
    repoName: 'sanjeevani-ai',
    previewImage: '/assets/projects/sanjeevani-ai.png',
    previewType: 'screenshot',
    disclaimer:
      'Prototype for demonstration purposes. Not a medical diagnosis tool, emergency response service, or production ABDM integration.',
    agentName: 'system.agent',
    agentAccent: 'cyan',
  },
  {
    id: 'medicare-pharmacy',
    index: '03',
    title: 'MediCare Pharmacy',
    subtitle: 'NEIGHBOURHOOD PHARMACY STOREFRONT',
    category: 'web-apps',
    categoryLabel: 'Web App',
    description:
      'A neighbourhood pharmacy web storefront designed for browsing everyday medicines, OTC essentials, vitamins, baby care, Ayurveda, and health devices in a clean single-file web application.',
    features: [
      '15+ browsable medicine and wellness categories including Fever & Pain, Diabetes Care, Heart & BP, and First Aid',
      'Live product search bar and category filter navigation',
      'Interactive Upload Prescription modal, wishlist counter, and shopping cart drawer',
      'Lightweight standalone architecture built with pure HTML, CSS, and JavaScript',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://bunny-void.github.io/medicare-pharmacy/',
    liveLabel: 'Live Website',
    repoUrl: 'https://github.com/bunny-void/medicare-pharmacy',
    repoName: 'medicare-pharmacy',
    previewImage: '/assets/projects/medicare-pharmacy.png',
    previewType: 'screenshot',
    agentName: 'grid.agent',
    agentAccent: 'emerald',
  },
  {
    id: 'human-emergency-detector',
    index: '04',
    title: 'Human Emergency Detector',
    subtitle: 'COMPUTER VISION POSE & FALL PROTOTYPE',
    category: 'ai-ml',
    categoryLabel: 'AI & ML',
    description:
      'An experimental, educational Python and Streamlit application that analyzes webcam video in memory using MediaPipe Pose, draws a real-time body skeleton, and displays a "Possible Fall Detected" warning when a fall-like pattern is observed.',
    features: [
      'Real-time body skeleton tracking via MediaPipe Pose and OpenCV inside a Streamlit WebRTC app',
      'Includes a built-in Demo Mode for testing detection behavior without requiring a live webcam',
      'Privacy-first in-memory frame processing — no video is recorded, saved, or sent to external AI services',
      'GitHub Pages link hosts the complete project documentation and local Windows Python setup guide',
    ],
    technologies: ['Python', 'Streamlit', 'MediaPipe Pose', 'OpenCV', 'NumPy', 'WebRTC'],
    liveUrl: 'https://bunny-void.github.io/vignesh/',
    liveLabel: 'Docs & Setup Guide',
    repoUrl: 'https://github.com/bunny-void/vignesh',
    repoName: 'vignesh',
    previewType: 'pose-diagram',
    disclaimer:
      'Experimental fall-detection prototype for educational use only. Cannot diagnose medical shock or guarantee emergency detection; runs locally via Streamlit.',
    agentName: 'vision.agent',
    agentAccent: 'violet',
  },
  {
    id: 'sanjeevani-pharmacy',
    index: '05',
    title: 'Sanjeevani Pharmacy',
    subtitle: 'REACT & TYPESCRIPT PHARMACY REPOSITORY',
    category: 'web-apps',
    categoryLabel: 'Web App',
    description:
      'A modular React and TypeScript pharmacy web application repository built with Vite, Tailwind CSS, Zustand state management, React Router, and React Hook Form.',
    features: [
      'Component-based React 19 + TypeScript frontend architecture bundled with Vite',
      'Client-side routing with React Router and lightweight global store management via Zustand',
      'Form handling powered by React Hook Form with Tailwind CSS utility styling',
      'Available on GitHub as an open source repository (no separate live deployment listed)',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Zustand', 'React Router'],
    repoUrl: 'https://github.com/bunny-void/sanjeevani-pharmacy',
    repoName: 'sanjeevani-pharmacy',
    previewType: 'repo-card',
    agentName: 'code.agent',
    agentAccent: 'rose',
  },
];

export const ACHIEVEMENT = {
  eyebrow: 'FEATURED ACHIEVEMENT',
  headlineTop: 'MARKATHON WINNER',
  headlineBottom: 'MYSORE SANDAL SOAP WEBSITE.',
  certificateTitle: 'VEDA-2K26 Certificate of Merit',
  position: '1st Position — Markathon',
  event: 'VEDA-2K26 Student Symposium',
  dates: '11th & 12th September 2026',
  organizer: 'Aditya University, Surampalem',
  certificatePdfPath: '/assets/aistudio/winner_certificate_9ae3549a.pdf',
  certificateImagePath: '/assets/aistudio/winner_certificate_preview.png',
  summary:
    'Secured 1st Position in the Markathon competition at VEDA-2K26 organized by Aditya University with an independent student concept website for Mysore Sandal Soap built using an AI website builder.',
  disclaimer:
    'Independent student concept created strictly for the college Markathon competition with no official affiliation to the company.',
  highlights: [
    {
      index: '01',
      title: '1st Position — Markathon',
      detail: 'Awarded Certificate of Merit at the VEDA-2K26 Student Symposium, Aditya University.',
    },
    {
      index: '02',
      title: 'Independent Student Concept',
      detail: 'Built with an AI website builder to showcase product storytelling and brand heritage.',
    },
    {
      index: '03',
      title: 'Verified Live Prototype',
      detail: 'Published openly on GitHub Pages with source code available under bunny-void/mysore-sandal-soap.',
    },
  ],
} as const;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    subtitle: 'Foundational & active learning track',
    items: [
      { name: 'C', note: 'Core Foundation' },
      { name: 'Python', note: 'Learning' },
      { name: 'Java', note: 'Learning' },
    ],
    agentName: 'type.agent',
    agentAccent: 'cyan',
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    subtitle: 'Daily workflow & version control',
    items: [
      { name: 'VS Code', note: 'Primary Editor' },
      { name: 'Git', note: 'Version Control' },
      { name: 'GitHub', note: 'Code Hosting & Pages' },
    ],
    agentName: 'tool.agent',
    agentAccent: 'amber',
  },
  {
    id: 'interests',
    title: 'Focus Areas & Interests',
    subtitle: 'Where I invest my curiosity',
    items: [
      { name: 'Artificial Intelligence (AI)' },
      { name: 'Machine Learning (ML)' },
      { name: 'Web Development' },
      { name: 'Software Development' },
    ],
    agentName: 'focus.agent',
    agentAccent: 'violet',
  },
];

export const TOOLS_MARQUEE = [
  'C PROGRAMMING',
  'PYTHON (LEARNING)',
  'JAVA (LEARNING)',
  'VS CODE',
  'GIT',
  'GITHUB',
  'ARTIFICIAL INTELLIGENCE',
  'MACHINE LEARNING',
  'WEB DEVELOPMENT',
  'SOFTWARE DEVELOPMENT',
] as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'CURIOSITY',
    description: 'Explore emerging tools, AI workflows, and real everyday problems worth solving.',
  },
  {
    number: '02',
    title: 'FUNDAMENTALS',
    description: 'Build strong computer science roots through C, Python, Java, and core CSE – AI & ML coursework.',
  },
  {
    number: '03',
    title: 'BUILDING',
    description: 'Turn ideas into tangible web prototypes, healthcare copilots, and computer-vision experiments.',
  },
  {
    number: '04',
    title: 'EVOLVING',
    description: 'Ship openly on GitHub, learn from competitions like Markathon, and refine every iteration.',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'btech-aditya',
    period: '2026 – 2030',
    role: 'B.Tech, CSE – AI & ML (Microsoft Specialization)',
    organization: 'Aditya University',
    location: 'Surampalem, Andhra Pradesh, India',
    summary:
      'First-year undergraduate building computer science fundamentals with a focused track in Artificial Intelligence and Machine Learning.',
    highlights: [
      'Building programming foundations in C while actively learning Python and Java.',
      'Exploring AI/ML concepts, web technologies, and software engineering practices from year one.',
    ],
  },
  {
    id: 'markathon-winner',
    period: 'Sep 2026',
    role: '1st Position — Markathon (VEDA-2K26)',
    organization: 'Aditya University Student Symposium',
    location: 'Surampalem, Andhra Pradesh, India',
    summary:
      'Won 1st Position in the Markathon competition during VEDA-2K26 (11th & 12th September 2026) with the Mysore Sandal Soap concept website.',
    highlights: [
      'Designed and built an independent concept showcase using an AI website builder.',
      'Awarded the official VEDA-2K26 Certificate of Merit by Aditya University.',
    ],
  },
  {
    id: 'early-projects',
    period: '2026 – Present',
    role: 'Independent Builder & Student Developer',
    organization: 'GitHub (@bunny-void)',
    location: 'Kakinada, Andhra Pradesh, India',
    summary:
      'Experimenting hands-on across web storefronts, AI health record prototypes, and Python computer-vision demos.',
    highlights: [
      'Published Sanjeevani AI (health copilot prototype), MediCare Pharmacy, Mysore Sandal Soap concept, and Human Emergency Detector.',
      'Practicing Git/GitHub version control, static deployments, and iterative UI engineering.',
    ],
  },
];
