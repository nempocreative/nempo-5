import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Heart, Check, ArrowRight, Users, Music, Plus, Minus } from "lucide-react";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";
import { weddingPackages, weddingAdatOptions, weddingTotal, weddingRupiah, weddingVendorNote, weddingAdatNote } from "@/data/wedding-packages";

const serif = "font-[family-name:var(--font-wed-serif)]";
const faqs = [
  { q: "Apakah dekorasi, catering, dan MUA sudah termasuk?", a: weddingVendorNote },
  { q: "Paket mana yang termasuk undangan digital dan alat sawer?", a: "Signature dan Premium termasuk undangan digital dan alat sawer gratis. Pada Essential, keduanya tidak termasuk." },
  { q: "Siapa yang menyediakan layanan adat Sunda?", a: "Layanan adat disediakan vendor rekanan. Jadwal, durasi, dan kebutuhan teknis dikonfirmasi sebelum pemesanan." },
  { q: "Apakah simulasi biaya merupakan harga final?", a: weddingAdatNote },
];

export default function WeddingOrganizerPage() {
  const [pkg, setPkg] = useState(1);
  const [open, setOpen] = useState<number | null>(null);
  const selected = weddingPackages[pkg] ?? weddingPackages[0];

  return (
    <Layout>
      <div className="bg-wed-blush pb-14 text-wed-ink">
        <section className="relative isolate overflow-hidden px-6 py-12 sm:py-16">
          <img src="/images/invitation-story.jpg" alt="Suasana pernikahan" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-wed-ink/80" />
          <div className="mx-auto max-w-5xl text-primary-foreground">
            <p className="text-xs font-semibold text-wed-gold">NEMPO · WEDDING ORGANIZER</p>
            <h1 className={`${serif} mt-4 text-4xl font-bold leading-tight sm:text-5xl`}>Nempo<br />Wedding Organizer</h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-primary-foreground/90">Semua paket berfokus pada manajemen dan koordinasi acara oleh tim WO Nempo. Pilih dukungan yang sesuai kebutuhan, dengan pilihan adat Sunda dari vendor rekanan.</p>
            <Button asChild className="mt-7 bg-wed-rose text-primary-foreground"><a href="#paket">Lihat Paket WO <ArrowRight /></a></Button>
            <p className="mt-5 text-sm text-primary-foreground/80">Essential · Signature · Premium</p>
          </div>
        </section>

        <section id="paket" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-10">
          <Head eyebrow="Pilihan Paket" title="Dukungan sesuai kebutuhan" />
          <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilihan paket WO">
            {weddingPackages.map((p, i) => (
              <Button key={p.name} variant="outline" aria-pressed={pkg === i} onClick={() => setPkg(i)} className={`px-1 text-xs sm:text-sm ${pkg === i ? "border-wed-rose bg-wed-rose text-primary-foreground" : "border-wed-ink/20 bg-card text-wed-ink"}`}>{p.name}</Button>
            ))}
          </div>
          <article className="mt-5 rounded-lg border border-wed-gold/40 bg-card p-5 sm:p-7" aria-label={`Paket ${selected.name}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h3 className={`${serif} text-2xl font-bold`}>{selected.name}</h3><p className="mt-2 text-sm text-wed-ink/70">{selected.intro}</p></div>
              <div><p className="text-2xl font-bold text-wed-rose">{weddingRupiah(selected.price)}</p><p className="mt-2 flex items-center gap-2 text-sm"><Users className="h-4 w-4" />{selected.team} anggota tim</p></div>
            </div>
            <ul className="mt-6 space-y-3 border-t border-wed-ink/10 pt-5">
              {selected.items.map(item => <li key={item} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-wed-rose" />{item}</li>)}
            </ul>
            <p className="mt-6 border-t border-wed-ink/10 pt-4 text-sm font-semibold text-wed-rose">{selected.digitalInvitationAndSawer ? "Termasuk undangan digital dan alat sawer gratis." : "Undangan digital dan alat sawer tidak termasuk."}</p>
            <Button asChild className="mt-5 bg-wed-ink text-primary-foreground"><a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">Konsultasi {selected.name} <ArrowRight /></a></Button>
          </article>
          <p className="mt-5 text-xs leading-relaxed text-wed-ink/70">{weddingVendorNote}</p>
        </section>

        <section className="bg-card px-6 py-10">
          <div className="mx-auto max-w-5xl">
            <Head eyebrow="Vendor Rekanan · Adat Sunda" title="Pilihan untuk hari istimewa" />
            <p className="mb-6 text-sm leading-relaxed text-wed-ink/70">Dua format pertunjukan adat dengan tarif spesial untuk klien Wedding Organizer Nempo.</p>
            <div className="grid gap-5 md:grid-cols-2">
              {weddingAdatOptions.map(option => <article key={option.name} className="rounded-lg border border-wed-gold/40 p-5">
                <Music className="h-6 w-6 text-wed-rose" /><h3 className={`${serif} mt-3 text-2xl font-bold`}>{option.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-wed-ink/70">{option.description}</p>
                <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-wed-ink/10 py-4">
                  <div><dt className="text-xs text-wed-ink/60">Harga normal</dt><dd className="mt-1 text-sm line-through">{weddingRupiah(option.normal)}</dd></div>
                  <div><dt className="text-xs text-wed-rose">Tarif spesial WO</dt><dd className="mt-1 text-xl font-bold text-wed-rose">{weddingRupiah(option.special)}</dd></div>
                </dl>
                <p className="mt-3 text-xs font-bold text-wed-rose">Hemat {weddingRupiah(option.normal - option.special)}</p>
                {option.music && <p className="mt-4 text-sm leading-relaxed"><span className="font-bold">Musik: </span>{option.music}</p>}
                <p className="mt-3 text-sm leading-relaxed"><span className="font-bold">Penampilan: </span>{option.performers}</p>
              </article>)}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-wed-ink/70">{weddingAdatNote}</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-10">
          <Head eyebrow="WO + Adat Sunda" title="Contoh total kombinasi" />
          <p className="mb-6 text-sm text-wed-ink/70">Paket WO digabungkan dengan tarif khusus vendor adat.</p>
          <div className="overflow-x-auto rounded-lg border border-wed-ink/15">
            <table className="w-full min-w-[530px] text-left text-sm">
              <caption className="sr-only">Simulasi biaya paket WO dan adat Sunda</caption>
              <thead className="bg-wed-ink text-primary-foreground"><tr><th className="p-4">Paket WO</th><th className="p-4">Harga WO</th><th className="p-4">Dengan live</th><th className="p-4">Tanpa live</th></tr></thead>
              <tbody>{weddingPackages.map(p => <tr key={p.name} className="border-t border-wed-ink/10 bg-card"><th scope="row" className="p-4">{p.name}</th><td className="p-4">{weddingRupiah(p.price)}</td>{weddingAdatOptions.map(a => <td key={a.name} className="p-4 font-bold text-wed-rose">{weddingRupiah(weddingTotal(p.price, a.special))}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-wed-ink/70">Biaya WO mencakup manajemen; vendor independen tidak termasuk kecuali disepakati terpisah. Tarif adat dan total akhir perlu dikonfirmasi kembali sesuai ketersediaan, jadwal, durasi, transportasi, serta kebutuhan teknis.</p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-10">
          <Head eyebrow="Tanya Jawab" title="Detail sebelum pemesanan" />
          <div className="divide-y divide-wed-ink/15 border-y border-wed-ink/15">
            {faqs.map((f, i) => <div key={f.q}>
              <Button variant="ghost" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`wedding-answer-${i}`} className="h-auto w-full justify-between whitespace-normal px-0 py-4 text-left text-sm font-semibold">{f.q}{open === i ? <Minus className="shrink-0" /> : <Plus className="shrink-0" />}</Button>
              {open === i && <p id={`wedding-answer-${i}`} className="pb-4 text-sm leading-relaxed text-wed-ink/70">{f.a}</p>}
            </div>)}
          </div>
        </section>
        <section className="bg-wed-rose px-6 py-10 text-center text-primary-foreground">
          <Heart className="mx-auto h-6 w-6" /><h2 className={`${serif} mt-4 text-2xl font-bold`}>Rencanakan hari istimewa kalian</h2>
          <p className="mt-3 text-sm">Bahas kebutuhan acara dan pilihan paket bersama Nempo.</p>
          <Button asChild variant="secondary" className="mt-6 bg-card text-wed-rose"><a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">Mulai Konsultasi <ArrowRight /></a></Button>
        </section>
      </div>
    </Layout>
  );
}

function Head({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mb-6"><p className="text-xs font-semibold text-wed-rose">{eyebrow}</p><h2 className={`${serif} mt-2 text-2xl font-bold leading-tight`}>{title}</h2></div>;
}
