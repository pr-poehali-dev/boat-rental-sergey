import { useState } from "react";
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

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
}

async function sendFormEmail(data: { name: string; phone: string; message?: string; formId: string }) {
  try {
    const res = await fetch("https://functions.poehali.dev/b5dbfd1f-fb97-41db-a28b-c1eef3de3c73", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function ConsultModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "", agree: false });
  const [sent, setSent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }
    setPhoneError("");
    setLoading(true);
    await sendFormEmail({ name: form.name, phone: form.phone, message: form.message, formId: "otpform" });
    setLoading(false);
    setSent(true);
  };

  const fieldStyle = { color: "#14556f", borderColor: "#14556f" };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="ocean-gradient px-8 pt-8 pb-6">
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <Icon name="X" size={16} className="text-white" />
          </button>
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <Icon name="MessageCircle" size={24} className="text-white" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-white mb-1">Получить консультацию</h3>
          <p className="font-body text-sm text-white/70">Ответим в течение 15 минут</p>
        </div>

        <div className="px-8 py-6">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full font-body text-sm px-4 py-3 border rounded-xl bg-white focus:outline-none transition-all placeholder:text-[#14556f]/50"
                style={fieldStyle}
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <div>
                <input
                  className="w-full font-body text-sm px-4 py-3 border rounded-xl bg-white focus:outline-none transition-all placeholder:text-[#14556f]/50"
                  style={{ ...fieldStyle, borderColor: phoneError ? "#ef4444" : "#14556f" }}
                  placeholder="Телефон *"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => { setForm({ ...form, phone: e.target.value }); setPhoneError(""); }}
                  required
                />
                {phoneError && <p className="font-body text-xs text-red-500 mt-1">{phoneError}</p>}
              </div>
              <textarea
                className="w-full font-body text-sm px-4 py-3 border rounded-xl bg-white focus:outline-none transition-all resize-none placeholder:text-[#14556f]/50"
                style={fieldStyle}
                placeholder="Ваш вопрос или пожелание..."
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    form.agree ? "bg-gold border-gold" : "border-border"
                  }`}
                  onClick={() => setForm({ ...form, agree: !form.agree })}
                >
                  {form.agree && <Icon name="Check" size={12} className="text-navy" />}
                </div>
                <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} required className="sr-only" />
                <span className="font-body text-xs text-navy/60">
                  Согласен(а) с{" "}
                  <button type="button" onClick={() => setShowPrivacy(true)} className="text-ocean underline hover:text-navy">
                    Политикой конфиденциальности
                  </button>
                </span>
              </label>

              <button
                type="submit"
                disabled={!form.agree || loading}
                className="w-full py-3 bg-navy text-[hsl(var(--gold-light))] font-body font-semibold rounded-xl hover:bg-ocean transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          ) : (
            <div className="text-center py-6" id="otpform">
              <div className="w-16 h-16 rounded-full bg-ocean-pale flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-ocean" />
              </div>
              <h4 className="font-display text-xl font-semibold text-navy mb-2">Спасибо за обращение!</h4>
              <p className="font-body text-sm text-navy/60 mb-6 leading-relaxed">
                Наш менеджер свяжется с вами в течение 15 минут.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-ocean text-ocean font-body text-sm font-medium rounded-full hover:bg-ocean-pale transition-colors"
              >
                Вернуться на сайт
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}