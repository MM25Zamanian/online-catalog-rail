import { Slide } from "@/components/slide";
import { IranRouteLines } from "@/components/iran-routes-lines";
import { LineBreak } from "@/components/line-break";
import { GlobeIcon, LocationIcon } from "@/components/icons";
import type { Dictionary } from "@/i18n";
import Image from "next/image";
import IranGoldMap from "#/iran-gold-map.webp";

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
        <div className="text-xl font-black text-white z-20 absolute top-34 start-30 flex flex-col items-center justify-center">
          <LocationIcon className="size-8" />
          <span className="uppercase">iran</span>
        </div>

        <Image
          src={IranGoldMap}
          alt="Iran Gold Map"
          className="mix-blend-darken me-14 z-10"
        />

        <IranRouteLines
          className="absolute start-0 bottom-0 h-full w-full"
          startPoint={{ x: 395, y: 300 }}
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
