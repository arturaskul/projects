"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/training");
    }
  }, [pathname, router]);

  return null;
}
