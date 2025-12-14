import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin</h1>
          <p className="text-sm text-zinc-600">Manage services, barbers, and bookings.</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <Link className="underline" href="/dashboard">
            Dashboard
          </Link>
          <Link className="underline" href="/admin/services">
            Services
          </Link>
          <Link className="underline" href="/admin/barbers">
            Barbers
          </Link>
          <Link className="underline" href="/admin/bookings">
            Bookings
          </Link>
        </div>
      </div>

      <div className="mt-8">{children}</div>
    </div>
  );
}
