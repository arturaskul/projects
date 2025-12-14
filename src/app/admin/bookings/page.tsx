import { requireAdmin } from "@/lib/admin";
import { BookingsAdmin } from "@/components/admin/BookingsAdmin";

type BookingRow = {
  id: string;
  booking_date: string;
  status: "confirmed" | "cancelled" | "completed";
  user_id: string;
  services?: { name: string } | null;
  barbers?: { full_name: string | null } | null;
};

export default async function AdminBookingsPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("bookings")
    .select(
      `
      id,
      booking_date,
      status,
      user_id,
      services ( name ),
      barbers ( full_name )
    `
    )
    .order("booking_date", { ascending: false });

  if (error) {
    return <p className="text-sm text-red-600">{error.message}</p>;
  }

  return <BookingsAdmin initialBookings={(data as unknown as BookingRow[]) ?? []} />;
}
