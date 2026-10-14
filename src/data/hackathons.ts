export interface HackathonEntry {
  id: string;
  year: string;
  event: string;
  projectName: string;
  role: string;
  description: string;
  highlights: string[];
  tags: string[];
  award?: string;
  status: "COMPLETED" | "FINALIST" | "PARTICIPANT" | "PENDING" | "ONGOING";
}

export const hackathons: HackathonEntry[] = [
  {
    id: "iqoo-hackathon",
    year: "2026",
    event: "iQOO HACKATHON",
    projectName: "RELAY",
    role: "Full-Stack & AI Builder",
    description:
      "36-hour sprint competing in the iQOO Hackathon creating RELAY: sub-150ms vector clustering intelligence engine for technical documentation and pitching in qualifying rounds.",
    highlights: [
      "Shipped working MVP within 36-hour sprint window",
      "Sub-150ms real-time vector embeddings search pipeline",
      "Competed in round 1 qualifying pitch against national teams",
    ],
    tags: ["36-HOUR SPRINT", "VECTOR EMBEDDINGS", "FASTAPI", "NEXT.JS"],
    award: "⚡ Competed · Round 1 Pitch (Not Selected)",
    status: "PARTICIPANT",
  },
  {
    id: "smart-india-hackathon",
    year: "2026",
    event: "SMART INDIA HACKATHON (SIH 2026)",
    projectName: "NYAY SURAKSHA (SIH-2026)",
    role: "Full-Stack & Systems Lead",
    description:
      "Engineered and submitted Nyay Suraksha for Smart India Hackathon 2026 (Ministry of Home Affairs / NCRB) — digital legal document management platform with tamper-evident custody logging. Decision currently pending.",
    highlights: [
      "Submitted official project proposal & full technical architecture",
      "Tamper-evident custody verification & Next.js portal",
      "Currently under evaluation with jury — results pending",
    ],
    tags: ["SIH 2026 SUBMISSION", "MHA / NCRB", "FULL STACK", "FASTAPI"],
    award: "⏳ Project Submitted · Decision Pending",
    status: "PENDING",
  },
];
