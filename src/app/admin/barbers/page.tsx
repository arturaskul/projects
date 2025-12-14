import { requireAdmin } from "@/lib/admin";
import { BarbersAdmin } from "@/components/admin/BarbersAdmin";

export default async function AdminBarbersPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase.from("barbers").select("*").order("created_at");

  if (error) {
    return <p className="text-sm text-red-600">{error.message}</p>;
  }

  return <BarbersAdmin initialBarbers={data ?? []} />;
}
