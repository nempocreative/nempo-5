import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/web-development")({
  head: () => ({
    meta: [
      { title: "Web Development Nempo — Website & Sistem Bisnis Garut" },
      { name: "description", content: "Jasa pembuatan website Nempo: Company Website Rp1.500.000, Link Bio, website tiket event, dan sistem bisnis berbasis web mulai Rp79.000/bulan." },
      { property: "og:title", content: "Web Development Nempo — Website & Sistem Bisnis" },
      { property: "og:description", content: "Website company, link bio, tiket event, sampai sistem kasir dan CRM — dibuat tim Nempo di Garut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
