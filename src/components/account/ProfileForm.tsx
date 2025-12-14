"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/client";

const schema = z.object({
  full_name: z.string().max(120).optional().or(z.literal("")),
  avatar_url: z.string().url().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export function ProfileForm({
  userId,
  initial,
}: {
  userId: string;
  initial: { full_name: string | null; avatar_url: string | null };
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: initial.full_name ?? "",
      avatar_url: initial.avatar_url ?? "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccess(null);

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userId,
        full_name: values.full_name ? values.full_name : null,
        avatar_url: values.avatar_url ? values.avatar_url : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      setServerError(error.message);
      return;
    }

    setSuccess("Profile updated.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
