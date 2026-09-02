"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, Clock3, Database, FileSpreadsheet, RefreshCw, ServerCog } from "lucide-react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useLocaleHref } from "@/lib/useLocaleHref";

const content = {
  tr: {
    eyebrow: "VERİ ŞEFFAFLIĞI",
    title: "Piyasa Veri Projesi metodolojisi",
    intro: "STR Energy Piyasa Veri Projesi’nde görülen verilerin nereden geldiğini, hangi dönüşümlerin uygulandığını ve hangi koşullarda kullanılmaması gerektiğini belgeliyoruz.",
    reviewed: "Metodoloji sürümü 1.0 · Son gözden geçirme 2 Eylül 2026",
    sourceTitle: "Birincil veri kaynakları",
    sources: [
      { title: "EPİAŞ Şeffaflık Platformu", text: "Türkiye görünümünde PTF, Gün İçi Piyasası ağırlıklı ortalama fiyatı, YEKDEM birim maliyeti, gerçek zamanlı üretim ve yük tahmin planı verileri EPİAŞ servislerinden sorgulanır.", link: "https://seffaflik.epias.com.tr/" },
      { title: "ENTSO-E Transparency Platform", text: "Avrupa görünümünde gün öncesi fiyat, gerçekleşen üretim, gerçekleşen yük ve sınır ötesi fiziksel akış serileri seçilen ülke veya teklif bölgesi için ENTSO-E servisinden alınır.", link: "https://transparency.entsoe.eu/" },
      { title: "U.S. Energy Information Administration", text: "Küresel görünümde ülke ve yıl bazındaki üretim, tüketim, kurulu güç, elektrik fiyatı ve enerji kaynaklı CO₂ serileri EIA uluslararası veri servisinden alınır.", link: "https://www.eia.gov/opendata/" },
    ],
    processingTitle: "Sorgudan tabloya işleme adımları",
    processing: [
      { title: "1. İstek doğrulama", text: "Kaynak, veri seti, ülke ve tarih aralığı sunucu tarafında doğrulanır. Türkiye veri sorguları en fazla 31 günlük aralıklarla sınırlandırılır; hatalı veya izin verilmeyen istekler kaynağa gönderilmez." },
      { title: "2. Kaynağa doğrudan sorgu", text: "İstekler STR Energy sunucusu üzerinden resmi sağlayıcıya iletilir. Erişim anahtarları tarayıcıya açılmaz. Zaman aşımı ve geçici hatalar sınırlı yeniden deneme ile yönetilir." },
      { title: "3. Şema eşleme", text: "Sağlayıcının alan adları, tarih ve saat değerleri ile sayısal birimleri okunabilir tablo sütunlarına eşlenir. Ham kaynağın yayımlamadığı bir değer üretilmez; sıfır ile eksik kayıt aynı anlamda kabul edilmez." },
      { title: "4. Sunum ve dışa aktarma", text: "Sayı biçimi seçili dile göre düzenlenir. Excel çıktısı veri seti, tarih aralığı, kaynak adı, oluşturma zamanı ve kayıt sayısını üst bilgi olarak taşır." },
    ],
    freshnessTitle: "Güncellik ve hata davranışı",
    freshness: "Veri, kullanıcı sorgu yaptığında resmi kaynaktan istenir ve arayüz son sorgu saatini gösterir. Kaynak boş yanıt verirse veya erişilemiyorsa sistem örnek/sentetik veri üretmez; boş durum ya da hata mesajı gösterir. EPİAŞ, ENTSO-E ve EIA geçmiş serileri sonradan revize edebilir; aynı tarih aralığında daha sonra farklı bir değer görülmesi mümkündür.",
    limitsTitle: "Karşılaştırma sınırları",
    limits: [
      "Saat dilimi ve yaz saati geçişleri, ülkeler arası saatlik karşılaştırmalarda kontrol edilmelidir.",
      "MW güç, MWh enerji ve kümülatif sayaç endeksi birbirinin yerine kullanılamaz.",
      "Fiyat serilerinde para birimi, vergi, dağıtım bedeli ve piyasa ürünü aynı değildir; tablolar nihai fatura hesabı sayılmaz.",
      "Üretim ve emisyon serilerinde net/brüt tanımı, sektör sınırı ve revizyon durumu sağlayıcı dokümantasyonuyla birlikte okunmalıdır.",
      "Görselleştirmeler eğitim ve araştırma amaçlıdır; ticari işlem, yatırım veya mevzuat uyum kararı için resmi kayıt ayrıca doğrulanmalıdır.",
    ],
    reproducibilityTitle: "Bir sonucu yeniden üretme",
    reproducibility: "Aynı veri setini yeniden kontrol etmek için bölgeyi, veri setini, ülkeyi ve tarih aralığını kaydedin; ardından kaynak bağlantısındaki resmi platformda aynı kapsamı sorgulayın. Fark varsa saat dilimi, veri revizyonu, birim ve teklif bölgesi tanımını kontrol edin. Sorun bildiriminde bu dört seçimi ve sorgu saatini paylaşın.",
    project: "Piyasa Veri Projesi’ni aç",
    standards: "Editoryal ilkeleri incele",
  },
  en: {
    eyebrow: "DATA TRANSPARENCY",
    title: "Market Data Project methodology",
    intro: "This page documents where STR Energy Market Data Project values come from, which transformations are applied, and when the data should not be used.",
    reviewed: "Methodology version 1.0 · Last reviewed 2 September 2026",
    sourceTitle: "Primary data sources",
    sources: [
      { title: "EPİAŞ Transparency Platform", text: "The Türkiye view queries EPİAŞ services for market clearing price, intraday weighted-average price, YEKDEM unit cost, real-time generation and load-estimation plan data.", link: "https://seffaflik.epias.com.tr/" },
      { title: "ENTSO-E Transparency Platform", text: "The European view retrieves day-ahead prices, actual generation, actual load and cross-border physical flows for the selected country or bidding zone.", link: "https://transparency.entsoe.eu/" },
      { title: "U.S. Energy Information Administration", text: "The global view uses EIA international series for generation, consumption, installed capacity, electricity prices and energy-related CO₂ by country and year.", link: "https://www.eia.gov/opendata/" },
    ],
    processingTitle: "Processing from query to table",
    processing: [
      { title: "1. Validate the request", text: "The source, dataset, geography and period are validated server-side. Türkiye queries are limited to 31-day windows; invalid or disallowed requests are not sent upstream." },
      { title: "2. Query the official source", text: "STR Energy’s server forwards the request to the official provider without exposing credentials to the browser. Timeouts and temporary failures use a small, bounded retry policy." },
      { title: "3. Map the schema", text: "Provider field names, timestamps and numeric values are mapped to readable table columns. The interface does not invent a value that the source did not publish, and missing records are not treated as equivalent to measured zero." },
      { title: "4. Present and export", text: "Numbers are formatted for the selected language. Excel exports identify the dataset, date range, source, generation time and record count in their header." },
    ],
    freshnessTitle: "Freshness and failure behaviour",
    freshness: "Data is requested from the official source when a user runs a query, and the interface displays the last-query time. If a source returns no rows or cannot be reached, the system does not generate sample or synthetic values; it shows an empty state or an error. Providers may revise historical series, so the same period can legitimately change later.",
    limitsTitle: "Comparison limits",
    limits: [
      "Check time zones and daylight-saving transitions before comparing hourly data across countries.",
      "MW power, MWh energy and a cumulative meter index are not interchangeable.",
      "Price series can differ by currency, taxes, network charges and market product; these tables are not a final electricity bill.",
      "For generation and emissions, review net/gross definitions, sector boundaries and revision status in the provider documentation.",
      "The visualisations are for education and research. Confirm official records before trading, investment or regulatory decisions.",
    ],
    reproducibilityTitle: "Reproducing a result",
    reproducibility: "Record the region, dataset, geography and period, then run the same scope on the linked official platform. If values differ, check time zone, revision status, units and bidding-zone definitions. Include those four selections and the query time when reporting a problem.",
    project: "Open the Market Data Project",
    standards: "Read our editorial standards",
  },
  ru: {
    eyebrow: "ПРОЗРАЧНОСТЬ ДАННЫХ",
    title: "Методология проекта рыночных данных",
    intro: "Здесь указаны источники данных STR Energy, применяемые преобразования и ограничения использования.",
    reviewed: "Версия 1.0 · Последняя проверка 2 сентября 2026 г.",
    sourceTitle: "Первичные источники",
    sources: [
      { title: "EPİAŞ Transparency Platform", text: "Для Турции запрашиваются PTF, средневзвешенная внутридневная цена, стоимость YEKDEM, фактическая генерация и план нагрузки.", link: "https://seffaflik.epias.com.tr/" },
      { title: "ENTSO-E Transparency Platform", text: "Для Европы используются цены на сутки вперед, фактическая генерация и нагрузка, а также трансграничные физические перетоки.", link: "https://transparency.entsoe.eu/" },
      { title: "U.S. Energy Information Administration", text: "Глобальный раздел использует годовые международные ряды EIA по генерации, потреблению, мощности, ценам и энергетическим выбросам CO₂.", link: "https://www.eia.gov/opendata/" },
    ],
    processingTitle: "Обработка запроса",
    processing: [
      { title: "1. Проверка", text: "Источник, набор данных, страна и период проверяются на сервере. Запросы по Турции ограничены окном в 31 день." },
      { title: "2. Официальный источник", text: "Сервер STR Energy обращается к поставщику, не раскрывая ключи браузеру. Для временных ошибок применяется ограниченное число повторов." },
      { title: "3. Сопоставление схемы", text: "Поля, даты и числа поставщика сопоставляются со столбцами таблицы. Отсутствующее значение не заменяется синтетическими данными или измеренным нулем." },
      { title: "4. Представление", text: "Числа форматируются по выбранному языку. Экспорт Excel содержит источник, период, время создания и число записей." },
    ],
    freshnessTitle: "Актуальность и ошибки",
    freshness: "Данные запрашиваются при действии пользователя. Интерфейс показывает время последнего запроса. Если источник недоступен или вернул пустой ответ, демонстрационные значения не создаются. Исторические ряды могут пересматриваться поставщиком.",
    limitsTitle: "Ограничения сравнения",
    limits: [
      "Учитывайте часовые пояса и переходы на летнее время.",
      "MW, MWh и накопительный индекс счетчика имеют разный смысл.",
      "Цена зависит от валюты, налогов, сетевых платежей и рыночного продукта.",
      "Проверяйте определения net/gross, границы сектора и статус пересмотра.",
      "Перед торговыми, инвестиционными или регуляторными решениями сверяйтесь с официальной записью.",
    ],
    reproducibilityTitle: "Воспроизводимость",
    reproducibility: "Сохраните регион, набор данных, страну и период, затем повторите запрос на официальной платформе. При расхождении проверьте часовой пояс, пересмотр, единицы и определение ценовой зоны.",
    project: "Открыть проект данных",
    standards: "Редакционные стандарты",
  },
} as const;

