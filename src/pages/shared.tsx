import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

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

export function PrivacyLink() {
  return (
    <a href="/politica" target="_blank" rel="noopener noreferrer" className="text-ocean underline hover:text-navy">
      Политикой конфиденциальности
    </a>
  );
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  let result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length >= 4) result += ") " + digits.slice(4, 7);
  if (digits.length >= 7) result += "-" + digits.slice(7, 9);
  if (digits.length >= 9) result += "-" + digits.slice(9, 11);
  return result;
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 11;
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
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", message: "", agree: false });
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, phone: formatPhone(e.target.value) });
    setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) {
      setPhoneError("Введите полный номер телефона (11 цифр)");
      return;
    }
    setPhoneError("");
    setLoading(true);
    const ok = await sendFormEmail({ name: form.name, phone: form.phone, message: form.message, formId: "otpform" });
    setLoading(false);
    if (ok) {
      onClose();
      navigate("/spasibo");
    } else {
      setPhoneError("Ошибка отправки. Позвоните нам: +7 (927) 118-31-31");
    }
  };

  const fieldStyle = { color: "#14556f", borderColor: "#14556f" };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
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
                placeholder="+7 (___) ___-__-__"
                type="tel"
                value={form.phone}
                onChange={handlePhoneChange}
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

            <label className="flex items-start gap-3 cursor-pointer" onClick={() => setForm({ ...form, agree: !form.agree })}>
              <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${form.agree ? "bg-gold border-gold" : "border-border"}`}>
                {form.agree && <Icon name="Check" size={12} className="text-navy" />}
              </div>
              <span className="font-body text-xs text-navy/60">
                Согласен(а) с{" "}<PrivacyLink />
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
        </div>
      </div>
    </div>
  );
}