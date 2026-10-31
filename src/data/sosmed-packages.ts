// Sosmed Management prices — same values as the Kerja Sama price list (/price-list#paket-promosi).

export type SosmedItem = {
  id: string;
  name: string;
  platform: "Instagram" | "TikTok";
  price: number;
  unit: string;
  features: string[];
};

export const SOSMED_ITEMS: SosmedItem[] = [
  { id: "ig-ads", name: "Instagram Ads", platform: "Instagram", price: 300_000, unit: "/minggu", features: ["Prioritas tayang khusus", "Tombol CTA langsung ke detail event", "Konten tunggal/multiple atau video pendek (Reels)"] },
  { id: "ig-feed", name: "Instagram Feed", platform: "Instagram", price: 1_250_000, unit: "/post", features: ["1 post di feed", "Materi dari Nempo Organizer", "Caption dari event creator", "3 hashtag utama + 2 tag"] },
  { id: "ig-story", name: "Instagram Story", platform: "Instagram", price: 250_000, unit: "/post", features: ["1 post story", "Link CTA langsung ke detail event", "Materi dari Nempo Organizer"] },
  { id: "ig-reels", name: "Instagram Reels", platform: "Instagram", price: 650_000, unit: "/post", features: ["1 video Reels", "Materi dari Nempo Organizer", "3 hashtag utama + 5 tag"] },
  { id: "ig-highlight", name: "Instagram Highlight", platform: "Instagram", price: 500_000, unit: "/paket", features: ["3 konten highlight", "Materi khusus dari Feed, Story & Reels"] },
  { id: "tt-photo", name: "TikTok Post (Foto)", platform: "TikTok", price: 400_000, unit: "/post", features: ["1 post foto", "Materi dari Nempo Organizer", "3 hashtag utama + 3 tag"] },
  { id: "tt-video", name: "TikTok Post (Video)", platform: "TikTok", price: 500_000, unit: "/post", features: ["1 video maks. 1 menit", "Materi dari Nempo Organizer", "3 hashtag utama + 3 tag"] },
];

export type SosmedBundle = {
  id: string;
  name: string;
  normalPrice: number;
  price: number;
  tagline: string;
  includes: string[];
  popular?: boolean;
};

export const SOSMED_BUNDLES: SosmedBundle[] = [
  {
    id: "social-media",
    name: "Paket Social Media",
    normalPrice: 5_000_000,
    price: 4_000_000,
    tagline: "Semua kanal Instagram dalam satu paket",
    popular: true,
    includes: ["Instagram Ads Rp300.000/minggu", "2x Instagram Feed", "2x Instagram Story", "1x Instagram Reels", "1x Instagram Highlight"],
  },
  {
    id: "all-promotion",
    name: "All Promotion",
    normalPrice: 10_000_000,
    price: 7_500_000,
    tagline: "Sosmed + tampil di website Nempo",
    includes: ["Semua isi Paket Social Media", "Dedicated Hero Banner 2 minggu", "Campaign Hero Banner 2 minggu", "Campaign Banner 2 minggu", "Rekomendasi Event 2 minggu"],
  },
];

export const bundleSaving = (b: SosmedBundle) => b.normalPrice - b.price;

export const rupiah = (n: number) => `Rp${n.toLocaleString("id-ID")}`;
