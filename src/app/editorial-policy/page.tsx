"use client";

import Link from "next/link";
import { BookOpenCheck, CheckCircle2, FileSearch, RefreshCw, Scale, ShieldCheck } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const content = {
  tr: {
    eyebrow: "YAYIN ŞEFFAFLIĞI",
    title: "STR Energy editoryal ilkeleri",
    intro: "Enerji piyasaları ve endüstriyel enerji yönetimi hakkındaki içeriklerimizi kimin hazırladığını, hangi kaynaklara dayandığını ve hataları nasıl düzelttiğimizi açıkça anlatıyoruz.",
    updated: "Son gözden geçirme: 2 Eylül 2026",
    principles: [
      { title: "İnsan için fayda", text: "Bir içeriği yalnızca arama trafiği elde etmek için yayımlamayız. Her rehber, enerji profesyonelinin bir kavramı anlamasına, veriyi doğru yorumlamasına veya daha iyi bir kontrol listesi kurmasına yardımcı olmalıdır." },
      { title: "Birincil kaynak önceliği", text: "Piyasa ve mevzuat konularında EPİAŞ, EPDK, TEİAŞ, ENTSO-E, EIA, Avrupa Komisyonu, ISO, IEC, NIST ve CISA gibi resmi veya standart yayımlayan kaynakları tercih ederiz. Kullanılan bağlantıları makalenin sonunda listeleriz." },
      { title: "Sınırları açık söyleme", text: "Canlı veri gecikmelerini, revizyonları, birim ve saat dilimi farklılıklarını saklamayız. İçerikler eğitim amaçlıdır; yatırım, hukuk veya bağlayıcı mühendislik danışmanlığı yerine geçmez." },
      { title: "Düzeltilebilir yayın", text: "Maddi hata, bozuk kaynak veya eski bilgi tespit edildiğinde içeriği günceller, değişiklik tarihini görünür tutarız. Düzeltme bildirimleri support@str-energy.com adresinden alınır." },
    ],
    processTitle: "Bir rehber nasıl hazırlanır?",
    process: [
      "Kullanıcının çözmeye çalıştığı gerçek soru ve karar bağlamı tanımlanır.",
      "Konuya ilişkin birincil kaynaklar seçilir; tanım, birim, kapsam ve tarih koşulları karşılaştırılır.",
      "Metin, genel özet yerine uygulanabilir adımlar, hesap sınırları ve sık yapılan hatalarla yapılandırılır.",
      "Başlık, tarih, kaynak bağlantıları, sorumluluk sınırı ve ilgili iç bağlantılar yayın öncesinde kontrol edilir.",
      "Değişebilen mevzuat ve veri kaynakları periyodik olarak yeniden gözden geçirilir.",
    ],
    assistanceTitle: "Teknoloji destekli çalışma",
    assistance: "Araştırma düzenleme, dil kontrolü veya çeviri için yazılım destekli araçlar kullanılabilir. Bu araçlar kaynak değildir. Kaynak seçimi, kapsam kararı ve yayımlama sorumluluğu STR Energy editoryal ekibine aittir; doğrulanmamış otomatik çıktı yayımlama gerekçesi olarak kullanılmaz.",
    ownershipTitle: "Yazarlık ve sorumluluk",
    ownership: "Bu sitedeki teknik rehberlerin kurumsal yazarı STR Energy Editoryal Ekibi’dir. Bireysel uzmanlık veya saha sonucu iddia edilmediği sürece içerik kurumsal imza ile yayımlanır. Editoryal ekibin kapsamını ve iletişim yöntemini yazar sayfasında görebilirsiniz.",
    authorLink: "Editoryal ekip sayfası",
    methodologyLink: "Piyasa verisi metodolojisi",
    contactLink: "Düzeltme bildir",
  },
  en: {
    eyebrow: "PUBLISHING TRANSPARENCY",
    title: "STR Energy editorial standards",
    intro: "We explain who prepares our energy-market and industrial energy-management content, which sources support it, and how we correct errors.",
    updated: "Last reviewed: 2 September 2026",
    principles: [
      { title: "Useful to people", text: "We do not publish a page merely to attract search traffic. Every guide must help an energy professional understand a concept, interpret data correctly, or build a better decision checklist." },
      { title: "Primary sources first", text: "For market, regulatory and technical subjects we prefer official or standards bodies such as EPİAŞ, EPDK, TEİAŞ, ENTSO-E, EIA, the European Commission, ISO, IEC, NIST and CISA. Article sources are listed at the end." },
      { title: "State the limits", text: "We disclose live-data delays, revisions, unit differences and time-zone issues. Content is educational and does not replace investment, legal or binding engineering advice." },
      { title: "Correctable publishing", text: "When we find a material error, broken source or outdated statement, we update the page and keep the review date visible. Corrections can be sent to support@str-energy.com." },
    ],
    processTitle: "How a guide is prepared",
    process: [
      "Define the real user question and the decision the content should support.",
      "Select primary sources and compare definitions, units, scope and date conditions.",
      "Structure the guide around practical steps, calculation boundaries and common mistakes—not a generic summary.",
      "Check the title, dates, source links, limitations and relevant internal links before publication.",
      "Revisit changing regulations and data sources on a periodic review cycle.",
    ],
    assistanceTitle: "Technology-assisted work",
    assistance: "Software-assisted tools may support research organisation, language review or translation. They are not treated as sources. Source selection, scope and publication accountability remain with the STR Energy Editorial Team; unverified automated output is not a basis for publication.",
    ownershipTitle: "Authorship and accountability",
    ownership: "Technical guides on this site are institutionally authored by the STR Energy Editorial Team. Unless an individual qualification or field result can be accurately substantiated, we use an organisational byline rather than imply personal expertise.",
    authorLink: "Editorial team profile",
    methodologyLink: "Market-data methodology",
    contactLink: "Report a correction",
  },
  ru: {
    eyebrow: "ПРОЗРАЧНОСТЬ ПУБЛИКАЦИЙ",
    title: "Редакционные стандарты STR Energy",
    intro: "Мы объясняем, кто готовит материалы об энергорынках и промышленной энергетике, на каких источниках они основаны и как исправляются ошибки.",
    updated: "Последняя проверка: 2 сентября 2026 г.",
    principles: [
      { title: "Польза для читателя", text: "Мы не публикуем страницы только ради поискового трафика. Каждый материал должен помогать понять понятие, корректно интерпретировать данные или принять более обоснованное решение." },
      { title: "Приоритет первичных источников", text: "Мы используем официальные источники и стандарты: EPİAŞ, EPDK, TEİAŞ, ENTSO-E, EIA, Европейскую комиссию, ISO, IEC, NIST и CISA. Ссылки приводятся в конце статьи." },
      { title: "Открытые ограничения", text: "Мы указываем задержки, пересмотры данных, различия единиц и часовых поясов. Материалы носят образовательный характер и не заменяют юридическую, инвестиционную или инженерную консультацию." },
      { title: "Исправления", text: "При обнаружении существенной ошибки, неработающей ссылки или устаревшей информации мы обновляем страницу и сохраняем видимую дату проверки. Сообщения принимаются по адресу support@str-energy.com." },
    ],
    processTitle: "Как готовится материал",
    process: [
      "Определяется практический вопрос читателя и контекст решения.",
      "Сопоставляются определения, единицы, охват и даты в первичных источниках.",
      "Материал дополняется практическими шагами, границами расчета и типичными ошибками.",
      "Перед публикацией проверяются заголовок, даты, ссылки, ограничения и внутренняя навигация.",
      "Изменяемые нормы и наборы данных периодически пересматриваются.",
    ],
    assistanceTitle: "Технологическая поддержка",
    assistance: "Программные инструменты могут помогать в организации исследования, языковой проверке и переводе, но не считаются источниками. За выбор источников, охват и публикацию отвечает редакционная команда STR Energy.",
    ownershipTitle: "Авторство и ответственность",
    ownership: "Технические руководства публикуются от имени редакционной команды STR Energy. Мы не приписываем отдельным лицам неподтвержденную квалификацию или полевой опыт.",
    authorLink: "Профиль редакционной команды",
    methodologyLink: "Методология рыночных данных",
    contactLink: "Сообщить об ошибке",
  },
} as const;

