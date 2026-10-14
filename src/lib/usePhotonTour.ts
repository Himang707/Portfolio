"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export interface TourStop {
  id: string;
  sectionId: string;
  number: string;
  phase: string;
  title: string;
  opticalLaw: string;
  wavelength: number; // nm
  colorHex: string;
  narrative: string;
  technicalHighlight: string;
  quote: string;
}

export const PHOTON_STOPS: TourStop[] = [
  {
    id: "prime",
    sectionId: "prime",
    number: "01",
    phase: "ORIGIN & COHERENT EMISSION",
    title: "The Initial Light Pulse",
    opticalLaw: "FERMAT'S PRINCIPLE OF LEAST TIME",
    wavelength: 550,
    colorHex: "#ef9a57",
    narrative:
      "Every great digital product begins with a singular impulse: to take complex, chaotic technical systems and distill them into an interface that feels completely natural and effortless.",
    technicalHighlight: "Next.js 14 App Router, WebGL glass shaders, fluid kinetic typography.",
    quote: "I build things that feel simple.",
  },
  {
    id: "fracture",
    sectionId: "fracture",
    number: "02",
    phase: "REFRACTION & INTERNAL STRAIN",
    title: "Fracturing the Superficial",
    opticalLaw: "SNELL'S LAW // n₁ sin(θ₁) = n₂ sin(θ₂)",
    wavelength: 486,
    colorHex: "#60a5fa",
    narrative:
      "When light penetrates optical glass, it reveals internal stresses. True engineering craft lies in rejecting bloated boilerplate in favor of architectural clarity, tactile micro-animations, and unyielding attention to detail.",
    technicalHighlight: "GSAP scroll orchestration, differential 3D shard parallax, high-DPI bevel highlights.",
    quote: "I care about the details — the way an interface moves.",
  },
  {
    id: "loupe",
    sectionId: "loupe",
    number: "03",
    phase: "SUB-PIXEL CHROMATIC MAGNIFICATION",
    title: "Examining at 3.5× Scale",
    opticalLaw: "ABBE DISPERSION NUMBER // V_d = 58.6",
    wavelength: 588,
    colorHex: "#ef9a57",
    narrative:
      "Software feels premium when the sub-pixel layer is immaculate. Inspecting typography curves, WCAG AA/AAA contrast ratios, and RGB chromatic aberration ensures the product holds up under intense user scrutiny.",
    technicalHighlight: "Custom SVG magnification optics, radial fringing shaders, mouse velocity tracking.",
    quote: "Nothing is hidden under real magnification.",
  },
  {
    id: "dispersion",
    sectionId: "dispersion",
    number: "05",
    phase: "SPECTRAL RAY SPLITTING",
    title: "One Framework is a Lie",
    opticalLaw: "CAUCHY DISPERSION // n(λ) = A + B/λ²",
    wavelength: 656,
    colorHex: "#f87171",
    narrative:
      "Like white light passing through crown glass, true capability cannot be reduced to a single tool. Competence divides into distinct, balanced wavelengths: AI/Computer Vision (486nm), Frontend Core (588nm), and Developer Systems (656nm).",
    technicalHighlight: "Vector ray-tracing geometry, Fraunhofer dark absorption bands, real-time spectrometer telemetry.",
    quote: "Real software mastery spans disciplines.",
  },
  {
    id: "assembly",
    sectionId: "assembly",
    number: "06",
    phase: "FOCAL CONVERGENCE & SYNERGY",
    title: "The 3D Lens Stack Assembly",
    opticalLaw: "THIN LENS FORMULA // 1/f = 1/d₀ + 1/dᵢ",
    wavelength: 532,
    colorHex: "#34d399",
    narrative:
      "Three distinct project elements (Relay, Udayaan, Globetrotter) arranged as optical lenses. As you scroll, the stack explodes along the optical axis, illustrating how computer vision models focus directly onto frontend spatial interfaces.",
    technicalHighlight: "Three.js MeshPhysicalMaterial, exploded view rigging, scroll-pinned axial separation.",
    quote: "Synergy occurs where spatial AI meets thoughtful UI.",
  },
  {
    id: "workbench",
    sectionId: "workbench",
    number: "08",
    phase: "PHYSICAL PROPERTY CALIBRATION",
    title: "The Material Laboratory",
    opticalLaw: "FRESNEL EQUATIONS & THIN-FILM INTERFERENCE",
    wavelength: 510,
    colorHex: "#38bdf8",
    narrative:
      "Engineering is empirical. Here, optical density, thin-film iridescence, and refractive indices are tuned in real-time, proving that visual polish is not decorative fluff—it is applied mathematical computation.",
    technicalHighlight: "Live WebGL uniform scrubbing, PBR shader iridescence, dynamic camera orbits.",
    quote: "Beauty is rigorous mathematics executed in real-time.",
  },
  {
    id: "caustics",
    sectionId: "caustics",
    number: "09",
    phase: "WAVE CYMATICS & CREED",
    title: "Refractive Light Waves",
    opticalLaw: "WAVE SUPERPOSITION // ∇²ψ = (1/c²) ∂²ψ/∂t²",
    wavelength: 460,
    colorHex: "#818cf8",
    narrative:
      "Light rippling through water focuses into natural caustics. Here, real-time GLSL mathematics reflect a fundamental career creed: not interested in building more meaningless noise, but building things that are better.",
    technicalHighlight: "WebGL 240x135 domain-warped caustic shader, audio-reactive cymatic modulation, solar grading.",
    quote: "Not interested in building more. Building better.",
  },
  {
    id: "anneal",
    sectionId: "anneal",
    number: "11",
    phase: "ANNEALING & FINAL TRANSMISSION",
    title: "The Unified Beam Departure",
    opticalLaw: "COHERENT LASER TRANSMISSION // T = 100%",
    wavelength: 588,
    colorHex: "#ef9a57",
    narrative:
      "The fractured glass fragments converge into a seamless, unbroken pane. The photon’s journey culminates in a permanent transmission beam—an open invitation to connect, collaborate, and build the future.",
    technicalHighlight: "Converging 3D glass geometry, refracting wordmark optics, direct email dispatch.",
    quote: "Ready to transmit. Let's create something extraordinary.",
  },
];

