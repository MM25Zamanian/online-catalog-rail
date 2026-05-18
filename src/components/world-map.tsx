import { worldMapDotsSrc } from "@/generated/world-map-dots";
import { cn } from "@/lib/utils";
import Image from "next/image";

type GeoPoint = {
  lat: number;
  lng: number;
  label: string;
};

type RouteEdge = {
  start: GeoPoint;
  end: GeoPoint;
  chainIndex: number;
  segmentIndex: number;
  segmentCount: number;
};

type ProjectedPoint = {
  x: number;
  y: number;
  label: string;
};

type ProjectedRoute = RouteEdge & {
  startPoint: ProjectedPoint;
  endPoint: ProjectedPoint;
  path: string;
};

type TrainTimeline = {
  duration: number;
  times: number[];
  pathLength: number[];
  pathOffset: number[];
  opacity: number[];
};

type WorldMapProps = {
  className?: string;
};

const VIEW_BOX = {
  width: 800,
  height: 400,
} as const;

const LINE_COLOR = "#d28f2e";
const GRADIENT_ID = "world-map-route-gradient";

const TRAIN_ANIMATION = {
  step: 0.54,
  draw: 0.42,
  erase: 0.42,
  visibleSegments: 3,
  chainStagger: 0.28,
  loopGap: 1.1,
} as const;

