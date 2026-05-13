import type { Service, GalleryItem, Testimonial } from "@/types/models";
import { getServices } from "./firebase/services";
import { getGalleryItems } from "./firebase/gallery";
import { getApprovedTestimonials } from "./firebase/testimonials";
import { mockServices, mockGallery, mockTestimonials } from "./mock-data";

export interface DisplayService {
  id?: string;
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  priceRange?: string;
  coverImage?: string;
  gradient: string;
  icon: string;
}

export interface DisplayGalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year?: string;
}

export interface DisplayTestimonial {
  id?: string;
  name: string;
  event: string;
  comment: string;
  rating: number;
  date?: string;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  dugun: "from-rose-300 to-rose-500",
  dogum_gunu: "from-amber-300 to-amber-500",
  kurumsal: "from-sky-300 to-sky-500",
  mezuniyet: "from-emerald-300 to-emerald-500",
};

const CATEGORY_ICONS: Record<string, string> = {
  dugun: "Heart",
  dogum_gunu: "Gift",
  kurumsal: "Briefcase",
  mezuniyet: "GraduationCap",
};

function serviceToDisplay(s: Service, locale: string): DisplayService {
  return {
    id: s.id,
    slug: s.slug,
    category: s.category,
    title: locale === "en" ? s.title.en : s.title.tr,
    shortDescription: locale === "en" ? s.shortDescription.en : s.shortDescription.tr,
    description: locale === "en" ? s.description.en : s.description.tr,
    features: locale === "en" ? s.features.en : s.features.tr,
    priceRange: s.priceRange,
    coverImage: s.coverImage,
    gradient: CATEGORY_GRADIENTS[s.category] ?? "from-amber-300 to-amber-500",
    icon: CATEGORY_ICONS[s.category] ?? "Gift",
  };
}

function galleryToDisplay(item: GalleryItem, locale: string): DisplayGalleryItem {
  const ts = item.eventDate as unknown as { seconds: number } | undefined;
  const year = ts ? new Date(ts.seconds * 1000).getFullYear().toString() : undefined;
  return {
    id: item.id,
    title: locale === "en" ? item.title.en : item.title.tr,
    category: item.category,
    imageUrl: item.coverImage,
    year,
  };
}

function testimonialToDisplay(t: Testimonial, locale: string): DisplayTestimonial {
  return {
    id: t.id,
    name: t.customerName,
    event: t.eventType,
    comment: locale === "en" && t.comment.en ? t.comment.en : t.comment.tr,
    rating: t.rating,
  };
}

export async function fetchServices(locale: string): Promise<DisplayService[]> {
  try {
    const data = await getServices();
    if (data.length > 0) return data.map((s) => serviceToDisplay(s, locale));
  } catch {}
  return mockServices.map((s) => ({
    slug: s.slug,
    category: s.category,
    title: s.title,
    shortDescription: s.shortDescription,
    description: s.description,
    features: s.features,
    priceRange: s.priceRange,
    coverImage: s.coverImage,
    gradient: s.gradient,
    icon: s.icon,
  }));
}

export async function fetchGalleryItems(locale: string): Promise<DisplayGalleryItem[]> {
  try {
    const data = await getGalleryItems();
    if (data.length > 0) return data.map((item) => galleryToDisplay(item, locale));
  } catch {}
  return mockGallery.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    imageUrl: item.imageUrl,
    year: item.year,
  }));
}

export async function fetchTestimonials(locale: string): Promise<DisplayTestimonial[]> {
  try {
    const data = await getApprovedTestimonials();
    if (data.length > 0) return data.map((t) => testimonialToDisplay(t, locale));
  } catch {}
  return mockTestimonials.map((t) => ({
    name: t.name,
    event: t.event,
    comment: t.comment,
    rating: t.rating,
    date: t.date,
  }));
}