export interface PhotonTourState {
  isActive: boolean;
  currentIndex: number;
  currentStop: TourStop;
  isAutoPlay: boolean;
  startTour: (initialIndex?: number) => void;
  stopTour: () => void;
  nextStop: () => void;
  prevStop: () => void;
  goToStop: (index: number) => void;
  toggleAutoPlay: () => void;
}

/**
 * Photon's Journey: Guided Narrative Tour Hook.
 * Orchestrates cinematic waypoint navigation, smooth section scrolling,
 * and telemetric storytelling across the optical landscape.
 */
export function usePhotonTour(
  onStopChange?: (stop: TourStop) => void
): PhotonTourState {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);

  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToStop = useCallback((index: number) => {
    const stop = PHOTON_STOPS[index];
    if (!stop) return;

    const el = document.getElementById(stop.sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const goToStop = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(PHOTON_STOPS.length - 1, index));
      setCurrentIndex(clamped);
      scrollToStop(clamped);
      if (onStopChange) onStopChange(PHOTON_STOPS[clamped]);
    },
    [scrollToStop, onStopChange]
  );

  const startTour = useCallback(
    (initialIndex: number = 0) => {
      setIsActive(true);
      goToStop(initialIndex);
    },
    [goToStop]
  );

  const stopTour = useCallback(() => {
    setIsActive(false);
    setIsAutoPlay(false);
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
  }, []);

  const nextStop = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < PHOTON_STOPS.length - 1) {
        const next = prev + 1;
        scrollToStop(next);
        if (onStopChange) onStopChange(PHOTON_STOPS[next]);
        return next;
      } else {
        // End of tour
        return prev;
      }
    });
  }, [scrollToStop, onStopChange]);

  const prevStop = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        const next = prev - 1;
        scrollToStop(next);
        if (onStopChange) onStopChange(PHOTON_STOPS[next]);
        return next;
      }
      return prev;
    });
  }, [scrollToStop, onStopChange]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay((prev) => !prev);
  }, []);

  // Handle Autoplay timer
  useEffect(() => {
    if (!isActive || !isAutoPlay) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < PHOTON_STOPS.length - 1) {
          const next = prev + 1;
          scrollToStop(next);
          return next;
        } else {
          // Finish autoplay
          setIsAutoPlay(false);
          return prev;
        }
      });
    }, 6500); // 6.5s per narrative waypoint

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isActive, isAutoPlay, scrollToStop]);

  // Handle Keyboard shortcuts (ArrowRight, ArrowLeft, Escape)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stopTour();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextStop();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevStop();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, nextStop, prevStop, stopTour]);

  return {
    isActive,
    currentIndex,
    currentStop: PHOTON_STOPS[currentIndex],
    isAutoPlay,
    startTour,
    stopTour,
    nextStop,
    prevStop,
    goToStop,
    toggleAutoPlay,
  };
}
