import { useState } from "react";
import Icon from "@/components/ui/icon";
import { scrollTo, ConsultModal } from "./shared";

const messengers = [
  { label: "WhatsApp", color: "#25D366", letter: "W", href: "https://wa.me/78005550010" },
  { label: "Telegram", color: "#2AABEE", letter: "T", href: "https://t.me/ViatekVlad" },
  { label: "Max", color: "#FF6B35", letter: "M", href: "https://t.me/ViatekVlad" },
];

const links = [
  { id: "fleet", label: "Услуги" },
  { id: "services", label: "Варианты отдыха" },
  { id: "reviews", label: "Отзывы" },
  { id: "gallery", label: "Галерея" },
  { id: "faq", label: "FAQ" },
  { id: "contacts", label: "Контакты" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConsult, setShowConsult] = useState(false);

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
                Volga<span className="text-gold">-Viatek</span>
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
              <a href="tel:+79271183131" className="font-body text-sm font-medium text-navy hover:text-ocean transition-colors whitespace-nowrap">
                +7 (927) 118-31-31
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
                <a href="tel:+79271183131" className="font-body text-sm font-medium text-navy">
                  +7 (927) 118-31-31
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