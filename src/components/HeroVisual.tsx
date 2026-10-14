"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Terminal, Shield, Zap, Cpu, Sparkles } from "lucide-react";

export default function HeroVisual() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [telemetryRot, setTelemetryRot] = useState({ x: "0.24", y: "0.58" });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Primary Core: Icosahedron Wireframe
    const icosahedronGeo = new THREE.IcosahedronGeometry(1.65, 1);
    const wireframeGeo = new THREE.WireframeGeometry(icosahedronGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.65,
      linewidth: 1.2,
    });
    const icosahedronLines = new THREE.LineSegments(wireframeGeo, lineMat);
    mainGroup.add(icosahedronLines);

    // Inner Core: Inverted Dodecahedron / Octahedron
    const innerGeo = new THREE.OctahedronGeometry(1.05, 0);
    const innerWire = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xF5D77F,
      transparent: true,
      opacity: 0.9,
    });
    const innerLines = new THREE.LineSegments(innerWire, innerMat);
    mainGroup.add(innerLines);

    // Center Core Light / Sphere
    const coreGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8C6D23,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Glowing Nodes at Vertices
    const nodePos = icosahedronGeo.attributes.position;
    const nodeGeo = new THREE.BufferGeometry();
    const nodeCoords: number[] = [];
    for (let i = 0; i < nodePos.count; i++) {
      nodeCoords.push(nodePos.getX(i), nodePos.getY(i), nodePos.getZ(i));
    }
    nodeGeo.setAttribute("position", new THREE.Float32BufferAttribute(nodeCoords, 3));

    // Custom circular particle canvas for texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 248, 220, 1)");
      grad.addColorStop(0.35, "rgba(212, 175, 55, 0.9)");
      grad.addColorStop(1, "rgba(140, 109, 35, 0)");
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const nodeMat = new THREE.PointsMaterial({
      color: 0xFBE7A1,
      size: 0.16,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    mainGroup.add(nodes);

    // Orbit Ring 1
    const ringGeo1 = new THREE.RingGeometry(2.35, 2.37, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xC5A059,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    // Orbit Ring 2
    const ringGeo2 = new THREE.RingGeometry(2.55, 2.57, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xE5B842,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // Outer orbiting particles
    const orbitCount = 80;
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPositions = new Float32Array(orbitCount * 3);
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 2.4 + (Math.random() - 0.5) * 0.4;
      orbitPositions[i * 3] = Math.cos(angle) * radius;
      orbitPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      orbitPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    orbitGeo.setAttribute("position", new THREE.BufferAttribute(orbitPositions, 3));
    const orbitPointsMat = new THREE.PointsMaterial({
      color: 0xF5D77F,
      size: 0.08,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const orbitParticles = new THREE.Points(orbitGeo, orbitPointsMat);
    mainGroup.add(orbitParticles);

    // Mouse movement state
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.45;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();
    let tickCount = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Smooth damped rotation towards mouse position
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Autonomous rotation
      icosahedronLines.rotation.y = elapsed * 0.18 + currentRotY;
      icosahedronLines.rotation.x = elapsed * 0.12 + currentRotX;

      nodes.rotation.y = icosahedronLines.rotation.y;
      nodes.rotation.x = icosahedronLines.rotation.x;

      innerLines.rotation.y = -elapsed * 0.22 + currentRotY;
      innerLines.rotation.z = elapsed * 0.15 + currentRotX;

      coreMesh.rotation.y = elapsed * 0.3;
      ring1.rotation.z = elapsed * 0.1;
      ring2.rotation.z = -elapsed * 0.12;

      orbitParticles.rotation.y = elapsed * 0.15;

      // Occasional HUD coordinate update for realism
      tickCount++;
      if (tickCount % 24 === 0) {
        setTelemetryRot({
          x: icosahedronLines.rotation.x.toFixed(2),
          y: icosahedronLines.rotation.y.toFixed(2),
        });
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Soft Ambient Radial Behind Object */}
      <div className="absolute inset-0 rounded-full bg-[#D4AF37]/15 blur-[90px] pointer-events-none" />

      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing"
        data-cursor="EXPLORE"
      />

      {/* Floating HUD Panel 1: Top-Left Diagnostic */}
      <div className="absolute -top-2 left-2 sm:left-4 z-20 bg-[#0D0B08]/90 border border-[#D4AF37]/35 rounded-lg p-2.5 backdrop-blur-md shadow-command-card text-[11px] font-mono pointer-events-none animate-float">
        <div className="flex items-center space-x-2 text-[#F5D77F] mb-1">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-bold tracking-wider text-[10px]">CORE_MATRIX // v3.4</span>
        </div>
        <div className="text-[#C5BCAB] text-[10px] space-y-0.5">
          <p>ROT_X: <span className="text-[#F5F2EB]">{telemetryRot.x} rad</span></p>
          <p>ROT_Y: <span className="text-[#F5F2EB]">{telemetryRot.y} rad</span></p>
          <p>NODES: <span className="text-[#F5D77F] font-semibold">32 ACTIVE</span></p>
        </div>
      </div>

      {/* Floating HUD Panel 2: Bottom-Right Code Snippet */}
      <div
        className="absolute -bottom-2 right-2 sm:right-4 z-20 bg-[#0D0B08]/90 border border-[#D4AF37]/35 rounded-lg p-3 backdrop-blur-md shadow-command-card text-[11px] font-mono pointer-events-none animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="flex items-center space-x-2 text-[#F5D77F] mb-1.5">
          <Zap className="w-3.5 h-3.5 text-[#F5D77F]" />
          <span className="font-bold text-[10px] tracking-wider text-[#E8D9B5]">FULLSTACK_KERNEL</span>
        </div>
        <p className="text-[#A89F8B] text-[10px] whitespace-nowrap">
          <span className="text-[#F5D77F]">const</span> engine = <span className="text-[#F5F2EB]">new CommandMesh</span>();
        </p>
        <div className="flex items-center justify-between mt-1 text-[9px] text-[#8C7E66]">
          <span>STATUS: SYNCED</span>
          <span className="text-[#F5D77F]">100% HEALTH</span>
        </div>
      </div>

      {/* Floating Pill: Bottom-Left Tech Label */}
      <div
        className="absolute bottom-16 -left-2 sm:left-0 z-20 bg-[#141009]/90 border border-[#D4AF37]/45 rounded-full px-3 py-1 backdrop-blur-md shadow-command-card flex items-center space-x-2 pointer-events-none animate-float"
        style={{ animationDelay: "3.5s" }}
      >
        <div className="w-2 h-2 rounded-full bg-[#F5D77F] animate-pulse" />
        <span className="text-[10px] font-mono font-medium text-[#FFF2CC]">AI • 3D • FULLSTACK</span>
      </div>

      {/* Corner Technical Crosshair Accents */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/45 pointer-events-none" />
      <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/45 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/45 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/45 pointer-events-none" />
    </div>
  );
}
