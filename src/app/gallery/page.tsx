"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function GalleryPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("gallery.title")}</h1>
        <div className="flex gap-4 text-sm">
          <Link className="underline" href="/">
            {t("gallery.home")}
          </Link>
        </div>
      </div>

      <p className="mt-4 text-sm text-white font-bold">{t("gallery.description")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg border border-zinc-800 bg-black/40" />
        ))}
      </div>
    </div>
  );
}
