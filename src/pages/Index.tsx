/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
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

const GALLERY_PHOTOS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  src: [HERO_IMG, MARINA_IMG, INTERIOR_IMG][i % 3],
  alt: `Фото ${i + 1}`,
}));

const FLEET = [
  {
    id: 1,
    name: "Oceania Grand",
    type: "Супер-яхта",
    price: 180000,
    features: ["Джакузи на палубе", "Кинотеатр", "Тендер 6м", "Шеф-повар"],
    desc: "Роскошная супер-яхта 42 м для самых требовательных гостей. Джакузи, кинотеатр и шеф-повар на борту.",
    image: HERO_IMG,
    badge: "Хит сезона",
  },
  {
    id: 2,
    name: "Azure Dream",
    type: "Моторная яхта",
    price: 95000,
    features: ["Открытая терраса", "Водные игрушки", "Бар", "Кают-компания"],
    desc: "Стремительная моторная яхта 28 м с открытой террасой и полным набором водных развлечений для отдыха.",
    image: MARINA_IMG,
    badge: null,
  },
  {
    id: 3,
    name: "Pearl Horizon",
    type: "Парусная яхта",
    price: 55000,
    features: ["Эко-путешествие", "Снорклинг", "Закат в море", "Капитанский мостик"],
    desc: "Элегантная парусная яхта 22 м для экологичных путешествий. Снорклинг, закаты и свежий морской бриз.",
    image: INTERIOR_IMG,
    badge: "Эко-выбор",
  },
  {
    id: 4,
    name: "Oceania Grand II",
    type: "Супер-яхта",
    price: 185000,
    features: ["Вертолётная площадка", "Бассейн", "Конференц-зал", "Шеф-повар"],
    desc: "Флагман флота — супер-яхта премиум-класса с вертолётной площадкой и бассейном для VIP-путешествий.",
    image: HERO_IMG,
    badge: "VIP",
  },
  {
    id: 5,
    name: "Azure Star",
    type: "Моторная яхта",
    price: 98000,
    features: ["Солнечная палуба", "Снорклинг", "Бар", "Кинотеатр"],
    desc: "Быстрая и комфортная моторная яхта с просторной солнечной палубой и развлечениями для всей семьи.",
    image: MARINA_IMG,
    badge: null,
  },
  {
    id: 6,
    name: "Pearl Moon",
    type: "Парусная яхта",
    price: 58000,
    features: ["Ночные маршруты", "Астро-тур", "Рыбалка", "Закат"],
    desc: "Парусная яхта для ночных маршрутов и астрономических туров. Уникальный опыт наблюдения за звёздами.",
    image: INTERIOR_IMG,
    badge: null,
  },
  {
    id: 7,
    name: "Oceania Prime",
    type: "Супер-яхта",
    price: 175000,
    features: ["Спа на борту", "Дайвинг-центр", "Тендер 8м", "Шеф-сомелье"],
    desc: "Супер-яхта с полноценным спа-центром и дайвинг-оборудованием. Для тех, кто ценит роскошь и активный отдых.",
    image: HERO_IMG,
    badge: null,
  },
  {
    id: 8,
    name: "Azure Wave",
    type: "Моторная яхта",
    price: 92000,
    features: ["Водные лыжи", "Вейкборд", "Барбекю", "Бар"],
    desc: "Активная моторная яхта с полным комплектом водных видов спорта. Идеально для молодёжных компаний.",
    image: MARINA_IMG,
    badge: "Активный отдых",
  },
  {
    id: 9,
    name: "Pearl Aurora",
    type: "Парусная яхта",
    price: 52000,
    features: ["Романтический тур", "Шампанское", "Закат", "Ужин на борту"],
    desc: "Романтическая парусная яхта для двоих с ужином при свечах, шампанским и незабываемым закатом в море.",
    image: INTERIOR_IMG,
    badge: "Романтика",
  },
];

const SERVICES = [
  { icon: "Anchor", title: "Яхтенный чартер", desc: "Аренда яхт любого класса — от парусных до супер-яхт. Экипаж, страховка и топливо включены." },
  { icon: "Utensils", title: "Гастрономические круизы", desc: "Шеф-повар на борту, свежие морепродукты, авторские меню с дегустацией местных вин." },
  { icon: "Heart", title: "Корпоративные события", desc: "Тимбилдинг, деловые переговоры и презентации на воде. Полное оснащение для встреч." },
  { icon: "Star", title: "Свадьбы и торжества", desc: "Незабываемые церемонии в море. Декор, фотограф, живая музыка — всё организуем." },
  { icon: "Waves", title: "Водные развлечения", desc: "Гидроциклы, SUP-борды, дайвинг, рыбалка, снорклинг — полный набор активностей." },
  { icon: "Shield", title: "VIP-трансфер", desc: "Доставка на борт на вертолёте или катере. Личный менеджер 24/7 на протяжении всего чартера." },
];

