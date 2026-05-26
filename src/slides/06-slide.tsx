"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, useReducedMotion } from "motion/react";
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
  settled: boolean;
};

export function Slide06({ copy }: Slide06Props) {
  const prefersReducedMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const handleMotionUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CatalogMotionDetail>).detail;
      const active = detail.activeIndex === 5;
      setIsActive(active);
      setIsSettled(active && detail.settled);

      if (!active) {
        return;
      }
    };

    document.addEventListener(CATALOG_MOTION_EVENT, handleMotionUpdate as EventListener);
    return () => {
      document.removeEventListener(CATALOG_MOTION_EVENT, handleMotionUpdate as EventListener);
    };
  }, []);

  const shouldReveal = prefersReducedMotion ? isActive : isActive && isSettled;

  return (
    <LazyMotion features={domAnimation}>
      <Slide slideIndex={5} motionProfile="map" className="bg-background">
        <m.div
          data-parallax="bg"
          className="absolute flex items-end self-center bg-background overflow-hidden justify-center bottom-[5dvh] md:bottom-4 w-[20rem] h-[20rem]"
          initial={false}
          animate={
            shouldReveal
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.96, y: 22 }
          }
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.92, ease: [0.18, 0.84, 0.22, 1] }}
        >
          <m.div
            className="text-xl font-black text-primary z-20 absolute top-34 start-36 flex flex-col items-center justify-center"
            initial={false}
            animate={
              shouldReveal
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: [0.18, 0.84, 0.22, 1] }}
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
            initial={false}
            animate={
              shouldReveal
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.84 }
            }
            transition={{
              delay: prefersReducedMotion ? 0 : 0.35,
              duration: prefersReducedMotion ? 0.01 : 0.86,
              ease: [0.18, 0.84, 0.22, 1],
            }}
          > 
            <IranRouteLines
              className="absolute start-0 bottom-0 h-full w-full"
              startPoint={{ x: 470, y: 280 }}
              animated={shouldReveal && !prefersReducedMotion}
              lineOpacity={shouldReveal ? 1 : 0.35}
              labelOpacity={shouldReveal ? 1 : 0.2}
            />
          </m.div>
        </m.div>

        <div className="flex flex-col p-6">
          <m.h1
            data-reveal="headline"
            data-stagger={0}
            className="font-black text-3xl flex flex-col uppercase ps-1"
            initial={false}
            animate={
              shouldReveal
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.78, ease: [0.18, 0.84, 0.22, 1] }}
          >
            <span className="text-primary">{copy.heading.start}</span>
            <span className="text-secondary">{copy.heading.accent}</span>
          </m.h1>

          <LineBreak data-reveal="body" data-stagger={1} className="mt-4" />

          <m.div
            data-reveal="body"
            data-stagger={2}
            className="flex gap-2"
            initial={false}
            animate={
              shouldReveal
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.5,
              ease: [0.18, 0.84, 0.22, 1],
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
