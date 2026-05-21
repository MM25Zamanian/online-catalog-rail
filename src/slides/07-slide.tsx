import { Slide } from "@/components/slide";
import Image from "next/image";
import Logo from "#/logo.webp";
import Rail from "#/rail.webp";
import type { Dictionary } from "@/i18n";
import {
  DeskphoneIcon,
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
    <div className="flex gap-4 z-20 items-center">
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
    <Slide className="bg-primary pt-10">
      <Image
        src={Logo}
        alt={copy.logoAlt}
        width={400}
        height={400}
        loading="lazy"
        className="size-24 aspect-square mx-auto"
      />

      <div className="flex flex-col px-6 gap-6">
        <LineBreak className="mt-8" />

        <ContentItem
          icon={LocationIcon}
          data={{ title: copy.officeLabel, content: copy.office }}
        />
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

        <ContentItem
          icon={DeskphoneIcon}
          data={{
            title: copy.deskphoneNumbersLabel,
            content: (
              <div className="flex flex-wrap max-w-72 items-center gap-x-2">
                {copy.deskphoneNumbers.map((number, index) => (
                  <Fragment key={index}>
                    <span className="text-white opacity-80 text-nowrap">
                      <PhoneNumber value={number} clickable />
                    </span>
                    {index % 2 === 0 && (
                      <span className="size-1.5 bg-secondary rotate-z-45 opacity-70" />
                    )}
                  </Fragment>
                ))}
              </div>
            ),
          }}
        />

        <ContentItem
          icon={InstagramIcon}
          data={{
            title: copy.instagramLabel,
            content: (
              <a href={"https://instagram.com/" + copy.instagram} target="_blank">
                <span className="text-secondary font-black text-sm me-0.5">@</span>
                <span className="font-bold uppercase text-white tracking-widest text-xs opacity-70">
                  {copy.instagram}
                </span>
              </a>
            ),
          }}
        />

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

        <div className="absolute bottom-0 inset-x-0 aspect-[3/1] opacity-80">
          <span className="inset-0 absolute bg-linear-0 from-primary via-transparent to-primary z-20"></span>

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
