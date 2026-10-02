// Ported from portfolio-game index.html (chrome script):
// hero tilt, scroll-reveal animations, contact mailto form.
// Menu + theme toggle live in components/site-header.tsx.

export function initChrome(): () => void {
  const cleanups: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(
    target: Window,
    type: K,
    listener: (event: WindowEventMap[K]) => void,
  ) => {
    target.addEventListener(type, listener);
    cleanups.push(() => target.removeEventListener(type, listener));
  };
  const onEl = <K extends keyof HTMLElementEventMap>(
    target: HTMLElement | null,
    type: K,
    listener: (event: HTMLElementEventMap[K]) => void,
  ) => {
    target?.addEventListener(type, listener);
    cleanups.push(() => target?.removeEventListener(type, listener));
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const hero = document.querySelector(".hero");
  const heroScene = document.getElementById("hero-scene");
  let tiltFrame = 0;

  const resetHeroTilt = () => {
    cancelAnimationFrame(tiltFrame);
    heroScene?.style.removeProperty("--tilt-x");
    heroScene?.style.removeProperty("--tilt-y");
  };

  if (hero instanceof HTMLElement && heroScene) {
    onEl(hero, "pointermove", (event) => {
      if (reducedMotion.matches || !finePointer.matches || !heroScene) return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      cancelAnimationFrame(tiltFrame);
      tiltFrame = requestAnimationFrame(() => {
        heroScene.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
        heroScene.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
      });
    });
    onEl(hero, "pointerleave", resetHeroTilt);
    const onMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) resetHeroTilt();
    };
    reducedMotion.addEventListener("change", onMotionChange);
    cleanups.push(() =>
      reducedMotion.removeEventListener("change", onMotionChange),
    );
  }

  let revealObserver: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const animatedElements = document.querySelectorAll<HTMLElement>(
      ".section-heading, .education-card, .language-card, .certification-intro, .certificate-card, .skill-tag, .interest-card, .contact-card",
    );
    animatedElements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
    });
    document.documentElement.classList.add("motion-ready");

    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    animatedElements.forEach((element) => revealObserver?.observe(element));
    const onRevealMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        revealObserver?.disconnect();
        document.documentElement.classList.remove("motion-ready");
      }
    };
    reducedMotion.addEventListener("change", onRevealMotionChange);
    cleanups.push(() => {
      reducedMotion.removeEventListener("change", onRevealMotionChange);
      revealObserver?.disconnect();
      document.documentElement.classList.remove("motion-ready");
    });
  }

  const form = document.getElementById("contact-form");
  onEl(form, "submit", (event) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLFormElement | null;
    if (!target) return;
    const formData = new FormData(target);
    const subject = String(formData.get("subject") || "Contact Me !");
    const body = [
      `name: ${formData.get("name") || ""}`,
      `email: ${formData.get("email") || ""}`,
      `subject: ${formData.get("subject") || ""}`,
      `project detail: ${formData.get("project detail") || ""}`,
    ].join("\n");
    window.location.href = `mailto:zradnisarra1999@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  return () => {
    cancelAnimationFrame(tiltFrame);
    cleanups.forEach((fn) => fn());
  };
}
