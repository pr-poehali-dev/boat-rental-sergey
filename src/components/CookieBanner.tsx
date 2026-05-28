import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_accepted", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[500] p-4 md:p-5">
      <div className="max-w-3xl mx-auto bg-navy border border-[hsl(var(--gold-light))]/20 rounded-2xl shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Icon name="Cookie" size={20} className="text-[hsl(var(--gold-light))] flex-shrink-0 mt-0.5" fallback="Info" />
          <p className="font-body text-xs text-white/70 leading-relaxed">
            Мы используем cookie для корректной работы сайта и аналитики (Яндекс.Метрика).
            Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <a href="/politica" className="text-[hsl(var(--gold-light))] hover:underline">
              Политикой конфиденциальности
            </a>.
          </p>
        </div>
        <button
          onClick={accept}
          className="flex-shrink-0 px-5 py-2 bg-gold text-navy font-body font-semibold text-xs rounded-full hover:bg-[hsl(var(--gold-light))] transition-all whitespace-nowrap"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