export default function MarketDataMethodologyPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const copy = content[language];
  const isDark = theme === "dark";
  const panel = isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-white";
  const muted = isDark ? "text-zinc-400" : "text-zinc-600";
  const sourceIcons = [Database, ServerCog, FileSpreadsheet];

  return (
    <div className={isDark ? "min-h-screen bg-black text-white" : "min-h-screen bg-zinc-50 text-zinc-900"}>
      <Header variant="floating" />
      <main>
        <section className="pb-16 pt-32 md:pt-40">
          <div className="container mx-auto max-w-5xl">
            <p className="text-xs font-bold tracking-[0.2em] text-blue-500">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{copy.title}</h1>
            <p className={`mt-6 max-w-3xl text-lg leading-8 ${muted}`}>{copy.intro}</p>
            <p className={`mt-5 inline-flex items-center gap-2 text-sm ${muted}`}><Clock3 className="h-4 w-4 text-blue-500" />{copy.reviewed}</p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl pb-20">
          <h2 className="text-3xl font-bold">{copy.sourceTitle}</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {copy.sources.map((source, index) => {
              const Icon = sourceIcons[index];
              return <article key={source.title} className={`rounded-2xl border p-6 ${panel}`}><Icon className="h-6 w-6 text-blue-500" /><h3 className="mt-4 text-lg font-bold">{source.title}</h3><p className={`mt-3 text-sm leading-7 ${muted}`}>{source.text}</p><a className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:underline" href={source.link} target="_blank" rel="noopener noreferrer">{source.title}<ArrowRight className="h-4 w-4" /></a></article>;
            })}
          </div>

          <section className={`mt-12 rounded-3xl border p-7 md:p-10 ${panel}`}>
            <h2 className="text-3xl font-bold">{copy.processingTitle}</h2>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              {copy.processing.map((step) => <article key={step.title}><h3 className="text-lg font-bold text-blue-500">{step.title}</h3><p className={`mt-3 leading-7 ${muted}`}>{step.text}</p></article>)}
            </div>
          </section>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <section className={`rounded-2xl border p-7 ${panel}`}><RefreshCw className="h-6 w-6 text-blue-500" /><h2 className="mt-4 text-2xl font-bold">{copy.freshnessTitle}</h2><p className={`mt-4 leading-8 ${muted}`}>{copy.freshness}</p></section>
            <section className={`rounded-2xl border p-7 ${panel}`}><AlertTriangle className="h-6 w-6 text-amber-500" /><h2 className="mt-4 text-2xl font-bold">{copy.limitsTitle}</h2><ul className={`mt-4 space-y-3 text-sm leading-7 ${muted}`}>{copy.limits.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{item}</li>)}</ul></section>
          </div>

          <section className={`mt-10 rounded-2xl border p-7 ${panel}`}><h2 className="text-2xl font-bold">{copy.reproducibilityTitle}</h2><p className={`mt-4 leading-8 ${muted}`}>{copy.reproducibility}</p></section>

          <nav className="mt-10 flex flex-wrap gap-3" aria-label={copy.title}>
            <Link className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white" href={withLocale("/projects/market-data")}>{copy.project}</Link>
            <Link className={`rounded-full border px-5 py-3 text-sm font-bold ${panel}`} href={withLocale("/editorial-policy")}>{copy.standards}</Link>
          </nav>
        </section>
      </main>
      <Footer compact />
    </div>
  );
}
