"use client";

import { useMemo, type CSSProperties } from "react";

type HoneycombPatternProps = {
  className?: string;
  cols?: number;
  rows?: number;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  hoverStroke?: string;
  enableHover?: boolean;
};

export default function HoneycombPattern({
  className,
  cols = 12,
  rows = 8,
  size = 28,
  stroke = "#D6D6DC",
  strokeWidth = 1,
  hoverStroke = "#F97316",
  enableHover = true,
}: HoneycombPatternProps) {
  const hexHeight = Math.sqrt(3) * size;
  const stepX = size * 1.5;
  const width = (cols - 1) * stepX + size * 2;
  const height = rows * hexHeight;

  const polygons = useMemo(() => {
    const result: Array<{ id: string; points: string }> = [];
    for (let col = 0; col < cols; col += 1) {
      const offsetY = (col % 2) * (hexHeight / 2);
      for (let row = 0; row < rows; row += 1) {
        const cx = size + col * stepX;
        const cy = hexHeight / 2 + row * hexHeight + offsetY;
        const points = [
          [cx + size, cy],
          [cx + size / 2, cy + hexHeight / 2],
          [cx - size / 2, cy + hexHeight / 2],
          [cx - size, cy],
          [cx - size / 2, cy - hexHeight / 2],
          [cx + size / 2, cy - hexHeight / 2],
        ]
          .map((pair) => `${pair[0].toFixed(2)},${pair[1].toFixed(2)}`)
          .join(" ");
        result.push({ id: `hex-${col}-${row}`, points });
      }
    }
    return result;
  }, [cols, rows, size, hexHeight, stepX]);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .hex { fill: transparent; stroke: var(--hex-stroke); transition: stroke 150ms ease; }
        .hex:hover { stroke: ${enableHover ? "var(--hex-hover-stroke)" : "var(--hex-stroke)"}; }
      `}</style>
      {polygons.map((hex) => (
        <polygon
          key={hex.id}
          className="hex"
          points={hex.points}
          style={{
            ...(stroke ? { "--hex-stroke": stroke } : {}),
            ...(hoverStroke ? { "--hex-hover-stroke": hoverStroke } : {}),
          } as CSSProperties}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
