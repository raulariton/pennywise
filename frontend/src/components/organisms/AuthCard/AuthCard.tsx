"use client";
import AuthButton from "@/components/atoms/AuthButton/AuthButton";
import AuthFormFields from "@/components/molecules/AuthFormFields/AuthFormFields";
import FormFooter from "@/components/molecules/FormFooter/FormFooter";
import SocialAuthOptions from "@/components/molecules/SocialAuthOptions/SocialAuthOptions";
import TabSwitcher from "@/components/molecules/TabSwitcher/TabSwitcher";
import React, { useState } from "react";

export default function AuthCard() {
  const [isActive, setIsActive] = useState<"Login" | "Register">("Login");
  const isRegister = isActive === "Register";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${isActive} submitted:`, formData);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl w-[450px] max-w-full">
      <TabSwitcher isActive={isActive} setIsActive={setIsActive} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthFormFields
          isRegister={isRegister}
          formData={formData}
          handleInputChange={handleInputChange}
        />

        {isActive === "Login" && (
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>
        )}

        <AuthButton>
          {isActive === "Login" ? "Sign In" : "Create Account"}
        </AuthButton>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900/50 text-gray-400">or</span>
          </div>
        </div>

        <SocialAuthOptions />
      </form>

      <FormFooter
        isActive={isActive}
        toggleForm={() => setIsActive(isRegister ? "Login" : "Register")}
      />
    </div>
  );
}
