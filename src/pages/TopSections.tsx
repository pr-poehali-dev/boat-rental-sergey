/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { FLEET, STATS } from "./data";
import { scrollTo, GoldDivider, PrivacyModal, ConsultModal } from "./shared";

// ─── NavBar ───────────────────────────────────────────────────────────────────

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConsult, setShowConsult] = useState(false);

  const links = [
    { id: "fleet", label: "Услуги" },
    { id: "services", label: "Варианты отдыха" },
    { id: "reviews", label: "Отзывы" },
    { id: "gallery", label: "Галерея" },
    { id: "faq", label: "FAQ" },
    { id: "contacts", label: "Контакты" },
  ];

  const messengers = [
    { label: "WhatsApp", color: "#25D366", letter: "W", href: "https://wa.me/78005550010" },
    { label: "Telegram", color: "#2AABEE", letter: "T", href: "https://t.me/viatekrelax" },
    { label: "Max", color: "#FF6B35", letter: "M", href: "#" },
  ];

  return (
    <>
      {showConsult && <ConsultModal onClose={() => setShowConsult(false)} />}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="glass-card border-b border-white/30">
          <div className="container mx-auto px-6 flex items-center justify-between h-16 gap-4">
            <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-full ocean-gradient flex items-center justify-center">
                <Icon name="Anchor" size={16} className="text-white" />
              </div>
              <span className="font-display text-xl font-semibold tracking-wide text-navy">
                Viatek<span className="text-gold">-Relax</span>
              </span>
            </button>

            <div className="hidden lg:flex items-center gap-6">
              {links.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link text-navy/70 hover:text-navy whitespace-nowrap text-sm">
                  {l.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <a href="tel:+78005550010" className="font-body text-sm font-medium text-navy hover:text-ocean transition-colors whitespace-nowrap">
                +7 (800) 555-00-10
              </a>
              {messengers.map((m) => (
                <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                  title={m.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-body font-bold text-sm hover:scale-110 transition-transform flex-shrink-0"
                  style={{ backgroundColor: m.color }}>
                  {m.letter}
                </a>
              ))}
              <button
                onClick={() => setShowConsult(true)}
                className="ml-1 px-4 py-2 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full hover:bg-ocean transition-colors tracking-wide whitespace-nowrap">
                Получить консультацию
              </button>
            </div>

            <button className="lg:hidden p-2 text-navy" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>

          {menuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur border-t border-white/30 px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button key={l.id} onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
                  className="text-left nav-link text-navy/80 hover:text-navy py-1">
                  {l.label}
                </button>
              ))}
              <div className="flex items-center gap-3 pt-1">
                <a href="tel:+78005550010" className="font-body text-sm font-medium text-navy">
                  +7 (800) 555-00-10
                </a>
                {messengers.map((m) => (
                  <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                    title={m.label}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-body font-bold text-sm"
                    style={{ backgroundColor: m.color }}>
                    {m.letter}
                  </a>
                ))}
              </div>
              <button onClick={() => { setShowConsult(true); setMenuOpen(false); }}
                className="mt-1 px-5 py-2.5 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full">
                Получить консультацию
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HERO_IMG = "https://cdn.poehali.dev/projects/0a1fcfcb-4fd2-47cb-863a-9d64fd893ec8/files/1c4e4e49-10cf-45c5-a3b6-c57558e62552.jpg";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--pearl))] to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-up">
          <Badge className="mb-6 bg-white/15 text-white border-white/30 backdrop-blur font-body text-xs tracking-widest uppercase px-4 py-1.5">
            Яхтенный чартер премиум класса
          </Badge>
        </div>

        <h1 className="animate-fade-up-delay-1 font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-tight mb-6">
          Волга ждёт
          <br />
          <span className="italic text-[hsl(var(--gold-light))]">вас</span>
        </h1>

        <p className="animate-fade-up-delay-2 font-body text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed mb-10">
          Аренда яхт и речного транспорта премиум класса. Ваш личный флот — от уютных парусников до роскошных супер-яхт.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo("booking")}
            className="px-8 py-3.5 bg-gold text-navy font-body font-semibold rounded-full hover:bg-[hsl(var(--gold-light))] transition-all duration-200 tracking-wide text-sm shadow-lg hover:shadow-xl hover:scale-105">
            Забронировать
          </button>
          <button onClick={() => scrollTo("fleet")}
            className="px-8 py-3.5 bg-white/15 text-white border border-white/40 font-body font-medium rounded-full hover:bg-white/25 transition-all duration-200 tracking-wide text-sm backdrop-blur">
            Смотреть услуги
          </button>
        </div>

        <div className="animate-fade-up-delay-3 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--gold-light))]">{s.value}</div>
              <div className="font-body text-xs text-white/60 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => scrollTo("fleet")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
        <Icon name="ChevronDown" size={18} className="animate-bounce" />
      </button>
    </section>
  );
}

