import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GoldDivider } from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Çerez Politikası | Odhun Organizasyon",
  description: "Web sitemizde kullanılan çerezler hakkında bilgi.",
};

export default function CerezPolitikasiPage() {
  return (
    <>
      <div className="bg-[var(--surface-dark)] py-12 md:py-16">
        <Container size="lg">
          <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-2">Yasal</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">Çerez Politikası</h1>
        </Container>
      </div>

      <Section>
        <Container size="md">
          <div className="prose prose-sm max-w-none text-[var(--ink-light)] leading-relaxed space-y-6">
            <p className="text-xs text-[var(--muted)]">Son güncelleme: Ocak 2025</p>

            <GoldDivider className="max-w-[60px]" />

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), ziyaret ettiğiniz web sitesi tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır.
              Sitenin daha iyi çalışmasını sağlamak, kullanıcı deneyimini iyileştirmek ve belirli analizler yapmak amacıyla kullanılırlar.
            </p>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">Kullandığımız Çerez Türleri</h2>

            <h3 className="font-sans font-semibold text-[var(--ink)] mt-4">Zorunlu Çerezler</h3>
            <p>
              Sitenin temel işlevleri için gereklidir. Bu çerezler devre dışı bırakılamaz; olmadan site düzgün çalışmaz.
              Örnek: oturum yönetimi, güvenlik doğrulaması.
            </p>

            <h3 className="font-sans font-semibold text-[var(--ink)] mt-4">Tercih Çerezleri</h3>
            <p>
              Dil ve görünüm tercihleri gibi ayarlarınızı hatırlamak için kullanılır.
              Örnek: seçtiğiniz dil (TR/EN), çerez onay durumu.
            </p>

            <h3 className="font-sans font-semibold text-[var(--ink)] mt-4">Analitik Çerezler</h3>
            <p>
              Siteyi kaç kişinin ziyaret ettiğini, hangi sayfaların daha çok görüntülendiğini anlamamızı sağlar.
              Bu veriler anonim olarak toplanır ve hizmet kalitemizi artırmak amacıyla kullanılır.
            </p>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">Çerez Süreleri</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Oturum çerezleri:</strong> Tarayıcı kapatıldığında silinir.</li>
              <li><strong>Kalıcı çerezler:</strong> Belirlenen süre boyunca (genellikle 1 ay–1 yıl) saklanır.</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p>
              Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Ancak bazı çerezlerin engellenmesi
              site işlevselliğini olumsuz etkileyebilir. Tarayıcı ayarları için:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chrome: Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
              <li>Firefox: Seçenekler → Gizlilik ve Güvenlik</li>
              <li>Safari: Tercihler → Gizlilik</li>
              <li>Edge: Ayarlar → Gizlilik, arama ve hizmetler</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">Üçüncü Taraf Çerezler</h2>
            <p>
              Sitemizde Google Maps gibi üçüncü taraf hizmetleri kullanılabilir. Bu hizmetler kendi çerezlerini
              yerleştirebilir; söz konusu çerezler ilgili hizmetin gizlilik politikasına tabidir.
            </p>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">İletişim</h2>
            <p>
              Çerez politikamız hakkında sorularınız için:{" "}
              <a href="mailto:info@odhunorganizasyon.com" className="text-[var(--accent)] hover:underline">
                info@odhunorganizasyon.com
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
