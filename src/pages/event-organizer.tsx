import type React from "react";
import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import {
  PartyPopper, Building2, Music, GraduationCap, Trophy,
  MessageCircle, ClipboardList, Palette, Wrench, FileCheck,
  Check, ChevronDown, MapPin, ArrowRight,
} from "lucide-react";

const hand = "font-[family-name:var(--font-wed-hand)]";

const services = [
  { icon: MapPin, title: "Outing & Tour", color: "#6366F1", desc: "Perjalanan wisata rombongan, outing kantor, dan tur komunitas dengan transportasi lengkap." },
  { icon: Building2, title: "Corporate Event", color: "#0EA5E9", desc: "Gathering, launching produk, seminar, rapat kerja, dan family day perusahaan." },
  { icon: Music, title: "Konser & Festival", color: "#DB2777", desc: "Produksi panggung, sound, lighting, tiketing digital, dan manajemen talent." },
  { icon: GraduationCap, title: "Event Sekolah & Kampus", color: "#14B8A6", desc: "Pensi, wisuda, perpisahan, seminar, dan buku tahunan digital." },
  { icon: Trophy, title: "Lomba & Turnamen", color: "#0F766E", desc: "Registrasi online, penjurian, bracket, hingga penyerahan hadiah." },
  { icon: PartyPopper, title: "Ulang Tahun & Private Party", color: "#8B5CF6", desc: "Pesta keluarga, sweet seventeen, dan acara komunitas yang berkesan." },
];

const steps = [
  { icon: MessageCircle, title: "Konsultasi Gratis", color: "#6366F1", desc: "Ceritakan kebutuhan, tanggal, jumlah tamu, dan budget kamu." },
  { icon: ClipboardList, title: "Konsep & Penawaran", color: "#0EA5E9", desc: "Kami susun konsep, rundown awal, dan rincian biaya transparan." },
  { icon: Palette, title: "Persiapan & Desain", color: "#DB2777", desc: "Desain visual, vendor, venue, talent, dan technical meeting." },
  { icon: Wrench, title: "Eksekusi Hari H", color: "#14B8A6", desc: "Tim lapangan mengatur semua agar acara berjalan sesuai rundown." },
  { icon: FileCheck, title: "Laporan & Dokumentasi", color: "#0F766E", desc: "Foto, video highlight, dan evaluasi acara diserahkan ke kamu." },
];

const packages = [
  { name: "Basic", price: "Mulai Rp 3,5 jt", note: "Acara intim hingga 100 tamu", items: ["Konsultasi & rundown", "Koordinator hari H (3 crew)", "MC profesional", "Dekor sederhana", "Dokumentasi foto"] },
  { name: "Premium", price: "Mulai Rp 12 jt", note: "Hingga 500 tamu", popular: true, items: ["Semua fitur Basic", "Tim lapangan 8 crew", "Dekor & backdrop custom", "Sound system & lighting", "Foto + video highlight", "Undangan & tiket digital"] },
  { name: "Exclusive", price: "Custom", note: "Festival, konser, corporate besar", items: ["Semua fitur Premium", "Produksi panggung penuh", "Manajemen talent & artis", "Tiketing & scan QR", "Sosmed & publikasi", "Laporan pasca acara"] },
];

const stats = [
  { value: "150+", label: "Event terlaksana" },
  { value: "50rb+", label: "Peserta dilayani" },
  { value: "Jabar", label: "Area layanan" },
];

const testimonials = [
  { name: "Panitia Festival Pantai", role: "Festival, Garut", text: "Panggung, sound, sampai tiket digital semua diatur NEMPO. Ramai, aman, dan tepat waktu." },
  { name: "HRD PT Sinar Priangan", role: "Family Gathering", text: "Tim NEMPO responsif dan kreatif. Karyawan senang, acaranya rapi dari awal sampai akhir." },
  { name: "OSIS SMAN Garut", role: "Pentas Seni", text: "Tiket digital dan scan QR bikin antrean masuk lancar. Recommended!" },
];

const faqs = [
  { q: "Berapa lama sebelum acara sebaiknya booking?", a: "Idealnya 1–3 bulan untuk acara besar dan 2–4 minggu untuk acara kecil. Jadwal mendadak tetap bisa kami bantu bila tersedia." },
  { q: "Apakah bisa menyesuaikan budget?", a: "Bisa. Semua paket fleksibel; kami bantu menyusun prioritas sesuai anggaran kamu." },
  { q: "Apakah melayani di luar Garut?", a: "Ya, kami melayani seluruh Jawa Barat. Biaya transport tim menyesuaikan lokasi." },
  { q: "Bagaimana sistem pembayarannya?", a: "DP 30% untuk mengunci tanggal, 50% saat persiapan, dan pelunasan H-3 acara." },
];

