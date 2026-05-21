import { Slide } from "@/components/slide";
import type { Dictionary } from "@/i18n";
import Image from "next/image";
import { LineBreak } from "@/components/line-break";
import {
  DescriptionIcon,
  FactCheckIcon,
  GlobeIcon,
  PackageIcon,
  ShieldIcon,
  TrainIcon,
  TruckIcon,
  WarehouseIcon,
} from "@/components/icons";
import ServicesRailBackground from "#/services-rail-perspective-bg.webp";

type Slide04Props = {
  copy: Dictionary["slide04"];
};

const serviceIcons = {
  train: TrainIcon,
  shield: ShieldIcon,
  truck: TruckIcon,
  warehouse: WarehouseIcon,
  factCheck: FactCheckIcon,
  description: DescriptionIcon,
  globe: GlobeIcon,
  package: PackageIcon,
} as const;

export function Slide04({ copy }: Slide04Props) {
  return (
    <Slide className="bg-primary">
      <div className="absolute inset-x-0 bottom-0 h-[38%] sm:h-[42%]">
        <span className="absolute inset-0 z-10 bg-linear-to-t from-primary via-primary/85 to-transparent" />
        <Image
          src={ServicesRailBackground}
          alt={copy.backgroundAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 512px"
          className="object-cover object-bottom opacity-70"
        />
      </div>

      <div className="relative z-20 h-full px-5 sm:px-6 pt-7 pb-6 flex flex-col">
        <div className="mx-auto w-full max-w-md text-center">
          <h1 className="text-primary text-3xl font-black uppercase tracking-wide leading-none">
            <span className="text-white">{copy.heading.start} </span>
            <span className="text-secondary">{copy.heading.accent}</span>
          </h1>

          <LineBreak className="my-4" />

          <p className="text-[0.7rem] sm:text-xs text-white/90 leading-relaxed tracking-wide text-balance">
            {copy.intro}
          </p>
        </div>

        <div className="mt-5 mb-auto max-w-md mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {copy.services.map((service, index) => {
              const Icon = serviceIcons[service.iconKey];
              const number = String(index + 1).padStart(2, "0");

              return (
                <article
                  key={service.title}
                  className="relative rounded-xl border overflow-hidden border-secondary/80 bg-primary/85 shadow-[0_10px_20px_rgba(3,22,42,0.22)] px-3 py-3"
                >
                  <div className="absolute top-0 start-0 rounded-br-lg px-2 py-0.5 text-[0.625rem] font-black tracking-wider bg-secondary text-primary">
                    {number}
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <div className="rounded-lg border border-secondary/70 bg-primary p-1.5 h-fit">
                      <Icon className="size-6 text-secondary" />
                    </div>

                    <div className="flex flex-col">
                      <h2 className="text-sm font-bold leading-tight text-white">
                        {service.title}
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed tracking-wide text-white/80">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </Slide>
  );
}
