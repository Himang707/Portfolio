"use client";

import React from "react";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import ToolsStrip from "@/components/portfolio/ToolsStrip";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Services from "@/components/portfolio/Services";
import Portfolio from "@/components/portfolio/Portfolio";
import Hackathons from "@/components/portfolio/Hackathons";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import BottomTicker from "@/components/portfolio/BottomTicker";
import Footer from "@/components/portfolio/Footer";
import EmojiBackground from "@/components/portfolio/EmojiBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#111111] font-space selection:bg-[#FFE57F] selection:text-black overflow-x-hidden">
      {/* Ambient background with subtle drifting signature emojis */}
      <EmojiBackground />

      {/* 1. Header: Outlined compact navbar with Himang's identity */}
      <Header />

      <main className="relative z-10 flex flex-col" role="main">
        {/* 2. Hero: 2-column layout with Himang's headline, real bio, stats, and playful browser window illustration */}
        <Hero />

        {/* 3. Tools Strip: Full-width black band with Himang's real core stack */}
        <ToolsStrip />

        {/* 4. About: Himang's bio, Rai University '29, Ahmedabad, Gujarat, design pillars */}
        <About />

        {/* 5. Arsenal & Skills: Filterable technical skills */}
        <Skills />

        {/* 6. Services: "Services we’re providing that derive 99% result", real metrics, 2x2 grid */}
        <Services />

        {/* 7. Projects & Work: "My Projects" with blue doodle (UDAYAAN TECH, SIH-2026, UDYRA, RELAY) */}
        <Portfolio />

        {/* 8. Hackathons & Sprints: iQOO Sprint, SIH 2026 Submission (Decision Pending) */}
        <Hackathons />

        {/* 9. Testimonials: "Here’s what my clients are saying about my work", rotated collage in Inter font */}
        <Testimonials />

        {/* 10. Contact: Large outlined white callout with pink star overlapping upper edge, direct 1-click email copy */}
        <Contact />
      </main>

      {/* 11. Bottom Ticker: Playful emoji ticker filling the bottom space */}
      <BottomTicker />

      {/* 12. Footer: Minimal horizontal footer with wordmark, social icons */}
      <Footer />
    </div>
  );
}
