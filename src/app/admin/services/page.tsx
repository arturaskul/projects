import { requireAdmin } from "@/lib/admin";
import { ServicesAdmin } from "@/components/admin/ServicesAdmin";

export default async function AdminServicesPage() {
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase.from("services").select("*").order("name");

  if (error) {
    return <p className="text-sm text-red-600">{error.message}</p>;
  }

  return <ServicesAdmin initialServices={data ?? []} />;
}
