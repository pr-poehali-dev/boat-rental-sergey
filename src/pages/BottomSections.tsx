/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICES, REVIEWS, STATS, FAQ_ITEMS, GALLERY_PHOTOS } from "./data";
import { scrollTo, StarRating, GoldDivider, PrivacyModal } from "./shared";

const MARINA_IMG = "https://cdn.poehali.dev/projects/0a1fcfcb-4fd2-47cb-863a-9d64fd893ec8/files/f09295be-12c0-42f9-bf2a-652e6d7eb5b6.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/0a1fcfcb-4fd2-47cb-863a-9d64fd893ec8/files/ceceed34-44ba-4637-b64a-9157e4f22944.jpg";

// ─── Services ─────────────────────────────────────────────────────────────────

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-pearl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Что мы предлагаем</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Услуги</h2>
          <GoldDivider />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="group bg-white rounded-2xl p-7 hover-lift border border-white shadow-sm">
              <div className="w-12 h-12 rounded-xl ocean-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={s.icon as any} size={22} className="text-white" />
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

// ─── About ────────────────────────────────────────────────────────────────────

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-pearl overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">О компании</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-6 leading-tight">
              Восемь лет<br />
              <span className="italic text-ocean">на Волге</span>
            </h2>
            <GoldDivider left />
            <div className="space-y-5 font-body text-navy/70 leading-relaxed">
              <p>Viatek-Relax — это команда профессионалов, влюблённых в реку. Мы основали компанию в 2016 году с одной яхтой и мечтой предоставлять сервис мирового уровня на Волге.</p>
              <p>Сегодня наш флот насчитывает 12 судов, от элегантных парусников до 42-метровых супер-яхт. Каждое судно тщательно отобрано с безупречной репутацией.</p>
              <p>Наши шкиперы — сертифицированные профессионалы с многолетним опытом. Мы создаём воспоминания, которые остаются на всю жизнь.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { icon: "Award", text: "Лицензированный оператор" },
                { icon: "Globe", text: "Весь Волжский регион" },
                { icon: "PhoneCall", text: "Поддержка 24/7" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Icon name={item.icon as any} size={15} className="text-ocean" />
                  <span className="font-body text-xs text-navy font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[480px] hidden lg:block">
            <img src={MARINA_IMG} alt="Наш флот" className="absolute top-0 right-0 w-4/5 h-72 object-cover rounded-2xl shadow-xl" />
            <img src={INTERIOR_IMG} alt="Интерьер яхты" className="absolute bottom-0 left-0 w-3/5 h-56 object-cover rounded-2xl shadow-xl border-4 border-white" />
            <div className="absolute bottom-28 right-0 bg-white rounded-xl p-4 shadow-lg w-36 text-center">
              <div className="font-display text-3xl font-semibold text-navy">4.9</div>
              <StarRating rating={5} />
              <p className="font-body text-xs text-muted-foreground mt-1">1500+ отзывов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function GallerySection() {
  const [current, setCurrent] = useState(0);
  const total = GALLERY_PHOTOS.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getIdx = (offset: number) => (current + offset + total) % total;

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3500);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const go = (dir: number) => {
    setCurrent((c) => (c + dir + total) % total);
    startAutoplay();
  };

  const photos = [
    { idx: getIdx(-1), scale: "scale-90 opacity-70", zIndex: "z-0", order: 0 },
    { idx: getIdx(0),  scale: "scale-100 opacity-100", zIndex: "z-10", order: 1 },
    { idx: getIdx(1),  scale: "scale-90 opacity-70", zIndex: "z-0", order: 2 },
  ];

  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Наши моменты</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Галерея</h2>
          <GoldDivider />
        </div>

        <div className="relative flex items-center justify-center gap-4 select-none" style={{ height: 380 }}>
          {photos.map((p, i) => (
            <div
              key={`${p.idx}-${i}`}
              className={`absolute transition-all duration-500 ease-in-out rounded-2xl overflow-hidden shadow-xl ${p.scale} ${p.zIndex}`}
              style={{
                width: i === 1 ? "45%" : "30%",
                height: i === 1 ? 340 : 280,
                left: i === 0 ? "2.5%" : i === 1 ? "27.5%" : "67.5%",
                top: i === 1 ? 0 : 30,
                cursor: i !== 1 ? "pointer" : "default",
              }}
              onClick={() => i !== 1 && go(i === 0 ? -1 : 1)}
            >
              <img
                src={GALLERY_PHOTOS[p.idx].src}
                alt={GALLERY_PHOTOS[p.idx].alt}
                className="w-full h-full object-cover"
              />
              {i !== 1 && (
                <div className="absolute inset-0 bg-navy/20 hover:bg-navy/10 transition-colors" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={() => go(-1)}
            className="w-11 h-11 rounded-full bg-pearl border border-border flex items-center justify-center hover:bg-ocean-pale hover:border-ocean transition-all">
            <Icon name="ChevronLeft" size={20} className="text-navy" />
          </button>

          <div className="flex gap-2">
            {GALLERY_PHOTOS.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); startAutoplay(); }}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-6 h-2 bg-ocean" : "w-2 h-2 bg-border hover:bg-ocean/40"
                }`} />
            ))}
          </div>

          <button onClick={() => go(1)}
            className="w-11 h-11 rounded-full bg-pearl border border-border flex items-center justify-center hover:bg-ocean-pale hover:border-ocean transition-all">
            <Icon name="ChevronRight" size={20} className="text-navy" />
          </button>
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
  const [form, setForm] = useState({ name: "", phone: "", message: "", agree: false });
  const [sent, setSent] = useState(false);

  return (
    <section id="contacts" className="py-24 ocean-gradient">
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
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
            { icon: "Phone", title: "Телефон", value: "+7 (800) 555-00-10", sub: "Ежедневно 9:00 – 21:00" },
            { icon: "Mail", title: "Email", value: "hello@viatek-relax.ru", sub: "Ответим в течение часа" },
            { icon: "MapPin", title: "Адрес", value: "Набережная Волги, 5", sub: "Причал №12" },
          ].map((c) => (
            <div key={c.title} className="glass-card rounded-2xl p-7 text-center hover-lift">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Icon name={c.icon as any} size={22} className="text-gold" />
              </div>
              <p className="font-body text-xs text-white tracking-wide uppercase mb-2">{c.title}</p>
              <p className="font-display text-lg font-semibold text-white mb-1">{c.value}</p>
              <p className="font-body text-xs text-white">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 mb-14">
          {[
            { label: "WhatsApp", color: "#25D366", letter: "W", href: "https://wa.me/78005550010" },
            { label: "Telegram", color: "#2AABEE", letter: "T", href: "https://t.me/viatekrelax" },
            { label: "Max", color: "#FF6B35", letter: "M", href: "#" },
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

        {!sent ? (
          <div className="max-w-md mx-auto glass-card rounded-2xl p-8">
            <h3 className="font-display text-2xl font-semibold text-white mb-6 text-center">Быстрая связь</h3>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <input className="w-full font-body text-sm px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-all"
                placeholder="Ваше имя" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="w-full font-body text-sm px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-all"
                placeholder="Телефон" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <textarea className="w-full font-body text-sm px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-all resize-none"
                placeholder="Ваш вопрос..." rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />

              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  form.agree ? "bg-gold border-gold" : "border-white/40"
                }`} onClick={() => setForm({ ...form, agree: !form.agree })}>
                  {form.agree && <Icon name="Check" size={12} className="text-navy" />}
                </div>
                <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} required className="sr-only" />
                <span className="font-body text-xs text-white/60">
                  Согласен(а) с{" "}
                  <button type="button" onClick={() => setShowPrivacy(true)} className="text-gold underline hover:text-[hsl(var(--gold-light))]">
                    Политикой конфиденциальности
                  </button>
                </span>
              </label>

              <button type="submit" disabled={!form.agree}
                className="w-full py-3 bg-gold text-navy font-body font-semibold rounded-xl hover:bg-[hsl(var(--gold-light))] transition-colors text-sm disabled:opacity-50">
                Отправить
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto glass-card rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={28} className="text-gold" />
            </div>
            <p className="font-display text-2xl font-semibold text-white mb-2">Отправлено!</p>
            <p className="font-body text-sm text-white/60">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        )}
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
              Viatek<span className="text-gold">-Relax</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { id: "fleet", label: "Флот" },
              { id: "services", label: "Услуги" },
              { id: "reviews", label: "Отзывы" },
              { id: "faq", label: "FAQ" },
              { id: "contacts", label: "Контакты" },
            ].map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="font-body text-xs text-white/40 hover:text-white/80 transition-colors tracking-wide uppercase">
                {l.label}
              </button>
            ))}
          </div>

          <p className="font-body text-xs text-white/30">© 2025 Viatek-Relax.</p>
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