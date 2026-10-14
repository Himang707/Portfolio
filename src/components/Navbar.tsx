"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "SKILLS", href: "#skills" },
  { label: "HACKATHONS", href: "#hackathons" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section spy
      const sections = ["contact", "hackathons", "skills", "work", "about"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3.5">
      <div
        className={cn(
          "max-w-7xl mx-auto rounded-xl sm:rounded-2xl transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border",
          isScrolled
            ? "bg-[#080705]/95 backdrop-blur-2xl border-[#D4AF37]/45 shadow-[0_10px_35px_rgba(0,0,0,0.85)]"
            : "bg-[#080705]/85 backdrop-blur-xl border-[#D4AF37]/35 shadow-md"
        )}
      >
        {/* Left: Brand / Monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center space-x-2.5 focus:outline-none"
          data-cursor="OPEN"
        >
          <div className="w-8 h-8 rounded-lg bg-[#141009] border border-[#D4AF37]/45 flex items-center justify-center group-hover:border-[#F5D77F] group-hover:bg-[#1E180D] transition-all shadow-sm">
            <span className="font-mono font-black text-sm text-[#F5D77F] tracking-tighter">H</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-extrabold text-sm sm:text-base tracking-[0.2em] text-[#ffffff] group-hover:text-[#F5D77F] transition-colors drop-shadow-sm">
              HIMANG
            </span>
            <span className="text-[9px] font-mono text-[#A89F8B] tracking-widest uppercase">
              CMD_CTR // 01
            </span>
          </div>
        </a>

        {/* Center / Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                data-cursor="OPEN"
                className={cn(
                  "relative px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-widest transition-all duration-200 focus:outline-none",
                  isActive
                    ? "text-[#ffffff] font-bold bg-[#1C170B] border border-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                    : "text-[#D4CEBF] hover:text-[#ffffff] hover:bg-[#161208]"
                )}
              >
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F5D77F] mr-1.5 animate-pulse" />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right side: System Status Badge */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#120E07] border border-[#D4AF37]/40 rounded-full px-3 py-1 text-[11px] font-mono shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E5B842] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5D77F]" />
            </span>
            <span className="text-[#F5D77F] tracking-wider font-semibold text-[10px]">
              GOLDEN_CORE // OPERATIONAL
            </span>
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="hidden lg:inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#D4AF37]/20 text-[#F5D77F] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/35 hover:border-[#F5D77F] transition-all shadow-sm"
            data-cursor="OPEN"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded-lg text-[#D4CEBF] hover:text-[#ffffff] hover:bg-[#1C170B] border border-[#D4AF37]/30 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto bg-[#080705]/98 backdrop-blur-2xl border border-[#D4AF37]/50 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-xs font-mono tracking-widest flex items-center justify-between transition-colors",
                    isActive
                      ? "text-[#FFF8E7] font-bold bg-[#20190D] border border-[#D4AF37]/50"
                      : "text-[#A89F8B] hover:text-[#FFF8E7] hover:bg-[#141009]"
                  )}
                >
                  <span className="flex items-center">
                    {isActive && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F5D77F] mr-2" />
                    )}
                    {item.label}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center space-x-2 text-[#F5D77F]">
              <span className="w-2 h-2 rounded-full bg-[#F5D77F] animate-pulse" />
              <span>GOLDEN_CORE // OPERATIONAL</span>
            </div>
            <span className="text-[#8C7E66]">REV 2026.04</span>
          </div>
        </div>
      )}
    </header>
  );
}
