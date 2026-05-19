export const locales = ["en", "tr"] as const;

export type Locale = (typeof locales)[number];

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    accent: string;
    subtitle: string;
  };
  firstSlide: {
    logoAlt: string;
    railImageAlt: string;
    tagline: {
      start: string;
      accent: string;
    };
    services: {
      title: string;
      description: string;
    }[];
    footer: string;
  };
  secondSlide: {
    logoAlt: string;
    railImageAlt: string;
    officeLabel: string;
    office: string;
    otherOfficesLabel: string;
    otherOffices: string;
    mobileNumbers: string[];
    deskphoneNumbers: string[];
    instagram: string;
    website: string;
  };
  thirdSlide: {
    trafficLightsAlt: string;
    heading: {
      start: string;
      accent: string;
    };
    reasons: string[];
    closing: {
      intro: string;
      accent: string;
      end: string;
    };
  };
  fourthSlide: unknown;
};
