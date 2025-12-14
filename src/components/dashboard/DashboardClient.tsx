"use client";

import Link from "next/link";
import { signOut } from "@/lib/supabase/client";

export function DashboardClient() {
  return (
    <div className="flex flex-col gap-3">
      <Link className="underline" href="/account">
        Edit profile
      </Link>

      <button
        type="button"
        onClick={() => {
          void signOut();
        }}
        className="w-fit rounded-md bg-black px-3 py-2 text-sm font-medium text-white"
      >
        Sign out
      </button>
    </div>
  );
}