const marqueeItems = ["Konser & Festival", "Corporate Event", "Outing & Tour", "Pensi & Wisuda", "Lomba & Turnamen", "Private Party", "Garut • Jawa Barat"];

const eoIconCss = `
@keyframes eo-ring-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
@keyframes eo-ring-glow { 0%,100% { opacity: .3; } 50% { opacity: .75; } }
@keyframes eo-tile-shine { 0%, 72% { transform: translateX(-130%) skewX(-18deg); } 100% { transform: translateX(230%) skewX(-18deg); } }
.eo-ring { position: absolute; inset: -3px -3px -5px; border-radius: 20px; overflow: hidden; padding: 2px; -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; filter: drop-shadow(0 0 5px var(--ring-color)) saturate(1.2); }
.eo-ring::before { content: ""; position: absolute; left: 50%; top: 50%; width: 180%; height: 180%; transform: translate(-50%, -50%);
  background: conic-gradient(from 0deg, transparent 0deg 190deg, var(--ring-tail) 250deg, var(--ring-color) 320deg, #fff 352deg, transparent 360deg);
  animation: eo-ring-spin 2.6s linear infinite; animation-delay: var(--ring-delay); }
.eo-glow { position: absolute; inset: -2px; border-radius: 20px; z-index: -1; pointer-events: none; background: radial-gradient(circle, var(--ring-color) 0%, transparent 70%); filter: blur(4px); animation: eo-ring-glow 3.2s ease-in-out infinite; animation-delay: var(--ring-delay); }
.eo-shine { position: absolute; inset: 0; width: 45%; pointer-events: none; background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent); animation: eo-tile-shine 4.8s ease-in-out infinite; animation-delay: var(--ring-delay); }
.wed-card-pop:hover .eo-ring::before { animation-duration: 1.4s; }
@media (prefers-reduced-motion: reduce) { .eo-ring::before, .eo-glow, .eo-shine { animation: none; } .eo-shine { display: none; } }
`;

function StickerIcon({ icon: Icon, color, size = "md", className = "", delay = 0 }: { icon: React.ElementType; color: string; size?: "sm" | "md"; className?: string; delay?: number }) {
  const box = size === "sm" ? "h-11 w-11 rounded-[14px]" : "h-[54px] w-[54px] rounded-[17px]";
  return (
    <span
      className={`relative isolate m-1.5 inline-flex w-fit shrink-0 ${className}`}
      style={{ "--ring-color": color, "--ring-tail": `color-mix(in srgb, ${color} 35%, transparent)`, "--ring-delay": `${-delay * 0.4}s` } as React.CSSProperties}
    >
      <span aria-hidden className="eo-glow" />
      <span aria-hidden className="eo-ring" />
      <span
        className={`relative flex items-center justify-center overflow-hidden ${box}`}
        style={{
          background: `linear-gradient(148deg, color-mix(in srgb, ${color} 55%, white) 0%, ${color} 58%, color-mix(in srgb, ${color} 72%, black) 100%)`,
          boxShadow: `0 4px 0 color-mix(in srgb, ${color} 82%, black), 0 8px 13px -9px ${color}88, inset 0 1px 0 rgba(255,255,255,.54)`,
        }}
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_27%_17%,rgba(255,255,255,.42),transparent_56%)]" />
        <span aria-hidden className="pointer-events-none absolute inset-[1px] rounded-[inherit] border border-white/20" />
        <span aria-hidden className="eo-shine" />
        <Icon className={`relative z-10 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,.25)] ${size === "sm" ? "h-5 w-5" : "h-6 w-6"}`} strokeWidth={2.2} />
      </span>
    </span>
  );
}

/* Coretan tangan — pengganti ikon dekorasi biar tidak kaku */
function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 20" fill="none" className={className} aria-hidden>
      <path d="M3 13 C 11 3, 19 19, 27 10 S 43 3, 51 12 S 57 15, 57 8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function Burst({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M20 4v8M20 28v8M4 20h8M28 20h8M9 9l5.5 5.5M25.5 25.5L31 31M31 9l-5.5 5.5M14.5 25.5L9 31" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

