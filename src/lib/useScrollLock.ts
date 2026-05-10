import { useEffect, useRef, useCallback } from "react";

/**
 * Desktop-only scroll lock.
 * Intercepts wheel events while the section occupies the viewport.
 * On mobile, swipe is handled directly on the panel — no global touch blocking.
 */
export function useScrollLock(
  sectionRef: React.RefObject<HTMLElement | null>,
  active: number,
  count: number,
  onNext: () => void,
  onPrev: () => void
) {
  const cooldownRef = useRef(false);

  const isSectionActive = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // 1. Centering: Is the middle of the section close to the middle of the screen?
    const sectionMid = rect.top + rect.height / 2;
    const viewportMid = vh / 2;
    const isCentered = Math.abs(sectionMid - viewportMid) < vh * 0.2; // Within 20% of viewport height

    // 2. Visibility: How much of the section is visible?
    const visibleHeight = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
    const visibleRatio = visibleHeight / Math.min(rect.height, vh);
    const isMostlyVisible = visibleRatio > 0.85; // At least 85% of the visible area is filled

    return isCentered && isMostlyVisible;
  }, [sectionRef]);

  useEffect(() => {
    // Skip scroll lock on touch devices — handled via swipe on the panel
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const COOLDOWN = 650;

    const onWheel = (e: WheelEvent) => {
      if (!isSectionActive()) return;
      const dir = e.deltaY > 0 ? "down" : "up";

      if (dir === "down" && active < count - 1) {
        e.preventDefault();
        if (cooldownRef.current) return;
        cooldownRef.current = true;
        setTimeout(() => { cooldownRef.current = false; }, COOLDOWN);
        onNext();
        return;
      }
      if (dir === "up" && active > 0) {
        e.preventDefault();
        if (cooldownRef.current) return;
        cooldownRef.current = true;
        setTimeout(() => { cooldownRef.current = false; }, COOLDOWN);
        onPrev();
        return;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, count, onNext, onPrev, isSectionActive]);
}

/**
 * Swipe handler for a panel element.
 * Returns props to spread onto the swipeable div.
 */
export function useSwipe(onNext: () => void, onPrev: () => void) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  return {
    onTouchStart: (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      // Only trigger if horizontal swipe dominates
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx > 0) onNext();
      else onPrev();
    },
  };
}
