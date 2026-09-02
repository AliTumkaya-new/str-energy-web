"use client";

import Link from "next/link";
import { BookOpen, Database, Factory, Mail, ShieldCheck } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const content = {
  tr: {
    role: "KURUMSAL YAYINCI",
    title: "STR Energy Editoryal Ekibi",
    intro: "STR Energy’nin enerji piyasaları, veri kalitesi ve endüstriyel enerji yönetimi rehberlerinden sorumlu kurumsal yayın kimliğidir.",
    scopeTitle: "Yayın kapsamı",
    scope: [
      { title: "Enerji piyasası verileri", text: "EPİAŞ, ENTSO-E ve EIA verilerinin tanımı, birimleri, dönemleri ve karar süreçlerinde doğru kullanımı." },
      { title: "Endüstriyel enerji yönetimi", text: "Ölçüm sınırları, enerji baz çizgileri, EnPI, veri kalitesi, talep tahmini ve operasyonel aksiyon akışları." },
      { title: "Saha ve OT bağlamı", text: "Enerji analizörleri, RS485/Modbus veri toplama, sayaç hiyerarşisi ve güvenli entegrasyonun kavramsal temelleri." },
    ],
    methodTitle: "Nasıl çalışıyoruz?",
    method: "Rehberler, konuya ilişkin resmi ve birincil kaynaklar karşılaştırılarak hazırlanır. Genel kavramlarla ürün iddiaları ayrılır; değişebilen mevzuat ve canlı veri için tarih ve sınırlamalar belirtilir. STR Energy’nin kendi veri deneyimi anlatılırken kullanılan kaynak, dönüşüm ve hata davranışı ayrıca metodoloji sayfasında belgelenir.",
    accountabilityTitle: "Hesap verebilirlik",
    accountability: "Kurumsal imza, adı açıklanmayan bir kişiye uzmanlık atfetmek için kullanılmaz. İçerikte saha ölçümü, müşteri sonucu veya bireysel yeterlilik iddiası varsa bunun ayrıca doğrulanabilir olması gerekir. Bu sitedeki mevcut rehberler eğitim amaçlıdır ve bağlayıcı mühendislik, hukuk veya yatırım tavsiyesi değildir.",
    contact: "Kaynak, teknik ifade veya güncellik konusunda düzeltme önermek için support@str-energy.com adresine yazabilirsiniz.",
    standards: "Editoryal ilkeleri incele",
    methodology: "Veri metodolojisini incele",
    articles: "Tüm rehberler",
  },
  en: {
    role: "INSTITUTIONAL PUBLISHER",
    title: "STR Energy Editorial Team",
    intro: "The organisational publishing identity responsible for STR Energy guides on energy markets, data quality and industrial energy management.",
    scopeTitle: "Publishing scope",
    scope: [
      { title: "Energy-market data", text: "Definitions, units, periods and responsible use of EPİAŞ, ENTSO-E and EIA datasets in decision-making." },
      { title: "Industrial energy management", text: "Measurement boundaries, energy baselines, EnPIs, data quality, demand forecasting and operational action workflows." },
      { title: "Field and OT context", text: "Conceptual foundations for energy analysers, RS485/Modbus data collection, meter hierarchies and secure integration." },
    ],
    methodTitle: "How we work",
    method: "Guides are prepared by comparing official and primary sources. General concepts are separated from product claims, while dates and limitations are stated for changing regulations and live data. When describing STR Energy’s own data experience, sources, transformations and failure behaviour are documented on the methodology page.",
    accountabilityTitle: "Accountability",
    accountability: "An organisational byline is not used to imply an unnamed person’s credentials. Any claim about field measurements, customer results or individual qualifications must be separately verifiable. Current guides are educational and do not constitute binding engineering, legal or investment advice.",
    contact: "To suggest a correction to a source, technical statement or review date, email support@str-energy.com.",
    standards: "Read our editorial standards",
    methodology: "Read the data methodology",
    articles: "Browse all guides",
  },
  ru: {
    role: "КОРПОРАТИВНЫЙ ИЗДАТЕЛЬ",
    title: "Редакционная команда STR Energy",
    intro: "Корпоративная редакция материалов STR Energy об энергорынках, качестве данных и промышленном энергоменеджменте.",
    scopeTitle: "Темы публикаций",
    scope: [
      { title: "Данные энергорынков", text: "Определения, единицы, периоды и корректное применение данных EPİAŞ, ENTSO-E и EIA." },
      { title: "Промышленный энергоменеджмент", text: "Границы измерения, базовые линии, EnPI, качество данных, прогнозирование и операционные действия." },
      { title: "Полевой и OT-контекст", text: "Основы работы анализаторов энергии, сбора данных RS485/Modbus, иерархии счетчиков и безопасной интеграции." },
    ],
    methodTitle: "Как мы работаем",
    method: "Материалы готовятся путем сопоставления официальных первичных источников. Общие понятия отделяются от заявлений о продукте, а для изменяемых норм и оперативных данных указываются даты и ограничения.",
    accountabilityTitle: "Ответственность",
    accountability: "Корпоративное авторство не должно создавать впечатление о неподтвержденной квалификации отдельного человека. Материалы носят образовательный характер и не являются инженерной, юридической или инвестиционной консультацией.",
    contact: "Предложения по исправлению источника, технической формулировки или даты проверки принимаются по адресу support@str-energy.com.",
    standards: "Редакционные стандарты",
    methodology: "Методология данных",
    articles: "Все руководства",
  },
} as const;

