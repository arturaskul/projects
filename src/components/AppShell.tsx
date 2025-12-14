"use client";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url(/logo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.12,
        }}
      />

      <div className="fixed top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
