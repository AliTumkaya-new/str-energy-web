import fs from "fs";
import path from "path";
import { chromium } from "playwright";
import ffmpegStatic from "ffmpeg-static";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

// Read insights.ts to get the 24 slugs and details
const insightsPath = path.join(process.cwd(), "src/lib/insights.ts");
const content = fs.readFileSync(insightsPath, "utf8");
const arrayMatch = content.match(/export const insights: InsightArticle\[\] = (\[[\s\S]*?\]);\s*export const insightSlugs/);
const articles = eval(arrayMatch[1]);

console.log(`Loaded ${articles.length} articles to generate images for.`);
fs.mkdirSync("public/images/insights", { recursive: true });

// Visual theme configurations per category
const categoryThemes = {
  "Türkiye Elektrik Piyasası": { icon: "⚡", accent: "#f97316", metricLabel: "GÖP / PTF VERİ ANALİZİ", metricVal: "TL / MWh" },
  "Avrupa Elektrik Piyasaları": { icon: "🌐", accent: "#38bdf8", metricLabel: "ENTSO-E ŞEFFAFLIK", metricVal: "EUR / MWh" },
  "Endüstriyel Enerji Yönetimi": { icon: "🏭", accent: "#10b981", metricLabel: "PİK YÜK VE ALT SAYAÇ", metricVal: "kWh / Üretim" },
  "Enerji Yönetim Standartları": { icon: "📐", accent: "#a855f7", metricLabel: "ISO 50001 EnB & EnPI", metricVal: "Regresyon Modeli" },
  "Enerji Tahminlemesi ve Analitik": { icon: "📈", accent: "#ec4899", metricLabel: "YAPAY ZEKA YÜK TAHMİNİ", metricVal: "MAPE < %3.5" },
  "Karbon Piyasaları ve Ticaret": { icon: "🌱", accent: "#84cc16", metricLabel: "SKDM / CBAM UYUM", metricVal: "tCO2e / Ton" },
  "Akıllı Şebeke Altyapısı": { icon: "📡", accent: "#06b6d4", metricLabel: "AMI AKILLI SAYAÇ", metricVal: "PLC & Hücresel" },
  "Enerji Depolama Sistemleri": { icon: "🔋", accent: "#eab308", metricLabel: "BESS LİTYUM-İYON", metricVal: "C-Rate / MWh" },
  "COP31 & Ulusal İklim Stratejisi": { icon: "🌍", accent: "#14b8a6", metricLabel: "COP31 & 2053 VİZYONU", metricVal: "Net-Sıfır Hedefi" },
  "Temiz Yakıtlar & Hidrojen": { icon: "💧", accent: "#0ea5e9", metricLabel: "YEŞİL HİDROJEN LCOH", metricVal: "kg H2 / MWh" },
  "Şebeke Ölçekli Depolama": { icon: "⚡", accent: "#f59e0b", metricLabel: "PTF ARBİTRAJ & PFC", metricVal: "MW / MWh Kapasite" },
  "Gelişmiş Nükleer Teknolojiler": { icon: "⚛️", accent: "#8b5cf6", metricLabel: "SMR MODÜLER NÜKLEER", metricVal: "Baz Yük 300 MW" },
  "Şebeke Dijitalleşmesi & Yapay Zeka": { icon: "🤖", accent: "#6366f1", metricLabel: "DİJİTAL İKİZ & SCADA", metricVal: "Gerçek Zamanlı Sim." },
  "Karbon Fiyatlama ve Mevzuat": { icon: "⚖️", accent: "#22c55e", metricLabel: "ULUSAL ETS PİYASASI", metricVal: "İklim Kanunu & İRD" },
  "Deniz Üstü Rüzgar Sistemleri": { icon: "🌊", accent: "#0284c7", metricLabel: "OFFSHORE RÜZGAR & HVDC", metricVal: "Denizaltı İletim" },
  "Kurumsal Enerji Ticareti": { icon: "📑", accent: "#f43f5e", metricLabel: "KURUMSAL PPA & I-REC", metricVal: "CfD & Yeşil Sözleşme" },
  "Güneş Enerjisi Sistemleri": { icon: "☀️", accent: "#eab308", metricLabel: "BÜYÜK ÖLÇEKLİ GES", metricVal: "LCOE / Tracker" },
  "Rüzgar Enerjisi Sistemleri": { icon: "💨", accent: "#38bdf8", metricLabel: "KESTİRİMCİ BAKIM CMS", metricVal: "FFT Titreşim & SCADA" },
  "Jeotermal Enerji": { icon: "♨️", accent: "#f97316", metricLabel: "ORC İKİLİ ÇEVRİM", metricVal: "%100 Reenjeksiyon" },
  "Biyoenerji ve Atık Yönetimi": { icon: "♻️", accent: "#10b981", metricLabel: "BİYOGAZ & KOJENERASYON", metricVal: "CHP %85+ Verim" },
  "E-Mobilite ve Akıllı Şebeke": { icon: "🚗", accent: "#06b6d4", metricLabel: "DC HIZLI ŞARJ & V2G", metricVal: "DLM Yük Dengeleme" },
  "Endüstriyel Enerji Verimliliği": { icon: "⚙️", accent: "#8b5cf6", metricLabel: "VAP HİBE DESTEĞİ", metricVal: "%30 Devlet Teşviki" },
  "Yenilenebilir Enerji Mevzuatı": { icon: "📜", accent: "#f59e0b", metricLabel: "YEKDEM TEŞVİK SİSTEMİ", metricVal: "TL Eskalasyon & Yerli" },
  "Depolama Güvenliği ve Mühendislik": { icon: "🛡️", accent: "#ef4444", metricLabel: "NFPA 855 & UL 9540A", metricVal: "Termal Kaçak Koruması" },
};

