"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type BookingRow = {
  id: string;
  booking_date: string;
  status: string;
  services?: { name: string } | null;
  barbers?: { full_name: string | null } | null;
};

export function MyBookingsClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingRow[]>([]);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setServerError(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (userError) {
        setServerError(userError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        router.push("/login?next=/my-bookings");
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          id,
          booking_date,
          status,
          services ( name ),
          barbers ( full_name )
        `
        )
        .eq("user_id", user.id)
        .order("booking_date", { ascending: true });

      if (cancelled) return;

      if (error) {
        setServerError(error.message);
        setLoading(false);
        return;
      }

      setBookings((data as unknown as BookingRow[]) ?? []);
      setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [router, refreshKey]);

  const cancelBooking = async (id: string) => {
    setServerError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login?next=/my-bookings");
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      setServerError(error.message);
      return;
    }

    setRefreshKey((k) => k + 1);
  };

  if (loading) {
    return <p className="text-sm text-zinc-600">Loading…</p>;
  }

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
              <div
                key={b.id}
                className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">
                    {b.services?.name ?? "Service"} with {b.barbers?.full_name ?? "Barber"}
                  </p>
                  <p className="text-sm text-zinc-600">
                    {date.toLocaleString()} · {b.status}
                  </p>
                </div>

                <div>
                  {b.status === "confirmed" ? (
                    <button
                      type="button"
                      onClick={() => {
                        void cancelBooking(b.id);
                      }}
                      className="w-fit rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
