"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type Service = Database["public"]["Tables"]["services"]["Row"];

type Props = {
  initialServices: Service[];
};

const schema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional().or(z.literal("")),
  duration_minutes: z.coerce.number().int().min(5).max(600),
  price: z.coerce.number().min(0),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function ServicesAdmin({ initialServices }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const services = useMemo(() => initialServices, [initialServices]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      duration_minutes: 30,
      price: 20,
    },
  });

  const createService = async (values: FormInput) => {
    setServerError(null);

    const parsed: FormValues = schema.parse(values);

    const { error } = await supabase.from("services").insert({
      name: parsed.name,
      description: parsed.description ? parsed.description : null,
      duration_minutes: parsed.duration_minutes,
      price: parsed.price,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    reset();
    router.refresh();
  };

  const deleteService = async (id: string) => {
    setServerError(null);

    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) {
      setServerError(error.message);
      return;
    }

    router.refresh();
  };

  const updateService = async (id: string, values: FormInput) => {
    setServerError(null);

    const parsed: FormValues = schema.parse(values);

    const { error } = await supabase
      .from("services")
      .update({
        name: parsed.name,
        description: parsed.description ? parsed.description : null,
        duration_minutes: parsed.duration_minutes,
        price: parsed.price,
      })
      .eq("id", id);

    if (error) {
      setServerError(error.message);
      return;
    }

    setEditingId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Create service</h2>

        <form onSubmit={handleSubmit(createService)} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              {...register("name")}
            />
            {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="duration_minutes">
              Duration (minutes)
            </label>
            <input
              id="duration_minutes"
              type="number"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              {...register("duration_minutes")}
            />
            {errors.duration_minutes ? (
              <p className="text-sm text-red-600">{errors.duration_minutes.message}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              {...register("price")}
            />
            {errors.price ? <p className="text-sm text-red-600">{errors.price.message}</p> : null}
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              rows={3}
              {...register("description")}
            />
          </div>

          {serverError ? <p className="text-sm text-red-600 sm:col-span-2">{serverError}</p> : null}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Create"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Services</h2>

        <div className="mt-4 space-y-3">
          {services.length === 0 ? (
            <p className="text-sm text-zinc-600">No services yet.</p>
          ) : (
            services.map((s) => (
              <ServiceRow
                key={s.id}
                service={s}
                editing={editingId === s.id}
                onEdit={() => setEditingId(s.id)}
                onCancel={() => setEditingId(null)}
                onDelete={() => void deleteService(s.id)}
                onSave={(values) => void updateService(s.id, values)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  editing,
  onEdit,
  onCancel,
  onDelete,
  onSave,
}: {
  service: Service;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onSave: (values: FormInput) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: service.name,
      description: service.description ?? "",
      duration_minutes: service.duration_minutes,
      price: service.price,
    },
  });

  if (!editing) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">{service.name}</p>
          <p className="text-sm text-zinc-600">
            {service.duration_minutes} min · €{service.price}
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <button type="button" onClick={onEdit} className="underline">
            Edit
          </button>
          <button type="button" onClick={onDelete} className="underline">
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((v) => onSave(v))}
      className="rounded-lg border border-zinc-200 p-4"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            {...register("name")}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Duration</label>
          <input
            type="number"
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            {...register("duration_minutes")}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            {...register("price")}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={2}
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            {...register("description")}
          />
        </div>
      </div>

      <div className="mt-3 flex gap-3 text-sm">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-black px-3 py-2 font-medium text-white disabled:opacity-50"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-zinc-300 px-3 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
