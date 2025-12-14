"use client";

import { useI18n } from "./I18nProvider";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLang("lt")}
        className={
          lang === "lt"
            ? "px-3 py-1 rounded border border-white text-white font-bold"
            : "px-3 py-1 rounded border border-zinc-600 text-zinc-300 font-bold hover:text-white hover:border-white"
        }
      >
        LT
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={
          lang === "en"
            ? "px-3 py-1 rounded border border-white text-white font-bold"
            : "px-3 py-1 rounded border border-zinc-600 text-zinc-300 font-bold hover:text-white hover:border-white"
        }
      >
        EN
      </button>
    </div>
  );
}
