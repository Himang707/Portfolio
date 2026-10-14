"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidMetalButton from "./LiquidMetalButton";
import CanvasSkeleton from "./CanvasSkeleton";
import { usePortfolio } from "@/lib/PortfolioContext";
import { ArrowDown, Code2, Cpu, Terminal, Compass, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionPrime() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Enhancement 3: Progressive canvas loading
  const [isThreeReady, setIsThreeReady] = useState(false);

  const { device, playClick, tour } = usePortfolio();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    // Enhancement 1: Skip WebGL entirely if reduced motion
    if (device.prefersReducedMotion) {
      setIsThreeReady(true);
      return;
    }

    // --- THREE.JS WebGL Fractured Optical Glass Scene ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: device.useHighPerformance, // Enhancement 1: Disable AA on low-end
      powerPreference: device.useHighPerformance
        ? "high-performance"
        : "default",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, device.maxPixelRatio));

    // Create 4 fractured glass plate fragments
    const glassGroup = new THREE.Group();
    scene.add(glassGroup);

    // Enhancement 1: Simplified material on low-end devices
    const glassMaterial = device.useHighPerformance
      ? new THREE.MeshPhysicalMaterial({
          color: 0x161c28,
          metalness: 0.1,
          roughness: 0.12,
          transmission: 0.9,
          thickness: 1.2,
          ior: 1.52,
          specularIntensity: 1.0,
          specularColor: 0xef9a57,
          transparent: true,
          opacity: 0.85,
        })
      : new THREE.MeshStandardMaterial({
          // Simpler material for mobile — no transmission/ior
          color: 0x161c28,
          metalness: 0.15,
          roughness: 0.15,
          transparent: true,
          opacity: 0.78,
        });

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xdce6f0,
      transparent: true,
      opacity: 0.7,
      linewidth: 1.5,
    });

    // 4 fractured glass geometry shards
    const shardsData = [
      { pos: [-1.4, 0.9, 0], rot: [0.08, -0.05, 0.1], dir: [-1.2, 0.9, 0.4] },
      { pos: [1.3, 0.8, -0.1], rot: [-0.06, 0.08, -0.08], dir: [1.1, 0.8, -0.3] },
      { pos: [-1.1, -1.0, 0.1], rot: [0.05, 0.05, -0.12], dir: [-0.9, -1.1, 0.5] },
      { pos: [1.2, -0.9, 0], rot: [-0.07, -0.06, 0.09], dir: [1.0, -1.0, -0.4] },
    ];

    const shardMeshes: THREE.Mesh[] = [];

    // Enhancement 1: Reduce geometry complexity on mobile
    const bevelSegments = device.useHighPerformance ? 2 : 1;

    shardsData.forEach((shard, idx) => {
      const shape = new THREE.Shape();
      if (idx === 0) {
        shape.moveTo(-1.6, -0.2);
        shape.lineTo(0.1, 1.4);
        shape.lineTo(-0.2, 1.8);
        shape.lineTo(-1.8, 0.8);
      } else if (idx === 1) {
        shape.moveTo(0.1, 1.4);
        shape.lineTo(1.8, 0.6);
        shape.lineTo(1.4, -0.2);
        shape.lineTo(-0.1, 0.2);
      } else if (idx === 2) {
        shape.moveTo(-1.6, -0.2);
        shape.lineTo(-0.1, 0.2);
        shape.lineTo(0.0, -1.6);
        shape.lineTo(-1.4, -1.4);
      } else {
        shape.moveTo(-0.1, 0.2);
        shape.lineTo(1.4, -0.2);
        shape.lineTo(1.2, -1.6);
        shape.lineTo(0.0, -1.6);
      }

      const geom = new THREE.ExtrudeGeometry(shape, {
        depth: 0.18,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.03,
        bevelSegments,
      });

      const mesh = new THREE.Mesh(geom, glassMaterial);
      mesh.position.set(shard.pos[0], shard.pos[1], shard.pos[2]);
      mesh.rotation.set(shard.rot[0], shard.rot[1], shard.rot[2]);
      glassGroup.add(mesh);
      shardMeshes.push(mesh);

      // Edge outline
      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(edges, edgeMaterial);
      mesh.add(line);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const amberLight = new THREE.DirectionalLight(0xef9a57, 2.8);
    amberLight.position.set(4, 5, 6);
    scene.add(amberLight);

    const blueRimLight = new THREE.PointLight(0x7090b8, 2.0, 15);
    blueRimLight.position.set(-5, -4, 3);
    scene.add(blueRimLight);

    // Scroll progress drives glass fracture
    let scrollProgress = 0;
    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // Line-by-line masked editorial reveals with GSAP
    const ctx = gsap.context(() => {
      gsap.from([title1Ref.current, title2Ref.current], {
        yPercent: 118,
        ease: "power3.out",
        duration: 1.2,
        stagger: 0.085,
        delay: 0.4,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 24,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.7,
      });
    }, wrapper);

    let animId: number;
    let mouseX = 0;
    let mouseY = 0;
    let firstFrameRendered = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
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

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Subtle float and mouse reaction
      glassGroup.rotation.y = THREE.MathUtils.lerp(
        glassGroup.rotation.y,
        mouseX * 0.25 + Math.sin(elapsed * 0.5) * 0.05,
        0.05
      );
      glassGroup.rotation.x = THREE.MathUtils.lerp(
        glassGroup.rotation.x,
        -mouseY * 0.18 + Math.cos(elapsed * 0.4) * 0.04,
        0.05
      );

      // Scroll separation: fragments fracture outward along their directional vectors
      shardMeshes.forEach((mesh, i) => {
        const shard = shardsData[i];
        const disp = scrollProgress * 1.8;
        mesh.position.x = shard.pos[0] + shard.dir[0] * disp;
        mesh.position.y = shard.pos[1] + shard.dir[1] * disp;
        mesh.position.z = shard.pos[2] + shard.dir[2] * disp;

        mesh.rotation.z = shard.rot[2] + disp * 0.4;
      });

      renderer.render(scene, camera);

      // Enhancement 3: Signal first frame rendered
      if (!firstFrameRendered) {
        firstFrameRendered = true;
        setIsThreeReady(true);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      trigger.kill();
      ctx.revert();
      renderer.dispose();
    };
  }, [device]); // Re-run if device capabilities change

  const scrollTo = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={wrapperRef} id="prime" className="s-prime relative h-[190vh] w-full">
      {/* Sticky 100vh Hero Container */}
      <section
        className="hero sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050609]"
        role="region"
        aria-label="Hero — Himang Panchal, Frontend Developer and AI/ML Enthusiast"
      >
        {/* Layer 0: Background Technical Grid */}
        <div className="hero-bg absolute inset-0 z-0 pointer-events-none opacity-20" aria-hidden="true">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(242, 244, 247, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242, 244, 247, 0.05) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Layer 10: WebGL Fractured Glass Plate */}
        {/* Enhancement 3: Show skeleton while Three.js initializes */}
        {!isThreeReady && (
          <div className="absolute inset-0 z-10">
            <CanvasSkeleton
              className="w-full h-full"
              label="COMPILING GLSL FRACTURED GLASS"
            />
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`hero-gl absolute inset-0 z-10 w-full h-full pointer-events-none transition-opacity duration-700 ${
            isThreeReady ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
          role="img"
          aria-label="Animated fractured glass 3D visualization"
        />

        {/* Layer 30: Hero Foreground Content */}
        <div className="hero-content relative z-30 max-w-6xl w-full mx-auto px-6 sm:px-12 flex flex-col items-start justify-center pt-16">
          {/* Eyebrow Technical Tag */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 px-3.5 py-1.5 rounded-full bg-[#0c0e14] border border-white/10 font-mono text-[10px] tracking-precision text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57] animate-pulse" aria-hidden="true" />
            <span className="font-bold text-[#f2f4f7]">HIMANG PANCHAL</span>
            <span className="text-white/30" aria-hidden="true">•</span>
            <span className="text-[#ef9a57]">FRONTEND DEVELOPER | AI/ML ENTHUSIAST</span>
          </div>

          {/* Masked Editorial Headline Reveals with [data-split] */}
          <div className="space-y-1 mb-6 text-left">
            <div className="reveal-mask">
              <h1
                ref={title1Ref}
                data-split="line"
                className="text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[0.95]"
              >
                HIMANG PANCHAL.
              </h1>
            </div>
            <div className="reveal-mask">
              <h2
                ref={title2Ref}
                data-split="line"
                className="text-3xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white/70 leading-[1.05]"
              >
                I build things that feel simple.
              </h2>
            </div>
          </div>

          {/* Precision Bio Summary */}
          <p
            ref={subtitleRef}
            className="text-sm sm:text-lg text-white/75 max-w-2xl font-sans leading-relaxed mb-6"
          >
            Frontend Developer and AI/ML enthusiast focused on building modern, interactive, and practical digital experiences. Experienced with React, Python, machine learning, and computer vision, with a strong interest in turning ideas into polished, real-world products.
          </p>

          {/* Quick Contact & Location Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 font-mono text-[11px] text-white/60">
            <span className="px-3 py-1 rounded-md bg-[#0c0e14] border border-white/10 text-[#f2f4f7]">
              📍 Rajasthan, Dungarpur
            </span>
            <a
              href="mailto:himangpanchal707@gmail.com"
              className="px-3 py-1 rounded-md bg-[#0c0e14] border border-white/10 hover:border-[#ef9a57] text-[#ef9a57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] rounded"
            >
              ✉️ himangpanchal707@gmail.com
            </a>
            <a
              href="tel:7426053260"
              className="px-3 py-1 rounded-md bg-[#0c0e14] border border-white/10 hover:border-[#ef9a57] text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] rounded"
            >
              📞 7426053260
            </a>
            <a
              href="https://github.com/himang707"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-md bg-[#0c0e14] border border-white/10 hover:border-[#ef9a57] text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57] rounded"
            >
              ⌨️ github.com/himang707
            </a>
          </div>

          {/* Liquid Metal Action Buttons & Metrics */}
          <div className="flex flex-wrap items-center gap-5">
            <LiquidMetalButton
              onClick={() => scrollTo("assembly")}
              dataCursor="VIEW"
            >
              <span>EXPLORE SPECIMENS</span>
              <Compass className="w-4 h-4 text-[#ef9a57]" />
            </LiquidMetalButton>

            <button
              onClick={() => scrollTo("fracture")}
              className="px-6 py-3.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider text-white/80 bg-[#0c0e14] border border-white/15 hover:border-[#ef9a57] hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ef9a57]"
              data-cursor="OPEN"
            >
              OPERATOR LOGS [02]
            </button>

            {/* Photon Expedition Guided Narrative Tour Button */}
            <button
              onClick={() => {
                playClick();
                tour.startTour(0);
              }}
              className="px-5 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold tracking-wider text-[#ef9a57] bg-[#ef9a57]/10 border border-[#ef9a57]/50 hover:bg-[#ef9a57] hover:text-[#050609] transition-all flex items-center space-x-2 shadow-[0_0_25px_rgba(239,154,87,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white group active:scale-95"
              data-cursor="OPEN"
              title="Commence Photon's Journey (Guided Narrative Tour)"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              <span>PHOTON EXPEDITION</span>
            </button>
          </div>

          {/* Bottom Telemetry Strip */}
          <div className="mt-14 pt-6 border-t border-white/10 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-[10px] text-white/40 tracking-precision">
            <div>
              <span className="block text-white/20 uppercase">LOCATION</span>
              <span className="text-[#f2f4f7] font-bold">RAJASTHAN, DUNGARPUR</span>
            </div>
            <div>
              <span className="block text-white/20 uppercase">EDUCATION</span>
              <span className="text-[#ef9a57] font-bold">RAI UNIVERSITY &apos;29</span>
            </div>
            <div>
              <span className="block text-white/20 uppercase">CORE FOCUS</span>
              <span className="text-[#f2f4f7] font-bold">REACT &bull; PYTHON &bull; CV</span>
            </div>
            <div>
              <span className="block text-white/20 uppercase">SYSTEM DISPATCH</span>
              <span className="text-[#ef9a57] font-bold tabular-nums">ONLINE &bull; READY</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="absolute bottom-6 right-8 hidden sm:flex items-center space-x-2 font-mono text-[9px] tracking-precision text-white/40" aria-hidden="true">
          <span>SCROLL TO FRACTURE</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#ef9a57] animate-bounce" />
        </div>
      </section>
    </div>
  );
}
