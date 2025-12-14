"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export function PhoneLoginButton() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const handlePhoneLogin = async () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }

    if (!phone) {
      setMessage("Please enter a phone number");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone.startsWith("+") ? phone : `+${phone}`,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setMessage("Verification code sent to your phone!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error sending verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      {showInput && (
        <div className="space-y-2">
          <Input
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full"
          />
          <p className="text-sm text-zinc-500">Enter your phone number with country code</p>
        </div>
      )}

      <Button
        onClick={handlePhoneLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : showInput ? "Send Verification Code" : "Continue with Phone"}
      </Button>

      {message && (
        <p
          className={`text-sm text-center ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
