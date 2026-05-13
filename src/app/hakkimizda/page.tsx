import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata = {
  title: "Hakkımızda | Odhun Organizasyon",
  description: "15 yılı aşkın deneyimle İstanbul'un en güvenilir etkinlik organizasyon firması. Hikayemizi ve değerlerimizi öğrenin.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
