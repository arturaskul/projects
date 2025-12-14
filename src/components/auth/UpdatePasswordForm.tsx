"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/client";

const schema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function UpdatePasswordForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
    });
  }, []);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        throw error;
      }

      // Show success state
      setIsSuccess(true);

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login?message=password-updated");
      }, 3000);
    } catch (error: unknown) {
      console.error("Error updating password:", error);
      const message = error instanceof Error ? error.message : undefined;
      setServerError(
        message || "An error occurred while updating your password. Please try again."
      );
    }
  };

  if (!ready) {
    return (
      <p className="text-sm text-zinc-600">Open the reset link from your email to continue.</p>
    );
  }

  if (isSuccess) {
    return (
      <div className="space-y-4 rounded-md bg-green-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-green-800">Password Updated!</h3>
        <p className="text-sm text-green-700">
          Your password has been successfully updated. Redirecting you to login...
        </p>
        <div className="mt-4">
          <a href="/login" className="text-sm font-medium text-green-600 hover:text-green-500">
            Go to login now
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!ready ? (
        <div className="space-y-4 rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Loading your session</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Please wait while we verify your password reset link...</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="password">
              New Password
              <span className="ml-1 text-xs text-zinc-500">(min 6 characters)</span>
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              placeholder="••••••"
              autoComplete="new-password"
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
              placeholder="••••••"
              autoComplete="new-password"
              disabled={isSubmitting}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Updating password..." : "Update Password"}
            </button>
          </div>

          <div className="mt-4 rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Password Requirements</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc space-y-1 pl-5">
                    <li>At least 6 characters long</li>
                    <li>Use a mix of letters and numbers</li>
                    <li>Avoid common words or patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </form>
  );
}
