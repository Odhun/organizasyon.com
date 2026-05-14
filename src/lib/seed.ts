import { createService } from "./firebase/services";
import { createGalleryItem } from "./firebase/gallery";
import { updateSiteSettings } from "./firebase/siteSettings";
import { mockServices, mockGallery } from "./mock-data";

export async function seedServices() {
  await Promise.all(
    mockServices.map((s) =>
      createService({
        slug: s.slug,
        category: s.category,
        title: { tr: s.title, en: s.title },
        shortDescription: { tr: s.shortDescription, en: s.shortDescription },
        description: { tr: s.description, en: s.description },
        features: { tr: s.features, en: s.features },
        priceRange: s.priceRange,
        coverImage: s.coverImage ?? "",
        galleryImages: [],
        order: s.order,
        active: true,
      })
    )
  );
}

export async function seedGallery() {
  await Promise.all(
    mockGallery.map((g, i) =>
      createGalleryItem({
        title: { tr: g.title, en: g.title },
        category: g.category,
        coverImage: g.imageUrl,
        images: [g.imageUrl],
        order: i + 1,
        active: true,
      })
    )
  );
}

export async function initializeSiteSettings() {
  await updateSiteSettings({
    brand: {
      name: { tr: "Odhun Organizasyon", en: "Odhun Events" },
      tagline: { tr: "Organizasyon", en: "Organization" },
      logoUrl: "",
      faviconUrl: "",
    },
    theme: "gold-classic",
    hero: {
      titleLine1: { tr: "Hayalinizdeki Etkinlik", en: "Your Dream Event" },
      titleLine2: { tr: "", en: "" },
      subtitle: {
        tr: "Düğününüzden doğum gününüze, kurumsal etkinlikten mezuniyete — her organizasyonda profesyonel dokunuşu hissettiriyoruz.",
        en: "From weddings to birthdays, corporate events to graduations — we bring a professional touch to every celebration.",
      },
      ctaText: { tr: "Teklif Al", en: "Get a Quote" },
      ctaLink: "/teklif",
      backgroundImage: "",
    },
    contact: {
      phone: "+90 532 123 45 67",
      whatsapp: "+90 532 123 45 67",
      email: "info@odhunorganizasyon.com",
      address: { tr: "Anamur, Mersin", en: "Anamur, Mersin" },
      workingHours: { tr: "Pzt–Cmt 09:00–19:00", en: "Mon–Sat 09:00–19:00" },
      mapsEmbedUrl: "",
    },
    social: {
      instagram: "",
      facebook: "",
      youtube: "",
      twitter: "",
      tiktok: "",
      pinterest: "",
    },
    about: {
      title: { tr: "Hakkımızda", en: "About Us" },
      story: {
        tr: "Odhun Organizasyon, 2009 yılında Anamur'da kuruldu. Her etkinliğe özel, profesyonel organizasyon hizmeti sunuyoruz.",
        en: "Odhun Events was founded in 2009 in Anamur. We provide professional event organization tailored to each occasion.",
      },
      teamPhoto: "",
      values: [],
    },
    announcement: {
      enabled: false,
      text: { tr: "", en: "" },
      style: "gold",
      dismissible: true,
    },
    seo: {
      defaultTitle: {
        tr: "Odhun Organizasyon | Profesyonel Etkinlik Yönetimi",
        en: "Odhun Events | Professional Event Management",
      },
      defaultDescription: {
        tr: "Anamur'da düğün, nişan, doğum günü ve tüm özel etkinlikler için profesyonel organizasyon.",
        en: "Professional event organization for weddings, birthdays and all special occasions in Anamur.",
      },
      ogImage: "",
      keywords: {
        tr: "düğün organizasyon, nişan, doğum günü, etkinlik, Anamur",
        en: "wedding events, organization, birthday, corporate, Anamur",
      },
    },
  });
}
