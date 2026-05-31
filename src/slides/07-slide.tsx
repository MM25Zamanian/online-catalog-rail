import { Slide } from "@/components/slide";
import Image from "next/image";
import Logo from "#/logo.webp";
import Rail from "#/rail.webp";
import type { Dictionary } from "@/i18n";
import {
  GlobeIcon,
  InstagramIcon,
  LocationIcon,
  PhoneIcon,
} from "@/components/icons";
import { LineBreak } from "@/components/line-break";
import { Fragment, JSX, ReactNode, SVGProps } from "react";
import { PhoneNumber } from "@/components/phone-number";

type Slide07Props = {
  copy: Dictionary["slide07"];
};

function ContentItem(params: {
  data: { title: string; content: ReactNode };
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}) {
  return (
    <div className="flex gap-4 z-30 items-center">
      {params.icon && <params.icon className="size-6 text-background shrink-0" />}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col pe-4" key={params.data.title}>
          <h2 className="font-bold text-sm opacity-80 text-secondary">
            {params.data.title}
          </h2>

          {typeof params.data.content === "string" ? (
            <p className="text-white opacity-80">{params.data.content}</p>
          ) : (
            params.data.content
          )}
        </div>
      </div>
    </div>
  );
}

export function Slide07({ copy }: Slide07Props) {
  return (
    <Slide slideIndex={6} motionProfile="contact" className="bg-primary pt-10">
      <Image
        src={Logo}
        alt={copy.logoAlt}
        width={400}
        height={400}
        loading="lazy"
        data-reveal="headline"
        data-stagger={0}
        className="size-24 aspect-square mx-auto"
      />

      <div className="flex flex-col px-6 gap-6">
        <LineBreak data-reveal="body" data-stagger={1} className="mt-8" />

        <div data-reveal="card" data-stagger={2}>
          <ContentItem
            icon={LocationIcon}
            data={{ title: copy.officeLabel, content: copy.office }}
          />
        </div>
        <div data-reveal="card" data-stagger={3}>
          <ContentItem
            icon={LocationIcon}
            data={{
              title: copy.otherOfficesLabel,
              content: (
                <div className="flex flex-wrap max-w-72 items-center gap-x-2">
                  {copy.otherOffices.map((address, index, array) => (
                    <Fragment key={index}>
                      <span className="text-white opacity-80 text-nowrap">{address}</span>
                      {index < array.length - 1 && (
                        <span className="size-1.5 bg-secondary rotate-z-45 opacity-70" />
                      )}
                    </Fragment>
                  ))}
                </div>
              ),
            }}
          />
        </div>

        <div data-reveal="card" data-stagger={4}>
          <ContentItem
            icon={PhoneIcon}
            data={{
              title: copy.mobileNumbersLabel,
              content: (
                <div className="flex flex-wrap max-w-72 items-center gap-x-2">
                  {copy.mobileNumbers.map((number, index) => (
                    <Fragment key={index}>
                      <span className="text-white opacity-80 text-nowrap">
                        <PhoneNumber value={number} clickable />
                      </span>
                      {index % 2 === 0 && (
                        <span
                          key={"badge-" + index}
                          className="size-1.5 bg-secondary rotate-z-45 opacity-70"
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
              ),
            }}
          />
        </div>

        <div data-reveal="card" data-stagger={5}>
          <ContentItem
            icon={InstagramIcon}
            data={{
              title: copy.instagramLabel,
              content: (
                <div className="flex flex-wrap max-w-72 items-center gap-x-2 gap-y-1">
                  {copy.instagram.map((account, index) => (
                    <Fragment key={account}>
                      <a href={"https://instagram.com/" + account} target="_blank">
                        <span className="text-secondary font-black text-sm me-0.5">@</span>
                        <span className="font-bold uppercase text-white tracking-widest text-xs opacity-70">
                          {account}
                        </span>
                      </a>
                      {index < copy.instagram.length - 1 && (
                        <span className="size-1.5 bg-secondary rotate-z-45 opacity-70" />
                      )}
                    </Fragment>
                  ))}
                </div>
              ),
            }}
          />
        </div>

        <div data-reveal="card" data-stagger={7} className="z-20">
          <ContentItem
            icon={GlobeIcon}
            data={{
              title: copy.websiteLabel,
              content: (
                <a href={"https://" + copy.website} target="_blank">
                  <span className="font-bold uppercase text-white tracking-widest text-sm opacity-70">
                    {copy.website.split(".")[0]}
                  </span>
                  <span className="font-bold lowercase text-white text-xs opacity-70">
                    .{copy.website.split(".")[1]}
                  </span>
                </a>
              ),
            }}
          />
        </div>

        <div data-parallax="bg" className="absolute bottom-0 inset-x-0 aspect-[3/1] opacity-80 z-10">
          <span className="inset-0 absolute bg-linear-0 from-primary via-transparent to-primary z-10"></span>

          <Image
            src={Rail}
            alt={copy.railImageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 512px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </Slide>
  );
}
