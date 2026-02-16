"use client";

import { useRef, useState } from "react";

type Point = { x: number; y: number };

export function useHeroSpotlight() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [patternHot, setPatternHot] = useState(false);
  const hotRef = useRef(false);

  const lastPosRef = useRef<Point>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const updateHeroVars = () => {
    const el = heroRef.current;
    if (!el) return;

    el.style.setProperty("--str-hex-x", `${lastPosRef.current.x}px`);
    el.style.setProperty("--str-hex-y", `${lastPosRef.current.y}px`);
  };

  const updateFromPointerEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    lastPosRef.current = { x, y };
    updateHeroVars();
  };

  const onHeroPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = heroRef.current;
    if (!el) return;

    if (!hotRef.current) {
      hotRef.current = true;
      setPatternHot(true);
    }

    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    lastPosRef.current = { x, y };

    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateHeroVars();
    });
  };

  const onHeroPointerEnter: React.PointerEventHandler<HTMLDivElement> = (e) => {
    hotRef.current = true;
    setPatternHot(true);
    updateFromPointerEvent(e);
  };

  const onHeroPointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    hotRef.current = false;
    setPatternHot(false);
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  return {
    heroRef,
    patternHot,
    setPatternHot,
    onHeroPointerMove,
    onHeroPointerEnter,
    onHeroPointerLeave,
  };
}
