import { Link, useLocation } from "@/lib/wouter";
import { useState, useEffect, useRef } from "react";
import { Home, Compass, Calendar, Newspaper, Ticket, User, Bell, Search, X, ChevronDown, MapPin, LockKeyhole, Utensils, Trophy, Car, Backpack, BookOpen, Globe, MessageCircle, Phone, Mail, Instagram, ChevronRight as ChevronRightIcon, ChevronLeft, Leaf, Route, Send, Bot, AlertTriangle, Wallet, Music, ArrowLeft, Heart, Crown, Coffee, Mountain, Users, Zap, Lightbulb, Shield, Flame, HeartPulse, Anchor, Building2, Handshake, Stethoscope, Play, Pause, Volume2, Award, Droplet, ClipboardList, Shirt, Gift, ChefHat } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/components/ui/button";
import { NempoBuddy } from "@/components/nempo-buddy";
import { useAuth } from "@/contexts/auth-context";
import { ALL_CITIES, CITY_OPTIONS, useCityFilter, type CityName } from "@/contexts/city-filter-context";
import { NEMPO_INSTAGRAM_DM_URL } from "@/lib/contact";
import { mainNavItems } from "@/data/main-nav-items";
import {
  NavAdventureIcon,
  NavBeritaIcon,
  NavCafeIcon,
  NavCeritaIcon,
  NavDigiIcon,
  NavEventIcon,
  NavHomeIcon,
  NavHotelIcon,
  NavInfluencerIcon,
  NavJajanIcon,
  NavKerjaSamaIcon,
  NavKulinerIcon,
  NavKomunitasIcon,
  NavMerchandiseIcon,
  NavProfileIcon,
  NavOrdersIcon,
  NavSponsorshipIcon,
  NavTalentIcon,
  NavTicketIcon,
  NavTravelIcon,
  NavWisataIcon,
  NavWishlistIcon,
} from "@/components/navigation-glyphs";

import { BookOpenText } from "lucide-react";

const APP_FRAME_SESSION_KEY = "nempo_app_frame";

function getAppFrameMode() {
  if (typeof window === "undefined") return false;

  const appParam = new URLSearchParams(window.location.search).get("app");
  try {
    if (appParam === "1") {
      window.sessionStorage.setItem(APP_FRAME_SESSION_KEY, "1");
      return true;
    }
    if (appParam !== null) {
      window.sessionStorage.removeItem(APP_FRAME_SESSION_KEY);
      return false;
    }
    return window.sessionStorage.getItem(APP_FRAME_SESSION_KEY) === "1";
  } catch {
    return appParam === "1";
  }
}

function getBottomNavItems(isMitra: boolean) {
  return [
    { href: "/", icon: NavHomeIcon, label: "Beranda" },
    { href: "/wishlist", icon: NavWishlistIcon, label: "Wishlist" },
    { href: "/event", icon: NavEventIcon, label: "Event" },
    { href: "/pesanan-saya", icon: NavOrdersIcon, label: "Pesanan" },
    { href: isMitra ? "/mitra-dashboard" : "/profile", icon: NavProfileIcon, label: "Profile" },
  ];
}

