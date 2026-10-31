import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";
import {
  ArrowRight, Check, ChevronDown, Plus, LayoutDashboard, ReceiptText, Boxes, Users,
  Coffee, Store, BedDouble, CalendarCheck, NotebookPen, PackageX, UserMinus, Sparkles,
} from "lucide-react";
import {
  BIZ_GROUPS, BIZ_MODULES, SUPER_APP_MAX_MODULES, bizRupiah, modulesMonthlyTotal, superAppPlan, superAppSuggestion, type BizGroup,
} from "@/data/business-system";
import { WEB_PLANS, firstMonthTotal, monthlySaving } from "@/data/web-development";

const hand = "font-[family-name:var(--font-wed-hand)]";
const mono = "font-mono";

const groupIcons: Record<BizGroup, React.ElementType> = {
  "Penjualan & Pelanggan": ReceiptText,
  "Operasional & Stok": Boxes,
  "Keuangan & Tim": Users,
};

const pains = [
  { icon: NotebookPen, pain: "Catatan penjualan masih di buku", fix: "Kasir & laporan harian otomatis" },
  { icon: PackageX, pain: "Stok sering selisih atau tiba-tiba habis", fix: "Dapur Stock & Gudang dengan peringatan stok" },
  { icon: UserMinus, pain: "Pelanggan datang sekali lalu hilang", fix: "CRM & Loyalty biar mereka kembali" },
];

const fits = [
  { icon: Coffee, title: "Cafe & F&B", mods: "Kasir · QR Menu · Dapur Stock · Resep · HPP" },
  { icon: Store, title: "Toko & Retail", mods: "Kasir · Gudang · Pembelian & Supplier · Invoice" },
  { icon: BedDouble, title: "Penginapan & Wisata", mods: "Booking & Reservasi · CRM · Link Bio · Marketing" },
  { icon: CalendarCheck, title: "Layanan & Jasa", mods: "Sistem Antrian · Booking · Loyalty · HR" },
];

const steps = [
  { title: "Konsultasi", desc: "Ceritakan alur usahamu, kami bantu pilih modul yang benar-benar dibutuhkan." },
  { title: "Setup awal", desc: "Tampilan, data awal, dan alur kerja disiapkan oleh tim Nempo." },
  { title: "Pendampingan", desc: "Tim kamu dibimbing sampai terbiasa memakai sistemnya." },
  { title: "Tumbuh bareng", desc: "Tambah modul kapan saja saat usaha berkembang." },
];

const faqs = [
  { q: "Bisa mulai dari satu modul saja?", a: "Bisa. Semua modul bisa diambil satuan per bulan, misalnya hanya QR Menu atau Kasir, lalu ditambah nanti." },
  { q: "Apa itu Business Super App?", a: `Satu ruang kerja yang menyatukan hingga ${SUPER_APP_MAX_MODULES} modul dalam satu dashboard yang saling terhubung, ${bizRupiah(superAppPlan().price)}/bulan dengan setup sekali bayar ${bizRupiah(superAppPlan().setup)}.` },
  { q: "Ada biaya setup?", a: "Paket bulanan punya biaya setup sekali bayar untuk menyiapkan tampilan dan alur kerja awal. Besarnya tertera di setiap paket." },
  { q: "Perlu install aplikasi atau komputer khusus?", a: "Tidak perlu. Sistem berbasis web, bisa dibuka dari HP, tablet, atau laptop." },
];

