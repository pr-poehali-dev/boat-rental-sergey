/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Data ───────────────────────────────────────────────────────────────────

const HERO_IMG = "https://cdn.poehali.dev/projects/0a1fcfcb-4fd2-47cb-863a-9d64fd893ec8/files/1c4e4e49-10cf-45c5-a3b6-c57558e62552.jpg";
const MARINA_IMG = "https://cdn.poehali.dev/projects/0a1fcfcb-4fd2-47cb-863a-9d64fd893ec8/files/f09295be-12c0-42f9-bf2a-652e6d7eb5b6.jpg";
const INTERIOR_IMG = "https://cdn.poehali.dev/projects/0a1fcfcb-4fd2-47cb-863a-9d64fd893ec8/files/ceceed34-44ba-4637-b64a-9157e4f22944.jpg";

const FLEET = [
  {
    id: 1,
    name: "Oceania Grand",
    type: "Супер-яхта",
    length: "42 м",
    guests: 12,
    cabins: 5,
    crew: 6,
    speed: "18 уз",
    price: 180000,
    features: ["Джакузи на палубе", "Кинотеатр", "Тендер 6м", "Шеф-повар"],
    image: HERO_IMG,
    badge: "Хит сезона",
  },
  {
    id: 2,
    name: "Azure Dream",
    type: "Моторная яхта",
    length: "28 м",
    guests: 8,
    cabins: 3,
    crew: 3,
    speed: "22 уз",
    price: 95000,
    features: ["Открытая терраса", "Водные игрушки", "Бар", "Кают-компания"],
    image: MARINA_IMG,
    badge: null,
  },
  {
    id: 3,
    name: "Pearl Horizon",
    type: "Парусная яхта",
    length: "22 м",
    guests: 6,
    cabins: 3,
    crew: 2,
    speed: "12 уз",
    price: 55000,
    features: ["Эко-путешествие", "Снорклинг", "Закат в море", "Капитанский мостик"],
    image: INTERIOR_IMG,
    badge: "Эко-выбор",
  },
];

const SERVICES = [
  {
    icon: "Anchor",
    title: "Яхтенный чартер",
    desc: "Аренда яхт любого класса — от парусных до супер-яхт. Экипаж, страховка и топливо включены.",
  },
  {
    icon: "Utensils",
    title: "Гастрономические круизы",
    desc: "Шеф-повар на борту, свежие морепродукты, авторские меню с дегустацией местных вин.",
  },
  {
    icon: "Heart",
    title: "Корпоративные события",
    desc: "Тимбилдинг, деловые переговоры и презентации на воде. Полное оснащение для встреч.",
  },
  {
    icon: "Star",
    title: "Свадьбы и торжества",
    desc: "Незабываемые церемонии в море. Декор, фотограф, живая музыка — всё организуем.",
  },
  {
    icon: "Waves",
    title: "Водные развлечения",
    desc: "Гидроциклы, SUP-борды, дайвинг, рыбалка, снорклинг — полный набор активностей.",
  },
  {
    icon: "Shield",
    title: "VIP-трансфер",
    desc: "Доставка на борт на вертолёте или катере. Личный менеджер 24/7 на протяжении всего чартера.",
  },
];

const REVIEWS = [
  {
    name: "Александр Морозов",
    role: "Генеральный директор",
    rating: 5,
    text: "Организовали корпоратив на яхте Oceania Grand. Всё было на высшем уровне — экипаж профессиональный, кухня потрясающая. Партнёры были в восторге. Однозначно рекомендую!",
    date: "Май 2025",
    yacht: "Oceania Grand",
  },
  {
    name: "Екатерина Соколова",
    role: "Блогер",
    rating: 5,
    text: "Арендовали Azure Dream для свадебного путешествия. Это было волшебство — закат в открытом море, шампанское, полная тишина. Спасибо за организацию каждой детали!",
    date: "Апрель 2025",
    yacht: "Azure Dream",
  },
  {
    name: "Дмитрий Кузнецов",
    role: "Предприниматель",
    rating: 5,
    text: "Третий год подряд беру Pearl Horizon. Невероятная яхта для тех, кто ценит настоящее парусное путешествие. Экипаж знает свои маршруты в совершенстве.",
    date: "Июнь 2025",
    yacht: "Pearl Horizon",
  },
];

