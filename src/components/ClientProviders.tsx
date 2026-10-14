"use client";

import React from "react";
import { PortfolioProvider } from "@/lib/PortfolioContext";
import KonamiVault from "@/components/caustic/KonamiVault";
import OpticalLabModal from "@/components/caustic/OpticalLabModal";
import PhotonTourOverlay from "@/components/caustic/PhotonTourOverlay";

/**
 * Client-side providers wrapper.
 * Separated from layout.tsx (server component) to enable
 * hooks and context in the provider tree.
 */
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioProvider>
      {/* Enhancement 4: Konami Code Easter Egg Vault */}
      <KonamiVault />
      {/* Interactive Optical Laboratory Bench Modal */}
      <OpticalLabModal />
      {/* Guided Narrative Photon's Journey Expedition */}
      <PhotonTourOverlay />
      {children}
    </PortfolioProvider>
  );
}
