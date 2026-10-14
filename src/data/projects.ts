export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  image: string;
  stats: { label: string; value: string }[];
  features: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  status: "PRODUCTION" | "BETA" | "PROTOTYPE";
  date: string;
}

export const projects: Project[] = [
  {
    id: "relay",
    title: "RELAY",
    subtitle: "AI Document & Context Intelligence Platform",
    description: "AI-driven document context and vector intelligence platform.",
    longDescription:
      "Unifies scattered documentation into a real-time semantic knowledge graph with sub-120ms vector retrieval and hallucination-free citations.",
    tags: ["AI", "DOCUMENT MANAGEMENT", "FULL STACK"],
    category: "AI & Full Stack",
    image: "/projects/relay.svg",
    stats: [
      { label: "Search Latency", value: "<120ms" },
      { label: "Vector Precision", value: "98.4%" },
      { label: "Format Support", value: "15+ types" },
    ],
    features: [
      "Sub-120ms semantic search across PDFs, Markdown and APIs",
      "Real-time embeddings pipeline with vector similarity indexing",
      "Interactive knowledge topology graph for visual context tracing",
      "Cryptographically isolated multi-tenant workspaces",
    ],
    techStack: ["Next.js", "TypeScript", "Python", "FastAPI", "Vector DB", "Tailwind CSS"],
    liveUrl: "https://relay-intelligence.demo.app",
    githubUrl: "https://github.com/himangpanchal/relay-context-platform",
    featured: true,
    status: "PRODUCTION",
    date: "2026",
  },
  {
    id: "udayaan",
    title: "UDAYAAN",
    subtitle: "Immersive 3D Spatial Web Experience",
    description: "Interactive 3D spatial web engine with hardware-accelerated shaders.",
    longDescription:
      "Brings planar layouts into an interactive spatial dimension via native GLSL raymarching, audio-reactive particles, and fluid state machines.",
    tags: ["WEB", "UI/UX", "3D"],
    category: "Creative Tech & WebGL",
    image: "/projects/udayaan.svg",
    stats: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Shader Complexity", value: "GLSL Native" },
      { label: "Asset Footprint", value: "Optimized" },
    ],
    features: [
      "Native GLSL vertex & fragment shaders with dynamic mouse lighting",
      "Zero-layout-shift kinetic transitions locked at 60 FPS",
      "Procedural audio soundscapes tied to scroll milestones",
      "Accessible fallback adhering to reduced-motion preferences",
    ],
    techStack: ["React", "Three.js", "GLSL Shaders", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://udayaan-spatial.demo.app",
    githubUrl: "https://github.com/himangpanchal/udayaan-interactive-platform",
    featured: true,
    status: "PRODUCTION",
    date: "2026",
  },
  {
    id: "globetrotter",
    title: "GLOBETROTTER",
    subtitle: "Smart Travel Intelligence & Dynamic Discovery",
    description: "Dynamic travel discovery and geospatial itinerary routing engine.",
    longDescription:
      "Streamlines multi-city journeys via Dijkstra route graph optimization, PostGIS geospatial indexing, and real-time collaborative state.",
    tags: ["TRAVEL", "FULL STACK", "POSTGRESQL"],
    category: "Full Stack Platform",
    image: "/projects/globetrotter.svg",
    stats: [
      { label: "Route Optimizer", value: "Graph-based" },
      { label: "DB Engine", value: "PostgreSQL" },
      { label: "Sync Engine", value: "Realtime" },
    ],
    features: [
      "PostGIS geospatial radius queries and radius-based indexing",
      "Graph-optimized route planning with dynamic cost estimation",
      "Conflict-free collaborative itinerary sync across devices",
      "Offline-first state persistence with background reconciliation",
    ],
    techStack: ["Next.js", "Node.js", "Express", "PostgreSQL", "Prisma", "Tailwind CSS"],
    liveUrl: "https://globetrotter-travel.demo.app",
    githubUrl: "https://github.com/himangpanchal/globetrotter-travel-platform",
    featured: true,
    status: "PRODUCTION",
    date: "2025",
  },
];
