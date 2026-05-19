import type { Dictionary, Locale } from "./types";

export const dictionaries = {
  en: {
    metadata: {
      title: "Khalij Fars Rail | International Transportation",
      description:
        "Online catalog for Khalij Fars Rail international transportation and logistics services.",
    },
    brand: {
      name: "khalij fars",
      accent: "rail",
      subtitle: "international transportation",
    },
    firstSlide: {
      logoAlt: "Khalij Fars Rail logo",
      railImageAlt: "Rail freight train",
      tagline: {
        start: "connecting destinations,",
        accent: "creating value",
      },
      services: [
        {
          title: "rail",
          description: "transport",
        },
        {
          title: "road",
          description: "delivery",
        },
        {
          title: "sea",
          description: "freight",
        },
        {
          title: "customs",
          description: "clearance",
        },
      ],
      footer: "your trusted partner in global logistics",
    },
    secondSlide: {
      logoAlt: "Khalij Fars Rail logo",
      railImageAlt: "Rail track footer image",
      officeLabel: "Office:",
      office: "Shahid Sadeghi 17, No. 7, Mashhod, Iran",
      otherOfficesLabel: "Other Offices:",
      otherOffices: "Tehran - Bandar Abbas - Sarakhs",
      mobileNumbers: [
        "+989152826059 - +989151160448",
        "+989152826059 - +989151160448",
      ],
      deskphoneNumbers: ["+989152826059 - +989151160448"],
      instagram: "Khaliffarsraillogistic",
      website: "www.khalijfarsrail.com",
    },
    thirdSlide: {
      trafficLightsAlt: "Traffic lights",
      heading: {
        start: "why",
        accent: "us?",
      },
      reasons: [
        "+25 Years of Experience",
        "Strong Rail & Transit Network",
        "Fast Customs Clearance",
        "Coverage Across CIS Countries",
        "Reliable & Cost-Effective Solutions",
        "Professional Logistics Support",
      ],
      closing: {
        intro: "WE DON’T JUST MOVE CARGO,",
        accent: "WE MOVE",
        end: "BUSINESS FORWARD.",
      },
    },
    fourthSlide: {},
  },
  tr: {
    metadata: {
      title: "Khalij Fars Rail | Uluslararası Taşımacılık",
      description:
        "Khalij Fars Rail uluslararası taşımacılık ve lojistik hizmetleri için online katalog.",
    },
    brand: {
      name: "khalij fars",
      accent: "rail",
      subtitle: "uluslararası taşımacılık",
    },
    firstSlide: {
      logoAlt: "Khalij Fars Rail logosu",
      railImageAlt: "Demiryolu yük treni",
      tagline: {
        start: "destinasyonları birbirine bağlarız,",
        accent: "değer yaratırız",
      },
      services: [
        {
          title: "demiryolu",
          description: "taşımacılık",
        },
        {
          title: "karayolu",
          description: "teslimat",
        },
        {
          title: "denizyolu",
          description: "navlun",
        },
        {
          title: "gümrük",
          description: "işlemleri",
        },
      ],
      footer: "küresel lojistikte güvenilir ortağınız",
    },
    secondSlide: {
      logoAlt: "Khalij Fars Rail logosu",
      railImageAlt: "Demiryolu hattı görseli",
      officeLabel: "Ofis:",
      office: "Shahid Sadeghi 17, No. 7, Mashhod, Iran",
      otherOfficesLabel: "Diğer Ofisler:",
      otherOffices: "Tehran - Bandar Abbas - Sarakhs",
      mobileNumbers: [
        "+989152826059 - +989151160448",
        "+989152826059 - +989151160448",
      ],
      deskphoneNumbers: ["+989152826059 - +989151160448"],
      instagram: "Khaliffarsraillogistic",
      website: "www.khalijfarsrail.com",
    },
    thirdSlide: {
      trafficLightsAlt: "Trafik ışıkları",
      heading: {
        start: "neden",
        accent: "biz?",
      },
      reasons: [
        "+25 Yıllık Deneyim",
        "Güçlü Demiryolu ve Transit Ağı",
        "Hızlı Gümrükleme",
        "BDT Ülkeleri Genelinde Kapsama",
        "Güvenilir ve Ekonomik Çözümler",
        "Profesyonel Lojistik Desteği",
      ],
      closing: {
        intro: "SADECE YÜK TAŞIMIYORUZ,",
        accent: "İŞİNİZİ",
        end: "İLERİ TAŞIYORUZ.",
      },
    },
    fourthSlide: {},
  },
} satisfies Record<Locale, Dictionary>;
