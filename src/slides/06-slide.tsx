"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { Slide } from "@/components/slide";
import { IranRouteLines } from "@/components/iran-routes-lines";
import { LineBreak } from "@/components/line-break";
import { GlobeIcon, LocationIcon } from "@/components/icons";
import type { Dictionary } from "@/i18n";
import Image from "next/image";
import IranGoldMap from "#/iran-gold-map.webp";
import { CATALOG_MOTION_EVENT } from "@/components/scroll-bg-manager";

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

type CatalogMotionDetail = {
  activeIndex: number;
  direction: "up" | "down";
  progress: number;
};

export function Slide06({ copy }: Slide06Props) {
  const prefersReducedMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);

  const progress = useMotionValue(0);
  const stageA = useTransform(progress, [0, 0.35], [0, 1]);
  const stageB = useTransform(progress, [0.35, 0.75], [0, 1]);
  const stageC = useTransform(progress, [0.75, 1], [0, 1]);

  const mapOpacity = useTransform(stageA, [0, 1], [0.15, 1]);
  const mapScale = useTransform(stageA, [0, 1], [0.96, 1]);
  const mapTranslateY = useTransform(stageA, [0, 1], [20, 0]);

  const routeOpacity = useTransform(stageB, [0, 1], [0.1, 1]);
  const routeScale = useTransform(stageB, [0, 1], [0.8, 1]);

  const titleOpacity = useTransform(stageA, [0, 1], [0.3, 1]);
  const titleTranslateY = useTransform(stageA, [0, 1], [14, 0]);

  const labelsOpacity = useTransform(stageC, [0, 1], [1, 1]);
  const labelsTranslateY = useTransform(stageC, [0, 1], [0, 0]);

  useEffect(() => {
    const handleMotionUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CatalogMotionDetail>).detail;
      const active = detail.activeIndex === 5;
      setIsActive(active);

      if (!active) {
        progress.set(0);
        return;
      }

      if (prefersReducedMotion) {
        progress.set(1);
        return;
      }

      progress.set(detail.progress);
    };

    document.addEventListener(CATALOG_MOTION_EVENT, handleMotionUpdate as EventListener);
    return () => {
      document.removeEventListener(CATALOG_MOTION_EVENT, handleMotionUpdate as EventListener);
    };
  }, [prefersReducedMotion, progress]);

  return (
    <LazyMotion features={domAnimation}>
      <Slide slideIndex={5} motionProfile="map" className="bg-background">
        <m.div
          data-parallax="bg"
          className="absolute flex items-end bg-background overflow-hidden justify-center bottom-[5dvh] end-[6dvw] md:bottom-4 md:end-8 w-[20rem] h-[20rem]"
          style={{
            opacity: mapOpacity,
            scale: mapScale,
            y: mapTranslateY,
          }}
        >
          <m.div
            className="text-xl font-black text-primary z-20 absolute top-34 start-36 flex flex-col items-center justify-center"
            style={{
              opacity: titleOpacity,
              y: titleTranslateY,
            }}
          >
            <LocationIcon className="size-8" />
            <span className="uppercase">{copy.countryLabel}</span>
          </m.div>

          <Image
            src={IranGoldMap}
            alt="Iran Gold Map"
            className="mix-blend-darken"
          />

          <m.div
            className="absolute start-0 bottom-0 z-10 h-full w-full"
            style={{
              opacity: routeOpacity,
              scale: routeScale,
            }}
          > 
            <IranRouteLines
              className="absolute start-0 bottom-0 h-full w-full"
              startPoint={{ x: 470, y: 280 }}
              animated={isActive && !prefersReducedMotion}
              lineOpacity={isActive ? 1 : 0.4}
              labelOpacity={prefersReducedMotion ? 1 : 0.8}
            />
          </m.div>
        </m.div>

        <div className="flex flex-col p-6">
          <m.h1
            data-reveal="headline"
            data-stagger={0}
            className="font-black text-3xl flex flex-col uppercase ps-1"
            style={{
              opacity: titleOpacity,
              y: titleTranslateY,
            }}
          >
            <span className="text-primary">{copy.heading.start}</span>
            <span className="text-secondary">{copy.heading.accent}</span>
          </m.h1>

          <LineBreak data-reveal="body" data-stagger={1} className="mt-4" />

          <m.div
            data-reveal="body"
            data-stagger={2}
            className="flex gap-2"
            style={{
              opacity: labelsOpacity,
              y: labelsTranslateY,
            }}
          >
            <div className="flex-1 pt-4 pb-2 flex flex-col">
              <h2 className="flex gap-1 uppercase items-center font-bold mb-2 tracking-tight text-primary">
                <LocationIcon className="size-8 text-secondary" />
                <span>{copy.terminalsTitle}</span>
              </h2>

              {copy.terminals.map((terminal, index) => (
                <div key={terminal} data-reveal="card" data-stagger={index}>
                  <ListItem content={terminal} />
                </div>
              ))}
            </div>

            <hr className="border-t-0 border-e w-px h-full border-e-secondary" />

            <div className="flex-1 pt-4 pb-2 flex flex-col">
              <h2 className="flex gap-1 uppercase items-center font-bold mb-2 tracking-tight text-primary">
                <GlobeIcon className="size-8 text-secondary" />
                <span>{copy.destinationsTitle}</span>
              </h2>

              {copy.destinations.map((destination, index) => (
                <div key={destination} data-reveal="card" data-stagger={index}>
                  <ListItem content={destination} />
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </Slide>
    </LazyMotion>
  );
}
