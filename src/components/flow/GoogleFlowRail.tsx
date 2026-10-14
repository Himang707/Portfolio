"use client";

import React, { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "hackathons", label: "Hackathons" },
  { id: "contact", label: "Contact" },
];

export default function GoogleFlowRail() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] hidden 2xl:flex flex-col items-end gap-3 pointer-events-auto select-none"
      aria-label="Section navigation"
    >
      <div className="py-3.5 px-2 rounded-full bg-[#0c1411]/80 border border-[rgba(148,222,192,0.14)] backdrop-blur-2xl shadow-[0_0_20px_rgba(110,182,148,0.08)] flex flex-col items-center gap-3 drift-microgravity-slow">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hovered === sec.id;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-center group"
              onMouseEnter={() => setHovered(sec.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <button
                onClick={() => scrollTo(sec.id)}
                aria-label={`Jump to ${sec.label}`}
                className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-800 hover:scale-115 focus:outline-none"
                style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              >
                <span
                  className={`block rounded-full transition-all duration-800 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-[#94DEC0] shadow-[0_0_10px_rgba(148,222,192,0.7)]"
                      : "w-1.5 h-1.5 bg-white/25 group-hover:bg-[#94DEC0]/70 group-hover:shadow-[0_0_6px_rgba(148,222,192,0.4)]"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                />
              </button>

              {isHovered && (
                <div
                  className="absolute right-7 pointer-events-none px-3 py-1 rounded-xl bg-[#0c1411]/95 border border-[rgba(148,222,192,0.16)] text-[11px] font-mono-code font-medium text-[#FAF7F2] shadow-[0_8px_20px_rgba(0,0,0,0.5),0_0_12px_rgba(110,182,148,0.12)] whitespace-nowrap transform -translate-y-0.5"
                  style={{ transition: "all 0.85s cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                >
                  {sec.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
