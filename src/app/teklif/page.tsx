import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuotePage } from "@/components/forms/QuotePage";

export const metadata = {
  title: "Teklif Al | Odhun Organizasyon",
  description: "Etkinliğiniz için ücretsiz teklif alın. Formu doldurun, aynı gün yanıt verelim.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <QuotePage />
      </main>
      <Footer />
    </>
  );
}
