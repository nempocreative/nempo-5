import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";
import { ArrowRight, Check, ChevronDown, Globe2, Link2, Ticket, MousePointer2 } from "lucide-react";
import { WEB_PLANS, WEB_PROJECTS, firstMonthTotal, monthlySaving, webRupiah } from "@/data/web-development";
import { BIZ_MODULES } from "@/data/business-system";

const mono = "font-mono";
const hand = "font-[family-name:var(--font-wed-hand)]";

const projectIcons: Record<string, React.ElementType> = { company: Globe2, "link-bio": Link2, ticketing: Ticket };

const steps = [
  { code: "brief()", title: "Ngobrol kebutuhan", desc: "Ceritakan usaha, target pengunjung, dan fitur yang dibutuhkan." },
  { code: "design()", title: "Rancang tampilan", desc: "Kami susun struktur halaman dan tampilan sesuai karakter brand." },
  { code: "build()", title: "Bangun website", desc: "Tim Nempo mengembangkan website dan menyambungkan fiturnya." },
  { code: "review()", title: "Cek bareng", desc: "Kamu coba dulu, kami rapikan bagian yang perlu disesuaikan." },
  { code: "launch()", title: "Online!", desc: "Website tayang dan siap dibagikan ke pelanggan." },
];

const faqs = [
  { q: "Berapa biaya bikin Company Website?", a: "Company Website Rp1.500.000 sekali buat, sudah termasuk profil usaha, portofolio, dan form kontak." },
  { q: "Apa beda website dan sistem bisnis bulanan?", a: "Website adalah halaman untuk dikenal pelanggan. Sistem bisnis (kasir, stok, CRM, dll.) dipakai tiap hari untuk operasional, dengan biaya bulanan plus setup sekali bayar." },
  { q: "Bisa mulai kecil lalu tambah fitur?", a: "Bisa. Mulai dari satu layanan atau paket ringan, lalu tambah modul saat usaha berkembang." },
  { q: "Bisa pakai domain sendiri atau fitur khusus?", a: "Bisa dikonsultasikan. Kebutuhan khusus dibahas langsung dengan tim Nempo sebelum pengerjaan." },
];

const tickerItems = ["Company Website", "Link Bio", "Tiket Event", "Kasir", "QR Menu", "Booking", "CRM", "Super App", "Garut • Jawa Barat"];

type Sample = "company" | "link-bio" | "ticketing";
const samples: { id: Sample; label: string; url: string }[] = [
  { id: "company", label: "Company", url: "usahakamu.id" },
  { id: "link-bio", label: "Link Bio", url: "usahakamu.id/links" },
  { id: "ticketing", label: "Tiket", url: "usahakamu.id/event" },
];

