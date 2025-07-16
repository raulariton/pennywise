"use client";
import SocialButton from "@/components/atoms/SocialButton";
import React from "react";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function SocialAuthOptions() {
  return (
    <div className="space-y-3">
      <SocialButton icon={<FaGoogle className="w-5 h-5" />}>
        Continue with Google
      </SocialButton>

      <SocialButton icon={<FaApple className="w-5 h-5" />}>
        Continue with Apple
      </SocialButton>
    </div>
  );
}
