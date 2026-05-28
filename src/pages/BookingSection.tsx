/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { FLEET } from "./data";
import { GoldDivider, PrivacyLink } from "./shared";

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

function validatePhone(phone: string) {
  return phone.replace(/\D/g, "").length === 11;
}

export function BookingSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", phone: "",
    yacht: "", date: "", time: "",
    duration: "1", guests: "1–2",
    agree: false,
  });
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedYacht = FLEET.find((y) => y.name === form.yacht);
  const hourlyPrice = selectedYacht ? selectedYacht.price : 0;
  const totalPrice = hourlyPrice * parseInt(form.duration || "1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) { setPhoneError("Введите полный номер телефона (11 цифр)"); return; }
    setPhoneError("");
    setLoading(true);
    const res = await fetch("https://functions.poehali.dev/b5dbfd1f-fb97-41db-a28b-c1eef3de3c73", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name, phone: form.phone,
        message: `Услуга: ${form.yacht}, Дата: ${form.date}, Время: ${form.time}, Часов: ${form.duration}, Гостей: ${form.guests}`,
        formId: "otpform",
      }),
    }).catch(() => null);
    setLoading(false);
    if (res && res.ok) {
      navigate("/spasibo");
    } else {
      setPhoneError("Ошибка отправки. Позвоните нам: +7 (927) 118-31-31");
    }
  };

  const inputClass = "w-full font-body text-sm px-4 py-3 border border-border rounded-xl bg-white focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/30 transition-all placeholder:text-muted-foreground/60";
  const labelClass = "font-body text-xs font-medium text-navy/70 mb-1.5 block tracking-wide uppercase";

  return (
    <section id="booking" className="py-24 bg-white">
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

          <div className="grid md:grid-cols-3 gap-8">
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Ваше имя</label>
                  <input className={inputClass} placeholder="Александр" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className={labelClass}>Телефон *</label>
                  <input
                    className={`${inputClass} ${phoneError ? "border-red-400" : ""}`}
                    placeholder="+7 (___) ___-__-__"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: formatPhone(e.target.value) }); setPhoneError(""); }}
                    required
                  />
                  {phoneError && <p className="font-body text-xs text-red-500 mt-1">{phoneError}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Выберите услугу</label>
                <select className={inputClass} value={form.yacht}
                  onChange={(e) => setForm({ ...form, yacht: e.target.value })} required>
                  <option value="">— Выберите из услуг —</option>
                  {FLEET.filter((y) => y.price > 0).map((y) => (
                    <option key={y.id} value={y.name}>
                      {y.name} (от {y.price.toLocaleString("ru-RU")} ₽/ч)
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

              <label className="flex items-start gap-3 cursor-pointer group" onClick={() => setForm({ ...form, agree: !form.agree })}>
                <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  form.agree ? "bg-navy border-navy" : "border-border group-hover:border-ocean"
                }`}>
                  {form.agree && <Icon name="Check" size={12} className="text-[hsl(var(--gold-light))]" />}
                </div>
                <span className="font-body text-sm text-navy/70 leading-relaxed">
                  Я согласен(а) с{" "}<PrivacyLink />{" "}и даю согласие на обработку персональных данных
                </span>
              </label>

              <button type="submit"
                disabled={!form.agree || loading}
                className="w-full py-4 bg-navy text-[hsl(var(--gold-light))] font-body font-semibold rounded-xl hover:bg-ocean transition-colors disabled:opacity-50 text-sm tracking-wide">
                {loading ? "Отправляем заявку..." : "Отправить заявку на бронирование"}
              </button>
            </form>

            <div className="space-y-4">
              {selectedYacht && (
                <div className="bg-navy rounded-2xl p-6 text-white">
                  <p className="font-body text-xs text-white/50 tracking-widest uppercase mb-3">Ваш выбор</p>
                  <h4 className="font-display text-lg font-semibold mb-2">{selectedYacht.name}</h4>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-white/60">Стоимость/ч</span>
                      <span className="text-[hsl(var(--gold-light))]">{hourlyPrice.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <div className="flex justify-between font-body text-sm">
                      <span className="text-white/60">Продолжительность</span>
                      <span>{form.duration} ч</span>
                    </div>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between font-body font-semibold">
                      <span className="text-white/80">Итого от</span>
                      <span className="text-[hsl(var(--gold-light))] text-lg">{totalPrice.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-pearl rounded-2xl p-6 space-y-4">
                <p className="font-body text-xs text-navy/50 tracking-widest uppercase">Включено в аренду</p>
                {[
                  { icon: "Shield", text: "Страховка на борту" },
                  { icon: "Users", text: "Опытный капитан" },
                  { icon: "MapPin", text: "Выезд от причала" },
                  { icon: "Phone", text: "Поддержка 9:00–21:00" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg ocean-gradient flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon as any} size={14} className="text-white" />
                    </div>
                    <span className="font-body text-sm text-navy/70">{f.text}</span>
                  </div>
                ))}
              </div>

              <a href="tel:+79271183131"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-border rounded-xl font-body text-sm text-navy hover:border-ocean hover:text-ocean transition-all">
                <Icon name="Phone" size={16} className="text-ocean" />
                +7 (927) 118-31-31
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