/* Jendela browser mini — ganti contoh website */
function BrowserMockup() {
  const [sample, setSample] = useState<Sample>("company");
  const current = samples.find((s) => s.id === sample)!;
  return (
    <div className="relative">
      <span className={`${hand} wed-wiggle absolute -top-7 right-2 z-10 rotate-6 rounded-full bg-dev-lime px-3 py-0.5 text-lg text-dev-ink`}>klik tab-nya!</span>
      <div className="overflow-hidden rounded-2xl border-[3px] border-dev-ink bg-card" style={{ boxShadow: "8px 8px 0 0 var(--color-dev-sky)" }}>
        <div className="flex items-center gap-2 border-b-[3px] border-dev-ink bg-dev-paper px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-dot-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
          <span className="h-2.5 w-2.5 rounded-full bg-dev-lime" />
          <span className={`${mono} ml-2 flex-1 truncate rounded-md bg-card px-2 py-0.5 text-[10px] text-dev-ink/70`}>https://{current.url}</span>
        </div>
        <div className="flex border-b-2 border-dashed border-dev-ink/15" role="tablist">
          {samples.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={sample === s.id}
              onClick={() => setSample(s.id)}
              className={`${mono} flex-1 py-2 text-[11px] font-bold transition-colors ${sample === s.id ? "bg-dev-ink text-primary-foreground" : "text-dev-ink/60 hover:bg-dev-paper"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="h-[230px] p-4 text-dev-ink">
          {sample === "company" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="h-3 w-16 rounded bg-dev-ink" />
                <span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2 w-8 rounded bg-dev-ink/20" />)}</span>
              </div>
              <div className="rounded-xl bg-dev-sky/15 p-4">
                <span className="block h-4 w-3/4 rounded bg-dev-ink" />
                <span className="mt-2 block h-2 w-1/2 rounded bg-dev-ink/30" />
                <span className="mt-3 inline-block rounded-full bg-dev-sky px-3 py-1 text-[9px] font-bold text-primary-foreground">Hubungi Kami</span>
              </div>
              <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <span key={i} className="h-14 rounded-lg bg-dev-paper" />)}</div>
            </div>
          )}
          {sample === "link-bio" && (
            <div className="mx-auto flex max-w-[200px] flex-col items-center gap-2">
              <span className="h-12 w-12 rounded-full border-[3px] border-dev-ink bg-dev-lime" />
              <span className="h-2.5 w-20 rounded bg-dev-ink" />
              {["WhatsApp", "Instagram", "Katalog", "Lokasi"].map((l) => (
                <span key={l} className="w-full rounded-full border-2 border-dev-ink py-1.5 text-center text-[10px] font-bold">{l}</span>
              ))}
            </div>
          )}
          {sample === "ticketing" && (
            <div className="space-y-3">
              <div className="rounded-xl bg-dev-ink p-3 text-primary-foreground">
                <p className="text-[9px] uppercase tracking-widest opacity-70">Festival</p>
                <p className="text-sm font-extrabold">Garut Music Night</p>
              </div>
              {[["Presale", "tersedia"], ["Reguler", "tersedia"], ["VIP", "sisa sedikit"]].map(([t, s]) => (
                <div key={t} className="flex items-center justify-between rounded-lg border-2 border-dashed border-dev-ink/20 px-3 py-1.5 text-[11px]">
                  <span className="font-bold">{t}</span>
                  <span className={`${mono} text-[9px] text-dev-ink/60`}>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <MousePointer2 className="wed-float absolute -bottom-4 left-6 h-7 w-7 fill-dev-lime text-dev-ink" aria-hidden />
    </div>
  );
}

export default function WebDevelopmentPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="bg-dev-paper pb-14 text-dev-ink">
        {/* Hero */}
        <section className="dev-grid-bg relative overflow-hidden bg-dev-ink px-5 pb-16 pt-12 text-primary-foreground">
          <div className="relative mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[1.1fr_1fr]">
            <div>
              <p className={`${mono} text-xs text-dev-lime`}>&lt;web-development /&gt;</p>
              <p className={`${hand} mt-2 text-2xl text-dev-sky sm:text-3xl`}>usahamu belum punya website?</p>
              <h1 className="mt-2 text-[34px] font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                Website yang <span className="bg-dev-lime px-1.5 text-dev-ink">kerja</span>,<br />
                bukan cuma pajangan.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/75">
                Tim Nempo membangun company website, link bio, website tiket event, sampai sistem bisnis berbasis web — dibuat sesuai kebutuhan usahamu.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#layanan" className="wed-sticker rounded-full bg-dev-sky px-7 py-3.5 text-sm font-bold text-primary-foreground">Lihat Harga</a>
                <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-7 py-3.5 text-sm font-bold">
                  Konsultasi Gratis
                </a>
              </div>
              <p className={`${mono} mt-5 text-[11px] text-primary-foreground/60`}>
                website mulai <span className="text-dev-lime">{webRupiah(49_000)}/bulan</span> · company website <span className="text-dev-lime">{webRupiah(1_500_000)}</span>
              </p>
            </div>
            <div className="py-6 sm:pl-4">
              <BrowserMockup />
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="overflow-hidden border-y-[3px] border-dev-ink bg-dev-lime py-2.5" aria-hidden>
          <div className={`wed-marquee flex w-max items-center gap-6 ${mono} text-xs font-bold`}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center gap-6">{item}<span>/</span></span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-5">
          {/* Projects */}
          <section id="layanan" className="scroll-mt-20 pt-14">
            <SectionHead tag="01" eyebrow="Website" title="Pilih website yang kamu butuhkan" note="harga jelas dari awal" />
            <div className="grid gap-4 sm:grid-cols-3">
              {WEB_PROJECTS.map((p, i) => {
                const Icon = projectIcons[p.id] ?? Globe2;
                const featured = i === 0;
                return (
                  <div
                    key={p.id}
                    className={`wed-card-pop relative flex flex-col rounded-2xl border-[3px] border-dev-ink p-5 ${featured ? "bg-dev-ink text-primary-foreground" : "bg-card"}`}
                    style={{ boxShadow: `5px 5px 0 0 var(--color-${featured ? "dev-lime" : "dev-ink"})` }}
                  >
                    {featured && <span className={`${mono} wed-wiggle absolute -top-3 right-3 rounded-full bg-dev-lime px-2.5 py-0.5 text-[10px] font-bold text-dev-ink`}>favorit</span>}
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 ${featured ? "border-dev-lime bg-dev-lime text-dev-ink" : "border-dev-ink bg-dev-sky/15 text-dev-ink"}`}>
                      <Icon className="h-5 w-5" strokeWidth={2.4} />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold">{p.name}</h3>
                    <p className={`mt-1 text-xs leading-relaxed ${featured ? "text-primary-foreground/70" : "text-dev-ink/65"}`}>{p.detail}</p>
                    <p className="mt-4 text-2xl font-extrabold">{webRupiah(p.price)}</p>
                    <p className={`${mono} text-[11px] ${featured ? "text-dev-lime" : "text-dev-sky"}`}>{p.billing}</p>
                    <ul className="mt-4 flex-1 space-y-1.5 border-t-2 border-dashed border-current/20 pt-4">
                      {p.items.map((it) => (
                        <li key={it} className="flex items-start gap-2 text-[13px]">
                          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? "text-dev-lime" : "text-dev-sky"}`} strokeWidth={3} /> {it}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={NEMPO_INSTAGRAM_DM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-5 block rounded-full border-2 border-dev-ink py-2.5 text-center text-sm font-bold ${featured ? "bg-dev-lime text-dev-ink" : "bg-dev-ink text-primary-foreground"}`}
                    >
                      Pesan {p.name}
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Process */}
          <section className="pt-16">
            <SectionHead tag="02" eyebrow="Cara Kerja" title="Dari obrolan sampai online" note="kamu tinggal terima jadi" />
            <ol className="relative grid gap-3 sm:grid-cols-5">
              {steps.map((s, i) => (
                <li key={s.code} className="rounded-2xl border-2 border-dashed border-dev-ink/25 bg-card p-4">
                  <span className={`${mono} text-[11px] font-bold text-dev-sky`}>{String(i + 1).padStart(2, "0")}. {s.code}</span>
                  <h3 className="mt-2 text-sm font-extrabold">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-dev-ink/65">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Plans */}
          <section id="sistem" className="scroll-mt-20 pt-16">
            <SectionHead tag="03" eyebrow="Sistem Bisnis" title="Website untuk operasional harian" note="bayar bulanan, harga promo" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WEB_PLANS.map((p) => (
                <div
                  key={p.id}
                  className={`wed-card-pop relative flex flex-col rounded-2xl border-[3px] p-5 ${p.featured ? "border-dev-ink bg-dev-sky text-primary-foreground" : "border-dev-ink/15 bg-card"}`}
                  style={p.featured ? { boxShadow: "5px 5px 0 0 var(--color-dev-ink)" } : undefined}
                >
                  <p className={`${mono} text-[10px] font-bold uppercase tracking-wider ${p.featured ? "text-dev-lime" : "text-dev-sky"}`}>{p.eyebrow}</p>
                  <h3 className="mt-1 text-lg font-extrabold">{p.name}</h3>
                  <p className={`mt-3 text-xs line-through ${p.featured ? "text-primary-foreground/60" : "text-dev-ink/45"}`}>{webRupiah(p.regularPrice)}</p>
                  <p className="text-2xl font-extrabold">{webRupiah(p.price)}<span className="text-xs font-semibold opacity-70"> /bulan</span></p>
                  <span className={`${mono} mt-1 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${p.featured ? "bg-dev-ink text-dev-lime" : "bg-dev-lime text-dev-ink"}`}>
                    hemat {webRupiah(monthlySaving(p))}/bln
                  </span>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-xs">
                        <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${p.featured ? "text-dev-lime" : "text-dev-sky"}`} strokeWidth={3} /> {it}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-4 rounded-xl p-3 text-[11px] ${p.featured ? "bg-dev-ink/25" : "bg-dev-paper"}`}>
                    <p>Setup sekali bayar <b>{webRupiah(p.setup)}</b> <span className="line-through opacity-60">{webRupiah(p.setupRegular)}</span></p>
                    <p className="mt-0.5">Bulan pertama <b>{webRupiah(firstMonthTotal(p))}</b></p>
                  </div>
                  <p className={`mt-3 text-[11px] ${p.featured ? "text-primary-foreground/80" : "text-dev-ink/55"}`}>{p.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border-[3px] border-dev-ink bg-card p-5">
              <p className={`${mono} text-[11px] font-bold text-dev-sky`}>// atau ambil modul satuan</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BIZ_MODULES.map((m) => (
                  <span key={m.name} className="inline-flex items-center gap-1.5 rounded-full border-2 border-dashed border-dev-ink/25 px-3 py-1.5 text-xs">
                    <b>{m.name}</b> <span className={`${mono} text-[10px] text-dev-ink/60`}>{webRupiah(m.price)}/bln</span>
                  </span>
                ))}
              </div>
              <Link href="/business-system" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-dev-sky">
                Lihat semua sistem bisnis <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="pt-16">
            <SectionHead tag="04" eyebrow="FAQ" title="Pertanyaan umum" note="biar gak bingung" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-2xl border-2 bg-card ${open === i ? "border-dev-ink" : "border-dashed border-dev-ink/25"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-bold">
                    {f.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-dev-sky transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-dev-ink/70">{f.a}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-16">
            <div className="dev-grid-bg relative overflow-hidden rounded-3xl border-[3px] border-dev-ink bg-dev-ink p-8 text-center text-primary-foreground" style={{ boxShadow: "8px 8px 0 0 var(--color-dev-lime)" }}>
              <p className={`${mono} text-xs text-dev-lime`}>$ nempo --start-project</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight">Siap bikin usahamu online?</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-primary-foreground/75">Konsultasi gratis lewat Instagram — ceritakan kebutuhanmu, kami bantu pilih yang paling pas.</p>
              <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker mt-6 inline-flex items-center gap-2 rounded-full bg-dev-lime px-7 py-3.5 text-sm font-bold text-dev-ink">
                Chat via Instagram <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function SectionHead({ tag, eyebrow, title, note }: { tag: string; eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-6">
      <p className={`${mono} text-[11px] font-bold uppercase tracking-[0.15em] text-dev-sky`}>{tag} / {eyebrow}</p>
      <h2 className="mt-1 text-[24px] font-extrabold leading-tight">{title}</h2>
      {note && <p className={`${hand} mt-0.5 text-xl text-dev-ink/60`}>{note}</p>}
    </div>
  );
}
