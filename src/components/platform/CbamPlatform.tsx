"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, DragEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calculator,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Database,
  Download,
  Factory,
  FileCheck2,
  FileSpreadsheet,
  FileStack,
  FileOutput,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  type CbamDossier,
  type CbamLocale,
  type CbamModuleKey,
  type CbamPackage,
  type CbamProduct,
  type CbamSource,
  type CbamStatus,
  type CbamTask,
} from "@/lib/cbamPlatformData";
import type { CbamExcelAnalysisResult } from "@/lib/cbamExcelTypes";
import { useLocaleHref } from "@/lib/useLocaleHref";

const moduleIcons = {
  overview: LayoutDashboard,
  analysis: FileSpreadsheet,
  products: Package,
  sources: Database,
  dossiers: FileCheck2,
  packages: FileOutput,
} satisfies Record<CbamModuleKey, typeof LayoutDashboard>;

const copy = {
  tr: {
    workspace: "STR CBAM Export",
    workspaceType: "CBAM veri yönetimi",
    tenant: "İskenderun Alüminyum Tesisi",
    demo: "Aktif çalışma alanı",
    back: "Ürün sayfasına dön",
    logout: "Çıkış yap",
    account: "STR Kullanıcı",
    period: "Nisan - Haziran 2026",
    modules: {
      overview: {
        label: "Genel bakış",
        description: "Hazırlık durumu, açık kontroller ve ekip aksiyonları",
      },
      analysis: {
        label: "Excel analizi",
        description: "Tüketim tablosundan karbon ön hesaplama",
      },
      products: {
        label: "Ürünler",
        description: "CN kodu, tesis ve üretim rotası yönetimi",
      },
      sources: {
        label: "Veri kaynakları",
        description: "Enerji, üretim ve tedarikçi veri akışları",
      },
      dossiers: {
        label: "Emisyon dosyaları",
        description: "Dönemsel ürün emisyon çalışmalarının takibi",
      },
      packages: {
        label: "Paylaşım paketleri",
        description: "AB alıcılarına hazırlanacak veri paketleri",
      },
    },
    overviewTitle: "CBAM hazırlık merkezi",
    overviewDescription:
      "Ürün, tesis ve veri akışlarınızın durumunu izleyin; eksikleri önceliklendirin ve alıcı taleplerine hazırlıklı kalın.",
    commandEyebrow: "CBAM veri çalışma alanı",
    commandTitle: "İhracat verinizi düzenli ve paylaşılabilir hale getirin",
    commandDescription:
      "STR CBAM Export; ürünleri, tesisleri, veri kaynaklarını ve alıcıya hazırlanacak dosyaları tek sade çalışma alanında toplar.",
    commandPrimary: "Ürünleri yönet",
    commandSecondary: "Excel yükle",
    liveStatus: "Çalışma alanı aktif",
    buyerRequestTitle: "Alıcı talebi",
    buyerRequestDetail: "NordForm GmbH için ürün veri paketi",
    buyerRequestStatus: "Paylaşıma hazırlanıyor",
    exportPacketTitle: "İhracat ekibi çıktısı",
    exportPacketDetail: "Ürün, CN kodu, tesis, kaynak belge ve sürüm bilgisi aynı pakette tutulur.",
    proofChainTitle: "Kanıt zinciri",
    proofChainDetail: "Her veri; sahibi, kaynağı, dönemi ve kontrol durumuyla izlenir.",
    workflowTitle: "Sade çalışma akışı",
    workflowDescription:
      "Ürün kapsamı seçilir, enerji ve üretim verileri bağlanır, kontroller kapatılır ve paylaşım paketi sürümlenir.",
    workflowItems: [
      { title: "Ürün kapsamı", detail: "CN kodu, tesis ve üretim rotası netleşir" },
      { title: "Veri akışı", detail: "Sayaç, fatura, ERP/MES ve tedarikçi kayıtları bağlanır" },
      { title: "Kontrol", detail: "Eksik belge ve veri tutarsızlığı ekip görevine dönüşür" },
      { title: "Paylaşım", detail: "AB alıcısı için sürümlü veri paketi hazırlanır" },
    ],
    riskPanelTitle: "Bugün odaklanılacaklar",
    riskPanelDescription: "Eksik veri, açık kontrol ve hazır dosyalar sade biçimde görünür.",
    sourceIntake: "Kaynak akışı",
    qualityGate: "Kontrol kapısı",
    buyerHandoff: "Alıcı paketi",
    readyForBuyer: "Kontrol altında",
    analysisTitle: "Excel veya veri setinden karbon ön analizi",
    analysisDescription:
      "Elektrik, doğalgaz, su ve üretim verilerini içeren Excel, CSV veya metin tabanlı PDF dosyasını yükleyin; sistem toplam emisyonu, ürün yoğunluğunu ve veri kalitesi uyarılarını çıkarsın.",
    uploadTitle: "Excel veya veri seti yükleyin",
    uploadDescription: ".xlsx, .xlsm, .csv, .txt veya metin tabanlı .pdf dosyası. Başlıkları ve veri sayfasını otomatik eşleştirir.",
    chooseFile: "Dosya seç",
    selectedFile: "Seçilen dosya",
    analyzeFile: "Analiz et",
    analyzingFile: "Analiz ediliyor",
    clearAnalysis: "Sonucu temizle",
    acceptedColumns: "Önerilen kolonlar",
    acceptedColumnsList: [
      "Ürün",
      "Dönem / tarih",
      "Elektrik tüketimi (kWh)",
      "Doğalgaz tüketimi (m3)",
      "Su tüketimi (m3)",
      "Üretim miktarı (ton)",
      "Üretim ağırlığı (kg)",
      "Toplam emisyon (kgCO2e)",
    ],
    analysisResult: "Analiz çıktısı",
    scanTitle: "Veri dosyası taranıyor",
    scanDescription:
      "Platform dosyayı okur, kolonları eşleştirir, faaliyet verilerini kontrol eder ve CBAM rapor çıktısını hazırlar.",
    scanStatusReady: "Hazır",
    scanStatusWorking: "Taranıyor",
    scanStatusQueued: "Sırada",
    scanCompleteTitle: "Analiz tamamlandı",
    scanCompleteDescription: "Karbon emisyon ön analizi ve CBAM veri kontrol raporu hazır.",
    scanSteps: [
      { title: "Ürün ve CN kodu", detail: "Ürün portföyü ve sınıflandırma alanları kontrol ediliyor" },
      { title: "Tesis ve üretim rotası", detail: "Tesis, dönem ve üretim rotası alanları eşleştiriliyor" },
      { title: "Faaliyet verileri", detail: "Elektrik, doğalgaz, su ve üretim tonajı okunuyor" },
      { title: "Emisyon hesabı", detail: "Tüketim verileri karbon emisyon değerine çevriliyor" },
      { title: "CBAM veri kontrolü", detail: "Eksik kolon, kanıt ve doğrulama hazırlığı denetleniyor" },
      { title: "Rapor çıktısı", detail: "Grafikler, uyarılar ve paylaşılabilir JSON çıktısı hazırlanıyor" },
    ],
    totalEmission: "Toplam emisyon",
    emissionIntensity: "Ürün başına emisyon",
    parsedRows: "Okunan satır",
    dataQuality: "Veri kalitesi",
    emissionBreakdown: "Emisyon kırılımı",
    productBreakdown: "Ürün kırılımı",
    cbamReadiness: "CBAM hazırlık özeti",
    evidenceCoverage: "Kanıt kapsamı",
    verificationReadiness: "Doğrulama hazırlığı",
    buyerPackage: "Alıcı veri paketi",
    operationalData: "Operasyon verisi",
    detailedTotals: "Faaliyet toplamları",
    electricity: "Elektrik",
    naturalGas: "Doğalgaz",
    water: "Su",
    production: "Üretim",
    assumptionsTitle: "Varsayım ve uyarılar",
    factorTitle: "Kullanılan katsayılar",
    noIntensity: "Üretim tonajı yok",
    noAnalysisYet: "Henüz Excel analizi yapılmadı.",
    downloadAnalysis: "JSON çıktısını indir",
    readiness: "Genel hazırlık",
    readinessDetail: "Tüm ürün ve veri kaynaklarının ağırlıklı görünümü",
    productsTracked: "Takip edilen ürün",
    connectedSources: "Hazır veri kaynağı",
    openControls: "Açık kontrol",
    preparedFiles: "Hazır dosya",
    progressTitle: "Hazırlık yol haritası",
    progressDescription: "Fiili değerlerle çalışmaya geçiş için kontrol aşamaları",
    actionTitle: "Aksiyon merkezi",
    actionDescription: "Tamamlanması gereken öncelikli işler",
    complete: "Tamamla",
    completed: "Tamamlandı",
    owner: "Sorumlu",
    due: "Termin",
    dataHealth: "Veri sağlığı",
    dataHealthDescription: "Kaynak kapsamı ve kalite kontrolleri",
    sourceCoverage: "Kaynak kapsamı",
    productsReady: "Ürün hazırlığı",
    controlsClosed: "Kontrol kapanışı",
    recentActivity: "Son hareketler",
    recentActivityDescription: "Çalışma alanındaki son değişiklikler",
    attentionTitle: "İnceleme gerektiren alan",
    attentionDescription:
      "Birincil alüminyum girdisine ait tedarikçi verisi tamamlanmadan ilgili ürün dosyası hazır duruma geçemez.",
    attentionAction: "Veri kaynaklarına git",
    productsTitle: "Ürün portföyü",
    productsDescription:
      "CBAM kapsamında takip edilen ihraç ürünlerini, tesis ilişkilerini ve hazırlık durumunu yönetin.",
    addProduct: "Yeni ürün",
    searchProduct: "Ürün veya CN kodu ara",
    allStatuses: "Tüm durumlar",
    product: "Ürün",
    sector: "Sektör",
    facility: "Tesis ve üretim rotası",
    completeness: "Hazırlık",
    status: "Durum",
    actions: "İşlem",
    inspect: "İncele",
    noResults: "Aramanızla eşleşen ürün bulunamadı.",
    productDetail: "Ürün çalışma özeti",
    reportingPeriod: "Çalışma dönemi",
    emissionComposition: "Emisyon bileşimi",
    direct: "Doğrudan",
    indirect: "Dolaylı",
    precursor: "Öncül girdiler",
    total: "Toplam",
    methodologyNote:
      "Bu değerler demo amaçlıdır. Gerçek çalışma, tesis sınırları, faaliyet verileri, ürün dağıtım anahtarları ve doğrulanabilir kaynak belgeler üzerinden yürütülür.",
    sourcesTitle: "Veri kaynakları",
    sourcesDescription:
      "Hesaplamada kullanılan her verinin kaynağını, sahibini, güncelliğini ve kapsamını izleyin.",
    addSource: "Kaynak ekle",
    newSourceTitle: "Yeni veri kaynağı",
    sourceName: "Kaynak adı",
    sourceNamePlaceholder: "Örn. Fırın doğalgaz sayacı",
    sourceCategory: "Veri kategorisi",
    sourceSystem: "Kaynak sistemi",
    sourceOwner: "Veri sahibi",
    sourceOwnerPlaceholder: "Örn. Enerji Yönetimi",
    saveSource: "Kaynağı ekle",
    source: "Kaynak",
    system: "Sistem",
    cadence: "Sıklık",
    coverage: "Kapsam",
    lastUpdate: "Son güncelleme",
    validate: "Doğrula",
    validated: "Hazır",
    sourceSummary: "Kaynak özeti",
    automatic: "Otomatik akış",
    document: "Belge tabanlı",
    supplier: "Tedarikçi akışı",
    dossierTitle: "Emisyon dosyaları",
    dossierDescription:
      "Her ürün ve dönem için hesaplama, kontrol ve doğrulama hazırlığını tek dosyada yönetin.",
    newDossier: "Yeni dosya",
    newDossierTitle: "Yeni emisyon dosyası",
    dossierName: "Dosya adı",
    dossierNamePlaceholder: "Örn. 2026 Q2 Alüminyum Levha",
    selectProduct: "Ürün seçin",
    dossierOwner: "Dosya sorumlusu",
    dossierOwnerPlaceholder: "Örn. Sürdürülebilirlik",
    saveDossier: "Dosyayı oluştur",
    dossier: "Dosya",
    method: "Yöntem",
    progress: "İlerleme",
    updated: "Güncellendi",
    dossierFlow: "Dosya çalışma akışı",
    dossierFlowItems: [
      "Kapsam ve ürün sınıflandırması",
      "Tesis ve üretim rotası",
      "Faaliyet verileri",
      "Ürün dağıtım anahtarı",
      "Kalite kontrolü",
      "Doğrulama paketi",
    ],
    packagesTitle: "Paylaşım paketleri",
    packagesDescription:
      "Tamamlanan ürün emisyon bilgilerini alıcı bazında düzenleyin, sürümleyin ve dışa aktarın.",
    newPackage: "Yeni paket",
    newPackageTitle: "Yeni paylaşım paketi",
    buyerName: "Alıcı kuruluş",
    buyerPlaceholder: "Örn. Europe Metals GmbH",
    buyerMarket: "Hedef pazar",
    marketPlaceholder: "Örn. Almanya",
    packageProductCount: "Paketteki ürün sayısı",
    savePackage: "Paketi oluştur",
    buyer: "Alıcı",
    market: "Pazar",
    productCount: "Ürün",
    download: "Paketi indir",
    packageContents: "Standart paket içeriği",
    packageItems: [
      "Ürün ve CN kodu listesi",
      "Tesis ve üretim rotası özeti",
      "Gömülü emisyon veri tablosu",
      "Metodoloji ve veri kaynağı notları",
      "Belge ve sürüm referansları",
    ],
    newProductTitle: "Yeni ürün ekle",
    newProductDescription: "Ürünü, sınıflandırmasını ve üretim ilişkisini tanımlayın.",
    productName: "Ürün adı",
    productNamePlaceholder: "Örn. Alüminyum levha",
    cnCode: "CN kodu",
    cnPlaceholder: "Örn. 7606 12 92",
    sectorLabel: "CBAM sektörü",
    facilityLabel: "Üretim tesisi",
    routeLabel: "Üretim rotası",
    routePlaceholder: "Örn. Döküm ve sıcak hadde",
    cancel: "Vazgeç",
    saveProduct: "Ürünü ekle",
    ready: "Hazır",
    review: "İncelemede",
    missing: "Eksik veri",
    high: "Yüksek",
    medium: "Orta",
    low: "Düşük",
    regulatoryNote: "Doğrulanabilir veri çalışma alanı",
    regulatoryDetail:
      "Fiili emisyon değerleri, tesis operatörü verileri ve doğrulama hazırlığı aynı kayıt zincirinde yönetilir.",
  },
  en: {
    workspace: "STR CBAM Export",
    workspaceType: "CBAM data management",
    tenant: "Iskenderun Aluminium Facility",
    demo: "Active workspace",
    back: "Back to product page",
    logout: "Sign out",
    account: "STR User",
    period: "April - June 2026",
    modules: {
      overview: { label: "Overview", description: "Readiness, open checks, and team actions" },
      analysis: { label: "Excel analysis", description: "Carbon pre-calculation from a consumption table" },
      products: { label: "Products", description: "CN code, facility, and production route management" },
      sources: { label: "Data sources", description: "Energy, production, and supplier data flows" },
      dossiers: { label: "Emissions files", description: "Period-based product emissions work" },
      packages: { label: "Sharing packages", description: "Data packages prepared for EU buyers" },
    },
    overviewTitle: "CBAM readiness center",
    overviewDescription:
      "Monitor products, facilities, and data flows; prioritise gaps and stay ready for buyer requests.",
    commandEyebrow: "CBAM data workspace",
    commandTitle: "Turn export data into a structured, shareable record",
    commandDescription:
      "STR CBAM Export brings products, facilities, data sources, and buyer-ready files into one clear workspace.",
    commandPrimary: "Manage products",
    commandSecondary: "Upload Excel",
    liveStatus: "Workspace active",
    buyerRequestTitle: "Buyer request",
    buyerRequestDetail: "Product data package for NordForm GmbH",
    buyerRequestStatus: "Preparing for sharing",
    exportPacketTitle: "Export-team output",
    exportPacketDetail: "Product, CN code, installation, evidence, and version data stay in the same package.",
    proofChainTitle: "Evidence chain",
    proofChainDetail: "Every value is tracked with owner, source, period, and control status.",
    workflowTitle: "Simple workflow",
    workflowDescription:
      "Product scope is selected, energy and production data are connected, controls are closed, and the sharing package is versioned.",
    workflowItems: [
      { title: "Product scope", detail: "CN code, installation, and production route are clarified" },
      { title: "Data flow", detail: "Meter, invoice, ERP/MES, and supplier records are connected" },
      { title: "Control", detail: "Missing evidence and inconsistencies become team tasks" },
      { title: "Sharing", detail: "A versioned data package is prepared for the EU buyer" },
    ],
    riskPanelTitle: "Today's focus",
    riskPanelDescription: "Missing data, open checks, and prepared files stay easy to read.",
    sourceIntake: "Source intake",
    qualityGate: "Quality gate",
    buyerHandoff: "Buyer handoff",
    readyForBuyer: "In control",
    analysisTitle: "Carbon pre-analysis from Excel or dataset",
    analysisDescription:
      "Upload an Excel, CSV, or text-based PDF file with electricity, natural gas, water, and production data; the system returns total emissions, product intensity, and data-quality warnings.",
    uploadTitle: "Upload Excel or dataset",
    uploadDescription: ".xlsx, .xlsm, .csv, .txt, or text-based .pdf file. Headers and the data sheet are matched automatically.",
    chooseFile: "Choose file",
    selectedFile: "Selected file",
    analyzeFile: "Analyze",
    analyzingFile: "Analyzing",
    clearAnalysis: "Clear result",
    acceptedColumns: "Recommended columns",
    acceptedColumnsList: [
      "Product",
      "Period / date",
      "Electricity consumption (kWh)",
      "Natural gas consumption (m3)",
      "Water consumption (m3)",
      "Production volume (ton)",
      "Production weight (kg)",
      "Total emission (kgCO2e)",
    ],
    analysisResult: "Analysis output",
    scanTitle: "Scanning data file",
    scanDescription:
      "The platform reads the file, maps columns, checks activity data, and prepares the CBAM report output.",
    scanStatusReady: "Ready",
    scanStatusWorking: "Scanning",
    scanStatusQueued: "Queued",
    scanCompleteTitle: "Analysis complete",
    scanCompleteDescription: "Carbon pre-analysis and CBAM data-control report are ready.",
    scanSteps: [
      { title: "Product and CN code", detail: "Product portfolio and classification fields are checked" },
      { title: "Facility and route", detail: "Facility, period, and production route fields are mapped" },
      { title: "Activity data", detail: "Electricity, natural gas, water, and production tonnage are read" },
      { title: "Emissions calculation", detail: "Consumption data is converted into carbon emissions" },
      { title: "CBAM data control", detail: "Missing columns, evidence, and verification readiness are checked" },
      { title: "Report output", detail: "Charts, warnings, and shareable JSON output are prepared" },
    ],
    totalEmission: "Total emissions",
    emissionIntensity: "Emission per product",
    parsedRows: "Rows read",
    dataQuality: "Data quality",
    emissionBreakdown: "Emissions breakdown",
    productBreakdown: "Product breakdown",
    cbamReadiness: "CBAM readiness summary",
    evidenceCoverage: "Evidence coverage",
    verificationReadiness: "Verification readiness",
    buyerPackage: "Buyer data package",
    operationalData: "Operational data",
    detailedTotals: "Activity totals",
    electricity: "Electricity",
    naturalGas: "Natural gas",
    water: "Water",
    production: "Production",
    assumptionsTitle: "Assumptions and warnings",
    factorTitle: "Applied factors",
    noIntensity: "No production tonnage",
    noAnalysisYet: "No Excel analysis yet.",
    downloadAnalysis: "Download JSON output",
    readiness: "Overall readiness",
    readinessDetail: "Weighted view of all products and data sources",
    productsTracked: "Products tracked",
    connectedSources: "Ready data sources",
    openControls: "Open checks",
    preparedFiles: "Ready files",
    progressTitle: "Readiness roadmap",
    progressDescription: "Control stages for working with actual values",
    actionTitle: "Action center",
    actionDescription: "Priority work that needs attention",
    complete: "Complete",
    completed: "Completed",
    owner: "Owner",
    due: "Due",
    dataHealth: "Data health",
    dataHealthDescription: "Source coverage and quality controls",
    sourceCoverage: "Source coverage",
    productsReady: "Product readiness",
    controlsClosed: "Checks closed",
    recentActivity: "Recent activity",
    recentActivityDescription: "Latest workspace changes",
    attentionTitle: "Area requiring attention",
    attentionDescription:
      "The supplier data for primary aluminium must be completed before the related product file can be marked ready.",
    attentionAction: "Open data sources",
    productsTitle: "Product portfolio",
    productsDescription:
      "Manage exported products in CBAM scope, facility relationships, and readiness.",
    addProduct: "New product",
    searchProduct: "Search product or CN code",
    allStatuses: "All statuses",
    product: "Product",
    sector: "Sector",
    facility: "Facility and production route",
    completeness: "Readiness",
    status: "Status",
    actions: "Action",
    inspect: "Inspect",
    noResults: "No products match your search.",
    productDetail: "Product work summary",
    reportingPeriod: "Working period",
    emissionComposition: "Emissions composition",
    direct: "Direct",
    indirect: "Indirect",
    precursor: "Precursors",
    total: "Total",
    methodologyNote:
      "These values are for demonstration. Real work is based on installation boundaries, activity data, allocation keys, and verifiable source documents.",
    sourcesTitle: "Data sources",
    sourcesDescription:
      "Track the source, owner, currency, and coverage of every value used in the calculation.",
    addSource: "Add source",
    newSourceTitle: "New data source",
    sourceName: "Source name",
    sourceNamePlaceholder: "E.g. Furnace natural gas meter",
    sourceCategory: "Data category",
    sourceSystem: "Source system",
    sourceOwner: "Data owner",
    sourceOwnerPlaceholder: "E.g. Energy Management",
    saveSource: "Add source",
    source: "Source",
    system: "System",
    cadence: "Cadence",
    coverage: "Coverage",
    lastUpdate: "Last update",
    validate: "Validate",
    validated: "Ready",
    sourceSummary: "Source summary",
    automatic: "Automated flow",
    document: "Document based",
    supplier: "Supplier flow",
    dossierTitle: "Emissions files",
    dossierDescription:
      "Manage calculation, controls, and verification readiness for every product and period.",
    newDossier: "New file",
    newDossierTitle: "New emissions file",
    dossierName: "File name",
    dossierNamePlaceholder: "E.g. 2026 Q2 Aluminium Sheet",
    selectProduct: "Select product",
    dossierOwner: "File owner",
    dossierOwnerPlaceholder: "E.g. Sustainability",
    saveDossier: "Create file",
    dossier: "File",
    method: "Method",
    progress: "Progress",
    updated: "Updated",
    dossierFlow: "File workflow",
    dossierFlowItems: [
      "Scope and product classification",
      "Installation and production route",
      "Activity data",
      "Product allocation key",
      "Quality control",
      "Verification package",
    ],
    packagesTitle: "Sharing packages",
    packagesDescription:
      "Organise, version, and export completed product emissions information by buyer.",
    newPackage: "New package",
    newPackageTitle: "New sharing package",
    buyerName: "Buyer organisation",
    buyerPlaceholder: "E.g. Europe Metals GmbH",
    buyerMarket: "Target market",
    marketPlaceholder: "E.g. Germany",
    packageProductCount: "Products in package",
    savePackage: "Create package",
    buyer: "Buyer",
    market: "Market",
    productCount: "Products",
    download: "Download package",
    packageContents: "Standard package contents",
    packageItems: [
      "Product and CN code list",
      "Facility and production route summary",
      "Embedded emissions data table",
      "Methodology and data-source notes",
      "Document and version references",
    ],
    newProductTitle: "Add new product",
    newProductDescription: "Define the product, classification, and production relationship.",
    productName: "Product name",
    productNamePlaceholder: "E.g. Aluminium sheet",
    cnCode: "CN code",
    cnPlaceholder: "E.g. 7606 12 92",
    sectorLabel: "CBAM sector",
    facilityLabel: "Production facility",
    routeLabel: "Production route",
    routePlaceholder: "E.g. Casting and hot rolling",
    cancel: "Cancel",
    saveProduct: "Add product",
    ready: "Ready",
    review: "In review",
    missing: "Missing data",
    high: "High",
    medium: "Medium",
    low: "Low",
    regulatoryNote: "Verifiable data workspace",
    regulatoryDetail:
      "Actual emissions, installation operator data, and verification readiness are managed in one record chain.",
  },
} as const;

