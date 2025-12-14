"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export function BootstrapAdminClient() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setServerError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const accessToken = session?.access_token;

      const res = await fetch("/api/admin/make-me-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ token }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setServerError(json?.error ?? "Request failed");
        return;
      }

      setSuccess("Admin access enabled. Redirecting…");
      router.push("/admin");
    } catch {
      setServerError("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="token">
          Bootstrap token
        </label>
        <input
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
          placeholder="ADMIN_BOOTSTRAP_TOKEN (optional for first admin)"
        />
      </div>

      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      <button
        type="button"
        onClick={() => void submit()}
        disabled={loading}
        className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {loading ? "Enabling…" : "Enable admin"}
      </button>
    </div>
  );
}