export default function EditorialTeamPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = content[language];
  const isDark = theme === "dark";
  const panel = isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white";
  const muted = isDark ? "text-zinc-400" : "text-zinc-600";
  const icons = [Database, BookOpen, Factory];

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-zinc-50 text-zinc-900"}>
      <Header variant="floating" />
      <main className="container mx-auto max-w-5xl pb-20 pt-32 md:pt-40">
        <section className={`rounded-3xl border p-7 md:p-12 ${panel}`}>
          <p className="text-xs font-bold tracking-[0.2em] text-orange-500">{copy.role}</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">{copy.title}</h1>
          <p className={`mt-6 max-w-3xl text-lg leading-8 ${muted}`}>{copy.intro}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-bold">{copy.scopeTitle}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {copy.scope.map((item, index) => {
              const Icon = icons[index];
              return <article key={item.title} className={`rounded-2xl border p-6 ${panel}`}><Icon className="h-6 w-6 text-orange-500" /><h3 className="mt-4 text-lg font-bold">{item.title}</h3><p className={`mt-3 text-sm leading-7 ${muted}`}>{item.text}</p></article>;
            })}
          </div>
        </section>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <section className={`rounded-2xl border p-7 ${panel}`}><ShieldCheck className="h-6 w-6 text-orange-500" /><h2 className="mt-4 text-2xl font-bold">{copy.methodTitle}</h2><p className={`mt-4 leading-8 ${muted}`}>{copy.method}</p></section>
          <section className={`rounded-2xl border p-7 ${panel}`}><Mail className="h-6 w-6 text-orange-500" /><h2 className="mt-4 text-2xl font-bold">{copy.accountabilityTitle}</h2><p className={`mt-4 leading-8 ${muted}`}>{copy.accountability}</p><p className={`mt-4 text-sm leading-7 ${muted}`}>{copy.contact}</p></section>
        </div>

        <nav className="mt-10 flex flex-wrap gap-3" aria-label={copy.title}>
          <Link className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white" href={withLocale("/editorial-policy")}>{copy.standards}</Link>
          <Link className={`rounded-full border px-5 py-3 text-sm font-bold ${panel}`} href={withLocale("/methodology/market-data")}>{copy.methodology}</Link>
          <Link className={`rounded-full border px-5 py-3 text-sm font-bold ${panel}`} href={withLocale("/insights")}>{copy.articles}</Link>
        </nav>
      </main>
      <Footer compact />
    </div>
  );
}
