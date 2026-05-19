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

type SecondSlideProps = {
  copy: Dictionary["secondSlide"];
};

export function SecondSlide({ copy }: SecondSlideProps) {
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

      <div className="flex flex-col px-6">
        <div className="w-full relative mt-8 mb-4">
          <hr className="border-t-secondary border-t-2 opacity-70" />

          <span className="size-3 bg-secondary absolute top-1/2 start-1/2 rounded-full -translate-x-1.5 -translate-y-1.5"></span>
        </div>

        <div className="flex gap-4">
          <div className="aspect-square p-2 h-12 bg-secondary rounded-lg">
            <LocationIcon className="size-8 text-background" />
          </div>
          <div className="flex flex-col gap-4 pt-1">
            <div className="flex flex-col pe-4">
              <h2 className="font-black text-sm text-secondary">
                {copy.officeLabel}
              </h2>
              <p className="font-bold text-white opacity-80">{copy.office}</p>
            </div>
            <div className="flex flex-col">
              <h2 className="font-black text-sm text-secondary">
                {copy.otherOfficesLabel}
              </h2>
              <p className="font-bold text-white opacity-80">
                {copy.otherOffices}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-t-secondary border-t-2 opacity-50 my-3" />

        <div className="flex gap-4">
          <div className="aspect-square p-2 h-12 bg-secondary rounded-lg">
            <PhoneIcon className="size-8 text-background" />
          </div>
          <div className="flex flex-col gap-4 pt-1">
            <div className="flex flex-col">
              {copy.mobileNumbers.map((number, index) => (
                <p key={index} className="font-bold text-white opacity-80">
                  {number}
                </p>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t-secondary border-t-2 opacity-50 my-3" />

        <div className="flex gap-4">
          <div className="aspect-square p-2 h-12 bg-secondary rounded-lg">
            <DeskphoneIcon className="size-8 text-background" />
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col">
              {copy.deskphoneNumbers.map((number, index) => (
                <p key={index} className="font-bold text-white opacity-80">
                  {number}
                </p>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t-secondary border-t-2 opacity-50 my-3" />

        <div className="flex gap-4 z-30">
          <div className="aspect-square p-2 h-12 bg-secondary rounded-lg">
            <InstagramIcon className="size-8 text-background" />
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col">
              <p className="font-bold text-white opacity-80">
                {copy.instagram}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-t-secondary border-t-2 opacity-50 my-3 z-30" />

        <div className="flex gap-4 z-30">
          <div className="aspect-square p-2 h-12 bg-secondary rounded-lg">
            <GlobeIcon className="size-8 text-background" />
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex flex-col">
              <p className="font-bold text-white opacity-80">{copy.website}</p>
            </div>
          </div>
        </div>

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
