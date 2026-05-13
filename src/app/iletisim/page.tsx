import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata = {
  title: "İletişim | Odhun Organizasyon",
  description: "Bize ulaşın. Telefon, e-posta veya iletişim formu ile sorularınızı iletebilirsiniz.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