const points = {
  tehran: { lat: 35.6892, lng: 51.389, label: "Tehran" },
  ankara: { lat: 39.9334, lng: 32.8597, label: "Ankara" },
  abuDhabi: { lat: 24.4539, lng: 54.3773, label: "Abu Dhabi" },
  astana: { lat: 51.1694, lng: 71.4491, label: "Astana" },
  newDelhi: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
  tokyo: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  singapore: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  jakarta: { lat: -6.2088, lng: 106.8456, label: "Jakarta" },
  bangkok: { lat: 13.7563, lng: 100.5018, label: "Bangkok" },
  manila: { lat: 14.5995, lng: 120.9842, label: "Manila" },
  berlin: { lat: 52.52, lng: 13.405, label: "Berlin" },
  london: { lat: 51.5072, lng: -0.1276, label: "London" },
  madrid: { lat: 40.4168, lng: -3.7038, label: "Madrid" },
  vienna: { lat: 48.2082, lng: 16.3738, label: "Vienna" },
  ottawa: { lat: 45.4215, lng: -75.6972, label: "Ottawa" },
  washingtonDc: { lat: 38.9072, lng: -77.0369, label: "Washington, D.C." },
  mexicoCity: { lat: 19.4326, lng: -99.1332, label: "Mexico City" },
  buenosAires: { lat: -34.6037, lng: -58.3816, label: "Buenos Aires" },
  santiago: { lat: -33.4489, lng: -70.6693, label: "Santiago" },
  lima: { lat: -12.0464, lng: -77.0428, label: "Lima" },
  bogota: { lat: 4.711, lng: -74.0721, label: "Bogota" },
  cairo: { lat: 30.0444, lng: 31.2357, label: "Cairo" },
  nairobi: { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
  rabat: { lat: 34.0209, lng: -6.8416, label: "Rabat" },
  canberra: { lat: -35.2809, lng: 149.13, label: "Canberra" },
  wellington: { lat: -41.2865, lng: 174.7762, label: "Wellington" },
} satisfies Record<string, GeoPoint>;

function chainRoute(chainIndex: number, ...chain: GeoPoint[]): RouteEdge[] {
  const segmentCount = Math.max(chain.length - 1, 0);

  return chain.slice(0, -1).map((point, segmentIndex) => ({
    start: point,
    end: chain[segmentIndex + 1],
    chainIndex,
    segmentIndex,
    segmentCount,
  }));
}

const tradeRoutes = [
  ...chainRoute(
    0,
    points.tokyo,
    points.manila,
    points.singapore,
    points.jakarta,
    points.canberra,
    points.wellington
  ),
  ...chainRoute(
    1,
    points.astana,
    points.tehran,
    points.ankara,
    points.vienna,
    points.berlin,
    points.london
  ),
  ...chainRoute(
    2,
    points.ottawa,
    points.washingtonDc,
    points.mexicoCity,
    points.bogota,
    points.lima,
    points.santiago,
    points.buenosAires
  ),
  ...chainRoute(
    3,
    points.madrid,
    points.rabat,
    points.cairo,
    points.nairobi,
    points.abuDhabi,
    points.newDelhi,
    points.bangkok
  ),
] satisfies RouteEdge[];

const maxChainIndex = Math.max(...tradeRoutes.map((route) => route.chainIndex));
const maxSegmentCount = Math.max(
  ...tradeRoutes.map((route) => route.segmentCount)
);

const totalAnimationDuration =
  maxChainIndex * TRAIN_ANIMATION.chainStagger +
  (maxSegmentCount + TRAIN_ANIMATION.visibleSegments - 1) *
    TRAIN_ANIMATION.step +
  TRAIN_ANIMATION.erase +
  TRAIN_ANIMATION.loopGap;

function projectPoint({ lat, lng, label }: GeoPoint): ProjectedPoint {
  return {
    x: (lng + 180) * (VIEW_BOX.width / 360),
    y: (90 - lat) * (VIEW_BOX.height / 180),
    label,
  };
}

function createCurvedPath(start: ProjectedPoint, end: ProjectedPoint) {
  const isDirToStart = start.x - end.x < 0;
  const isDirToTop = start.y - end.y < 0;

  const distance = Math.abs(end.x - start.x) / 2;
  const midX = (start.x + end.x) / (isDirToStart ? 1.975 : 2.025);
  const midY = Math.min(start.y, end.y) + (isDirToTop ? -distance : distance);

  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeTime(time: number) {
  return clamp(time / totalAnimationDuration, 0, 1);
}

function createTrainTimeline(route: RouteEdge): TrainTimeline {
  const { step, draw, erase, visibleSegments, chainStagger } = TRAIN_ANIMATION;

  const chainDelay = route.chainIndex * chainStagger;
  const startAt = chainDelay + route.segmentIndex * step;
  const drawEndAt = startAt + draw;
  const eraseStartAt = startAt + visibleSegments * step;
  const eraseEndAt = eraseStartAt + erase;

  if (startAt === 0) {
    return {
      duration: totalAnimationDuration,
      times: [
        0,
        normalizeTime(drawEndAt),
        normalizeTime(eraseStartAt),
        normalizeTime(eraseEndAt),
        1,
      ],
      pathLength: [0, 1, 1, 0, 0],
      pathOffset: [0, 0, 0, 1, 1],
      opacity: [0, 1, 1, 0, 0],
    };
  }

  return {
    duration: totalAnimationDuration,
    times: [
      0,
      normalizeTime(startAt),
      normalizeTime(drawEndAt),
      normalizeTime(eraseStartAt),
      normalizeTime(eraseEndAt),
      1,
    ],
    pathLength: [0, 0, 1, 1, 0, 0],
    pathOffset: [0, 0, 0, 0, 1, 1],
    opacity: [0, 0, 1, 1, 0, 0],
  };
}

function createProjectedRoutes(routes: RouteEdge[]): ProjectedRoute[] {
  return routes.map((route) => {
    const startPoint = projectPoint(route.start);
    const endPoint = projectPoint(route.end);

    return {
      ...route,
      startPoint,
      endPoint,
      path: createCurvedPath(startPoint, endPoint),
    };
  });
}

function createPulsePoints(routes: ProjectedRoute[]): ProjectedPoint[] {
  const uniquePoints = new Map<string, ProjectedPoint>();

  for (const route of routes) {
    uniquePoints.set(route.startPoint.label, route.startPoint);
    uniquePoints.set(route.endPoint.label, route.endPoint);
  }

  return Array.from(uniquePoints.values());
}

function toKeyTimes(times: number[]) {
  return times.map((time) => time.toFixed(4)).join(";");
}

function toValues(values: number[]) {
  return values.map((value) => value.toFixed(4)).join(";");
}

function toDashArrayValues(values: number[]) {
  return values.map((value) => `${value.toFixed(4)} 1`).join(";");
}

const projectedRoutes = createProjectedRoutes(tradeRoutes);
const pulsePoints = createPulsePoints(projectedRoutes);

function PulsePoint({ point, color }: { point: ProjectedPoint; color: string }) {
  return (
    <g>
      <circle cx={point.x} cy={point.y} r="2" fill={color} />

      <circle
        className="world-map-pulse-ring"
        cx={point.x}
        cy={point.y}
        r="2"
        fill={color}
        opacity="0.5"
      >
        <animate
          attributeName="r"
          from="2"
          to="8"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.5"
          to="0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

export function WorldMap({ className }: WorldMapProps) {
  return (
    <div
      className={cn(
        "world-map relative w-full aspect-[2/1] overflow-hidden rounded-lg font-sans",
        className
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 h-full w-full pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]"
      >
        <Image
          src={worldMapDotsSrc}
          alt=""
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <svg
        viewBox={`0 0 ${VIEW_BOX.width} ${VIEW_BOX.height}`}
        className="absolute inset-0 h-full w-full pointer-events-none select-none"
      >
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={LINE_COLOR} stopOpacity="0.65" />
            <stop offset="25%" stopColor={LINE_COLOR} stopOpacity="1" />
            <stop offset="75%" stopColor={LINE_COLOR} stopOpacity="1" />
            <stop offset="100%" stopColor={LINE_COLOR} stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {projectedRoutes.map((route) => {
          const timeline = createTrainTimeline(route);
          const routeKey = `${route.chainIndex}-${route.segmentIndex}-${route.start.label}-${route.end.label}`;

          return (
            <g key={routeKey}>
              <path
                d={route.path}
                fill="none"
                stroke={`url(#${GRADIENT_ID})`}
                strokeWidth="0.6"
                strokeOpacity="0.24"
              />

              <path
                className="world-map-route-reduced"
                d={route.path}
                fill="none"
                stroke={`url(#${GRADIENT_ID})`}
                strokeWidth="1"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />

              <path
                className="world-map-route-animated"
                d={route.path}
                fill="none"
                stroke={`url(#${GRADIENT_ID})`}
                strokeWidth="1.15"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="0 1"
                strokeDashoffset="0"
                opacity="0"
              >
                <animate
                  attributeName="stroke-dasharray"
                  dur={`${timeline.duration}s`}
                  values={toDashArrayValues(timeline.pathLength)}
                  keyTimes={toKeyTimes(timeline.times)}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  dur={`${timeline.duration}s`}
                  values={toValues(timeline.pathOffset)}
                  keyTimes={toKeyTimes(timeline.times)}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  dur={`${timeline.duration}s`}
                  values={toValues(timeline.opacity)}
                  keyTimes={toKeyTimes(timeline.times)}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          );
        })}

        {pulsePoints.map((point) => (
          <PulsePoint key={point.label} point={point} color={LINE_COLOR} />
        ))}
      </svg>
    </div>
  );
}
