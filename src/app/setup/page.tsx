import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SetupClient } from "@/components/setup/SetupClient";

export default async function SetupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hasSupabaseEnv = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const hasResendEnv = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);

  let adminExists: boolean | null = null;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("is_admin", true)
      .limit(1);
    if (!error) adminExists = (data?.length ?? 0) > 0;
  } catch {
    adminExists = null;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Setup</h1>
        <div className="flex gap-4 text-sm">
          <Link className="underline" href="/">
            Home
          </Link>
          <Link className="underline" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Status</h2>
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-medium">Supabase env:</span> {hasSupabaseEnv ? "OK" : "Missing"}
          </p>
          <p>
            <span className="font-medium">Resend env:</span>{" "}
            {hasResendEnv ? "OK" : "Not configured"}
          </p>
          <p>
            <span className="font-medium">Admin exists:</span>{" "}
            {adminExists === null ? "Unknown (RLS?)" : adminExists ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Signed in:</span> {user?.email ?? "No"}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Admin access</h2>
        {!user ? (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-zinc-600">Log in first to enable admin.</p>
            <Link className="underline" href="/login?next=/setup">
              Go to login
            </Link>
          </div>
        ) : (
          <div className="mt-4">
            <SetupClient />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Next manual checks</h2>
        <p className="mt-2 text-sm text-zinc-600">Email-based auth flows require your inbox:</p>
        <div className="mt-3 space-y-2 text-sm">
          <p>
            1) Signup → confirm email → should land on{" "}
            <span className="font-medium">/dashboard</span>
          </p>
          <p>2) Forgot password → open reset link → set new password → login works</p>
        </div>
      </div>
    </div>
  );
}
