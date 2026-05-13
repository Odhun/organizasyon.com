import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { GoldDivider } from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Odhun Organizasyon",
  description: "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
};

export default function KVKKPage() {
  return (
    <>
      <div className="bg-[var(--surface-dark)] py-12 md:py-16">
        <Container size="lg">
          <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-2">Yasal</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">KVKK Aydınlatma Metni</h1>
        </Container>
      </div>

      <Section>
        <Container size="md">
          <div className="prose prose-sm max-w-none text-[var(--ink-light)] leading-relaxed space-y-6">
            <p className="text-xs text-[var(--muted)]">Son güncelleme: Ocak 2025</p>

            <GoldDivider className="max-w-[60px]" />

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">1. Veri Sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, kişisel verileriniz;
              veri sorumlusu sıfatıyla <strong>Odhun Organizasyon</strong> (Devlet Bahçeli Parkı yakını, Anamur / Mersin)
              tarafından aşağıda açıklanan kapsamda işlenecektir.
            </p>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">2. İşlenen Kişisel Veriler</h2>
            <p>Hizmetlerimizden yararlanmanız ve bizimle iletişim kurmanız sürecinde aşağıdaki kişisel veriler işlenmektedir:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Ad ve soyadı</li>
              <li>Telefon numarası</li>
              <li>E-posta adresi</li>
              <li>Etkinlik tarihi ve yeri</li>
              <li>Bütçe bilgisi</li>
              <li>İletişim notları ve talepler</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">3. Kişisel Verilerin İşlenme Amaçları</h2>
            <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Teklif, rezervasyon ve organizasyon hizmetlerinin yürütülmesi</li>
              <li>Müşteri ile iletişimin sağlanması</li>
              <li>Sözleşme süreçlerinin yönetilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Hizmet kalitesinin geliştirilmesi</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">4. Hukuki Dayanak</h2>
            <p>
              Kişisel verileriniz; KVKK madde 5/2(c) kapsamında &ldquo;sözleşmenin kurulması veya ifası için zorunlu olması&rdquo; ve
              madde 5/2(ç) kapsamında &ldquo;hukuki yükümlülüğün yerine getirilmesi&rdquo; hukuki sebeplerine dayanılarak işlenmektedir.
              Müşteri yorumu gibi durumlarda ise açık rızanıza dayanılmaktadır.
            </p>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">5. Kişisel Verilerin Aktarılması</h2>
            <p>
              Kişisel verileriniz; yasal zorunluluklar dışında üçüncü taraflara aktarılmamaktadır. Hizmet sunumu kapsamında
              yalnızca yetkili çalışanlarımız ve doğrudan hizmet ortaklarımız (dekorasyon, fotoğraf, müzik gibi alt yükleniciler)
              erişebilmektedir.
            </p>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">6. Saklama Süresi</h2>
            <p>
              Kişisel verileriniz, hizmet ilişkisinin sona ermesinden itibaren yasal saklama yükümlülükleri çerçevesinde
              en fazla <strong>5 yıl</strong> süreyle saklanmakta, bu sürenin sonunda imha edilmektedir.
            </p>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">7. Haklarınız</h2>
            <p>KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>Kanunun 7. maddesi çerçevesinde silinmesini veya yok edilmesini isteme</li>
              <li>Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>

            <h2 className="font-serif text-xl font-semibold text-[var(--ink)] mt-8">8. İletişim</h2>
            <p>
              Haklarınızı kullanmak veya sorularınız için aşağıdaki kanallardan bize ulaşabilirsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>E-posta: <a href="mailto:info@odhunorganizasyon.com" className="text-[var(--accent)] hover:underline">info@odhunorganizasyon.com</a></li>
              <li>Adres: Devlet Bahçeli Parkı yakını, Anamur / Mersin</li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
