"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 flex h-full items-center justify-center aspect-square rounded-md bg-primary text-primary-foreground"
    >
      {theme === "dark" ? <Sun size={19}/> : <Moon size={19}/>}
    </button>
  )
}
