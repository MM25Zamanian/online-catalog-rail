import { Slide } from "@/components/slide";
import RailImage from "#/rail-train.webp";
import Logo from "#/logo.webp";
import Image from "next/image";
import type { ReactNode } from "react";
import { getBuildLocale, type Dictionary } from "@/i18n";
import { ShipIcon, StoreIcon, TrainIcon, TruckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { LineBreak } from "@/components/line-break";

type Slide01Props = {
  brand: Dictionary["brand"];
  copy: Dictionary["slide01"];
  children: ReactNode;
};

const locale = getBuildLocale();

export function Slide01({ brand, copy, children }: Slide01Props) {
  return (
    <Slide className="bg-primary">
      {children}

      <div className="flex flex-col pt-24 flex-1 z-10 items-center justify-center">
        <div className="flex flex-col mx-auto items-center justify-center z-20">
          <Image
            src={Logo}
            alt={copy.logoAlt}
            width={400}
            height={400}
            preload
            className="size-28 aspect-square"
          />

          <h1 className="text-white text-2xl font-bold uppercase tracking-[0.5rem] mt-4">
            {brand.name} <span className="text-secondary">{brand.accent}</span>
          </h1>
          <h2
            className={cn(
              "text-xs font-bold opacity-70 uppercase text-white",
              locale === "en" ? "tracking-[0.3rem]" : "tracking-[0.4rem]"
            )}
          >
            {brand.subtitle}
          </h2>

          <LineBreak className="my-3" />

          <h3
            className={cn(
              "text-xs font-bold tracking-[0.125rem] uppercase text-white",
              locale === "en" ? "tracking-[0.125rem]" : "tracking-wide"
            )}
          >
            {copy.tagline.start}{" "}
            <span className="text-secondary">{copy.tagline.accent}</span>
          </h3>
        </div>

        <div className="relative aspect-[4/3] w-full -mt-[12dvh]">
          <div className="bg-radial from-transparent from-40% to-70% to-primary absolute inset-0 z-10"></div>

          <Image
            src={RailImage}
            alt={copy.railImageAlt}
            fill
            preload
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex -mt-[4dvh] z-20">
          <div className="py-2 flex flex-col items-center min-w-22 md:min-w-24 lg:min-w-28">
            <TrainIcon className="size-12 text-secondary" />

            <span
              className={cn(
                "text-white font-bold uppercase text-sm",
                locale === "en" ? "tracking-widest" : "tracking-tight"
              )}
            >
              {copy.services[0].title}
            </span>
            <span className="text-white font-bold capitalize text-xs opacity-70">
              {copy.services[0].description}
            </span>
          </div>

          <span className="border-e border-e-secondary opacity-70"></span>

          <div className="py-2 flex flex-col items-center min-w-22 md:min-w-24 lg:min-w-28">
            <TruckIcon className="size-12 text-secondary" />

            <span
              className={cn(
                "text-white font-bold uppercase text-sm",
                locale === "en" ? "tracking-widest" : "tracking-tight"
              )}
            >
              {copy.services[1].title}
            </span>
            <span className="text-white font-bold capitalize text-xs opacity-70">
              {copy.services[1].description}
            </span>
          </div>

          <span className="border-e border-e-secondary opacity-70"></span>

          <div className="py-2 flex flex-col items-center min-w-22 md:min-w-24 lg:min-w-28">
            <ShipIcon className="size-12 text-secondary" />

            <span
              className={cn(
                "text-white font-bold uppercase text-sm",
                locale === "en" ? "tracking-widest" : "tracking-tight"
              )}
            >
              {copy.services[2].title}
            </span>
            <span className="text-white font-bold capitalize text-xs opacity-70">
              {copy.services[2].description}
            </span>
          </div>

          <span className="border-e border-e-secondary opacity-70"></span>

          <div className="py-2 flex flex-col items-center min-w-22 md:min-w-24 lg:min-w-28">
            <StoreIcon className="size-12 text-secondary" />

            <span
              className={cn(
                "text-white font-bold uppercase text-sm",
                locale === "en" ? "tracking-widest" : "tracking-tight"
              )}
            >
              {copy.services[3].title}
            </span>
            <span className="text-white font-bold capitalize text-xs opacity-70">
              {copy.services[3].description}
            </span>
          </div>
        </div>

        <div className="flex flex-col mx-auto pb-8">
          <LineBreak className="mb-4" />

          <div className="text-center w-full text-secondary tracking-widest uppercase font-bold text-xs">
            {copy.footer}
          </div>
        </div>
      </div>
    </Slide>
  );
}
