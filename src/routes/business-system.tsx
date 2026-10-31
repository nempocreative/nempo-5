import { createFileRoute } from "@tanstack/react-router";
import { NempoShell } from "@/components/nempo-shell";

export const Route = createFileRoute("/business-system")({
  head: () => ({
    meta: [
      { title: "Business System Nempo — Kasir, Stok, CRM & Super App" },
      { name: "description", content: "Sistem bisnis berbasis web dari Nempo: kasir, QR menu, booking, antrian, CRM, loyalty, stok, gudang, HPP, invoice, dan HR. Mulai Rp49.000/bulan atau Super App Rp699.000/bulan." },
      { property: "og:title", content: "Business System Nempo — Semua Modul Usaha Terhubung" },
      { property: "og:description", content: "Pilih modul satuan atau satukan hingga 10 modul dalam Business Super App." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NempoShell,
});
