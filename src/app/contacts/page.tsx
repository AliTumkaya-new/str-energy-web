"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroPatternLayer from "@/components/HeroPatternLayer";
import { useHeroSpotlight } from "@/lib/useHeroSpotlight";
import { useTheme } from "@/context/ThemeContext";
import { Phone, MapPin, Mail, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const formCopy = {
  tr: {
    heading: "Bize Mesaj Gönderin",
    subheading: "Proje iş birlikleri, teknik sorular ve kurumsal talepleriniz için bize doğrudan form üzerinden ulaşabilirsiniz.",
    name: "Adınız Soyadınız",
    namePlaceholder: "Örn: Ahmet Yılmaz",
    email: "E-posta Adresiniz",
    emailPlaceholder: "ornek@sirket.com",
    subject: "Konu",
    subjectPlaceholder: "Örn: Enerji Veri Analitiği ve Yazılım Talebi",
    message: "Mesajınız",
    messagePlaceholder: "Talebinizi veya projenizi kısaca açıklayınız...",
    submit: "Mesajı Gönder",
    submitting: "Gönderiliyor...",
    successTitle: "Mesajınız Alındı!",
    successDesc: "Talebiniz başarıyla iletildi. Mühendislik ve proje ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    sendAnother: "Yeni bir mesaj gönder",
  },
  en: {
    heading: "Send Us a Message",
    subheading: "Reach out directly for project partnerships, technical inquiries, and software R&D collaboration.",
    name: "Your Full Name",
    namePlaceholder: "e.g. John Doe",
    email: "Your Email Address",
    emailPlaceholder: "example@company.com",
    subject: "Subject",
    subjectPlaceholder: "e.g. Energy Analytics & Software Integration",
    message: "Your Message",
    messagePlaceholder: "Briefly describe your inquiry or project...",
    submit: "Send Message",
    submitting: "Sending...",
    successTitle: "Message Received!",
    successDesc: "Your request has been successfully transmitted. Our technical team will follow up promptly.",
    sendAnother: "Send another message",
  },
  ru: {
    heading: "Отправьте нам сообщение",
    subheading: "Свяжитесь с нами по вопросам партнерства, технической интеграции и R&D.",
    name: "Ваше имя",
    namePlaceholder: "Иван Иванов",
    email: "Электронная почта",
    emailPlaceholder: "example@company.com",
    subject: "Тема",
    subjectPlaceholder: "Интеграция энергетических данных",
    message: "Ваше сообщение",
    messagePlaceholder: "Кратко опишите ваш запрос...",
    submit: "Отправить сообщение",
    submitting: "Отправка...",
    successTitle: "Сообщение отправлено!",
    successDesc: "Ваш запрос успешно получен. Наша команда свяжется с вами в ближайшее время.",
    sendAnother: "Отправить еще одно сообщение",
  },
} as const;

export default function ContactsPage() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { heroRef, patternHot, onHeroPointerEnter, onHeroPointerLeave, onHeroPointerMove } = useHeroSpotlight();
  const fText = formCopy[language as keyof typeof formCopy] || formCopy.en;

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 600);
  };

  const cards = [
    { icon: Phone, titleKey: "contacts.card.phone", desc: t("contacts.value.phone"), href: "https://wa.me/905449187090" },
    { icon: Mail, titleKey: "contacts.card.email", desc: "support@str-energy.com", href: "mailto:support@str-energy.com" },
    { icon: MapPin, titleKey: "contacts.card.office", desc: t("contacts.value.office"), href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t("contacts.value.office"))}` },
  ];

  const pageBg = isDark ? "bg-black text-white" : "bg-white text-zinc-900";
  const sectionAlt = isDark ? "bg-zinc-950" : "bg-zinc-50";
  const heading = isDark ? "text-white" : "text-zinc-900";
  const desc = isDark ? "text-gray-400" : "text-zinc-600";

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <Header variant="floating" />

      <section
        ref={heroRef}
        onPointerEnter={onHeroPointerEnter}
        onPointerLeave={onHeroPointerLeave}
        onPointerMove={onHeroPointerMove}
        className="relative min-h-[48vh] flex items-center justify-center pt-24 pb-12 overflow-hidden [--str-hex-x:50%] [--str-hex-y:50%]"
      >
        <div className="absolute inset-0 opacity-20 bg-linear-to-br from-orange-500/20 to-amber-500/10" />
        <HeroPatternLayer isDark={isDark} patternHot={patternHot} variant="dots" />

        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${heading}`}>
            {t("contacts.page.title")}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`text-lg md:text-xl max-w-2xl mx-auto ${desc}`}>
            {t("contacts.page.subtitle")}
          </motion.p>
        </div>
      </section>

      <section className={`py-16 ${sectionAlt}`}>
        <div className="container max-w-4xl mx-auto px-4 space-y-12">
          {/* Quick Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {cards.map((item) => {
              const content = (
                <motion.div
                  key={item.titleKey}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`${isDark ? "bg-zinc-900/60 border-zinc-800 hover:border-orange-500/40" : "bg-white border-black/10 hover:border-orange-500/40"} border rounded-2xl p-6 transition-colors ${item.href ? "cursor-pointer" : ""}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 ${heading}`}>{t(item.titleKey)}</h3>
                  <p className={`${desc} text-sm leading-relaxed`}>{item.desc}</p>
                </motion.div>
              );

              return item.href ? (
                <a
                  key={item.titleKey}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={item.titleKey} className="block">
                  {content}
                </div>
              );
            })}
          </div>

          {/* Direct Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`border rounded-2xl p-8 md:p-10 shadow-sm ${
              isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-white border-black/10"
            }`}
          >
            <div className="max-w-2xl mb-8">
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${heading}`}>
                {fText.heading}
              </h2>
              <p className={`text-sm md:text-base ${desc}`}>
                {fText.subheading}
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className={`text-2xl font-bold ${heading}`}>{fText.successTitle}</h3>
                <p className={`max-w-md mx-auto text-sm ${desc}`}>{fText.successDesc}</p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer"
                >
                  {fText.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${heading}`}>
                      {fText.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={fText.namePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 ${
                        isDark ? "bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${heading}`}>
                      {fText.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={fText.emailPlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 ${
                        isDark ? "bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${heading}`}>
                    {fText.subject} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={fText.subjectPlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 ${
                      isDark ? "bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${heading}`}>
                    {fText.message} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={fText.messagePlaceholder}
                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 resize-y ${
                      isDark ? "bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600" : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400"
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 transition shadow-lg shadow-orange-500/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? fText.submitting : fText.submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
