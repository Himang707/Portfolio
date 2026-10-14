"use client";

import React, { useEffect, useRef, useState } from "react";

interface StarParticle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  driftAmpX: number;
  driftAmpY: number;
  driftSpeed: number;
  driftPhase: number;
  colorType: "star" | "sage" | "jade";
}

export default function GoogleFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<number>(0);
  const targetScrollRef = useRef<number>(0);
  const animRef = useRef<number>(0);

  // Track window scroll smoothly
  useEffect(() => {
    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    targetScrollRef.current = window.scrollY;
    scrollRef.current = window.scrollY;
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtle Antigravity Starfield & Particle System Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Subtle starfield & microgravity particles:
    // Kept at ~25% subtle intensity so it maintains absolute professional credibility
    const totalCount = 68;
    const particles: StarParticle[] = Array.from({ length: totalCount }, (_, i) => {
      const isSage = i % 3 === 0;
      const isJade = i % 5 === 0;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        radius: isSage || isJade ? Math.random() * 1.2 + 0.6 : Math.random() * 0.9 + 0.4,
        baseAlpha: isSage || isJade ? Math.random() * 0.12 + 0.05 : Math.random() * 0.18 + 0.06,
        twinkleSpeed: Math.random() * 0.0018 + 0.0008,
        twinklePhase: Math.random() * Math.PI * 2,
        driftAmpX: Math.random() * 4 + 1.5,
        driftAmpY: Math.random() * 5 + 2,
        driftSpeed: (Math.random() * 0.0012 + 0.0008), // 3-6s cycle
        driftPhase: Math.random() * Math.PI * 2,
        colorType: isJade ? "jade" : isSage ? "sage" : "star",
      };
    });

    let startTime = performance.now();

    const render = (now: number) => {
      ctx.clearRect(0, 0, W, H);

      // Smooth lerp scroll for weightless inertia (0.5x scroll speed minimal parallax)
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.08;
      const scrollOffset = scrollRef.current * 0.5;

      const elapsed = (now - startTime);

      for (let i = 0; i < totalCount; i++) {
        const p = particles[i];

        // Gentle microgravity drifting (mimicking zero-g float)
        const driftX = Math.sin(elapsed * p.driftSpeed + p.driftPhase) * p.driftAmpX;
        const driftY = Math.cos(elapsed * p.driftSpeed * 0.85 + p.driftPhase) * p.driftAmpY;

        // Subtle 0.5x scroll parallax wrapping
        let currentY = (p.y - scrollOffset + driftY) % H;
        if (currentY < 0) currentY += H;

        let currentX = (p.x + driftX) % W;
        if (currentX < 0) currentX += W;

        // Twinkle factor
        const twinkle = Math.sin(elapsed * p.twinkleSpeed + p.twinklePhase) * 0.04;
        const alpha = Math.max(0.02, Math.min(0.25, p.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);

        if (p.colorType === "sage") {
          ctx.fillStyle = `rgba(148, 222, 192, ${alpha})`;
        } else if (p.colorType === "jade") {
          ctx.fillStyle = `rgba(127, 231, 184, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(250, 247, 242, ${alpha})`;
        }

        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Deep obsidian-ink base */}
      <div className="absolute inset-0 bg-[#080d0a]" />

      {/* Atmospheric depth base texture */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: "url('/images/natural-bg-wide.jpg')",
          opacity: 0.22,
          filter: "contrast(1.08) brightness(0.65) saturate(0.80)",
        }}
      />

      {/* Multi-layer atmospheric vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 70% at 50% 0%, transparent 0%, rgba(8,13,10,0.72) 60%, rgba(8,13,10,0.98) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,13,10,0.85) 0%, rgba(8,13,10,0.35) 20%, rgba(8,13,10,0.35) 75%, rgba(8,13,10,0.95) 100%)",
        }}
      />

      {/* Soft luminous sage ambient glow — top-left */}
      <div
        className="absolute drift-microgravity-slow"
        style={{
          width: "75vw", height: "75vw",
          maxWidth: 950, maxHeight: 950,
          top: "-25%", left: "-20%",
          background: "radial-gradient(circle, rgba(110,182,148,0.11) 0%, transparent 68%)",
          filter: "blur(130px)",
        }}
      />

      {/* Warm ethereal amber glow — bottom-right */}
      <div
        className="absolute drift-microgravity-1"
        style={{
          width: "55vw", height: "55vw",
          maxWidth: 750, maxHeight: 750,
          bottom: "5%", right: "-15%",
          background: "radial-gradient(circle, rgba(130,105,65,0.08) 0%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      {/* Cool luminous jade mid glow */}
      <div
        className="absolute drift-microgravity-2"
        style={{
          width: "50vw", height: "50vw",
          maxWidth: 700, maxHeight: 700,
          top: "35%", right: "8%",
          background: "radial-gradient(circle, rgba(127,231,184,0.07) 0%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />

      {/* Ultra-subtle micro coordinate grid (antigravity spatial reference) */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,222,192,0.7) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 25%, transparent 100%)",
        }}
      />

      {/* Subtle starfield and luminous particle system responding to scroll at 0.5x speed */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
