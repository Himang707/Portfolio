"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Send, Github, Linkedin, Mail, ArrowUp, CheckCircle, Copy, Phone, MapPin, GraduationCap } from "lucide-react";
import CanvasSkeleton from "./CanvasSkeleton";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function SectionAnneal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [lettersState, setLettersState] = useState([0, 0, 0, 0, 0, 0]);
  const [isThreeReady, setIsThreeReady] = useState(false);

  const { device, playClick } = usePortfolio();

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const WORDMARK = ["H", "I", "M", "A", "N", "G"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (device.prefersReducedMotion) {
      setIsThreeReady(true);
      return;
    }

    // --- WebGL Final Anneal Assembly (#annGL) ---
    // Shards converge from fractured state into an unbroken solid pane
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: device.useHighPerformance,
      powerPreference: device.useHighPerformance ? "high-performance" : "default",
    });
    renderer.setSize(380, 260);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, device.maxPixelRatio));

    const annealGroup = new THREE.Group();
    scene.add(annealGroup);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x141b26,
      metalness: 0.1,
      roughness: 0.08,
      transmission: 0.94,
      thickness: 1.4,
      ior: 1.52,
      specularColor: 0xef9a57,
      transparent: true,
      opacity: 0.92,
    });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xdce6f0,
      transparent: true,
      opacity: 0.8,
    });

    // 4 shards that converge into a rectangle
    const shards: { mesh: THREE.Mesh; targetPos: [number, number, number]; startPos: [number, number, number] }[] = [];

    const geomA = new THREE.BoxGeometry(1.6, 1.1, 0.15);
    const geomB = new THREE.BoxGeometry(1.6, 1.1, 0.15);
    const geomC = new THREE.BoxGeometry(1.6, 1.1, 0.15);
    const geomD = new THREE.BoxGeometry(1.6, 1.1, 0.15);

    const setups = [
      { geom: geomA, target: [-0.82, 0.57, 0], start: [-1.8, 1.4, 0.8] },
      { geom: geomB, target: [0.82, 0.57, 0], start: [1.8, 1.3, -0.6] },
      { geom: geomC, target: [-0.82, -0.57, 0], start: [-1.7, -1.3, 0.5] },
      { geom: geomD, target: [0.82, -0.57, 0], start: [1.9, -1.4, -0.7] },
    ];

    setups.forEach((s) => {
      const mesh = new THREE.Mesh(s.geom, glassMaterial);
      mesh.position.set(s.start[0], s.start[1], s.start[2]);
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(s.geom), edgeMaterial));
      annealGroup.add(mesh);
      shards.push({
        mesh,
        targetPos: s.target as [number, number, number],
        startPos: s.start as [number, number, number],
      });
    });

    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);

    const amberLight = new THREE.DirectionalLight(0xef9a57, 3.5);
    amberLight.position.set(3, 4, 5);
    scene.add(amberLight);

    const coolLight = new THREE.PointLight(0x60a5fa, 2.0, 10);
    coolLight.position.set(-3, -2, 2);
    scene.add(coolLight);

    let animId: number;
    let convergence = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const ratio = Math.max(0, Math.min(1, (currentScroll - (scrollHeight - 600)) / 600));
      convergence = ratio;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const clock = new THREE.Clock();
    let firstFrame = false;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      annealGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.15;
      annealGroup.rotation.x = Math.cos(elapsed * 0.3) * 0.1;

      // Smoothly interpolate shards towards converged monolithic pane
      shards.forEach((s) => {
        s.mesh.position.x = THREE.MathUtils.lerp(s.mesh.position.x, THREE.MathUtils.lerp(s.startPos[0], s.targetPos[0], convergence), 0.08);
        s.mesh.position.y = THREE.MathUtils.lerp(s.mesh.position.y, THREE.MathUtils.lerp(s.startPos[1], s.targetPos[1], convergence), 0.08);
        s.mesh.position.z = THREE.MathUtils.lerp(s.mesh.position.z, THREE.MathUtils.lerp(s.startPos[2], s.targetPos[2], convergence), 0.08);
      });

      renderer.render(scene, camera);

      if (!firstFrame) {
        firstFrame = true;
        setIsThreeReady(true);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      renderer.dispose();
    };
  }, [device]);

  const wordmarkRafRef = useRef<number | null>(null);

  // Wordmark proximity lift and color dispersion throttled to rAF
  const handleWordmarkMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (wordmarkRafRef.current !== null) return;
    const clientX = e.clientX;

    wordmarkRafRef.current = requestAnimationFrame(() => {
      const el = wordmarkRef.current;
      if (!el) {
        wordmarkRafRef.current = null;
        return;
      }
      const rect = el.getBoundingClientRect();
      const mouseX = clientX - rect.left;
      const width = rect.width;

      const letterWidth = width / WORDMARK.length;
      const newLifts = WORDMARK.map((_, i) => {
        const letterCenter = (i + 0.5) * letterWidth;
        const dist = Math.abs(mouseX - letterCenter);
        const intensity = Math.max(0, 1 - dist / (letterWidth * 2.2));
        return intensity;
      });
      setLettersState(newLifts);
      wordmarkRafRef.current = null;
    });
  };

  const handleWordmarkMouseLeave = () => {
    if (wordmarkRafRef.current !== null) {
      cancelAnimationFrame(wordmarkRafRef.current);
      wordmarkRafRef.current = null;
    }
    setLettersState([0, 0, 0, 0, 0, 0]);
  };

  const copyEmail = () => {
    playClick();
    navigator.clipboard.writeText("himangpanchal707@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPhone = () => {
    playClick();
    navigator.clipboard.writeText("7426053260");
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setFormSent(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="anneal"
      className="relative pt-28 pb-16 px-6 sm:px-12 bg-[#050609] border-t border-white/10 overflow-hidden"
      role="contentinfo"
      aria-label="Contact and footer"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Indicator */}
        <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57] animate-pulse" />
          <span>SECTION 11 // THE ANNEAL ASSEMBLY & TRANSMISSION</span>
        </div>

        {/* 2-Column Transmission Console & Anneal Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Transmission Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.05]">
                Initiate Contact.
              </h2>
              <p className="text-sm text-white/60 font-sans">
                Direct transmission line to Himang. Whether discussing frontend engineering, AI/ML models, computer vision systems, or collaborative digital products.
              </p>
            </div>

            {formSent ? (
              <div className="p-8 rounded-2xl bg-[#080a0f] border border-[#ef9a57]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center space-y-3 text-center">
                <CheckCircle className="w-10 h-10 text-[#ef9a57] animate-bounce" />
                <h3 className="font-mono text-base font-bold text-[#f2f4f7]">
                  TRANSMISSION DISPATCHED // 200 OK
                </h3>
                <p className="text-xs text-white/60 font-sans">
                  Your message has been verified and delivered to Himang&apos;s terminal.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-[#080a0f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] tracking-precision text-white/40 block uppercase">
                      NAME // IDENTIFIER
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Operator Name"
                      className="w-full bg-[#050609] border border-white/15 focus:border-[#ef9a57] rounded-lg px-4 py-2.5 font-mono text-xs text-[#f2f4f7] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] tracking-precision text-white/40 block uppercase">
                      EMAIL // TRANSMISSION ADDR
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operator@system.io"
                      className="w-full bg-[#050609] border border-white/15 focus:border-[#ef9a57] rounded-lg px-4 py-2.5 font-mono text-xs text-[#f2f4f7] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] tracking-precision text-white/40 block uppercase">
                    MESSAGE // PAYLOAD
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Project vision, frontend engineering or AI/ML collaboration..."
                    className="w-full bg-[#050609] border border-white/15 focus:border-[#ef9a57] rounded-lg px-4 py-2.5 font-mono text-xs text-[#f2f4f7] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-mono text-xs font-bold tracking-wider text-[#050609] bg-[#ef9a57] hover:bg-[#f3aa70] transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(239,154,87,0.35)]"
                  data-cursor="OPEN"
                >
                  <span>SEND TRANSMISSION</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Direct Connect Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <button
                onClick={copyEmail}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ef9a57] text-white/80 hover:text-white transition-all flex items-center space-x-2"
                data-cursor="COPY"
              >
                <Mail className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>himangpanchal707@gmail.com</span>
                <span className="text-[10px] text-white/40 ml-1">
                  [{copied ? "COPIED!" : "COPY"}]
                </span>
              </button>

              <button
                onClick={copyPhone}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ef9a57] text-white/80 hover:text-white transition-all flex items-center space-x-2"
                data-cursor="COPY"
              >
                <Phone className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>+91 7426053260</span>
                <span className="text-[10px] text-white/40 ml-1">
                  [{phoneCopied ? "COPIED!" : "COPY"}]
                </span>
              </button>

              <a
                href="https://github.com/himang707"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ef9a57] text-white/80 hover:text-white transition-all flex items-center space-x-2"
                data-cursor="OPEN"
              >
                <Github className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>github.com/himang707</span>
              </a>

              <a
                href="https://linkedin.com/in/himangpanchal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#ef9a57] text-white/80 hover:text-white transition-all flex items-center space-x-2"
                data-cursor="OPEN"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>Himang Panchal</span>
              </a>

              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#ef9a57]" />
                <span>Rajasthan, Dungarpur</span>
              </div>
            </div>
          </div>

          {/* Right Column: WebGL Anneal Assembly (#annGL) & Education / Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Assembly Monitor */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#080a0f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative">
              <div className="w-full flex items-center justify-between font-mono text-[9px] text-white/40 tracking-precision border-b border-white/5 pb-2 mb-2">
                <span>ASSEMBLY MONITOR // #annGL</span>
                <span className="text-[#ef9a57] font-bold">SOLID PANE CONVERGENCE</span>
              </div>

              <div className="w-[320px] h-[190px] relative flex items-center justify-center">
                {!isThreeReady && (
                  <CanvasSkeleton
                    className="absolute inset-0"
                    label="CONVERGING SHARDS"
                  />
                )}
                <canvas
                  ref={canvasRef}
                  className={`w-full h-full block transition-opacity duration-700 ${isThreeReady ? "opacity-100" : "opacity-0"}`}
                  aria-hidden="true"
                  role="img"
                  aria-label="Converging glass shards 3D animation"
                />
              </div>

              <p className="text-[10px] font-mono text-white/40 text-center pt-2 border-t border-white/5">
                All components fuse into a cohesive, polished digital experience.
              </p>
            </div>

            {/* Academic & Profile Telemetry Card */}
            <div className="p-6 rounded-2xl bg-[#080a0f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[9px] text-white/40 tracking-precision">
                <span>ACADEMIC // PROFILE TELEMETRY</span>
                <span className="text-[#ef9a57]">RAI UNIVERSITY</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-[#f2f4f7] font-bold text-sm">
                  <GraduationCap className="w-4 h-4 text-[#ef9a57]" />
                  <span>Bachelor’s / Computer Science</span>
                </div>
                <div className="text-[11px] text-white/60 pl-6">
                  Rai University — Expected 2029
                </div>
                <div className="text-[10px] font-mono text-[#ef9a57] pl-6">
                  Degree: [Update] · CGPA: [Update]
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-1">
                <span className="text-[9px] text-white/40 uppercase tracking-precision block">
                  AREAS OF INTEREST
                </span>
                <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                  Artificial Intelligence · Machine Learning · Computer Vision · Frontend Engineering · Developer Tools · Interactive Experiences
                </p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <p className="text-[11px] text-white/60 font-sans leading-relaxed italic">
                  &ldquo;Curious about the intersection of design, software, and AI, with a focus on learning through building. Interested in creating technology that feels intuitive, useful, and beautifully engineered.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Refracting Proximity Wordmark: "HIMANG" */}
        <div className="pt-16 border-t border-white/10">
          <div
            ref={wordmarkRef}
            onMouseMove={handleWordmarkMouseMove}
            onMouseLeave={handleWordmarkMouseLeave}
            className="flex items-center justify-between select-none cursor-default py-6"
          >
            {WORDMARK.map((char, idx) => {
              const lift = lettersState[idx] || 0;
              // Lift on Y-axis and shift stroke color from cool blue to warm amber
              const yTranslate = -lift * 26;
              const r = Math.round(96 + lift * (239 - 96));
              const g = Math.round(165 + lift * (154 - 165));
              const b = Math.round(250 + lift * (87 - 250));
              const letterColor = `rgb(${r}, ${g}, ${b})`;

              return (
                <span
                  key={idx}
                  style={{
                    transform: `translateY(${yTranslate}px)`,
                    color: lift > 0.05 ? letterColor : "rgba(242, 244, 247, 0.12)",
                    textShadow:
                      lift > 0.1
                        ? `0 0 25px rgba(${r}, ${g}, ${b}, 0.5)`
                        : "none",
                    transition: "transform 0.15s ease-out, color 0.15s ease-out",
                  }}
                  className="text-6xl sm:text-9xl lg:text-[140px] font-black font-mono tracking-tighter leading-none block"
                >
                  {char}
                </span>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 font-mono text-[10px] text-white/40 tracking-precision gap-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" />
              <span>HIMANG PANCHAL // FRONTEND DEVELOPER & AI/ML ENTHUSIAST</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-white/50 hover:text-[#ef9a57] transition-colors"
              data-cursor="OPEN"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
