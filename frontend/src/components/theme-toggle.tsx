"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
    >
      Switch to {theme === "dark" ? "light" : "dark"} mode
    </button>
  )
}
