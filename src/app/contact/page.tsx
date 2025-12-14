"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("contact.title")}</h1>
        <div className="flex gap-4 text-sm">
          <Link className="underline" href="/">
            {t("contact.home")}
          </Link>
          <Link className="underline" href="/gallery">
            {t("contact.gallery")}
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-800 bg-black/40 p-6">
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
  );
}