// ─── Photo Slider Modal ───────────────────────────────────────────────────────

function PhotoSliderModal({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);

  const go = (dir: number) => {
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
        <Icon name="X" size={20} className="text-white" />
      </button>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <span className="font-body text-sm text-white/60">{current + 1} / {images.length}</span>
      </div>

      <button
        onClick={() => go(-1)}
        className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
        <Icon name="ChevronLeft" size={24} className="text-white" />
      </button>

      <div className="w-full h-full flex items-center justify-center px-20 py-16">
        <img
          src={images[current]}
          alt={`Фото ${current + 1}`}
          className="max-w-full max-h-full object-contain rounded-xl"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        />
      </div>

      <button
        onClick={() => go(1)}
        className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
        <Icon name="ChevronRight" size={24} className="text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Fleet / Services ─────────────────────────────────────────────────────────

export function FleetSection() {
  const [sliderState, setSliderState] = useState<{ images: string[]; start: number } | null>(null);
  const [showConsult, setShowConsult] = useState(false);

  return (
    <section id="fleet" className="py-24 bg-pearl">
      {sliderState && (
        <PhotoSliderModal
          images={sliderState.images}
          startIndex={sliderState.start}
          onClose={() => setSliderState(null)}
        />
      )}
      {showConsult && <ConsultModal onClose={() => setShowConsult(false)} />}

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Наши услуги</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Выберите услугу для аренды</h2>
          <GoldDivider />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mt-4">
            Собственный причал на Волге — удобная посадка, профессиональные капитаны, полная безопасность
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FLEET.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden hover-lift border border-white shadow-sm flex flex-col">
              <div
                className="relative h-52 overflow-hidden cursor-pointer"
                onClick={() => setSliderState({ images: item.images, start: 0 })}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 transition-all flex items-center justify-center">
                    <Icon name="Images" size={20} className="text-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {item.badge && (
                  <Badge className="absolute top-4 left-4 bg-gold text-navy font-body text-xs font-semibold">
                    {item.badge}
                  </Badge>
                )}
                {item.images.length > 1 && (
                  <span className="absolute bottom-3 right-3 bg-black/50 text-white font-body text-xs px-2 py-0.5 rounded-full">
                    {item.images.length} фото
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <h3 className="font-display text-xl font-semibold text-navy leading-tight">{item.name}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.features.map((f) => (
                    <span key={f} className="font-body text-xs px-2.5 py-1 bg-sand rounded-full text-navy/70">{f}</span>
                  ))}
                </div>

                <p className="font-body text-sm text-navy/60 leading-relaxed mb-5 flex-1">{item.desc}</p>

                <div className="flex items-end justify-between mt-auto">
                  {item.id === 9 ? (
                    <button
                      onClick={() => setShowConsult(true)}
                      className="w-full py-2.5 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full hover:bg-ocean transition-colors">
                      Получить консультацию
                    </button>
                  ) : (
                    <>
                      <div>
                        <p className="font-body text-xs text-muted-foreground">от</p>
                        <p className="font-display text-2xl font-semibold text-navy">
                          {item.price.toLocaleString("ru-RU")} ₽
                        </p>
                        <p className="font-body text-xs text-muted-foreground">/ час</p>
                      </div>
                      <button onClick={() => scrollTo("booking")}
                        className="px-5 py-2.5 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full hover:bg-ocean transition-colors">
                        Забронировать
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export function BookingSection() {
  const [form, setForm] = useState({
    name: "", phone: "",
    yacht: "", date: "", time: "",
    duration: "1", guests: "1–2",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const selectedYacht = FLEET.find((y) => y.name === form.yacht);
  const hourlyPrice = selectedYacht ? selectedYacht.price : 0;
  const totalPrice = hourlyPrice * parseInt(form.duration || "1");

  const inputClass = "w-full font-body text-sm px-4 py-3 border border-border rounded-xl bg-white focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/30 transition-all placeholder:text-muted-foreground/60";
  const labelClass = "font-body text-xs font-medium text-navy/70 mb-1.5 block tracking-wide uppercase";

  return (
    <section id="booking" className="py-24 bg-white">
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Онлайн-бронирование</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Начните планировать</h2>
            <GoldDivider />
            <p className="font-body text-muted-foreground max-w-xl mx-auto mt-4">
              Заполните форму — менеджер свяжется с вами в течение 30 минут
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-ocean-pale flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={36} className="text-ocean" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-navy mb-3">Заявка отправлена!</h3>
              <p className="font-body text-muted-foreground max-w-md mx-auto">
                Наш менеджер свяжется с вами в течение 30 минут для подтверждения бронирования.
              </p>
              <button onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-2.5 border border-ocean text-ocean font-body text-sm rounded-full hover:bg-ocean-pale transition-colors">
                Новая заявка
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="md:col-span-2 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Ваше имя</label>
                    <input className={inputClass} placeholder="Александр" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className={labelClass}>Телефон</label>
                    <input className={inputClass} placeholder="+7 (999) 000-00-00" type="tel" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Выберите услугу</label>
                  <select className={inputClass} value={form.yacht}
                    onChange={(e) => setForm({ ...form, yacht: e.target.value })} required>
                    <option value="">— Выберите из услуг —</option>
                    {FLEET.filter((y) => y.price > 0).map((y) => (
                      <option key={y.id} value={y.name}>
                        {y.name} (от {y.price.toLocaleString("ru-RU")} ₽/ч)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className={labelClass}>Дата начала</label>
                    <input className={inputClass} type="date" value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                  </div>
                  <div>
                    <label className={labelClass}>Время</label>
                    <select className={inputClass} value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}>
                      <option value="">Время</option>
                      {["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Часов</label>
                    <select className={inputClass} value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}>
                      {[1,2,3,4,5,6,8,10,12].map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 1 ? "час" : d < 5 ? "часа" : "часов"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Количество гостей</label>
                  <div className="flex gap-3 flex-wrap">
                    {["1–2","3–4","5–6","7–8","9+"].map((g) => (
                      <button key={g} type="button" onClick={() => setForm({ ...form, guests: g })}
                        className={`px-4 py-2 rounded-full font-body text-sm border transition-all ${
                          form.guests === g
                            ? "bg-navy text-[hsl(var(--gold-light))] border-navy"
                            : "bg-white text-navy border-border hover:border-ocean"
                        }`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    form.agree ? "bg-navy border-navy" : "border-border group-hover:border-ocean"
                  }`}
                    onClick={() => setForm({ ...form, agree: !form.agree })}>
                    {form.agree && <Icon name="Check" size={12} className="text-[hsl(var(--gold-light))]" />}
                  </div>
                  <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} required className="sr-only" />
                  <span className="font-body text-sm text-navy/70 leading-relaxed">
                    Я согласен(а) с{" "}
                    <button type="button" onClick={() => setShowPrivacy(true)}
                      className="text-ocean underline hover:text-navy transition-colors">
                      Политикой конфиденциальности
                    </button>{" "}
                    и даю согласие на обработку персональных данных
                  </span>
                </label>

                <button type="submit"
                  className="w-full py-4 bg-navy text-[hsl(var(--gold-light))] font-body font-semibold rounded-xl hover:bg-ocean transition-colors text-sm tracking-wide mt-2 disabled:opacity-50"
                  disabled={!form.agree}>
                  Отправить заявку
                </button>
              </form>

              <div className="space-y-5">
                <div className="bg-navy rounded-2xl p-6 text-white">
                  <h4 className="font-display text-xl font-semibold mb-4 text-[hsl(var(--gold-light))]">Калькулятор</h4>
                  {form.yacht ? (
                    <>
                      <div className="space-y-3 mb-5">
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Услуга</span>
                          <span className="font-medium text-white text-right text-xs leading-snug">{form.yacht}</span>
                        </div>
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Цена в час</span>
                          <span className="font-medium text-white">{hourlyPrice.toLocaleString("ru-RU")} ₽</span>
                        </div>
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Часов</span>
                          <span className="font-medium text-white">{form.duration}</span>
                        </div>
                        <div className="h-px bg-white/20" />
                        <div className="flex justify-between items-center">
                          <span className="font-body text-sm text-white/60">Итого</span>
                          <span className="font-display text-2xl font-semibold text-gold">
                            {totalPrice.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </div>
                      <p className="font-body text-xs text-white/40">* Окончательная стоимость уточняется менеджером</p>
                    </>
                  ) : (
                    <div className="py-6 text-center">
                      <Icon name="Calculator" size={36} className="text-white/20 mx-auto mb-3" />
                      <p className="font-body text-sm text-white/40">Выберите услугу для расчёта</p>
                    </div>
                  )}
                </div>

                <div className="bg-sand rounded-2xl p-5 space-y-4">
                  {[
                    { icon: "Shield", text: "Страховка включена" },
                    { icon: "Users", text: "Профессиональный экипаж" },
                    { icon: "Clock", text: "Ответ за 30 минут" },
                    { icon: "RefreshCw", text: "Гибкая отмена" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-ocean-pale flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} size={15} className="text-ocean" />
                      </div>
                      <span className="font-body text-sm text-navy/80">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
