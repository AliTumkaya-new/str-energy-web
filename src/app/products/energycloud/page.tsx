"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useLocaleHref } from "@/lib/useLocaleHref";
import { Server, Cloud, Database, HardDrive, Cpu, Lock, Zap, Globe, ArrowRight, Minus, Plus } from "lucide-react";

export default function EnergyCloudPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { language } = useLanguage();
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const withLocale = useLocaleHref();

  const copyByLang = {
    tr: {
      badge: "Bulut Platformu",
      title: "Enerji verileriniz",
      accent: "bulutta güvende",
      desc: "Petabayt ölçeğinde veri depolayın ve işleyin. KVKK uyumlu.",
      cta: "Demo Talep Edin",
      howTitle: "EnergyCloud'u ",
      howAccent: "5 adımda",
      howSuffix: " başlatın",
      featuresTitle: "Bulut ",
      featuresAccent: "özellikleri",
      faqTitle: "SSS",
      liveTitle: "Canlı veri",
      liveDesc: "Elektrik üretiminin kaynak bazında saatlik gösterimidir.",
      liveDataset: "Veri seti",
      liveOptionGeneration: "Gerçek zamanlı üretim",
      liveOptionYekdemUnitCost: "YEKDEM birim maliyet",
      liveOptionPtf: "PTF listeleme",
      liveOptionLoadPlan: "Yük tahmin planı",
      liveOptionWeightedAvg: "GİP ağırlıklı ortalama",
      liveKpiRecords: "Kayıt",
      liveKpiColumns: "Kolon",
      liveKpiRange: "Aralık",
      liveKpiDataset: "Seçili set",
      liveHeadline: "EPİAŞ Canlı Enerji Verisi",
      liveSubhead: "PTF, YEKDEM ve üretim verilerini tek panelde izleyin.",
      liveRegion: "Bölge",
      liveRegionTR: "Türkiye",
      liveRegionEU: "Avrupa",
      liveRegionGlobal: "Global",
      liveLabelTR: "TR",
      liveLabelYekdem: "YEKDEM",
      liveLabelPtf: "EPİAŞ PTF",
      liveBadge: "Elektrik",
      liveServiceType: "Servis Türü",
      liveTabTable: "TABLO",
      liveTabChart: "GRAFİK",
      liveFilterPlant: "Santral Adı",
      liveFilterAll: "Tümü",
      liveFilterApply: "Sorgula",
      liveSource: "Veri Kaynağı",
      liveUpdated: "Son Güncelleme Tarihi",
      liveRecordsFound: "adet kayıt bulundu",
      liveCta: "Verileri getir",
      liveSearch: "Tabloda ara",
      liveEmpty: "Bu aralık için veri bulunamadı.",
      liveError: "Veri çekilemedi. Lütfen anahtar ve tarih aralığını kontrol edin.",
      liveStart: "Başlangıç",
      liveEnd: "Bitiş",
      ctaBottomTitle: "Verilerinizi ",
      ctaBottomAccent: "buluta",
      ctaBottomPrimary: "İletişime Geçin",
      ctaBottomSecondary: "Ana Sayfa",
      steps: [
        { num: 1, title: "İhtiyaç Analizi", desc: "Depolama gereksinimlerini belirleriz" },
        { num: 2, title: "Mimari Tasarım", desc: "Bulut mimarisini tasarlarız" },
        { num: 3, title: "Migration", desc: "Verileri güvenle taşırız" },
        { num: 4, title: "Optimizasyon", desc: "Performansı optimize ederiz" },
        { num: 5, title: "Canlıya Geçiş", desc: "7/24 bulut hizmeti başlar" },
      ],
      integrations: [
        { icon: Cloud, title: "Multi-Cloud", desc: "AWS, Azure, GCP entegrasyonu." },
        { icon: Database, title: "Time Series DB", desc: "Enerji verisi için optimize." },
        { icon: Lock, title: "Encryption", desc: "End-to-end şifreleme." },
        { icon: Globe, title: "CDN", desc: "Global içerik dağıtımı." },
      ],
      features: [
        { icon: Server, title: "Ölçeklenebilirlik", desc: "Petabayt ölçeğine büyüyün" },
        { icon: HardDrive, title: "Veri Depolama", desc: "Sınırsız tarihsel veri" },
        { icon: Cpu, title: "Edge Computing", desc: "Dağıtık veri işleme" },
        { icon: Zap, title: "Real-time", desc: "Milisaniye gecikme" },
        { icon: Lock, title: "Güvenlik", desc: "SOC 2 Type II sertifikalı" },
        { icon: Database, title: "Backup", desc: "Otomatik yedekleme" },
      ],
      faqs: [
        { q: "Veri merkezleriniz nerede?", a: "Türkiye (İstanbul), Avrupa (Frankfurt) ve ABD (Virginia)." },
        { q: "KVKK uyumlu musunuz?", a: "Evet, tüm süreçler KVKK ve GDPR uyumludur." },
        { q: "Verileri nasıl taşırız?", a: "Ücretsiz migration servisi ile kesintisiz taşıyoruz." },
      ],
    },
    en: {
      badge: "Cloud Platform",
      title: "Keep your energy data",
      accent: "safe in the cloud",
      desc: "Store and process data at petabyte scale. KVKK/GDPR compliant.",
      cta: "Request Demo",
      howTitle: "Launch EnergyCloud in ",
      howAccent: "5 steps",
      howSuffix: "",
      featuresTitle: "Cloud ",
      featuresAccent: "capabilities",
      faqTitle: "FAQ",
      liveTitle: "Live data",
      liveDesc: "Hourly generation view by source.",
      liveDataset: "Dataset",
      liveOptionGeneration: "Realtime generation",
      liveOptionYekdemUnitCost: "YEKDEM unit cost",
      liveOptionPtf: "PTF listing",
      liveOptionLoadPlan: "Load estimation plan",
      liveOptionWeightedAvg: "Weighted average price",
      liveKpiRecords: "Records",
      liveKpiColumns: "Columns",
      liveKpiRange: "Range",
      liveKpiDataset: "Selected",
      liveHeadline: "EPÄ°AÅ Live Energy Data",
      liveSubhead: "Monitor PTF, YEKDEM, and generation in one panel.",
      liveRegion: "Region",
      liveRegionTR: "Turkey",
      liveRegionEU: "Europe",
      liveRegionGlobal: "Global",
      liveLabelTR: "TR",
      liveLabelYekdem: "YEKDEM",
      liveLabelPtf: "EPÄ°AÅ PTF",
      liveBadge: "Electricity",
      liveServiceType: "Service Type",
      liveTabTable: "TABLE",
      liveTabChart: "CHART",
      liveFilterPlant: "Plant",
      liveFilterAll: "All",
      liveFilterApply: "Query",
      liveSource: "Data Source",
      liveUpdated: "Last Updated",
      liveRecordsFound: "records found",
      liveCta: "Fetch data",
      liveSearch: "Search in table",
      liveEmpty: "No data found for this range.",
      liveError: "Data could not be loaded. Check the API key and date range.",
      liveStart: "Start",
      liveEnd: "End",
      ctaBottomTitle: "Move your data ",
      ctaBottomAccent: "to the cloud",
      ctaBottomPrimary: "Contact Us",
      ctaBottomSecondary: "Home",
      steps: [
        { num: 1, title: "Needs Analysis", desc: "We assess storage requirements" },
        { num: 2, title: "Architecture Design", desc: "We design the cloud architecture" },
        { num: 3, title: "Migration", desc: "We migrate data securely" },
        { num: 4, title: "Optimization", desc: "We optimize performance" },
        { num: 5, title: "Goâ€‘Live", desc: "24/7 cloud service begins" },
      ],
      integrations: [
        { icon: Cloud, title: "Multiâ€‘Cloud", desc: "AWS, Azure, GCP integration." },
        { icon: Database, title: "Time Series DB", desc: "Optimized for energy data." },
        { icon: Lock, title: "Encryption", desc: "Endâ€‘toâ€‘end encryption." },
        { icon: Globe, title: "CDN", desc: "Global content delivery." },
      ],
      features: [
        { icon: Server, title: "Scalability", desc: "Grow to petabyte scale" },
        { icon: HardDrive, title: "Data Storage", desc: "Unlimited historical data" },
        { icon: Cpu, title: "Edge Computing", desc: "Distributed processing" },
        { icon: Zap, title: "Realâ€‘time", desc: "Millisecond latency" },
        { icon: Lock, title: "Security", desc: "SOC 2 Type II certified" },
        { icon: Database, title: "Backup", desc: "Automated backups" },
      ],
      faqs: [
        { q: "Where are your data centers?", a: "Turkey (Istanbul), Europe (Frankfurt), and USA (Virginia)." },
        { q: "Are you KVKK compliant?", a: "Yes, all processes are KVKK and GDPR compliant." },
        { q: "How do we migrate data?", a: "We provide free, zeroâ€‘downtime migration." },
      ],
    },
    ru: {
      badge: "ĞĞ±Ğ»Ğ°Ñ‡Ğ½Ğ°Ñ Ğ¿Ğ»Ğ°Ñ‚Ñ„Ğ¾Ñ€Ğ¼Ğ°",
      title: "Ğ’Ğ°ÑˆĞ¸ ÑĞ½ĞµÑ€Ğ³Ğ¾Ğ´Ğ°Ğ½Ğ½Ñ‹Ğµ",
      accent: "Ğ² Ğ¾Ğ±Ğ»Ğ°ĞºĞµ Ğ¿Ğ¾Ğ´ Ğ·Ğ°Ñ‰Ğ¸Ñ‚Ğ¾Ğ¹",
      desc: "Ğ¥Ñ€Ğ°Ğ½Ğ¸Ñ‚Ğµ Ğ¸ Ğ¾Ğ±Ñ€Ğ°Ğ±Ğ°Ñ‚Ñ‹Ğ²Ğ°Ğ¹Ñ‚Ğµ Ğ´Ğ°Ğ½Ğ½Ñ‹Ğµ Ğ² Ğ¼Ğ°ÑÑˆÑ‚Ğ°Ğ±Ğµ Ğ¿ĞµÑ‚Ğ°Ğ±Ğ°Ğ¹Ñ‚. Ğ¡Ğ¾Ğ¾Ñ‚Ğ²ĞµÑ‚ÑÑ‚Ğ²Ğ¸Ğµ KVKK/GDPR.",
      cta: "Ğ—Ğ°Ğ¿Ñ€Ğ¾ÑĞ¸Ñ‚ÑŒ Ğ´ĞµĞ¼Ğ¾",
      howTitle: "Ğ—Ğ°Ğ¿ÑƒÑÑ‚Ğ¸Ñ‚Ğµ EnergyCloud Ğ·Ğ° ",
      howAccent: "5 ÑˆĞ°Ğ³Ğ¾Ğ²",
      howSuffix: "",
      featuresTitle: "ĞĞ±Ğ»Ğ°Ñ‡Ğ½Ñ‹Ğµ ",
      featuresAccent: "Ğ²Ğ¾Ğ·Ğ¼Ğ¾Ğ¶Ğ½Ğ¾ÑÑ‚Ğ¸",
      faqTitle: "FAQ",
      liveTitle: "Ğ–Ğ¸Ğ²Ñ‹Ğµ Ğ´Ğ°Ğ½Ğ½Ñ‹Ğµ",
      liveDesc: "ĞŸĞ¾Ñ‡Ğ°ÑĞ¾Ğ²Ğ¾Ğ¹ Ğ¾Ğ±Ğ·Ğ¾Ñ€ Ğ³ĞµĞ½ĞµÑ€Ğ°Ñ†Ğ¸Ğ¸ Ğ¿Ğ¾ Ğ¸ÑÑ‚Ğ¾Ñ‡Ğ½Ğ¸ĞºĞ°Ğ¼.",
      liveDataset: "ĞĞ°Ğ±Ğ¾Ñ€ Ğ´Ğ°Ğ½Ğ½Ñ‹Ñ…",
      liveOptionGeneration: "Ğ“ĞµĞ½ĞµÑ€Ğ°Ñ†Ğ¸Ñ Ğ² Ñ€ĞµĞ°Ğ»ÑŒĞ½Ğ¾Ğ¼ Ğ²Ñ€ĞµĞ¼ĞµĞ½Ğ¸",
      liveOptionYekdemUnitCost: "YEKDEM ÑÑ‚Ğ¾Ğ¸Ğ¼Ğ¾ÑÑ‚ÑŒ",
      liveOptionPtf: "PTF ÑĞ¿Ğ¸ÑĞ¾Ğº",
      liveOptionLoadPlan: "ĞŸĞ»Ğ°Ğ½ Ğ½Ğ°Ğ³Ñ€ÑƒĞ·ĞºĞ¸",
      liveOptionWeightedAvg: "Ğ¡Ñ€ĞµĞ´Ğ½ÑÑ Ñ†ĞµĞ½Ğ°",
      liveKpiRecords: "Ğ—Ğ°Ğ¿Ğ¸ÑĞ¸",
      liveKpiColumns: "ĞšĞ¾Ğ»Ğ¾Ğ½ĞºĞ¸",
      liveKpiRange: "ĞŸĞµÑ€Ğ¸Ğ¾Ğ´",
      liveKpiDataset: "Ğ’Ñ‹Ğ±Ğ¾Ñ€",
      liveHeadline: "EPÄ°AÅ Live Energy Data",
      liveSubhead: "PTF, YEKDEM Ğ¸ Ğ³ĞµĞ½ĞµÑ€Ğ°Ñ†Ğ¸Ñ Ğ² Ğ¾Ğ´Ğ½Ğ¾Ğ¼ Ğ¾ĞºĞ½Ğµ.",
      liveRegion: "Ğ ĞµĞ³Ğ¸Ğ¾Ğ½",
      liveRegionTR: "Ğ¢ÑƒÑ€Ñ†Ğ¸Ñ",
      liveRegionEU: "Ğ•Ğ²Ñ€Ğ¾Ğ¿Ğ°",
      liveRegionGlobal: "Ğ“Ğ»Ğ¾Ğ±Ğ°Ğ»ÑŒĞ½Ñ‹Ğ¹",
      liveLabelTR: "TR",
      liveLabelYekdem: "YEKDEM",
      liveLabelPtf: "EPÄ°AÅ PTF",
      liveBadge: "Ğ­Ğ»ĞµĞºÑ‚Ñ€Ğ¾",
      liveServiceType: "Ğ¢Ğ¸Ğ¿ ÑĞµÑ€Ğ²Ğ¸ÑĞ°",
      liveTabTable: "Ğ¢ĞĞ‘Ğ›Ğ˜Ğ¦Ğ",
      liveTabChart: "Ğ“Ğ ĞĞ¤Ğ˜Ğš",
      liveFilterPlant: "Ğ¡Ñ‚Ğ°Ğ½Ñ†Ğ¸Ñ",
      liveFilterAll: "Ğ’ÑĞµ",
      liveFilterApply: "Ğ—Ğ°Ğ¿Ñ€Ğ¾Ñ",
      liveSource: "Ğ˜ÑÑ‚Ğ¾Ñ‡Ğ½Ğ¸Ğº",
      liveUpdated: "ĞĞ±Ğ½Ğ¾Ğ²Ğ»ĞµĞ½Ğ¾",
      liveRecordsFound: "Ğ·Ğ°Ğ¿Ğ¸ÑĞµĞ¹",
      liveCta: "Ğ—Ğ°Ğ³Ñ€ÑƒĞ·Ğ¸Ñ‚ÑŒ",
      liveSearch: "ĞŸĞ¾Ğ¸ÑĞº Ğ² Ñ‚Ğ°Ğ±Ğ»Ğ¸Ñ†Ğµ",
      liveEmpty: "Ğ”Ğ°Ğ½Ğ½Ñ‹Ñ… Ğ·Ğ° ÑÑ‚Ğ¾Ñ‚ Ğ¿ĞµÑ€Ğ¸Ğ¾Ğ´ Ğ½ĞµÑ‚.",
      liveError: "ĞĞµ ÑƒĞ´Ğ°Ğ»Ğ¾ÑÑŒ Ğ·Ğ°Ğ³Ñ€ÑƒĞ·Ğ¸Ñ‚ÑŒ Ğ´Ğ°Ğ½Ğ½Ñ‹Ğµ. ĞŸÑ€Ğ¾Ğ²ĞµÑ€ÑŒÑ‚Ğµ ĞºĞ»ÑÑ‡ Ğ¸ Ğ´Ğ¸Ğ°Ğ¿Ğ°Ğ·Ğ¾Ğ½ Ğ´Ğ°Ñ‚.",
      liveStart: "ĞĞ°Ñ‡Ğ°Ğ»Ğ¾",
      liveEnd: "ĞšĞ¾Ğ½ĞµÑ†",
      ctaBottomTitle: "ĞŸĞµÑ€ĞµĞ½ĞµÑĞ¸Ñ‚Ğµ Ğ´Ğ°Ğ½Ğ½Ñ‹Ğµ ",
      ctaBottomAccent: "Ğ² Ğ¾Ğ±Ğ»Ğ°ĞºĞ¾",
      ctaBottomPrimary: "Ğ¡Ğ²ÑĞ·Ğ°Ñ‚ÑŒÑÑ",
      ctaBottomSecondary: "Ğ“Ğ»Ğ°Ğ²Ğ½Ğ°Ñ",
      steps: [
        { num: 1, title: "ĞĞ½Ğ°Ğ»Ğ¸Ğ· Ğ¿Ğ¾Ñ‚Ñ€ĞµĞ±Ğ½Ğ¾ÑÑ‚ĞµĞ¹", desc: "ĞĞ¿Ñ€ĞµĞ´ĞµĞ»ÑĞµĞ¼ Ñ‚Ñ€ĞµĞ±Ğ¾Ğ²Ğ°Ğ½Ğ¸Ñ Ğº Ñ…Ñ€Ğ°Ğ½ĞµĞ½Ğ¸Ñ" },
        { num: 2, title: "ĞŸÑ€Ğ¾ĞµĞºÑ‚Ğ¸Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ Ğ°Ñ€Ñ…Ğ¸Ñ‚ĞµĞºÑ‚ÑƒÑ€Ñ‹", desc: "ĞŸÑ€Ğ¾ĞµĞºÑ‚Ğ¸Ñ€ÑƒĞµĞ¼ Ğ¾Ğ±Ğ»Ğ°ĞºĞ¾" },
        { num: 3, title: "Migration", desc: "Ğ‘ĞµĞ·Ğ¾Ğ¿Ğ°ÑĞ½Ğ¾ Ğ¿ĞµÑ€ĞµĞ½Ğ¾ÑĞ¸Ğ¼ Ğ´Ğ°Ğ½Ğ½Ñ‹Ğµ" },
        { num: 4, title: "ĞĞ¿Ñ‚Ğ¸Ğ¼Ğ¸Ğ·Ğ°Ñ†Ğ¸Ñ", desc: "ĞĞ¿Ñ‚Ğ¸Ğ¼Ğ¸Ğ·Ğ¸Ñ€ÑƒĞµĞ¼ Ğ¿Ñ€Ğ¾Ğ¸Ğ·Ğ²Ğ¾Ğ´Ğ¸Ñ‚ĞµĞ»ÑŒĞ½Ğ¾ÑÑ‚ÑŒ" },
        { num: 5, title: "Goâ€‘Live", desc: "Ğ—Ğ°Ğ¿ÑƒÑĞº ÑĞµÑ€Ğ²Ğ¸ÑĞ° 24/7" },
      ],
      integrations: [
        { icon: Cloud, title: "Multiâ€‘Cloud", desc: "Ğ˜Ğ½Ñ‚ĞµĞ³Ñ€Ğ°Ñ†Ğ¸Ñ AWS, Azure, GCP." },
        { icon: Database, title: "Time Series DB", desc: "ĞĞ¿Ñ‚Ğ¸Ğ¼Ğ¸Ğ·Ğ¸Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ¾ Ğ´Ğ»Ñ ÑĞ½ĞµÑ€Ğ³Ğ¾Ğ´Ğ°Ğ½Ğ½Ñ‹Ñ…." },
        { icon: Lock, title: "Encryption", desc: "Ğ¡ĞºĞ²Ğ¾Ğ·Ğ½Ğ¾Ğµ ÑˆĞ¸Ñ„Ñ€Ğ¾Ğ²Ğ°Ğ½Ğ¸Ğµ." },
        { icon: Globe, title: "CDN", desc: "Ğ“Ğ»Ğ¾Ğ±Ğ°Ğ»ÑŒĞ½Ğ°Ñ Ğ´Ğ¾ÑÑ‚Ğ°Ğ²ĞºĞ° ĞºĞ¾Ğ½Ñ‚ĞµĞ½Ñ‚Ğ°." },
      ],
      features: [
        { icon: Server, title: "ĞœĞ°ÑÑˆÑ‚Ğ°Ğ±Ğ¸Ñ€ÑƒĞµĞ¼Ğ¾ÑÑ‚ÑŒ", desc: "Ğ Ğ¾ÑÑ‚ Ğ´Ğ¾ Ğ¿ĞµÑ‚Ğ°Ğ±Ğ°Ğ¹Ñ‚" },
        { icon: HardDrive, title: "Ğ¥Ñ€Ğ°Ğ½ĞµĞ½Ğ¸Ğµ Ğ´Ğ°Ğ½Ğ½Ñ‹Ñ…", desc: "ĞĞµĞ¾Ğ³Ñ€Ğ°Ğ½Ğ¸Ñ‡ĞµĞ½Ğ½Ğ°Ñ Ğ¸ÑÑ‚Ğ¾Ñ€Ğ¸Ñ" },
        { icon: Cpu, title: "Edge Computing", desc: "Ğ Ğ°ÑĞ¿Ñ€ĞµĞ´ĞµĞ»ĞµĞ½Ğ½Ğ°Ñ Ğ¾Ğ±Ñ€Ğ°Ğ±Ğ¾Ñ‚ĞºĞ°" },
        { icon: Zap, title: "Realâ€‘time", desc: "ĞœĞ¸Ğ»Ğ»Ğ¸ÑĞµĞºÑƒĞ½Ğ´Ğ½Ğ°Ñ Ğ·Ğ°Ğ´ĞµÑ€Ğ¶ĞºĞ°" },
        { icon: Lock, title: "Ğ‘ĞµĞ·Ğ¾Ğ¿Ğ°ÑĞ½Ğ¾ÑÑ‚ÑŒ", desc: "SOC 2 Type II ÑĞµÑ€Ñ‚Ğ¸Ñ„Ğ¸ĞºĞ°Ñ†Ğ¸Ñ" },
        { icon: Database, title: "Backup", desc: "ĞĞ²Ñ‚Ğ¾Ğ¼Ğ°Ñ‚Ğ¸Ñ‡ĞµÑĞºĞ¸Ğµ Ğ±ÑĞºĞ°Ğ¿Ñ‹" },
      ],
      faqs: [
        { q: "Ğ“Ğ´Ğµ Ğ½Ğ°Ñ…Ğ¾Ğ´ÑÑ‚ÑÑ Ğ²Ğ°ÑˆĞ¸ Ğ´Ğ°Ñ‚Ğ°â€‘Ñ†ĞµĞ½Ñ‚Ñ€Ñ‹?", a: "Ğ¢ÑƒÑ€Ñ†Ğ¸Ñ (Ğ¡Ñ‚Ğ°Ğ¼Ğ±ÑƒĞ»), Ğ•Ğ²Ñ€Ğ¾Ğ¿Ğ° (Ğ¤Ñ€Ğ°Ğ½ĞºÑ„ÑƒÑ€Ñ‚) Ğ¸ Ğ¡Ğ¨Ğ (Ğ’Ğ¸Ñ€Ğ´Ğ¶Ğ¸Ğ½Ğ¸Ñ)." },
        { q: "Ğ’Ñ‹ ÑĞ¾Ğ¾Ñ‚Ğ²ĞµÑ‚ÑÑ‚Ğ²ÑƒĞµÑ‚Ğµ KVKK?", a: "Ğ”Ğ°, Ğ²ÑĞµ Ğ¿Ñ€Ğ¾Ñ†ĞµÑÑÑ‹ ÑĞ¾Ğ¾Ñ‚Ğ²ĞµÑ‚ÑÑ‚Ğ²ÑƒÑÑ‚ KVKK Ğ¸ GDPR." },
        { q: "ĞšĞ°Ğº Ğ¿Ñ€Ğ¾Ğ¸ÑÑ…Ğ¾Ğ´Ğ¸Ñ‚ Ğ¿ĞµÑ€ĞµĞ½Ğ¾Ñ Ğ´Ğ°Ğ½Ğ½Ñ‹Ñ…?", a: "Ğ‘ĞµÑĞ¿Ğ»Ğ°Ñ‚Ğ½Ğ°Ñ Ğ¼Ğ¸Ğ³Ñ€Ğ°Ñ†Ğ¸Ñ Ğ±ĞµĞ· Ğ¿Ñ€Ğ¾ÑÑ‚Ğ¾ĞµĞ²." },
      ],
    },
  } as const;

  const copy = copyByLang[language] ?? copyByLang.tr;
  const steps = copy.steps;
  const integrations = copy.integrations;
  const features = copy.features;
  const faqs = copy.faqs;


  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const sectionBase = isDark ? "bg-black" : "bg-white";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const sectionGradient = isDark
    ? "bg-gradient-to-b from-zinc-950 to-black"
    : "bg-gradient-to-b from-zinc-50 to-white";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";
  const card = isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-black/10";
  const cardAlt = isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />
      <section
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.20), rgba(59,130,246,0.20))" }}
        />
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="waves" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6"><Cloud className="w-4 h-4" />{copy.badge}</div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${heading}`}>{copy.title}<br /><span className="text-cyan-400">{copy.accent}</span></h1>
            <p className={`text-lg mb-10 max-w-2xl mx-auto ${desc}`}>{copy.desc}</p>
            <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full">{copy.cta}</Link>
          </motion.div>
        </div>
      </section>
      <section id="how-it-works" className={`py-20 ${sectionAlt}`}>
        <div className="container text-center mb-12"><h2 className={`text-3xl font-bold -mt-6 ${heading}`}>{copy.howTitle}<span className="text-cyan-400">{copy.howAccent}</span>{copy.howSuffix}</h2></div>
        <div className="container grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center mx-auto mb-4">{s.num}</div>
              <h3 className={`font-semibold mb-1 ${heading}`}>{s.title}</h3>
              <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Live data dashboard moved to homepage */}

      <section className={`py-20 ${sectionGradient}`}>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrations.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`${cardAlt} border rounded-xl p-6 hover:border-cyan-500/30`}>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4"><item.icon className="w-5 h-5 text-cyan-400" /></div>
              <h3 className={`font-semibold mb-2 ${heading}`}>{item.title}</h3>
              <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="features" className={`py-20 ${sectionBase}`}>
        <div className="container text-center mb-12"><h2 className={`text-3xl font-bold ${heading}`}>{copy.featuresTitle}<span className="text-cyan-400">{copy.featuresAccent}</span></h2></div>
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`${card} border rounded-xl p-5 hover:border-cyan-500/30`}>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3"><f.icon className="w-5 h-5 text-cyan-400" /></div>
              <h3 className={`font-semibold mb-1 ${heading}`}>{f.title}</h3>
              <p className={`${isDark ? "text-gray-500" : "text-zinc-600"} text-sm`}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="faq" className={`py-20 ${sectionAlt}`}>
        <div className="container max-w-3xl text-center mb-12"><h2 className={`text-3xl font-bold ${heading}`}>{copy.faqTitle}</h2></div>
        <div className="container max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`w-full flex items-center justify-between p-5 rounded-xl text-left border ${
                  openFaq === i
                    ? `${isDark ? "bg-zinc-900" : "bg-white"} border-cyan-500/30`
                    : `${isDark ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-50 border-black/10"}`
                }`}
              >
                <span className={heading}>{faq.q}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${openFaq === i ? "bg-cyan-500" : isDark ? "bg-zinc-800" : "bg-zinc-200"}`}>
                  {openFaq === i ? <Minus className="w-3 h-3 text-white" /> : <Plus className={`w-3 h-3 ${isDark ? "text-gray-400" : "text-zinc-700"}`} />}
                </div>
              </button>
              {openFaq === i && <div className={`p-5 pt-0 text-sm ${isDark ? "text-gray-400" : "text-zinc-700"}`}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
      <section className={`py-16 border-t text-center ${sectionBase} ${isDark ? "border-zinc-800" : "border-black/10"}`}>
        <h2 className={`text-2xl font-bold mb-4 ${heading}`}>{copy.ctaBottomTitle}<span className="text-cyan-400">{copy.ctaBottomAccent}</span></h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={withLocale("/contacts")} className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full">{copy.ctaBottomPrimary} <ArrowRight className="w-4 h-4" /></Link>
            <Link href={withLocale("/")} className={`px-8 py-4 border font-semibold rounded-full ${isDark ? "border-zinc-700 text-white hover:bg-zinc-900" : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"}`}>{copy.ctaBottomSecondary}</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
