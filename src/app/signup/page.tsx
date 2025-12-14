import Link from "next/link";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/SignupForm";
import { createClient } from "@/lib/supabase/server";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(next || "/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Already have an account?{" "}
        <Link
          className="underline"
          href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`}
        >
          Sign in
        </Link>
      </p>

      <div className="mt-8">
        <SignupForm />
      </div>
    </div>
  );
}
