import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const sections = [
  {
    title: "1. Общие положения",
    text: `Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта volga-viatek.ru (далее — «Сайт»), принадлежащего ИП / компании Volga-Viatek (далее — «Оператор»).

Использование сайта означает безоговорочное согласие с настоящей Политикой. Если вы не согласны с условиями обработки ваших персональных данных — пожалуйста, воздержитесь от использования Сайта.`,
  },
  {
    title: "2. Собираемые персональные данные",
    text: `При заполнении форм на Сайте мы можем собирать следующие данные:
• Имя и фамилия
• Номер мобильного телефона
• Адрес электронной почты (при наличии)
• Текст сообщения или комментария
• Технические данные: IP-адрес, тип браузера, данные cookie, страницы посещений (через Яндекс.Метрику)`,
  },
  {
    title: "3. Цели обработки персональных данных",
    text: `Собранные данные используются исключительно для:
• Обработки заявок на аренду и оказание услуг
• Связи с клиентом по вопросам бронирования
• Улучшения качества обслуживания
• Статистического анализа посещаемости Сайта`,
  },
  {
    title: "4. Правовое основание обработки",
    text: `Обработка персональных данных осуществляется на основании:
• Согласия субъекта персональных данных (ст. 9 Федерального закона № 152-ФЗ «О персональных данных»)
• Договора, стороной которого является субъект персональных данных`,
  },
  {
    title: "5. Хранение и защита данных",
    text: `Персональные данные хранятся на защищённых серверах. Оператор принимает необходимые организационные и технические меры для защиты данных от несанкционированного доступа, изменения, раскрытия или уничтожения.

Данные не передаются третьим лицам без вашего согласия, за исключением случаев, предусмотренных действующим законодательством Российской Федерации.`,
  },
  {
    title: "6. Использование Cookie",
    text: `Сайт использует файлы Cookie для обеспечения корректной работы, анализа посещаемости и улучшения пользовательского опыта (в том числе через сервис Яндекс.Метрика). Cookie не содержат персональных данных в явном виде.

Вы можете отключить Cookie в настройках браузера, однако это может повлиять на функциональность Сайта.`,
  },
  {
    title: "7. Права пользователя",
    text: `В соответствии с Федеральным законом № 152-ФЗ вы вправе:
• Получить информацию об обработке ваших персональных данных
• Требовать уточнения, блокирования или уничтожения данных
• Отозвать согласие на обработку персональных данных

Для реализации прав обращайтесь по контактным данным, указанным в разделе 9.`,
  },
  {
    title: "8. Изменение Политики",
    text: `Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная редакция всегда доступна на странице /politica. Рекомендуем периодически проверять наличие обновлений.`,
  },
  {
    title: "9. Контакты оператора",
    text: `По вопросам обработки персональных данных обращайтесь:
• Телефон: +7 (927) 118-31-31
• Email: viatek@bk.ru
• Адрес: г. Саратов, ул. Лесозаводская (р-н турбазы Малиновка)`,
  },
];

export default function Politica() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-pearl">
      <div className="bg-navy py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-ocean/20 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors font-body text-sm mb-8"
          >
            <Icon name="ArrowLeft" size={16} />
            Вернуться на сайт
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-ocean flex items-center justify-center flex-shrink-0">
              <Icon name="Shield" size={20} className="text-white" />
            </div>
            <p className="font-body text-xs text-[hsl(var(--gold-light))] tracking-widest uppercase">
              Юридические документы
            </p>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-light text-white mb-3">
            Политика конфиденциальности
          </h1>
          <div className="gold-divider my-4" />
          <p className="font-body text-sm text-white/50">
            Последнее обновление: май 2026 г. · Сайт volga-viatek.ru
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 py-12">
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-7 shadow-sm border border-border">
              <h2 className="font-display text-xl font-semibold text-navy mb-4">{s.title}</h2>
              <p className="font-body text-sm text-navy/70 leading-relaxed whitespace-pre-line">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-navy rounded-2xl p-8 text-center">
          <p className="font-body text-sm text-white/60 mb-4">
            Остались вопросы по обработке данных?
          </p>
          <a
            href="mailto:viatek@bk.ru"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-navy font-body font-semibold rounded-full hover:bg-[hsl(var(--gold-light))] transition-all text-sm"
          >
            <Icon name="Mail" size={16} />
            Написать нам
          </a>
        </div>
      </div>
    </div>
  );
}