const FAQ_ITEMS = [
  {
    q: "Что входит в стоимость аренды?",
    a: "В стоимость включены: яхта с полным техническим оснащением, профессиональный экипаж, страховка КАСКО, топливо в пределах маршрута, стандартный набор безопасности. Питание, алкоголь и дополнительные активности оплачиваются отдельно.",
  },
  {
    q: "За сколько заранее нужно бронировать?",
    a: "Рекомендуем бронировать за 2–4 недели. В высокий сезон (июль–август) — за 1–2 месяца. Возможны и экспресс-бронирования за 48 часов при наличии свободных яхт.",
  },
  {
    q: "Можно ли взять яхту без опытного экипажа?",
    a: "Для всех яхт мы предоставляем профессиональный экипаж. Это обеспечивает вашу безопасность и комфорт. При наличии соответствующих лицензий возможна аренда без шкипера — уточняйте при бронировании.",
  },
  {
    q: "Какая политика отмены бронирования?",
    a: "Отмена за 30+ дней — полный возврат. За 14–30 дней — возврат 50%. Менее 14 дней — депозит не возвращается. Мы также предлагаем страховку путешествия для форс-мажоров.",
  },
  {
    q: "Какие документы нужны для бронирования?",
    a: "Паспорт или документ, удостоверяющий личность. Все юридические документы по сделке подписываются в электронном виде. Для корпоративных заказов дополнительно — реквизиты компании.",
  },
];

const STATS = [
  { value: "12+", label: "Яхт в флоте" },
  { value: "1500+", label: "Счастливых гостей" },
  { value: "8 лет", label: "На рынке" },
  { value: "4.9", label: "Средний рейтинг" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="Star"
          size={14}
          className={i <= rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function GoldDivider({ left }: { left?: boolean }) {
  return <div className={`gold-divider ${left ? "" : "mx-auto"} my-4`} />;
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "fleet", label: "Флот" },
    { id: "services", label: "Услуги" },
    { id: "reviews", label: "Отзывы" },
    { id: "about", label: "О нас" },
    { id: "faq", label: "FAQ" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card border-b border-white/30">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full ocean-gradient flex items-center justify-center">
              <Icon name="Anchor" size={16} className="text-white" />
            </div>
            <span className="font-display text-xl font-semibold tracking-wide text-navy">
              Aqua<span className="text-gold">Luxe</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="nav-link text-navy/70 hover:text-navy"
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("booking")}
            className="hidden md:block px-5 py-2 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full hover:bg-ocean transition-colors tracking-wide"
          >
            Забронировать
          </button>

          <button className="md:hidden p-2 text-navy" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur border-t border-white/30 px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
                className="text-left nav-link text-navy/80 hover:text-navy py-1"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo("booking"); setMenuOpen(false); }}
              className="mt-2 px-5 py-2.5 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full"
            >
              Забронировать
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
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
          Море ждёт
          <br />
          <span className="italic text-[hsl(var(--gold-light))]">вас</span>
        </h1>

        <p className="animate-fade-up-delay-2 font-body text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed mb-10">
          Аренда яхт премиум класса. Ваш личный флот — от уютных парусников до роскошных супер-яхт.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo("booking")}
            className="px-8 py-3.5 bg-gold text-navy font-body font-semibold rounded-full hover:bg-[hsl(var(--gold-light))] transition-all duration-200 tracking-wide text-sm shadow-lg hover:shadow-xl hover:scale-105"
          >
            Забронировать яхту
          </button>
          <button
            onClick={() => scrollTo("fleet")}
            className="px-8 py-3.5 bg-white/15 text-white border border-white/40 font-body font-medium rounded-full hover:bg-white/25 transition-all duration-200 tracking-wide text-sm backdrop-blur"
          >
            Смотреть флот
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

      <button
        onClick={() => scrollTo("fleet")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
      >
        <span className="font-body text-xs tracking-widest uppercase">Листать</span>
        <Icon name="ChevronDown" size={18} className="animate-bounce" />
      </button>
    </section>
  );
}

// ─── Fleet ────────────────────────────────────────────────────────────────────

