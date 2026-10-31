import { useState } from "react";
import { Layout } from "@/components/layout";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";
import {
  Mic2, Guitar, Footprints, Music2, Sparkles, Drum, Clapperboard, Camera,
  Plus, Check, ArrowRight, ChevronDown, Copy, Star,
} from "lucide-react";
import stageImg from "@/assets/talent-stage.jpg";
import { EVENT_TYPES, TALENT_CATEGORIES, buildTalentRequestMessage, canSendTalentRequest } from "@/data/talent-management";

const hand = "font-[family-name:var(--font-wed-hand)]";
const serif = "font-[family-name:var(--font-wed-serif)]";

const icons: Record<string, React.ElementType> = {
  mc: Mic2, band: Guitar, penari: Footprints, vokalis: Music2, model: Sparkles, budaya: Drum, creator: Clapperboard, "foto-video": Camera,
};
const tones = ["bg-stage-gold", "bg-stage-red", "bg-stage-violet", "bg-stage-gold", "bg-stage-red", "bg-stage-violet", "bg-stage-gold", "bg-stage-red"];

const steps = [
  { title: "Ceritakan acaranya", desc: "Jenis acara, tanggal, lokasi, dan talent yang dibutuhkan." },
  { title: "Kami carikan talent", desc: "Tim Nempo mencocokkan talent yang pas dengan konsep dan budget." },
  { title: "Deal & jadwal", desc: "Rundown, durasi tampil, dan kebutuhan teknis disepakati bersama." },
  { title: "Tampil di hari-H", desc: "Talent hadir sesuai jadwal, tim kami ikut memantau." },
];

const faqs = [
  { q: "Berapa harga sewa talent?", a: "Tarif talent berbeda-beda tergantung jenis talent, durasi tampil, lokasi, dan tanggal acara. Kirim kebutuhanmu, nanti tim Nempo kirim penawarannya." },
  { q: "Bisa pesan beberapa talent sekaligus?", a: "Bisa. Misalnya MC + band + penari untuk satu acara — tinggal pilih di bagian racik line-up." },
  { q: "Ada talent untuk acara adat Sunda?", a: "Ada. Lengser, Ambu, kecapi suling, dan sinden disediakan melalui vendor rekanan Nempo." },
  { q: "Saya talent, bisa gabung?", a: "Bisa banget. Kirim portofolio lewat Instagram Nempo, tim kami akan menghubungi untuk proses seleksi." },
];

const marqueeItems = ["MC & Host", "Band", "Penari Jaipong", "Penyanyi", "Model", "Lengser & Ambu", "Content Creator", "Fotografer", "Garut • Jawa Barat"];

