import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/account/ProfileForm";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name,avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Account</h1>
        <div className="text-sm">
          <Link className="underline" href="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-sm text-zinc-600">User</p>
        <p className="mt-1 font-medium">{user.email}</p>

        <div className="mt-6">
          <ProfileForm
            userId={user.id}
            initial={{
              full_name: profile?.full_name ?? null,
              avatar_url: profile?.avatar_url ?? null,
            }}
          />
        </div>
      </div>
    </div>
  );
}
