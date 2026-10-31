import { weddingPackages, weddingAdatOptions, weddingVendorNote } from "@/data/wedding-packages";
import { INVITATION_PRICE, INVITATION_BILLING } from "@/data/wedding-invitation";
import { SOSMED_ITEMS, SOSMED_BUNDLES, rupiah } from "@/data/sosmed-packages";
import { WEB_PROJECTS, WEB_PLANS } from "@/data/web-development";
import { BIZ_MODULES } from "@/data/business-system";
import { TALENT_CATEGORIES } from "@/data/talent-management";
import { DESIGN_SERVICES } from "@/data/design-creative";

export type BuddyService = { id: string; name: string; href: string; summary: string; details: string; keywords: string[] };
export const BUDDY_SERVICES: BuddyService[] = [
  { id: "eo", name: "Event Organizer", href: "/event-organizer", summary: "Konsep acara sampai koordinasi hari-H.", details: "Nempo membantu konsep, rundown, koordinasi vendor, dan pelaksanaan acara: gathering, seminar, launching, festival, hingga konser. Pilih Basic, Premium, atau Exclusive di halaman Event Organizer; kebutuhan dan penawaran akhir dikonfirmasi dengan admin.", keywords: ["event organizer", "eo", "acara", "event", "gathering", "seminar", "festival", "konser", "launching"] },
  { id: "wo", name: "Wedding Organizer", href: "/wedding-organizer", summary: "Tim koordinasi untuk hari bahagiamu.", details: `${weddingPackages.map(p => `${p.name}: ${rupiah(p.price)} · tim ${p.team} orang`).join("\n")}\n\n${weddingVendorNote}\n\nAdat Sunda untuk klien WO: ${weddingAdatOptions.map(p => `${p.name.toLowerCase()} ${rupiah(p.special)}`).join("; ")}. Ketersediaan dan kebutuhan teknis dikonfirmasi kembali.`, keywords: ["wedding organizer", "wo", "wedding", "pernikahan", "resepsi", "lamaran", "adat", "lengser"] },
  { id: "invitation", name: "Wedding Invitation", href: "/wedding-invitation", summary: `${rupiah(INVITATION_PRICE)} · ${INVITATION_BILLING}`, details: `Undangan digital ${rupiah(INVITATION_PRICE)} (${INVITATION_BILLING}), dengan RSVP, galeri, ucapan tamu, musik, dan link siap dibagikan. Paket WO Signature dan Premium sudah termasuk undangan digital. Coba contoh undangannya di halaman Wedding Invitation.`, keywords: ["wedding invitation", "invitation", "undangan", "rsvp"] },
  { id: "sosmed", name: "Sosmed Management", href: "/sosmed-management", summary: "Konten Instagram, TikTok & paket promosi.", details: `${SOSMED_ITEMS.map(p => `${p.name}: ${rupiah(p.price)}${p.unit}`).join("\n")}\n\n${SOSMED_BUNDLES.map(p => `${p.name}: ${rupiah(p.price)}`).join("\n")}\nKonfirmasikan materi, jadwal tayang, dan kebutuhan campaign dengan admin.`, keywords: ["sosmed", "social media", "instagram", "tiktok", "feed", "story", "reels", "ads", "konten"] },
  { id: "web", name: "Web Development", href: "/web-development", summary: "Website usaha, Link Bio & ticketing.", details: `${WEB_PROJECTS.map(p => `${p.name}: ${rupiah(p.price)} · ${p.billing}`).join("\n")}\n\nPaket berlangganan:\n${WEB_PLANS.map(p => `${p.name}: ${rupiah(p.price)}/bulan + setup ${rupiah(p.setup)} sekali`).join("\n")}`, keywords: ["web development", "website", "web", "domain", "company profile", "link bio", "ticketing", "landing page"] },
  { id: "design", name: "Design Creative", href: "/design-creative", summary: "Visual, branding & materi campaign.", details: `${DESIGN_SERVICES.map(p => p.title).join(" · ")}.\n\nHarga disusun sesuai brief, jumlah materi, dan kebutuhan produksi; belum ada tarif tetap. Ceritakan kebutuhan desainmu ke admin untuk penawaran.`, keywords: ["design creative", "desain", "design", "logo", "branding", "poster", "merchandise", "visual"] },
  { id: "talent", name: "Talent Management", href: "/talent", summary: "MC, band, penari, model & pengisi acara.", details: `${TALENT_CATEGORIES.map(p => p.name).join(" · ")}.\n\nHarga menyesuaikan talent, lokasi, tanggal, durasi, dan kebutuhan acara. Susun pilihan talent di halaman Talent Management lalu konsultasikan dengan admin.`, keywords: ["talent management", "talent", "mc", "host", "band", "musisi", "penari", "penyanyi", "model", "fotografer", "videografer"] },
  { id: "business", name: "Business System", href: "/business-system", summary: "Kasir, stok, CRM & modul operasional.", details: `${BIZ_MODULES.length} modul bisnis:\n${BIZ_MODULES.map(p => `${p.name}: ${rupiah(p.price)}/bulan`).join("\n")}\n\nPaket tersedia di halaman Business System. Biaya setup paket terpisah; pilih modul sesuai kebutuhan usaha.`, keywords: ["business system", "sistem", "kasir", "qr menu", "crm", "loyalty", "stok", "stock", "hpp", "invoice", "hr", "antrian", "reservasi", "digi", "aplikasi"] },
];

// Specific service names win over generic overlapping words such as wedding/event.
export function matchBuddyService(input: string): BuddyService | undefined {
  const query = input.toLowerCase().trim();
  const explicit = BUDDY_SERVICES.find(service => query.includes(service.name.toLowerCase()));
  if (explicit) return explicit;
  return ["invitation", "business", "talent", "design", "sosmed", "web", "wo", "eo"]
    .map(id => BUDDY_SERVICES.find(s => s.id === id))
    .find(service => service?.keywords.some(keyword => new RegExp(`(^|[^a-z])${keyword}([^a-z]|$)`, "i").test(query)));
}

export type BuddyReply = { text: string; serviceId?: string; catalogue?: boolean; contact?: boolean };
export function getBuddyReply(input: string): BuddyReply {
  if (/\b(admin|kontak|hubungi|cs|whatsapp|dm)\b/i.test(input)) return { text: "Hubungi tim Nempo melalui DM Instagram @nempo.id untuk konsultasi dan penawaran resmi.", contact: true };
  const service = matchBuddyService(input);
  if (service) return { text: service.details, serviceId: service.id };
  if (/\b(order|pesan|booking|proses)\b/i.test(input)) return { text: "Ceritakan layanan yang kamu butuhkan, tanggal atau target pengerjaan, lokasi acara bila ada, dan gambaran budget. Tim Nempo akan membantu konsultasi dan penawaran lewat DM Instagram @nempo.id.", contact: true };
  return { text: "Mau menyiapkan acara, pernikahan, konten, website, desain, talent, atau sistem usaha? Pilih layanan di bawah; untuk kebutuhan khusus, langsung konsultasikan dengan tim Nempo.", catalogue: true };
}