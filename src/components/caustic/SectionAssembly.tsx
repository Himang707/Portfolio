"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project } from "@/data/projects";
import { ExternalLink, Github, Layers, ArrowUpRight } from "lucide-react";
import CanvasSkeleton from "./CanvasSkeleton";
import { usePortfolio } from "@/lib/PortfolioContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionAssembly() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [separationMm, setSeparationMm] = useState("0.00");
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [isThreeReady, setIsThreeReady] = useState(false);

  const { device, motion, playClick, playResonance } = usePortfolio();

  const motionRef = useRef({ x: motion.tiltX, y: motion.tiltY });
  useEffect(() => {
    motionRef.current = { x: motion.tiltX, y: motion.tiltY };
  }, [motion.tiltX, motion.tiltY]);

  // Track if resonance was recently played to avoid spam
  const lastResonanceRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    if (device.prefersReducedMotion) {
      setIsThreeReady(true);
      return;
    }

    // --- Three.js Optical Lens Stack Assembly ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(3.5, 2.0, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: device.useHighPerformance,
      powerPreference: device.useHighPerformance ? "high-performance" : "default",
    });
    renderer.setSize(440, 440);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, device.maxPixelRatio));

    const lensGroup = new THREE.Group();
    scene.add(lensGroup);

    // Enhancement 1: Use simpler material on mobile
    const segCount = Math.round(48 * device.geometryDetail);
    const glassMaterial = device.useHighPerformance
      ? new THREE.MeshPhysicalMaterial({
          color: 0x141a24,
          metalness: 0.1,
          roughness: 0.1,
          transmission: 0.9,
          thickness: 1.8,
          ior: 1.52,
          specularColor: 0xef9a57,
          transparent: true,
          opacity: 0.88,
        })
      : new THREE.MeshStandardMaterial({
          color: 0x141a24,
          metalness: 0.15,
          roughness: 0.15,
          transparent: true,
          opacity: 0.78,
        });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xdce6f0,
      transparent: true,
      opacity: 0.7,
    });

    // Element 1: Front Lens (Relay)
    const g1 = new THREE.CylinderGeometry(1.6, 1.4, 0.4, segCount);
    const m1 = new THREE.Mesh(g1, glassMaterial);
    m1.add(new THREE.LineSegments(new THREE.EdgesGeometry(g1), edgeMaterial));
    lensGroup.add(m1);

    // Element 2: Middle Meniscus Lens (Udayaan)
    const g2 = new THREE.CylinderGeometry(1.3, 1.2, 0.35, segCount);
    const m2 = new THREE.Mesh(g2, glassMaterial);
    m2.add(new THREE.LineSegments(new THREE.EdgesGeometry(g2), edgeMaterial));
    lensGroup.add(m2);

    // Element 3: Rear Doublet Lens (Globetrotter)
    const g3 = new THREE.CylinderGeometry(1.1, 1.1, 0.5, segCount);
    const m3 = new THREE.Mesh(g3, glassMaterial);
    m3.add(new THREE.LineSegments(new THREE.EdgesGeometry(g3), edgeMaterial));
    lensGroup.add(m3);

    // Mount housing barrel rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x1d222e,
      metalness: 0.8,
      roughness: 0.3,
    });
    const ringGeom = new THREE.TorusGeometry(1.65, 0.05, 16, segCount);
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 2;
    m1.add(ring1);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);

    const amberLight = new THREE.DirectionalLight(0xef9a57, 3.5);
    amberLight.position.set(4, 5, 5);
    scene.add(amberLight);

    const coolLight = new THREE.PointLight(0x60a5fa, 2.0, 15);
    coolLight.position.set(-4, -2, 3);
    scene.add(coolLight);

    let progress = 0;

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress = self.progress;
        const mm = (progress * 48.2).toFixed(2);
        setSeparationMm(mm);

        const newIdx = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
        setActiveProjectIdx((prev) => {
          if (prev !== newIdx) {
            // Enhancement 5: Play resonance sound when lens elements separate
            const now = Date.now();
            if (now - lastResonanceRef.current > 1000) {
              playResonance();
              lastResonanceRef.current = now;
            }
          }
          return newIdx;
        });
      },
    });

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(wrapper);

    let animId: number;
    const clock = new THREE.Clock();
    let firstFrame = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Axial turntable + 3D motion parallax tilt (gyroscope / cursor)
      lensGroup.rotation.y = THREE.MathUtils.lerp(
        lensGroup.rotation.y,
        elapsed * 0.22 + motionRef.current.x * 0.45,
        0.08
      );
      lensGroup.rotation.x = THREE.MathUtils.lerp(
        lensGroup.rotation.x,
        -motionRef.current.y * 0.35,
        0.08
      );

      // Axial separation driven by scroll progress
      m1.position.z = THREE.MathUtils.lerp(m1.position.z, progress * 1.5, 0.1);
      m2.position.z = THREE.MathUtils.lerp(m2.position.z, 0, 0.1);
      m3.position.z = THREE.MathUtils.lerp(m3.position.z, -progress * 1.5, 0.1);

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
      trigger.kill();
      renderer.dispose();
    };
  }, [device, playResonance]);

  const curProject = projects[activeProjectIdx] || projects[0];

  return (
    <div ref={wrapperRef} id="assembly" className="s-assembly relative h-[210vh] w-full">
      {/* Pinned 100vh Sticky Viewport */}
      <section
        className="sticky top-0 h-screen w-full flex items-center justify-center bg-[#050609] px-6 sm:px-12 overflow-hidden border-t border-white/5"
        role="region"
        aria-label="Project showcase — 3D Lens Stack Assembly"
      >
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: 3D Optical Lens Stack Assembly Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Telemetry pill */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between font-mono text-[10px] tracking-precision text-white/50">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" aria-hidden="true" />
                <span>STACK:</span>
                <span className="text-[#ef9a57] font-bold tabular-nums" aria-live="polite">
                  {separationMm} mm {separationMm === "0.00" ? "(SEATED)" : "(EXPLODED)"}
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-1.5 text-white/40">
                <span>3D TILT:</span>
                <span className="text-[#ef9a57] tabular-nums font-bold">
                  [{motion.tiltX.toFixed(2)}, {motion.tiltY.toFixed(2)}]
                </span>
              </div>
            </div>

            <div className="w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] relative flex items-center justify-center">
              {!isThreeReady && (
                <CanvasSkeleton
                  className="absolute inset-0"
                  label="ASSEMBLING LENS STACK"
                />
              )}
              <canvas
                ref={canvasRef}
                className={`w-full h-full block transition-opacity duration-700 ${
                  isThreeReady ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
                role="img"
                aria-label="Interactive 3D lens stack assembly visualization"
              />
            </div>

            {/* Step selector tags */}
            <div className="flex items-center space-x-3 font-mono text-[10px] tracking-wider pt-2" role="tablist" aria-label="Project selector">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    playClick();
                    setActiveProjectIdx(idx);
                  }}
                  className={`px-3 py-1 rounded border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] ${
                    activeProjectIdx === idx
                      ? "border-[#ef9a57] text-[#ef9a57] bg-[#ef9a57]/10 font-bold"
                      : "border-white/10 text-white/40 hover:text-white"
                  }`}
                  data-cursor="OPEN"
                  role="tab"
                  aria-selected={activeProjectIdx === idx}
                  aria-controls={`project-panel-${idx}`}
                >
                  ELEMENT {idx + 1}: {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Active Flagship Project Specimen */}
          <div
            className="lg:col-span-6 flex flex-col justify-center space-y-6"
            role="tabpanel"
            id={`project-panel-${activeProjectIdx}`}
            aria-label={`Project: ${curProject.title}`}
          >
            <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57] animate-pulse" aria-hidden="true" />
              <span>FLAGSHIP SPECIMEN 0{activeProjectIdx + 1} // THREE-LAYER ASSEMBLY</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-3">
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f2f4f7] uppercase">
                  {curProject.title}
                </h3>
                <span className="font-mono text-xs text-[#ef9a57] font-bold">
                  [{curProject.date}]
                </span>
              </div>
              <h4 className="font-mono text-sm tracking-wider text-white/50 uppercase">
                {curProject.subtitle}
              </h4>
            </div>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
              {curProject.longDescription}
            </p>

            {/* Performance Metric Strata */}
            <div className="grid grid-cols-3 gap-3 font-mono text-xs border-y border-white/10 py-4">
              {curProject.stats.map((st) => (
                <div key={st.label}>
                  <span className="text-[9px] text-white/30 block tracking-precision uppercase">
                    {st.label}
                  </span>
                  <span className="text-sm font-bold text-[#ef9a57] tabular-nums block pt-0.5">
                    {st.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
              {curProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions: Live Demo & GitHub */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={curProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider text-[#050609] bg-[#ef9a57] hover:bg-[#f3aa70] transition-all shadow-[0_0_20px_rgba(239,154,87,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                data-cursor="OPEN"
                onClick={() => playClick()}
              >
                <span>LAUNCH DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={curProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider text-white/80 bg-[#0c0e14] border border-white/15 hover:border-[#ef9a57] hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
                data-cursor="OPEN"
                onClick={() => playClick()}
              >
                <Github className="w-3.5 h-3.5" />
                <span>REPOSITORY</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
