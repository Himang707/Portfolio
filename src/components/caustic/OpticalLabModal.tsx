"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { usePortfolio, LabTab } from "@/lib/PortfolioContext";
import { SOLAR_PHASES, SolarPhase, getPhaseFromHour } from "@/lib/useAstronomicalTheme";
import {
  X,
  Sliders,
  Sparkles,
  Sun,
  Moon,
  Layers,
  Activity,
  Maximize2,
  Atom,
  RotateCw,
  Compass,
  CheckCircle2,
} from "lucide-react";

interface SpecimenMaterial {
  id: string;
  name: string;
  category: string;
  spectralLine: string;
  nominalWavelength: number; // nm
  refractiveIndex: number;
  absorptionLines: number[]; // nm dark bands
  color: string;
  glow: string;
  description: string;
  telemetry: {
    framework: string;
    efficiency: string;
    throughput: string;
    stack: string[];
  };
}

const SPECIMENS: SpecimenMaterial[] = [
  {
    id: "specimen-ai",
    name: "SPECIMEN A: VISION & AI INFERENCE",
    category: "AI / COMPUTER VISION",
    spectralLine: "F-LINE // H-β 486.1 nm",
    nominalWavelength: 486,
    refractiveIndex: 1.632,
    absorptionLines: [434, 486, 518],
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.4)",
    description:
      "High-index flint dispersion media. Tuned for deep convolutional visual feature extraction, YOLO real-time inference, and PyTorch mathematical models.",
    telemetry: {
      framework: "PyTorch, OpenCV, YOLO, Scikit-learn",
      efficiency: "99.4% Inference Fidelity",
      throughput: "60+ FPS Video Pipeline",
      stack: ["Spatial Vision", "Tensor Transforms", "Edge ML"],
    },
  },
  {
    id: "specimen-ui",
    name: "SPECIMEN B: REACT & NEXT.JS CORE",
    category: "FRONTEND ARCHITECTURE",
    spectralLine: "d-LINE // He 587.6 nm",
    nominalWavelength: 588,
    refractiveIndex: 1.517,
    absorptionLines: [588, 592],
    color: "#ef9a57",
    glow: "rgba(239, 154, 87, 0.4)",
    description:
      "Crown borosilicate matrix. Resonates at peak optical clarity. Fluid React 18 component composition, strict state orchestration, and responsive interfaces.",
    telemetry: {
      framework: "Next.js 14, React 18, TypeScript, Tailwind",
      efficiency: "100/100 Core Web Vitals",
      throughput: "Zero Layout Shift",
      stack: ["App Router", "Hooks & Context", "CSS Architecture"],
    },
  },
  {
    id: "specimen-gl",
    name: "SPECIMEN C: THREE.JS & CAUSTIC SHADERS",
    category: "CREATIVE COMPUTATION",
    spectralLine: "C-LINE // H-α 656.3 nm",
    nominalWavelength: 656,
    refractiveIndex: 1.574,
    absorptionLines: [620, 656, 680],
    color: "#f87171",
    glow: "rgba(248, 113, 113, 0.4)",
    description:
      "Birefringent crystalline quartz. High chromatic splitting. Real-time GLSL fragment shaders, domain-warped caustics, and GSAP micro-animations.",
    telemetry: {
      framework: "Three.js, WebGL 1.0/2.0, GLSL, GSAP",
      efficiency: "60 FPS Hardware Render",
      throughput: "GPU Domain Warping",
      stack: ["Caustic Shaders", "Ray Tracing", "3D Projection"],
    },
  },
  {
    id: "specimen-sys",
    name: "SPECIMEN D: DISTRIBUTED SYSTEMS & CI",
    category: "SYSTEM INFRASTRUCTURE",
    spectralLine: "INFRA-RED // 720.0 nm",
    nominalWavelength: 720,
    refractiveIndex: 1.486,
    absorptionLines: [710, 720, 760],
    color: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.4)",
    description:
      "High thermal capacity silica. Containerized Docker microservices, robust RESTful APIs, Git workflows, and automated deployment telemetry.",
    telemetry: {
      framework: "Docker, Python, Git CI/CD, Linux CLI",
      efficiency: "Deterministic Reproducibility",
      throughput: "Hermetic Builds",
      stack: ["Containerization", "Automated CI", "API Routing"],
    },
  },
];

