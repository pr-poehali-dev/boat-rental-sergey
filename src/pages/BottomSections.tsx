/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICES, REVIEWS, STATS, FAQ_ITEMS, GALLERY_PHOTOS } from "./data";
import { scrollTo, StarRating, GoldDivider, PrivacyModal, ConsultModal } from "./shared";

// ─── Services ─────────────────────────────────────────────────────────────────

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-pearl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Что мы предлагаем</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Варианты отдыха с VolgaViatek</h2>
          <GoldDivider />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="group bg-white rounded-2xl p-7 hover-lift border border-white shadow-sm">
              <div className="w-12 h-12 rounded-xl ocean-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={s.icon as any} size={22} className="text-white" fallback="Star" />
              </div>
              <h3 className="font-display text-xl font-semibold text-navy mb-2">{s.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Отзывы клиентов</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Говорят гости</h2>
          <GoldDivider />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-pearl rounded-2xl p-7 hover-lift border border-transparent hover:border-ocean/20 transition-all">
              <StarRating rating={r.rating} />
              <p className="font-body text-sm text-navy/80 leading-relaxed mt-4 mb-6 italic">«{r.text}»</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full ocean-gradient flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-white font-semibold text-sm">{r.name[0]}</span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-navy">{r.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{r.role} · {r.date}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <Icon name="Anchor" size={12} className="text-ocean" />
                  <span className="font-body text-xs text-muted-foreground">{r.yacht}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-navy rounded-2xl p-8 grid md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl font-semibold text-gold">{s.value}</div>
              <div className="font-body text-sm text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

export function CtaSection() {
  const [showConsult, setShowConsult] = useState(false);

  return (
    <section className="py-20 bg-pearl">
      {showConsult && <ConsultModal onClose={() => setShowConsult(false)} />}
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-navy rounded-3xl px-8 py-14 md:px-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/20 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <p className="font-body text-xs text-gold tracking-widest uppercase mb-4">Готовы к отдыху?</p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-5 leading-tight">
              Выберите свой отдых<br />
              <span className="italic text-[hsl(var(--gold-light))]">на Волге сегодня</span>
            </h2>
            <p className="font-body text-white/65 max-w-xl mx-auto mb-10 leading-relaxed">
              Оставьте заявку — менеджер свяжется в течение 15 минут, подберёт вариант под ваш бюджет и организует всё под ключ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowConsult(true)}
                className="px-9 py-4 bg-gold text-navy font-body font-bold rounded-full hover:bg-[hsl(var(--gold-light))] transition-all hover:scale-105 text-sm tracking-wide shadow-lg">
                Получить консультацию
              </button>
              <button
                onClick={() => scrollTo("fleet")}
                className="px-8 py-4 bg-white/10 text-white border border-white/25 font-body font-medium rounded-full hover:bg-white/20 transition-all text-sm tracking-wide">
                Выбрать отдых на Волге
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function FullscreenSlider({ photos, startIndex, onClose }: { photos: typeof GALLERY_PHOTOS; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);

  const go = (dir: number) => setCurrent((c) => (c + dir + photos.length) % photos.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 w-full h-full flex items-center justify-center px-10 md:px-24 py-12 pointer-events-none">
        <img
          src={photos[current].src}
          alt={photos[current].alt}
          className="w-full h-full object-contain md:rounded-2xl shadow-2xl"
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        />
      </div>

      <button onClick={onClose}
        className="absolute top-3 right-3 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors shadow-lg">
        <Icon name="X" size={18} style={{ color: "#14556f" }} />
      </button>

      <button onClick={() => go(-1)}
        className="absolute left-2 md:left-4 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors border border-white/30">
        <Icon name="ChevronLeft" size={22} className="text-white" />
      </button>

      <button onClick={() => go(1)}
        className="absolute right-2 md:right-4 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors border border-white/30">
        <Icon name="ChevronRight" size={22} className="text-white" />
      </button>
    </div>
  );
}

export function GallerySection() {
  const [fullscreen, setFullscreen] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-white">
      {fullscreen !== null && (
        <FullscreenSlider
          photos={GALLERY_PHOTOS}
          startIndex={fullscreen}
          onClose={() => setFullscreen(null)}
        />
      )}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Наши моменты</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Галерея</h2>
          <GoldDivider />
          <p className="font-body text-sm text-muted-foreground mt-3">Нажмите на любое фото, чтобы открыть просмотр</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[220px]">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${photo.span}`}
              onClick={() => setFullscreen(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 transition-all duration-300 flex items-center justify-center scale-75 group-hover:scale-100">
                  <Icon name="ZoomIn" size={20} className="text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-pearl">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Часто спрашивают</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">FAQ</h2>
            <GoldDivider />
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-xl px-6 border-none">
                <AccordionTrigger className="font-body font-medium text-navy hover:no-underline py-5 text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-navy/70 leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export function ContactsSection() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showConsult, setShowConsult] = useState(false);

  return (
    <section id="contacts" className="py-24 ocean-gradient">
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showConsult && <ConsultModal onClose={() => setShowConsult(false)} />}

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-gold tracking-widest uppercase mb-3">Свяжитесь с нами</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">Мы на связи</h2>
          <div className="gold-divider mx-auto my-4" />
          <p className="font-body text-white/70 max-w-md mx-auto">
            Готовы ответить на любые вопросы и помочь с выбором транспорта
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {[
            { icon: "Phone", title: "Телефон", value: "+7 (927) 118-31-31", sub: "Ежедневно 9:00 – 21:00", href: "tel:+79271183131" },
            { icon: "Mail", title: "Email", value: "viatek@bk.ru", sub: "Ответим в течение часа", href: "mailto:viatek@bk.ru" },
            { icon: "MapPin", title: "Адрес", value: "Лесозаводская ул.", sub: "Район турбазы Малиновка", href: "#" },
          ].map((c) => (
            <a key={c.title} href={c.href} className="glass-card rounded-2xl p-7 text-center hover-lift block">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Icon name={c.icon as any} size={22} className="text-gold" />
              </div>
              <p className="font-body text-xs tracking-wide uppercase mb-2" style={{ color: "#14556f" }}>{c.title}</p>
              <p className="font-display text-lg font-semibold mb-1" style={{ color: "#14556f" }}>{c.value}</p>
              <p className="font-body text-xs" style={{ color: "#14556f" }}>{c.sub}</p>
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 mb-8">
          {[
            { label: "WhatsApp", color: "#25D366", letter: "W", href: "https://wa.me/79271183131" },
            { label: "Telegram", color: "#2AABEE", letter: "T", href: "https://t.me/ViatekVlad" },
            { label: "Max", color: "#FF6B35", letter: "M", href: "https://t.me/ViatekVlad" },
          ].map((m) => (
            <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center gap-2.5 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur rounded-full transition-all group justify-center">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: m.color }}>
                {m.letter}
              </span>
              <span className="font-body text-sm text-white font-medium">{m.label}</span>
            </a>
          ))}
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => setShowConsult(true)}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-gold text-navy font-body font-semibold rounded-full hover:bg-[hsl(var(--gold-light))] transition-colors text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <Icon name="MessageCircle" size={18} />
            Получить консультацию
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <footer className="bg-navy py-12">
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-ocean flex items-center justify-center">
              <Icon name="Anchor" size={14} className="text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-white">
              Volga<span className="text-gold">-Viatek</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { id: "fleet", label: "Услуги" },
              { id: "services", label: "Варианты отдыха" },
              { id: "reviews", label: "Отзывы" },
              { id: "gallery", label: "Галерея" },
              { id: "faq", label: "FAQ" },
              { id: "contacts", label: "Контакты" },
            ].map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="font-body text-xs text-white/40 hover:text-white/80 transition-colors tracking-wide uppercase">
                {l.label}
              </button>
            ))}
          </div>

          <p className="font-body text-xs text-white/30">© 2026 Volga-Viatek.</p>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button onClick={() => setShowPrivacy(true)}
            className="font-body text-xs text-white/40 hover:text-white/70 underline transition-colors">
            Политика конфиденциальности
          </button>
          <p className="font-body text-xs text-white/20">
            Все права защищены. Использование материалов сайта без разрешения запрещено.
          </p>
        </div>
      </div>
    </footer>
  );
}