export type InsightLocale = "tr" | "en";

type LocalizedText = Record<InsightLocale, string>;

export type InsightArticle = {
  slug: string;
  category: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedText;
  publishedAt?: string;
  updatedAt?: string;
  readMinutes?: number;
  sections: Array<{ heading: LocalizedText; body: LocalizedText }>;
  takeaways: Record<InsightLocale, string[]>;
  sources: Array<{ label: string; url: string }>;
};

const coreInsights: InsightArticle[] = [
  {
    slug: "ptf-market-clearing-price",
    category: { tr: "Türkiye Elektrik Piyasası", en: "Türkiye Electricity Market" },
    title: { tr: "PTF Nedir? Piyasa Takas Fiyatını Anlama Rehberi", en: "What Is PTF? A Guide to Türkiye's Market Clearing Price" },
    description: { tr: "PTF'nin nasıl oluştuğunu, enerji maliyetleri ve tüketim planlamasında nasıl yorumlandığını öğrenin.", en: "Learn how Türkiye's market clearing price is formed and how energy professionals use it for cost and demand planning." },
    intro: { tr: "Piyasa Takas Fiyatı (PTF), Türkiye Gün Öncesi Piyasası'nda her saat için oluşan referans elektrik fiyatıdır. Üretim ve tüketim tekliflerinin piyasa kuralları çerçevesinde eşleşmesiyle belirlenir ve tedarik, bütçeleme ve operasyon planlamasında temel göstergelerden biridir.", en: "PTF is the hourly reference electricity price formed in Türkiye's Day-Ahead Market. It results from matching supply and demand bids under market rules and is a core indicator for procurement, budgeting and operational planning." },
    sections: [
      { heading: { tr: "PTF nasıl oluşur?", en: "How is PTF formed?" }, body: { tr: "Piyasa katılımcıları bir sonraki günün saatleri için alış ve satış teklifleri sunar. Gün öncesi piyasası algoritması, teknik ve piyasa kısıtlarını dikkate alarak arz ile talebin kesiştiği noktayı hesaplar. Sonuç her teslimat saati için ayrı bir fiyat ve eşleşen miktardır; bu nedenle gün içinde 24 farklı fiyat görülebilir.", en: "Market participants submit purchase and sale bids for each hour of the following day. The day-ahead algorithm considers market and technical constraints while matching supply with demand. The result is a separate clearing price and matched volume for every delivery hour, so prices can vary substantially throughout the day." },
      },
      { heading: { tr: "İşletmeler PTF'yi neden izler?", en: "Why do businesses monitor PTF?" }, body: { tr: "Saatlik fiyat profili, enerji yoğun süreçlerin zamanlanması, maliyet tahmini ve tedarik sözleşmelerinin değerlendirilmesi için sinyal üretir. Tek bir saatlik değere bakmak yerine günlük ortalama, pik saatler, oynaklık ve tüketim profiliyle birlikte değerlendirme yapmak daha anlamlıdır.", en: "The hourly price profile informs scheduling of energy-intensive operations, cost forecasting and assessment of supply contracts. A single hourly value is rarely sufficient; daily averages, peak periods, volatility and the facility's consumption profile should be evaluated together." },
      },
      { heading: { tr: "PTF verisi nasıl analiz edilir?", en: "How should PTF data be analysed?" }, body: { tr: "Tarih aralığı seçilerek saatlik değişim, iş günü-hafta sonu farkı ve mevsimsel eğilimler incelenebilir. PTF'nin üretim karması, yük tahmini ve GİP fiyatlarıyla birlikte izlenmesi piyasa hareketinin nedenlerini daha iyi anlamaya yardımcı olur. EnergyPulse bu göstergeleri aynı veri deneyiminde birleştirir.", en: "Hourly changes, weekday-weekend differences and seasonal patterns can be examined across a selected date range. Comparing PTF with generation mix, load forecasts and intraday prices provides stronger context for market movements. EnergyPulse brings these indicators into one data experience." },
      },
    ],
    takeaways: { tr: ["PTF saatlik bir gün öncesi piyasa fiyatıdır.", "Maliyet planlamasında tüketim profiliyle birlikte değerlendirilmelidir.", "Üretim, yük ve GİP verileri fiyat hareketine bağlam kazandırır."], en: ["PTF is an hourly day-ahead market price.", "It should be evaluated alongside the consumption profile.", "Generation, load and intraday data add context to price movements."] },
    sources: [{ label: "EPİAŞ — PTF Belirleme Yöntemi", url: "https://www.epias.com.tr/wp-content/uploads/2016/11/ptf_belirleme_yontemi_v1.pdf" }],
  },
  {
    slug: "yekdem-cost",
    category: { tr: "Yenilenebilir Enerji", en: "Renewable Energy" },
    title: { tr: "YEKDEM Birim Maliyeti Nedir ve Nasıl Yorumlanır?", en: "What Is the YEKDEM Unit Cost and How Is It Interpreted?" },
    description: { tr: "YEKDEM birim maliyetinin elektrik maliyetlerine etkisini ve piyasa analizinde nasıl kullanıldığını inceleyin.", en: "Understand how the YEKDEM unit cost affects electricity costs and how it is used in market analysis." },
    intro: { tr: "Yenilenebilir Enerji Kaynaklarını Destekleme Mekanizması (YEKDEM), belirli yenilenebilir üretim tesislerini destekleyen piyasa yapısıdır. YEKDEM birim maliyeti, mekanizmanın tedarikçiler ve piyasa katılımcıları üzerindeki dönemsel maliyet etkisini izlemek için kullanılan göstergedir.", en: "Türkiye's Renewable Energy Resources Support Mechanism (YEKDEM) supports eligible renewable generation facilities. Its unit cost is an important indicator for tracking the mechanism's periodic cost impact on suppliers and market participants." },
    sections: [
      { heading: { tr: "Birim maliyeti etkileyen unsurlar", en: "What influences the unit cost?" }, body: { tr: "Destek kapsamındaki üretim miktarı, piyasa fiyatları, döviz bazlı destek unsurları, dönemsel uzlaştırma verileri ve toplam tedarik hacmi maliyetin seviyesini etkileyebilir. Bu nedenle YEKDEM maliyeti sabit bir tarife gibi değil, dönemsel piyasa verisi olarak takip edilmelidir.", en: "Eligible generation volumes, market prices, foreign-currency support components, settlement data and total supplier volumes can influence the resulting cost. It should therefore be monitored as a periodic market indicator rather than treated as a fixed tariff." },
      },
      { heading: { tr: "Bütçe ve tedarik açısından önemi", en: "Why it matters for budgets and procurement" }, body: { tr: "Elektrik tedarik maliyetlerini planlayan işletmeler için YEKDEM, toplam maliyetin piyasa fiyatı dışında değişebilen bileşenlerinden biridir. Geçmiş dönemlerin karşılaştırılması bütçe senaryolarını güçlendirir; ancak kesin maliyet hesabı için güncel mevzuat, sözleşme koşulları ve uzlaştırma verileri ayrıca değerlendirilmelidir.", en: "For organisations planning electricity procurement, YEKDEM is a variable component beyond the wholesale market price. Comparing historical periods improves budget scenarios, while final cost calculations must also consider current regulation, contract terms and settlement data." },
      },
      { heading: { tr: "Veriyi birlikte okumak", en: "Reading the data in context" }, body: { tr: "YEKDEM birim maliyetini PTF, yenilenebilir üretim ve tüketim profiliyle birlikte izlemek daha güçlü bir maliyet resmi oluşturur. EnergyPulse tarih aralığı bazında YEKDEM ve ilgili piyasa göstergilerinin sorgulanmasını destekler.", en: "Monitoring YEKDEM together with PTF, renewable generation and demand profiles creates a more complete cost picture. EnergyPulse supports date-range queries for YEKDEM and related market indicators." },
      },
    ],
    takeaways: { tr: ["YEKDEM maliyeti dönemsel ve değişkendir.", "PTF'den ayrı bir maliyet etkisi oluşturabilir.", "Bütçe analizinde üretim ve tüketim verileriyle birlikte okunmalıdır."], en: ["YEKDEM is periodic and variable.", "It can create a cost effect beyond PTF.", "It is most useful when analysed with generation and demand data."] },
    sources: [{ label: "EPİAŞ Şeffaflık Platformu", url: "https://seffaflik.epias.com.tr/" }],
  },
  {
    slug: "entsoe-day-ahead-prices",
    category: { tr: "Avrupa Elektrik Piyasaları", en: "European Electricity Markets" },
    title: { tr: "ENTSO-E Gün Öncesi Elektrik Fiyatları Rehberi", en: "A Guide to ENTSO-E Day-Ahead Electricity Prices" },
    description: { tr: "Avrupa gün öncesi fiyatlarını, üretim karmasını, yükü ve sınır ötesi akışları birlikte değerlendirin.", en: "Understand European day-ahead prices alongside generation mix, load and cross-border electricity flows." },
    intro: { tr: "Avrupa gün öncesi elektrik piyasaları, bir sonraki gün teslim edilecek elektrik için saatlik fiyat sinyalleri üretir. ENTSO-E Şeffaflık Platformu; fiyatların yanında üretim, yük ve sınır ötesi fiziksel akış verileri sunarak ülkeler arası karşılaştırmaya temel oluşturur.", en: "European day-ahead markets produce hourly price signals for electricity delivered the following day. The ENTSO-E Transparency Platform complements price data with generation, load and cross-border physical flows, enabling consistent market comparisons." },
    sections: [
      { heading: { tr: "Fiyat farklılıkları neden oluşur?", en: "Why do prices differ between markets?" }, body: { tr: "Üretim karması, yakıt ve karbon maliyetleri, hava koşulları, talep seviyesi, iletim kapasitesi ve santral kullanılabilirliği bölgesel fiyatları etkiler. Aynı saat içinde iki komşu ülkede farklı fiyat görülmesi, sınır ötesi kapasite kısıtları veya farklı marjinal üretim kaynaklarıyla ilişkili olabilir.", en: "Generation mix, fuel and carbon costs, weather, demand, transmission capacity and plant availability all affect regional prices. Different prices in neighbouring countries during the same hour may indicate constrained interconnection capacity or different marginal generation sources." },
      },
      { heading: { tr: "Fiyat tek başına yeterli değildir", en: "Price alone is not enough" }, body: { tr: "Gün öncesi fiyatı üretim türleri ve sistem yüküyle birlikte değerlendirmek fiyat hareketinin arkasındaki koşulları açıklar. Sınır ötesi akışlar ise düşük ve yüksek fiyatlı bölgeler arasındaki fiziksel etkileşimi anlamaya yardımcı olur.", en: "Combining day-ahead prices with generation types and system load provides context for market movements. Cross-border flows help explain the physical interaction between lower-price and higher-price areas." },
      },
      { heading: { tr: "Karşılaştırmalı analiz", en: "Comparative analysis" }, body: { tr: "Tutarlı tarih aralıkları ve ortak para birimi kullanmak karşılaştırmanın temelidir. Saat dilimi ve yaz saati geçişleri ayrıca kontrol edilmelidir. EnergyPulse, ülke ve dönem seçimiyle Avrupa fiyat, üretim, yük ve akış verilerini tek arayüzde sunar.", en: "Consistent date ranges and currencies are essential for comparison, while time zones and daylight-saving transitions require attention. EnergyPulse provides country and period selection for European price, generation, load and flow datasets." },
      },
    ],
    takeaways: { tr: ["Gün öncesi fiyatlar saatlik piyasa sinyalleridir.", "Üretim karması ve yük fiyatlara bağlam kazandırır.", "Sınır ötesi akışlar ülkeler arasındaki fiziksel etkileşimi gösterir."], en: ["Day-ahead prices are hourly market signals.", "Generation mix and load provide price context.", "Cross-border flows reveal physical interaction between markets."] },
    sources: [{ label: "ENTSO-E Transparency Platform", url: "https://transparency.entsoe.eu/" }],
  },
  {
    slug: "industrial-energy-management",
    category: { tr: "Enerji Yönetimi", en: "Energy Management" },
    title: { tr: "Endüstriyel Enerji Yönetimi: Veriden Aksiyona", en: "Industrial Energy Management: From Data to Action" },
    description: { tr: "Fabrikalarda enerji verisini ölçüm, temel yük, pik talep, üretim ve maliyet bağlamında yönetin.", en: "Manage industrial energy data through metering, baselines, peak demand, production context and cost signals." },
    intro: { tr: "Endüstriyel enerji yönetimi yalnızca aylık faturayı izlemek değildir. Sayaç, üretim hattı, vardiya, hava koşulu ve piyasa verilerini ortak bir zaman çizelgesinde birleştirerek kayıpları görünür kılan sürekli bir yönetim sürecidir.", en: "Industrial energy management goes beyond reviewing a monthly bill. It is a continuous process that aligns meter, production-line, shift, weather and market data on a common timeline to expose avoidable losses." },
    sections: [
      { heading: { tr: "Ölçüm sınırlarını doğru kurmak", en: "Build the right measurement boundary" }, body: { tr: "Ana sayaç toplam tüketimi gösterir; ancak hangi prosesin neden değiştiğini açıklamaz. Hat, ekipman veya yardımcı tesis seviyesinde alt ölçüm; basınçlı hava, soğutma, fırın, pompa ve HVAC gibi yüklerin ayrı değerlendirilmesini sağlar. Veri kalitesi, zaman senkronizasyonu ve sayaç hiyerarşisi analizden önce doğrulanmalıdır.", en: "A main meter shows total consumption but cannot explain which process changed or why. Sub-metering at line, equipment or utility level separates compressed air, cooling, furnaces, pumps and HVAC loads. Data quality, time synchronisation and meter hierarchy should be validated before analysis." },
      },
      { heading: { tr: "Enerji performans göstergeleri", en: "Energy performance indicators" }, body: { tr: "Toplam kWh tek başına yeterli değildir. Ürün başına enerji, çalışma saati başına tüketim, temel yük, maksimum talep ve üretim dışı tüketim gibi göstergeler operasyonla ilişki kurar. Adil karşılaştırma için üretim miktarı, ürün karması ve mevsimsellik normalizasyonu gerekir.", en: "Total kWh alone is not enough. Energy per unit, consumption per operating hour, baseload, maximum demand and non-production consumption connect energy to operations. Production volume, product mix and seasonality should be normalised for fair comparisons." },
      },
      { heading: { tr: "Alarmdan iyileştirmeye", en: "From alarms to improvement" }, body: { tr: "Eşik ve anomali alarmları ancak sorumlu, hedef süre ve doğrulama adımıyla birlikte aksiyona dönüşür. Tasarruf iddiaları uygulama öncesi baz dönem ve uygulama sonrası karşılaştırmayla doğrulanmalıdır. EnergyOS ve EnergyPulse, tesis verisiyle piyasa sinyallerini farklı kullanım senaryolarında bir araya getirir.", en: "Threshold and anomaly alerts become actionable only when assigned an owner, response target and verification step. Savings should be validated against a pre-implementation baseline and post-implementation performance. EnergyOS and EnergyPulse connect facility data with market signals across complementary use cases." },
      },
    ],
    takeaways: { tr: ["Alt ölçüm enerji kaybının kaynağını görünür kılar.", "Göstergeler üretimle normalize edilmelidir.", "Alarm, sorumluluk ve doğrulama olmadan tasarruf yaratmaz."], en: ["Sub-metering reveals the source of energy loss.", "Indicators should be normalised against production.", "Alerts need ownership and verification to create savings."] },
    sources: [{ label: "ISO — Energy management systems", url: "https://www.iso.org/iso-50001-energy-management.html" }],
  },
  {
    slug: "energy-demand-forecasting",
    category: { tr: "Tahminleme", en: "Forecasting" },
    title: { tr: "Enerji Talep Tahmini Nasıl Kurulur?", en: "How to Build an Energy Demand Forecast" },
    description: { tr: "Enerji talep tahmininde veri hazırlama, değişken seçimi, doğrulama ve operasyonel kullanım adımlarını öğrenin.", en: "Learn the data preparation, feature selection, validation and operational steps behind energy demand forecasting." },
    intro: { tr: "Enerji talep tahmini; geçmiş tüketim, takvim, hava koşulları ve operasyon değişkenlerinden gelecekteki yükü tahmin eder. Başarılı bir model yalnızca düşük hata üretmez; karar vericinin ihtiyaç duyduğu zaman ufkunda güvenilir ve açıklanabilir sonuç verir.", en: "Energy demand forecasting estimates future load from historical consumption, calendar, weather and operational variables. A successful model does more than minimise error: it provides reliable and explainable output at the decision maker's required horizon." },
    sections: [
      { heading: { tr: "Veri hazırlığı modelden önce gelir", en: "Data preparation comes before modelling" }, body: { tr: "Eksik zaman aralıkları, sayaç sıfırlamaları, saat dilimi değişimleri ve aykırı değerler işaretlenmelidir. Eğitim verisinin işletmenin güncel çalışma düzenini temsil etmesi gerekir. Bakım duruşu veya kapasite artışı gibi yapısal değişiklikler ayrı değişken olarak ele alınmadığında model geçmişi yanlış genelleyebilir.", en: "Missing intervals, meter resets, daylight-saving changes and outliers should be identified. Training data must represent current operating conditions. Structural changes such as maintenance shutdowns or capacity expansions can lead to misleading generalisation unless explicitly modelled." },
      },
      { heading: { tr: "Doğru değişken ve zaman ufku", en: "Choose the right variables and horizon" }, body: { tr: "Saatlik tahminlerde saat, gün türü, tatil, sıcaklık ve yakın geçmiş yükleri güçlü değişkenlerdir. Endüstriyel tesislerde üretim planı, vardiya ve sipariş hacmi eklenmelidir. Gün öncesi tedarik kararıyla yıllık bütçe planı aynı model ve hata metriğiyle yönetilmemelidir.", en: "Hour, day type, holidays, temperature and recent load are strong variables for hourly forecasts. Industrial models should also incorporate production schedules, shifts and order volumes. Day-ahead procurement and annual budgeting require different horizons, models and error metrics." },
      },
      { heading: { tr: "Model performansını izlemek", en: "Monitor model performance" }, body: { tr: "MAE, RMSE veya yüzde hata gibi metrikler farklı hata davranışlarını gösterir. Sonuçlar basit bir referans modele karşı test edilmeli ve zaman içinde veri kayması izlenmelidir. PowerForecast, tahmin üretimini operasyon planlama ve sapma takibiyle birleştirmek üzere tasarlanmıştır.", en: "MAE, RMSE and percentage-based measures capture different error behaviour. Results should be tested against a simple baseline and monitored for data drift over time. PowerForecast is designed to connect forecasting with operational planning and deviation tracking." },
      },
    ],
    takeaways: { tr: ["Veri kalitesi model seçiminden önce gelir.", "Tahmin ufku iş kararına göre belirlenmelidir.", "Performans basit referans modele karşı ve zaman içinde izlenmelidir."], en: ["Data quality comes before model choice.", "The forecast horizon should match the business decision.", "Performance must be benchmarked and monitored over time."] },
    sources: [{ label: "U.S. EIA — Short-Term Energy Outlook", url: "https://www.eia.gov/outlooks/steo/" }],
  },
  {
    slug: "electricity-generation-vs-capacity",
    category: { tr: "Elektrik Verisi", en: "Electricity Data" },
    title: { tr: "Elektrik Üretimi ve Kurulu Güç Arasındaki Fark", en: "Electricity Generation vs Installed Capacity" },
    description: { tr: "MW ve MWh kavramlarını, kapasite faktörünü ve üretim verilerinin doğru karşılaştırılmasını öğrenin.", en: "Understand MW, MWh, capacity factor and how to compare electricity generation data correctly." },
    intro: { tr: "Kurulu güç ile elektrik üretimi aynı gösterge değildir. Güç, bir tesisin belirli koşullarda sağlayabileceği anlık kapasiteyi; üretim ise belirli bir zaman boyunca üretilen enerji miktarını ifade eder. Bu ayrım enerji veri analizinin temelidir.", en: "Installed capacity and electricity generation are not the same metric. Capacity describes the maximum power a generator can provide under stated conditions, while generation measures energy produced over a period. This distinction is fundamental to electricity data analysis." },
    sections: [
      { heading: { tr: "MW güç, MWh enerjidir", en: "MW is power; MWh is energy" }, body: { tr: "Megawatt (MW) belirli bir andaki güç seviyesini, megawatt-saat (MWh) ise bir süre boyunca üretilen veya tüketilen enerjiyi gösterir. 100 MW gücündeki bir santral tam kapasitede 24 saat çalışırsa teorik olarak 2.400 MWh üretir; gerçek üretim çalışma koşullarına bağlıdır.", en: "Megawatts (MW) express power at a point in time, while megawatt-hours (MWh) express energy produced or consumed over time. A 100 MW plant operating at full output for 24 hours would theoretically generate 2,400 MWh, although actual output depends on operating conditions." },
      },
      { heading: { tr: "Kapasite faktörü ne anlatır?", en: "What does capacity factor show?" }, body: { tr: "Kapasite faktörü, gerçek üretimin aynı dönemde mümkün olan teorik maksimum üretime oranıdır. Kaynak türü, bakım, yakıt, hava koşulları ve sistem talimatları bu oranı etkiler. Farklı teknolojileri yalnız kurulu güç üzerinden karşılaştırmak bu nedenle yanıltıcı olabilir.", en: "Capacity factor is the ratio of actual generation to the theoretical maximum over the same period. Technology, maintenance, fuel, weather and system instructions all influence the result, so comparing technologies solely by installed capacity can be misleading." },
      },
      { heading: { tr: "Global veriyi doğru okumak", en: "Reading global data correctly" }, body: { tr: "Ülkeler arası analizde birim, dönem, net-brüt üretim tanımı ve veri revizyonları kontrol edilmelidir. EIA; üretim, tüketim, kapasite, fiyat ve emisyon serilerini yayımlar. EnergyPulse bu serileri ülke ve dönem seçimiyle karşılaştırılabilir tablolar halinde sunar.", en: "Cross-country analysis should check units, periods, net-versus-gross definitions and data revisions. EIA publishes generation, consumption, capacity, price and emissions series. EnergyPulse presents these datasets in comparable country and period views." },
      },
    ],
    takeaways: { tr: ["MW güç, MWh enerji miktarıdır.", "Kurulu güç gerçek üretimi tek başına göstermez.", "Kapasite faktörü teknoloji ve çalışma koşullarına bağlıdır."], en: ["MW measures power; MWh measures energy.", "Installed capacity alone does not show actual generation.", "Capacity factor depends on technology and operating conditions."] },
    sources: [{ label: "U.S. EIA — Generation and capacity explained", url: "https://www.eia.gov/tools/faqs/faq.php?id=101&t=3" }, { label: "U.S. EIA — Electricity data", url: "https://www.eia.gov/electricity/data.php" }],
  },
  {
    slug: "gip-intraday-market-clearing",
    category: { tr: "Türkiye Elektrik Piyasası", en: "Türkiye Electricity Market" },
    title: { tr: "GİP (Gün İçi Piyasası) Nedir? Anlık Elektrik Ticareti ve Dengeleme Rehberi", en: "What Is the Intraday Market (GİP)? Continuous Electricity Trading Guide" },
    description: { tr: "Gün içi piyasasının mantığını, PTF ile farkını ve dengesizlik maliyetlerini yönetmedeki rolünü öğrenin.", en: "Understand intraday market mechanics, differences from day-ahead clearing, and managing imbalance costs." },
    intro: { tr: "Gün İçi Piyasası (GİP), Gün Öncesi Piyasası (GÖP) kapandıktan sonra teslimat saatine kadar olan süre içinde katılımcıların üretim ve tüketim sapmalarını dengelemelerini sağlayan sürekli bir piyasadır.", en: "The Intraday Market (GİP) allows market participants to trade continuous energy contracts close to physical delivery, offsetting unexpected generation or demand fluctuations after the Day-Ahead Market clears." },
    sections: [
      {
        heading: { tr: "GİP ve PTF arasındaki temel fark nedir?", en: "What is the key difference between GİP and PTF?" },
        body: { tr: "PTF tekliflerin belirli bir kapama saatinde (12:00) toplanıp tek bir fiyatla kesiştiği ihale modelidir. GİP ise teslimat saatinden 1 saat öncesine kadar kesintisiz teklif eşleşmesi esasına dayanan sürekli işlemler piyasasıdır.", en: "PTF is formed via a single daily auction where supply and demand curves intersect. GİP, by contrast, operates as a continuous order book where trades match continuously up to 1 hour before actual delivery." },
      },
      {
        heading: { tr: "Dengesizlik maliyetlerinden korunma", en: "Mitigating imbalance costs" },
        body: { tr: "Hava durumu tahmini sapan bir rüzgar veya güneş santrali ya da beklenmeyen bir fabrika duruşu durumunda, katılımcı pozisyonunu GİP'te kapatarak yüksek Sistem Dengeleme Fiyatı (SDF) cezalarından korunabilir.", en: "If a wind generator experiences forecast deviation or a factory shuts down unexpectedly, position adjustments in GİP prevent exposure to punitive System Imbalance Prices (SDF)." },
      },
      {
        heading: { tr: "Otomatik ticaret ve veri entegrasyonu", en: "Automated trading & data integration" },
        body: { tr: "GİP işlemleri saniyeler içinde gerçekleştiği için veri hızı kritik rol oynar. EnergyPulse ve EnergyOS altyapıları piyasa sinyallerini ve sayaç akışlarını anlık birleştirerek karar alma sürecini hızlandırır.", en: "Because intraday transactions occur rapidly, data speed is vital. EnergyPulse and EnergyOS integrate live market feeds with meter telemetry to support fast trading logic." },
      },
    ],
    takeaways: { tr: ["GİP teslimat saatine kadar anlık dengeleme sağlar.", "Dengesizlik cezalarını minimize eder.", "Sürekli eşleşme modeline sahiptir."], en: ["GİP provides continuous balancing up to delivery.", "Minimises imbalance penalties.", "Uses a continuous order matching model."] },
    sources: [{ label: "EPİAŞ — Gün İçi Piyasası Rehberi", url: "https://www.epias.com.tr/" }],
  },
  {
    slug: "cbam-carbon-border-adjustment",
    category: { tr: "Sürdürülebilirlik & İklim", en: "Sustainability & Climate" },
    title: { tr: "Karbon Sınır Düzenleme Mekanizması (SKDM / CBAM) ve Sanayi Etkileri", en: "EU Carbon Border Adjustment Mechanism (CBAM) & Industrial Impacts" },
    description: { tr: "AB SKDM gereksinimlerini, Scope 1-2 emisyon hesaplamalarını ve ihracatçı şirketlerin yükümlülüklerini inceleyin.", en: "Explore EU CBAM compliance requirements, Scope 1-2 emission calculations, and exporter obligations." },
    intro: { tr: "Karbon Sınır Düzenleme Mekanizması (CBAM), Avrupa Birliği'nin yerli üreticilerini korurken küresel emisyonları azaltmayı hedefleyen iklim ve ticaret politikası aracıdır. Çelik, çimento, alüminyum, gübre, elektrik ve hidrojen sektörlerini kapsar.", en: "The EU Carbon Border Adjustment Mechanism (CBAM) is a climate-trade measure ensuring imported goods match the carbon pricing standards imposed on EU domestic industries, affecting iron, steel, cement, aluminium, fertilisers, electricity and hydrogen." },
    sections: [
      {
        heading: { tr: "Gömülü emisyon hesabı nasıl yapılır?", en: "How embedded emissions are calculated" },
        body: { tr: "İhracatçılar ürettikleri ürünlerin ton başına doğrudan (Scope 1) ve dolaylı (Scope 2 - elektrik tüketimi) emisyonlarını ISO 14064 ve GHG Protocol standartlarına uygun doğrulatmalıdır.", en: "Exporters must quantify direct (Scope 1) and indirect (Scope 2 - electricity consumption) embedded emissions per tonne of product according to ISO 14064 and GHG Protocol guidelines." },
      },
      {
        heading: { tr: "Doğrulama ve raporlama takvimi", en: "Reporting schedule and verification" },
        body: { tr: "Mali yükümlülük dönemi öncesindeki geçiş sürecinde çeyreklik emisyon raporlaması zorunludur. Yanlış veya eksik beyanlar cezai yaptırımlara yol açabilir.", en: "Quarterly reporting of embedded emissions is required during the transition phase prior to financial certificate purchasing. Accurate tracking avoids severe non-compliance penalties." },
      },
      {
        heading: { tr: "ClimateOS ve CBAM Yazılımı", en: "ClimateOS & CBAM Software" },
        body: { tr: "ClimateOS platformumuz, tesis elektrik ve yakıt verilerini anlık toplayarak CBAM uyumlu çeyreklik raporları ve yeşil dönüşüm yol haritalarını otomatik üretir.", en: "Our ClimateOS software automates facility fuel and electricity telemetry collection to produce CBAM-compliant quarterly reports and carbon reduction roadmaps." },
      },
    ],
    takeaways: { tr: ["CBAM AB'ye ihracat yapan kritik sektörleri kapsar.", "Scope 1 ve Scope 2 emisyonlarının takibi şarttır.", "Otomatik yazılım raporlaması zaman kazandırır."], en: ["CBAM applies to key energy-intensive exports to the EU.", "Tracking Scope 1 & 2 emissions is mandatory.", "Automated software ensures compliance."] },
    sources: [{ label: "European Commission — CBAM Policy", url: "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en" }],
  },
  {
    slug: "smart-metering-ami-infrastructure",
    category: { tr: "Şebeke ve Sayaç Teknolojileri", en: "Grid & Metering Tech" },
    title: { tr: "Akıllı Şebeke (Smart Grid) ve AMI Sayaç Otomasyon Rehberi", en: "Smart Grid & Advanced Metering Infrastructure (AMI) Automation Guide" },
    description: { tr: "AMI altyapılarının, OSOS protokollerinin ve kayıp-kaçak analizlerinin elektrik şebekelerindeki rolü.", en: "The role of AMI infrastructures, OSOS meter protocols, and automated loss detection in power grids." },
    intro: { tr: "Gelişmiş Sayaç Altyapısı (AMI) ve Otomatik Sayaç Okuma Sistemleri (OSOS), elektrik dağıtım ve tüketim noktalarından uzaktan güvenli ve çift yönlü veri akışı sağlayan kritik şebeke teknolojileridir.", en: "Advanced Metering Infrastructure (AMI) enables automated, secure, two-way communication between smart meters and utility backend systems for real-time monitoring and billing." },
    sections: [
      {
        heading: { tr: "OSOS ve Haberleşme Protokolleri", en: "OSOS & Communication Protocols" },
        body: { tr: "IEC 62056-21, DLMS/COSEM ve Modbus protokolleri sayaçlardan yük profili, reaktif güç ve voltaj verilerini çekmek için kullanılır. Siber güvenlik ve veri doğrulama ilk adımdır.", en: "Protocols such as DLMS/COSEM, Modbus, and IEC 62056-21 poll load profiles, reactive energy, and voltage values. Cybersecurity and data integrity are essential at every node." },
      },
      {
        heading: { tr: "Kayıp-Kaçak ve Anomali Tespiti", en: "Loss Detection & Anomaly Tracking" },
        body: { tr: "Trafolar ve son kullanıcı sayaçları arasındaki enerji dengesi analitiği ile kaçak kullanımı veya sayaç arızaları anında tespit edilebilir.", en: "Energy balance algorithms comparing transformer output against consumer meter totals instantly pinpoint unmetered losses or device tampering." },
      },
      {
        heading: { tr: "SmartMeter Hub ile Kolay Entegrasyon", en: "Streamlined Integration via SmartMeter Hub" },
        body: { tr: "SmartMeter Hub ürünümüz, farklı marka ve modeldeki sayaçları tekleştirilmiş bir veri katmanında birleştirerek SCADA ve ERP sistemlerine aktarır.", en: "SmartMeter Hub standardises disparate meter makes and models into a unified API layer connecting seamlessly to SCADA and enterprise ERP software." },
      },
    ],
    takeaways: { tr: ["AMI çift yönlü otomatik sayaç haberleşmesidir.", "Kayıp-kaçak oranlarını belirgin şekilde düşürür.", "DLMS/COSEM standart protokolüdür."], en: ["AMI ensures two-way automated meter telemetry.", "Dramatically reduces technical and commercial losses.", "Relies on standardized protocols like DLMS/COSEM."] },
    sources: [{ label: "IEC — Smart Grid Standards", url: "https://www.iec.ch/smartgrid" }],
  },
  {
    slug: "solar-pv-self-consumption-grid-integration",
    category: { tr: "Yenilenebilir Enerji", en: "Renewable Energy" },
    title: { tr: "Lisanssız GES ve Öz Tüketim Tesislerinde Şebeke Entegrasyonu", en: "Unlicensed Solar PV & Self-Consumption Grid Integration Guide" },
    description: { tr: "Çatı GES projelerinde öz tüketim oranının artırılması, mahsuplaşma kuralları ve şebeke kısıtları.", en: "Maximizing self-consumption in rooftop solar installations, net metering rules, and grid constraint management." },
    intro: { tr: "Endüstriyel tesisler ve ticari binalar için çatı Güneş Enerji Santralleri (GES), elektrik faturasını düşürmenin en etkili yoludur. Ancak şebeke mahsuplaşması ve anlık güç yönetimi titizlik gerektirir.", en: "Rooftop solar PV systems allow commercial and industrial facilities to slash electricity costs. Effective net metering and active power curtailment management are critical to high returns." },
    sections: [
      {
        heading: { tr: "Aylık ve Saatlik Mahsuplaşma Esasları", en: "Net Metering Principles" },
        body: { tr: "Şebekeye verilen fazla üretim ile şebekeden çekilen enerjinin mahsuplaşması ilgili mevzuat çerçevesinde yürütülür. Öz tüketim oranı ne kadar yüksekse yatırımın geri dönüş süresi (ROI) o kadar kısalır.", en: "Net metering legislation determines how excess solar fed into the grid offsets grid purchases. Maximizing direct self-consumption yields the shortest payback period." },
      },
      {
        heading: { tr: "Sıfır Enjeksiyon (Zero-Export) ve inverter kontrolü", en: "Zero-Export Controls & Inverter Management" },
        body: { tr: "Şebeke kapasite kısıtı olan bölgelerde inverter üretimi tesis tüketimine anlık olarak eşlenerek şebekeye güç akışı sıfırda tutulur.", en: "In grid-constrained zones, fast closed-loop inverter controllers dynamic match PV output to real-time load, preventing unauthorized grid export." },
      },
    ],
    takeaways: { tr: ["Öz tüketim oranı arttıkça amortisman süresi kısalır.", "Mahsuplaşma kuralları doğru izlenmelidir.", "Akıllı inverter kontrolü şebeke güvenliğini sağlar."], en: ["Higher self-consumption yields faster ROI.", "Net metering rules require continuous monitoring.", "Smart inverter control protects grid compliance."] },
    sources: [{ label: "EPDK — Lisanssız Üretim Mevzuatı", url: "https://www.epdk.gov.tr/" }],
  },
  {
    slug: "battery-energy-storage-bess",
    category: { tr: "Enerji Teknolojileri", en: "Energy Technologies" },
    title: { tr: "Enerji Depolama Sistemleri (BESS) ve Frekans Kontrolü", en: "Battery Energy Storage Systems (BESS) & Frequency Regulation" },
    description: { tr: "Batarya depolama teknolojileri, pik tıraşlama (peak shaving) ve yan hizmetler piyasası fırsatları.", en: "Battery storage technology, peak shaving strategies, and ancillary service market opportunities." },
    intro: { tr: "Batarya Enerji Depolama Sistemleri (BESS), yenilenebilir enerjinin kesintili yapısını sönümleyen ve şebeke esnekliğini sağlayan en temel teknolojilerden biridir.", en: "Battery Energy Storage Systems (BESS) provide vital grid flexibility, dampening renewable intermittency while unlocking arbitrage and frequency regulation revenue streams." },
    sections: [
      {
        heading: { tr: "Pik Tıraşlama ve Arbitraj", en: "Peak Shaving & Arbitrage" },
        body: { tr: "Elektrik fiyatlarının düşük olduğu saatlerde bataryayı şarj edip, PTF'nin yüksek olduğu pik saatlerde deşarj ederek çift yönlü maliyet kazancı sağlanır.", en: "Charging batteries during off-peak hours and discharging during peak price hours delivers double-barreled power procurement savings." },
      },
      {
        heading: { tr: "Frekans Kontrolü ve Yan Hizmetler", en: "Frequency Control & Ancillary Services" },
        body: { tr: "BESS üniteleri milisaniyeler içinde tepki vererek Primer ve Sekonder Frekans Kontrolü yan hizmetler piyasasında ek gelir kalemi oluşturur.", en: "Sub-second battery response times allow participation in primary and secondary frequency response ancillary markets, earning capacity reservation fees." },
      },
    ],
    takeaways: { tr: ["BESS pik saatlerde tüketim yükünü düşürür.", "Frekans kontrolü yan hizmet geliri sağlar.", "Arbitraj fırsatları sunar."], en: ["BESS shaves peak demand charges.", "Unlocks ancillary frequency control revenue.", "Provides price arbitrage capabilities."] },
    sources: [{ label: "TEİAŞ — Yan Hizmetler Yönetmeliği", url: "https://www.teias.gov.tr/" }],
  },
  {
    slug: "electricity-procurement-supplier-selection",
    category: { tr: "Enerji Ticareti & Tedarik", en: "Procurement & Trading" },
    title: { tr: "Serbest Tüketici Elektrik Tedarik Sözleşmeleri ve Maliyet Optimizasyonu", en: "Eligible Consumer Electricity Procurement & Contract Optimization" },
    description: { tr: "Serbest tüketici limitleri, PTF+Marj vs Sabit Fiyatlı sözleşmeler ve fatura denetimi.", en: "Eligible customer thresholds, PTF indexed vs fixed rate tariffs, and automated bill verification." },
    intro: { tr: "Yıllık tüketimi serbest tüketici limitini aşan sanayi ve ticarethane aboneleri, tedarikçi değiştirerek elektrik maliyetlerini optimize edebilir.", en: "Commercial and industrial consumers exceeding annual eligibility thresholds can negotiate customized supply agreements to minimize total energy expenditure." },
    sections: [
      {
        heading: { tr: "Sabit Fiyat vs PTF Endeksli Tarife", en: "Fixed Price vs PTF-Indexed Tariffs" },
        body: { tr: "Sabit fiyat bütçe öngörülebilirliği sağlarken, PTF endeksli tarifeler piyasa düşüşlerinden faydalanma imkanı verir. İşletmenin risk iştahına göre karma modeller seçilebilir.", en: "Fixed prices offer budget certainty, whereas PTF-indexed contracts pass market drops directly to buyers. Hybrid tariff structures balance risk and opportunity." },
      },
      {
        heading: { tr: "Fatura Audit ve Sayaç Kalibrasyonu", en: "Bill Audit & Meter Calibration" },
        body: { tr: "Dağıtım bedeli, reaktif ceza ve fonların doğruluğu sayaç verileriyle otomatik karşılaştırılarak hatalı faturalandırmalar engellenmelidir.", en: "Automating bill cross-verification against raw meter interval data prevents distribution tariff overcharges and unneeded reactive penalties." },
      },
    ],
    takeaways: { tr: ["Serbest tüketici tedarikçi seçimiyle tasarruf sağlar.", "Tarife türü risk profiline göre seçilmelidir.", "Fatura denetimi maliyet kaybını önler."], en: ["Eligible status enables supplier competition savings.", "Tariff type must align with financial risk tolerance.", "Automated audits prevent billing discrepancies."] },
    sources: [{ label: "EPDK — Serbest Tüketici Limitleri", url: "https://www.epdk.gov.tr/" }],
  },
];

import { additionalInsights } from "@/lib/insights-additional";

export const insights: InsightArticle[] = [...additionalInsights, ...coreInsights];

export const insightSlugs = insights.map((article) => article.slug);

export function getInsight(slug: string) {
  return insights.find((article) => article.slug === slug);
}
