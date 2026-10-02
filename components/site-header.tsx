"use client";

import Link from "next/link";
import { useEffect } from "react";

export function SiteHeader({ base = "" }: { base?: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const themeButton = document.querySelector(".theme-toggle");
    const label = themeButton?.querySelector("span");
    const syncThemeButton = () => {
      const isDark = root.dataset.theme === "dark";
      themeButton?.setAttribute("aria-pressed", String(isDark));
      themeButton?.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme",
      );
      if (label) label.textContent = isDark ? "\u2600" : "\u263E";
    };
    syncThemeButton();
    const onTheme = () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("usagi-theme", next);
      } catch {
        /* storage unavailable */
      }
      syncThemeButton();
    };
    themeButton?.addEventListener("click", onTheme);

    const menuButton = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");
    const menuLabel = menuButton?.querySelector("span");
    const onMenu = () => {
      const isOpen = menuButton?.getAttribute("aria-expanded") === "true";
      menuButton?.setAttribute("aria-expanded", String(!isOpen));
      menuButton?.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu",
      );
      if (menuLabel) menuLabel.textContent = isOpen ? "\u2630" : "\u00D7";
      primaryNav?.classList.toggle("is-open", !isOpen);
    };
    const onNavClick = (event: Event) => {
      if ((event.target as HTMLElement).closest("a")) {
        primaryNav?.classList.remove("is-open");
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.setAttribute("aria-label", "Open navigation menu");
        if (menuLabel) menuLabel.textContent = "\u2630";
      }
    };
    menuButton?.addEventListener("click", onMenu);
    primaryNav?.addEventListener("click", onNavClick);
    return () => {
      themeButton?.removeEventListener("click", onTheme);
      menuButton?.removeEventListener("click", onMenu);
      primaryNav?.removeEventListener("click", onNavClick);
    };
  }, []);

  return (
<header className="site-header" id="up">
<div className="nav-wrap">
<Link aria-label="Z.Sarra, back to top" className="wordmark" href={`${base}#up`}>
<span aria-hidden="true" className="brand-flower">✿</span>
<span>Z.Sarra</span>
</Link>
<nav aria-label="Primary navigation" className="nav-links" id="primary-nav">
<Link href={`${base}#education`}>Education</Link><Link href={`${base}#projects`}>Projects</Link>
<Link href={`${base}#experience`}>Experience</Link>
<Link href={`${base}#languages`}>Languages</Link>
<Link href={`${base}#Certification`}>Certification</Link>
<Link href={`${base}#skills`}>Skills</Link>
<Link href={`${base}#interest`}>Interest</Link>
<Link className="nav-contact" href={`${base}#foot`}>Contact</Link>
</nav>
<div className="nav-actions">
<button aria-label="Switch to dark theme" aria-pressed="false" className="theme-toggle" id="theme-toggle" title="Switch theme" type="button"><span aria-hidden="true">☾</span></button>
<button aria-controls="primary-nav" aria-expanded="false" aria-label="Open navigation menu" className="menu-toggle" id="menu-toggle" type="button"><span aria-hidden="true">☰</span></button>
</div>
</div>
</header>
  );
}
