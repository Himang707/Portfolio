"use client";

import { useEffect, useRef } from "react";

/**
 * Section IDs mapped to human-readable labels for URL hashing and sharing.
 */
const SECTION_MAP: Record<string, string> = {
  prime: "Hero",
  fracture: "About",
  loupe: "Loupe",
  index: "Index",
  dispersion: "Dispersion",
  assembly: "Projects",
  specimens: "Skills",
  workbench: "Workbench",
  caustics: "Mindset",
  "field-notes": "Field Notes",
  anneal: "Contact",
};

/**
 * Deep linking hook that:
 * 1. Updates URL hash as user scrolls through sections
 * 2. Scrolls to the correct section on page load if hash is present
 * 3. Debounced to avoid excessive URL updates
 */
export function useDeepLinking() {
  const activeRef = useRef<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // On mount, scroll to hash section if present
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      // Allow time for sections to render
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 1200); // After boot sequence
    }

    // Create intersection observers for each section
    const observers: IntersectionObserver[] = [];
    const sectionIds = Object.keys(SECTION_MAP);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              if (activeRef.current !== id) {
                activeRef.current = id;

                // Debounce URL updates
                if (debounceRef.current) clearTimeout(debounceRef.current);
                debounceRef.current = setTimeout(() => {
                  // Update URL without triggering scroll
                  const newUrl = `${window.location.pathname}#${id}`;
                  window.history.replaceState(null, "", newUrl);
                }, 300);
              }
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return { sectionMap: SECTION_MAP };
}