function FleetSection() {
  return (
    <section id="fleet" className="py-24 bg-pearl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Наш флот</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Выберите свою яхту</h2>
          <GoldDivider />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mt-4">
            Каждое судно — произведение инженерного искусства, укомплектованное для максимального комфорта
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FLEET.map((yacht) => (
            <div key={yacht.id} className="group bg-white rounded-2xl overflow-hidden hover-lift border border-white shadow-sm">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={yacht.image}
                  alt={yacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {yacht.badge && (
                  <Badge className="absolute top-4 left-4 bg-gold text-navy font-body text-xs font-semibold">
                    {yacht.badge}
                  </Badge>
                )}
                <div className="absolute bottom-4 left-4">
                  <p className="font-body text-xs text-white/70 tracking-wide">{yacht.type}</p>
                  <h3 className="font-display text-2xl font-semibold text-white">{yacht.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { icon: "Ruler", label: "Длина", val: yacht.length },
                    { icon: "Users", label: "Гостей", val: String(yacht.guests) },
                    { icon: "BedDouble", label: "Каюты", val: String(yacht.cabins) },
                    { icon: "Gauge", label: "Скорость", val: yacht.speed },
                  ].map((spec) => (
                    <div key={spec.label} className="text-center">
                      <div className="w-8 h-8 rounded-lg bg-ocean-pale flex items-center justify-center mx-auto mb-1.5">
                        <Icon name={spec.icon as any} size={14} className="text-ocean" />
                      </div>
                      <div className="font-body text-xs font-semibold text-navy">{spec.val}</div>
                      <div className="font-body text-[10px] text-muted-foreground">{spec.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {yacht.features.map((f) => (
                    <span key={f} className="font-body text-xs px-2.5 py-1 bg-sand rounded-full text-navy/70">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-body text-xs text-muted-foreground">от</p>
                    <p className="font-display text-2xl font-semibold text-navy">
                      {yacht.price.toLocaleString("ru-RU")} ₽
                    </p>
                    <p className="font-body text-xs text-muted-foreground">/ сутки</p>
                  </div>
                  <button
                    onClick={() => scrollTo("booking")}
                    className="px-5 py-2.5 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full hover:bg-ocean transition-colors"
                  >
                    Забронировать
                  </button>
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

function BookingSection() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    yacht: "", date: "", time: "",
    duration: "1", guests: "1–2",
  });
  const [submitted, setSubmitted] = useState(false);

  const selectedYacht = FLEET.find((y) => y.name === form.yacht);
  const dailyPrice = selectedYacht ? selectedYacht.price : 0;
  const totalPrice = dailyPrice * parseInt(form.duration || "1");

  const inputClass =
    "w-full font-body text-sm px-4 py-3 border border-border rounded-xl bg-white focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/30 transition-all placeholder:text-muted-foreground/60";
  const labelClass =
    "font-body text-xs font-medium text-navy/70 mb-1.5 block tracking-wide uppercase";

  return (
    <section id="booking" className="py-24 bg-white">
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
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-2.5 border border-ocean text-ocean font-body text-sm rounded-full hover:bg-ocean-pale transition-colors"
              >
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
                  <label className={labelClass}>Email</label>
                  <input className={inputClass} placeholder="email@example.com" type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                <div>
                  <label className={labelClass}>Выберите яхту</label>
                  <select className={inputClass} value={form.yacht}
                    onChange={(e) => setForm({ ...form, yacht: e.target.value })} required>
                    <option value="">— Выберите из флота —</option>
                    {FLEET.map((y) => (
                      <option key={y.id} value={y.name}>
                        {y.name} — {y.type} ({y.price.toLocaleString("ru-RU")} ₽/сут)
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
                    <label className={labelClass}>Дней</label>
                    <select className={inputClass} value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}>
                      {[1,2,3,5,7,10,14].map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 1 ? "день" : d < 5 ? "дня" : "дней"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Количество гостей</label>
                  <div className="flex gap-3 flex-wrap">
                    {["1–2","3–4","5–6","7–8","9+"].map((g) => (
                      <button key={g} type="button"
                        onClick={() => setForm({ ...form, guests: g })}
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

                <button type="submit"
                  className="w-full py-4 bg-navy text-[hsl(var(--gold-light))] font-body font-semibold rounded-xl hover:bg-ocean transition-colors text-sm tracking-wide mt-2">
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
                          <span className="text-white/60">Яхта</span>
                          <span className="font-medium text-white">{form.yacht}</span>
                        </div>
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Цена в сутки</span>
                          <span className="font-medium text-white">{dailyPrice.toLocaleString("ru-RU")} ₽</span>
                        </div>
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Дней</span>
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
                      <p className="font-body text-sm text-white/40">Выберите яхту для расчёта стоимости</p>
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

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesSection() {
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

function ReviewsSection() {
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

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-pearl overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">О компании</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-6 leading-tight">
              Восемь лет<br />
              <span className="italic text-ocean">морских историй</span>
            </h2>
            <GoldDivider left />

            <div className="space-y-5 font-body text-navy/70 leading-relaxed">
              <p>
                AquaLuxe — это команда профессионалов, влюблённых в море. Мы основали компанию в 2016 году с одной яхтой и мечтой предоставлять сервис мирового уровня.
              </p>
              <p>
                Сегодня наш флот насчитывает 12 судов, от элегантных парусников до 42-метровых супер-яхт. Каждая яхта тщательно отобрана с безупречной репутацией.
              </p>
              <p>
                Наши шкиперы — сертифицированные профессионалы с многолетним опытом. Мы создаём воспоминания, которые остаются на всю жизнь.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { icon: "Award", text: "Лицензированный оператор" },
                { icon: "Globe", text: "Весь Черноморский регион" },
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
            <img src={MARINA_IMG} alt="Наш флот"
              className="absolute top-0 right-0 w-4/5 h-72 object-cover rounded-2xl shadow-xl" />
            <img src={INTERIOR_IMG} alt="Интерьер яхты"
              className="absolute bottom-0 left-0 w-3/5 h-56 object-cover rounded-2xl shadow-xl border-4 border-white" />
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-xs text-ocean tracking-widest uppercase mb-3">Часто спрашивают</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">FAQ</h2>
            <GoldDivider />
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-pearl rounded-xl px-6 border-none">
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

function ContactsSection() {
  return (
    <section id="contacts" className="py-24 ocean-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-body text-xs text-gold tracking-widest uppercase mb-3">Свяжитесь с нами</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4">Мы на связи</h2>
          <div className="gold-divider mx-auto my-4" />
          <p className="font-body text-white/70 max-w-md mx-auto">
            Готовы ответить на любые вопросы и помочь с выбором яхты
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: "Phone", title: "Телефон", value: "+7 (800) 555-00-10", sub: "Ежедневно 9:00 – 21:00" },
            { icon: "Mail", title: "Email", value: "hello@aqualuxe.ru", sub: "Ответим в течение часа" },
            { icon: "MapPin", title: "Адрес", value: "Сочи, Навигационный пер. 5", sub: "Причал №12, Рыбный порт" },
          ].map((c) => (
            <div key={c.title} className="glass-card rounded-2xl p-7 text-center hover-lift">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Icon name={c.icon as any} size={22} className="text-gold" />
              </div>
              <p className="font-body text-xs text-white/50 tracking-wide uppercase mb-2">{c.title}</p>
              <p className="font-display text-lg font-semibold text-white mb-1">{c.value}</p>
              <p className="font-body text-xs text-white/50">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          {[
            { icon: "Send", label: "Telegram" },
            { icon: "Instagram", label: "Instagram" },
            { icon: "Youtube", label: "YouTube" },
          ].map((s) => (
            <button key={s.label}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors group">
              <Icon name={s.icon as any} size={18} className="text-white/70 group-hover:text-white" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-navy py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-ocean flex items-center justify-center">
              <Icon name="Anchor" size={14} className="text-white" />
            </div>
            <span className="font-display text-lg font-semibold text-white">
              Aqua<span className="text-gold">Luxe</span>
            </span>
          </div>

          <div className="flex gap-8">
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

          <p className="font-body text-xs text-white/30">© 2025 AquaLuxe. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <HeroSection />
      <FleetSection />
      <BookingSection />
      <ServicesSection />
      <ReviewsSection />
      <AboutSection />
      <FaqSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}