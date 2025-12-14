"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ContactPage() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-white">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">{t("contact.title")}</h1>
          <div className="flex gap-6">
            <Link className="text-white font-bold hover:text-zinc-300 transition-colors" href="/">
              {t("contact.home")}
            </Link>
            <Link
              className="text-white font-bold hover:text-zinc-300 transition-colors"
              href="/gallery"
            >
              {t("contact.gallery")}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-zinc-800 bg-black/40 p-6">
            <h2 className="text-lg font-bold mb-4">{t("contact.form.title")}</h2>
            {submitted ? (
              <div className="text-green-400 font-medium">{t("contact.form.success")}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-black/60 border border-zinc-700 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                    placeholder={t("contact.form.phonePlaceholder")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black px-4 py-2 rounded-md font-bold hover:bg-zinc-200 transition-colors"
                >
                  {t("contact.form.submit")}
                </button>
              </form>
            )}
          </div>

          <div className="rounded-lg border border-zinc-800 bg-black/40 p-6">
            <div className="space-y-4 text-sm">
              <p>
                <span className="font-medium">{t("contact.addressLabel")}:</span> Respublikos g. 15,
                Panevėžys, 35184 Panevėžio m. sav.
              </p>
              <p>
                <span className="font-medium">{t("contact.phoneLabel")}:</span> (0-638) 16620
              </p>
              <div>
                <span className="font-medium">{t("contact.hoursLabel")}:</span>
                <ul className="mt-2 space-y-1 text-white font-bold">
                  <li>
                    {t("days.sunday")}: {t("hours.closed")}
                  </li>
                  <li>{t("days.monday")}: 10:00–21:00</li>
                  <li>{t("days.tuesday")}: 10:00–21:00</li>
                  <li>{t("days.wednesday")}: 10:00–21:00</li>
                  <li>{t("days.thursday")}: 10:00–21:00</li>
                  <li>{t("days.friday")}: 10:00–21:00</li>
                  <li>{t("days.saturday")}: 10:00–16:00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
