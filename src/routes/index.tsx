import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nempo Organizer — Acara, Wedding & Layanan Kreatif" },
      {
        name: "description",
        content:
          "Layanan event organizer, wedding, undangan digital, sosmed, website, desain, talent, dan sistem usaha bersama Nempo Organizer.",
      },
      { property: "og:title", content: "Nempo Organizer — Acara, Wedding & Layanan Kreatif" },
      {
        property: "og:description",
        content: "Siapkan acara dan kembangkan usaha bersama layanan wedding, sosmed, website, desain, talent, dan sistem bisnis Nempo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
