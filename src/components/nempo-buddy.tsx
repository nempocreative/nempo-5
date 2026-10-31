import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Heart, Instagram, LayoutGrid, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/wouter";
import { BUDDY_SERVICES, getBuddyReply, type BuddyReply } from "@/data/nempo-buddy";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";

type Message = BuddyReply & { from: "user" | "buddy" };
type Mode = "home" | "services" | "chat";

export function NempoBuddy() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("home");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "buddy", text: "Halo, aku Buddy Nempo! Lagi menyiapkan acara atau mengembangkan usaha? Ceritakan kebutuhanmu, yuk.", catalogue: true }]);
  const history = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => { history.current?.scrollTo({ top: history.current.scrollHeight }); }, [messages, mode]);
  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
      if (event.key !== "Tab" || !panel.current) return;
      const controls = Array.from(panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, [tabindex="0"]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [open]);

  const close = () => { setOpen(false); trigger.current?.focus(); };
  const ask = (query: string) => {
    if (!query.trim()) return;
    setMode("chat");
    setMessages(previous => [...previous, { from: "user", text: query.trim() }, { from: "buddy", ...getBuddyReply(query) }]);
    setInput("");
  };
  const contact = <Button asChild size="sm" className="bg-brand text-brand-on hover:bg-brand/90"><a href={NEMPO_INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer"><Instagram className="h-4 w-4" /> DM Admin</a></Button>;

  return <>
    {open && <>
      <div className="fixed inset-0 z-[60] bg-brand-navy/20" onClick={close} aria-hidden="true" />
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="buddy-title" tabIndex={-1} className="fixed bottom-28 right-3 z-[61] flex h-[560px] max-h-[calc(100dvh-9rem)] w-[360px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-lg border border-border bg-background text-foreground shadow-xl outline-none md:bottom-20">
        <header className="flex shrink-0 items-center gap-2 bg-brand px-4 py-3 text-brand-on">
          {mode !== "home" ? <Button variant="ghost" size="icon" aria-label="Kembali ke menu Buddy" onClick={() => setMode("home")} className="h-8 w-8 text-brand-on hover:bg-brand-on/15 hover:text-brand-on"><ArrowLeft className="h-4 w-4" /></Button> : <MessageCircle className="h-6 w-6 shrink-0" />}
          <div className="min-w-0 flex-1"><h2 id="buddy-title" className="text-sm font-bold">{mode === "services" ? "Layanan & Paket" : "Nempo Buddy"}</h2><p className="text-[11px] text-brand-on/80">Nempo Organizer</p></div>
          <Button variant="ghost" size="icon" aria-label="Tutup Nempo Buddy" onClick={close} className="h-8 w-8 text-brand-on hover:bg-brand-on/15 hover:text-brand-on"><X className="h-4 w-4" /></Button>
        </header>
        {mode === "home" && <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="border-b border-border bg-brand-sky px-5 py-5"><p className="mb-1 text-xs font-bold text-brand">Halo, kenalan dulu yuk!</p><h3 className="text-xl font-extrabold leading-snug text-brand-navy">Acara berkesan.<br />Usaha makin berkembang.</h3><p className="mt-2 text-sm text-brand-navy/75">Lagi butuh bantuan apa?</p></div>
          <div className="space-y-3 p-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => setMode("chat")} className="h-24 flex-col gap-2 whitespace-normal border-brand/20 bg-brand-sky text-brand-navy"><MessageCircle className="h-6 w-6 text-brand" />Tanya Buddy</Button>
              <Button variant="outline" onClick={() => setMode("services")} className="h-24 flex-col gap-2 whitespace-normal border-biz-teal/20 bg-biz-mint text-biz-ink"><LayoutGrid className="h-6 w-6 text-biz-teal" />Layanan & Paket</Button>
            </div>
            <p className="pt-2 text-xs font-bold text-muted-foreground">Yang lagi kamu rencanakan</p>
            {[{ label: "Pernikahan", query: "Wedding Organizer" }, { label: "Acara & gathering", query: "Event Organizer" }, { label: "Konten usaha", query: "Sosmed Management" }, { label: "Website & sistem usaha", query: "Web Development" }].map(topic => <Button key={topic.label} variant="outline" onClick={() => ask(topic.query)} className="w-full justify-between text-left">{topic.label}<ArrowUpRight className="h-4 w-4 text-brand" /></Button>)}
            <div className="flex items-center justify-between gap-2 border-t border-border pt-3"><span className="text-xs text-muted-foreground">Mau konsultasi langsung?</span>{contact}</div>
          </div>
        </div>}
        {mode === "services" && <div className="min-h-0 flex-1 overflow-y-auto p-4"><div className="space-y-3">{BUDDY_SERVICES.map(service => <article key={service.id} className="rounded-lg border border-border p-3"><h3 className="text-sm font-bold">{service.name}</h3><p className="mt-1 text-xs text-muted-foreground">{service.summary}</p><div className="mt-3 flex gap-2"><Button size="sm" variant="outline" onClick={() => ask(service.name)}>Paket & detail</Button><Button asChild size="sm" variant="ghost" className="text-brand"><Link href={service.href} onClick={close}>Buka halaman<ArrowUpRight className="h-3 w-3" /></Link></Button></div></article>)}</div></div>}
        {mode === "chat" && <>
          <div ref={history} className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-muted/30 p-3" aria-live="polite" aria-relevant="additions">
            {messages.map((message, index) => { const service = BUDDY_SERVICES.find(s => s.id === message.serviceId); return <div key={index} className={`flex flex-col ${message.from === "user" ? "items-end" : "items-start"}`}>
              <p className={`max-w-[94%] whitespace-pre-line break-words rounded-lg px-3 py-2.5 text-[13px] leading-relaxed ${message.from === "user" ? "bg-brand text-brand-on" : "border border-border bg-background text-foreground"}`}>{message.text}</p>
              {service && <div className="mt-2 flex flex-wrap gap-1"><Button asChild variant="outline" size="sm"><Link href={service.href} onClick={close}>Lihat {service.name}<ArrowUpRight className="h-3 w-3" /></Link></Button>{contact}</div>}
              {message.catalogue && <div className="mt-2 flex flex-wrap gap-1.5">{BUDDY_SERVICES.map(s => <Button key={s.id} variant="outline" size="sm" className="h-auto whitespace-normal px-2 py-1.5 text-[11px]" onClick={() => ask(s.name)}>{s.name}</Button>)}</div>}
              {message.contact && <div className="mt-2">{contact}</div>}
            </div>; })}
          </div>
          <form onSubmit={event => { event.preventDefault(); ask(input); }} className="flex shrink-0 gap-2 border-t border-border bg-background p-3"><input aria-label="Pesan untuk Nempo Buddy" value={input} onChange={event => setInput(event.target.value)} placeholder="Ceritakan kebutuhanmu…" className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-brand" /><Button type="submit" size="icon" aria-label="Kirim pesan" disabled={!input.trim()} className="shrink-0 bg-brand text-brand-on hover:bg-brand/90"><Send className="h-4 w-4" /></Button></form>
        </>}
      </div>
    </>}
    <Button ref={trigger} onClick={() => { if (open) close(); else { setMode("home"); setOpen(true); } }} aria-label={open ? "Tutup Nempo Buddy" : "Buka Nempo Buddy"} aria-expanded={open} className="fixed bottom-32 right-0 z-50 h-11 gap-2 rounded-l-lg rounded-r-none bg-brand text-brand-on shadow-lg hover:bg-brand/90 md:bottom-20"><MessageCircle className="h-5 w-5" /><span className="text-xs font-bold">Nempo Buddy</span><Heart className="h-3 w-3" /></Button>
  </>;
}