async function generateAll() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    const categoryTr = art.category.tr;
    const theme = categoryThemes[categoryTr] || { icon: "⚡", accent: "#f97316", metricLabel: "STR ENERGY", metricVal: "TEKNİK REHBER" };
    const tempPng = path.join("public/images/insights", `${art.slug}.tmp.png`);
    const finalWebp = path.join("public/images/insights", `${art.slug}.webp`);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body {
            width: 1200px;
            height: 630px;
            background: #07090e;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 56px 64px;
            position: relative;
            overflow: hidden;
          }
          /* Background Grid & Ambient Glow */
          .glow-1 {
            position: absolute;
            top: -120px;
            right: -100px;
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, ${theme.accent}33 0%, transparent 65%);
            border-radius: 50%;
            pointer-events: none;
          }
          .glow-2 {
            position: absolute;
            bottom: -150px;
            left: 20%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
          }
          .top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 10;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-logo {
            width: 38px;
            height: 38px;
            background: linear-gradient(135deg, #f97316, #ea580c);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 900;
            color: white;
            box-shadow: 0 4px 20px rgba(249,115,22,0.4);
          }
          .brand-name {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .brand-tag {
            font-size: 11px;
            color: #94a3b8;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }
          .badge {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.12);
            padding: 8px 16px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: ${theme.accent};
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .main-content {
            z-index: 10;
            margin-top: 10px;
            max-width: 1020px;
          }
          .category-title {
            color: ${theme.accent};
            font-size: 14px;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .headline {
            font-size: 42px;
            font-weight: 800;
            line-height: 1.18;
            letter-spacing: -1px;
            color: #ffffff;
            margin-bottom: 20px;
          }
          .meta-cards {
            display: flex;
            gap: 16px;
            margin-top: 24px;
          }
          .meta-card {
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 12px 20px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            backdrop-filter: blur(8px);
          }
          .meta-card-label {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #94a3b8;
          }
          .meta-card-value {
            font-size: 15px;
            font-weight: 700;
            color: #f1f5f9;
          }
          .bottom-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 20px;
            z-index: 10;
            font-size: 12px;
            color: #64748b;
          }
          .author-info {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #94a3b8;
            font-weight: 600;
          }
          .accent-dot {
            width: 8px;
            height: 8px;
            background: #f97316;
            border-radius: 50%;
          }
        </style>
      </head>
      <body>
        <div class="glow-1"></div>
        <div class="glow-2"></div>
        <div class="grid-pattern"></div>

        <div class="top-row">
          <div class="brand">
            <div class="brand-logo">⚡</div>
            <div>
              <div class="brand-name">STR Energy</div>
              <div class="brand-tag">Energy Software & Applied R&D</div>
            </div>
          </div>
          <div class="badge">
            <span>${theme.icon}</span>
            <span>TEKNİK REHBER & METODOLOJİ</span>
          </div>
        </div>

        <div class="main-content">
          <div class="category-title">
            <span>●</span> ${art.category.tr} • ANALİZ VE MİMARİ
          </div>
          <h1 class="headline">${art.title.tr}</h1>
          
          <div class="meta-cards">
            <div class="meta-card">
              <span class="meta-card-label">ODAK KAPSAMI</span>
              <span class="meta-card-value">${theme.metricLabel}</span>
            </div>
            <div class="meta-card">
              <span class="meta-card-label">TEMEL GÖSTERGE</span>
              <span class="meta-card-value">${theme.metricVal}</span>
            </div>
            <div class="meta-card">
              <span class="meta-card-label">BİRİNCİL KAYNAK</span>
              <span class="meta-card-value">${art.sources[0]?.label || "Resmi Mevzuat ve Şeffaflık Verileri"}</span>
            </div>
          </div>
        </div>

        <div class="bottom-bar">
          <div class="author-info">
            <div class="accent-dot"></div>
            <span>STR Energy Editoryal Ekibi — Bağımsız Enerji Araştırmaları</span>
          </div>
          <div>str-energy.com/tr/insights/${art.slug}</div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html);
    await page.screenshot({ path: tempPng });

    // Convert to webp via ffmpeg
    await execFileAsync(ffmpegStatic, [
      "-y",
      "-i", tempPng,
      "-c:v", "libwebp",
      "-quality", "92",
      finalWebp
    ]);

    fs.unlinkSync(tempPng);
    console.log(`[${i + 1}/${articles.length}] Generated WebP for: ${art.slug}`);
  }

  await browser.close();
  console.log("🎉 All 24 WebP images generated successfully!");
}

generateAll().catch(console.error);
