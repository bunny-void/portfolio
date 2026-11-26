import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS } from '../data/portfolioData';
import { computeNextPanelPhase, completePanelBuild } from './panelState';
import {
  buildMailtoHref,
  computeScrollProgress,
  filterProjects,
  validateContactForm,
} from './portfolioLogic';

test('panel state stays hidden while offscreen and only builds when entering viewport', () => {
  const stillHidden = computeNextPanelPhase({
    currentPhase: 'hidden',
    isIntersecting: false,
    rectTop: 1200,
    viewportHeight: 900,
    motionEnabled: true,
  });
  assert.equal(stillHidden, 'hidden');

  const startsBuilding = computeNextPanelPhase({
    currentPhase: 'hidden',
    isIntersecting: true,
    rectTop: 420,
    viewportHeight: 900,
    motionEnabled: true,
  });
  assert.equal(startsBuilding, 'building');

  const revealed = completePanelBuild(startsBuilding);
  assert.equal(revealed, 'revealed');
});

test('panel state hides inner content again when user scrolls back up past panel', () => {
  const resetToHidden = computeNextPanelPhase({
    currentPhase: 'revealed',
    isIntersecting: false,
    rectTop: 950,
    viewportHeight: 900,
    motionEnabled: true,
  });
  assert.equal(resetToHidden, 'hidden');

  // When scrolling down past a revealed panel (above top edge), it stays revealed
  const staysRevealedAbove = computeNextPanelPhase({
    currentPhase: 'revealed',
    isIntersecting: false,
    rectTop: -400,
    viewportHeight: 900,
    motionEnabled: true,
  });
  assert.equal(staysRevealedAbove, 'revealed');

  // If user scrolled away mid-build, it resets cleanly instead of animating offscreen
  const cancelledMidBuild = computeNextPanelPhase({
    currentPhase: 'building',
    isIntersecting: false,
    rectTop: -300,
    viewportHeight: 900,
    motionEnabled: true,
  });
  assert.equal(cancelledMidBuild, 'hidden');
});

test('motion disabled immediately reveals panel regardless of scroll position', () => {
  const phase = computeNextPanelPhase({
    currentPhase: 'hidden',
    isIntersecting: false,
    rectTop: 2000,
    viewportHeight: 900,
    motionEnabled: false,
  });
  assert.equal(phase, 'revealed');
});

test('project filtering returns accurate subsets and repository matches', () => {
  assert.equal(filterProjects(PROJECTS, 'all').length, 5);
  assert.equal(filterProjects(PROJECTS, 'ai-ml').length, 2);
  assert.equal(filterProjects(PROJECTS, 'web-apps').length, 2);
  assert.equal(filterProjects(PROJECTS, 'concept').length, 1);
  assert.equal(
    filterProjects(PROJECTS, 'concept')[0].repoUrl,
    'https://github.com/bunny-void/mysore-sandal-soap',
  );
  assert.equal(
    PROJECTS.find((p) => p.id === 'sanjeevani-ai')?.liveUrl,
    'https://polite-cascaron-8f0456.netlify.app/',
  );
  assert.equal(
    PROJECTS.find((p) => p.id === 'sanjeevani-pharmacy')?.liveUrl,
    undefined,
  );
});

test('contact form validation rejects empty/invalid inputs and accepts valid submissions', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: 'invalid-email',
    subject: 'Hi',
    message: 'Too short',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.subject);
  assert.ok(emptyResult.errors.message);

  const validResult = validateContactForm({
    name: 'Ananya',
    email: 'ananya@example.com',
    subject: 'Project collaboration',
    message: 'Hello Vignesh, I would love to collaborate on an AI web project.',
  });
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildMailtoHref encodes recipient, subject, and body properly', () => {
  const href = buildMailtoHref(
    {
      name: 'Rohan',
      email: 'rohan@example.com',
      subject: 'Internship Inquiry',
      message: 'Great portfolio and Markathon project!',
    },
    'gsrivignesh8@gmail.com',
  );
  assert.ok(href.startsWith('mailto:gsrivignesh8@gmail.com?subject='));
  assert.ok(href.includes('Internship%20Inquiry'));
  assert.ok(href.includes('Rohan'));
});

test('computeScrollProgress clamps cleanly between 0 and 1', () => {
  assert.equal(computeScrollProgress(0, 4000, 900), 0);
  assert.equal(computeScrollProgress(1550, 4000, 900), 0.5);
  assert.equal(computeScrollProgress(5000, 4000, 900), 1);
  assert.equal(computeScrollProgress(0, 800, 900), 0);
});
