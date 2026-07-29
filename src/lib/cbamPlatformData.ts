export type CbamLocale = "tr" | "en";
export type CbamModuleKey = "overview" | "analysis" | "products" | "sources" | "dossiers" | "packages";
export type CbamStatus = "ready" | "review" | "missing";
export type CbamPriority = "high" | "medium" | "low";

export type CbamProduct = {
  id: string;
  name: string;
  cnCode: string;
  sector: string;
  facility: string;
  route: string;
  period: string;
  status: CbamStatus;
  completeness: number;
  owner: string;
  emissions: {
    direct: number;
    indirect: number;
    precursor: number;
  };
};

export type CbamSource = {
  id: string;
  name: string;
  category: string;
  system: string;
  owner: string;
  cadence: string;
  status: CbamStatus;
  coverage: number;
  lastUpdate: string;
};

export type CbamTask = {
  id: string;
  title: string;
  context: string;
  owner: string;
  due: string;
  priority: CbamPriority;
  completed: boolean;
};

export type CbamDossier = {
  id: string;
  name: string;
  product: string;
  period: string;
  method: string;
  owner: string;
  status: CbamStatus;
  progress: number;
  updated: string;
};

export type CbamPackage = {
  id: string;
  buyer: string;
  market: string;
  period: string;
  products: number;
  owner: string;
  status: CbamStatus;
  updated: string;
};

export const cbamProducts: CbamProduct[] = [
  {
    id: "PRD-001",
    name: "Alüminyum ekstrüzyon profil",
    cnCode: "7604 29 90",
    sector: "Alüminyum",
    facility: "İskenderun Alüminyum Tesisi",
    route: "Yeniden ergitme ve ekstrüzyon",
    period: "Nisan - Haziran 2026",
    status: "review",
    completeness: 86,
    owner: "Sürdürülebilirlik",
    emissions: { direct: 0.38, indirect: 0.44, precursor: 0.71 },
  },
  {
    id: "PRD-002",
    name: "Alüminyum külçe",
    cnCode: "7601 20 80",
    sector: "Alüminyum",
    facility: "İskenderun Alüminyum Tesisi",
    route: "İkincil alüminyum ergitme",
    period: "Nisan - Haziran 2026",
    status: "ready",
    completeness: 100,
    owner: "Enerji Yönetimi",
    emissions: { direct: 0.42, indirect: 0.29, precursor: 0.18 },
  },
  {
    id: "PRD-003",
    name: "Sıcak haddelenmiş çelik levha",
    cnCode: "7208 51 20",
    sector: "Demir ve Çelik",
    facility: "Osmaniye Çelik Tesisi",
    route: "Elektrik ark ocağı ve hadde",
    period: "Nisan - Haziran 2026",
    status: "missing",
    completeness: 62,
    owner: "Üretim Planlama",
    emissions: { direct: 0.31, indirect: 0.21, precursor: 0.84 },
  },
  {
    id: "PRD-004",
    name: "Kaynaklı çelik boru",
    cnCode: "7306 30 80",
    sector: "Demir ve Çelik",
    facility: "Osmaniye Çelik Tesisi",
    route: "Boru şekillendirme ve kaynak",
    period: "Nisan - Haziran 2026",
    status: "review",
    completeness: 78,
    owner: "Kalite Sistemleri",
    emissions: { direct: 0.12, indirect: 0.09, precursor: 1.01 },
  },
];

export const cbamSources: CbamSource[] = [
  {
    id: "SRC-001",
    name: "Elektrik ana sayaç toplamı",
    category: "Elektrik",
    system: "Sayaç / API",
    owner: "Enerji Yönetimi",
    cadence: "Saatlik",
    status: "ready",
    coverage: 100,
    lastUpdate: "Bugün, 09:42",
  },
  {
    id: "SRC-002",
    name: "Elektrik faturaları",
    category: "Elektrik",
    system: "ERP / Belge",
    owner: "Finans",
    cadence: "Aylık",
    status: "review",
    coverage: 97,
    lastUpdate: "24 Haz 2026",
  },
  {
    id: "SRC-003",
    name: "Doğalgaz tüketimi",
    category: "Yakıt",
    system: "Fatura / Sayaç",
    owner: "Enerji Yönetimi",
    cadence: "Günlük",
    status: "ready",
    coverage: 100,
    lastUpdate: "Bugün, 08:15",
  },
  {
    id: "SRC-004",
    name: "Üretim tonajı",
    category: "Üretim",
    system: "MES",
    owner: "Üretim Planlama",
    cadence: "Vardiya",
    status: "ready",
    coverage: 100,
    lastUpdate: "Bugün, 10:05",
  },
  {
    id: "SRC-005",
    name: "Birincil alüminyum tedarikçi verisi",
    category: "Öncül girdi",
    system: "Tedarikçi portalı",
    owner: "Satın Alma",
    cadence: "Dönemsel",
    status: "missing",
    coverage: 45,
    lastUpdate: "18 Haz 2026",
  },
  {
    id: "SRC-006",
    name: "Hurda ve alaşım girdileri",
    category: "Hammadde",
    system: "ERP",
    owner: "Depo Yönetimi",
    cadence: "Günlük",
    status: "review",
    coverage: 88,
    lastUpdate: "24 Haz 2026",
  },
  {
    id: "SRC-007",
    name: "Tesis üretim duruşları",
    category: "Üretim",
    system: "MES",
    owner: "Bakım",
    cadence: "Vardiya",
    status: "ready",
    coverage: 100,
    lastUpdate: "Bugün, 09:58",
  },
];

