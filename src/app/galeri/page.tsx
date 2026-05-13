import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GalleryPage } from "@/components/gallery/GalleryPage";

export const metadata = {
  title: "Galeri | Odhun Organizasyon",
  description: "Gerçekleştirdiğimiz özel etkinliklere göz atın. Düğün, nişan, doğum günü ve kurumsal etkinlik fotoğrafları.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <GalleryPage />
      </main>
      <Footer />
    </>
  );
}
