import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";
import { ArrowRight, Check, ChevronDown, PenTool, LayoutGrid, Camera, CalendarRange, Shirt, Megaphone } from "lucide-react";
import { DESIGN_RELATED, DESIGN_SERVICES, designRupiah } from "@/data/design-creative";

const hand = "font-[family-name:var(--font-wed-hand)]";
const serif = "font-[family-name:var(--font-wed-serif)]";

const serviceIcons: Record<string, React.ElementType> = {
  branding: PenTool, konten: LayoutGrid, "foto-video": Camera, event: CalendarRange, merchandise: Shirt, campaign: Megaphone,
};
const serviceTones = ["bg-art-amber", "bg-art-coral", "bg-art-teal", "bg-art-plum", "bg-art-coral", "bg-art-amber"];

const steps = [
  { title: "Brief", desc: "Ceritakan usaha, target audiens, dan kebutuhan visualnya." },
  { title: "Moodboard", desc: "Kami susun arah gaya, warna, dan referensi biar sepaham dulu." },
  { title: "Desain & revisi", desc: "Desain dibuat, lalu dirapikan bareng sampai pas." },
  { title: "File siap pakai", desc: "Hasil akhir diserahkan dalam format yang siap dipakai." },
];

const faqs = [
  { q: "Berapa harga jasa desainnya?", a: "Harga desain menyesuaikan brief: jenis materi, jumlah, dan tingkat kerumitannya. Konsultasi dulu gratis, nanti kami kirim penawarannya." },
  { q: "Bisa sekalian dikelola di Instagram?", a: "Bisa. Gabungkan dengan Sosmed Management supaya desain langsung dijadwalkan dan dipublikasikan." },
  { q: "Bisa untuk kebutuhan event?", a: "Bisa, mulai dari poster, backdrop, tiket, sampai merchandise peserta — dan bisa terhubung dengan tim Event Organizer Nempo." },
  { q: "Melayani dari luar Garut?", a: "Bisa. Proses brief dan revisi dilakukan online, jadi kamu tidak perlu datang langsung." },
];

const marqueeItems = ["Branding", "Logo", "Konten Sosmed", "Foto & Video", "Poster Event", "Merchandise", "Packaging", "Garut • Jawa Barat"];

type Palette = { id: string; name: string; bg: string; accent: string; text: string; chip: string };
const palettes: Palette[] = [
  { id: "senja", name: "Senja", bg: "bg-art-amber", accent: "bg-art-ink", text: "text-art-ink", chip: "bg-art-cream" },
  { id: "kopi", name: "Kopi", bg: "bg-art-ink", accent: "bg-art-amber", text: "text-art-cream", chip: "bg-art-coral" },
  { id: "pantai", name: "Pantai", bg: "bg-art-teal", accent: "bg-art-cream", text: "text-art-cream", chip: "bg-art-amber" },
  { id: "manis", name: "Manis", bg: "bg-art-coral", accent: "bg-art-plum", text: "text-art-cream", chip: "bg-art-cream" },
];

