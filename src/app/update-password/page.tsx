import Link from "next/link";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold">Set a new password</h1>
      <p className="mt-2 text-sm text-zinc-600">Choose a new password for your account.</p>

      <div className="mt-8">
        <UpdatePasswordForm />
      </div>

      <p className="mt-4 text-sm">
        <Link className="underline" href="/login">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
