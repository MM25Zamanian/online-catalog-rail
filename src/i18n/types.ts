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
  slide01: {
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
  slide02: {
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
  slide03: {
    logoAlt: string;
    backgroundAlt: string;
    title: string;
    introParagraphs: [string, string];
    stats: {
      value: string;
      suffix: string;
      label: string;
      iconKey: "award" | "globe" | "train" | "users";
    }[];
  };
  slide04: {
    backgroundAlt: string;
    heading: {
      start: string;
      accent: string;
    };
    intro: string;
    services: {
      title: string;
      description: string;
      iconKey:
        | "train"
        | "shield"
        | "truck"
        | "warehouse"
        | "factCheck"
        | "description"
        | "globe"
        | "package";
    }[];
  };
  slide05: {
    backgroundAlt: string;
    heading: {
      start: string;
      accent: string;
      continued: string;
    };
    intro: string;
    services: {
      title: string;
      description: string;
      iconKey: "shield" | "warehouse" | "factCheck" | "description";
    }[];
  };
  slide06: {
    countryLabel: string;
    heading: {
      start: string;
      accent: string;
    };
    terminalsTitle: string;
    terminals: string[];
    destinationsTitle: string;
    destinations: string[];
  };
  slide07: {
    logoAlt: string;
    railImageAlt: string;
    officeLabel: string;
    office: string;
    otherOfficesLabel: string;
    otherOffices: string[];
    mobileNumbersLabel: string;
    mobileNumbers: string[];
    instagramLabel: string;
    instagram: string[];
    websiteLabel: string;
    website: string;
  };
};