/* Poster contoh — warnanya bisa diganti */
function PosterPlayground() {
  const [pid, setPid] = useState("senja");
  const p = palettes.find((x) => x.id === pid)!;
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <span className={`${hand} wed-wiggle absolute -left-6 -top-6 z-10 -rotate-6 rounded-full bg-art-plum px-3 py-0.5 text-lg text-art-cream`}>ganti warnanya!</span>
      <div className={`relative aspect-[3/4] rotate-2 overflow-hidden rounded-2xl border-[3px] border-art-ink p-5 transition-colors duration-500 ${p.bg} ${p.text}`} style={{ boxShadow: "8px 8px 0 0 var(--color-art-ink)" }}>
        <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full ${p.accent} opacity-90 transition-colors duration-500`} />
        <div className={`absolute -bottom-6 left-6 h-20 w-20 rotate-12 rounded-2xl ${p.chip} transition-colors duration-500`} />
        <p className="relative text-[10px] font-bold uppercase tracking-[0.3em]">Grand Opening</p>
        <p className={`${serif} relative mt-3 text-4xl font-bold leading-[0.95]`}>Kopi<br />Lembur</p>
        <p className={`${hand} relative mt-2 text-xl`}>rasa garut, gaya kekinian</p>
        <span className={`relative mt-5 inline-block rounded-full px-3 py-1 text-[10px] font-bold ${p.chip} text-art-ink transition-colors duration-500`}>Diskon 20% minggu ini</span>
        <p className="absolute bottom-4 right-5 text-[10px] font-bold">@kopilembur</p>
      </div>
      <div className="mt-7 flex items-center justify-center gap-2" role="radiogroup" aria-label="Pilih palet warna">
        {palettes.map((x) => (
          <button
            key={x.id}
            type="button"
            role="radio"
            aria-checked={pid === x.id}
            aria-label={`Palet ${x.name}`}
            onClick={() => setPid(x.id)}
            className={`flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1 text-[11px] font-bold transition-transform ${pid === x.id ? "-translate-y-0.5 border-art-ink bg-card" : "border-transparent bg-card/60 hover:border-art-ink/30"}`}
          >
            <span className={`h-3.5 w-3.5 rounded-full border border-art-ink ${x.bg}`} />
            {x.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DesignCreativePage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="bg-art-cream pb-14 text-art-ink">
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-16 pt-12">
          <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-art-amber/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-art-coral/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[1.15fr_1fr]">
            <div>
              <p className={`${hand} text-2xl text-art-coral sm:text-3xl`}>brand-mu kurang nempel?</p>
              <h1 className="mt-2 text-[36px] font-extrabold leading-[1.05] tracking-tight sm:text-[54px]">
                Biar brand-mu <span className="relative whitespace-nowrap"><span className="relative z-10">gampang</span><span className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 rounded bg-art-amber/70" /></span> diingat.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-art-ink/75 sm:text-base">
                Design Creative Nempo — branding, konten visual, foto & video, desain event, sampai merchandise. Materi visual yang selaras dengan karakter dan tujuan brand.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker inline-flex items-center gap-2 rounded-full border-2 border-art-ink bg-art-ink px-7 py-3.5 text-sm font-bold text-art-cream">
                  Konsultasi Gratis <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#layanan" className="rounded-full border-2 border-art-ink bg-card px-7 py-3.5 text-sm font-bold">Lihat Layanan</a>
              </div>
            </div>
            <div className="py-6">
              <PosterPlayground />
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="-rotate-1 overflow-hidden border-y-[3px] border-art-ink bg-art-amber py-3" aria-hidden>
          <div className="wed-marquee flex w-max items-center gap-8 text-sm font-extrabold uppercase tracking-wide">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-8">{item}<span className="text-art-cream">✦</span></span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-5">
          {/* Services */}
          <section id="layanan" className="scroll-mt-20 pt-16">
            <SectionHead eyebrow="Layanan" title="Apa yang bisa kami buat" note="dari logo sampai kaos panitia" />
            <div className="grid gap-4 sm:grid-cols-3">
              {DESIGN_SERVICES.map((s, i) => {
                const Icon = serviceIcons[s.id] ?? PenTool;
                return (
                  <div key={s.id} className={`wed-card-pop rounded-2xl border-[3px] border-art-ink bg-card p-5 ${i % 2 ? "sm:rotate-1" : "sm:-rotate-1"}`} style={{ boxShadow: "5px 5px 0 0 var(--color-art-ink)" }}>
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl border-[2.5px] border-art-ink ${serviceTones[i]} text-art-cream`}>
                      <Icon className="h-6 w-6" strokeWidth={2.3} />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold">{s.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-art-ink/65">{s.desc}</p>
                    <ul className="mt-3 space-y-1.5 border-t-2 border-dashed border-art-ink/15 pt-3">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-[13px]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-art-coral" strokeWidth={3} /> {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Photo + process */}
          <section className="grid items-center gap-8 pt-16 sm:grid-cols-[0.9fr_1.1fr]">
            <figure className="relative -rotate-2 overflow-hidden rounded-2xl border-[3px] border-art-ink" style={{ boxShadow: "8px 8px 0 0 var(--color-art-coral)" }}>
              <img src="/images/nempo-about-creative.webp" alt="Tim kreatif Nempo merancang ide bersama" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <figcaption className={`${hand} absolute bottom-3 left-3 rounded-full bg-art-cream px-3 text-lg`}>tim kreatif nempo</figcaption>
            </figure>
            <div>
              <SectionHead eyebrow="Cara Kerja" title="Ngobrol dulu, baru gambar" note="biar hasilnya kena" />
              <ol className="space-y-3">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4 rounded-2xl bg-card p-4">
                    <span className={`${serif} flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-art-ink bg-art-amber text-lg font-bold`}>{i + 1}</span>
                    <div>
                      <h3 className="text-sm font-extrabold">{s.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-art-ink/65">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Pricing note + related */}
          <section id="harga" className="scroll-mt-20 pt-16">
            <SectionHead eyebrow="Harga" title="Harga sesuai brief" note="konsultasinya gratis kok" />
            <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
              <div className="relative overflow-hidden rounded-2xl border-[3px] border-art-ink bg-art-ink p-6 text-art-cream" style={{ boxShadow: "6px 6px 0 0 var(--color-art-amber)" }}>
                <p className={`${hand} text-xl text-art-amber`}>gimana hitungannya?</p>
                <h3 className="text-xl font-extrabold">Penawaran dibuat per kebutuhan</h3>
                <p className="mt-2 text-sm leading-relaxed text-art-cream/75">Setiap desain beda kebutuhan — jenis materi, jumlah, dan kerumitannya. Kirim brief-mu, tim Nempo akan mengirim penawaran yang jelas sebelum mulai.</p>
                <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker mt-5 inline-flex items-center gap-2 rounded-full bg-art-amber px-6 py-3 text-sm font-bold text-art-ink">
                  Kirim Brief <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-art-ink/30 bg-card p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-art-coral">Sudah ada harga pasti</p>
                <ul className="mt-3 divide-y-2 divide-dashed divide-art-ink/10">
                  {DESIGN_RELATED.map((r) => (
                    <li key={r.id}>
                      <Link href={r.href} className="group flex items-center justify-between gap-3 py-3">
                        <span>
                          <span className="block text-sm font-extrabold group-hover:text-art-coral">{r.title}</span>
                          <span className="text-[11px] text-art-ink/55">{r.prefix ? `${r.prefix} ` : ""}{designRupiah(r.price)} · {r.unit}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="pt-16">
            <SectionHead eyebrow="FAQ" title="Pertanyaan umum" note="biar makin mantap" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-2xl border-2 bg-card ${open === i ? "border-art-ink" : "border-dashed border-art-ink/25"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-bold">
                    {f.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-art-coral transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-art-ink/70">{f.a}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-16">
            <div className="relative overflow-hidden rounded-3xl border-[3px] border-art-ink bg-art-coral p-8 text-center text-art-cream" style={{ boxShadow: "8px 8px 0 0 var(--color-art-ink)" }}>
              <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-art-amber/60" />
              <div className="absolute -bottom-10 -right-6 h-32 w-32 rotate-12 rounded-3xl bg-art-plum/50" />
              <p className={`${hand} relative text-2xl`}>ide udah ada, tinggal dieksekusi</p>
              <h2 className={`${serif} relative mt-1 text-3xl font-bold`}>Yuk, bikin visual yang nempel di kepala</h2>
              <p className="relative mx-auto mt-2 max-w-sm text-sm text-art-cream/85">Chat tim Nempo lewat Instagram dan ceritakan kebutuhan desainmu.</p>
              <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker relative mt-6 inline-flex items-center gap-2 rounded-full bg-art-ink px-7 py-3.5 text-sm font-bold">
                Chat via Instagram <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-art-coral">{eyebrow}</p>
      <h2 className="mt-1 text-[26px] font-extrabold leading-tight">{title}</h2>
      {note && <p className={`${hand} mt-0.5 text-xl text-art-amber`}>{note}</p>}
    </div>
  );
}
