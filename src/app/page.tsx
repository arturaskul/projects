"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/40 backdrop-blur relative z-10">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.jpg"
                alt="Egoisto Barber Shop Logo"
                width={80}
                height={80}
                className="rounded"
              />
            </Link>

            <div className="min-w-0">
              <div className="text-red-900 font-bold uppercase text-lg leading-tight truncate">
                Egoisto Barber Shop
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              className="text-white font-bold hover:text-zinc-300 transition-colors"
              href="#training"
            >
              {t("nav.training")}
            </Link>
            <Link
              className="text-white font-bold hover:text-zinc-300 transition-colors"
              href="/gallery"
            >
              {t("nav.gallery")}
            </Link>
            <Link
              className="text-white font-bold hover:text-zinc-300 transition-colors"
              href="/contact"
            >
              {t("nav.contact")}
            </Link>
            <Link
              href="/contact"
              className="hidden lg:inline-block border-2 border-white text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-white/10 transition-colors"
            >
              {t("hero.cta.contact")}
            </Link>
          </nav>
        </div>
      </header>

      <section
        id="training"
        className="mx-auto w-full max-w-5xl px-6 py-16 text-center relative z-10"
      >
        <h1 className="text-5xl font-bold tracking-tight text-white mb-10">{t("hero.title")}</h1>

        <div className="bg-black/40 border border-zinc-800 p-8 rounded-lg text-left">
          <h2 className="text-3xl font-bold mb-4 uppercase text-red-900 text-center">
            {t("training.subtitleTitle")}
          </h2>
          <p className="text-white font-bold mb-8 text-center">{t("training.subtitleText")}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-2xl mb-4 uppercase text-red-900">
                {t("training.learn.title")}:
              </h3>
              <ul className="space-y-2 text-white font-bold list-disc list-inside">
                <li>{t("training.learn.item1")}</li>
                <li>{t("training.learn.item2")}</li>
                <li>{t("training.learn.item3")}</li>
                <li>{t("training.learn.item4")}</li>
                <li>{t("training.learn.item5")}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-2xl mb-4 uppercase text-red-900">
                {t("training.details.title")}:
              </h3>
              <ul className="space-y-2 text-white font-bold list-disc list-inside">
                <li>{t("training.details.item1")}</li>
                <li>{t("training.details.item2")}</li>
                <li>{t("training.details.item3")}</li>
                <li>{t("training.details.item4")}</li>
                <li>{t("training.details.item5")}</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-10 py-3 rounded-md text-lg font-bold hover:bg-zinc-200 transition-colors"
            >
              {t("training.enroll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black/40 py-8 relative z-10">
        <div className="max-w-5xl mx-auto px-6 text-center text-white font-bold">
          <p>
            © {new Date().getFullYear()} Egoisto Barber Shop. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}
