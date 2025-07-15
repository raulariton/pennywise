"use client";
import AuthButton from "@/components/atoms/AuthButton/AuthButton";
import AuthFormFields from "@/components/molecules/AuthFormFields/AuthFormFields";
import FormFooter from "@/components/molecules/FormFooter/FormFooter";
import TabSwitcher from "@/components/molecules/TabSwitcher/TabSwitcher";
import React, { useState } from "react";
import apiClient from "@/utils/apiClient";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import ForgotPasswordDialog from '@/components/molecules/ForgotPasswordDialog';

export default function AuthCard() {
  const [isActive, setIsActive] = useState<"Login" | "Register">("Login");
  const isRegister = isActive === "Register";
	const auth = useAuth();
	const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const [formErrors, setFormErrors] = useState({
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

    // clear error message on respective input field
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // check that password and confirmPassword match
    if (isRegister && formData.password !== formData.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: "Passwords do not match",
      })
      return;
    }

    const apiRoute =
			isRegister ? "/auth/register" : "/auth/login";

    const body = {
      email: formData.email,
      password: formData.password,
      ...(isRegister && {fullName: formData.fullName}),
    }

    try {
      const response = await apiClient.post(apiRoute, body, {
        headers: {
          'Content-Type': 'application/json',
        },
				withCredentials: true, // allows receiving cookies from the server
      })

      // update auth context
			auth.login(response.data.accessToken);

      // redirect to dashboard
			router.replace("/dashboard");


    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 401) {
          toast.error("Invalid email or password.");
        } else if (error.status === 409) {
          // user already exists
          setFormErrors({
            ...formErrors,
            email: "Email already exists",
          });
        } else if (error.status === 500) {
          toast.error("Internal server error. Please try again later.");
        }
      }
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl w-[450px] max-w-full">
      <TabSwitcher isActive={isActive} setIsActive={setIsActive} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthFormFields
          isRegister={isRegister}
          formData={formData}
          handleInputChange={handleInputChange}
          formErrors={formErrors}
        />

        {isActive === "Login" && (
          <ForgotPasswordDialog/>
        )}

        <AuthButton>
          {isActive === "Login" ? "Sign In" : "Create Account"}
        </AuthButton>
      </form>

      <FormFooter
        isActive={isActive}
        toggleForm={() => setIsActive(isRegister ? "Login" : "Register")}
      />
    </div>
  );
}
