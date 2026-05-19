import { Slide } from "@/components/slide";
import Image from "next/image";
import IranMap from "#/iran-map.webp";
import { IranRouteLines } from "@/components/iran-routes-lines";

export function FourthSlide() {
  return (
    <Slide className="bg-background">
      <div className="absolute flex items-end justify-center bottom-0 end-0 w-[20rem] h-[20rem]">
        <Image
          src={IranMap}
          alt="Iran Map"
          width={400}
          height={400}
          sizes="(max-width: 768px) 100vw, 320px"
          loading="lazy"
          className="object-contain mix-blend-darken size-58 me-14 z-20"
        />

        <IranRouteLines
          className="absolute start-0 bottom-0 z-10 h-full w-full"
          startPoint={{ x: 395, y: 500 }}
        />
      </div>
    </Slide>
  );
}