export default function TalentManagementPage() {
  const [eventType, setEventType] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  const request = { eventType, talentIds: picked, date, location, note };
  const message = buildTalentRequestMessage(request);
  const ready = canSendTalentRequest(request);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function send() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    window.open(NEMPO_INSTAGRAM_DM_URL, "_blank", "noopener,noreferrer");
  }

  return (
    <Layout>
      <div className="bg-stage-cream pb-14 text-stage-night">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-stage-night text-stage-cream">
          <img src={stageImg} alt="Penari, band, dan MC tampil di panggung acara" width={1600} height={1008} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stage-night via-stage-night/80 to-stage-night/20" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-stage-night to-transparent" />
          <div className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:pt-24">
            <p className={`${hand} text-2xl text-stage-gold sm:text-3xl`}>acaramu butuh siapa?</p>
            <h1 className={`${serif} mt-2 max-w-xl text-5xl font-bold leading-[1.02] sm:text-6xl`}>
              Panggungmu,<br /><span className="text-stage-gold">talent-nya</span> dari kami.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-stage-cream/80 sm:text-base">
              Talent Management Nempo — MC, band, penari, penyanyi, model, sampai seniman Sunda untuk acara di Garut dan Jawa Barat.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#lineup" className="wed-sticker inline-flex items-center gap-2 rounded-full bg-stage-gold px-7 py-3.5 text-sm font-bold text-stage-night">
                Racik Line-up <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#talent" className="rounded-full border border-stage-cream/40 bg-stage-cream/10 px-7 py-3.5 text-sm font-bold backdrop-blur">Lihat Talent</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["MC", "Band", "Penari", "Model"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-stage-gold/40 bg-stage-night/50 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
                  <Star className="h-3 w-3 fill-stage-gold text-stage-gold" /> {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden bg-stage-red py-3 text-stage-cream" aria-hidden>
          <div className="wed-marquee flex w-max items-center gap-8 text-sm font-bold uppercase tracking-wide">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-8">{item}<Star className="h-3 w-3 fill-stage-gold text-stage-gold" /></span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-5">
          {/* Categories */}
          <section id="talent" className="scroll-mt-20 pt-14">
            <SectionHead eyebrow="Talent" title="Siapa yang kamu butuhkan?" note="tap + buat masuk line-up" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TALENT_CATEGORIES.map((c, i) => {
                const Icon = icons[c.id] ?? Star;
                const on = picked.includes(c.id);
                return (
                  <div key={c.id} className={`wed-card-pop relative flex flex-col rounded-2xl border-[3px] p-4 transition-colors ${on ? "border-stage-night bg-stage-night text-stage-cream" : "border-stage-night/15 bg-card"}`}>
                    {/* ticket notch */}
                    <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-stage-cream" aria-hidden />
                    <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-stage-cream" aria-hidden />
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[i]} text-stage-cream`}>
                      <Icon className="h-5 w-5" strokeWidth={2.3} />
                    </span>
                    <h3 className="mt-3 text-sm font-extrabold">{c.name}</h3>
                    <p className={`mt-1 flex-1 text-[11px] leading-relaxed ${on ? "text-stage-cream/70" : "text-stage-night/60"}`}>{c.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1 border-t-2 border-dashed border-current/15 pt-3">
                      {c.examples.map((e) => (
                        <span key={e} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${on ? "bg-stage-cream/15" : "bg-stage-cream"}`}>{e}</span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(c.id)}
                      aria-pressed={on}
                      aria-label={`${on ? "Hapus" : "Tambah"} ${c.name} dari line-up`}
                      className={`mt-3 flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition-colors ${on ? "bg-stage-gold text-stage-night" : "bg-stage-night text-stage-cream hover:bg-stage-violet"}`}
                    >
                      {on ? <><Check className="h-3.5 w-3.5" strokeWidth={3} /> Di line-up</> : <><Plus className="h-3.5 w-3.5" strokeWidth={3} /> Line-up</>}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Line-up builder */}
          <section id="lineup" className="scroll-mt-20 pt-16">
            <SectionHead eyebrow="Racik Line-up" title="Susun kebutuhan acaramu" note="nanti kami carikan yang pas" />
            <div className="grid gap-5 sm:grid-cols-[1.2fr_1fr]">
              <div className="space-y-5 rounded-3xl border-[3px] border-stage-night bg-card p-5" style={{ boxShadow: "6px 6px 0 0 var(--color-stage-gold)" }}>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stage-red">1. Jenis acara</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {EVENT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setEventType(t)}
                        aria-pressed={eventType === t}
                        className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors ${eventType === t ? "border-stage-night bg-stage-night text-stage-cream" : "border-dashed border-stage-night/25 hover:border-stage-night/60"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stage-red">2. Talent</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {TALENT_CATEGORIES.map((c) => {
                      const on = picked.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggle(c.id)}
                          aria-pressed={on}
                          className={`inline-flex items-center gap-1 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors ${on ? "border-stage-gold bg-stage-gold text-stage-night" : "border-dashed border-stage-night/25 hover:border-stage-night/60"}`}
                        >
                          {on ? <Check className="h-3 w-3" strokeWidth={3} /> : <Plus className="h-3 w-3" strokeWidth={3} />} {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stage-red">
                    3. Tanggal
                    <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="cth. 14 Februari" maxLength={60} className="mt-1.5 w-full rounded-xl border-2 border-stage-night/15 bg-stage-cream px-3 py-2 text-sm font-medium normal-case tracking-normal text-stage-night outline-none focus:border-stage-night" />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wider text-stage-red">
                    4. Lokasi
                    <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="cth. Garut Kota" maxLength={80} className="mt-1.5 w-full rounded-xl border-2 border-stage-night/15 bg-stage-cream px-3 py-2 text-sm font-medium normal-case tracking-normal text-stage-night outline-none focus:border-stage-night" />
                  </label>
                </div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stage-red">
                  Catatan (opsional)
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={300} placeholder="cth. butuh band akustik 2 jam, MC bilingual" className="mt-1.5 w-full resize-none rounded-xl border-2 border-stage-night/15 bg-stage-cream px-3 py-2 text-sm font-medium normal-case tracking-normal text-stage-night outline-none focus:border-stage-night" />
                </label>
              </div>

              <div className="flex flex-col rounded-3xl bg-stage-night p-5 text-stage-cream">
                <p className={`${hand} text-xl text-stage-gold`}>pesanmu ke tim nempo</p>
                <pre className="mt-3 flex-1 whitespace-pre-wrap rounded-2xl bg-stage-cream/10 p-4 font-sans text-xs leading-relaxed">{message}</pre>
                <button
                  type="button"
                  onClick={send}
                  disabled={!ready}
                  className="wed-sticker mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-stage-gold px-6 py-3 text-sm font-bold text-stage-night disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Copy className="h-4 w-4" /> Salin & Chat via Instagram
                </button>
                <p className="mt-2 text-center text-[11px] text-stage-cream/60">
                  {ready ? (copied ? "Pesan tersalin — tinggal tempel di chat Instagram." : "Pesan akan disalin, lalu Instagram terbuka.") : "Pilih jenis acara dan minimal satu talent dulu."}
                </p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="pt-16">
            <SectionHead eyebrow="Cara Booking" title="4 langkah sampai tampil" note="santai, kami yang koordinasi" />
            <ol className="grid gap-3 sm:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl border-2 border-dashed border-stage-night/20 bg-card p-5">
                  <span className={`${serif} text-4xl font-bold text-stage-red/30`}>0{i + 1}</span>
                  <h3 className="mt-1 text-sm font-extrabold">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-stage-night/65">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Join */}
          <section className="pt-16">
            <div className="relative overflow-hidden rounded-3xl bg-stage-violet p-7 text-stage-cream sm:p-9">
              <Star className="wed-float absolute right-8 top-6 h-10 w-10 fill-stage-gold/70 text-stage-gold/70" aria-hidden />
              <Star className="wed-float-slow absolute bottom-6 right-24 h-6 w-6 fill-stage-cream/40 text-stage-cream/40" aria-hidden />
              <p className={`${hand} text-2xl text-stage-gold`}>kamu yang di atas panggung?</p>
              <h2 className={`${serif} mt-1 max-w-md text-3xl font-bold leading-tight`}>Gabung jadi talent Nempo</h2>
              <p className="mt-2 max-w-md text-sm text-stage-cream/80">MC, musisi, penari, model, atau creator — kirim portofolio dan dapatkan kesempatan tampil di acara yang dikelola Nempo.</p>
              <a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker mt-6 inline-flex items-center gap-2 rounded-full bg-stage-cream px-6 py-3 text-sm font-bold text-stage-violet">
                Kirim Portofolio <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="pt-16">
            <SectionHead eyebrow="FAQ" title="Pertanyaan umum" note="biar gak ragu" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-2xl border-2 bg-card ${open === i ? "border-stage-night" : "border-dashed border-stage-night/20"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-bold">
                    {f.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-stage-red transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-stage-night/70">{f.a}</p>}
                </div>
              ))}
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
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stage-red">{eyebrow}</p>
      <h2 className={`${serif} mt-1 text-3xl font-bold leading-tight`}>{title}</h2>
      {note && <p className={`${hand} mt-0.5 text-xl text-stage-violet`}>{note}</p>}
    </div>
  );
}
