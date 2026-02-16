"use client";

import { Delaunay } from "d3-delaunay";
import { useEffect, useMemo, useRef, useState } from "react";

type VoronoiPatternProps = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  minCells?: number;
  maxCells?: number;
  hoverFill?: string;
  background?: string;
};

type Size = { width: number; height: number };

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

export default function VoronoiPattern({
  className,
  stroke = "rgba(0,0,0,0.1)",
  strokeWidth = 0.75,
  minCells = 50,
  maxCells = 100,
  hoverFill = "#000000",
  background = "#ffffff",
}: VoronoiPatternProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [hovered, setHovered] = useState<number | null>(null);

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

  const { paths } = useMemo(() => {
    if (!size.width || !size.height) {
      return { points: [] as [number, number][], paths: [] as string[] };
    }

    const area = size.width * size.height;
    const target = clamp(Math.round(area / 22000), minCells, maxCells);
    const aspect = size.width / size.height;
    const cols = Math.max(4, Math.round(Math.sqrt(target * aspect)));
    const rows = Math.max(4, Math.round(target / cols));
    const stepX = size.width / (cols + 1);
    const stepY = size.height / (rows + 1);

    const rand = seededRandom(Math.round(size.width * 37 + size.height * 53));
    const jitterX = stepX * 0.35;
    const jitterY = stepY * 0.35;

    const generated: [number, number][] = [];
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const x = stepX + col * stepX + (rand() * 2 - 1) * jitterX;
        const y = stepY + row * stepY + (rand() * 2 - 1) * jitterY;
        generated.push([x, y]);
      }
    }

    const delaunay = Delaunay.from(generated);
    const voronoi = delaunay.voronoi([0, 0, size.width, size.height]);
    const cellPaths = generated.map((_, index) => voronoi.renderCell(index));

    return { points: generated, paths: cellPaths };
  }, [size.height, size.width, minCells, maxCells]);

  return (
    <div ref={hostRef} className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${Math.max(size.width, 1)} ${Math.max(size.height, 1)}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        onPointerLeave={() => setHovered(null)}
      >
        <rect width="100%" height="100%" fill={background} />
        {paths.map((path, index) => (
          <path
            key={`cell-${index}`}
            d={path}
            fill={hovered === index ? hoverFill : "transparent"}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={{ transition: "fill 180ms ease" }}
            onPointerEnter={() => setHovered(index)}
          />
        ))}
      </svg>
    </div>
  );
}
