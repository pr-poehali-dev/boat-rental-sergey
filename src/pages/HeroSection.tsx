import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { STATS } from "./data";
import { scrollTo } from "./shared";

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
