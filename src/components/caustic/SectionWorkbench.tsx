"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Sliders, RefreshCw, Layers, Check } from "lucide-react";
import CanvasSkeleton from "./CanvasSkeleton";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function SectionWorkbench() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  // Optical & System Parameters
  const [ior, setIor] = useState(1.52);
  const [dispersion, setDispersion] = useState(58);
  const [roughness, setRoughness] = useState(0.08);
  const [thinFilm, setThinFilm] = useState(380);
  const [bevel, setBevel] = useState(0.06);
  const [preset, setPreset] = useState<"crown" | "dense" | "synthetic">("crown");
  const [isThreeReady, setIsThreeReady] = useState(false);

  const { device, motion, playClick } = usePortfolio();

  const motionRef = useRef({ x: motion.tiltX, y: motion.tiltY });
  useEffect(() => {
    motionRef.current = { x: motion.tiltX, y: motion.tiltY };
  }, [motion.tiltX, motion.tiltY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (device.prefersReducedMotion) {
      setIsThreeReady(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(2.8, 1.8, 3.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: device.useHighPerformance,
      powerPreference: device.useHighPerformance ? "high-performance" : "default",
    });
    renderer.setSize(340, 340);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, device.maxPixelRatio));

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x161d2a,
      metalness: 0.1,
      roughness: roughness,
      transmission: 0.92,
      thickness: 1.6,
      ior: ior,
      specularColor: 0xef9a57,
      iridescence: 0.7,
      iridescenceIOR: 1.3,
      iridescenceThicknessRange: [100, thinFilm],
      transparent: true,
      opacity: 0.9,
    });
    materialRef.current = material;

    // Prismatic Polyhedron Geometry
    const geom = new THREE.IcosahedronGeometry(1.3, 0);
    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Edge lines
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xdce6f0,
      transparent: true,
      opacity: 0.75,
    });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), edgeMat);
    mesh.add(edges);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const keyLight = new THREE.DirectionalLight(0xef9a57, 3.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x60a5fa, 2.0, 10);
    fillLight.position.set(-3, -3, 2);
    scene.add(fillLight);

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

    let animId: number;
    let firstFrame = false;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (mesh) {
        mesh.rotation.x += 0.006;
        mesh.rotation.y += 0.01;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 2.8 + motionRef.current.x * 0.7, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.8 - motionRef.current.y * 0.6, 0.08);
        camera.lookAt(0, 0, 0);
      }
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
      renderer.dispose();
    };
  }, [device]);

  // Sync state changes with WebGL material
  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.ior = ior;
    materialRef.current.roughness = roughness;
    materialRef.current.iridescenceThicknessRange = [100, thinFilm];
  }, [ior, roughness, thinFilm]);

  const applyPreset = (type: "crown" | "dense" | "synthetic") => {
    playClick();
    setPreset(type);
    if (type === "crown") {
      setIor(1.517);
      setDispersion(64);
      setRoughness(0.06);
      setThinFilm(320);
    } else if (type === "dense") {
      setIor(1.72);
      setDispersion(29);
      setRoughness(0.14);
      setThinFilm(540);
    } else {
      setIor(1.65);
      setDispersion(42);
      setRoughness(0.02);
      setThinFilm(720);
    }
  };

  return (
    <section
      id="workbench"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5"
      role="region"
      aria-label="Optical parameter workbench with real-time 3D preview"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Indicator */}
        <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" />
          <span>SECTION 08 // REAL-TIME OPTICAL WORKBENCH</span>
        </div>

        <div className="space-y-2 max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.05]">
            Technical Workbench.
          </h2>
          <p className="text-sm text-white/60 font-sans">
            Adjust the optical parameters of the simulated transmission medium. Changes trigger immediate recalculation of Fresnel equations and thin-film interference.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-2xl bg-[#080a0f] border border-white/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
            {/* Presets Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-white/40 tracking-precision uppercase text-[10px]">
                CALIBRATION PRESET:
              </span>
              <div className="flex items-center space-x-2">
                {(["crown", "dense", "synthetic"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => applyPreset(p)}
                    className={`px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                      preset === p
                        ? "bg-[#ef9a57] text-[#050609]"
                        : "bg-white/5 text-white/50 hover:text-white"
                    }`}
                    data-cursor="OPEN"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Index of Refraction */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white/70">INDEX OF REFRACTION (n)</span>
                <span className="text-[#ef9a57] font-bold tabular-nums">
                  {ior.toFixed(3)}
                </span>
              </div>
              <input
                type="range"
                min="1.30"
                max="1.85"
                step="0.005"
                value={ior}
                onChange={(e) => setIor(parseFloat(e.target.value))}
                className="w-full accent-[#ef9a57] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-white/30">
                <span>1.300 (WATER)</span>
                <span>1.517 (CROWN)</span>
                <span>1.850 (HIGH DENSE)</span>
              </div>
            </div>

            {/* Slider 2: Abbe Dispersion */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white/70">ABBE NUMBER (ν_d)</span>
                <span className="text-[#ef9a57] font-bold tabular-nums">
                  {dispersion}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="1"
                value={dispersion}
                onChange={(e) => setDispersion(parseInt(e.target.value))}
                className="w-full accent-[#ef9a57] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-white/30">
                <span>20 (HIGH FRINGE)</span>
                <span>55 (NOMINAL)</span>
                <span>80 (ACHROMATIC)</span>
              </div>
            </div>

            {/* Slider 3: Surface Roughness */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white/70">SURFACE ROUGHNESS</span>
                <span className="text-[#ef9a57] font-bold tabular-nums">
                  {roughness.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.4"
                step="0.01"
                value={roughness}
                onChange={(e) => setRoughness(parseFloat(e.target.value))}
                className="w-full accent-[#ef9a57] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-white/30">
                <span>0.00 (SPECULAR)</span>
                <span>0.20 (DIFFUSE)</span>
                <span>0.40 (FROSTED)</span>
              </div>
            </div>

            {/* Slider 4: Thin Film Interference */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white/70">THIN FILM THICKNESS</span>
                <span className="text-[#ef9a57] font-bold tabular-nums">
                  {thinFilm} nm
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="900"
                step="10"
                value={thinFilm}
                onChange={(e) => setThinFilm(parseInt(e.target.value))}
                className="w-full accent-[#ef9a57] bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-white/30">
                <span>100 nm (UV)</span>
                <span>500 nm (OPTICAL)</span>
                <span>900 nm (IR)</span>
              </div>
            </div>
          </div>

          {/* WebGL Real-time Preview Monitor */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#090b10] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative group hover:border-[#ef9a57]/50 transition-colors">
            <div className="w-full flex items-center justify-between font-mono text-[9px] text-white/40 tracking-precision border-b border-white/5 pb-2 mb-2">
              <span>REAL-TIME SHADER MON</span>
              <span className="text-[#ef9a57] font-bold">60 FPS // GLSL NATIVE</span>
            </div>

            <div className="w-[300px] h-[300px] relative flex items-center justify-center">
              {!isThreeReady && (
                <CanvasSkeleton
                  className="absolute inset-0"
                  label="CALIBRATING OPTICS"
                />
              )}
              <canvas
                ref={canvasRef}
                className={`w-full h-full block transition-opacity duration-700 ${isThreeReady ? "opacity-100" : "opacity-0"}`}
                aria-hidden="true"
                role="img"
                aria-label="Real-time optical parameter visualization"
              />
            </div>

            <div className="w-full pt-3 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/60">
              <span>FRESNEL: R_0 = {Math.pow((ior - 1) / (ior + 1), 2).toFixed(4)}</span>
              <span className="text-[#ef9a57]">ACTIVE RENDER</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
