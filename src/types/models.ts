import type { Timestamp } from "firebase/firestore";

export interface Service {
  id: string;
  slug: string;
  category: "dugun" | "dogum_gunu" | "kurumsal" | "mezuniyet";
  title: { tr: string; en: string };
  shortDescription: { tr: string; en: string };
  description: { tr: string; en: string };
  features: { tr: string[]; en: string[] };
  priceRange?: string;
  coverImage: string;
  galleryImages?: string[];
  order: number;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface GalleryItem {
  id: string;
  title: { tr: string; en: string };
  category: string;
  eventDate?: Timestamp;
  coverImage: string;
  images: string[];
  description?: { tr: string; en: string };
  order: number;
  active: boolean;
  createdAt: Timestamp;
}

export interface Testimonial {
  id: string;
  customerName: string;
  eventType: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: { tr: string; en?: string };
  approved: boolean;
  customerPhoto?: string;
  createdAt: Timestamp;
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: Timestamp;
  guestCount?: number;
  location?: string;
  budget?: string;
  message: string;
  status: "new" | "in_review" | "approved" | "cancelled";
  internalNotes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SiteSettings {
  brand: {
    name: { tr: string; en: string };
    tagline: { tr: string; en: string };
    logoUrl: string;
    faviconUrl: string;
  };
  theme: "gold-classic" | "rose-elegant" | "emerald-luxe" | "midnight-gold";
  hero: {
    titleLine1: { tr: string; en: string };
    titleLine2: { tr: string; en: string };
    subtitle: { tr: string; en: string };
    ctaText: { tr: string; en: string };
    ctaLink: string;
    backgroundImage: string;
  };
  contact: {
    phone: string;
    whatsapp?: string;
    email: string;
    address: { tr: string; en: string };
    mapsEmbedUrl?: string;
    workingHours: { tr: string; en: string };
  };
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    pinterest?: string;
  };
  about: {
    title: { tr: string; en: string };
    story: { tr: string; en: string };
    teamPhoto?: string;
    values: Array<{
      icon: string;
      title: { tr: string; en: string };
      description: { tr: string; en: string };
    }>;
    stats?: Array<{
      number: string;
      label: { tr: string; en: string };
    }>;
  };
  announcement: {
    enabled: boolean;
    text: { tr: string; en: string };
    link?: string;
    style: "gold" | "forest" | "ink";
    dismissible: boolean;
  };
  seo: {
    defaultTitle: { tr: string; en: string };
    defaultDescription: { tr: string; en: string };
    ogImage: string;
    keywords: { tr: string; en: string };
  };
  updatedAt: Timestamp;
}
