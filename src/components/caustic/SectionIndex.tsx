"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";

interface SpecimenData {
  id: string;
  name: string;
  category: string;
  refraction: number;
  latency: string;
  dispersion: number;
  metric: string;
  status: string;
  geomType: "box" | "cylinder" | "octahedron" | "torus" | "dodecahedron" | "cone";
}

const SPECIMENS: SpecimenData[] = [
  {
    id: "react",
    name: "REACT // UI ARCHITECTURE",
    category: "Frontend & Responsive UI",
    refraction: 1.517,
    latency: "<16 ms",
    dispersion: 64.2,
    metric: "Component Design",
    status: "VERIFIED",
    geomType: "box",
  },
  {
    id: "python",
    name: "PYTHON // ML PIPELINES",
    category: "Core Language & Workflows",
    refraction: 1.544,
    latency: "<20 ms",
    dispersion: 45.8,
    metric: "Fast Data Engine",
    status: "PRODUCTION",
    geomType: "octahedron",
  },
  {
    id: "vision",
    name: "CV // COMPUTER VISION",
    category: "Image Processing & Models",
    refraction: 1.62,
    latency: "16.6 ms",
    dispersion: 36.3,
    metric: "Visual Inference",
    status: "DEPLOYED",
    geomType: "torus",
  },
  {
    id: "deeplearning",
    name: "TENSORFLOW & PYTORCH",
    category: "Deep Learning & NLP",
    refraction: 1.523,
    latency: "<40 ms",
    dispersion: 52.4,
    metric: "Neural Architecture",
    status: "TRAINED",
    geomType: "dodecahedron",
  },
  {
    id: "tailwind",
    name: "TAILWIND // DESIGN SYSTEM",
    category: "Modern CSS & Responsive UI",
    refraction: 1.485,
    latency: "<5 ms",
    dispersion: 58.1,
    metric: "Design Tokens",
    status: "VERIFIED",
    geomType: "cylinder",
  },
  {
    id: "sql",
    name: "SQL // RELATIONAL DATA",
    category: "Database & Storage",
    refraction: 1.702,
    latency: "<12 ms",
    dispersion: 29.5,
    metric: "ACID Transactions",
    status: "OPTIMIZED",
    geomType: "cone",
  },
];

