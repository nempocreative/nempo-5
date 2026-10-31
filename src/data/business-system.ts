// Business System (Digi Nempo modules) — prices from the Digital Services price list (/digital-services).
import { WEB_PLANS, type WebPlan } from "@/data/web-development";

export type BizGroup = "Penjualan & Pelanggan" | "Operasional & Stok" | "Keuangan & Tim";

export type BizModule = { id: string; name: string; group: BizGroup; price: number; desc: string; features: string[] };

export const BIZ_MODULES: BizModule[] = [
  { id: "kasir", name: "Kasir", group: "Penjualan & Pelanggan", price: 149_000, desc: "Transaksi lebih cepat dengan order, meja, dan laporan yang terhubung.", features: ["Order & meja", "Stok bahan", "Laporan harian"] },
  { id: "qr-menu", name: "QR Menu", group: "Penjualan & Pelanggan", price: 49_000, desc: "Pelanggan lihat menu terbaru cukup dengan memindai QR.", features: ["Menu mudah diperbarui", "Foto dan detail produk", "Pesan dari meja"] },
  { id: "booking", name: "Booking & Reservasi", group: "Penjualan & Pelanggan", price: 149_000, desc: "Atur jadwal, reservasi meja, atau layanan tanpa bentrok.", features: ["Jadwal dan slot tersedia", "Konfirmasi otomatis", "Riwayat reservasi"] },
  { id: "antrian", name: "Sistem Antrian", group: "Penjualan & Pelanggan", price: 149_000, desc: "Nomor antrian, panggilan, dan status layanan yang bisa dipantau.", features: ["Ambil nomor online", "Panggil antrian", "Pantau waktu tunggu"] },
  { id: "crm", name: "CRM", group: "Penjualan & Pelanggan", price: 149_000, desc: "Data pelanggan dan riwayat interaksi supaya pelanggan kembali.", features: ["Data pelanggan terpusat", "Riwayat interaksi", "Tindak lanjut terarah"] },
  { id: "loyalty", name: "Loyalty & Membership", group: "Penjualan & Pelanggan", price: 129_000, desc: "Poin, stamp, dan benefit member yang terhubung ke data pelanggan.", features: ["Poin dan stamp digital", "Benefit member", "Promo lebih personal"] },
  { id: "marketing", name: "Marketing Tools", group: "Penjualan & Pelanggan", price: 249_000, desc: "Rencanakan konten, kelola campaign, dan baca performa.", features: ["Kalender konten", "Campaign terarah", "Analitik performa"] },
  { id: "link-bio", name: "Link Bio", group: "Penjualan & Pelanggan", price: 49_000, desc: "Satu halaman untuk semua tautan penting bisnis.", features: ["Satu tautan semua kanal", "Profil & katalog singkat", "Statistik kunjungan"] },
  { id: "dapur-stock", name: "Dapur Stock", group: "Operasional & Stok", price: 99_000, desc: "Pantau bahan masuk, pemakaian, dan kebutuhan dapur.", features: ["Stok bahan dapur", "Pencatatan pemakaian", "Peringatan stok menipis"] },
  { id: "gudang", name: "Gudang", group: "Operasional & Stok", price: 99_000, desc: "Kelola stok dan pergerakan barang dari satu tempat.", features: ["Stok antar lokasi", "Barang masuk & keluar", "Riwayat pergerakan"] },
  { id: "resep", name: "Resep", group: "Operasional & Stok", price: 79_000, desc: "Resep dan takaran standar agar rasa dan porsi konsisten.", features: ["Takaran standar", "Versi resep terkontrol", "Terhubung ke HPP"] },
  { id: "hpp", name: "HPP", group: "Operasional & Stok", price: 79_000, desc: "Hitung harga pokok agar harga jual dan margin jelas.", features: ["Komponen biaya terukur", "Margin mudah dipantau", "Dasar harga jual"] },
  { id: "purchasing", name: "Pembelian & Supplier", group: "Operasional & Stok", price: 99_000, desc: "Kelola belanja, pesanan supplier, dan penerimaan barang.", features: ["Pesanan pembelian", "Data supplier", "Penerimaan barang"] },
  { id: "invoice", name: "Invoice & Faktur", group: "Keuangan & Tim", price: 79_000, desc: "Invoice rapi dan status pembayaran yang mudah dipantau.", features: ["Invoice profesional", "Faktur tertata", "Status pembayaran"] },
  { id: "hr", name: "Human Resource", group: "Keuangan & Tim", price: 129_000, desc: "Data tim, jadwal kerja, dan administrasi lebih ringan.", features: ["Data anggota tim", "Jadwal kerja", "Administrasi rapi"] },
];

export const BIZ_GROUPS: BizGroup[] = ["Penjualan & Pelanggan", "Operasional & Stok", "Keuangan & Tim"];

export const SUPER_APP_MAX_MODULES = 10;
export const superAppPlan = (): WebPlan => WEB_PLANS.find((p) => p.id === "super-app")!;

/** Monthly total when the chosen modules are bought one by one. */
export const modulesMonthlyTotal = (ids: string[]) =>
  ids.reduce((sum, id) => sum + (BIZ_MODULES.find((m) => m.id === id)?.price ?? 0), 0);

/** Super App is suggested when it is cheaper per month than buying the chosen modules separately and fits its module limit. */
export function superAppSuggestion(ids: string[]): { suggest: boolean; saving: number } {
  const total = modulesMonthlyTotal(ids);
  const superApp = superAppPlan().price;
  const suggest = ids.length > 0 && ids.length <= SUPER_APP_MAX_MODULES && total > superApp;
  return { suggest, saving: suggest ? total - superApp : 0 };
}

export const bizRupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;
