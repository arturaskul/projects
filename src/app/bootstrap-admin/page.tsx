import Link from "next/link";
import { requireUser } from "@/lib/admin";
import { BootstrapAdminClient } from "@/components/admin/BootstrapAdminClient";

export default async function BootstrapAdminPage() {
  await requireUser("/bootstrap-admin");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Enable admin access</h1>
        <Link className="underline" href="/dashboard">
          Dashboard
        </Link>
      </div>

      <p className="mt-4 text-sm text-zinc-600">
        Enter the bootstrap token to enable admin access for your current user.
      </p>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6">
        <BootstrapAdminClient />
      </div>
    </div>
  );
}
