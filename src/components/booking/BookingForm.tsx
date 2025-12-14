"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type Barber = Database["public"]["Tables"]["barbers"]["Row"];
type Service = Database["public"]["Tables"]["services"]["Row"];

const schema = z.object({
  serviceId: z.string().min(1),
  barberId: z.string().min(1),
  bookingDateLocal: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  services: Service[];
  barbers: Barber[];
};

export function BookingForm({ services, barbers }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const defaultServiceId = useMemo(() => services[0]?.id ?? "", [services]);
  const defaultBarberId = useMemo(() => barbers[0]?.id ?? "", [barbers]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceId: defaultServiceId,
      barberId: defaultBarberId,
      bookingDateLocal: "",
    },
  });

  useEffect(() => {
    if (defaultServiceId) setValue("serviceId", defaultServiceId);
    if (defaultBarberId) setValue("barberId", defaultBarberId);
  }, [defaultServiceId, defaultBarberId, setValue]);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccess(null);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setServerError(userError.message);
      return;
    }

    if (!user) {
      router.push("/login?next=/booking");
      return;
    }

    const bookingDateIso = new Date(values.bookingDateLocal).toISOString();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        service_id: values.serviceId,
        barber_id: values.barberId,
        booking_date: bookingDateIso,
        status: "confirmed",
      })
      .select("id")
      .single();

    if (error) {
      setServerError(error.message);
      return;
    }

    if (data?.id) {
      try {
        await fetch("/api/booking/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId: data.id }),
        });
      } catch {
        // ignore
      }
    }

    setSuccess("Booking confirmed.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="serviceId">
          Service
        </label>
        <select
          id="serviceId"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
          {...register("serviceId")}
        >
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} · {s.duration_minutes} min · €{s.price}
            </option>
          ))}
        </select>
        {errors.serviceId ? (
          <p className="text-sm text-red-600">{errors.serviceId.message}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="barberId">
          Barber
        </label>
        <select
          id="barberId"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
          {...register("barberId")}
        >
          {barbers.map((b) => (
            <option key={b.id} value={b.id}>
              {b.full_name ?? "Barber"}
            </option>
          ))}
        </select>
        {errors.barberId ? <p className="text-sm text-red-600">{errors.barberId.message}</p> : null}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="bookingDateLocal">
          Date & time
        </label>
        <input
          id="bookingDateLocal"
          type="datetime-local"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
          {...register("bookingDateLocal")}
        />
        {errors.bookingDateLocal ? (
          <p className="text-sm text-red-600">{errors.bookingDateLocal.message}</p>
        ) : null}
      </div>

      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting || services.length === 0 || barbers.length === 0}
        className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? "Booking…" : "Confirm booking"}
      </button>
    </form>
  );
}
