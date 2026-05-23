import { useState } from "react";
import Icon from "@/components/ui/icon";
import { STATS } from "./data";
import { scrollTo, ConsultModal } from "./shared";

const HERO_IMG = "https://cdn.poehali.dev/projects/0a1fcfcb-4fd2-47cb-863a-9d64fd893ec8/files/1c4e4e49-10cf-45c5-a3b6-c57558e62552.jpg";

const PERKS = [
  { icon: "Anchor", text: "Собственный причал" },
  { icon: "Shield", text: "Страховка включена" },
  { icon: "Clock", text: "Ответ за 15 минут" },
  { icon: "Star", text: "8 лет на Волге" },
];

export function HeroSection() {
  const [showConsult, setShowConsult] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {showConsult && <ConsultModal onClose={() => setShowConsult(false)} />}

      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(var(--pearl))] to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">

        <p className="animate-fade-up font-body text-xs text-[hsl(var(--gold-light))] tracking-[0.25em] uppercase mb-5">
          Аренда катеров, яхт и теплоходов · Саратов
        </p>

        <h1 className="animate-fade-up-delay-1 font-display font-light text-white leading-tight tracking-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.1 }}>
          Отдых на Волге,
          <br />
          <span className="italic text-[hsl(var(--gold-light))]">который запомнится</span>
        </h1>

        <p className="animate-fade-up-delay-2 font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-4">
          Романтический закат, рыбалка с гидом, вечеринка на воде или банкет на теплоходе —
          мы организуем любой отдых на реке <strong className="text-white font-semibold">под ключ</strong>.
        </p>

        <p className="animate-fade-up-delay-2 font-body text-sm text-white/60 mb-10">
          От 3 500 ₽ · Без залога · Выезд от нашего причала
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <button
            onClick={() => setShowConsult(true)}
            className="px-9 py-4 bg-gold text-navy font-body font-bold rounded-full hover:bg-[hsl(var(--gold-light))] transition-all duration-200 tracking-wide text-sm shadow-lg hover:shadow-2xl hover:scale-105">
            Выбрать отдых на Волге
          </button>
          <button onClick={() => scrollTo("fleet")}
            className="px-8 py-4 bg-white/15 text-white border border-white/40 font-body font-medium rounded-full hover:bg-white/25 transition-all duration-200 tracking-wide text-sm backdrop-blur">
            Смотреть все услуги
          </button>
        </div>

        <div className="animate-fade-up-delay-3 flex flex-wrap justify-center gap-3 mb-14">
          {PERKS.map((p) => (
            <div key={p.text} className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
              <Icon name={p.icon} size={14} className="text-[hsl(var(--gold-light))]" />
              <span className="font-body text-xs text-white/90">{p.text}</span>
            </div>
          ))}
        </div>

        <div className="animate-fade-up-delay-3 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold text-[hsl(var(--gold-light))]">{s.value}</div>
              <div className="font-body text-xs text-white/55 mt-1 tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => scrollTo("fleet")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
        <Icon name="ChevronDown" size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
