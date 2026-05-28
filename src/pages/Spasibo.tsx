import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Spasibo() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen ocean-gradient flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-white/15 border border-[hsl(var(--gold-light))]/40 flex items-center justify-center mx-auto mb-8">
          <Icon name="Anchor" size={36} className="text-[hsl(var(--gold-light))]" />
        </div>

        <p className="font-body text-xs text-[hsl(var(--gold-light))] tracking-[0.25em] uppercase mb-4">
          Заявка принята
        </p>

        <h1 className="font-display font-light text-white mb-6 leading-tight"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
          Спасибо<br />
          <span className="italic text-[hsl(var(--gold-light))]">за обращение!</span>
        </h1>

        <div className="gold-divider mx-auto my-6" />

        <p className="font-body text-white/75 text-lg leading-relaxed mb-4">
          Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в течение 15 минут — обсудим детали и подберём лучший вариант отдыха на Волге.
        </p>
        <p className="font-body text-white/50 text-sm mb-10">
          Если у вас срочный вопрос — позвоните нам: <a href="tel:+79271183131" className="text-[hsl(var(--gold-light))] hover:underline">+7 (927) 118-31-31</a>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-9 py-4 bg-gold text-navy font-body font-bold rounded-full hover:bg-[hsl(var(--gold-light))] transition-all hover:scale-105 text-sm tracking-wide shadow-lg flex items-center gap-2 justify-center"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться на сайт
          </button>
          <a
            href="tel:+79271183131"
            className="px-8 py-4 bg-white/10 text-white border border-white/25 font-body font-medium rounded-full hover:bg-white/20 transition-all text-sm tracking-wide flex items-center gap-2 justify-center"
          >
            <Icon name="Phone" size={16} />
            Позвонить нам
          </a>
        </div>
      </div>
    </div>
  );
}