function Ring({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M20 5 C 30 4, 36 12, 35 21 C 34 31, 24 37, 15 34 C 7 31, 3 22, 7 14 C 10 8, 15 6, 19 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function EventOrganizerPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="bg-background pb-12">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand px-5 pb-20 pt-12 text-primary-foreground">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary-foreground/25 blur-3xl" />
          {/* floating decor — coretan tangan */}
          <Burst className="wed-float pointer-events-none absolute right-[12%] top-14 h-9 w-9 text-primary-foreground/80" />
          <Ring className="wed-float-slow pointer-events-none absolute right-[24%] bottom-24 h-6 w-6 text-primary-foreground/60" />
          <Burst className="wed-float-slow pointer-events-none absolute right-[8%] bottom-40 h-6 w-6 text-primary-foreground/30" />

          <p className={`${hand} relative text-2xl text-brand-sky sm:text-3xl`}>punya rencana acara?</p>
          <h1 className="relative mt-3 text-[32px] font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
            Acara impianmu,<br />
            <span className="text-brand-sky">kami yang urus</span> dari awal sampai akhir.
          </h1>
          <p className="relative mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Event organizer asal Garut — konsep kreatif, vendor terpercaya, dan tim lapangan berpengalaman di seluruh Jawa Barat.
          </p>
          <div className="relative mt-7 flex flex-wrap gap-3">
            <a href="#paket" className="wed-sticker flex-1 rounded-full bg-card px-5 py-3.5 text-center text-sm font-bold text-brand shadow-lg shadow-brand-navy/20 transition-transform active:scale-[0.98] sm:flex-none sm:px-8">
              Lihat Paket
            </a>
            <Link href="/price-list" className="flex-1 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3.5 text-center text-sm font-bold backdrop-blur transition-transform active:scale-[0.98] sm:flex-none sm:px-8">
              Daftar Harga
            </Link>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-2">
            {["150+ event", "50rb+ peserta", "Melayani seluruh Jabar"].map((chip) => (
              <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-[11px] font-semibold backdrop-blur">
                <Burst className="h-3 w-3 text-brand-sky" />
                {chip}
              </span>
            ))}
          </div>

          {/* wavy divider */}
          <svg className="absolute bottom-0 left-0 w-full text-brand-sky" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
            <path d="M0,32 C240,60 480,4 720,28 C960,52 1200,8 1440,32 L1440,60 L0,60 Z" fill="currentColor" />
          </svg>
        </section>

        {/* Marquee ribbon */}
        <div className="overflow-hidden bg-brand-sky py-3 text-brand" aria-hidden>
          <div className="wed-marquee flex w-max items-center gap-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-semibold tracking-wide">
                {item}
                <Burst className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <section className="relative -mt-0 px-4 pt-8">
          <div className="grid grid-cols-4 divide-x divide-border rounded-3xl border-2 border-dashed border-brand/25 bg-card py-5 shadow-xl shadow-brand-navy/10">
            {stats.map((s) => (
              <div key={s.label} className="px-1 text-center">
                <p className="text-lg font-extrabold text-brand">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-medium leading-tight text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="px-4 pt-12">
          <style>{eoIconCss}</style>
          <SectionHead eyebrow="Layanan" title="Satu tim untuk semua jenis acara" note="apapun acaranya, gas!" />
          <div className="grid grid-cols-2 gap-3">
            {services.map((s, i) => (
              <div key={s.title} className="wed-card-pop rounded-3xl border-2 border-dashed border-border bg-card p-4 hover:border-brand/40">
                <StickerIcon icon={s.icon} color={s.color} delay={i} className="mb-4" />
                <h3 className="text-[13px] font-bold leading-snug text-foreground">{s.title}</h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-12 bg-brand-sky px-4 py-12">
          <SectionHead eyebrow="Cara Kerja" title="5 langkah, tanpa ribet" note="kamu santai, kami yang gerak" />
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s.title} className="wed-card-pop flex gap-4 rounded-3xl border-2 border-transparent bg-card p-4 shadow-sm hover:border-brand/30">
                <StickerIcon icon={s.icon} color={s.color} size="sm" />
                <div>
                  <h3 className="flex items-center gap-1.5 text-sm font-bold text-brand-navy">
                    <span className="rounded-full bg-brand-sky px-2 py-0.5 text-[11px] font-extrabold text-brand">{String(i + 1).padStart(2, "0")}</span> {s.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Packages */}
        <section id="paket" className="scroll-mt-20 px-4 pt-12">
          <SectionHead eyebrow="Paket" title="Pilih sesuai kebutuhanmu" sub="Harga indikatif, bisa disesuaikan dengan budget." note="ada yang pas buat semua" />
          <div className="space-y-5">
            {packages.map((p) => (
              <div
                key={p.name}
                className={`wed-card-pop relative overflow-hidden rounded-3xl p-6 ${
                  p.popular
                    ? "bg-brand text-primary-foreground shadow-xl shadow-brand/25"
                    : "border-2 border-dashed border-border bg-card text-foreground"
                }`}
              >
                {p.popular && (
                  <span className="wed-sticker wed-wiggle absolute -right-1 top-5 rotate-3 rounded-full bg-card px-3.5 py-1.5 text-[10px] font-bold tracking-wide text-brand">
                    PALING DIMINATI
                  </span>
                )}
                <p className={`${hand} text-xl ${p.popular ? "text-brand-sky" : "text-brand"}`}>paket</p>
                <h3 className="-mt-1 text-xl font-extrabold">{p.name}</h3>
                <p className={`text-xs ${p.popular ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{p.note}</p>
                <p className={`mt-3 text-2xl font-extrabold ${p.popular ? "" : "text-brand"}`}>{p.price}</p>
                <div className={`my-4 border-t-2 border-dashed ${p.popular ? "border-primary-foreground/20" : "border-border"}`} />
                <ul className="space-y-2">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[13px]">
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${p.popular ? "bg-card" : "bg-brand-sky"}`}>
                        <Check className={`h-2.5 w-2.5 ${p.popular ? "text-brand" : "text-brand"}`} strokeWidth={3} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/price-list"
                  className={`wed-sticker mt-5 block rounded-full py-3 text-center text-sm font-bold ${
                    p.popular ? "bg-primary-foreground text-brand-navy" : "bg-brand text-primary-foreground"
                  }`}
                >
                  Pilih {p.name}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="pt-12">
          <div className="px-4"><SectionHead eyebrow="Testimoni" title="Kata klien kami" note="mereka puas, kamu kapan?" /></div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
            {testimonials.map((t) => (
              <div key={t.name} className="wed-card-pop flex w-[78%] shrink-0 snap-start flex-col rounded-3xl border-2 border-dashed border-border bg-card p-5 sm:w-[46%]">
                <p className={`${hand} mb-1 text-3xl leading-none text-brand`} aria-hidden>”</p>
                <p className="flex-1 text-[13px] leading-relaxed text-foreground">“{t.text}”</p>
                <div className="mt-4 flex items-center gap-3 border-t border-dashed border-border pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-sky text-sm font-bold text-brand">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 pt-12">
          <SectionHead eyebrow="FAQ" title="Pertanyaan umum" note="biar gak penasaran" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className={`rounded-2xl border-2 bg-card transition-colors ${open === i ? "border-brand/40" : "border-dashed border-border"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-semibold text-brand-navy">
                  {f.q}
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${open === i ? "bg-brand text-primary-foreground" : "bg-brand-sky text-brand"}`}>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </span>
                </button>
                {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pt-12">
          <div className="relative overflow-hidden rounded-3xl bg-brand p-7 text-center text-primary-foreground">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary-foreground/30 blur-2xl" />
            <Burst className="wed-float pointer-events-none absolute left-[10%] top-8 h-7 w-7 text-primary-foreground/60" />
            <Squiggle className="wed-wiggle pointer-events-none absolute right-[12%] bottom-10 h-5 w-12 text-primary-foreground/30" />
            <Burst className="wed-pulse-heart relative mx-auto h-10 w-10 text-brand-sky" />
            <p className={`${hand} relative mt-3 text-2xl text-brand-sky`}>jangan cuma jadi wacana</p>
            <h2 className="relative mt-1 text-2xl font-extrabold leading-snug">Siap bikin acara yang berkesan?</h2>
            <p className="relative mx-auto mt-2 max-w-sm text-sm text-primary-foreground/80">Konsultasi gratis — ceritakan rencana acaramu, kami bantu wujudkan.</p>
            <Link href="/price-list" className="wed-sticker relative mt-6 inline-flex items-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-bold text-brand shadow-lg shadow-brand-navy/20">
              Mulai Konsultasi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function SectionHead({ eyebrow, title, sub, note }: { eyebrow: string; title: string; sub?: string; note?: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand">{eyebrow}</p>
      <h2 className="mt-1 text-[22px] font-extrabold leading-tight text-brand-navy">{title}</h2>
      {note && <p className={`${hand} mt-0.5 text-xl text-brand`}>{note}</p>}
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}
