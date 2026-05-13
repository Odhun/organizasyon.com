import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <HeroSection />
        <StatsSection />
        <ServicesPreview />
        <GalleryStrip />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
