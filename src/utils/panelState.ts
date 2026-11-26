export type PanelPhase = 'hidden' | 'building' | 'revealed';

export interface PanelTransitionInput {
  currentPhase: PanelPhase;
  isIntersecting: boolean;
  rectTop: number;
  viewportHeight: number;
  motionEnabled: boolean;
}

/**
 * Pure deterministic state machine for viewport-gated, bidirectional cursor-and-panel
 * assembly animations:
 * - When motion is disabled (or prefers-reduced-motion), content is immediately revealed.
 * - Panels NEVER start building while offscreen (isIntersecting === false).
 * - Entering the viewport transitions `hidden` -> `building`.
 * - Scrolling back UP so the panel exits below the viewport resets it back to `hidden`,
 *   hiding inner content again so scrolling down replays the cursor & panel opening.
 * - If a panel leaves the viewport while still mid-build, it resets cleanly to `hidden`
 *   so offscreen timers never run unseen.
 */
export function computeNextPanelPhase({
  currentPhase,
  isIntersecting,
  rectTop,
  viewportHeight,
  motionEnabled,
}: PanelTransitionInput): PanelPhase {
  if (!motionEnabled) {
    return 'revealed';
  }

  if (isIntersecting) {
    if (currentPhase === 'hidden') {
      return 'building';
    }
    return currentPhase;
  }

  // Element is NOT visible in the viewport:
  // 1. User scrolled back UP -> element is now below the viewport fold -> hide again!
  if (rectTop >= viewportHeight * 0.85) {
    return 'hidden';
  }

  // 2. If element scrolled away before finishing its build animation, cancel back to hidden
  if (currentPhase === 'building') {
    return 'hidden';
  }

  // 3. Already revealed and scrolled above the top edge while moving downward -> stay revealed
  return currentPhase;
}

export function completePanelBuild(currentPhase: PanelPhase): PanelPhase {
  if (currentPhase === 'building') {
    return 'revealed';
  }
  return currentPhase;
}
