import { cn } from "@/lib/utils";
import { useId } from "react";

type Point = {
  x: number;
  y: number;
};

type RouteTarget = {
  id: string;
  label: string;
  dot: Point;
  labelPos: Point;
  bend?: number; // optional fine-tune, positive/negative controls curve side
};

type IranRouteLinesProps = {
  className?: string;
  startPoint: Point;
  targets?: RouteTarget[];
  animated?: boolean;
  lineOpacity?: number;
  labelOpacity?: number;
};

const VIEW_BOX = { width: 900, height: 620 } as const;

const LINE_COLOR = "#c8922e";
const TEXT_COLOR = "#03162a";

const ANIMATION = {
  duration: 3.8,
  stagger: 0.22,
} as const;

const defaultTargets = [
  {
    id: "russia",
    label: "RUSSIA",
    dot: { x: 300, y: 0 },
    labelPos: { x: 240, y: -20 },
    bend: -0.1,
  },
  {
    id: "kazakhstan",
    label: "KAZAKHSTAN",
    dot: { x: 770, y: -35 },
    labelPos: { x: 670, y: -50 },
    bend: -2,
  },
  {
    id: "uzbekistan",
    label: "UZBEKISTAN",
    dot: { x: 730, y: 40 },
    labelPos: { x: 630, y: 20 },
    bend: -0.6,
  },
  {
    id: "kyrgyzstan",
    label: "KYRGYZSTAN",
    dot: { x: 790, y: 185 },
    labelPos: { x: 690, y: 170 },
    bend: -0.2,
  },
  {
    id: "tajikistan",
    label: "TAJIKISTAN",
    dot: { x: 790, y: 295 },
    labelPos: { x: 700, y: 280 },
    bend: 0.15,
  },
  {
    id: "turkmenistan",
    label: "TURKMENISTAN",
    dot: { x: 600, y: 140 },
    labelPos: { x: 480, y: 120 },
    bend: -0.24,
  },
  {
    id: "turkey",
    label: "TURKEY",
    dot: { x: 100, y: 140 },
    labelPos: { x: 30, y: 120 },
    bend: 0.3,
  },
  {
    id: "afghanistan",
    label: "AFGHANISTAN",
    dot: { x: 770, y: 365 },
    labelPos: { x: 660, y: 350 },
    bend: 0.2,
  },
] satisfies RouteTarget[];

function createCurvedPath(start: Point, end: Point, bend = 0.18) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.hypot(dx, dy) || 1;

  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  // Perpendicular normal creates a natural curved route without manual path data.
  const normalX = -dy / distance;
  const normalY = dx / distance;

  const curveStrength = Math.min(distance * Math.abs(bend), 300);
  const side = Math.sign(bend || 1);

  const controlX = midX + normalX * curveStrength * side;
  const controlY = midY + normalY * curveStrength * side;

  return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
}

function RouteItem({
  target,
  startPoint,
  index,
  animated,
  gradientId,
  lineOpacity,
  labelOpacity,
}: {
  target: RouteTarget;
  startPoint: Point;
  index: number;
  animated: boolean;
  gradientId: string;
  lineOpacity: number;
  labelOpacity: number;
}) {
  const path = createCurvedPath(startPoint, target.dot, target.bend);
  const begin = `${index * ANIMATION.stagger}s`;

  return (
    <g>
      {/* Always-visible base dotted line */}
      <path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity={0.38 * lineOpacity}
      />

      {/* Moving highlight segment */}
      {animated && (
        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="0.16 1"
          strokeDashoffset="0"
          opacity={0.95 * lineOpacity}
        >
          <animate
            attributeName="stroke-dashoffset"
            dur={`${ANIMATION.duration}s`}
            begin={begin}
            values="0;-1"
            repeatCount="indefinite"
          />
        </path>
      )}

      <circle
        cx={target.dot.x}
        cy={target.dot.y}
        r="5"
        fill={LINE_COLOR}
        opacity={lineOpacity}
      />

      {animated && (
        <circle
          cx={target.dot.x}
          cy={target.dot.y}
          r="5"
          fill={LINE_COLOR}
          opacity="0.45"
        >
          <animate
            attributeName="r"
            dur="1.8s"
            begin={begin}
            values="5;10;5"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            dur="1.8s"
            begin={begin}
            values="0.45;0;0.45"
            repeatCount="indefinite"
          />
        </circle>
      )}

      <text
        x={target.labelPos.x}
        y={target.labelPos.y}
        fill={TEXT_COLOR}
        fillOpacity={labelOpacity}
        fontSize="32"
        fontWeight="800"
        letterSpacing="0.02em"
      >
        {target.label}
      </text>
    </g>
  );
}

export function IranRouteLines({
  className,
  startPoint,
  targets = defaultTargets,
  animated = true,
  lineOpacity = 1,
  labelOpacity = 1,
}: IranRouteLinesProps) {
  const gradientId = `iran-route-gradient-${useId().replace(/:/g, "")}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_BOX.width} ${VIEW_BOX.height}`}
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={LINE_COLOR} stopOpacity="1" />
          <stop offset="50%" stopColor={LINE_COLOR} stopOpacity="0.75" />
          <stop offset="100%" stopColor={LINE_COLOR} stopOpacity="1" />
        </linearGradient>
      </defs>

      {targets.map((target, index) => (
        <RouteItem
          key={target.id}
          target={target}
          startPoint={startPoint}
          index={index}
          animated={animated}
          gradientId={gradientId}
          lineOpacity={lineOpacity}
          labelOpacity={labelOpacity}
        />
      ))}
    </svg>
  );
}
