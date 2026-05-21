import { Slide } from "@/components/slide";
import { IranRouteLines } from "@/components/iran-routes-lines";
import DottedMap from "dotted-map";
import { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { LineBreak } from "@/components/line-break";
import { GlobeIcon, LocationIcon } from "@/components/icons";
import type { Dictionary } from "@/i18n";

function AnimatedMap({ countryLabel }: { countryLabel: string }) {
  const map = new DottedMap({
    height: 30,
    grid: "diagonal",
    countries: ["IRN"],
  });

  const svgMap = map.getSVG({
    radius: 0.3,
    color: "#d28f2e",
    shape: "hexagon",
    backgroundColor: "#0000",
  });

  const mapSrc = `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`;
  const mapMask = `url("${mapSrc}")`;

  const maskStyle = {
    maskImage: mapMask,
    WebkitMaskImage: mapMask,
  } satisfies CSSProperties;

  return (
    <div className="w-58 z-20 me-16 relative flex items-center justify-center">
      <div className="relative w-full aspect-[230/210] overflow-hidden">
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 pointer-events-none select-none",
            "bg-[#d28f2e]",
            "map-mask"
          )}
          style={maskStyle}
        />

        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 pointer-events-none select-none overflow-hidden",
            "map-mask"
          )}
          style={maskStyle}
        >
          <div
            className={cn(
              "absolute inset-y-0 -left-[60%] w-[52%]",
              "map-gold-shine",
              "blur-[1px] mix-blend-screen",
              "motion-safe:animate-map-gold-shine motion-reduce:hidden"
            )}
          />
        </div>
      </div>

      <span className="absolute uppercase text-white text-3xl font-bold">
        {countryLabel}
      </span>
    </div>
  );
}

function ListItem({ content }: { content: string }) {
  return (
    <div className="flex items-center gap-3 ms-4">
      <div className="size-1 bg-secondary rotate-z-45"></div>
      <div className="text-sm font-semibold tracking-wider capitalize">
        {content}
      </div>
    </div>
  );
}

type Slide06Props = {
  copy: Dictionary["slide06"];
};

export function Slide06({ copy }: Slide06Props) {
  return (
    <Slide className="bg-background">
      <div className="absolute flex items-end justify-center bottom-[5dvh] end-[6dvw] md:bottom-4 md:end-8 w-[20rem] h-[20rem]">
        <AnimatedMap countryLabel={copy.countryLabel} />

        <IranRouteLines
          className="absolute start-0 bottom-0 z-10 h-full w-full"
          startPoint={{ x: 395, y: 500 }}
        />
      </div>

      <div className="flex flex-col p-6">
        <h1 className="font-black text-3xl flex flex-col uppercase ps-1">
          <span className="text-primary">{copy.heading.start}</span>
          <span className="text-secondary">{copy.heading.accent}</span>
        </h1>

        <LineBreak className="mt-4" />

        <div className="flex gap-2">
          <div className="flex-1 pt-4 pb-2 flex flex-col">
            <h2 className="flex gap-1 uppercase items-center font-bold mb-2 tracking-tight text-primary">
              <LocationIcon className="size-8 text-secondary" />
              <span>{copy.terminalsTitle}</span>
            </h2>

            {copy.terminals.map((terminal) => (
              <ListItem key={terminal} content={terminal} />
            ))}
          </div>

          <hr className="border-t-0 border-e w-px h-full border-e-secondary" />

          <div className="flex-1 pt-4 pb-2 flex flex-col">
            <h2 className="flex gap-1 uppercase items-center font-bold mb-2 tracking-tight text-primary">
              <GlobeIcon className="size-8 text-secondary" />
              <span>{copy.destinationsTitle}</span>
            </h2>

            {copy.destinations.map((destination) => (
              <ListItem key={destination} content={destination} />
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
