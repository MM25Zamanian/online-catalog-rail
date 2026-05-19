import { Slide } from "@/components/slide";
import Image from "next/image";
import TrafficLights from "#/traffic-lights.webp";
import { cn } from "@/lib/utils";
import { getBuildLocale, type Dictionary } from "@/i18n";

function ListItem({ content }: { content: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-2 bg-secondary rotate-z-45"></div>
      <div className="text-sm tracking-wider">{content}</div>
    </div>
  );
}

type ThirdSlideProps = {
  brand: Dictionary["brand"];
  copy: Dictionary["thirdSlide"];
};

const locale = getBuildLocale();

export function ThirdSlide({ brand, copy }: ThirdSlideProps) {
  return (
    <Slide className="bg-background">
      <div className="absolute bottom-0 end-0 w-[20rem] h-[42rem]">
        <Image
          src={TrafficLights}
          alt={copy.trafficLightsAlt}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          loading="lazy"
          className="object-cover mix-blend-darken translate-x-20"
        />

        <span
          className={cn(
            "size-10 absolute z-20 top-[19.75%] end-[17.75%] rounded-full",
            "bg-rose-500 mix-blend-overlay shadow-[0_0_1rem_0.5rem_var(--color-rose-500)]",
            "animate-traffic-lights-pulse"
          )}
        ></span>

        <span
          className={cn(
            "size-10 absolute z-20 top-[26.5%] end-[17.75%] rounded-full",
            "bg-amber-500 mix-blend-overlay shadow-[0_0_1rem_0.5rem_var(--color-amber-500)] ",
            "animate-traffic-lights-pulse delay-1000"
          )}
        ></span>

        <span
          className={cn(
            "size-10 absolute z-20 top-[33.25%] end-[17.75%] rounded-full",
            "bg-green-500 mix-blend-overlay shadow-[0_0_1rem_0.5rem_var(--color-green-500)] ",
            "animate-traffic-lights-pulse delay-2000"
          )}
        ></span>
      </div>

      <div className="flex flex-col my-auto w-min px-6">
        <div className="flex flex-col">
          <h1 className="text-primary text-4xl font-bold uppercase tracking-wider text-nowrap">
            {brand.name} <span className="text-secondary">{brand.accent}</span>
          </h1>
          <h2
            className={cn(
              "text-xs font-bold opacity-70 uppercase text-primary text-nowrap",
              locale === "en" ? "tracking-[0.325rem]" : "tracking-wide"
            )}
          >
            {brand.subtitle}
          </h2>
        </div>

        <div className="w-full relative my-8">
          <hr className="border-t-secondary border-t-2 opacity-70" />

          <span className="size-3 bg-secondary absolute top-1/2 start-1/2 rounded-full -translate-x-1.5 -translate-y-1.5"></span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-primary text-4xl font-bold uppercase tracking-wider">
            {copy.heading.start}{" "}
            <span className="text-secondary">{copy.heading.accent}</span>
          </h1>

          <div className="flex flex-col gap-4 mt-4">
            {copy.reasons.map((reason) => (
              <ListItem key={reason} content={reason} />
            ))}
          </div>
        </div>

        <div className="w-full relative my-8">
          <hr className="border-t-secondary border-t-2 opacity-70" />

          <span className="size-3 bg-secondary absolute top-1/2 start-1/2 rounded-full -translate-x-1.5 -translate-y-1.5"></span>
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-primary opacity-90 mb-2">
            {copy.closing.intro}
          </span>
          <span className="font-black text-secondary text-2xl leading-6">
            {copy.closing.accent}
          </span>
          <span className="font-black text-primary text-2xl leading-6">
            {copy.closing.end}
          </span>
        </div>
      </div>
    </Slide>
  );
}
