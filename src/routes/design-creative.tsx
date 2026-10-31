import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/design-creative")({
  head: () => ({
    meta: [
      { title: "Design Creative Nempo — Branding, Konten & Visual Garut" },
      { name: "description", content: "Jasa desain kreatif Nempo: branding & logo, konten visual sosmed, foto & video, desain event, merchandise, dan materi campaign. Konsultasi gratis." },
      { property: "og:title", content: "Design Creative Nempo — Branding, Konten & Visual" },
      { property: "og:description", content: "Visual kreatif yang selaras dengan karakter dan tujuan brand — dari logo sampai merchandise." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
