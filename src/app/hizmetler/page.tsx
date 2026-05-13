import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata = {
  title: "Hizmetlerimiz | Odhun Organizasyon",
  description: "Düğün, nişan, doğum günü, kurumsal etkinlik ve daha fazlası. Profesyonel organizasyon hizmetlerimizi keşfedin.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ServicesPage />
      </main>
      <Footer />
    </>
  );
}
