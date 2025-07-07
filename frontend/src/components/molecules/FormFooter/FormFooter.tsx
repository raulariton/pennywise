"use client";
import React from "react";

type FormFooterProps = {
  isActive: string;
  toggleForm: () => void;
};

export default function FormFooter({ isActive, toggleForm }: FormFooterProps) {
  return (
    <div className="mt-8 text-center text-sm text-gray-400">
      {isActive === "Login" ? (
        <p>
          Don't have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            Sign up
          </button>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <button
            onClick={toggleForm}
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
          >
            Sign in
          </button>
        </p>
      )}
    </div>
  );
}
