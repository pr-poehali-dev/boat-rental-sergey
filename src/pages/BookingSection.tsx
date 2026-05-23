/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FLEET } from "./data";
import { GoldDivider, PrivacyModal } from "./shared";

function validatePhone(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}

export function BookingSection() {
  const [form, setForm] = useState({
    name: "", phone: "",
    yacht: "", date: "", time: "",
    duration: "1", guests: "1–2",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedYacht = FLEET.find((y) => y.name === form.yacht);
  const hourlyPrice = selectedYacht ? selectedYacht.price : 0;
  const totalPrice = hourlyPrice * parseInt(form.duration || "1");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) { setPhoneError("Введите корректный номер телефона"); return; }
    setPhoneError("");
    setLoading(true);
    await fetch("https://functions.poehali.dev/b5dbfd1f-fb97-41db-a28b-c1eef3de3c73", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name, phone: form.phone,
        message: `Услуга: ${form.yacht}, Дата: ${form.date}, Время: ${form.time}, Часов: ${form.duration}, Гостей: ${form.guests}`,
        formId: "otpform",
      }),
    }).catch(() => null);
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full font-body text-sm px-4 py-3 border border-border rounded-xl bg-white focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean/30 transition-all placeholder:text-muted-foreground/60";
  const labelClass = "font-body text-xs font-medium text-navy/70 mb-1.5 block tracking-wide uppercase";

  return (
    <section id="booking" className="py-24 bg-white">
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
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

          {submitted ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-ocean-pale flex items-center justify-center mx-auto mb-6">
                <Icon name="Check" size={36} className="text-ocean" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-navy mb-3">Заявка отправлена!</h3>
              <p className="font-body text-muted-foreground max-w-md mx-auto">
                Наш менеджер свяжется с вами в течение 30 минут для подтверждения бронирования.
              </p>
              <button onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-2.5 border border-ocean text-ocean font-body text-sm rounded-full hover:bg-ocean-pale transition-colors">
                Новая заявка
              </button>
            </div>
          ) : (
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
                    <input className={`${inputClass} ${phoneError ? "border-red-400" : ""}`} placeholder="+7 (927) 118-31-31" type="tel" value={form.phone}
                      onChange={(e) => { setForm({ ...form, phone: e.target.value }); setPhoneError(""); }} required />
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

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    form.agree ? "bg-navy border-navy" : "border-border group-hover:border-ocean"
                  }`}
                    onClick={() => setForm({ ...form, agree: !form.agree })}>
                    {form.agree && <Icon name="Check" size={12} className="text-[hsl(var(--gold-light))]" />}
                  </div>
                  <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} required className="sr-only" />
                  <span className="font-body text-sm text-navy/70 leading-relaxed">
                    Я согласен(а) с{" "}
                    <button type="button" onClick={() => setShowPrivacy(true)}
                      className="text-ocean underline hover:text-navy transition-colors">
                      Политикой конфиденциальности
                    </button>{" "}
                    и даю согласие на обработку персональных данных
                  </span>
                </label>

                <button type="submit"
                  className="w-full py-4 bg-navy text-[hsl(var(--gold-light))] font-body font-semibold rounded-xl hover:bg-ocean transition-colors text-sm tracking-wide mt-2 disabled:opacity-50"
                  disabled={!form.agree || loading}>
                  {loading ? "Отправляем..." : "Отправить заявку"}
                </button>
              </form>

              <div className="hidden md:block space-y-5">
                <div className="bg-navy rounded-2xl p-6 text-white">
                  <h4 className="font-display text-xl font-semibold mb-4 text-[hsl(var(--gold-light))]">Калькулятор</h4>
                  {form.yacht ? (
                    <>
                      <div className="space-y-3 mb-5">
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Услуга</span>
                          <span className="font-medium text-white text-right text-xs leading-snug">{form.yacht}</span>
                        </div>
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Цена в час</span>
                          <span className="font-medium text-white">{hourlyPrice.toLocaleString("ru-RU")} ₽</span>
                        </div>
                        <div className="flex justify-between items-center font-body text-sm">
                          <span className="text-white/60">Часов</span>
                          <span className="font-medium text-white">{form.duration}</span>
                        </div>
                        <div className="h-px bg-white/20" />
                        <div className="flex justify-between items-center">
                          <span className="font-body text-sm text-white/60">Итого</span>
                          <span className="font-display text-2xl font-semibold text-gold">
                            {totalPrice.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </div>
                      <p className="font-body text-xs text-white/40">* Окончательная стоимость уточняется менеджером</p>
                    </>
                  ) : (
                    <div className="py-6 text-center">
                      <Icon name="Calculator" size={36} className="text-white/20 mx-auto mb-3" />
                      <p className="font-body text-sm text-white/40">Выберите услугу для расчёта</p>
                    </div>
                  )}
                </div>

                <div className="bg-sand rounded-2xl p-5 space-y-4">
                  {[
                    { icon: "Users", text: "Профессиональный экипаж" },
                    { icon: "Clock", text: "Ответ за 30 минут" },
                    { icon: "RefreshCw", text: "Гибкая отмена" },
                    { icon: "Anchor", text: "Собственный причал" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-ocean-pale flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon as any} size={15} className="text-ocean" />
                      </div>
                      <span className="font-body text-sm text-navy/80">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}