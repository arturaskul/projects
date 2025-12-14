"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccess(null);

    const origin = window.location.origin;

    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${origin}/update-password`,
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setSuccess("If that email exists, a reset link has been sent.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {success ? (
        <div className="space-y-4 rounded-md bg-blue-50 p-4">
          <h3 className="text-sm font-medium text-blue-800">Check your email</h3>
          <p className="text-sm text-blue-700">
            If an account exists with that email, you&apos;ll receive a password reset link. The
            link will expire in 1 hour.
          </p>
          <div className="text-sm text-blue-700">
            <p className="font-medium">Didn&apos;t receive the email?</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Check your spam or junk folder</li>
              <li>Make sure you entered your email correctly</li>
              <li>Wait a few minutes and try again</li>
            </ul>
          </div>
          <div className="pt-2">
            <a href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Back to login
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              placeholder="your@email.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {serverError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </button>

          <div className="text-center text-sm">
            <a href="/login" className="font-medium text-zinc-600 hover:text-zinc-900">
              Back to login
            </a>
          </div>
        </>
      )}
    </form>
  );
}
