"use client";

import { useId } from "react";

type CircuitBoardPatternProps = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  nodeFill?: string;
};

export default function CircuitBoardPattern({
  className,
  stroke = "rgba(0,0,0,0.12)",
  strokeWidth = 0.8,
  nodeFill = "rgba(0,0,0,0.18)",
}: CircuitBoardPatternProps) {
  const baseId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const patternId = `circuit_${baseId}`;

  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={patternId} x="0" y="0" width="240" height="240" patternUnits="userSpaceOnUse">
          <g stroke={stroke} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20 H110 V40 H140" />
            <path d="M36 90 H90 V110 H150" />
            <path d="M180 16 V70 H120 V92" />
            <path d="M20 150 H70 V190 H130" />
            <path d="M160 140 H210 V170" />
            <path d="M200 80 V120 H170" />
            <path d="M12 210 H70" />
            <path d="M90 200 V230" />
            <path d="M120 24 H200 V50" />
            <path d="M40 40 V70 H20" />
            <path d="M70 120 H120 V150" />
            <path d="M210 200 H160 V220" />
            <path d="M150 60 H220" />
            <path d="M100 170 H40" />
            <path d="M60 24 H60 V36" />
            <path d="M24 120 V140 H40" />
            <path d="M190 120 V150 H210" />
            <path d="M120 170 V200 H150" />
          </g>

          <g fill={nodeFill}>
            <circle cx="12" cy="20" r="2" />
            <circle cx="110" cy="20" r="2" />
            <circle cx="110" cy="40" r="2" />
            <circle cx="140" cy="40" r="2" />
            <circle cx="36" cy="90" r="2" />
            <circle cx="90" cy="90" r="2" />
            <circle cx="90" cy="110" r="2" />
            <circle cx="150" cy="110" r="2" />
            <circle cx="180" cy="16" r="2" />
            <circle cx="180" cy="70" r="2" />
            <circle cx="120" cy="70" r="2" />
            <circle cx="120" cy="92" r="2" />
            <circle cx="20" cy="150" r="2" />
            <circle cx="70" cy="150" r="2" />
            <circle cx="70" cy="190" r="2" />
            <circle cx="130" cy="190" r="2" />
            <circle cx="160" cy="140" r="2" />
            <circle cx="210" cy="140" r="2" />
            <circle cx="210" cy="170" r="2" />
            <circle cx="200" cy="80" r="2" />
            <circle cx="200" cy="120" r="2" />
            <circle cx="170" cy="120" r="2" />
            <circle cx="12" cy="210" r="2" />
            <circle cx="70" cy="210" r="2" />
            <circle cx="90" cy="200" r="2" />
            <circle cx="90" cy="230" r="2" />
            <circle cx="120" cy="24" r="2" />
            <circle cx="200" cy="24" r="2" />
            <circle cx="200" cy="50" r="2" />
            <circle cx="40" cy="40" r="2" />
            <circle cx="40" cy="70" r="2" />
            <circle cx="20" cy="70" r="2" />
            <circle cx="70" cy="120" r="2" />
            <circle cx="120" cy="120" r="2" />
            <circle cx="120" cy="150" r="2" />
            <circle cx="210" cy="200" r="2" />
            <circle cx="160" cy="200" r="2" />
            <circle cx="160" cy="220" r="2" />
            <circle cx="150" cy="60" r="2" />
            <circle cx="220" cy="60" r="2" />
            <circle cx="100" cy="170" r="2" />
            <circle cx="40" cy="170" r="2" />
            <circle cx="60" cy="24" r="2" />
            <circle cx="60" cy="36" r="2" />
            <circle cx="24" cy="120" r="2" />
            <circle cx="24" cy="140" r="2" />
            <circle cx="40" cy="140" r="2" />
            <circle cx="190" cy="120" r="2" />
            <circle cx="190" cy="150" r="2" />
            <circle cx="210" cy="150" r="2" />
            <circle cx="120" cy="170" r="2" />
            <circle cx="120" cy="200" r="2" />
            <circle cx="150" cy="200" r="2" />
          </g>

          <g fill="none" stroke={stroke} strokeWidth={strokeWidth}>
            <rect x="96" y="54" width="10" height="6" rx="1" />
            <rect x="132" y="72" width="12" height="6" rx="1" />
            <rect x="34" y="172" width="12" height="6" rx="1" />
            <rect x="168" y="28" width="12" height="6" rx="1" />
            <rect x="180" y="180" width="14" height="6" rx="1" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
