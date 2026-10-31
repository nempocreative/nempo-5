import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/sosmed-management")({
  head: () => ({
    meta: [
      { title: "Sosmed Management Nempo — Kelola Instagram & TikTok" },
      { name: "description", content: "Jasa kelola media sosial Nempo: konten feed, reels, story, highlight, TikTok, dan Instagram Ads. Paket Social Media Rp4.000.000." },
      { property: "og:title", content: "Sosmed Management Nempo — Kelola Instagram & TikTok" },
      { property: "og:description", content: "Konten, caption, jadwal posting, sampai iklan Instagram & TikTok. Mulai Rp250.000 per konten." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
