"use client";

import { Delaunay } from "d3-delaunay";
import { useEffect, useMemo, useRef, useState } from "react";

type DelaunayPatternProps = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  minPoints?: number;
  maxPoints?: number;
  background?: string;
};

type Size = { width: number; height: number };

type Point = [number, number];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function seededRandom(seed: number) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

export default function DelaunayPattern({
  className,
  stroke = "rgba(249,115,22,0.65)",
  strokeWidth = 0.8,
  minPoints = 60,
  maxPoints = 120,
  background = "transparent",
}: DelaunayPatternProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!hostRef.current) return;
    const element = hostRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  const path = useMemo(() => {
    if (!size.width || !size.height) return "";

    const area = size.width * size.height;
    const target = clamp(Math.round(area / 20000), minPoints, maxPoints);
    const aspect = size.width / size.height;
    const cols = Math.max(6, Math.round(Math.sqrt(target * aspect)));
    const rows = Math.max(6, Math.round(target / cols));
    const stepX = size.width / (cols + 1);
    const stepY = size.height / (rows + 1);

    const rand = seededRandom(Math.round(size.width * 31 + size.height * 47));
    const jitterX = stepX * 0.25;
    const jitterY = stepY * 0.25;

    const points: Point[] = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = stepX + col * stepX + (rand() * 2 - 1) * jitterX;
        const y = stepY + row * stepY + (rand() * 2 - 1) * jitterY;
        points.push([x, y]);
      }
    }

    const delaunay = Delaunay.from(points);
    const triangles = delaunay.triangles;
    const edges = new Set<string>();
    let d = "";

    for (let i = 0; i < triangles.length; i += 3) {
      const a = triangles[i];
      const b = triangles[i + 1];
      const c = triangles[i + 2];
      const pairs: Array<[number, number]> = [
        [a, b],
        [b, c],
        [c, a],
      ];

      for (const [p1, p2] of pairs) {
        const key = p1 < p2 ? `${p1}-${p2}` : `${p2}-${p1}`;
        if (edges.has(key)) continue;
        edges.add(key);
        const [x1, y1] = points[p1];
        const [x2, y2] = points[p2];
        d += `M ${x1.toFixed(2)} ${y1.toFixed(2)} L ${x2.toFixed(2)} ${y2.toFixed(2)} `;
      }
    }

    return d;
  }, [size.width, size.height, minPoints, maxPoints]);

  return (
    <div ref={hostRef} className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${Math.max(size.width, 1)} ${Math.max(size.height, 1)}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill={background} />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