function CityPicker({ mobile = false, compact = false }: { mobile?: boolean; compact?: boolean }) {
  const { selectedCity, setSelectedCity, isCityAvailable } = useCityFilter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);
  const label = selectedCity === ALL_CITIES ? "Jawa Barat" : selectedCity;
  const filteredCities = CITY_OPTIONS
    .filter((city) => {
      if (!search.trim()) return true;
      const query = search.trim().toLowerCase();
      return city.toLowerCase().includes(query) || (city === ALL_CITIES && "semua area".includes(query));
    })
    .sort((a, b) => {
      const aAvailable = a === ALL_CITIES || isCityAvailable(a);
      const bAvailable = b === ALL_CITIES || isCityAvailable(b);
      return Number(bAvailable) - Number(aAvailable);
    });

  const chooseCity = (city: CityName) => {
    setSelectedCity(city);
    setSearch("");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={pickerRef} className={
      compact
        ? "relative block shrink-0 md:hidden"
        : mobile
          ? "w-full"
          : "relative hidden md:block shrink-0 ml-5"
    }>
      <button
        type="button"
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? "city-picker-options" : undefined}
        aria-label={`Lokasi saat ini: ${label}. Pilih kota`}
         style={compact || !mobile ? { background: "rgba(255,255,255,0.15)" } : undefined}
        className={compact
          ? "group flex h-9 max-w-[132px] items-center gap-1.5 rounded-xl border border-white/20 bg-white/12 px-2 text-left text-white transition-all hover:border-white/35 hover:bg-white/20"
          : mobile
          ? "group w-full flex items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 px-3.5 py-3 text-left transition-all hover:border-blue-200 hover:shadow-sm"
          : "group flex h-11 items-center gap-2.5 rounded-2xl border border-white/20 bg-white/12 px-3.5 text-left text-white transition-all hover:border-white/35 hover:bg-white/20"
        }
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className={compact
            ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white"
            : mobile
            ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#0194f3] shadow-sm"
            : "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white transition-colors group-hover:bg-white/25"
          }>
            <MapPin className={compact ? "h-3.5 w-3.5" : mobile ? "h-4 w-4" : "h-3.5 w-3.5"} />
          </span>
          {compact ? (
            <span className="min-w-0 truncate whitespace-nowrap text-[11px] font-extrabold leading-tight text-white">{label}</span>
          ) : (
            <span className="min-w-0">
              <span className={mobile
              ? "block text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-500"
              : "block text-[9px] font-bold uppercase tracking-[0.14em] text-white/65"
              }>
                Lokasi kamu
              </span>
              <span className={mobile
              ? "block max-w-[220px] whitespace-normal break-words text-sm font-extrabold leading-tight text-gray-800"
              : "block max-w-[145px] truncate text-xs font-extrabold text-white"
              }>
                {label}
              </span>
            </span>
          )}
        </span>
        <ChevronDown className={`shrink-0 transition-transform duration-200 ${compact ? "h-3.5 w-3.5 text-white/75" : "h-4 w-4"} ${open ? "rotate-180" : ""} ${mobile ? "text-blue-400" : "text-white/75"}`} />
      </button>

      {open && (
        <div
          id="city-picker-options"
          role="listbox"
          aria-label="Daftar kota dan area Jawa Barat"
          className={compact
            ? "fixed left-3 right-3 top-[calc(4rem+env(safe-area-inset-top))] z-[60] max-h-[calc(100dvh-84px)] overflow-hidden rounded-2xl border border-gray-100 bg-white text-gray-700 shadow-2xl shadow-blue-950/15"
            : mobile
            ? "mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
            : "absolute left-0 top-full z-[60] mt-2 w-[304px] overflow-hidden rounded-2xl border border-gray-100 bg-white text-gray-700 shadow-2xl shadow-blue-950/15"
          }
        >
          <div className="border-b border-gray-100 bg-gradient-to-br from-blue-50 via-white to-white px-3.5 pb-3 pt-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-extrabold text-gray-800">Jelajahi Jawa Barat</p>
                <p className="mt-0.5 text-[11px] font-medium text-gray-400">Pilih area untuk menyesuaikan rekomendasi</p>
              </div>
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-2 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
              <Search className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari kota atau kabupaten..."
                aria-label="Cari kota"
                className="min-w-0 flex-1 bg-transparent text-xs font-medium text-gray-700 outline-none placeholder:text-gray-400"
                autoFocus={!mobile}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Hapus pencarian kota"
                  className="rounded-full p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
          <div className={compact ? "max-h-[calc(100dvh-300px)] overflow-y-auto p-2" : "max-h-64 overflow-y-auto p-2"} style={{ scrollbarWidth: "thin" }}>
            {filteredCities.length > 0 ? filteredCities.map((city) => {
              const selected = selectedCity === city;
              const isAll = city === ALL_CITIES;
              const available = isAll || isCityAvailable(city);
              return (
                <button
                  key={city}
                  type="button"
                  disabled={!available}
                  role="option"
                  aria-selected={selected}
                  aria-disabled={!available}
                  onClick={() => chooseCity(city)}
                  className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-all ${
                    !available
                      ? "cursor-not-allowed bg-gray-50/70 text-gray-400 opacity-70"
                      : selected
                        ? "bg-blue-50 text-[#0172B1]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    !available
                      ? "bg-gray-100 text-gray-400"
                      : selected
                        ? "bg-blue-100 text-[#0194f3]"
                        : isAll
                          ? "bg-gray-100 text-gray-400"
                          : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-400"
                  }`}>
                    {available ? <MapPin className="h-3.5 w-3.5" /> : <LockKeyhole className="h-3.5 w-3.5" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block whitespace-normal break-words text-xs leading-snug ${selected ? "font-extrabold" : "font-semibold"}`}>
                      {isAll ? "Semua Jawa Barat" : city}
                    </span>
                    <span className={`block whitespace-normal break-words text-[10px] leading-snug font-medium ${
                      available ? "text-gray-400" : "text-amber-600"
                    }`}>
                      {isAll ? "Tampilkan semua rekomendasi" : available ? "Kota / kabupaten" : "Segera hadir"}
                    </span>
                  </span>
                  {!available ? (
                    <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-600">
                      Belum ada data
                    </span>
                  ) : selected && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0194f3] text-[11px] font-black text-white">✓</span>
                  )}
                </button>
              );
            }) : (
              <div className="px-3 py-7 text-center">
                <Search className="mx-auto h-5 w-5 text-gray-300" />
                <p className="mt-2 text-xs font-bold text-gray-600">Area tidak ditemukan</p>
                <p className="mt-0.5 text-[10px] text-gray-400">Coba kata kunci lain</p>
              </div>
            )}
          </div>
          <div className="border-t border-gray-100 bg-gray-50/70 px-3.5 py-2">
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-gray-400">
              <LockKeyhole className="h-3 w-3 text-amber-500" />
              Kota bertanda <span className="font-bold text-amber-600">Belum ada data</span> belum bisa dipilih
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function Layout({ children, hideBottomNav, minimalChrome }: { children: React.ReactNode; hideBottomNav?: boolean; minimalChrome?: boolean }) {
  const [location, navigate] = useLocation();
  const isAppFrame = getAppFrameMode();
  const { user, mitra } = useAuth();
  const [mobileSearch, setMobileSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; title: string; message: string; type: string; created_at: string }[]>([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const isActive = (href: string) => {
    const [path, hash] = href.split("#", 2);
    const currentPath = location.split(/[?#]/, 1)[0];
    const pathIsActive = path === "/"
      ? currentPath === "/"
      : currentPath === path || currentPath.startsWith(`${path}/`);

    if (!pathIsActive || !hash) return pathIsActive;
    return typeof window !== "undefined" && window.location.hash === `#${hash}`;
  };
  const scrollToMenuSection = (href: string) => {
    const [path, hash] = href.split("#", 2);
    const currentPath = location.split(/[?#]/, 1)[0];
    if (!hash || path !== currentPath) return;

    window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const readDate = localStorage.getItem("notif_read_date");
    if (readDate === today) setNotifRead(true);
    let cancelled = false;
    fetch("/api/notifications")
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (!cancelled) setNotifications(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [location]);

  const hasNotif = notifications.length > 0 && !notifRead;

  function openNotifPanel() {
    setNotifOpen(true);
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("notif_read_date", today);
    setNotifRead(true);
  }

  const notifTypeStyle: Record<string, { bg: string; dot: string; border: string; label: string }> = {
    info:    { bg: "bg-blue-50",   dot: "bg-blue-500",   border: "#3b82f6", label: "Informasi" },
    update:  { bg: "bg-violet-50", dot: "bg-violet-500", border: "#8b5cf6", label: "Update" },
    promo:   { bg: "bg-blue-50",  dot: "bg-blue-500",  border: "#0194f3", label: "Promo" },
    event:   { bg: "bg-teal-50",   dot: "bg-teal-500",   border: "#14b8a6", label: "Event" },
    warning: { bg: "bg-red-50",    dot: "bg-red-500",    border: "#ef4444", label: "Peringatan" },
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-[#f8fafc] flex flex-col">
      {/* ── Desktop Top Navigation ── */}
      {!minimalChrome && <header className={`relative w-full z-50 md:sticky md:top-0 transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-none"}`}
        style={{
          paddingTop: isAppFrame ? 0 : "env(safe-area-inset-top)",
          background: "linear-gradient(135deg, #0172B1 0%, #0194f3 80%, #1BA0E2 100%)",
        }}>
        {/* Top bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className={`flex items-center justify-between ${isAppFrame ? "h-12 sm:h-16" : "h-16"}`}>
            {/* Logo */}
            <Link href="/" aria-label="Nempo Organizer" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src={`${import.meta.env.BASE_URL}Assets/Logo/nempo-new.webp`}
                alt="Nempo Organizer"
                style={{ height: isAppFrame ? 28 : 36, width: isAppFrame ? 28 : 36, objectFit: "contain", filter: "brightness(0) invert(1)", flexShrink: 0 }}
              />
              <div className="flex" style={{ flexDirection: "column", lineHeight: 1 }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
                  fontWeight: 900, fontSize: 16,
                  color: "#ffffff",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                }}>
                  Nempo
                </span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans','Inter',sans-serif",
                  fontWeight: 600, fontSize: 9,
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: 1,
                  whiteSpace: "nowrap",
                }}>
                  ORGANIZER
                </span>
              </div>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="relative">
                <button
                   className={`relative ${isAppFrame ? "h-8 w-8" : "h-9 w-9"} rounded-2xl flex items-center justify-center transition-colors overflow-visible hover:bg-white/20`}
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                  onClick={openNotifPanel}
                >
                   <Bell className={`${isAppFrame ? "h-4 w-4" : "h-[18px] w-[18px]"} text-white ${hasNotif ? "animate-bounce" : ""}`} />
                  {hasNotif && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-400 rounded-full animate-pulse"
                      style={{ boxShadow: `0 0 0 2px #0194f3` }}
                    />
                  )}
                </button>

                {/* ── Notification Panel ── */}
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                    <div className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 top-[68px] sm:top-11 z-50 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mx-auto sm:mx-0"
                      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100"
                        style={{ background: "linear-gradient(135deg, #001E6E 0%, #0194f3 100%)" }}>
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-white" />
                          <span className="text-white font-bold text-sm">Notifikasi</span>
                          {notifications.length > 0 && (
                            <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                              {notifications.length}
                            </span>
                          )}
                        </div>
                        <button onClick={() => setNotifOpen(false)} className="text-white/70 hover:text-white">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="max-h-[60vh] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            <Bell className="h-10 w-10 mb-2 opacity-30" />
                            <p className="text-sm font-medium">Tidak ada notifikasi</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-50">
                            {notifications.map(n => {
                              const style = notifTypeStyle[n.type] ?? notifTypeStyle.info;
                              return (
                                <div key={n.id} className={`px-4 py-3 border-l-4 ${style.bg}`}
                                  style={{ borderLeftColor: style.border }}>
                                  <div className="flex items-start gap-2">
                                    <span className={`mt-1 h-2 w-2 rounded-full shrink-0 ${style.dot}`} />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2 mb-0.5">
                                        <span className="font-bold text-gray-800 text-xs leading-tight">{n.title}</span>
                                        <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">
                                          {new Date(n.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                                        </span>
                                      </div>
                                      <p className="text-gray-600 text-xs leading-relaxed">{n.message}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                        <p className="text-[10px] text-gray-400 text-center">Notifikasi diperbarui setiap hari</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Donasi Bibit icon button — hidden */}
              {/* <Link href="/donasi-bibit">
                <div className="relative group cursor-pointer">
                  <button className="relative flex items-center gap-1.5 h-9 px-2.5 sm:px-3 rounded-2xl transition-all hover:scale-105 active:scale-95" style={{ background: "#fff", color: "#166534", boxShadow:"0 2px 8px rgba(0,0,0,0.12)", border: "1.5px solid #dcfce7" }}>
                    <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center justify-center">
                      <DotLottieReact
                        src={`${import.meta.env.BASE_URL}animations/tree-green.json`}
                        loop
                        autoplay
                        style={{ width: 28, height: 28 }}
                      />
                    </span>
                    <span className="hidden sm:block text-xs font-bold tracking-tight whitespace-nowrap text-green-700">Donasi Bibit</span>
                  </button>
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 flex items-center justify-center" style={{ boxShadow: `0 0 0 2px #ffffff` }}>
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  </span>
                  <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                    🌳 Donasi Bibit untuk Jawa Barat Hijau
                    <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </div>
              </Link> */}

              {(mitra || user) && (
                <Link href={mitra ? "/mitra-dashboard" : "/profile"}>
                  <button className="hidden sm:flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-2xl transition-all hover:bg-white/90"
                    style={{ background: "white", color: "#0172B1", boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
                    <User className="h-3.5 w-3.5" />
                    {mitra ? (mitra.business_name || mitra.username) : user ? user.name.split(" ")[0] : ""}
                  </button>
                </Link>
              )}
              <button className={`md:hidden ${isAppFrame ? "h-8 w-8" : "h-9 w-9"} rounded-2xl flex items-center justify-center hover:bg-white/20 transition-colors`}
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <div className="flex flex-col gap-[5px] items-center w-5">
                  <span className={`h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
                  <span className={`h-[2px] bg-white rounded-full transition-all duration-200 ${mobileMenuOpen ? "w-0 opacity-0" : "w-3.5"}`} />
                  <span className={`h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop secondary nav */}
        <div className="hidden md:block" style={{ background: "linear-gradient(to bottom, #f8faff 0%, #f0f4ff 100%)", borderTop: "1px solid rgba(0,100,210,0.08)" }}>
          <div className="max-w-7xl mx-auto px-3 lg:px-8">
            <div className="flex items-center h-12">
              {/* Scrollable nav pills */}
              <div className="flex items-center gap-0.5 lg:gap-1 flex-1 min-w-0 overflow-x-auto h-full" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

                {/* Category pills */}
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link key={item.href} href={item.href} onClick={() => scrollToMenuSection(item.href)} className="shrink-0">
                      <div
                        className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap"
                        style={active
                          ? { background: item.color, color: "#fff", boxShadow: `0 3px 10px ${item.color}50` }
                          : { color: "#64748b" }
                        }
                        onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = item.bg; (e.currentTarget as HTMLElement).style.color = item.color; } }}
                        onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "#64748b"; } }}
                      >
                        <div
                          className="h-5 w-5 rounded-md flex items-center justify-center shrink-0"
                          style={{ background: active ? "rgba(255,255,255,0.25)" : item.bg }}
                        >
                          <Icon className="h-3.5 w-3.5" style={{ color: active ? "#fff" : item.color }} />
                        </div>
                        {item.label}
                      </div>
                    </Link>
                  );
                })}

              </div>

            </div>
          </div>
        </div>

        {/* Mobile menu slide-down */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white shadow-lg animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mb-3 focus-within:border-blue-400 focus-within:bg-white transition-all">
                <Search className="h-4 w-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={mobileSearch}
                  onChange={e => setMobileSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && mobileSearch.trim()) {
                      navigate(`/cari?q=${encodeURIComponent(mobileSearch.trim())}`);
                      setMobileMenuOpen(false);
                    }
                  }}
                  placeholder="Cari destinasi, kuliner, event..."
                  className="bg-transparent flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                {mobileSearch ? (
                  <button
                    onClick={() => {
                      if (mobileSearch.trim()) {
                        navigate(`/cari?q=${encodeURIComponent(mobileSearch.trim())}`);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white"
                    style={{ background: "#0194f3" }}
                  >
                    Cari
                  </button>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-1">
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToMenuSection(item.href);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(item.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              {(mitra || user) && (
                <Link href={mitra ? "/mitra-dashboard" : "/profile"} onClick={() => setMobileMenuOpen(false)}>
                  <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-colors">
                    {mitra ? (mitra.business_name || mitra.username) : user ? user.name.split(" ")[0] : ""}
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>}

      {/* ── Page Content ── */}
      <main key={location} className={`flex-1 w-full ${minimalChrome || isAppFrame ? "pb-20 md:pb-0" : "pb-0"} animate-in fade-in duration-300 overflow-x-clip`}>
        {children}
      </main>

      {/* ── Footer ── */}
      {!minimalChrome && <footer className="relative overflow-hidden text-white" style={{ background: "linear-gradient(145deg, #0172B1 0%, #0194f3 55%, #1BA0E2 100%)" }}>
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="nempo-footer-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
          <div className="grid grid-cols-1 gap-8 mb-8 md:mb-10 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-stretch md:gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/Assets/Logo/nempo-new.webp" alt="Nempo Organizer" className="h-10 w-10 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                <div className="flex flex-col leading-none gap-[1px]">
                  <span className="font-black text-[17px]" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                    Nempo
                  </span>
                  <span className="font-bold text-[9.5px] tracking-[0.22em] uppercase" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", color: "rgba(255,255,255,0.7)" }}>
                    ID
                  </span>
                </div>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-md">
                Tim kreatif yang mengangkat pesona Jawa Barat melalui karya, event, dan kolaborasi yang berdampak.
                Temukan cerita, potensi, dan pengalaman terbaik di setiap sudutnya.
              </p>
              {/* Mobile: 4 icon-only buttons | Desktop: 2-col cards with text */}
              <div className="flex gap-2 md:hidden mt-1">
                <a href="https://instagram.com/nempo.id" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center h-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                </a>
                <a href="https://tiktok.com/@nempo.id" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center h-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center border border-white/10">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/></svg>
                  </div>
                </a>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-2.5 mt-1">
                {/* Instagram */}
                <a href="https://instagram.com/nempo.id" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="h-7 w-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-white/40 leading-none mb-0.5">Instagram</p>
                    <p className="text-xs font-bold text-white/80 truncate">@nempo.id</p>
                  </div>
                </a>
                {/* TikTok */}
                <a href="https://tiktok.com/@nempo.id" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                  <div className="h-7 w-7 rounded-xl bg-black flex items-center justify-center shrink-0 border border-white/10">
                    <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-white/40 leading-none mb-0.5">TikTok</p>
                    <p className="text-xs font-bold text-white/80 truncate">@nempo.id</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="hidden min-h-[220px] flex-col justify-between rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 shadow-[0_18px_50px_rgba(0,40,100,0.12)] md:flex">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45">Jelajah bersama Nempo</p>
                <h3 className="mt-3 max-w-sm text-2xl font-black leading-tight tracking-[-0.04em] text-white">
                  Temukan cerita di setiap sudut Jawa Barat.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                  Destinasi lokal, rasa khas, dan momen yang layak untuk dibawa pulang.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Wisata", "Kuliner", "Event"].map((label) => (
                  <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/75">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* ── Metode Pembayaran ── */}
          {(() => {
            const base = import.meta.env.BASE_URL + "payment-logos/";
            const v = "?v=7";
            const payments = [
              { label: "BSI",          src: base + "bsi.png"      + v },
              { label: "Danamon",      src: base + "danamon.webp"  + v },
              { label: "CIMB Niaga",   src: base + "cimb.png"     + v },
              { label: "QRIS",         src: base + "qris.png"     + v },
              { label: "BNI",          src: base + "bni.png"      + v },
              { label: "BRI",          src: base + "bri.png"      + v },
              { label: "GoPay",        src: base + "gopay.webp"   + v },
              { label: "Bank Mandiri", src: base + "mandiri.webp" + v },
              { label: "PermataBank",  src: base + "permata.webp" + v },
            ];
            return (
              <div className="border-t border-white/20 pt-5 mb-6">
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold mb-4 text-center">Metode Pembayaran</p>
                {/* Mobile: auto-scroll marquee */}
                <div className="sm:hidden" style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                  <div className="payment-marquee" style={{ display: "flex", flexWrap: "nowrap", gap: 10, width: "max-content" }}>
                    {[...payments, ...payments].map((p, i) => (
                      <div key={i} style={{ width: 82, height: 44, flexShrink: 0, background: "white", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                        <img src={p.src} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 6 }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: 1 row flex */}
                <div className="hidden sm:flex flex-nowrap gap-1.5">
                  {payments.map((p) => (
                    <div key={p.label}
                      className="flex-1 bg-white rounded-lg shadow-sm flex items-center justify-center"
                      style={{ minWidth: 0, height: 44 }}>
                      <img src={p.src} alt={p.label} className="w-full h-full object-contain p-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          <div
            className="border-t border-white/20 pt-5 text-center"
          >
            <span className="text-white/50 text-xs">&copy; 2025 Nempo Organizer. Hak Cipta Dilindungi.</span>
          </div>
        </div>
      </footer>}

      {/* ── Mobile Bottom Navigation ── */}
      {!minimalChrome && !hideBottomNav && (() => {
        const bottomNavItems = getBottomNavItems(!!mitra);
        const navActiveColor = "#0194f3";
        return (
          <nav
            className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${isAppFrame ? "nempo-app-frame-bottom-nav" : ""}`}
            style={{
              background: "linear-gradient(to top, rgba(244,248,252,0.92), rgba(244,248,252,0))",
              padding: `8px 12px ${isAppFrame ? "max(8px, env(safe-area-inset-bottom))" : "max(10px, env(safe-area-inset-bottom))"}`,
            }}
          >
            <div className="mx-auto flex max-w-md items-center justify-around gap-1 rounded-[22px] border border-[#e5edf4] bg-white/95 px-1.5 py-1.5 shadow-[0_10px_28px_rgba(21,48,74,0.14)] backdrop-blur-xl">
              {bottomNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-2xl px-0.5 py-1 select-none transition-transform duration-200 active:scale-[0.96]"
                    style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation", gap: 4 }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                        transform: active ? "scale(1.08)" : "none",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <Icon
                        style={{
                          width: active ? 32 : 30,
                          height: active ? 32 : 30,
                          color: active ? navActiveColor : "#29465f",
                          strokeWidth: 2.2,
                          transition: "color 0.2s ease, width 0.2s ease, height 0.2s ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: active ? 700 : 500,
                        color: active ? navActiveColor : "#44586d",
                        letterSpacing: "0.01em",
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        transition: "color 0.2s ease, font-weight 0.2s ease",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        );
      })()}

      {/* Overlay for dropdowns */}
      {!minimalChrome && mobileMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {!minimalChrome && <NempoBuddy />}
    </div>
  );
}
