// Web Development prices — same values as the Digital Services price list (/digital-services).

export type WebProject = { id: string; name: string; price: number; billing: string; detail: string; items: string[] };

export const WEB_PROJECTS: WebProject[] = [
  {
    id: "company",
    name: "Company Website",
    price: 1_500_000,
    billing: "sekali buat",
    detail: "Kesan pertama yang kuat untuk usaha, komunitas, atau instansi.",
    items: ["Profil usaha", "Portofolio", "Form kontak"],
  },
  {
    id: "link-bio",
    name: "Link Bio",
    price: 49_000,
    billing: "per bulan",
    detail: "Satu halaman untuk semua tautan bisnis dari Instagram, TikTok, atau WhatsApp.",
    items: ["Satu tautan untuk semua kanal", "Profil dan katalog singkat", "Statistik kunjungan"],
  },
  {
    id: "ticketing",
    name: "Event Ticketing",
    price: 499_000,
    billing: "per event",
    detail: "Website penjualan tiket lengkap untuk event, konser, dan lomba.",
    items: ["Tiket online", "QR check-in", "Dashboard peserta"],
  },
];

export type WebPlan = {
  id: string;
  name: string;
  eyebrow: string;
  price: number;
  regularPrice: number;
  setup: number;
  setupRegular: number;
  note: string;
  items: string[];
  bestFor: string;
  featured?: boolean;
};

export const WEB_PLANS: WebPlan[] = [
  {
    id: "mulai-online", name: "Mulai Online", eyebrow: "Paket ringan",
    price: 79_000, regularPrice: 99_000, setup: 100_000, setupRegular: 200_000,
    note: "1 usaha · 1 cabang · 2 modul",
    items: ["Link Bio + katalog singkat", "QR Menu yang mudah diperbarui", "Setup tampilan & konfigurasi awal"],
    bestFor: "Usaha yang baru mulai go digital.",
  },
  {
    id: "operasional-rapi", name: "Operasional Rapi", eyebrow: "Paling dipilih",
    price: 249_000, regularPrice: 399_000, setup: 250_000, setupRegular: 450_000,
    note: "1 usaha · 1 cabang · hingga 4 modul",
    items: ["Kasir sederhana untuk transaksi harian", "Stok & HPP dasar", "Laporan penjualan harian", "Setup alur kerja awal"],
    bestFor: "Cafe, F&B, dan toko yang ingin lebih tertib.",
    featured: true,
  },
  {
    id: "usaha-bertumbuh", name: "Usaha Bertumbuh", eyebrow: "Pelanggan tumbuh",
    price: 399_000, regularPrice: 649_000, setup: 350_000, setupRegular: 650_000,
    note: "1 usaha · 1 cabang · hingga 6 modul",
    items: ["CRM pelanggan dan riwayat interaksi", "Loyalty sederhana: poin & stamp", "Marketing Tools untuk campaign", "Setup segmentasi pelanggan awal"],
    bestFor: "Usaha yang sudah punya pelanggan tetap.",
  },
  {
    id: "super-app", name: "Super App", eyebrow: "Terhubung",
    price: 699_000, regularPrice: 1_099_000, setup: 750_000, setupRegular: 1_200_000,
    note: "1 usaha · 1 cabang · modul tambahan opsional",
    items: ["Pilih hingga 10 modul bisnis", "Dashboard terpadu untuk memantau usaha", "Modul saling terhubung", "Pendampingan implementasi awal"],
    bestFor: "Bisnis dengan alur operasional yang lebih kompleks.",
  },
];

/** First month = monthly price + one-time setup. */
export const firstMonthTotal = (p: WebPlan) => p.price + p.setup;
export const monthlySaving = (p: WebPlan) => p.regularPrice - p.price;

export const webRupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;
