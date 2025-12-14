"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Database } from "@/types/supabase";

type Barber = Database["public"]["Tables"]["barbers"]["Row"];

type Props = {
  initialBarbers: Barber[];
};

const schema = z.object({
  full_name: z.string().max(120).optional().or(z.literal("")),
  avatar_url: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(1000).optional().or(z.literal("")),
});

type FormInput = z.input<typeof schema>;
type FormValues = z.output<typeof schema>;

export function BarbersAdmin({ initialBarbers }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const barbers = useMemo(() => initialBarbers, [initialBarbers]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      avatar_url: "",
      bio: "",
    },
  });

  const createBarber = async (values: FormInput) => {
    setServerError(null);

    const parsed: FormValues = schema.parse(values);

    const { error } = await supabase.from("barbers").insert({
      full_name: parsed.full_name ? parsed.full_name : null,
      avatar_url: parsed.avatar_url ? parsed.avatar_url : null,
      bio: parsed.bio ? parsed.bio : null,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    reset();
    router.refresh();
  };

  const deleteBarber = async (id: string) => {
    setServerError(null);

    const { error } = await supabase.from("barbers").delete().eq("id", id);
    if (error) {
      setServerError(error.message);
      return;
    }

    router.refresh();
  };

  const updateBarber = async (id: string, values: FormInput) => {
    setServerError(null);

    const parsed: FormValues = schema.parse(values);

    const { error } = await supabase
      .from("barbers")
      .update({
        full_name: parsed.full_name ? parsed.full_name : null,
        avatar_url: parsed.avatar_url ? parsed.avatar_url : null,
        bio: parsed.bio ? parsed.bio : null,
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
        <h2 className="text-lg font-semibold">Create barber</h2>

        <form onSubmit={handleSubmit(createBarber)} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="full_name">
              Full name
            </label>
            <input
              id="full_name"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              {...register("full_name")}
            />
            {errors.full_name ? (
              <p className="text-sm text-red-600">{errors.full_name.message}</p>
            ) : null}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="avatar_url">
              Avatar URL
            </label>
            <input
              id="avatar_url"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              {...register("avatar_url")}
            />
            {errors.avatar_url ? (
              <p className="text-sm text-red-600">{errors.avatar_url.message}</p>
            ) : null}
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium" htmlFor="bio">
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              {...register("bio")}
            />
            {errors.bio ? <p className="text-sm text-red-600">{errors.bio.message}</p> : null}
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
        <h2 className="text-lg font-semibold">Barbers</h2>

        <div className="mt-4 space-y-3">
          {barbers.length === 0 ? (
            <p className="text-sm text-zinc-600">No barbers yet.</p>
          ) : (
            barbers.map((b) => (
              <BarberRow
                key={b.id}
                barber={b}
                editing={editingId === b.id}
                onEdit={() => setEditingId(b.id)}
                onCancel={() => setEditingId(null)}
                onDelete={() => void deleteBarber(b.id)}
                onSave={(values) => void updateBarber(b.id, values)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function BarberRow({
  barber,
  editing,
  onEdit,
  onCancel,
  onDelete,
  onSave,
}: {
  barber: Barber;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onSave: (values: FormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: barber.full_name ?? "",
      avatar_url: barber.avatar_url ?? "",
      bio: barber.bio ?? "",
    },
  });

  if (!editing) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">{barber.full_name ?? "Barber"}</p>
          <p className="text-sm text-zinc-600">{barber.bio ?? ""}</p>
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
          <label className="text-sm font-medium">Full name</label>
          <input
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            {...register("full_name")}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Avatar URL</label>
          <input
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            {...register("avatar_url")}
          />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm font-medium">Bio</label>
          <textarea
            rows={2}
            className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
            {...register("bio")}
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
