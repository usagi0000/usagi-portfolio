"use client";

import { useEffect } from "react";

import { initChrome } from "@/lib/chrome";
import { initHanamori } from "@/lib/games/hanamori";
import { initNekoTabi } from "@/lib/games/neko-tabi";

// Runs the ported portfolio-game interactions once the page is mounted
// (hero tilt, scroll reveals, contact form, petting, both mini-games).
export function PortfolioScripts() {
  useEffect(() => {
    const cleanups = [initChrome(), initNekoTabi(), initHanamori()];
    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);
  return null;
}
