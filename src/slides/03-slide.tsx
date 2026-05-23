import { Slide } from "@/components/slide";
import Logo from "#/logo.webp";
import TrainBackground from "#/monochrome-freight-train-on-tracks.webp";
import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { AwardIcon, GlobeIcon, TrainIcon, UsersIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { getBuildLocale } from "@/i18n";
import { LineBreak } from "@/components/line-break";
import { NumberTicker } from "@/components/number-ticker";

type Slide03Props = {
  brand: Dictionary["brand"];
  copy: Dictionary["slide03"];
};

const locale = getBuildLocale();

const statIcons = {
  award: AwardIcon,
  globe: GlobeIcon,
  train: TrainIcon,
  users: UsersIcon,
} as const;

export function Slide03({ brand, copy }: Slide03Props) {
  const titleParts = copy.title.split(" ");
  const hasSplitTitle = locale === "en" && titleParts.length === 2;

  return (
    <Slide slideIndex={2} motionProfile="content" className="bg-background">
      <div
        data-parallax="bg"
        className="absolute inset-x-0 bottom-0 h-[52%] md:h-[56%] bg-background"
      >
        <span className="absolute inset-0 z-10 bg-linear-to-t from-background via-background/70 to-transparent" />
        <span className="absolute inset-0 z-10 bg-linear-to-r from-background via-transparent to-background/20 md:from-background/85 md:via-background/10 md:to-background/10" />

        <Image
          src={TrainBackground}
          alt={copy.backgroundAlt}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 512px"
          className="object-cover mix-blend-darken object-[72%_65%] opacity-75 md:object-right-bottom"
        />
      </div>

      <div className="flex flex-col h-full px-6 pt-8 pb-6 z-20">
        <div
          data-reveal="headline"
          data-stagger={0}
          className="flex items-center gap-3"
        >
          <Image
            src={Logo}
            alt={copy.logoAlt}
            width={72}
            height={72}
            loading="lazy"
            className="size-12 sm:size-14"
          />

          <div className="flex flex-col">
            <h1 className="text-primary text-xl sm:text-2xl font-bold uppercase tracking-[0.25rem] leading-tight">
              {brand.name}{" "}
              <span className="text-secondary">{brand.accent}</span>
            </h1>
            <h2
              className={cn(
                "text-[0.625rem] sm:text-xs font-bold opacity-70 uppercase text-primary",
                locale === "en" ? "tracking-[0.14rem]" : "tracking-[0.14rem]"
              )}
            >
              {brand.subtitle}
            </h2>
          </div>
        </div>

        <div className="mt-6 max-w-md">
          <h3
            data-reveal="headline"
            data-stagger={1}
            className="text-primary text-3xl sm:text-4xl font-black uppercase tracking-wide leading-none"
          >
            {hasSplitTitle ? (
              <>
                <span>{titleParts[0]} </span>
                <span className="text-secondary">{titleParts[1]}</span>
              </>
            ) : (
              copy.title
            )}
          </h3>

          <LineBreak data-reveal="body" data-stagger={2} className="my-4" />

          <div className="mt-4 flex flex-col gap-3">
            {copy.introParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                data-reveal="body"
                data-stagger={index + 3}
                className="text-primary/90 text-xs sm:text-sm leading-relaxed tracking-wide text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-4">
          {copy.stats.map((stat) => {
            const Icon = statIcons[stat.iconKey];

            return (
              <div
                key={stat.label}
                data-reveal="card"
                data-stagger={4}
                className={cn(
                  "relative rounded-xl border border-secondary/60 bg-white/20 backdrop-blur-xs shadow-[0_8px_20px_rgba(3,22,42,0.08)]",
                  "flex flex-col items-center text-center px-2 py-3 sm:px-3 sm:py-4"
                )}
              >
                <div className="p-2 rounded-full bg-primary border border-secondary/80 flex items-center justify-center mb-2 -mt-6 shadow-[0_4px_10px_rgba(3,22,42,0.25)]">
                  <Icon className="size-8 text-secondary" />
                </div>

                <p className="text-primary font-black text-3xl leading-none">
                  <span className="text-secondary">{stat.suffix}</span>
                  <NumberTicker delay={1} value={Number(stat.value)} />
                </p>

                <p className="mt-2 text-[0.625rem] sm:text-[0.7rem] font-bold uppercase tracking-wider text-primary/80 leading-tight">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}
