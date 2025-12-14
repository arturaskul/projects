import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { FaGoogle } from "react-icons/fa";

export function GoogleLoginButton({ nextPath }: { nextPath?: string }) {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath || "/dashboard")}`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
    >
      <FaGoogle className="w-5 h-5" />
      Continue with Google
    </Button>
  );
}
