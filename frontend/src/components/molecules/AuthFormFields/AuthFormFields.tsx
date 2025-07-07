"use client";
import InputField from "@/components/atoms/InputField/InputField";
import Label from "@/components/atoms/Label/Label";
import React from "react";

type AuthFormFieldsProps = {
  isRegister: boolean;
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthFormFields({
  isRegister,
  formData,
  handleInputChange,
}: AuthFormFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Full Name (register only) */}
      {isRegister && (
        <div className="space-y-4 animate-in slide-in-from-top-5 duration-300">
          <Label>Full Name</Label>
          <InputField
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>
      )}

      {/* Email */}
      <div>
        <Label>Email Address</Label>
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </div>

      {/* Password */}
      <div>
        <Label>Password</Label>
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
        />
      </div>

      {/* Confirm Password (register only) */}
      {isRegister && (
        <div className="animate-in slide-in-from-top-5 duration-300">
          <Label>Confirm Password</Label>
          <InputField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
          />
        </div>
      )}
    </div>
  );
}
