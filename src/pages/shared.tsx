 
import Icon from "@/components/ui/icon";
import { PRIVACY_POLICY } from "./data";

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="Star" size={14}
          className={i <= rating ? "fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" : "text-gray-300"} />
      ))}
    </div>
  );
}

export function GoldDivider({ left }: { left?: boolean }) {
  return <div className={`gold-divider ${left ? "" : "mx-auto"} my-4`} />;
}

export function PrivacyModal({ onClose }: { onClose: () => void }) {
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
