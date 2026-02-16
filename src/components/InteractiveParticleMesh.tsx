"use client";

import { useEffect, useRef } from "react";

type ParticleMeshProps = {
  className?: string;
  count?: number;
  radius?: number;
  lineDistance?: number;
  attractionDistance?: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function InteractiveParticleMesh({
  className,
  count = 90,
  radius = 1.6,
  lineDistance = 90,
  attractionDistance = 100,
}: ParticleMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
      if (!particlesRef.current.length) {
        const next: Particle[] = [];
        for (let i = 0; i < count; i += 1) {
          next.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
          });
        }
        particlesRef.current = next;
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);
    resize();

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        if (mouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < attractionDistance) {
            const force = (1 - dist / attractionDistance) * 0.02;
            p.vx += (dx / (dist || 1)) * force;
            p.vy += (dy / (dist || 1)) * force;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < lineDistance) {
            const active = mouse
              ? Math.hypot(mouse.x - a.x, mouse.y - a.y) < attractionDistance ||
                Math.hypot(mouse.x - b.x, mouse.y - b.y) < attractionDistance
              : false;
            ctx.strokeStyle = active ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.08)";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const active = mouse ? Math.hypot(mouse.x - p.x, mouse.y - p.y) < attractionDistance : false;
        ctx.fillStyle = active ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      observer.disconnect();
    };
  }, [count, radius, lineDistance, attractionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onPointerMove={(event) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseRef.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
      }}
      onPointerLeave={() => {
        mouseRef.current = null;
      }}
    />
  );
}