/* Dashboard contoh di hero */
function DashboardMockup() {
  const side = ["Dashboard", "Kasir", "Stok", "Pelanggan", "Laporan"];
  return (
    <div className="relative">
      <span className={`${hand} wed-wiggle absolute -top-7 right-4 z-10 rotate-3 rounded-full bg-biz-amber px-3 py-0.5 text-lg text-biz-ink`}>semua nyambung!</span>
      <div className="overflow-hidden rounded-2xl border-[3px] border-biz-ink bg-card text-biz-ink" style={{ boxShadow: "8px 8px 0 0 var(--color-biz-amber)" }}>
        <div className="flex">
          <aside className="hidden w-28 shrink-0 space-y-1 bg-biz-ink p-3 text-[10px] text-primary-foreground sm:block">
            <p className="mb-3 font-extrabold">Digi Nempo</p>
            {side.map((s, i) => (
              <p key={s} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-biz-teal font-bold" : "opacity-70"}`}>{s}</p>
            ))}
          </aside>
          <div className="flex-1 space-y-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold">Hari ini</p>
              <span className={`${mono} rounded-full bg-biz-mint px-2 py-0.5 text-[9px] font-bold text-biz-teal`}>contoh data</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[["Penjualan", "Rp2,4jt"], ["Transaksi", "86"], ["Pelanggan kembali", "31%"]].map(([l, v]) => (
                <div key={l} className="rounded-xl bg-biz-paper p-2.5">
                  <p className="text-[9px] text-biz-ink/60">{l}</p>
                  <p className="text-sm font-extrabold">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex h-20 items-end gap-1.5 rounded-xl bg-biz-paper p-2.5">
              {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                <span key={i} className={`flex-1 rounded-t ${i === 5 ? "bg-biz-amber" : "bg-biz-teal/70"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-biz-amber/60 p-2 text-[10px]">
              <PackageX className="h-3.5 w-3.5 text-biz-amber" /> Stok susu tinggal 3 liter — waktunya belanja
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessSystemPage() {
  const [group, setGroup] = useState<BizGroup>("Penjualan & Pelanggan");
  const [picked, setPicked] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const total = modulesMonthlyTotal(picked);
  const suggestion = superAppSuggestion(picked);
  const superApp = superAppPlan();
  const shown = BIZ_MODULES.filter((m) => m.group === group);

  return (
    <Layout>
      <div className="bg-biz-paper pb-14 text-biz-ink">
        {/* Hero */}
        <section className="relative overflow-hidden bg-biz-teal px-5 pb-16 pt-12 text-primary-foreground">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-biz-ink/30 blur-3xl" />
          <div className="relative mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[1.05fr_1fr]">
            <div>
              <p className={`${hand} text-2xl text-biz-amber sm:text-3xl`}>usaha makin ramai, makin ribet?</p>
              <h1 className="mt-2 text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                Semua urusan usaha,<br /><span className="text-biz-amber">satu dashboard.</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                Business System Nempo — kasir, stok, pelanggan, sampai keuangan dan tim dalam sistem berbasis web yang saling terhubung.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#hitung" className="wed-sticker inline-flex items-center gap-2 rounded-full bg-biz-amber px-7 py-3.5 text-sm font-bold text-biz-ink">
                  Hitung Kebutuhan <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#paket" className="rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-7 py-3.5 text-sm font-bold">Lihat Paket</a>
              </div>
              <p className={`${mono} mt-5 text-[11px] text-primary-foreground/70`}>
                {BIZ_MODULES.length} modul · mulai {bizRupiah(Math.min(...BIZ_MODULES.map((m) => m.price)))}/bulan
              </p>
            </div>
            <div className="py-6">
              <DashboardMockup />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5">
          {/* Pains */}
          <section className="pt-14">
            <SectionHead eyebrow="Kenal masalahnya?" title="Dari repot jadi rapi" note="ini yang biasanya kejadian" />
            <div className="grid gap-3 sm:grid-cols-3">
              {pains.map((p) => (
                <div key={p.pain} className="wed-card-pop rounded-2xl border-2 border-dashed border-biz-ink/20 bg-card p-5">
                  <p.icon className="h-7 w-7 text-biz-amber" strokeWidth={2.2} />
                  <p className="mt-3 text-sm font-bold text-biz-ink/50 line-through decoration-biz-amber decoration-2">{p.pain}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm font-extrabold">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-biz-teal" strokeWidth={3} /> {p.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Modules + calculator */}
          <section id="hitung" className="scroll-mt-20 pt-16">
            <SectionHead eyebrow="Modul" title="Pilih modul yang kamu butuhkan" note="tap buat masuk hitungan" />
            <div className="mb-5 flex flex-wrap gap-2" role="tablist">
              {BIZ_GROUPS.map((g) => {
                const Icon = groupIcons[g];
                return (
                  <button
                    key={g}
                    type="button"
                    role="tab"
                    aria-selected={group === g}
                    onClick={() => setGroup(g)}
                    className={`inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-xs font-bold transition-colors ${group === g ? "border-biz-ink bg-biz-ink text-primary-foreground" : "border-biz-ink/15 bg-card hover:border-biz-ink/40"}`}
                  >
                    <Icon className="h-3.5 w-3.5" /> {g}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <div className="grid gap-3 sm:grid-cols-2">
                {shown.map((m) => {
                  const on = picked.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggle(m.id)}
                      aria-pressed={on}
                      className={`wed-card-pop flex flex-col rounded-2xl border-[3px] p-4 text-left transition-colors ${on ? "border-biz-teal bg-biz-mint" : "border-biz-ink/10 bg-card hover:border-biz-ink/30"}`}
                    >
                      <span className="flex w-full items-start justify-between gap-2">
                        <span className="text-sm font-extrabold">{m.name}</span>
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${on ? "bg-biz-teal text-primary-foreground" : "bg-biz-paper text-biz-ink"}`}>
                          {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Plus className="h-3.5 w-3.5" strokeWidth={3} />}
                        </span>
                      </span>
                      <span className="mt-1 text-[11px] leading-relaxed text-biz-ink/65">{m.desc}</span>
                      <span className="mt-2 flex flex-wrap gap-1">
                        {m.features.map((f) => <span key={f} className="rounded-full bg-biz-paper px-2 py-0.5 text-[10px] font-semibold">{f}</span>)}
                      </span>
                      <span className={`${mono} mt-3 text-xs font-bold text-biz-teal`}>{bizRupiah(m.price)}/bulan</span>
                    </button>
                  );
                })}
              </div>

              <aside className="h-fit rounded-2xl bg-biz-ink p-5 text-primary-foreground lg:sticky lg:top-24">
                <p className={`${hand} text-xl text-biz-amber`}>hitungan kamu</p>
                {picked.length === 0 ? (
                  <p className="mt-2 text-sm text-primary-foreground/70">Belum ada modul dipilih. Tap kartu modul di samping untuk mulai menghitung.</p>
                ) : (
                  <>
                    <ul className="mt-3 space-y-1.5 text-xs">
                      {picked.map((id) => {
                        const m = BIZ_MODULES.find((x) => x.id === id)!;
                        return (
                          <li key={id} className="flex justify-between gap-2">
                            <span>{m.name}</span>
                            <span className={mono}>{bizRupiah(m.price)}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-3 flex items-end justify-between border-t border-dashed border-primary-foreground/25 pt-3">
                      <span className="text-xs text-primary-foreground/70">{picked.length} modul satuan</span>
                      <span className="text-xl font-extrabold">{bizRupiah(total)}<span className="text-xs font-semibold opacity-70">/bln</span></span>
                    </div>
                    {suggestion.suggest ? (
                      <div className="mt-4 rounded-xl bg-biz-amber p-3 text-biz-ink">
                        <p className="flex items-center gap-1.5 text-xs font-extrabold"><Sparkles className="h-3.5 w-3.5" /> Lebih hemat pakai Super App</p>
                        <p className="mt-1 text-[11px]">
                          {bizRupiah(superApp.price)}/bulan untuk hingga {SUPER_APP_MAX_MODULES} modul — hemat {bizRupiah(suggestion.saving)}/bulan, semua dalam satu dashboard.
                        </p>
                      </div>
                    ) : (
                      <p className="mt-4 text-[11px] text-primary-foreground/60">Ambil satuan dulu, tambah modul kapan saja.</p>
                    )}
                    <button type="button" onClick={() => setPicked([])} className="mt-3 text-[11px] font-bold text-biz-amber underline-offset-2 hover:underline">
                      Reset pilihan
                    </button>
                  </>
                )}
                <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker mt-5 flex items-center justify-center gap-2 rounded-full bg-biz-teal py-3 text-sm font-bold">
                  Konsultasi Modul <ArrowRight className="h-4 w-4" />
                </a>
              </aside>
            </div>
          </section>

          {/* Packages */}
          <section id="paket" className="scroll-mt-20 pt-16">
            <SectionHead eyebrow="Paket" title="Paket bulanan, harga promo" note="setup sekali, lanjut jalan" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {WEB_PLANS.map((p) => (
                <div
                  key={p.id}
                  className={`wed-card-pop relative flex flex-col rounded-2xl border-[3px] p-5 ${p.featured ? "border-biz-ink bg-biz-ink text-primary-foreground" : "border-biz-ink/10 bg-card"}`}
                  style={p.featured ? { boxShadow: "5px 5px 0 0 var(--color-biz-amber)" } : undefined}
                >
                  {p.id === "super-app" && <LayoutDashboard className="absolute right-4 top-4 h-5 w-5 text-biz-teal" />}
                  <p className={`${mono} text-[10px] font-bold uppercase tracking-wider ${p.featured ? "text-biz-amber" : "text-biz-teal"}`}>{p.eyebrow}</p>
                  <h3 className="mt-1 text-lg font-extrabold">{p.name}</h3>
                  <p className={`mt-3 text-xs line-through ${p.featured ? "text-primary-foreground/50" : "text-biz-ink/45"}`}>{bizRupiah(p.regularPrice)}</p>
                  <p className="text-2xl font-extrabold">{bizRupiah(p.price)}<span className="text-xs font-semibold opacity-70"> /bulan</span></p>
                  <span className={`${mono} mt-1 w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${p.featured ? "bg-biz-amber text-biz-ink" : "bg-biz-mint text-biz-teal"}`}>hemat {bizRupiah(monthlySaving(p))}/bln</span>
                  <ul className="mt-4 flex-1 space-y-1.5">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-xs">
                        <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${p.featured ? "text-biz-amber" : "text-biz-teal"}`} strokeWidth={3} /> {it}
                      </li>
                    ))}
                  </ul>
                  <div className={`mt-4 rounded-xl p-3 text-[11px] ${p.featured ? "bg-primary-foreground/10" : "bg-biz-paper"}`}>
                    <p>Setup <b>{bizRupiah(p.setup)}</b> <span className="line-through opacity-60">{bizRupiah(p.setupRegular)}</span></p>
                    <p className="mt-0.5">Bulan pertama <b>{bizRupiah(firstMonthTotal(p))}</b></p>
                  </div>
                  <p className={`mt-3 text-[11px] ${p.featured ? "text-primary-foreground/70" : "text-biz-ink/55"}`}>{p.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fits */}
          <section className="pt-16">
            <SectionHead eyebrow="Cocok untuk" title="Usaha apa saja bisa" note="contoh racikan modulnya" />
            <div className="grid gap-3 sm:grid-cols-4">
              {fits.map((f) => (
                <div key={f.title} className="rounded-2xl bg-card p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-biz-mint text-biz-teal"><f.icon className="h-5 w-5" /></span>
                  <h3 className="mt-3 text-sm font-extrabold">{f.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-biz-ink/60">{f.mods}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="pt-16">
            <SectionHead eyebrow="Cara Mulai" title="Kami temani sampai jalan" note="gak dilepas begitu aja" />
            <ol className="grid gap-3 sm:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border-2 border-dashed border-biz-ink/20 bg-card p-5">
                  <span className={`${mono} text-xs font-bold text-biz-teal`}>langkah {i + 1}</span>
                  <h3 className="mt-1 text-sm font-extrabold">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-biz-ink/65">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="pt-16">
            <SectionHead eyebrow="FAQ" title="Pertanyaan umum" note="biar makin yakin" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-2xl border-2 bg-card ${open === i ? "border-biz-ink" : "border-dashed border-biz-ink/20"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-bold">
                    {f.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-biz-teal transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-biz-ink/70">{f.a}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-16">
            <div className="relative overflow-hidden rounded-3xl bg-biz-ink p-8 text-center text-primary-foreground" style={{ boxShadow: "8px 8px 0 0 var(--color-biz-teal)" }}>
              <p className={`${hand} text-2xl text-biz-amber`}>waktunya naik kelas</p>
              <h2 className="mt-1 text-3xl font-extrabold">Bikin usahamu lebih rapi mulai bulan ini</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-primary-foreground/75">Konsultasi gratis — kami bantu pilih modul atau paket yang paling pas.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker inline-flex items-center gap-2 rounded-full bg-biz-amber px-7 py-3.5 text-sm font-bold text-biz-ink">
                  Chat via Instagram <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/web-development" className="inline-flex items-center rounded-full border-2 border-primary-foreground/40 px-6 py-3.5 text-sm font-bold">
                  Butuh website juga?
                </Link>
              </div>
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
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-biz-teal">{eyebrow}</p>
      <h2 className="mt-1 text-[26px] font-extrabold leading-tight">{title}</h2>
      {note && <p className={`${hand} mt-0.5 text-xl text-biz-amber`}>{note}</p>}
    </div>
  );
}
