import { createFileRoute } from "@tanstack/react-router";
import { LegacyApp } from "@/legacy/LegacyApp";

// All site pages are handled by the migrated nempo.id app (client-side router).
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Nempo Organizer — Jawa Barat" },
      { name: "description", content: "Wisata, kuliner, penginapan, event, dan berita Jawa Barat di Nempo Organizer." },
      { property: "og:title", content: "Nempo Organizer — Jawa Barat" },
      { property: "og:description", content: "Wisata, kuliner, penginapan, event, dan berita Jawa Barat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegacyApp,
});
