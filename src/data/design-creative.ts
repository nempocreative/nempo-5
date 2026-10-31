// Design Creative — services from Kenalan Nempo ("Kreatif usaha: konten, visual, branding") and the Kerja Sama price list.
// Design work is quoted per brief; fixed prices shown here are pulled from the other service modules so they stay in sync.
import { INVITATION_PRICE } from "@/data/wedding-invitation";
import { SOSMED_ITEMS } from "@/data/sosmed-packages";
import { WEB_PROJECTS } from "@/data/web-development";

export const DESIGN_SERVICES = [
  { id: "branding", title: "Branding & Identitas Visual", desc: "Logo, warna, dan gaya visual yang sesuai karakter usaha.", items: ["Konsep identitas brand", "Logo & variasinya", "Panduan warna dan font"] },
  { id: "konten", title: "Konten Visual Sosmed", desc: "Materi feed, story, dan reels yang konsisten dengan brand.", items: ["Desain feed & story", "Template konten", "Materi campaign"] },
  { id: "foto-video", title: "Foto, Video & Reels", desc: "Produksi aset visual yang siap dipakai untuk promosi dan media sosial.", items: ["Foto produk & tempat", "Video promosi", "Reels pendek"] },
  { id: "event", title: "Desain Event", desc: "Visual acara dari publikasi sampai hari-H.", items: ["Poster & publikasi", "Backdrop & dekor visual", "Tiket dan materi peserta"] },
  { id: "merchandise", title: "Desain Merchandise", desc: "Identitas produk untuk brand, event, komunitas, atau destinasi.", items: ["Konsep & desain produk", "Apparel & souvenir", "Packaging"] },
  { id: "campaign", title: "Materi Campaign", desc: "Arah visual kampanye agar pesan brand sampai ke audiens.", items: ["Key visual campaign", "Materi promosi cetak & digital", "Adaptasi berbagai ukuran"] },
] as const;

const sosmedFrom = Math.min(...SOSMED_ITEMS.map((i) => i.price));
const company = WEB_PROJECTS.find((p) => p.id === "company")!;

/** Related services that already have a fixed price elsewhere on the site. */
export const DESIGN_RELATED = [
  { id: "sosmed", title: "Sosmed Management", price: sosmedFrom, prefix: "mulai", unit: "per konten", href: "/sosmed-management" },
  { id: "invitation", title: "Wedding Invitation", price: INVITATION_PRICE, prefix: "", unit: "sekali bayar", href: "/wedding-invitation" },
  { id: "company", title: "Company Website", price: company.price, prefix: "", unit: company.billing, href: "/web-development" },
] as const;

export const designRupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;
