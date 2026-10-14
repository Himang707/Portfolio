"use client";

import React, { useEffect, useState } from "react";

export default function GoogleFlowTopProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[120] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full transition-all duration-800"
        style={{
          width: `${scrollProgress}%`,
          background:
            "linear-gradient(90deg, #FAF7F2 0%, #94DEC0 50%, #62BA92 100%)",
          boxShadow: "0 0 12px rgba(148, 222, 192, 0.35), 0 0 2px rgba(127, 231, 184, 0.6)",
          transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)",
        }}
      />
    </div>
  );
}
