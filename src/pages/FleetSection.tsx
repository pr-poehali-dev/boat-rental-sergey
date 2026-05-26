import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { FLEET } from "./data";
import { scrollTo, GoldDivider, ConsultModal } from "./shared";

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
        className="absolute left-2 md:left-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
        <Icon name="ChevronLeft" size={24} className="text-white" />
      </button>

      <div className="w-full h-full flex items-center justify-center px-12 md:px-20 py-12 md:py-16">
        <img
          src={images[current]}
          alt={`Фото ${current + 1}`}
          className="w-full h-full object-contain rounded-xl md:rounded-xl"
          style={{ maxHeight: "calc(100vh - 6rem)" }}
        />
      </div>

      <button
        onClick={() => go(1)}
        className="absolute right-2 md:right-4 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
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