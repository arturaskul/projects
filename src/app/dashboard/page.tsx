import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = Boolean(profile?.is_admin);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="text-sm">
          <Link className="underline" href="/account">
            Account
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link className="underline" href="/booking">
          Book an appointment
        </Link>
        <Link className="underline" href="/my-bookings">
          My bookings
        </Link>
        <Link className="underline" href="/setup">
          Setup
        </Link>
        {isAdmin ? (
          <Link className="underline" href="/admin">
            Admin
          </Link>
        ) : null}
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm text-zinc-600">Signed in as</p>
        <p className="mt-1 font-medium">{user.email}</p>

        <div className="mt-6">
          <DashboardClient />
        </div>
      </div>
    </div>
  );
}
