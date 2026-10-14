import { Project } from "./projects";

/**
 * Hidden / experimental projects revealed via Konami code easter egg.
 * These showcase learning journey, side projects, and prototypes
 * that don't fit the main flagship showcase but demonstrate depth.
 */
export const hiddenProjects: Project[] = [
  {
    id: "neuralcanvas",
    title: "NEURAL CANVAS",
    subtitle: "Real-Time AI Art Generation Pipeline",
    description: "Browser-based generative art engine powered by neural style transfer.",
    longDescription:
      "An experimental creative coding playground that renders real-time generative art using a custom neural style transfer pipeline. Users paint with gestures while AI transforms strokes into artistic styles — blending Impressionism, Cubism, and Abstract Expressionism in real-time on the GPU.",
    tags: ["GENERATIVE ART", "AI", "WEBGL"],
    category: "Experimental",
    image: "/projects/relay.svg",
    stats: [
      { label: "Render Mode", value: "GPU Native" },
      { label: "Style Models", value: "12 Styles" },
      { label: "Latency", value: "<50ms" },
    ],
    features: [
      "Real-time neural style transfer in the browser via ONNX Runtime",
      "Custom GLSL post-processing pipeline for painterly effects",
      "Gesture-based canvas interaction with pressure sensitivity",
      "Export to high-resolution PNG with embedded style metadata",
    ],
    techStack: ["WebGL", "ONNX", "Python", "PyTorch", "Canvas API"],
    liveUrl: "#",
    githubUrl: "https://github.com/himang707",
    featured: false,
    status: "PROTOTYPE",
    date: "2026",
  },
  {
    id: "opticalterm",
    title: "OPTICAL TERM",
    subtitle: "GPU-Accelerated Terminal Emulator Concept",
    description: "A terminal emulator with optical physics-inspired rendering.",
    longDescription:
      "A concept terminal emulator that renders text through a simulated optical lens stack — characters refract, defocus, and exhibit chromatic aberration based on cursor proximity. Built as an exploration of how developer tools could feel more alive and tactile.",
    tags: ["DEVELOPER TOOLS", "WEBGL", "EXPERIMENT"],
    category: "Developer Tools",
    image: "/projects/udayaan.svg",
    stats: [
      { label: "Render Engine", value: "WebGL 2.0" },
      { label: "Font System", value: "SDF Atlas" },
      { label: "Latency", value: "<8ms" },
    ],
    features: [
      "Signed Distance Field font rendering for infinite zoom clarity",
      "Per-character physics simulation (gravity, spring, decay)",
      "Chromatic aberration effect near cursor position",
      "Adaptive performance scaling based on terminal buffer size",
    ],
    techStack: ["WebGL 2.0", "GLSL", "TypeScript", "xterm.js", "Rust WASM"],
    liveUrl: "#",
    githubUrl: "https://github.com/himang707",
    featured: false,
    status: "PROTOTYPE",
    date: "2026",
  },
  {
    id: "seismic",
    title: "SEISMIC",
    subtitle: "Earthquake Data Visualization Dashboard",
    description: "Real-time seismograph data visualization with predictive modeling.",
    longDescription:
      "Processes USGS seismograph feeds into interactive 3D globe visualizations with temporal playback controls. Includes a lightweight ML model for aftershock probability estimation based on historical cluster analysis.",
    tags: ["DATA VIZ", "ML", "GEOSPATIAL"],
    category: "Data Science",
    image: "/projects/globetrotter.svg",
    stats: [
      { label: "Data Source", value: "USGS Live" },
      { label: "Update Rate", value: "30s Interval" },
      { label: "History", value: "30 Days" },
    ],
    features: [
      "3D globe visualization with real-time earthquake pin rendering",
      "Temporal playback slider for historical pattern analysis",
      "K-means clustering for aftershock probability zones",
      "WebSocket-driven live data feed from USGS API",
    ],
    techStack: ["D3.js", "Three.js", "Python", "Scikit-learn", "WebSocket"],
    liveUrl: "#",
    githubUrl: "https://github.com/himang707",
    featured: false,
    status: "PROTOTYPE",
    date: "2025",
  },
];