export default function EditorialPolicyPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = content[language];
  const isDark = theme === "dark";
  const panel = isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white";
  const muted = isDark ? "text-zinc-400" : "text-zinc-600";
  const icons = [BookOpenCheck, FileSearch, Scale, RefreshCw];

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-zinc-50 text-zinc-900"}>
      <Header variant="floating" />
      <main>
        <section className="border-b border-orange-500/10 pb-16 pt-32 md:pt-40">
          <div className="container mx-auto max-w-5xl">
            <p className="text-xs font-bold tracking-[0.2em] text-orange-500">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{copy.title}</h1>
            <p className={`mt-6 max-w-3xl text-lg leading-8 ${muted}`}>{copy.intro}</p>
            <p className={`mt-5 text-sm ${muted}`}>{copy.updated}</p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl py-16">
          <div className="grid gap-5 md:grid-cols-2">
            {copy.principles.map((item, index) => {
              const Icon = icons[index];
              return (
                <article key={item.title} className={`rounded-2xl border p-6 ${panel}`}>
                  <Icon className="h-6 w-6 text-orange-500" />
                  <h2 className="mt-5 text-xl font-bold">{item.title}</h2>
                  <p className={`mt-3 leading-7 ${muted}`}>{item.text}</p>
                </article>
              );
            })}
          </div>

          <section className={`mt-10 rounded-3xl border p-7 md:p-10 ${panel}`}>
            <h2 className="text-3xl font-bold">{copy.processTitle}</h2>
            <ol className="mt-7 space-y-5">
              {copy.process.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">{index + 1}</span>
                  <p className={`pt-1 leading-7 ${muted}`}>{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <section className={`rounded-2xl border p-7 ${panel}`}>
              <ShieldCheck className="h-6 w-6 text-orange-500" />
              <h2 className="mt-4 text-2xl font-bold">{copy.assistanceTitle}</h2>
              <p className={`mt-4 leading-7 ${muted}`}>{copy.assistance}</p>
            </section>
            <section className={`rounded-2xl border p-7 ${panel}`}>
              <CheckCircle2 className="h-6 w-6 text-orange-500" />
              <h2 className="mt-4 text-2xl font-bold">{copy.ownershipTitle}</h2>
              <p className={`mt-4 leading-7 ${muted}`}>{copy.ownership}</p>
            </section>
          </div>

          <nav className="mt-10 flex flex-wrap gap-3" aria-label={copy.title}>
            <Link className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white" href={withLocale("/authors/str-energy-editorial-team")}>{copy.authorLink}</Link>
            <Link className={`rounded-full border px-5 py-3 text-sm font-bold ${panel}`} href={withLocale("/methodology/market-data")}>{copy.methodologyLink}</Link>
            <Link className={`rounded-full border px-5 py-3 text-sm font-bold ${panel}`} href={withLocale("/contacts")}>{copy.contactLink}</Link>
          </nav>
        </section>
      </main>
      <Footer compact />
    </div>
  );
}
