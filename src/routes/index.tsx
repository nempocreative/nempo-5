import { createFileRoute } from "@tanstack/react-router";
import { LegacyApp } from "@/legacy/LegacyApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nempo Organizer — Destinasi Wisata, Kuliner & Budaya Jawa Barat" },
      { name: "description", content: "Temukan wisata alam, kuliner khas, penginapan, dan event budaya terbaik di Jawa Barat." },
      { property: "og:title", content: "Nempo Organizer — Wisata, Kuliner & Budaya Jawa Barat" },
      { property: "og:description", content: "Platform digital pariwisata Jawa Barat untuk lokal dan wisatawan nusantara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegacyApp,
});
