import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";

export const metadata = {
  title: "Müşteri Yorumları | Odhun Organizasyon",
  description: "Müşterilerimizin deneyimleri ve değerlendirmeleri. 500'den fazla mutlu çiftin ve müşterinin yorumları.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <TestimonialsPage />
      </main>
      <Footer />
    </>
  );
}
