"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/client";

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function SignupForm() {
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

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setServerError(error.message);
      return;
    }

    setSuccess("Check your email to confirm your account.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
      {serverError && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-600">{serverError}</p>
        </div>
      )}
      {success ? (
        <div className="space-y-4 rounded-md bg-blue-50 p-4">
          <h3 className="text-sm font-medium text-blue-800">Check your email</h3>
          <p className="text-sm text-blue-700">
            We&apos;ve sent a verification link to your email address. Please check your inbox and
            click the link to verify your email and complete your registration.
          </p>
          <div className="text-sm text-blue-700">
            <p className="font-medium">Didn&apos;t receive the email?</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Check your spam or junk folder</li>
              <li>Make sure you entered your email correctly</li>
              <li>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="font-medium text-blue-600 underline hover:text-blue-500"
                >
                  Click here to resend the verification email
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
          {...register("email")}
        />
        {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
          {...register("password")}
        />
        {errors.password ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      {success ? <p className="text-sm text-green-700">{success}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