function statusStyles(status: CbamStatus) {
  if (status === "ready") {
    return "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  }
  if (status === "review") {
    return "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400";
  }
  return "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-400";
}

function statusDot(status: CbamStatus) {
  if (status === "ready") return "bg-emerald-500";
  if (status === "review") return "bg-amber-500";
  return "bg-rose-500";
}

function statusLabel(locale: CbamLocale, status: CbamStatus) {
  const text = copy[locale];
  return text[status];
}

function StatusBadge({ locale, status }: { locale: CbamLocale; status: CbamStatus }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-semibold ${statusStyles(status)}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${statusDot(status)}`} />
      {statusLabel(locale, status)}
    </span>
  );
}

function ProgressBar({ value, tone = "orange" }: { value: number; tone?: "orange" | "green" }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
      <div
        className={`h-full rounded-full ${tone === "green" ? "bg-emerald-500" : "bg-orange-500"}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function ReadinessRing({
  value,
  label,
  isDark,
}: {
  value: number;
  label: string;
  isDark: boolean;
}) {
  const safeValue = Math.max(0, Math.min(100, value));
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" role="img" aria-label={`${label}: ${safeValue}%`}>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.09)" : "rgba(24,24,27,0.10)"}
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="url(#cbamReadinessGradient)"
          strokeLinecap="round"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
        <defs>
          <linearGradient id="cbamReadinessGradient" x1="15" y1="15" x2="105" y2="105">
            <stop stopColor="#f97316" />
            <stop offset="0.56" stopColor="#10b981" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-semibold uppercase text-zinc-500">{label}</span>
        <span className="mt-1 text-4xl font-bold [letter-spacing:0]">%{safeValue}</span>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

type CbamAccount = {
  name: string;
  email: string;
  provider?: "email" | "google";
};

type CbamEntitlement = {
  plan: "free";
  limit: number;
  used: number;
  remaining: number;
  upgradeRequired: boolean;
};

export default function CbamPlatform() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const withLocale = useLocaleHref();
  const locale: CbamLocale = language === "en" ? "en" : "tr";
  const text = copy[locale];
  const isDark = theme === "dark";

  const [activeModule, setActiveModule] = useState<CbamModuleKey>("analysis");
  const [products, setProducts] = useState<CbamProduct[]>([]);
  const [sources, setSources] = useState<CbamSource[]>([]);
  const [dossiers, setDossiers] = useState<CbamDossier[]>([]);
  const [packages, setPackages] = useState<CbamPackage[]>([]);
  const [tasks, setTasks] = useState<CbamTask[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CbamProduct | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [createModal, setCreateModal] = useState<"source" | "dossier" | "package" | null>(null);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CbamExcelAnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");
  const [scanState, setScanState] = useState<"idle" | "scanning" | "complete">("idle");
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [account, setAccount] = useState<CbamAccount | null>(null);
  const [entitlement, setEntitlement] = useState<CbamEntitlement | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | CbamStatus>("all");
  const [productForm, setProductForm] = useState({
    name: "",
    cnCode: "",
    sector: "Alüminyum",
    facility: "İskenderun Alüminyum Tesisi",
    route: "",
  });
  const [sourceForm, setSourceForm] = useState({
    name: "",
    category: "Elektrik",
    system: "Sayaç / API",
    owner: "",
  });
  const [dossierForm, setDossierForm] = useState({
    name: "",
    product: "",
    owner: "",
  });
  const [packageForm, setPackageForm] = useState({
    buyer: "",
    market: "",
    products: "1",
  });

  const palette = {
    page: isDark ? "bg-black text-white" : "bg-[#f4f5f6] text-zinc-900",
    sidebar: isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white",
    surface: isDark ? "border-white/10 bg-zinc-950" : "border-black/10 bg-white",
    soft: isDark ? "border-white/10 bg-white/[0.035]" : "border-black/10 bg-zinc-50",
    border: isDark ? "border-white/10" : "border-black/10",
    heading: isDark ? "text-white" : "text-zinc-900",
    muted: isDark ? "text-zinc-400" : "text-zinc-600",
    subtle: isDark ? "text-zinc-500" : "text-zinc-500",
    hover: isDark ? "hover:bg-white/5" : "hover:bg-black/[0.035]",
  };

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US").includes(query) ||
        product.cnCode.includes(query);
      return matchesSearch && (statusFilter === "all" || product.status === statusFilter);
    });
  }, [locale, products, search, statusFilter]);

  const readySources = sources.filter((source) => source.status === "ready").length;
  const openTasks = tasks.filter((task) => !task.completed).length;
  const closedTasks = tasks.length ? Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100) : 0;
  const productReadiness = products.length
    ? Math.round(products.reduce((total, product) => total + product.completeness, 0) / products.length)
    : 0;
  const sourceCoverage = sources.length
    ? Math.round(sources.reduce((total, source) => total + source.coverage, 0) / sources.length)
    : 0;
  const overallReadiness = Math.round(productReadiness * 0.55 + sourceCoverage * 0.3 + closedTasks * 0.15);
  const workspaceLoaded = Boolean(analysisResult);
  const billingLocked = Boolean(entitlement && entitlement.remaining <= 0);
  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const preciseFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale === "tr" ? "tr-TR" : "en-US", {
        maximumFractionDigits: 4,
      }),
    [locale],
  );

  function formatNumber(value: number | null | undefined, precise = false) {
    if (typeof value !== "number" || !Number.isFinite(value)) return "-";
    return precise ? preciseFormatter.format(value) : numberFormatter.format(value);
  }

  function accountInitials() {
    const source = account?.name || account?.email || text.account;
    return source
      .split(/[.\s@_-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US"))
      .join("") || "ST";
  }

  useEffect(() => {
    let active = true;

    async function loadAccount() {
      const response = await fetch("/api/cbam/session", {
        cache: "no-store",
        credentials: "same-origin",
      }).catch(() => null);
      const payload = await response?.json().catch(() => null);
      if (!active || !response?.ok) return;
      setAccount(payload.user ?? null);
      setEntitlement(payload.entitlement ?? null);
    }

    void loadAccount();
    return () => {
      active = false;
    };
  }, []);

  function clampPercent(value: number) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  function roundWorkspaceValue(value: number, digits = 3) {
    const multiplier = 10 ** digits;
    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
  }

  function statusFromScore(score: number): CbamStatus {
    if (score >= 90) return "ready";
    if (score >= 62) return "review";
    return "missing";
  }

  function detected(result: CbamExcelAnalysisResult, field: string) {
    return Boolean(result.detectedColumns[field]);
  }

  function perTon(emission: number, productionTon: number) {
    if (productionTon > 0) return roundWorkspaceValue(emission / productionTon, 4);
    return roundWorkspaceValue(emission, 4);
  }

  function workspaceNowLabel() {
    return locale === "tr" ? "Şimdi" : "Now";
  }

  function workspacePeriod(result: CbamExcelAnalysisResult, fallback?: string) {
    if (fallback) return fallback;
    if (result.periods.length === 1) return result.periods[0];
    if (result.periods.length > 1) return locale === "tr" ? `${result.periods.length} dönem` : `${result.periods.length} periods`;
    return text.period;
  }

  function workspaceFacility(result: CbamExcelAnalysisResult, fallback?: string) {
    if (fallback) return fallback;
    if (result.facilities.length === 1) return result.facilities[0];
    if (result.facilities.length > 1) return locale === "tr" ? `${result.facilities.length} tesis` : `${result.facilities.length} facilities`;
    return text.tenant;
  }

  function inferSector(productName: string) {
    const normalized = productName.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    if (normalized.includes("alü") || normalized.includes("alu") || normalized.includes("alum")) {
      return locale === "tr" ? "Alüminyum" : "Aluminium";
    }
    if (normalized.includes("çelik") || normalized.includes("celik") || normalized.includes("steel") || normalized.includes("demir")) {
      return locale === "tr" ? "Demir ve Çelik" : "Iron and steel";
    }
    if (normalized.includes("çimento") || normalized.includes("cimento") || normalized.includes("cement")) {
      return locale === "tr" ? "Çimento" : "Cement";
    }
    if (normalized.includes("gübre") || normalized.includes("gubre") || normalized.includes("fertilizer")) {
      return locale === "tr" ? "Gübre" : "Fertilizer";
    }
    return locale === "tr" ? "CBAM kapsamı" : "CBAM scope";
  }

  function inferRoute(productName: string) {
    const normalized = productName.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    if (normalized.includes("profil") || normalized.includes("profile")) {
      return locale === "tr" ? "Ekstrüzyon / şekillendirme rotası" : "Extrusion / forming route";
    }
    if (normalized.includes("levha") || normalized.includes("sheet") || normalized.includes("plate")) {
      return locale === "tr" ? "Haddeleme / şekillendirme rotası" : "Rolling / forming route";
    }
    if (normalized.includes("boru") || normalized.includes("pipe") || normalized.includes("tube")) {
      return locale === "tr" ? "Boru şekillendirme rotası" : "Tube forming route";
    }
    return locale === "tr" ? "Excel veri setinden oluşturulan üretim rotası" : "Production route created from Excel data";
  }

  function cnCodeFor(product: CbamExcelAnalysisResult["products"][number]) {
    if (product.cnCode) return product.cnCode;
    const normalized = product.product.toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
    if (normalized.includes("profil") && (normalized.includes("alü") || normalized.includes("alu") || normalized.includes("alum"))) {
      return "7604 29 90";
    }
    if (normalized.includes("alü") || normalized.includes("alu") || normalized.includes("alum")) return "7601 20 80";
    if (normalized.includes("boru") || normalized.includes("pipe") || normalized.includes("tube")) return "7306 30 80";
    if (normalized.includes("çelik") || normalized.includes("celik") || normalized.includes("steel")) return "7208";
    return locale === "tr" ? "Eşleştirme gerekli" : "Mapping required";
  }

  function sourceFromAnalysis(
    result: CbamExcelAnalysisResult,
    index: number,
    field: string,
    name: string,
    category: string,
    system: string,
    owner: string,
  ): CbamSource {
    const isDetected = detected(result, field);
    return {
      id: `SRC-XLS-${String(index).padStart(3, "0")}`,
      name,
      category,
      system,
      owner,
      cadence: detected(result, "period") ? (locale === "tr" ? "Dönemsel" : "Periodic") : locale === "tr" ? "Dosya bazlı" : "File based",
      status: isDetected ? statusFromScore(result.qualityScore) : "missing",
      coverage: isDetected ? clampPercent(result.qualityScore) : 0,
      lastUpdate: workspaceNowLabel(),
    };
  }

  function applyAnalysisToWorkspace(result: CbamExcelAnalysisResult) {
    const now = workspaceNowLabel();
    const owner = locale === "tr" ? "STR CBAM Export" : "STR CBAM Export";
    const nextProducts = result.products.map((item, index): CbamProduct => {
      const completenessPenalty = item.intensityTco2ePerTon === null ? 12 : 0;
      const cnPenalty = item.cnCode ? 0 : 6;
      const completeness = clampPercent(result.qualityScore - completenessPenalty - cnPenalty);

      return {
        id: `PRD-XLS-${String(index + 1).padStart(3, "0")}`,
        name: item.product,
        cnCode: cnCodeFor(item),
        sector: inferSector(item.product),
        facility: workspaceFacility(result, item.facility),
        route: inferRoute(item.product),
        period: workspacePeriod(result, item.period),
        status: statusFromScore(completeness),
        completeness,
        owner,
        emissions: {
          direct: perTon(item.naturalGasTco2e, item.productionTon),
          indirect: perTon(item.electricityTco2e, item.productionTon),
          precursor: perTon(item.waterTco2e, item.productionTon),
        },
      };
    });

    const nextSources: CbamSource[] = [
      {
        id: "SRC-XLS-000",
        name: result.fileName,
        category: locale === "tr" ? "Yüklenen Excel dosyası" : "Uploaded Excel file",
        system: `${result.sheetName} / Excel`,
        owner,
        cadence: locale === "tr" ? "Dosya bazlı" : "File based",
        status: result.rowsParsed > 0 ? "ready" : "missing",
        coverage: result.rowsParsed > 0 ? 100 : 0,
        lastUpdate: now,
      },
      sourceFromAnalysis(
        result,
        1,
        "product",
        locale === "tr" ? "Ürün adları" : "Product names",
        locale === "tr" ? "Ürün" : "Product",
        "Excel",
        locale === "tr" ? "İhracat / Üretim" : "Export / Production",
      ),
      sourceFromAnalysis(
        result,
        2,
        "cnCode",
        locale === "tr" ? "CN / GTIP kodları" : "CN / HS codes",
        locale === "tr" ? "Sınıflandırma" : "Classification",
        "Excel",
        locale === "tr" ? "İhracat Operasyonları" : "Export Operations",
      ),
      sourceFromAnalysis(
        result,
        3,
        "electricityKwh",
        locale === "tr" ? "Elektrik tüketimi" : "Electricity consumption",
        text.electricity,
        locale === "tr" ? "Excel / fatura" : "Excel / invoice",
        locale === "tr" ? "Enerji Yönetimi" : "Energy Management",
      ),
      sourceFromAnalysis(
        result,
        4,
        "naturalGasM3",
        locale === "tr" ? "Doğalgaz tüketimi" : "Natural gas consumption",
        text.naturalGas,
        locale === "tr" ? "Excel / sayaç" : "Excel / meter",
        locale === "tr" ? "Enerji Yönetimi" : "Energy Management",
      ),
      sourceFromAnalysis(
        result,
        5,
        "waterM3",
        locale === "tr" ? "Su tüketimi" : "Water consumption",
        text.water,
        locale === "tr" ? "Excel / sayaç" : "Excel / meter",
        locale === "tr" ? "Enerji Yönetimi" : "Energy Management",
      ),
      sourceFromAnalysis(
        result,
        6,
        "productionTon",
        locale === "tr" ? "Üretim tonajı" : "Production tonnage",
        text.production,
        locale === "tr" ? "Excel / üretim kaydı" : "Excel / production record",
        locale === "tr" ? "Üretim Planlama" : "Production Planning",
      ),
    ];

    const nextDossiers = nextProducts.map((product, index): CbamDossier => ({
      id: `DOS-XLS-${String(index + 1).padStart(3, "0")}`,
      name: locale === "tr" ? `${product.name} emisyon dosyası` : `${product.name} emission dossier`,
      product: product.name,
      period: product.period,
      method: locale === "tr" ? "Excel faaliyet verisi" : "Excel activity data",
      owner,
      status: product.status,
      progress: product.completeness,
      updated: now,
    }));

    const nextPackages: CbamPackage[] = [
      {
        id: "PKG-XLS-001",
        buyer: locale === "tr" ? "AB alıcı veri paketi" : "EU buyer data package",
        market: locale === "tr" ? "Avrupa Birliği" : "European Union",
        period: workspacePeriod(result),
        products: nextProducts.length,
        owner: locale === "tr" ? "İhracat Operasyonları" : "Export Operations",
        status: statusFromScore(result.qualityScore),
        updated: now,
      },
    ];

    const nextTasks: CbamTask[] = [];
    if (!detected(result, "cnCode")) {
      nextTasks.push({
        id: "TSK-XLS-CN",
        title: locale === "tr" ? "CN / GTIP kodlarını ürünlerle eşleştir" : "Map CN / HS codes to products",
        context: result.fileName,
        owner: locale === "tr" ? "İhracat Operasyonları" : "Export Operations",
        due: locale === "tr" ? "Bu hafta" : "This week",
        priority: "high",
        completed: false,
      });
    }
    result.missingColumns.forEach((column, index) => {
      nextTasks.push({
        id: `TSK-XLS-MISS-${String(index + 1).padStart(2, "0")}`,
        title: locale === "tr" ? `${column} kolonunu dosyaya ekle` : `Add ${column} column to the file`,
        context: result.fileName,
        owner: locale === "tr" ? "Veri Sahibi" : "Data Owner",
        due: locale === "tr" ? "Bu hafta" : "This week",
        priority: index < 2 ? "high" : "medium",
        completed: false,
      });
    });
    result.warnings
      .filter((warning) => !warning.includes("ön analiz") && !warning.includes("preliminary"))
      .slice(0, 3)
      .forEach((warning, index) => {
        nextTasks.push({
          id: `TSK-XLS-WRN-${String(index + 1).padStart(2, "0")}`,
          title: warning,
          context: workspaceFacility(result),
          owner: locale === "tr" ? "Sürdürülebilirlik" : "Sustainability",
          due: locale === "tr" ? "Kontrol bekliyor" : "Review pending",
          priority: "medium",
          completed: false,
        });
      });
    if (nextTasks.length === 0) {
      nextTasks.push({
        id: "TSK-XLS-READY",
        title: locale === "tr" ? "Excel veri seti CBAM çalışma alanına aktarıldı" : "Excel data set imported into the CBAM workspace",
        context: result.fileName,
        owner,
        due: now,
        priority: "low",
        completed: true,
      });
    }

    setProducts(nextProducts);
    setSources(nextSources);
    setDossiers(nextDossiers);
    setPackages(nextPackages);
    setTasks(nextTasks);
    setSelectedProduct(null);
    setSearch("");
    setStatusFilter("all");
    setDossierForm((current) => ({ ...current, product: nextProducts[0]?.name ?? "" }));
    setPackageForm((current) => ({ ...current, products: String(Math.max(1, nextProducts.length)) }));
  }

  function resetWorkspace() {
    setProducts([]);
    setSources([]);
    setDossiers([]);
    setPackages([]);
    setTasks([]);
    setSelectedProduct(null);
    setSearch("");
    setStatusFilter("all");
    setDossierForm((current) => ({ ...current, product: "" }));
    setPackageForm((current) => ({ ...current, products: "1" }));
  }

  function validateSource(id: string) {
    setSources((current) =>
      current.map((source) =>
        source.id === id
          ? { ...source, status: "ready", coverage: 100, lastUpdate: locale === "tr" ? "Şimdi" : "Now" }
          : source,
      ),
    );
  }

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextProduct: CbamProduct = {
      id: `PRD-${String(products.length + 1).padStart(3, "0")}`,
      name: productForm.name.trim(),
      cnCode: productForm.cnCode.trim(),
      sector: productForm.sector,
      facility: productForm.facility,
      route: productForm.route.trim(),
      period: text.period,
      status: "missing",
      completeness: 20,
      owner: locale === "tr" ? "Atanmadı" : "Unassigned",
      emissions: { direct: 0, indirect: 0, precursor: 0 },
    };
    setProducts((current) => [nextProduct, ...current]);
    setProductForm({
      name: "",
      cnCode: "",
      sector: "Alüminyum",
      facility: "İskenderun Alüminyum Tesisi",
      route: "",
    });
    setProductModalOpen(false);
    setSelectedProduct(nextProduct);
  }

  function addSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextSource: CbamSource = {
      id: `SRC-${String(sources.length + 1).padStart(3, "0")}`,
      name: sourceForm.name.trim(),
      category: sourceForm.category,
      system: sourceForm.system,
      owner: sourceForm.owner.trim(),
      cadence: locale === "tr" ? "Dönemsel" : "Periodic",
      status: "missing",
      coverage: 0,
      lastUpdate: locale === "tr" ? "Henüz veri yok" : "No data yet",
    };
    setSources((current) => [nextSource, ...current]);
    setSourceForm({ name: "", category: "Elektrik", system: "Sayaç / API", owner: "" });
    setCreateModal(null);
  }

  function addDossier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextDossier: CbamDossier = {
      id: `DOS-2026-${String(dossiers.length + 14).padStart(3, "0")}`,
      name: dossierForm.name.trim(),
      product: dossierForm.product,
      period: text.period,
      method: locale === "tr" ? "Fiili değerler" : "Actual values",
      owner: dossierForm.owner.trim(),
      status: "missing",
      progress: 10,
      updated: locale === "tr" ? "Şimdi" : "Now",
    };
    setDossiers((current) => [nextDossier, ...current]);
    setDossierForm({ name: "", product: products[0]?.name ?? "", owner: "" });
    setCreateModal(null);
  }

  function addPackage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextPackage: CbamPackage = {
      id: `PKG-2026-${String(packages.length + 8).padStart(3, "0")}`,
      buyer: packageForm.buyer.trim(),
      market: packageForm.market.trim(),
      period: text.period,
      products: Math.max(1, Math.min(products.length, Number(packageForm.products) || 1)),
      owner: locale === "tr" ? "İhracat Operasyonları" : "Export Operations",
      status: "review",
      updated: locale === "tr" ? "Şimdi" : "Now",
    };
    setPackages((current) => [nextPackage, ...current]);
    setPackageForm({ buyer: "", market: "", products: "1" });
    setCreateModal(null);
  }

  function downloadPackage(item: CbamPackage) {
    const payload = {
      packageId: item.id,
      buyer: item.buyer,
      market: item.market,
      period: item.period,
      products: products.slice(0, item.products).map((product) => ({
        name: product.name,
        cnCode: product.cnCode,
        facility: product.facility,
        route: product.route,
        status: product.status,
      })),
      generatedAt: new Date().toISOString(),
      notice: "Export package generated by STR CBAM Export.",
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${item.id.toLowerCase()}-${item.buyer.toLowerCase().replaceAll(" ", "-")}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch("/api/cbam/session", {
      method: "DELETE",
      credentials: "same-origin",
    }).catch(() => null);
    setAccount(null);
    setEntitlement(null);
    window.location.assign(withLocale("/platform/cbam"));
  }

  function isSupportedExcelFile(file: File) {
    return /\.(xlsx|xlsm|csv|txt|pdf)$/i.test(file.name);
  }

  function acceptExcelFile(file: File | null) {
    setDragActive(false);
    setAnalysisResult(null);
    setScanState("idle");
    setScanStepIndex(0);

    if (!file) {
      setExcelFile(null);
      setAnalysisError("");
      return;
    }

    if (!isSupportedExcelFile(file)) {
      setExcelFile(null);
      setAnalysisError(
        locale === "tr"
          ? "Sadece .xlsx, .xlsm, .csv, .txt veya metin tabanlı .pdf dosyası yükleyin."
          : "Upload only .xlsx, .xlsm, .csv, .txt, or text-based .pdf files.",
      );
      return;
    }

    setExcelFile(file);
    setAnalysisError("");
  }

  function selectExcelFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    acceptExcelFile(file);
  }

  function handleExcelDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!analysisLoading) setDragActive(true);
  }

  function handleExcelDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }

  function handleExcelDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (analysisLoading) return;
    acceptExcelFile(event.dataTransfer.files?.[0] ?? null);
  }

  async function submitExcelAnalysis(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!excelFile) {
      setAnalysisError(locale === "tr" ? "Analiz için dosya seçin." : "Choose a file to analyze.");
      return;
    }
    if (billingLocked) {
      setAnalysisError(
        locale === "tr"
          ? "Ücretsiz 3 analiz hakkınız doldu. Yeni analiz için ücretli plana geçin."
          : "Your 3 free analyses are used. Upgrade to a paid plan for another analysis.",
      );
      return;
    }

    setAnalysisLoading(true);
    setAnalysisError("");
    setAnalysisResult(null);
    setScanState("scanning");
    setScanStepIndex(0);

    const body = new FormData();
    body.append("file", excelFile);

    const responsePromise = fetch("/api/cbam/excel-analysis", {
      method: "POST",
      body,
    }).catch(() => null);

    for (let index = 0; index < text.scanSteps.length - 1; index += 1) {
      setScanStepIndex(index);
      await wait(index === 0 ? 650 : 820);
    }

    const response = await responsePromise;
    const payload = await response?.json().catch(() => null);
    if (!response?.ok || !payload?.result) {
      if (payload?.entitlement) setEntitlement(payload.entitlement as CbamEntitlement);
      setAnalysisError(payload?.error ?? (locale === "tr" ? "Excel analizi tamamlanamadı." : "Excel analysis could not be completed."));
      setAnalysisLoading(false);
      setScanState("idle");
      return;
    }

    setScanStepIndex(text.scanSteps.length - 1);
    await wait(760);
    const nextResult = payload.result as CbamExcelAnalysisResult;
    setAnalysisResult(nextResult);
    if (payload.entitlement) setEntitlement(payload.entitlement as CbamEntitlement);
    applyAnalysisToWorkspace(nextResult);
    setScanState("complete");
    setAnalysisLoading(false);
  }

  function clearExcelAnalysis() {
    setExcelFile(null);
    setAnalysisResult(null);
    setAnalysisError("");
    setAnalysisLoading(false);
    setScanState("idle");
    setScanStepIndex(0);
    setDragActive(false);
    resetWorkspace();
  }

  function downloadAnalysisResult() {
    if (!analysisResult) return;
    const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${analysisResult.fileName.replace(/\.[^.]+$/, "")}-cbam-analysis.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function renderWorkspaceEmptyState({
    title,
    description,
    className = "mt-6",
  }: {
    title: string;
    description: string;
    className?: string;
  }) {
    return (
      <section className={`${className} border ${palette.surface}`}>
        <div className="grid min-h-[360px] place-items-center px-5 py-14 text-center">
          <div className="max-w-xl">
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-md border ${palette.soft}`}>
              <FileSpreadsheet className="h-7 w-7 text-orange-500" />
            </div>
            <h2 className={`mt-5 text-2xl font-bold ${palette.heading}`}>{title}</h2>
            <p className={`mt-3 text-sm leading-relaxed md:text-base ${palette.muted}`}>{description}</p>
            <button
              type="button"
              onClick={() => setActiveModule("analysis")}
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-orange-500 px-5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Upload className="h-4 w-4" />
              {locale === "tr" ? "Excel veri seti yükle" : "Upload Excel data set"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  function renderOverview() {
    const readyPackages = packages.filter((item) => item.status === "ready").length;
    const workflowIcons = [Package, Database, ShieldCheck, FileOutput];
    const controlSignals = [
      {
        label: text.sourceIntake,
        value: `${readySources}/${sources.length}`,
        detail: text.connectedSources,
        icon: Database,
        tone: "text-sky-500",
      },
      {
        label: text.qualityGate,
        value: `%${closedTasks}`,
        detail: text.controlsClosed,
        icon: BadgeCheck,
        tone: "text-emerald-500",
      },
      {
        label: text.buyerHandoff,
        value: readyPackages,
        detail: text.preparedFiles,
        icon: FileStack,
        tone: "text-orange-500",
      },
    ];

    if (!workspaceLoaded) {
      return renderWorkspaceEmptyState({
        title: locale === "tr" ? "CBAM çalışma alanı veri seti bekliyor" : "CBAM workspace is waiting for a data set",
        description:
          locale === "tr"
            ? "Genel bakış, ürünler, veri kaynakları, emisyon dosyaları ve paylaşım paketleri Excel analizi tamamlandıktan sonra dosyanızdaki gerçek kolonlara göre oluşturulur."
            : "Overview, products, data sources, emission dossiers, and sharing packages are created from your Excel columns after the analysis is complete.",
        className: "mt-0",
      });
    }

    return (
      <>
        <section className={`overflow-hidden border ${palette.surface}`}>
          <div className="grid lg:grid-cols-[minmax(0,1.08fr)_420px]">
            <div className="px-5 py-7 sm:px-7 sm:py-8 xl:px-10 xl:py-10">
              <div className="inline-flex items-center gap-2 rounded-md border border-orange-500/20 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-600 dark:text-orange-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {text.commandEyebrow}
              </div>
              <h1 className={`mt-5 max-w-4xl text-3xl font-bold leading-tight [letter-spacing:0] md:text-5xl ${palette.heading}`}>
                {text.commandTitle}
              </h1>
              <p className={`mt-4 max-w-3xl text-base leading-relaxed md:text-lg ${palette.muted}`}>
                {text.commandDescription}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setActiveModule("products")}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-orange-500 px-5 text-sm font-semibold text-black hover:bg-orange-400"
                >
                  {text.commandPrimary}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModule("analysis")}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-5 text-sm font-semibold ${palette.soft}`}
                >
                  <FileSpreadsheet className="h-4 w-4 text-orange-500" />
                  {text.commandSecondary}
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {controlSignals.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      item.label === text.sourceIntake
                        ? setActiveModule("analysis")
                        : item.label === text.buyerHandoff
                          ? setActiveModule("packages")
                          : setActiveModule("dossiers")
                    }
                    className={`group flex items-center gap-4 border p-4 text-left transition-colors ${palette.soft}`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-black/10 bg-white text-zinc-900 shadow-sm dark:border-white/10 dark:bg-black dark:text-white">
                      <item.icon className={`h-5 w-5 ${item.tone}`} />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-medium ${palette.muted}`}>{item.label}</div>
                      <div className={`mt-1 text-2xl font-bold [letter-spacing:0] ${palette.heading}`}>{item.value}</div>
                      <div className={`mt-0.5 truncate text-xs ${palette.subtle}`}>{item.detail}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <aside className={`border-t p-5 sm:p-7 lg:border-l lg:border-t-0 ${palette.border} ${isDark ? "bg-white/[0.025]" : "bg-zinc-50"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={`text-xs font-semibold uppercase ${palette.subtle}`}>{text.liveStatus}</div>
                  <div className={`mt-2 text-lg font-bold [letter-spacing:0] ${palette.heading}`}>{text.readiness}</div>
                  <p className={`mt-2 text-sm leading-relaxed ${palette.muted}`}>{text.readinessDetail}</p>
                </div>
                <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {text.readyForBuyer}
                </div>
              </div>

              <div className="mt-7 flex items-center justify-center">
                <ReadinessRing value={overallReadiness} label={text.readiness} isDark={isDark} />
              </div>

              <div className={`mt-7 border-t pt-5 ${palette.border}`}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-orange-500">
                    <FileOutput className="h-5 w-5" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${palette.heading}`}>{text.buyerRequestTitle}</div>
                    <p className={`mt-1 text-sm leading-relaxed ${palette.muted}`}>{text.buyerRequestDetail}</p>
                    <div className="mt-3 inline-flex rounded-md border border-orange-500/25 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                      {text.buyerRequestStatus}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.04fr)_minmax(360px,0.96fr)]">
          <div className={`border ${palette.surface}`}>
            <div className={`flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-start sm:justify-between ${palette.border}`}>
              <div>
                <h2 className={`text-xl font-bold [letter-spacing:0] ${palette.heading}`}>{text.workflowTitle}</h2>
                <p className={`mt-2 max-w-3xl text-sm leading-relaxed ${palette.muted}`}>{text.workflowDescription}</p>
              </div>
              <ShieldCheck className="h-5 w-5 shrink-0 text-orange-500" />
            </div>
            <div className="grid gap-px bg-black/10 dark:bg-white/10 md:grid-cols-4">
              {text.workflowItems.map((item, index) => {
                const Icon = workflowIcons[index] ?? Package;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() =>
                      setActiveModule((["products", "analysis", "dossiers", "packages"] as CbamModuleKey[])[index])
                    }
                    className={`group min-h-[184px] bg-white p-5 text-left transition-colors hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-white/[0.045]`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md border border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-white/[0.035]">
                        <Icon className={`h-5 w-5 ${index === 0 ? "text-sky-500" : index === 1 ? "text-orange-500" : index === 2 ? "text-emerald-500" : "text-violet-500"}`} />
                      </div>
                      <span className={`font-mono text-xs ${palette.subtle}`}>0{index + 1}</span>
                    </div>
                    <h3 className={`mt-5 text-base font-bold [letter-spacing:0] ${palette.heading}`}>{item.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${palette.muted}`}>{item.detail}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`border ${palette.surface}`}>
            <div className={`border-b px-5 py-5 ${palette.border}`}>
              <h2 className={`text-xl font-bold [letter-spacing:0] ${palette.heading}`}>{text.riskPanelTitle}</h2>
              <p className={`mt-2 text-sm leading-relaxed ${palette.muted}`}>{text.riskPanelDescription}</p>
            </div>
            <div className="grid divide-y divide-black/10 dark:divide-white/10">
              {[
                { label: text.productsTracked, value: products.length, icon: Factory, module: "products" as CbamModuleKey },
                { label: text.openControls, value: openTasks, icon: CircleAlert, module: "dossiers" as CbamModuleKey },
                { label: text.preparedFiles, value: readyPackages, icon: FileCheck2, module: "packages" as CbamModuleKey },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveModule(item.module)}
                  className={`flex items-center justify-between gap-4 px-5 py-4 text-left ${palette.hover}`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border ${palette.soft}`}>
                      <item.icon className="h-4 w-4 text-orange-500" />
                    </span>
                    <span className={`text-sm font-semibold ${palette.heading}`}>{item.label}</span>
                  </span>
                  <span className={`text-2xl font-bold [letter-spacing:0] ${palette.heading}`}>{item.value}</span>
                </button>
              ))}
            </div>
            <div className={`border-t p-5 ${palette.border}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <div className={`text-sm font-semibold ${palette.heading}`}>{text.attentionTitle}</div>
                  <p className={`mt-1 text-sm leading-relaxed ${palette.muted}`}>{text.attentionDescription}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModule("sources")}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-orange-500/30 px-4 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-500/10 dark:text-orange-400"
              >
                {text.attentionAction}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

      </>
    );
  }

  function renderAnalysis() {
    const scanProgress =
      scanState === "complete"
        ? 100
        : scanState === "scanning"
          ? Math.round(((scanStepIndex + 0.35) / text.scanSteps.length) * 100)
          : 0;
    const scanIcons = [Package, Database, FileSpreadsheet, Calculator, ShieldCheck, FileOutput];
    const readinessItems = analysisResult
      ? [
          {
            label: text.operationalData,
            value: analysisResult.qualityScore,
            detail: `${analysisResult.rowsParsed} ${text.parsedRows.toLocaleLowerCase("tr-TR")}`,
          },
          {
            label: text.evidenceCoverage,
            value: Math.max(0, Math.min(100, analysisResult.qualityScore - analysisResult.missingColumns.length * 6)),
            detail: analysisResult.missingColumns.length === 0 ? text.ready : text.review,
          },
          {
            label: text.verificationReadiness,
            value: Math.max(0, Math.min(100, analysisResult.qualityScore - Math.max(0, analysisResult.warnings.length - 1) * 4)),
            detail: analysisResult.warnings.length <= 1 ? text.ready : text.review,
          },
          {
            label: text.buyerPackage,
            value: Math.max(0, Math.min(100, Math.round((analysisResult.qualityScore + (analysisResult.products.length > 0 ? 92 : 60)) / 2))),
            detail: text.downloadAnalysis,
          },
        ]
      : [];
    const resultCard = isDark
      ? "rounded-md border border-white/10 bg-white/[0.04]"
      : "rounded-md border border-zinc-200 bg-white shadow-sm";
    const resultSoftCard = isDark
      ? "rounded-md border border-white/10 bg-zinc-900/70"
      : "rounded-md border border-zinc-200 bg-zinc-50/80";
    const resultHeader = isDark ? "border-white/10 bg-white/[0.025]" : "border-zinc-200 bg-zinc-50/70";

    return (
      <>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className={`text-2xl font-bold md:text-3xl ${palette.heading}`}>{text.analysisTitle}</h1>
            <p className={`mt-2 max-w-3xl text-sm leading-relaxed md:text-base ${palette.muted}`}>
              {text.analysisDescription}
            </p>
          </div>
          {analysisResult && (
            <button
              type="button"
              onClick={downloadAnalysisResult}
              className={`inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold ${palette.soft}`}
            >
              <Download className="h-4 w-4 text-orange-500" />
              {text.downloadAnalysis}
            </button>
          )}
        </div>

        <section className="mt-6 grid gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
          <div className={`border ${palette.surface}`}>
            <form onSubmit={submitExcelAnalysis} className="p-5">
              <div className="flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md border ${palette.soft}`}>
                  <FileSpreadsheet className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h2 className={`font-semibold ${palette.heading}`}>{text.uploadTitle}</h2>
                  <p className={`mt-1 text-sm leading-relaxed ${palette.muted}`}>{text.uploadDescription}</p>
                </div>
              </div>

              <div className={`mt-5 rounded-md border px-4 py-3 ${billingLocked ? "border-orange-500/30 bg-orange-500/10" : palette.soft}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className={`text-xs font-semibold uppercase ${palette.subtle}`}>
                      {locale === "tr" ? "Ücretsiz analiz hakkı" : "Free analysis credits"}
                    </div>
                    <div className={`mt-1 text-sm font-semibold ${palette.heading}`}>
                      {entitlement
                        ? locale === "tr"
                          ? `${entitlement.remaining}/${entitlement.limit} hak kaldı`
                          : `${entitlement.remaining}/${entitlement.limit} credits left`
                        : locale === "tr"
                          ? "Hak bilgisi yükleniyor"
                          : "Loading credits"}
                    </div>
                  </div>
                  <a
                    href="mailto:sales@str-energy.com?subject=STR%20CBAM%20Export%20%C3%BCcretli%20plan"
                    className="shrink-0 rounded-md border border-orange-500/30 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-500/10 dark:text-orange-400"
                  >
                    {locale === "tr" ? "Planı yükselt" : "Upgrade"}
                  </a>
                </div>
                {billingLocked && (
                  <p className="mt-2 text-xs leading-relaxed text-orange-700 dark:text-orange-300">
                    {locale === "tr"
                      ? "Ücretsiz kullanım tamamlandı. Yeni analiz için ücretli plana geçmeniz gerekiyor."
                      : "Free usage is complete. A paid plan is required for another analysis."}
                  </p>
                )}
              </div>

              <label
                htmlFor="cbam-excel-upload"
                data-testid="cbam-excel-dropzone"
                onDragEnter={handleExcelDragOver}
                onDragOver={handleExcelDragOver}
                onDragLeave={handleExcelDragLeave}
                onDrop={handleExcelDrop}
                className={`mt-5 flex cursor-pointer flex-col items-center justify-center border border-dashed px-5 py-8 text-center transition-colors ${
                  dragActive ? "border-orange-500 bg-orange-500/10 ring-2 ring-orange-500/20" : palette.soft
                }`}
              >
                <Upload className="h-7 w-7 text-orange-500" />
                <span className={`mt-3 text-sm font-semibold ${palette.heading}`}>
                  {dragActive ? (locale === "tr" ? "Dosyayı buraya bırak" : "Drop the file here") : text.chooseFile}
                </span>
                <span className={`mt-1 text-xs ${palette.muted}`}>.xlsx / .xlsm / .csv / .txt / .pdf</span>
              </label>
              <input
                id="cbam-excel-upload"
                type="file"
                accept=".xlsx,.xlsm,.csv,.txt,.pdf"
                onChange={selectExcelFile}
                className="sr-only"
              />

              {excelFile && (
                <div className={`mt-4 border px-4 py-3 text-sm ${palette.soft}`}>
                  <div className={`text-xs font-semibold uppercase ${palette.subtle}`}>{text.selectedFile}</div>
                  <div className={`mt-1 truncate font-medium ${palette.heading}`}>{excelFile.name}</div>
                  <div className={`mt-1 text-xs ${palette.muted}`}>{formatNumber(excelFile.size / 1024)} KB</div>
                </div>
              )}

              {analysisError && (
                <div role="alert" className="mt-4 border-l-2 border-rose-500 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-400">
                  {analysisError}
                </div>
              )}

              <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                <button
                  type="submit"
                  disabled={!excelFile || analysisLoading || billingLocked}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-orange-500 px-4 text-sm font-semibold text-black hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Calculator className="h-4 w-4" />
                  {analysisLoading ? text.analyzingFile : text.analyzeFile}
                </button>
                <button
                  type="button"
                  onClick={clearExcelAnalysis}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold ${palette.soft}`}
                >
                  <X className="h-4 w-4 text-orange-500" />
                  {text.clearAnalysis}
                </button>
              </div>
            </form>

            <div className={`border-t px-5 py-5 ${palette.border}`}>
              <h3 className={`text-sm font-semibold ${palette.heading}`}>{text.acceptedColumns}</h3>
              <div className="mt-3 grid gap-2">
                {text.acceptedColumnsList.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className={palette.muted}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`overflow-hidden rounded-md border ${palette.surface}`}>
            <div className={`border-b px-5 py-5 ${resultHeader}`}>
              <h2 className={`text-xl font-bold ${palette.heading}`}>{text.analysisResult}</h2>
              <p className={`mt-1 text-sm ${palette.muted}`}>
                {analysisResult ? `${analysisResult.fileName} · ${analysisResult.sheetName}` : text.noAnalysisYet}
              </p>
            </div>

            {scanState === "scanning" ? (
              <div className="p-5">
                <div className="overflow-hidden border border-white/10 bg-[#101010] text-white">
                  <div className="relative px-5 py-5">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:36px_36px]" />
                    <div className="relative">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-500">
                            STR CBAM Export
                          </div>
                          <h3 className="mt-3 text-2xl font-bold">{text.scanTitle}</h3>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{text.scanDescription}</p>
                        </div>
                        <div className="rounded-md border border-orange-500/25 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-400">
                          %{Math.min(99, scanProgress)}
                        </div>
                      </div>

                      <div className="mt-5">
                        <ProgressBar value={scanProgress} />
                      </div>

                      <div className="mt-6 space-y-3">
                        {text.scanSteps.map((step, index) => {
                          const Icon = scanIcons[index] ?? FileCheck2;
                          const ready = index < scanStepIndex;
                          const working = index === scanStepIndex;
                          const status = ready ? text.scanStatusReady : working ? text.scanStatusWorking : text.scanStatusQueued;

                          return (
                            <div key={step.title} className="grid gap-3 border border-white/10 bg-black/35 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_96px] sm:items-center">
                              <div className="flex min-w-0 items-center gap-4">
                                <div
                                  className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${
                                    ready
                                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                      : working
                                        ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                                        : "border-white/10 bg-white/5 text-zinc-500"
                                  }`}
                                >
                                  {working && <span className="absolute inset-0 animate-ping rounded-md bg-orange-500/10" />}
                                  <Icon className="relative h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold">{step.title}</div>
                                  <div className="mt-1 text-sm text-zinc-500">{step.detail}</div>
                                </div>
                              </div>
                              <div
                                className={`text-left text-xs font-semibold sm:text-right ${
                                  ready ? "text-emerald-400" : working ? "text-orange-400" : "text-zinc-500"
                                }`}
                              >
                                {status}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : !analysisResult ? (
              <div className="grid min-h-[420px] place-items-center px-5 py-12 text-center">
                <div>
                  <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-md border ${palette.soft}`}>
                    <FileSpreadsheet className="h-7 w-7 text-orange-500" />
                  </div>
                  <p className={`mt-4 max-w-md text-sm leading-relaxed ${palette.muted}`}>
                    {text.uploadDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5 p-5 md:p-6">
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: text.totalEmission, value: `${formatNumber(analysisResult.totals.totalTco2e)} tCO2e` },
                    {
                      label: text.emissionIntensity,
                      value:
                        analysisResult.totals.intensityTco2ePerTon === null
                          ? text.noIntensity
                          : `${formatNumber(analysisResult.totals.intensityTco2ePerTon, true)} tCO2e/t`,
                    },
                    { label: text.parsedRows, value: String(analysisResult.rowsParsed) },
                    { label: text.dataQuality, value: `%${analysisResult.qualityScore}` },
                  ].map((metric) => (
                    <div key={metric.label} className={`${resultCard} p-4`}>
                      <div className={`text-sm font-medium ${palette.muted}`}>{metric.label}</div>
                      <div className={`mt-2 text-2xl font-bold leading-tight ${palette.heading}`}>{metric.value}</div>
                    </div>
                  ))}
                </section>

                <section className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
                  <div className={resultCard}>
                    <div className={`border-b px-4 py-4 ${resultHeader}`}>
                      <h3 className={`font-semibold ${palette.heading}`}>{text.cbamReadiness}</h3>
                    </div>
                    <div className="grid gap-3 p-4 md:grid-cols-4">
                      {readinessItems.map((item) => (
                        <div key={item.label} className={`${resultSoftCard} p-4`}>
                          <div className={`text-sm font-medium ${palette.muted}`}>{item.label}</div>
                          <div className={`mt-3 text-2xl font-bold leading-tight ${palette.heading}`}>%{item.value}</div>
                          <div className="mt-3">
                            <ProgressBar value={item.value} tone={item.value >= 85 ? "green" : "orange"} />
                          </div>
                          <div className={`mt-2 text-xs ${palette.muted}`}>{item.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={resultCard}>
                    <div className={`border-b px-4 py-4 ${resultHeader}`}>
                      <h3 className={`font-semibold ${palette.heading}`}>{text.detailedTotals}</h3>
                    </div>
                    <div className="divide-y divide-zinc-200/80 dark:divide-white/10">
                      {[
                        { label: text.electricity, value: `${formatNumber(analysisResult.totals.electricityKwh)} kWh` },
                        { label: text.naturalGas, value: `${formatNumber(analysisResult.totals.naturalGasM3)} m3` },
                        { label: text.water, value: `${formatNumber(analysisResult.totals.waterM3)} m3` },
                        { label: text.production, value: `${formatNumber(analysisResult.totals.productionTon)} ton` },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm">
                          <span className={palette.muted}>{item.label}</span>
                          <strong className={palette.heading}>{item.value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="grid gap-5 2xl:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)]">
                  <div className={resultCard}>
                    <div className={`border-b px-4 py-4 ${resultHeader}`}>
                      <h3 className={`font-semibold ${palette.heading}`}>{text.emissionBreakdown}</h3>
                    </div>
                    <div className="space-y-2 p-4">
                      {analysisResult.breakdown.map((item) => (
                        <div key={item.key} className={`${resultSoftCard} p-4`}>
                          <div className="flex items-center justify-between gap-4 text-sm">
                            <span className={`font-medium ${palette.heading}`}>{item.label}</span>
                            <span className={palette.muted}>
                              {formatNumber(item.emissionTco2e)} tCO2e · %{formatNumber(item.share)}
                            </span>
                          </div>
                          <div className="mt-2">
                            <ProgressBar value={item.share} tone={item.key === "electricity" ? "orange" : "green"} />
                          </div>
                          <div className={`mt-1 text-xs ${palette.subtle}`}>
                            {formatNumber(item.activity)} {item.activityUnit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`overflow-hidden ${resultCard}`}>
                    <div className={`border-b px-4 py-4 ${resultHeader}`}>
                      <h3 className={`font-semibold ${palette.heading}`}>{text.productBreakdown}</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[620px] text-left text-sm">
                        <thead className={isDark ? "bg-white/[0.025]" : "bg-zinc-50/80"}>
                          <tr className={`border-b text-xs uppercase ${palette.border} ${palette.subtle}`}>
                            <th className="px-4 py-3 font-semibold">{text.product}</th>
                            <th className="px-4 py-3 font-semibold">{text.parsedRows}</th>
                            <th className="px-4 py-3 font-semibold">{text.totalEmission}</th>
                            <th className="px-4 py-3 font-semibold">{text.emissionIntensity}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200/80 dark:divide-white/10">
                          {analysisResult.products.map((product) => (
                            <tr key={product.product}>
                              <td className={`px-4 py-4 font-medium ${palette.heading}`}>{product.product}</td>
                              <td className={`px-4 py-4 ${palette.muted}`}>{product.rows}</td>
                              <td className={`px-4 py-4 ${palette.muted}`}>{formatNumber(product.totalTco2e)} tCO2e</td>
                              <td className={`px-4 py-4 ${palette.muted}`}>
                                {product.intensityTco2ePerTon === null
                                  ? text.noIntensity
                                  : `${formatNumber(product.intensityTco2ePerTon, true)} tCO2e/t`}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                <section className="grid gap-5 xl:grid-cols-2">
                  <div className={resultCard}>
                    <div className={`border-b px-4 py-4 ${resultHeader}`}>
                      <h3 className={`font-semibold ${palette.heading}`}>{text.assumptionsTitle}</h3>
                    </div>
                    <div className="space-y-2 p-4">
                      {[...analysisResult.warnings, ...analysisResult.assumptions].map((item) => (
                        <div key={item} className={`${resultSoftCard} flex items-start gap-3 p-3 text-sm`}>
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                          <span className={palette.muted}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={resultCard}>
                    <div className={`border-b px-4 py-4 ${resultHeader}`}>
                      <h3 className={`font-semibold ${palette.heading}`}>{text.factorTitle}</h3>
                    </div>
                    <div className="divide-y divide-zinc-200/80 dark:divide-white/10">
                      {analysisResult.factors.map((factor) => (
                        <div key={factor.key} className="px-4 py-4 text-sm">
                          <div className="flex items-center justify-between gap-3">
                            <span className={`font-medium ${palette.heading}`}>{factor.label}</span>
                            <span className={`rounded-md border px-2 py-1 font-mono text-xs ${palette.soft}`}>
                              {factor.factor} {factor.factorUnit}
                            </span>
                          </div>
                          <p className={`mt-1 text-xs leading-relaxed ${palette.subtle}`}>{factor.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }

  function renderProducts() {
    return (
      <>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className={`text-2xl font-bold md:text-3xl ${palette.heading}`}>{text.productsTitle}</h1>
            <p className={`mt-2 max-w-3xl text-sm leading-relaxed md:text-base ${palette.muted}`}>
              {text.productsDescription}
            </p>
          </div>
          {workspaceLoaded ? (
            <button
              type="button"
              onClick={() => setProductModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Plus className="h-4 w-4" />
              {text.addProduct}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveModule("analysis")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Upload className="h-4 w-4" />
              {locale === "tr" ? "Excel yükle" : "Upload Excel"}
            </button>
          )}
        </div>

        {!workspaceLoaded ? (
          renderWorkspaceEmptyState({
            title: locale === "tr" ? "Ürün portföyü Excel’den oluşturulacak" : "Product portfolio will be created from Excel",
            description:
              locale === "tr"
                ? "Ürün adı, CN/GTIP kodu, tesis, dönem ve üretim verileri yüklediğiniz dosyadan okunur; tablo analizden sonra otomatik oluşur."
                : "Product name, CN/HS code, facility, period, and production data are read from your file; the table is generated after analysis.",
          })
        ) : (
        <div className={`mt-6 border ${palette.surface}`}>
          <div className={`flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between ${palette.border}`}>
            <label className={`flex h-10 flex-1 items-center gap-2 rounded-md border px-3 md:max-w-md ${palette.soft}`}>
              <Search className={`h-4 w-4 ${palette.subtle}`} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={text.searchProduct}
                className={`min-w-0 flex-1 bg-transparent text-sm outline-none ${palette.heading}`}
              />
            </label>
            <label className={`relative flex h-10 items-center gap-2 rounded-md border px-3 ${palette.soft}`}>
              <SlidersHorizontal className={`h-4 w-4 ${palette.subtle}`} />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | CbamStatus)}
                className={`appearance-none bg-transparent pr-6 text-sm outline-none ${palette.heading}`}
              >
                <option value="all">{text.allStatuses}</option>
                <option value="ready">{text.ready}</option>
                <option value="review">{text.review}</option>
                <option value="missing">{text.missing}</option>
              </select>
              <ChevronDown className={`pointer-events-none absolute right-3 h-4 w-4 ${palette.subtle}`} />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className={isDark ? "bg-white/[0.025]" : "bg-zinc-50"}>
                <tr className={`border-b text-xs uppercase tracking-[0.08em] ${palette.border} ${palette.subtle}`}>
                  <th className="px-5 py-3 font-semibold">{text.product}</th>
                  <th className="px-4 py-3 font-semibold">{text.sector}</th>
                  <th className="px-4 py-3 font-semibold">{text.facility}</th>
                  <th className="px-4 py-3 font-semibold">{text.completeness}</th>
                  <th className="px-4 py-3 font-semibold">{text.status}</th>
                  <th className="px-5 py-3 text-right font-semibold">{text.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className={palette.hover}>
                    <td className="px-5 py-4">
                      <div className={`text-sm font-semibold ${palette.heading}`}>{product.name}</div>
                      <div className={`mt-1 font-mono text-xs ${palette.muted}`}>CN {product.cnCode}</div>
                    </td>
                    <td className={`px-4 py-4 text-sm ${palette.muted}`}>{product.sector}</td>
                    <td className="px-4 py-4">
                      <div className={`text-sm ${palette.heading}`}>{product.facility}</div>
                      <div className={`mt-1 text-xs ${palette.muted}`}>{product.route}</div>
                    </td>
                    <td className="w-40 px-4 py-4">
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className={palette.muted}>{product.completeness}%</span>
                      </div>
                      <div className="mt-2">
                        <ProgressBar value={product.completeness} tone={product.completeness === 100 ? "green" : "orange"} />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge locale={locale} status={product.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold ${palette.hover} ${palette.heading}`}
                      >
                        {text.inspect}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className={`px-5 py-16 text-center text-sm ${palette.muted}`}>{text.noResults}</div>
          )}
        </div>
        )}
      </>
    );
  }

  function renderSources() {
    const automaticCount = sources.filter((source) => ["MES", "ERP", "Sayaç / API"].includes(source.system)).length;
    const documentCount = sources.filter((source) => source.system.includes("Belge") || source.system.includes("Fatura")).length;
    const supplierCount = sources.filter((source) => source.system.includes("Tedarikçi")).length;

    return (
      <>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className={`text-2xl font-bold md:text-3xl ${palette.heading}`}>{text.sourcesTitle}</h1>
            <p className={`mt-2 max-w-3xl text-sm leading-relaxed md:text-base ${palette.muted}`}>
              {text.sourcesDescription}
            </p>
          </div>
          {workspaceLoaded ? (
            <button
              type="button"
              onClick={() => setCreateModal("source")}
              className={`inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold ${palette.soft}`}
            >
              <Plus className="h-4 w-4 text-orange-500" />
              {text.addSource}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveModule("analysis")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Upload className="h-4 w-4" />
              {locale === "tr" ? "Excel yükle" : "Upload Excel"}
            </button>
          )}
        </div>

        {!workspaceLoaded ? (
          renderWorkspaceEmptyState({
            title: locale === "tr" ? "Veri kaynakları Excel kolonlarından kurulacak" : "Data sources will be built from Excel columns",
            description:
              locale === "tr"
                ? "Elektrik, doğalgaz, su, üretim tonajı, tesis ve ürün sınıflandırma kaynakları analiz edilen dosyaya göre otomatik listelenir."
                : "Electricity, natural gas, water, production tonnage, facility, and product classification sources are listed automatically from the analyzed file.",
          })
        ) : (
        <>
        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: text.automatic, value: automaticCount, icon: Zap },
            { label: text.document, value: documentCount, icon: Upload },
            { label: text.supplier, value: supplierCount, icon: Users },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-4 border p-4 ${palette.surface}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-md border ${palette.soft}`}>
                <item.icon className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <div className={`text-sm ${palette.muted}`}>{item.label}</div>
                <div className={`mt-1 text-xl font-bold ${palette.heading}`}>{item.value}</div>
              </div>
            </div>
          ))}
        </section>

        <div className={`mt-5 overflow-hidden border ${palette.surface}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead className={isDark ? "bg-white/[0.025]" : "bg-zinc-50"}>
                <tr className={`border-b text-xs uppercase tracking-[0.08em] ${palette.border} ${palette.subtle}`}>
                  <th className="px-5 py-3 font-semibold">{text.source}</th>
                  <th className="px-4 py-3 font-semibold">{text.system}</th>
                  <th className="px-4 py-3 font-semibold">{text.owner}</th>
                  <th className="px-4 py-3 font-semibold">{text.cadence}</th>
                  <th className="px-4 py-3 font-semibold">{text.coverage}</th>
                  <th className="px-4 py-3 font-semibold">{text.status}</th>
                  <th className="px-5 py-3 text-right font-semibold">{text.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {sources.map((source) => (
                  <tr key={source.id} className={palette.hover}>
                    <td className="px-5 py-4">
                      <div className={`text-sm font-semibold ${palette.heading}`}>{source.name}</div>
                      <div className={`mt-1 text-xs ${palette.muted}`}>
                        {source.category} · {source.lastUpdate}
                      </div>
                    </td>
                    <td className={`px-4 py-4 text-sm ${palette.muted}`}>{source.system}</td>
                    <td className={`px-4 py-4 text-sm ${palette.muted}`}>{source.owner}</td>
                    <td className={`px-4 py-4 text-sm ${palette.muted}`}>{source.cadence}</td>
                    <td className="w-36 px-4 py-4">
                      <div className={`mb-2 text-xs ${palette.muted}`}>%{source.coverage}</div>
                      <ProgressBar value={source.coverage} tone={source.coverage === 100 ? "green" : "orange"} />
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge locale={locale} status={source.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      {source.status === "ready" ? (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          {text.validated}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => validateSource(source.id)}
                          className="rounded-md border border-orange-500/30 px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-500/10 dark:text-orange-400"
                        >
                          {text.validate}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}
      </>
    );
  }

  function renderDossiers() {
    return (
      <>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className={`text-2xl font-bold md:text-3xl ${palette.heading}`}>{text.dossierTitle}</h1>
            <p className={`mt-2 max-w-3xl text-sm leading-relaxed md:text-base ${palette.muted}`}>
              {text.dossierDescription}
            </p>
          </div>
          {workspaceLoaded ? (
            <button
              type="button"
              onClick={() => setCreateModal("dossier")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Plus className="h-4 w-4" />
              {text.newDossier}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveModule("analysis")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Upload className="h-4 w-4" />
              {locale === "tr" ? "Excel yükle" : "Upload Excel"}
            </button>
          )}
        </div>

        {!workspaceLoaded ? (
          renderWorkspaceEmptyState({
            title: locale === "tr" ? "Emisyon dosyaları analizden sonra oluşacak" : "Emission dossiers will be created after analysis",
            description:
              locale === "tr"
                ? "Platform Excel’deki ürünleri okur, her ürün için dönemsel emisyon dosyası ve hazırlık durumunu otomatik oluşturur."
                : "The platform reads products in Excel and automatically creates a period emission dossier and readiness state for each product.",
          })
        ) : (
        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className={`overflow-hidden border ${palette.surface}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left">
                <thead className={isDark ? "bg-white/[0.025]" : "bg-zinc-50"}>
                  <tr className={`border-b text-xs uppercase tracking-[0.08em] ${palette.border} ${palette.subtle}`}>
                    <th className="px-5 py-3 font-semibold">{text.dossier}</th>
                    <th className="px-4 py-3 font-semibold">{text.method}</th>
                    <th className="px-4 py-3 font-semibold">{text.owner}</th>
                    <th className="px-4 py-3 font-semibold">{text.progress}</th>
                    <th className="px-5 py-3 font-semibold">{text.status}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10 dark:divide-white/10">
                  {dossiers.map((dossier: CbamDossier) => (
                    <tr key={dossier.id} className={palette.hover}>
                      <td className="px-5 py-4">
                        <div className={`text-sm font-semibold ${palette.heading}`}>{dossier.name}</div>
                        <div className={`mt-1 text-xs ${palette.muted}`}>
                          {dossier.id} · {dossier.period}
                        </div>
                      </td>
                      <td className={`px-4 py-4 text-sm ${palette.muted}`}>{dossier.method}</td>
                      <td className={`px-4 py-4 text-sm ${palette.muted}`}>{dossier.owner}</td>
                      <td className="w-40 px-4 py-4">
                        <div className={`mb-2 text-xs ${palette.muted}`}>%{dossier.progress}</div>
                        <ProgressBar value={dossier.progress} tone={dossier.progress === 100 ? "green" : "orange"} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge locale={locale} status={dossier.status} />
                        <div className={`mt-2 text-xs ${palette.subtle}`}>{dossier.updated}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className={`border ${palette.surface}`}>
            <div className={`border-b px-5 py-4 ${palette.border}`}>
              <h2 className={`font-semibold ${palette.heading}`}>{text.dossierFlow}</h2>
            </div>
            <div className="divide-y divide-black/10 dark:divide-white/10">
              {text.dossierFlowItems.map((item, index) => (
                <div key={item} className="flex items-center gap-3 px-5 py-4">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      index < 2
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {index < 2 ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className={`text-sm font-medium ${palette.heading}`}>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
        )}
      </>
    );
  }

  function renderPackages() {
    return (
      <>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className={`text-2xl font-bold md:text-3xl ${palette.heading}`}>{text.packagesTitle}</h1>
            <p className={`mt-2 max-w-3xl text-sm leading-relaxed md:text-base ${palette.muted}`}>
              {text.packagesDescription}
            </p>
          </div>
          {workspaceLoaded ? (
            <button
              type="button"
              onClick={() => setCreateModal("package")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Plus className="h-4 w-4" />
              {text.newPackage}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveModule("analysis")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
            >
              <Upload className="h-4 w-4" />
              {locale === "tr" ? "Excel yükle" : "Upload Excel"}
            </button>
          )}
        </div>

        {!workspaceLoaded ? (
          renderWorkspaceEmptyState({
            title: locale === "tr" ? "Paylaşım paketi Excel sonucundan hazırlanacak" : "Sharing package will be prepared from Excel results",
            description:
              locale === "tr"
                ? "Ürün sayısı, dönem, kaynak kapsamı ve alıcıya aktarılacak veri paketi analiz çıktılarına göre oluşur."
                : "Product count, period, source coverage, and buyer-ready data package are generated from analysis outputs.",
          })
        ) : (
        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className={`overflow-hidden border ${palette.surface}`}>
            <div className="divide-y divide-black/10 dark:divide-white/10">
              {packages.map((item: CbamPackage) => (
                <div key={item.id} className={`grid gap-4 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_130px_130px_160px] lg:items-center ${palette.hover}`}>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className={`font-semibold ${palette.heading}`}>{item.buyer}</h3>
                      <StatusBadge locale={locale} status={item.status} />
                    </div>
                    <div className={`mt-2 text-sm ${palette.muted}`}>
                      {item.id} · {item.market} · {item.period}
                    </div>
                    <div className={`mt-1 text-xs ${palette.subtle}`}>
                      {text.owner}: {item.owner} · {item.updated}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs ${palette.subtle}`}>{text.productCount}</div>
                    <div className={`mt-1 font-semibold ${palette.heading}`}>{item.products}</div>
                  </div>
                  <div>
                    <div className={`text-xs ${palette.subtle}`}>{text.market}</div>
                    <div className={`mt-1 font-semibold ${palette.heading}`}>{item.market}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadPackage(item)}
                    className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm font-semibold ${palette.soft}`}
                  >
                    <Download className="h-4 w-4 text-orange-500" />
                    {text.download}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <aside className={`border ${palette.surface}`}>
            <div className={`border-b px-5 py-4 ${palette.border}`}>
              <h2 className={`font-semibold ${palette.heading}`}>{text.packageContents}</h2>
            </div>
            <div className="px-5 py-3">
              {text.packageItems.map((item) => (
                <div key={item} className="flex items-start gap-3 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className={`text-sm leading-relaxed ${palette.muted}`}>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
        )}
      </>
    );
  }

  const moduleContent = {
    overview: renderOverview,
    analysis: renderAnalysis,
    products: renderProducts,
    sources: renderSources,
    dossiers: renderDossiers,
    packages: renderPackages,
  } satisfies Record<CbamModuleKey, () => React.ReactNode>;

  return (
    <div className={`cbam-platform min-h-screen ${palette.page}`}>
      <div className="grid min-h-screen lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className={`hidden border-r lg:flex lg:flex-col ${palette.sidebar}`}>
          <div className={`border-b px-5 py-5 ${palette.border}`}>
            <div className="flex items-center gap-3">
              <Image src="/str-logo0.png" alt="STR Energy" width={36} height={36} className="h-8 w-auto" />
              <div className="min-w-0">
                <div className={`truncate text-sm font-semibold ${palette.heading}`}>{text.workspace}</div>
                <div className={`mt-0.5 truncate text-xs ${palette.muted}`}>{text.workspaceType}</div>
              </div>
            </div>
          </div>

          <div className={`border-b px-5 py-4 ${palette.border}`}>
            <div className={`text-xs ${palette.subtle}`}>{text.tenant}</div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className={`text-xs font-semibold ${palette.heading}`}>
                {entitlement
                  ? locale === "tr"
                    ? `${entitlement.remaining}/${entitlement.limit} analiz hakkı`
                    : `${entitlement.remaining}/${entitlement.limit} analysis credits`
                  : text.demo}
              </span>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4">
            {(Object.keys(text.modules) as CbamModuleKey[]).map((key) => {
              const Icon = moduleIcons[key];
              const active = activeModule === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveModule(key)}
                  className={`mb-1 flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition-colors ${
                    active ? "bg-orange-500/10" : palette.hover
                  }`}
                >
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-orange-500" : palette.subtle}`} />
                  <span className="min-w-0">
                    <span className={`block text-sm font-semibold ${active ? "text-orange-500" : palette.heading}`}>
                      {text.modules[key].label}
                    </span>
                    <span className={`mt-1 block text-xs leading-relaxed ${palette.muted}`}>
                      {text.modules[key].description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className={`border-t p-4 ${palette.border}`}>
            <div className={`mb-3 rounded-md border p-3 ${palette.soft}`}>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <div>
                  <div className={`text-xs font-semibold ${palette.heading}`}>{text.regulatoryNote}</div>
                  <p className={`mt-1 text-[11px] leading-relaxed ${palette.muted}`}>{text.regulatoryDetail}</p>
                </div>
              </div>
            </div>
            <Link
              href={withLocale("/products/cbam")}
              className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium ${palette.muted} ${palette.hover}`}
            >
              <ArrowLeft className="h-4 w-4" />
              {text.back}
            </Link>
          </div>
        </aside>

        <div className="min-w-0">
          <header className={`sticky top-0 z-30 border-b backdrop-blur-xl ${palette.sidebar}`}>
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <Image src="/str-logo0.png" alt="STR Energy" width={30} height={30} className="h-7 w-auto lg:hidden" />
                <div className="min-w-0">
                  <div className={`truncate text-sm font-semibold ${palette.heading}`}>
                    {text.modules[activeModule].label}
                  </div>
                  <div className={`hidden truncate text-xs sm:block ${palette.muted}`}>{text.tenant}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className={`hidden items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium sm:flex ${palette.soft}`}>
                  <CalendarDays className="h-4 w-4 text-orange-500" />
                  {text.period}
                  <ChevronDown className={`h-3.5 w-3.5 ${palette.subtle}`} />
                </div>
                <div className={`hidden items-center gap-2 border-l pl-3 xl:flex ${palette.border}`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-xs font-bold text-orange-500">
                    {accountInitials()}
                  </div>
                  <div className="leading-tight">
                    <div className={`text-xs font-semibold ${palette.heading}`}>{account?.name ?? text.account}</div>
                    <div className={`mt-0.5 max-w-44 truncate text-[11px] ${palette.subtle}`}>{account?.email ?? ""}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  title={text.logout}
                  aria-label={text.logout}
                  className={`flex h-9 w-9 items-center justify-center rounded-md ${palette.muted} ${palette.hover}`}
                >
                  <LogOut className="h-4 w-4" />
                </button>
                <Link
                  href={withLocale("/products/cbam")}
                  className={`flex h-9 items-center gap-2 rounded-md px-3 text-xs font-medium lg:hidden ${palette.muted} ${palette.hover}`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{text.back}</span>
                </Link>
              </div>
            </div>

            <div className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden">
              {(Object.keys(text.modules) as CbamModuleKey[]).map((key) => {
                const Icon = moduleIcons[key];
                const active = activeModule === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveModule(key)}
                    className={`flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold ${
                      active ? "border-orange-500 bg-orange-500 text-black" : palette.soft
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {text.modules[key].label}
                  </button>
                );
              })}
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-[1500px]">
              {moduleContent[activeModule]()}
            </div>
          </main>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={text.cancel}
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 bg-black/45"
          />
          <aside className={`absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto border-l shadow-2xl ${palette.sidebar}`}>
            <div className={`sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-5 py-5 ${palette.sidebar} ${palette.border}`}>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">{text.productDetail}</div>
                <h2 className={`mt-2 text-xl font-bold ${palette.heading}`}>{selectedProduct.name}</h2>
                <div className={`mt-1 font-mono text-xs ${palette.muted}`}>CN {selectedProduct.cnCode}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label={text.cancel}
                className={`flex h-9 w-9 items-center justify-center rounded-md ${palette.hover}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge locale={locale} status={selectedProduct.status} />
                <span className={`text-sm ${palette.muted}`}>%{selectedProduct.completeness} {text.completeness.toLocaleLowerCase()}</span>
              </div>

              <dl className={`mt-6 divide-y border-y ${palette.border}`}>
                {[
                  [text.sector, selectedProduct.sector],
                  [text.facilityLabel, selectedProduct.facility],
                  [text.routeLabel, selectedProduct.route],
                  [text.reportingPeriod, selectedProduct.period],
                  [text.owner, selectedProduct.owner],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 py-4">
                    <dt className={`text-sm ${palette.muted}`}>{label}</dt>
                    <dd className={`text-sm font-medium ${palette.heading}`}>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7">
                <h3 className={`font-semibold ${palette.heading}`}>{text.emissionComposition}</h3>
                <div className="mt-4 divide-y divide-black/10 border-y dark:divide-white/10">
                  {[
                    [text.direct, selectedProduct.emissions.direct],
                    [text.indirect, selectedProduct.emissions.indirect],
                    [text.precursor, selectedProduct.emissions.precursor],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex items-center justify-between py-3 text-sm">
                      <span className={palette.muted}>{label}</span>
                      <strong className={palette.heading}>{Number(value).toFixed(2)} tCO2e/t</strong>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-4 text-sm">
                    <span className={`font-semibold ${palette.heading}`}>{text.total}</span>
                    <strong className="text-lg text-orange-500">
                      {(
                        selectedProduct.emissions.direct +
                        selectedProduct.emissions.indirect +
                        selectedProduct.emissions.precursor
                      ).toFixed(2)}{" "}
                      tCO2e/t
                    </strong>
                  </div>
                </div>
              </div>

              <div className={`mt-6 border-l-2 border-orange-500 px-4 py-3 ${isDark ? "bg-white/[0.035]" : "bg-zinc-50"}`}>
                <p className={`text-xs leading-relaxed ${palette.muted}`}>{text.methodologyNote}</p>
              </div>
            </div>
          </aside>
        </div>
      )}

      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label={text.cancel}
            onClick={() => setProductModalOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <div className={`relative z-10 w-full max-w-lg border shadow-2xl ${palette.sidebar}`}>
            <div className={`flex items-start justify-between gap-4 border-b px-5 py-5 ${palette.border}`}>
              <div>
                <h2 className={`text-xl font-bold ${palette.heading}`}>{text.newProductTitle}</h2>
                <p className={`mt-1 text-sm ${palette.muted}`}>{text.newProductDescription}</p>
              </div>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                aria-label={text.cancel}
                className={`flex h-9 w-9 items-center justify-center rounded-md ${palette.hover}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={addProduct} className="p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className={`text-xs font-semibold ${palette.muted}`}>{text.productName}</span>
                  <input
                    value={productForm.name}
                    onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder={text.productNamePlaceholder}
                    required
                    autoFocus
                    className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                  />
                </label>
                <label>
                  <span className={`text-xs font-semibold ${palette.muted}`}>{text.cnCode}</span>
                  <input
                    value={productForm.cnCode}
                    onChange={(event) => setProductForm((current) => ({ ...current, cnCode: event.target.value }))}
                    placeholder={text.cnPlaceholder}
                    required
                    className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                  />
                </label>
                <label>
                  <span className={`text-xs font-semibold ${palette.muted}`}>{text.sectorLabel}</span>
                  <select
                    value={productForm.sector}
                    onChange={(event) => setProductForm((current) => ({ ...current, sector: event.target.value }))}
                    className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                  >
                    <option>Alüminyum</option>
                    <option>Demir ve Çelik</option>
                    <option>Çimento</option>
                    <option>Gübre</option>
                    <option>Hidrojen</option>
                    <option>Elektrik</option>
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className={`text-xs font-semibold ${palette.muted}`}>{text.facilityLabel}</span>
                  <select
                    value={productForm.facility}
                    onChange={(event) => setProductForm((current) => ({ ...current, facility: event.target.value }))}
                    className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                  >
                    <option>İskenderun Alüminyum Tesisi</option>
                    <option>Osmaniye Çelik Tesisi</option>
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className={`text-xs font-semibold ${palette.muted}`}>{text.routeLabel}</span>
                  <input
                    value={productForm.route}
                    onChange={(event) => setProductForm((current) => ({ ...current, route: event.target.value }))}
                    placeholder={text.routePlaceholder}
                    required
                    className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                  />
                </label>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className={`rounded-md border px-4 py-2.5 text-sm font-semibold ${palette.soft}`}
                >
                  {text.cancel}
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
                >
                  {text.saveProduct}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {createModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label={text.cancel}
            onClick={() => setCreateModal(null)}
            className="absolute inset-0 bg-black/50"
          />
          <div className={`relative z-10 w-full max-w-lg border shadow-2xl ${palette.sidebar}`}>
            <div className={`flex items-start justify-between gap-4 border-b px-5 py-5 ${palette.border}`}>
              <h2 className={`text-xl font-bold ${palette.heading}`}>
                {createModal === "source"
                  ? text.newSourceTitle
                  : createModal === "dossier"
                    ? text.newDossierTitle
                    : text.newPackageTitle}
              </h2>
              <button
                type="button"
                onClick={() => setCreateModal(null)}
                aria-label={text.cancel}
                className={`flex h-9 w-9 items-center justify-center rounded-md ${palette.hover}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {createModal === "source" && (
              <form onSubmit={addSource} className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.sourceName}</span>
                    <input
                      value={sourceForm.name}
                      onChange={(event) => setSourceForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder={text.sourceNamePlaceholder}
                      required
                      autoFocus
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    />
                  </label>
                  <label>
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.sourceCategory}</span>
                    <select
                      value={sourceForm.category}
                      onChange={(event) => setSourceForm((current) => ({ ...current, category: event.target.value }))}
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    >
                      <option>Elektrik</option>
                      <option>Yakıt</option>
                      <option>Üretim</option>
                      <option>Hammadde</option>
                      <option>Öncül girdi</option>
                    </select>
                  </label>
                  <label>
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.sourceSystem}</span>
                    <select
                      value={sourceForm.system}
                      onChange={(event) => setSourceForm((current) => ({ ...current, system: event.target.value }))}
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    >
                      <option>Sayaç / API</option>
                      <option>ERP</option>
                      <option>MES</option>
                      <option>Fatura / Belge</option>
                      <option>Tedarikçi portalı</option>
                    </select>
                  </label>
                  <label className="sm:col-span-2">
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.sourceOwner}</span>
                    <input
                      value={sourceForm.owner}
                      onChange={(event) => setSourceForm((current) => ({ ...current, owner: event.target.value }))}
                      placeholder={text.sourceOwnerPlaceholder}
                      required
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateModal(null)}
                    className={`rounded-md border px-4 py-2.5 text-sm font-semibold ${palette.soft}`}
                  >
                    {text.cancel}
                  </button>
                  <button type="submit" className="rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400">
                    {text.saveSource}
                  </button>
                </div>
              </form>
            )}

            {createModal === "dossier" && (
              <form onSubmit={addDossier} className="p-5">
                <div className="grid gap-4">
                  <label>
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.dossierName}</span>
                    <input
                      value={dossierForm.name}
                      onChange={(event) => setDossierForm((current) => ({ ...current, name: event.target.value }))}
                      placeholder={text.dossierNamePlaceholder}
                      required
                      autoFocus
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    />
                  </label>
                  <label>
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.product}</span>
                    <select
                      value={dossierForm.product}
                      onChange={(event) => setDossierForm((current) => ({ ...current, product: event.target.value }))}
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    >
                      {products.map((product) => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.dossierOwner}</span>
                    <input
                      value={dossierForm.owner}
                      onChange={(event) => setDossierForm((current) => ({ ...current, owner: event.target.value }))}
                      placeholder={text.dossierOwnerPlaceholder}
                      required
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateModal(null)}
                    className={`rounded-md border px-4 py-2.5 text-sm font-semibold ${palette.soft}`}
                  >
                    {text.cancel}
                  </button>
                  <button type="submit" className="rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400">
                    {text.saveDossier}
                  </button>
                </div>
              </form>
            )}

            {createModal === "package" && (
              <form onSubmit={addPackage} className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.buyerName}</span>
                    <input
                      value={packageForm.buyer}
                      onChange={(event) => setPackageForm((current) => ({ ...current, buyer: event.target.value }))}
                      placeholder={text.buyerPlaceholder}
                      required
                      autoFocus
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    />
                  </label>
                  <label>
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.buyerMarket}</span>
                    <input
                      value={packageForm.market}
                      onChange={(event) => setPackageForm((current) => ({ ...current, market: event.target.value }))}
                      placeholder={text.marketPlaceholder}
                      required
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    />
                  </label>
                  <label>
                    <span className={`text-xs font-semibold ${palette.muted}`}>{text.packageProductCount}</span>
                    <input
                      type="number"
                      min="1"
                      max={Math.max(1, products.length)}
                      value={packageForm.products}
                      onChange={(event) => setPackageForm((current) => ({ ...current, products: event.target.value }))}
                      required
                      className={`mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-orange-500 ${palette.soft} ${palette.heading}`}
                    />
                  </label>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCreateModal(null)}
                    className={`rounded-md border px-4 py-2.5 text-sm font-semibold ${palette.soft}`}
                  >
                    {text.cancel}
                  </button>
                  <button type="submit" className="rounded-md bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-400">
                    {text.savePackage}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