export default function OpticalLabModal() {
  const {
    opticalLabOpen,
    closeOpticalLab,
    labInitialTab,
    astronomy,
    playClick,
    playChime,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<LabTab>(labInitialTab);

  // Sync tab with initial prop on open
  useEffect(() => {
    if (opticalLabOpen) {
      setActiveTab(labInitialTab);
    }
  }, [opticalLabOpen, labInitialTab]);

  // Handle ESC key to close
  useEffect(() => {
    if (!opticalLabOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOpticalLab();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [opticalLabOpen, closeOpticalLab]);

  // Tab 1: Spectrometer state
  const [selectedSpecimen, setSelectedSpecimen] = useState<SpecimenMaterial>(SPECIMENS[0]);
  const [probeWavelength, setProbeWavelength] = useState<number>(486);
  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);

  // Tab 2: Polarizer state
  const [polarizerAngle, setPolarizerAngle] = useState<number>(0); // 0 to 90 degrees
  const [mechanicalStress, setMechanicalStress] = useState<number>(45); // MPa
  const birefringenceCanvasRef = useRef<HTMLCanvasElement>(null);

  // Tab 3: Interferometer state
  const [slitSeparation, setSlitSeparation] = useState<number>(0.24); // mm
  const [screenDistance, setScreenDistance] = useState<number>(1.8); // meters
  const [laserWavelength, setLaserWavelength] = useState<number>(532); // nm (green)
  const fringeCanvasRef = useRef<HTMLCanvasElement>(null);

  // -------------------------------------------------------------
  // EXPERIMENT 01: SPECTROMETER SPECTRUM CANVAS RENDER
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== "spectrometer" || !opticalLabOpen) return;
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 140);

    // Background
    ctx.fillStyle = "#040508";
    ctx.fillRect(0, 0, width, height);

    // Top: Continuous Reference Spectrum (380nm - 750nm)
    const topBarHeight = 36;
    for (let x = 0; x < width; x++) {
      const lambda = 380 + (x / width) * (750 - 380);
      ctx.fillStyle = wavelengthToRGB(lambda, 1.0);
      ctx.fillRect(x, 8, 1, topBarHeight);
    }

    // Label Top Bar
    ctx.font = "9px monospace";
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.fillText("INCIDENT CONTINUOUS SPECTRUM [380nm - 750nm]", 10, 22);

    // Bottom: Material Absorption Spectrum (with dark Fraunhofer lines)
    const bottomBarY = 62;
    const bottomBarHeight = 44;

    for (let x = 0; x < width; x++) {
      const lambda = 380 + (x / width) * (750 - 380);

      // Check distance to absorption lines of selected specimen
      let absorption = 0;
      for (const line of selectedSpecimen.absorptionLines) {
        const dist = Math.abs(lambda - line);
        if (dist < 12) {
          absorption += Math.exp(-(dist * dist) / 18);
        }
      }
      absorption = Math.min(1.0, absorption);
      const transmission = Math.max(0.04, 1.0 - absorption * 0.94);

      ctx.fillStyle = wavelengthToRGB(lambda, transmission);
      ctx.fillRect(x, bottomBarY, 1, bottomBarHeight);
    }

    // Draw Fraunhofer Absorption Line Markers
    for (const line of selectedSpecimen.absorptionLines) {
      const x = ((line - 380) / (750 - 380)) * width;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, bottomBarY);
      ctx.lineTo(x, bottomBarY + bottomBarHeight + 16);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#ffffff";
      ctx.font = "8px monospace";
      ctx.fillText(`${line}nm`, Math.max(4, x - 12), bottomBarY + bottomBarHeight + 24);
    }

    // Draw active probe position
    const probeX = ((probeWavelength - 380) / (750 - 380)) * width;
    ctx.strokeStyle = "#ef9a57";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(probeX, 4);
    ctx.lineTo(probeX, height - 6);
    ctx.stroke();

    // Probe marker pin
    ctx.fillStyle = "#ef9a57";
    ctx.beginPath();
    ctx.arc(probeX, height - 6, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [activeTab, opticalLabOpen, selectedSpecimen, probeWavelength]);

  // -------------------------------------------------------------
  // EXPERIMENT 02: MALUS' LAW & BIREFRINGENCE CANVAS RENDER
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== "polarizer" || !opticalLabOpen) return;
    const canvas = birefringenceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    const height = (canvas.height = 220);

    const rad = (polarizerAngle * Math.PI) / 180;
    // Malus transmission factor
    const cos2 = Math.cos(rad) * Math.cos(rad);
    // Crossed polarizer reveals stress birefringence
    const crossedFactor = Math.sin(rad) * Math.sin(rad);

    ctx.fillStyle = "#050609";
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Draw simulated photoelastic specimen shard
    const shardWidth = Math.min(width * 0.75, 340);
    const shardHeight = 130;
    const startX = centerX - shardWidth / 2;
    const startY = centerY - shardHeight / 2;

    // Photoelastic Stress Fringes (Isochromatics)
    const imgData = ctx.createImageData(shardWidth, shardHeight);
    const data = imgData.data;

    const stressScale = mechanicalStress / 50;

    for (let y = 0; y < shardHeight; y++) {
      for (let x = 0; x < shardWidth; x++) {
        const nx = (x / shardWidth) * 2 - 1;
        const ny = (y / shardHeight) * 2 - 1;

        // Mathematical stress tensor distribution around simulated notch
        const r = Math.sqrt(nx * nx + ny * ny) + 0.1;
        const theta = Math.atan2(ny, nx);
        const stress = (stressScale / r) * (1 + 0.5 * Math.sin(theta * 3));

        // Retardation phase shift delta = 2*pi * t * C * (sigma1 - sigma2) / lambda
        const delta = stress * Math.PI * 3.5;

        // Rainbow spectral fringes under crossed polarizers
        const redIntensity = Math.pow(Math.sin(delta * 0.8), 2);
        const greenIntensity = Math.pow(Math.sin(delta * 1.0), 2);
        const blueIntensity = Math.pow(Math.sin(delta * 1.3), 2);

        // Blend with white light parallel transmission
        const rColor = Math.min(255, (220 * cos2 + redIntensity * crossedFactor * 240));
        const gColor = Math.min(255, (225 * cos2 + greenIntensity * crossedFactor * 240));
        const bColor = Math.min(255, (230 * cos2 + blueIntensity * crossedFactor * 255));

        const pixelIdx = (y * shardWidth + x) * 4;
        data[pixelIdx] = rColor;
        data[pixelIdx + 1] = gColor;
        data[pixelIdx + 2] = bColor;
        data[pixelIdx + 3] = 230;
      }
    }

    ctx.putImageData(imgData, startX, startY);

    // Draw Glass Shard Border with Bevel Highlight
    ctx.strokeStyle = "rgba(220, 230, 240, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(startX, startY, shardWidth, shardHeight);

    // Overlay polarizer crosshair markings
    ctx.strokeStyle = `rgba(239, 154, 87, ${0.3 + crossedFactor * 0.5})`;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(centerX, startY - 10);
    ctx.lineTo(centerX, startY + shardHeight + 10);
    ctx.moveTo(startX - 10, centerY);
    ctx.lineTo(startX + shardWidth + 10, centerY);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [activeTab, opticalLabOpen, polarizerAngle, mechanicalStress]);

  // -------------------------------------------------------------
  // EXPERIMENT 03: DOUBLE-SLIT INTERFERENCE CANVAS RENDER
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== "interferometer" || !opticalLabOpen) return;
    const canvas = fringeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    const height = (canvas.height = 180);

    ctx.fillStyle = "#040508";
    ctx.fillRect(0, 0, width, height);

    const lambda_m = laserWavelength * 1e-9;
    const d_m = slitSeparation * 1e-3;
    const L_m = screenDistance;

    // Interference Fringe Pattern Intensity: I(y) = I_0 * cos^2(pi * d * y / (lambda * L)) * sinc^2(pi * a * y / (lambda * L))
    const slitWidth_a = 0.04e-3;
    const scaleFactor = 0.00015; // screen coordinate scaling

    const baseColor = wavelengthToRgbTuple(laserWavelength);

    // Draw Intensity Graph in upper half
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`;
    ctx.lineWidth = 1.8;

    for (let x = 0; x < width; x++) {
      const y_screen = (x - width / 2) * scaleFactor;
      const beta = (Math.PI * d_m * y_screen) / (lambda_m * L_m);
      const alpha = (Math.PI * slitWidth_a * y_screen) / (lambda_m * L_m);

      const interference = Math.pow(Math.cos(beta), 2);
      const diffraction = alpha === 0 ? 1 : Math.pow(Math.sin(alpha) / alpha, 2);
      const intensity = interference * diffraction;

      const graphY = 85 - intensity * 70;
      if (x === 0) ctx.moveTo(x, graphY);
      else ctx.lineTo(x, graphY);
    }
    ctx.stroke();

    // Draw Fringe Screen in lower half
    const screenY = 110;
    const screenH = 50;

    for (let x = 0; x < width; x++) {
      const y_screen = (x - width / 2) * scaleFactor;
      const beta = (Math.PI * d_m * y_screen) / (lambda_m * L_m);
      const alpha = (Math.PI * slitWidth_a * y_screen) / (lambda_m * L_m);

      const interference = Math.pow(Math.cos(beta), 2);
      const diffraction = alpha === 0 ? 1 : Math.pow(Math.sin(alpha) / alpha, 2);
      const intensity = Math.max(0, Math.min(1, interference * diffraction));

      ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${intensity * 0.95})`;
      ctx.fillRect(x, screenY, 1, screenH);
    }

    // Grid baseline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 85);
    ctx.lineTo(width, 85);
    ctx.stroke();
  }, [activeTab, opticalLabOpen, slitSeparation, screenDistance, laserWavelength]);

  // Derived calculations for telemetry
  const malusIntensity = useMemo(() => {
    const rad = (polarizerAngle * Math.PI) / 180;
    return Math.pow(Math.cos(rad), 2);
  }, [polarizerAngle]);

  const probeEnergyEv = useMemo(() => {
    // E = hc / lambda => (1239.84 / lambda_nm) eV
    return (1239.8419 / probeWavelength).toFixed(3);
  }, [probeWavelength]);

  const probeAbsorption = useMemo(() => {
    let abs = 0;
    for (const line of selectedSpecimen.absorptionLines) {
      const dist = Math.abs(probeWavelength - line);
      if (dist < 12) {
        abs += Math.exp(-(dist * dist) / 18);
      }
    }
    return Math.min(1.0, abs);
  }, [probeWavelength, selectedSpecimen]);

  if (!opticalLabOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Optical Laboratory"
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
    >
      {/* Outer Lab Terminal Frame */}
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#07090e] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden font-sans text-white">
        {/* Top Control Bar / Oscilloscope Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0a0d14]">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef9a57] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-blue-500/40" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
            </div>
            <div className="flex items-baseline space-x-2">
              <h2 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#f2f4f7] uppercase">
                OPTICAL BENCH // LABORATORY SUITE
              </h2>
              <span className="hidden sm:inline font-mono text-[10px] text-white/40 tracking-wider">
                REFRACTIVE SPECIMEN EXPERIMENTS
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden md:inline font-mono text-[9px] text-[#ef9a57] border border-[#ef9a57]/30 px-2 py-0.5 rounded bg-[#ef9a57]/5 tracking-widest">
              MODE: QUANTUM OPTICS
            </span>
            <button
              onClick={closeOpticalLab}
              className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 text-white/60 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-[#ef9a57]"
              aria-label="Close optical lab"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 bg-[#06080d] px-3 sm:px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              playClick();
              setActiveTab("spectrometer");
            }}
            className={`flex items-center space-x-2 py-3 px-3 sm:px-4 font-mono text-[11px] tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === "spectrometer"
                ? "border-[#ef9a57] text-[#ef9a57] font-bold bg-[#ef9a57]/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>01. SPECTROMETER</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveTab("polarizer");
            }}
            className={`flex items-center space-x-2 py-3 px-3 sm:px-4 font-mono text-[11px] tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === "polarizer"
                ? "border-[#ef9a57] text-[#ef9a57] font-bold bg-[#ef9a57]/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>02. POLARIZER (MALUS)</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveTab("interferometer");
            }}
            className={`flex items-center space-x-2 py-3 px-3 sm:px-4 font-mono text-[11px] tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === "interferometer"
                ? "border-[#ef9a57] text-[#ef9a57] font-bold bg-[#ef9a57]/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>03. INTERFEROMETER</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setActiveTab("chrono");
            }}
            className={`flex items-center space-x-2 py-3 px-3 sm:px-4 font-mono text-[11px] tracking-wider border-b-2 transition-all whitespace-nowrap ${
              activeTab === "chrono"
                ? "border-[#ef9a57] text-[#ef9a57] font-bold bg-[#ef9a57]/5"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>04. CHRONO-OPTICS</span>
          </button>
        </div>

        {/* Experiment Workspace Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ========================================================= */}
          {/* TAB 01: SPECTROMETER & FRAUNHOFER ABSORPTION */}
          {/* ========================================================= */}
          {activeTab === "spectrometer" && (
            <div className="space-y-6">
              {/* Header description */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                    <span>Optical Emission & Absorption Spectrometer</span>
                  </h3>
                  <p className="text-xs text-white/60 font-mono">
                    Drag the probe across wavelengths to measure material absorption lines and extract proficiency metrics.
                  </p>
                </div>
                <div className="font-mono text-[10px] text-[#ef9a57] bg-[#ef9a57]/10 px-2.5 py-1 rounded border border-[#ef9a57]/20 self-start">
                  λ: {probeWavelength} nm // E: {probeEnergyEv} eV
                </div>
              </div>

              {/* Specimen Cuvette Selector */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                  SELECT TARGET SKILL CUVETTE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {SPECIMENS.map((specimen) => {
                    const isSelected = selectedSpecimen.id === specimen.id;
                    return (
                      <button
                        key={specimen.id}
                        onClick={() => {
                          playClick();
                          setSelectedSpecimen(specimen);
                          setProbeWavelength(specimen.nominalWavelength);
                        }}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "border-[#ef9a57] bg-[#ef9a57]/10 shadow-[0_0_20px_rgba(239,154,87,0.15)]"
                            : "border-white/10 bg-[#0d1017] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: specimen.color }}
                          />
                          <span className="font-mono text-[9px] text-white/40">
                            n = {specimen.refractiveIndex}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] font-bold text-white truncate">
                          {specimen.category}
                        </div>
                        <div className="font-mono text-[9px] text-white/50 mt-0.5">
                          {specimen.spectralLine}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spectrogram Canvas Display */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
                  <span>SPECTRAL RADIOMETER VIEW // TRANSMISSION THROUGH {selectedSpecimen.category}</span>
                  <span className="text-[#ef9a57]">FRAUNHOFER ABSORPTION BANDS (DARK SLITS)</span>
                </div>
                <div className="w-full rounded-xl border border-white/10 p-2 bg-[#040508] shadow-inner overflow-hidden">
                  <canvas ref={spectrumCanvasRef} className="w-full block" />
                </div>
              </div>

              {/* Interactive Wavelength Probe Slider */}
              <div className="space-y-2 bg-[#0d1017] p-4 rounded-xl border border-white/10">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white/70">WAVELENGTH COLLIMATOR SCRUBBER:</span>
                  <span className="text-[#ef9a57] font-bold tabular-nums">
                    {probeWavelength} nm (
                    {probeWavelength < 450
                      ? "Violet"
                      : probeWavelength < 495
                      ? "Cyan/Blue"
                      : probeWavelength < 570
                      ? "Green"
                      : probeWavelength < 590
                      ? "Amber"
                      : probeWavelength < 620
                      ? "Orange"
                      : "Red"}
                    )
                  </span>
                </div>
                <input
                  type="range"
                  min="380"
                  max="750"
                  value={probeWavelength}
                  onChange={(e) => setProbeWavelength(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ef9a57]"
                />
                <div className="flex justify-between font-mono text-[9px] text-white/30">
                  <span>380 nm (Near-UV)</span>
                  <span>550 nm (Peak Eye Sensitivity)</span>
                  <span>750 nm (Near-IR)</span>
                </div>
              </div>

              {/* Telemetry Readout Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 font-mono space-y-1">
                  <span className="text-[9px] text-white/40 uppercase">Photon Energy</span>
                  <div className="text-lg font-bold text-white tabular-nums">
                    {probeEnergyEv} <span className="text-xs text-white/50">eV</span>
                  </div>
                  <span className="text-[9px] text-white/40 block">hν = hc / λ</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 font-mono space-y-1">
                  <span className="text-[9px] text-white/40 uppercase">Optical Density</span>
                  <div className="text-lg font-bold text-[#ef9a57] tabular-nums">
                    {(probeAbsorption * 2.4).toFixed(3)} <span className="text-xs text-white/50">OD</span>
                  </div>
                  <span className="text-[9px] text-white/40 block">
                    Transmission: {((1 - probeAbsorption * 0.94) * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 font-mono space-y-1">
                  <span className="text-[9px] text-white/40 uppercase">Refractive Index</span>
                  <div className="text-lg font-bold text-blue-400 tabular-nums">
                    {selectedSpecimen.refractiveIndex}{" "}
                    <span className="text-xs text-white/50">n_d</span>
                  </div>
                  <span className="text-[9px] text-white/40 block">{selectedSpecimen.telemetry.efficiency}</span>
                </div>
              </div>

              {/* Material Dossier */}
              <div className="p-4 rounded-xl bg-[#090b10] border border-white/10 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-white/50 border-b border-white/5 pb-2">
                  <span>SPECIMEN DOSSIER: {selectedSpecimen.name}</span>
                  <span className="text-[#ef9a57]">{selectedSpecimen.telemetry.throughput}</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {selectedSpecimen.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[9px]">
                  {selectedSpecimen.telemetry.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {selectedSpecimen.telemetry.framework}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 02: POLARIZER & PHOTOELASTIC BIREFRINGENCE */}
          {/* ========================================================= */}
          {activeTab === "polarizer" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                    <span>Malus' Law & Stress Birefringence</span>
                  </h3>
                  <p className="text-xs text-white/60 font-mono">
                    Rotate the optical analyzer filter. At 0° see the polished UI surface; at 90° (crossed polarizers) photoelastic stress reveals the underlying architectural tensors.
                  </p>
                </div>
                <div className="font-mono text-[10px] text-[#ef9a57] bg-[#ef9a57]/10 px-2.5 py-1 rounded border border-[#ef9a57]/20 self-start">
                  I = I₀ cos²({polarizerAngle}°) = {(malusIntensity * 100).toFixed(1)}%
                </div>
              </div>

              {/* Birefringence Display */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
                  <span>PHOTOELASTIC SPECIMEN UNDER POLARIZED FIELD</span>
                  <span className="text-[#ef9a57]">
                    {polarizerAngle > 60
                      ? "CROSSED POLARIZERS // DEEP CODE ARCHITECTURE"
                      : "PARALLEL POLARIZERS // VISUAL USER INTERFACE"}
                  </span>
                </div>
                <div className="w-full rounded-xl border border-white/10 p-2 bg-[#040508] shadow-inner flex items-center justify-center">
                  <canvas ref={birefringenceCanvasRef} className="w-full block" />
                </div>
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Polarizer Angle Dial */}
                <div className="p-4 rounded-xl bg-[#0d1017] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white/70">ANALYZER FILTER ANGLE (θ):</span>
                    <span className="text-[#ef9a57] font-bold">{polarizerAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={polarizerAngle}
                    onChange={(e) => setPolarizerAngle(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ef9a57]"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-white/40">
                    <span>0° (Parallel: UI Layer)</span>
                    <span>45° (Mixed Dispersion)</span>
                    <span>90° (Crossed: AST Tensors)</span>
                  </div>
                </div>

                {/* Mechanical Stress Load */}
                <div className="p-4 rounded-xl bg-[#0d1017] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white/70">MECHANICAL STRAIN LOAD:</span>
                    <span className="text-blue-400 font-bold">{mechanicalStress} MPa</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={mechanicalStress}
                    onChange={(e) => setMechanicalStress(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-white/40">
                    <span>10 MPa (Nominal)</span>
                    <span>50 MPa (Standard Yield)</span>
                    <span>100 MPa (Critical Shear)</span>
                  </div>
                </div>
              </div>

              {/* Birefringence Reveal Explainer */}
              <div className="p-4 rounded-xl bg-[#090b10] border border-white/10 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-white/50 border-b border-white/5 pb-2">
                  <span>OPTICAL PRINCIPLE // MALUS & BREWSTER ANGLE</span>
                  <span className="text-[#ef9a57]">PHOTOELASTICITY COEFFICIENT C = 3.5×10⁻¹² Pa⁻¹</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {polarizerAngle > 60 ? (
                    <span className="text-amber-200">
                      <strong>Crossed Polarization Active:</strong> By blocking direct specular rays, internal photoelastic stress fields illuminate. In software engineering, this mirrors looking past visual typography to inspect the stress tensors: WebGL draw calls, React fiber reconciliation trees, and Python memory allocation.
                    </span>
                  ) : (
                    <span>
                      <strong>Direct Transmission Active:</strong> High-fidelity frontend design layer. Fluid component ergonomics, accessible WCAG contrast compliance, and tactile typography crafted to feel effortless to users.
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 03: INTERFEROMETER (YOUNG'S DOUBLE-SLIT) */}
          {/* ========================================================= */}
          {activeTab === "interferometer" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                    <span>Young&apos;s Double-Slit Optical Interferometer</span>
                  </h3>
                  <p className="text-xs text-white/60 font-mono">
                    Wave superposition simulator demonstrating how frontend precision and AI computer vision combine into constructive interference.
                  </p>
                </div>
                <div className="font-mono text-[10px] text-[#ef9a57] bg-[#ef9a57]/10 px-2.5 py-1 rounded border border-[#ef9a57]/20 self-start">
                  FRINGE SPACING Δy = {((laserWavelength * 1e-6 * screenDistance) / slitSeparation).toFixed(2)} mm
                </div>
              </div>

              {/* Fringe Canvas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
                  <span>COHERENT LASER INTERFERENCE PROFILE & SCREEN FRINGES</span>
                  <span className="text-[#ef9a57]">I(y) = I₀ cos²(π d y / λ L) sinc²(π a y / λ L)</span>
                </div>
                <div className="w-full rounded-xl border border-white/10 p-2 bg-[#040508] shadow-inner">
                  <canvas ref={fringeCanvasRef} className="w-full block" />
                </div>
              </div>

              {/* Control Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Wavelength */}
                <div className="p-3.5 rounded-xl bg-[#0d1017] border border-white/10 space-y-2">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-white/60">LASER λ:</span>
                    <span className="text-[#ef9a57] font-bold">{laserWavelength} nm</span>
                  </div>
                  <input
                    type="range"
                    min="405"
                    max="680"
                    value={laserWavelength}
                    onChange={(e) => setLaserWavelength(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ef9a57]"
                  />
                  <span className="font-mono text-[9px] text-white/30 block">
                    405nm (Violet) - 680nm (He-Ne Red)
                  </span>
                </div>

                {/* Slit Distance */}
                <div className="p-3.5 rounded-xl bg-[#0d1017] border border-white/10 space-y-2">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-white/60">SLIT SPACING (d):</span>
                    <span className="text-blue-400 font-bold">{slitSeparation} mm</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="0.50"
                    step="0.01"
                    value={slitSeparation}
                    onChange={(e) => setSlitSeparation(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                  />
                  <span className="font-mono text-[9px] text-white/30 block">
                    Narrower spacing = wider fringes
                  </span>
                </div>

                {/* Screen Distance */}
                <div className="p-3.5 rounded-xl bg-[#0d1017] border border-white/10 space-y-2">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-white/60">SCREEN DIST (L):</span>
                    <span className="text-emerald-400 font-bold">{screenDistance} m</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.1"
                    value={screenDistance}
                    onChange={(e) => setScreenDistance(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <span className="font-mono text-[9px] text-white/30 block">
                    Optical bench projection distance
                  </span>
                </div>
              </div>

              {/* Synergy Insight */}
              <div className="p-4 rounded-xl bg-[#090b10] border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                <div className="flex items-center space-x-2 font-mono text-[10px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase">CONSTRUCTIVE INTERFERENCE // SYNERGY MATRIX</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  Just as two coherent wave crests combine to produce fourfold light intensity ($I = 4 I_0$), the intersection of <strong>Frontend Craft</strong> (React, Three.js) and <strong>Machine Learning</strong> (Computer Vision, Spatial Tracking) produces solutions that are far more capable than either discipline in isolation.
                </p>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 04: CHRONO-OPTICS (REAL-TIME ENVIRONMENTAL ENGINE) */}
          {/* ========================================================= */}
          {activeTab === "chrono" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
                    <span>Chrono-Optics & Astronomical Lighting Engine</span>
                  </h3>
                  <p className="text-xs text-white/60 font-mono">
                    Real-time solar calibration. Dynamically shifts WebGL caustic shaders, CSS glow tokens, and ambient Rayleigh scattering to match the visitor&apos;s local hour.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => astronomy.setAutoSync(!astronomy.isAutoSync)}
                    className={`font-mono text-[10px] px-3 py-1 rounded-full border transition-all ${
                      astronomy.isAutoSync
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                        : "border-white/20 bg-white/5 text-white/50"
                    }`}
                  >
                    {astronomy.isAutoSync ? "● AUTO SYNCED (LOCAL TIME)" : "○ MANUAL CALIBRATION"}
                  </button>
                </div>
              </div>

              {/* Active Solar Status Banner */}
              <div
                className="p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{
                  backgroundColor: "rgba(10, 14, 22, 0.75)",
                  borderColor: astronomy.phaseConfig.borderHex,
                  boxShadow: `0 10px 40px ${astronomy.phaseConfig.glowHex}`,
                }}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-white/20"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  >
                    {astronomy.phaseConfig.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-white/40 tracking-wider">
                      ACTIVE ASTRONOMICAL SOLAR PHASE
                    </div>
                    <div className="text-lg font-black tracking-tight" style={{ color: astronomy.phaseConfig.ambientHex }}>
                      {astronomy.phaseConfig.label}
                    </div>
                    <div className="text-xs text-white/60 font-sans">
                      {astronomy.phaseConfig.description}
                    </div>
                  </div>
                </div>

                <div className="font-mono text-right sm:border-l sm:border-white/10 sm:pl-6 space-y-1">
                  <div className="text-2xl font-black text-white tabular-nums">
                    {Math.floor(astronomy.currentHour).toString().padStart(2, "0")}:
                    {Math.floor((astronomy.currentHour % 1) * 60)
                      .toString()
                      .padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-white/40 uppercase">
                    Solar Window: {astronomy.phaseConfig.hourRange}
                  </div>
                </div>
              </div>

              {/* 24-Hour Solar Scrubber Slider */}
              <div className="space-y-3 p-4 rounded-xl bg-[#0d1017] border border-white/10">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-white/70">SCRUB 24-HOUR SOLAR TIMELINE:</span>
                  <span className="text-[#ef9a57] font-bold tabular-nums">
                    Hour {astronomy.currentHour.toFixed(1)} / 24.0
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23.9"
                  step="0.1"
                  value={astronomy.currentHour}
                  onChange={(e) => astronomy.setHour(Number(e.target.value))}
                  className="w-full h-2.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#ef9a57]"
                />
                <div className="grid grid-cols-4 font-mono text-[9px] text-white/40 text-center pt-1">
                  <span>06:00 (Dawn)</span>
                  <span>12:00 (Noon)</span>
                  <span>18:00 (Golden Hour)</span>
                  <span>00:00 (Midnight)</span>
                </div>
              </div>

              {/* Solar Phase Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {(["dawn", "noon", "golden", "midnight"] as SolarPhase[]).map((phaseKey) => {
                  const cfg = SOLAR_PHASES[phaseKey];
                  const isCurrent = astronomy.solarPhase === phaseKey;
                  return (
                    <button
                      key={phaseKey}
                      onClick={() => {
                        playClick();
                        const hourMap: Record<SolarPhase, number> = {
                          dawn: 7,
                          noon: 13,
                          golden: 18.5,
                          midnight: 23,
                        };
                        astronomy.setHour(hourMap[phaseKey]);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? "border-[#ef9a57] bg-[#ef9a57]/10 shadow-[0_0_20px_rgba(239,154,87,0.15)]"
                          : "border-white/10 bg-[#090b10] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg">{cfg.icon}</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: cfg.ambientHex }}
                        />
                      </div>
                      <div className="font-mono text-xs font-bold text-white">{cfg.label}</div>
                      <div className="font-mono text-[9px] text-white/40 mt-0.5">{cfg.hourRange}</div>
                    </button>
                  );
                })}
              </div>

              {/* Environmental Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 space-y-1">
                  <span className="text-[9px] text-white/40 uppercase">Shader Caustic Tint</span>
                  <div className="text-sm font-bold text-white truncate">
                    RGB({astronomy.phaseConfig.causticTint.map((v) => Math.round(v * 255)).join(", ")})
                  </div>
                  <span className="text-[9px] text-white/40">Injected into WebGL fragment uniform</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 space-y-1">
                  <span className="text-[9px] text-white/40 uppercase">Rayleigh Index</span>
                  <div className="text-sm font-bold text-[#ef9a57]">
                    {astronomy.phaseConfig.rayleighIndex} × 10⁻⁴
                  </div>
                  <span className="text-[9px] text-white/40">Atmospheric optical scattering</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090b10] border border-white/10 space-y-1">
                  <span className="text-[9px] text-white/40 uppercase">Ambient Color Hex</span>
                  <div className="text-sm font-bold text-blue-400">
                    {astronomy.phaseConfig.ambientHex}
                  </div>
                  <span className="text-[9px] text-white/40">Live CSS Custom Property</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer / Quick Action Telemetry */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#06080d] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] text-white/50">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <Compass className="w-3 h-3 text-[#ef9a57]" />
              <span>CAUSTIC LAB ENGINE v2.4</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">100% CLIENT COMPUTE</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/40">PRESS ESC TO RETURN TO VIEWPORT</span>
            <button
              onClick={closeOpticalLab}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
            >
              CLOSE BENCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper to convert wavelength (nm) into RGBA CSS string.
 */
function wavelengthToRGB(wavelength: number, alpha: number = 1.0): string {
  const [r, g, b] = wavelengthToRgbTuple(wavelength);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Approximate wavelength (380 - 780 nm) to RGB tuple [0-255].
 */
function wavelengthToRgbTuple(wavelength: number): [number, number, number] {
  let r = 0;
  let g = 0;
  let b = 0;

  if (wavelength >= 380 && wavelength < 440) {
    r = -(wavelength - 440) / (440 - 380);
    g = 0.0;
    b = 1.0;
  } else if (wavelength >= 440 && wavelength < 490) {
    r = 0.0;
    g = (wavelength - 440) / (490 - 440);
    b = 1.0;
  } else if (wavelength >= 490 && wavelength < 510) {
    r = 0.0;
    g = 1.0;
    b = -(wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength < 580) {
    r = (wavelength - 510) / (580 - 510);
    g = 1.0;
    b = 0.0;
  } else if (wavelength >= 580 && wavelength < 645) {
    r = 1.0;
    g = -(wavelength - 645) / (645 - 580);
    b = 0.0;
  } else if (wavelength >= 645 && wavelength <= 780) {
    r = 1.0;
    g = 0.0;
    b = 0.0;
  }

  // Intensity falloff near limits
  let factor = 0.0;
  if (wavelength >= 380 && wavelength < 420) {
    factor = 0.3 + (0.7 * (wavelength - 380)) / (420 - 380);
  } else if (wavelength >= 420 && wavelength < 701) {
    factor = 1.0;
  } else if (wavelength >= 701 && wavelength <= 780) {
    factor = 0.3 + (0.7 * (780 - wavelength)) / (780 - 700);
  }

  return [
    Math.round(r * factor * 255),
    Math.round(g * factor * 255),
    Math.round(b * factor * 255),
  ];
}
