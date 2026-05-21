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
    slide01: {
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
    slide02: {
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
        intro: "WE DON'T JUST MOVE CARGO,",
        accent: "WE MOVE",
        end: "BUSINESS FORWARD.",
      },
    },
    slide03: {
      logoAlt: "Khalij Fars Rail logo",
      backgroundAlt: "Monochrome freight train on railway tracks",
      title: "ABOUT US",
      introParagraphs: [
        "Khalij Fars Rail International Transportation is a trusted logistics partner specializing in international rail freight services. We connect key markets across CIS countries, Central Asia, Turkey, Afghanistan, and the Middle East.",
        "With over 25 years of industry experience, strong international partnerships, and a customer-focused approach, we provide efficient, secure, and cost-effective transportation solutions tailored to each client's needs.",
      ],
      stats: [
        {
          value: "25",
          suffix: "+",
          label: "YEARS OF EXPERIENCE",
          iconKey: "award",
        },
        {
          value: "10",
          suffix: "+",
          label: "COUNTRIES CONNECTED",
          iconKey: "globe",
        },
        {
          value: "5000",
          suffix: "+",
          label: "WAGONS MANAGED",
          iconKey: "train",
        },
        {
          value: "300",
          suffix: "+",
          label: "SATISFIED CLIENTS",
          iconKey: "users",
        },
      ],
    },
    slide04: {
      backgroundAlt: "Railway perspective background",
      heading: {
        start: "OUR",
        accent: "SERVICES",
      },
      intro:
        "We provide comprehensive rail transportation and logistics solutions designed to meet the diverse needs of our clients across international corridors. Our services ensure safe, efficient and cost-effective cargo movement every step of the way.",
      services: [
        {
          title: "Rail Transportation",
          description:
            "All types of wagon services across CIS, Iran with reliable and timely delivery.",
          iconKey: "train",
        },
        {
          title: "Road Transportation",
          description:
            "Flexible road transport services for door-to-door delivery and first/last mile connectivity.",
          iconKey: "truck",
        },
        {
          title: "Transit Services",
          description:
            "Reliable transit solutions across CIS countries and regional corridors.",
          iconKey: "globe",
        },
        {
          title: "Wagon Reservation",
          description:
            "Wagon supply and reservation services of all types to meet your cargo requirements.",
          iconKey: "package",
        },
      ],
    },
    slide05: {
      backgroundAlt: "Railway perspective background",
      heading: {
        start: "OUR",
        accent: "SERVICES",
        continued: "CONTINUED",
      },
      intro:
        "Our support services complete the transportation cycle with compliance, documentation and risk protection across every shipment stage.",
      services: [
        {
          title: "Customs Clearance",
          description:
            "Fast and efficient customs clearance with full compliance and documentation support.",
          iconKey: "factCheck",
        },
        {
          title: "Documentation",
          description:
            "Complete documentation services to ensure smooth and hassle-free shipments.",
          iconKey: "description",
        },
        {
          title: "Packaging & Insurance",
          description:
            "Professional packaging solutions and comprehensive cargo insurance for maximum protection.",
          iconKey: "shield",
        },
        {
          title: "Logistics & Warehousing",
          description:
            "Secure warehousing and logistics management solutions tailored to your supply chain.",
          iconKey: "warehouse",
        },
      ],
    },
    slide06: {
      countryLabel: "iran",
      heading: {
        start: "our routes &",
        accent: "coverage",
      },
      terminalsTitle: "iran terminals",
      terminals: [
        "mashhad",
        "motahari",
        "sarakhs",
        "bandar abbas",
        "inche borun",
        "lotf abad",
        "tehran",
        "yazd",
        "isfahan",
      ],
      destinationsTitle: "destinations",
      destinations: [
        "russia",
        "kazakhstan",
        "uzbekistan",
        "kyrgyzstan",
        "tajikistan",
        "turkmenistan",
        "turkey",
        "afghanistan",
      ],
    },
    slide07: {
      logoAlt: "Khalij Fars Rail logo",
      railImageAlt: "Rail track footer image",
      officeLabel: "Office:",
      office: "Shahid Sadeghi 17, No. 7, Mashhod, Iran",
      otherOfficesLabel: "Other Offices:",
      otherOffices: ["Tehran", "Bandar Abbas", "Sarakhs"],
      mobileNumbersLabel: "Mobile Numbers:",
      mobileNumbers: [
        "+989152826059",
        "+989151160448",
        "+989152826059",
        "+989151160448",
      ],
      deskphoneNumbersLabel: "DeskPhone Numbers:",
      deskphoneNumbers: ["+989152826059", "+989151160448"],
      instagramLabel: "Instagram:",
      instagram: "Khaliffarsraillogistic",
      websiteLabel: "Website:",
      website: "khalijfarsrail.com",
    },
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
    slide01: {
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
    slide02: {
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
    slide03: {
      logoAlt: "Khalij Fars Rail logosu",
      backgroundAlt: "Tek renkli yük treni ve demiryolu hattı",
      title: "HAKKIMIZDA",
      introParagraphs: [
        "Khalij Fars Rail Uluslararası Taşımacılık, uluslararası demiryolu yük taşımacılığı alanında uzmanlaşmış güvenilir bir lojistik iş ortağıdır. BDT ülkeleri, Orta Asya, Türkiye, Afganistan ve Orta Doğu'daki önemli pazarları birbirine bağlıyoruz.",
        "Sektördeki köklü deneyimimiz, güçlü iş ortaklıklarımız ve müşteri odaklı yaklaşımımız sayesinde, en yüksek hizmet standartlarında verimli ve güvenilir taşımacılık çözümleri sunuyoruz.",
      ],
      stats: [
        {
          value: "25",
          suffix: "+",
          label: "YILLIK DENEYIM",
          iconKey: "award",
        },
        {
          value: "10",
          suffix: "+",
          label: "BAĞLANTILI ÜLKE",
          iconKey: "globe",
        },
        {
          value: "5000",
          suffix: "+",
          label: "VAGON KAPASITESI",
          iconKey: "train",
        },
        {
          value: "300",
          suffix: "+",
          label: "MEMNUN MÜŞTERI",
          iconKey: "users",
        },
      ],
    },
    slide04: {
      backgroundAlt: "Demiryolu perspektif arka planı",
      heading: {
        start: "HİZMET",
        accent: "ALANLARIMIZ",
      },
      intro:
        "Müşterilerimizin uluslararası koridorlardaki farklı ihtiyaçlarını karşılamak için kapsamlı demiryolu taşımacılığı ve lojistik çözümleri sunuyoruz. Hizmetlerimiz, yüklerinizin her adımda güvenli, verimli ve maliyet etkin şekilde taşınmasını sağlar.",
      services: [
        {
          title: "Demiryolu Taşımacılığı",
          description:
            "BDT ülkeleri ve İran genelinde tüm vagon tiplerinde güvenilir ve zamanında teslimat hizmeti.",
          iconKey: "train",
        },
        {
          title: "Karayolu Taşımacılığı",
          description:
            "Kapıdan kapıya teslimat ile ilk/son kilometre bağlantısı için esnek karayolu taşımacılığı.",
          iconKey: "truck",
        },
        {
          title: "Transit Hizmetleri",
          description:
            "BDT ülkeleri ve bölgesel koridorlarda güvenilir transit taşımacılık çözümleri.",
          iconKey: "globe",
        },
        {
          title: "Vagon Rezervasyonu",
          description:
            "Yük ihtiyaçlarınızı karşılamak için tüm tiplerde vagon tedarik ve rezervasyon hizmeti.",
          iconKey: "package",
        },
      ],
    },
    slide05: {
      backgroundAlt: "Demiryolu perspektif arka planı",
      heading: {
        start: "HİZMET",
        accent: "ALANLARIMIZ",
        continued: "DEVAMI",
      },
      intro:
        "Destek hizmetlerimiz, taşıma sürecini mevzuat uyumu, evrak yönetimi ve yük güvenliği ile uçtan uca tamamlar.",
      services: [
        {
          title: "Gümrükleme",
          description:
            "Tam mevzuat uyumu ve dokümantasyon desteğiyle hızlı ve etkili gümrük işlemleri.",
          iconKey: "factCheck",
        },
        {
          title: "Dokümantasyon",
          description:
            "Sevkiyatlarınızın sorunsuz ilerlemesi için eksiksiz dokümantasyon hizmetleri.",
          iconKey: "description",
        },
        {
          title: "Paketleme ve Sigorta",
          description:
            "Maksimum koruma için profesyonel paketleme çözümleri ve kapsamlı yük sigortası.",
          iconKey: "shield",
        },
        {
          title: "Lojistik ve Depolama",
          description:
            "Tedarik zincirinize özel güvenli depolama ve lojistik yönetim çözümleri.",
          iconKey: "warehouse",
        },
      ],
    },
    slide06: {
      countryLabel: "iran",
      heading: {
        start: "rotalarımız ve",
        accent: "kapsama alanımız",
      },
      terminalsTitle: "iran terminalleri",
      terminals: [
        "meşhed",
        "motahari",
        "serahs",
        "bender abbas",
        "inçe burun",
        "lotf abad",
        "tahran",
        "yezd",
        "isfahan",
      ],
      destinationsTitle: "varış noktaları",
      destinations: [
        "rusya",
        "kazakistan",
        "özbekistan",
        "kırgızistan",
        "tacikistan",
        "türkmenistan",
        "türkiye",
        "afganistan",
      ],
    },
    slide07: {
      logoAlt: "Khalij Fars Rail logosu",
      railImageAlt: "Demiryolu hattı görseli",
      officeLabel: "Ofis:",
      office: "Shahid Sadeghi 17, No. 7, Mashhod, Iran",
      otherOfficesLabel: "Diğer Ofisler:",
      otherOffices: ["Tahran", "Bender Abbas", "Serahs"],
      mobileNumbersLabel: "Cep Numaraları:",
      mobileNumbers: [
        "+989152826059",
        "+989151160448",
        "+989152826059",
        "+989151160448",
      ],
      deskphoneNumbersLabel: "Sabit Hat Numaraları:",
      deskphoneNumbers: ["+989152826059", "+989151160448"],
      instagramLabel: "Instagram:",
      instagram: "Khaliffarsraillogistic",
      websiteLabel: "Web Sitesi:",
      website: "khalijfarsrail.com",
    },
  },
} satisfies Record<Locale, Dictionary>;
