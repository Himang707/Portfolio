import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FAF7F0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Himang Panchal — Frontend Developer & AI/ML Enthusiast | Portfolio",
  description:
    "Personal portfolio of Himang Panchal, a Frontend Developer and AI/ML Enthusiast crafting top-notch web applications and computer vision tools.",
  keywords: [
    "Frontend Developer",
    "AI/ML Enthusiast",
    "Web Developer",
    "React",
    "Next.js",
    "Computer Vision",
    "Portfolio",
    "Himang Panchal",
  ],
  authors: [{ name: "Himang Panchal" }],
  creator: "Himang Panchal",
  openGraph: {
    title: "Himang Panchal — Frontend Developer & AI/ML Enthusiast",
    description:
      "Personal portfolio of Himang Panchal. Crafting top-notch web applications with bold typography, crisp outlines, and high-impact UX.",
    siteName: "Himang Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/hp-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF7F0] text-[#111111] font-space antialiased selection:bg-[#FFE57F] selection:text-black">
        {/* Skip to content link */}
        <a
          href="#portfolio"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#FFE57F] focus:text-black focus:border-2 focus:border-black focus:shadow-brutal focus:font-bold"
        >
          Skip to main content
        </a>

        {children}
      </body>
    </html>
  );
}