export default function SectionIndex() {
  const [selected, setSelected] = useState<SpecimenData>(SPECIMENS[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(260, 260);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x141a24,
      metalness: 0.15,
      roughness: 0.1,
      transmission: 0.92,
      thickness: 1.5,
      ior: selected.refraction,
      specularColor: 0xef9a57,
      transparent: true,
      opacity: 0.9,
    });
    materialRef.current = material;

    // Default geometry: box
    const geom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Edge wireframe
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xdce6f0, transparent: true, opacity: 0.6 });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), edgeMat);
    mesh.add(edges);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(amb);

    const dir1 = new THREE.DirectionalLight(0xef9a57, 3.2);
    dir1.position.set(3, 4, 5);
    scene.add(dir1);

    const dir2 = new THREE.PointLight(0x7090b8, 2.0, 10);
    dir2.position.set(-4, -3, 2);
    scene.add(dir2);

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
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.008;
        meshRef.current.rotation.y += 0.012;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      renderer.dispose();
    };
  }, []);

  // Update geometry & IOR when selected changes
  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    materialRef.current.ior = selected.refraction;

    let newGeom: THREE.BufferGeometry;
    if (selected.geomType === "box") {
      newGeom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    } else if (selected.geomType === "torus") {
      newGeom = new THREE.TorusGeometry(1.0, 0.4, 16, 36);
    } else if (selected.geomType === "cylinder") {
      newGeom = new THREE.CylinderGeometry(0.9, 0.9, 1.7, 32);
    } else if (selected.geomType === "octahedron") {
      newGeom = new THREE.OctahedronGeometry(1.2, 0);
    } else if (selected.geomType === "dodecahedron") {
      newGeom = new THREE.DodecahedronGeometry(1.1, 0);
    } else {
      newGeom = new THREE.ConeGeometry(1.0, 1.8, 32);
    }

    meshRef.current.geometry.dispose();
    meshRef.current.geometry = newGeom;

    // Update edges
    while (meshRef.current.children.length > 0) {
      meshRef.current.remove(meshRef.current.children[0]);
    }
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xdce6f0,
      transparent: true,
      opacity: 0.6,
    });
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(newGeom), edgeMat);
    meshRef.current.add(edges);
  }, [selected]);

  return (
    <section
      id="index"
      role="region"
      aria-label="Technical telemetry table and 3D specimen viewer"
      className="relative py-28 px-6 sm:px-12 bg-[#050609] border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center space-x-3 font-mono text-[10px] tracking-precision text-white/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef9a57]" />
          <span>SECTION 04 // TECHNICAL INDEX TABLE</span>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#f2f4f7] uppercase leading-[1.05]">
              System Index.
              <span className="block text-white/40 font-light text-2xl sm:text-4xl">
                Refractive specs of each layer.
              </span>
            </h2>
            <p className="text-sm text-white/60 font-sans">
              Hover across the architectural strata to update the 3D optical specimen in real time. Numerical parameters use strict tabular alignment.
            </p>
          </div>

          {/* WebGL Specimen Viewer Box (#specIndex) */}
          <div
            id="specIndex"
            className="w-full sm:w-[280px] h-[280px] rounded-xl bg-[#090b10] border border-white/10 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex flex-col items-center justify-between relative group hover:border-[#ef9a57]/50 transition-colors"
          >
            <div className="w-full flex items-center justify-between font-mono text-[9px] text-white/40 tracking-precision border-b border-white/5 pb-1.5">
              <span>SPECIMEN VIEW</span>
              <span className="text-[#ef9a57] tabular-nums">n = {selected.refraction.toFixed(3)}</span>
            </div>

            <canvas ref={canvasRef} className="w-[200px] h-[200px] block" />

            <div className="w-full flex items-center justify-between font-mono text-[9px] text-white/60 tracking-wider">
              <span className="truncate max-w-[170px]">{selected.name}</span>
              <span className="text-[#ef9a57] font-bold">{selected.status}</span>
            </div>
          </div>
        </div>

        {/* Precision Interactive Table with Tabular Numbers */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#080a0f] shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0c0e14] text-[10px] tracking-precision text-white/40 uppercase">
                <th className="py-3.5 px-6">LAYER / ENGINE</th>
                <th className="py-3.5 px-4">DOMAIN</th>
                <th className="py-3.5 px-4 tabular-nums">INDEX (n)</th>
                <th className="py-3.5 px-4 tabular-nums">LATENCY</th>
                <th className="py-3.5 px-4 tabular-nums">DISPERSION (ν)</th>
                <th className="py-3.5 px-4">BENCHMARK</th>
                <th className="py-3.5 px-6 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {SPECIMENS.map((item) => {
                const isSelected = selected.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onMouseEnter={() => setSelected(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#141822] text-[#f2f4f7]"
                        : "hover:bg-white/[0.03] text-white/70"
                    }`}
                    data-cursor="VIEW"
                  >
                    <td className="py-4 px-6 font-bold flex items-center space-x-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-[#ef9a57] scale-125" : "bg-white/20"
                        } transition-all`}
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-4 px-4 text-white/50 text-[11px] font-sans">
                      {item.category}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#ef9a57] tabular-nums">
                      {item.refraction.toFixed(3)}
                    </td>
                    <td className="py-4 px-4 tabular-nums text-white/80">{item.latency}</td>
                    <td className="py-4 px-4 tabular-nums text-white/60">{item.dispersion}</td>
                    <td className="py-4 px-4 text-white/80 text-[11px]">{item.metric}</td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] tracking-wider bg-white/5 text-[#ef9a57] border border-[#ef9a57]/30">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