const REVIEWS = [
  { name: "Александр Морозов", role: "Генеральный директор", rating: 5, text: "Организовали корпоратив на яхте Oceania Grand. Всё было на высшем уровне — экипаж профессиональный, кухня потрясающая. Однозначно рекомендую!", date: "Май 2025", yacht: "Oceania Grand" },
  { name: "Екатерина Соколова", role: "Блогер", rating: 5, text: "Арендовали Azure Dream для свадебного путешествия. Это было волшебство — закат в открытом море, шампанское, полная тишина. Спасибо!", date: "Апрель 2025", yacht: "Azure Dream" },
  { name: "Дмитрий Кузнецов", role: "Предприниматель", rating: 5, text: "Третий год подряд беру Pearl Horizon. Невероятная яхта для тех, кто ценит настоящее парусное путешествие. Экипаж знает маршруты в совершенстве.", date: "Июнь 2025", yacht: "Pearl Horizon" },
];

const FAQ_ITEMS = [
  { q: "Что входит в стоимость аренды?", a: "В стоимость включены: яхта с полным техническим оснащением, профессиональный экипаж, страховка КАСКО, топливо в пределах маршрута, стандартный набор безопасности. Питание, алкоголь и дополнительные активности оплачиваются отдельно." },
  { q: "За сколько заранее нужно бронировать?", a: "Рекомендуем бронировать за 2–4 недели. В высокий сезон (июль–август) — за 1–2 месяца. Возможны и экспресс-бронирования за 48 часов при наличии свободных яхт." },
  { q: "Можно ли взять яхту без опытного экипажа?", a: "Для всех яхт мы предоставляем профессиональный экипаж. При наличии соответствующих лицензий возможна аренда без шкипера — уточняйте при бронировании." },
  { q: "Какая политика отмены бронирования?", a: "Отмена за 30+ дней — полный возврат. За 14–30 дней — возврат 50%. Менее 14 дней — депозит не возвращается. Мы также предлагаем страховку путешествия для форс-мажоров." },
  { q: "Какие документы нужны для бронирования?", a: "Паспорт или документ, удостоверяющий личность. Все юридические документы подписываются в электронном виде. Для корпоративных заказов дополнительно — реквизиты компании." },
];

const STATS = [
  { value: "12+", label: "Яхт в флоте" },
  { value: "1500+", label: "Счастливых гостей" },
  { value: "8 лет", label: "На рынке" },
  { value: "4.9", label: "Средний рейтинг" },
];

const PRIVACY_POLICY = `Политика конфиденциальности

Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей сайта Viatek-Relax.

1. Собираемые данные
Мы собираем имя, номер телефона и иные данные, которые вы добровольно предоставляете при заполнении форм на сайте.

2. Цели обработки
Персональные данные используются исключительно для обработки заявок на аренду, связи с клиентом и улучшения качества обслуживания.

3. Хранение данных
Данные хранятся на защищённых серверах и не передаются третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.

4. Права пользователя
Вы вправе в любое время запросить изменение или удаление своих персональных данных, обратившись к нам по контактным данным, указанным на сайте.

5. Согласие
Отправляя форму на сайте, вы даёте согласие на обработку персональных данных в соответствии с настоящей Политикой.

6. Контакты
По вопросам обработки персональных данных: hello@viatek-relax.ru`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="Star" size={14}
          className={i <= rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-gray-300"} />
      ))}
    </div>
  );
}

function GoldDivider({ left }: { left?: boolean }) {
  return <div className={`gold-divider ${left ? "" : "mx-auto"} my-4`} />;
}

// ─── Privacy Modal ────────────────────────────────────────────────────────────

function PrivacyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-display text-2xl font-semibold text-navy">Политика конфиденциальности</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-pearl flex items-center justify-center hover:bg-sand transition-colors">
            <Icon name="X" size={16} className="text-navy" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <pre className="font-body text-sm text-navy/70 leading-relaxed whitespace-pre-wrap">{PRIVACY_POLICY}</pre>
        </div>
      </div>
    </div>
  );
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
              Viatek<span className="text-gold">-Relax</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link text-navy/70 hover:text-navy">
                {l.label}
              </button>
            ))}
          </div>

          <button onClick={() => scrollTo("booking")}
            className="hidden md:block px-5 py-2 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full hover:bg-ocean transition-colors tracking-wide">
            Забронировать
          </button>

          <button className="md:hidden p-2 text-navy" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur border-t border-white/30 px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <button key={l.id} onClick={() => { scrollTo(l.id); setMenuOpen(false); }}
                className="text-left nav-link text-navy/80 hover:text-navy py-1">
                {l.label}
              </button>
            ))}
            <button onClick={() => { scrollTo("booking"); setMenuOpen(false); }}
              className="mt-2 px-5 py-2.5 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full">
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

      <button onClick={() => scrollTo("fleet")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors">
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
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy mb-4">Выберите транспорт для аренды</h2>
          <GoldDivider />
          <p className="font-body text-muted-foreground max-w-xl mx-auto mt-4">
            Каждое судно — произведение инженерного искусства, укомплектованное для максимального комфорта
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FLEET.map((yacht) => (
            <div key={yacht.id} className="group bg-white rounded-2xl overflow-hidden hover-lift border border-white shadow-sm">
              {/* Image — без текста поверх */}
              <div className="relative h-52 overflow-hidden">
                <img src={yacht.image} alt={yacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {yacht.badge && (
                  <Badge className="absolute top-4 left-4 bg-gold text-navy font-body text-xs font-semibold">
                    {yacht.badge}
                  </Badge>
                )}
              </div>

              <div className="p-6">
                {/* Заголовок карточки */}
                <div className="mb-3">
                  <p className="font-body text-xs text-ocean tracking-wide uppercase mb-1">{yacht.type}</p>
                  <h3 className="font-display text-2xl font-semibold text-navy">{yacht.name}</h3>
                </div>

                {/* Фичи */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {yacht.features.map((f) => (
                    <span key={f} className="font-body text-xs px-2.5 py-1 bg-sand rounded-full text-navy/70">{f}</span>
                  ))}
                </div>

                {/* Описание */}
                <p className="font-body text-sm text-navy/60 leading-relaxed mb-5">{yacht.desc}</p>

                {/* Цена и кнопка */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-body text-xs text-muted-foreground">от</p>
                    <p className="font-display text-2xl font-semibold text-navy">
                      {yacht.price.toLocaleString("ru-RU")} ₽
                    </p>
                    <p className="font-body text-xs text-muted-foreground">/ час</p>
                  </div>
                  <button onClick={() => scrollTo("booking")}
                    className="px-5 py-2.5 bg-navy text-[hsl(var(--gold-light))] font-body text-sm font-medium rounded-full hover:bg-ocean transition-colors">
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
                  <label className={labelClass}>Выберите транспорт</label>
                  <select className={inputClass} value={form.yacht}
                    onChange={(e) => setForm({ ...form, yacht: e.target.value })} required>
                    <option value="">— Выберите из флота —</option>
                    {FLEET.map((y) => (
                      <option key={y.id} value={y.name}>
                        {y.name} — {y.type} ({y.price.toLocaleString("ru-RU")} ₽/ч)
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

                {/* Согласие с политикой */}
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
                          <span className="text-white/60">Транспорт</span>
                          <span className="font-medium text-white">{form.yacht}</span>
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
                      <p className="font-body text-sm text-white/40">Выберите транспорт для расчёта</p>
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

function GallerySection() {
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

        {/* Controls */}
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

function FaqSection() {
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

function ContactsSection() {
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
              <p className="font-body text-xs text-white/50 tracking-wide uppercase mb-2">{c.title}</p>
              <p className="font-display text-lg font-semibold text-white mb-1">{c.value}</p>
              <p className="font-body text-xs text-white/50">{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Мессенджеры */}
        <div className="flex justify-center gap-5 mb-14">
          {[
            { label: "WhatsApp", color: "#25D366", letter: "W", href: "https://wa.me/78005550010" },
            { label: "Telegram", color: "#2AABEE", letter: "T", href: "https://t.me/viatekrelax" },
            { label: "Max", color: "#FF6B35", letter: "M", href: "#" },
          ].map((m) => (
            <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur rounded-full transition-all group">
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-white font-body font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: m.color }}>
                {m.letter}
              </span>
              <span className="font-body text-sm text-white font-medium">{m.label}</span>
            </a>
          ))}
        </div>

        {/* Quick contact form */}
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

function Footer() {
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

        {/* Privacy row */}
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
      <GallerySection />
      <FaqSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
