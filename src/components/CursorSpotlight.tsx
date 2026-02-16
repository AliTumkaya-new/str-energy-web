"use client";

import { useEffect } from "react";

type CursorSpotlightProps = {
  enabled?: boolean;
};

export default function CursorSpotlight({ enabled = true }: CursorSpotlightProps) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const finePointer = window.matchMedia?.("(pointer: fine)")?.matches ?? true;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (!finePointer || reduceMotion) return;

    const root = document.documentElement;
    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    const commit = () => {
      rafId = 0;
      root.style.setProperty("--str-cursor-x", `${lastX}px`);
      root.style.setProperty("--str-cursor-y", `${lastY}px`);
      root.style.setProperty("--str-spotlight-opacity", "1");
    };

    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) rafId = window.requestAnimationFrame(commit);
    };

    const onLeave = () => {
      root.style.setProperty("--str-spotlight-opacity", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
      root.style.removeProperty("--str-spotlight-opacity");
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div className="str-cursor-spotlight" aria-hidden="true" />;
}
