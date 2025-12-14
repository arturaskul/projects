import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminHomePage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Admin dashboard</h2>
        <p className="mt-1 text-sm text-zinc-600">Choose what you want to manage.</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link className="underline" href="/admin/services">
            Manage services
          </Link>
          <Link className="underline" href="/admin/barbers">
            Manage barbers
          </Link>
          <Link className="underline" href="/admin/bookings">
            Manage bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
