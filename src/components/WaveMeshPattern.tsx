"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type WaveMeshPatternProps = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  spacing?: number;
  amplitude?: number;
  frequency?: number;
};

type Size = { width: number; height: number };

function seededRandom(seed: number) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

export default function WaveMeshPattern({
  className,
  stroke = "rgba(249,115,22,0.25)",
  strokeWidth = 0.8,
  spacing = 80,
  amplitude = 16,
  frequency = 0.012,
}: WaveMeshPatternProps) {
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

  const paths = useMemo(() => {
    if (!size.width || !size.height) return [] as string[];

    const rand = seededRandom(Math.round(size.width * 11 + size.height * 19));
    const horizontalCount = Math.ceil(size.height / spacing) + 2;
    const verticalCount = Math.ceil(size.width / spacing) + 2;
    const step = 24;

    const pathList: string[] = [];

    for (let i = 0; i < horizontalCount; i += 1) {
      const baseY = i * spacing - spacing;
      const phase = rand() * Math.PI * 2;
      let d = "";
      for (let x = -step; x <= size.width + step; x += step) {
        const y = baseY + Math.sin(x * frequency + phase) * amplitude;
        d += d ? ` L ${x.toFixed(2)} ${y.toFixed(2)}` : `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathList.push(d);
    }

    for (let i = 0; i < verticalCount; i += 1) {
      const baseX = i * spacing - spacing;
      const phase = rand() * Math.PI * 2;
      let d = "";
      for (let y = -step; y <= size.height + step; y += step) {
        const x = baseX + Math.sin(y * frequency + phase) * amplitude;
        d += d ? ` L ${x.toFixed(2)} ${y.toFixed(2)}` : `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      pathList.push(d);
    }

    return pathList;
  }, [size.height, size.width, spacing, amplitude, frequency]);

  return (
    <div ref={hostRef} className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${Math.max(size.width, 1)} ${Math.max(size.height, 1)}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <path
            key={`wave-${index}`}
            d={path}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}
