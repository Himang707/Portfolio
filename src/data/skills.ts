export interface SkillItem {
  name: string;
  category: "frontend" | "ai_ml" | "languages" | "tools";
  description: string;
  level: "Advanced" | "Proficient" | "Exploring";
  iconName: string;
  tag: string;
}

export const skillCategories = [
  { id: "frontend", label: "FRONTEND", description: "React, HTML, CSS, Tailwind CSS, Responsive UI & component architecture." },
  { id: "ai_ml", label: "AI / ML & CV", description: "Scikit-learn, TensorFlow, PyTorch, Machine Learning, Deep Learning, NLP, Computer Vision." },
  { id: "languages", label: "LANGUAGES", description: "Python, SQL, JavaScript & core algorithmic paradigms." },
  { id: "tools", label: "TOOLS & OTHER", description: "Git, GitHub, Docker, Jupyter, API Integration & Computer Vision Applications." },
] as const;

export const skills: SkillItem[] = [
  // FRONTEND
  {
    name: "React",
    category: "frontend",
    description: "Component architecture, reactive state hooks, virtual DOM optimization & performant web applications.",
    level: "Advanced",
    iconName: "Atom",
    tag: "Core Library",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    description: "Utility-first design tokens, responsive grid & flexbox layouts, micro-interactions and dark themes.",
    level: "Advanced",
    iconName: "Palette",
    tag: "Design System",
  },
  {
    name: "HTML & CSS",
    category: "frontend",
    description: "Semantic markup, modern layout models, CSS animations, variables, and cross-browser visual fidelity.",
    level: "Advanced",
    iconName: "FileCode",
    tag: "Web Standards",
  },
  {
    name: "Responsive UI",
    category: "frontend",
    description: "Adaptive viewport scaling, mobile-first design, fluid typography, and touch ergonomics.",
    level: "Advanced",
    iconName: "Globe",
    tag: "User Experience",
  },

  // AI / ML
  {
    name: "Computer Vision",
    category: "ai_ml",
    description: "Image processing, spatial filtering, object detection, and visual embedding pipelines.",
    level: "Advanced",
    iconName: "Binary",
    tag: "Vision Systems",
  },
  {
    name: "Machine Learning",
    category: "ai_ml",
    description: "Feature engineering, predictive modeling, statistical learning, cross-validation, and metrics evaluation.",
    level: "Advanced",
    iconName: "Cpu",
    tag: "ML Core",
  },
  {
    name: "Scikit-learn",
    category: "ai_ml",
    description: "Classification, regression, clustering, dimensionality reduction, and reproducible ML pipelines.",
    level: "Advanced",
    iconName: "Server",
    tag: "Model Training",
  },
  {
    name: "TensorFlow",
    category: "ai_ml",
    description: "Neural network construction, computational graphs, tensor transformations, and model export.",
    level: "Proficient",
    iconName: "Layers",
    tag: "Deep Learning",
  },
  {
    name: "PyTorch",
    category: "ai_ml",
    description: "Dynamic computational graphs, autograd engine, GPU tensor acceleration, and deep model experimentation.",
    level: "Proficient",
    iconName: "Layers",
    tag: "Tensors & GPU",
  },
  {
    name: "Deep Learning & NLP",
    category: "ai_ml",
    description: "Multi-layer perceptrons, embeddings, sequence processing, and natural language understanding.",
    level: "Proficient",
    iconName: "Database",
    tag: "Neural Networks",
  },
  {
    name: "Computer Vision Applications",
    category: "ai_ml",
    description: "Real-world visual inspection, camera feeds, tracking, edge inferencing, and practical CV products.",
    level: "Advanced",
    iconName: "Binary",
    tag: "Practical CV",
  },

  // LANGUAGES
  {
    name: "Python",
    category: "languages",
    description: "Core scripting, data structures, scientific computing, automation, and backend API services.",
    level: "Advanced",
    iconName: "Code2",
    tag: "Primary Language",
  },
  {
    name: "JavaScript",
    category: "languages",
    description: "Modern ECMAScript, asynchronous promises, DOM manipulation, and dynamic client-side logic.",
    level: "Advanced",
    iconName: "Code2",
    tag: "Web Logic",
  },
  {
    name: "SQL",
    category: "languages",
    description: "Relational database schema modeling, complex query joins, data aggregation, and transactional integrity.",
    level: "Proficient",
    iconName: "Database",
    tag: "Data Querying",
  },

  // TOOLS & OTHER
  {
    name: "Git & GitHub",
    category: "tools",
    description: "Distributed version control, branch management, pull request review workflows, and GitHub Actions.",
    level: "Advanced",
    iconName: "GitBranch",
    tag: "Version Control",
  },
  {
    name: "Docker",
    category: "tools",
    description: "Containerized environments, Dockerfile build configs, multi-container orchestration, and reproducible runs.",
    level: "Proficient",
    iconName: "Server",
    tag: "Containers",
  },
  {
    name: "Jupyter",
    category: "tools",
    description: "Interactive data exploration, reproducible notebooks, algorithmic prototyping, and visual analytics.",
    level: "Advanced",
    iconName: "TerminalSquare",
    tag: "Notebooks",
  },
  {
    name: "API Integration",
    category: "tools",
    description: "RESTful architecture, asynchronous data fetching, payload parsing, status handling, and resilient error states.",
    level: "Advanced",
    iconName: "Server",
    tag: "Integration",
  },
];
