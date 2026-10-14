"use client";

import React, { useState, useEffect } from "react";
import { Github, Mail, Menu, X, ArrowUpRight } from "lucide-react";
import HPLogo from "@/components/HPLogo";

const NAV_LINKS = [
  { id: "hero", label: "Overview" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "hackathons", label: "Hackathons" },
  { id: "contact", label: "Contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = NAV_LINKS.map((l) => l.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        id="top"
        role="banner"
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-800 ${
          scrolled
            ? "py-3 bg-[#080d0b]/85 backdrop-blur-2xl border-b border-[rgba(148,222,192,0.10)] shadow-[0_12px_32px_rgba(0,0,0,0.55),0_0_20px_rgba(110,182,148,0.06)]"
            : "py-5 bg-transparent"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-xl transition-transform duration-800 hover:-translate-y-0.5"
            style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
            aria-label="Himang Panchal - Back to top"
          >
            <HPLogo size={38} variant="natural" />
            <div className="flex flex-col text-left leading-none">
              <span className="text-[14px] font-bold text-white tracking-tight group-hover:text-[#94DEC0] transition-colors duration-800">
                Himang Panchal
              </span>
              <span className="text-[11px] text-white/50 font-normal mt-0.5 tracking-tight">
                Frontend &amp; AI/ML Developer
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center p-1 rounded-full bg-[#0c1411]/70 border border-[rgba(148,222,192,0.12)] backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-800 ${
                    isActive
                      ? "text-white bg-[rgba(148,222,192,0.14)] shadow-[0_0_12px_rgba(148,222,192,0.2)] font-semibold border border-[rgba(148,222,192,0.22)]"
                      : "text-white/65 hover:text-[#94DEC0] hover:bg-white/[0.04]"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Friendly Status Badge with microgravity drift */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#94DEC0]/[0.08] border border-[#94DEC0]/[0.22] text-[11px] font-medium text-[#94DEC0] drift-microgravity-1 shadow-[0_0_12px_rgba(148,222,192,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94DEC0] pulse-dot" />
              <span>Available for roles</span>
            </div>

            {/* GitHub Profile */}
            <a
              href="https://github.com/himang707"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-white/70 hover:text-white hover:border-[rgba(148,222,192,0.3)] hover:shadow-[0_0_12px_rgba(148,222,192,0.15)] transition-all duration-800 antigravity-pill focus:outline-none"
              style={{ transitionTimingFunction: "cubic-bezier(0.215, 0.61, 0.355, 1)" }}
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Warm Natural CTA */}
            <button
              onClick={() => scrollTo("contact")}
              className="hidden sm:flex items-center gap-1.5 px-4.5 py-2 rounded-full text-[13px] font-semibold text-[#080d0a] bg-[#FAF7F2] hover:bg-white antigravity-button shadow-[0_4px_16px_rgba(0,0,0,0.3)] focus:outline-none"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/80 hover:text-white transition-all focus:outline-none"
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-[95] transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/75 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />
        <div className="absolute top-[75px] left-4 right-4 p-5 rounded-[28px] bg-[#0c1310] border border-white/[0.1] shadow-2xl flex flex-col gap-1.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`flex items-center justify-between p-3 rounded-2xl text-[14px] font-medium transition-all ${
                activeSection === link.id
                  ? "bg-white/[0.08] text-white font-semibold"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-4 h-4 opacity-40" />
            </button>
          ))}

          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-[12px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </span>
            <button
              onClick={() => scrollTo("contact")}
              className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#0E110F] bg-[#FAF7F2]"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