export const cbamTasks: CbamTask[] = [
  {
    id: "TSK-001",
    title: "Elektrik faturası ve sayaç farkını incele",
    context: "İskenderun Alüminyum Tesisi",
    owner: "Enerji Yönetimi",
    due: "27 Haz",
    priority: "high",
    completed: false,
  },
  {
    id: "TSK-002",
    title: "Birincil alüminyum tedarikçi verisini tamamla",
    context: "Alüminyum ekstrüzyon profil",
    owner: "Satın Alma",
    due: "30 Haz",
    priority: "high",
    completed: false,
  },
  {
    id: "TSK-003",
    title: "Ürün dağıtım anahtarını onayla",
    context: "Osmaniye Çelik Tesisi",
    owner: "Üretim Planlama",
    due: "2 Tem",
    priority: "medium",
    completed: false,
  },
  {
    id: "TSK-004",
    title: "Doğrulama kapsamı toplantısını planla",
    context: "2026 ikinci çeyrek dosyaları",
    owner: "Sürdürülebilirlik",
    due: "4 Tem",
    priority: "low",
    completed: false,
  },
];

export const cbamDossiers: CbamDossier[] = [
  {
    id: "DOS-2026-014",
    name: "2026 Q2 Alüminyum Profil",
    product: "Alüminyum ekstrüzyon profil",
    period: "Nisan - Haziran 2026",
    method: "Fiili değerler",
    owner: "Sürdürülebilirlik",
    status: "review",
    progress: 86,
    updated: "Bugün, 10:18",
  },
  {
    id: "DOS-2026-015",
    name: "2026 Q2 Alüminyum Külçe",
    product: "Alüminyum külçe",
    period: "Nisan - Haziran 2026",
    method: "Fiili değerler",
    owner: "Enerji Yönetimi",
    status: "ready",
    progress: 100,
    updated: "24 Haz 2026",
  },
  {
    id: "DOS-2026-016",
    name: "2026 Q2 Çelik Levha",
    product: "Sıcak haddelenmiş çelik levha",
    period: "Nisan - Haziran 2026",
    method: "Fiili değerler",
    owner: "Üretim Planlama",
    status: "missing",
    progress: 62,
    updated: "23 Haz 2026",
  },
  {
    id: "DOS-2026-017",
    name: "2026 Q2 Çelik Boru",
    product: "Kaynaklı çelik boru",
    period: "Nisan - Haziran 2026",
    method: "Fiili değerler",
    owner: "Kalite Sistemleri",
    status: "review",
    progress: 78,
    updated: "24 Haz 2026",
  },
];

export const cbamPackages: CbamPackage[] = [
  {
    id: "PKG-2026-008",
    buyer: "NordForm GmbH",
    market: "Almanya",
    period: "Nisan - Haziran 2026",
    products: 2,
    owner: "İhracat Operasyonları",
    status: "ready",
    updated: "Bugün, 09:12",
  },
  {
    id: "PKG-2026-009",
    buyer: "Benelux Metals BV",
    market: "Hollanda",
    period: "Nisan - Haziran 2026",
    products: 3,
    owner: "İhracat Operasyonları",
    status: "review",
    updated: "24 Haz 2026",
  },
  {
    id: "PKG-2026-010",
    buyer: "Alpina Systems SRL",
    market: "İtalya",
    period: "Nisan - Haziran 2026",
    products: 1,
    owner: "Satış",
    status: "missing",
    updated: "22 Haz 2026",
  },
];

export const readinessStages = [
  { label: "Kapsam ve ürün sınıflandırması", value: 100 },
  { label: "Tesis ve üretim rotası", value: 92 },
  { label: "Faaliyet verileri", value: 81 },
  { label: "Ürün dağıtım anahtarları", value: 68 },
  { label: "Kalite kontrolleri", value: 56 },
  { label: "Doğrulama paketi", value: 34 },
];

export const cbamActivity = [
  {
    id: "ACT-001",
    title: "Elektrik sayaç verisi güncellendi",
    detail: "İskenderun Alüminyum Tesisi",
    time: "18 dk önce",
  },
  {
    id: "ACT-002",
    title: "Alüminyum külçe dosyası hazırlandı",
    detail: "DOS-2026-015",
    time: "2 sa önce",
  },
  {
    id: "ACT-003",
    title: "Tedarikçi veri talebi gönderildi",
    detail: "Birincil alüminyum girdisi",
    time: "Dün",
  },
  {
    id: "ACT-004",
    title: "Yeni alıcı paketi oluşturuldu",
    detail: "Benelux Metals BV",
    time: "Dün",
  },
];
