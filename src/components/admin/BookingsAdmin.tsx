"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type BookingRow = {
  id: string;
  booking_date: string;
  status: "confirmed" | "cancelled" | "completed";
  user_id: string;
  services?: { name: string } | null;
  barbers?: { full_name: string | null } | null;
};

type Props = {
  initialBookings: BookingRow[];
};

export function BookingsAdmin({ initialBookings }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const bookings = useMemo(() => initialBookings, [initialBookings]);

  const updateStatus = async (id: string, status: BookingRow["status"]) => {
    setServerError(null);

    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);

    if (error) {
      setServerError(error.message);
      return;
    }

    router.refresh();
  };

  return (
    <div className="space-y-4">
      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}

      {bookings.length === 0 ? (
        <p className="text-sm text-zinc-600">No bookings yet.</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => {
            const date = new Date(b.booking_date);
            return (
              <div key={b.id} className="rounded-lg border border-zinc-200 bg-white p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">
                      {b.services?.name ?? "Service"} with {b.barbers?.full_name ?? "Barber"}
                    </p>
                    <p className="text-sm text-zinc-600">
                      {date.toLocaleString()} · {b.status}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">User: {b.user_id}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void updateStatus(b.id, "confirmed")}
                      className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                    >
                      Confirmed
                    </button>
                    <button
                      type="button"
                      onClick={() => void updateStatus(b.id, "completed")}
                      className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                    >
                      Completed
                    </button>
                    <button
                      type="button"
                      onClick={() => void updateStatus(b.id, "cancelled")}
                      className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
