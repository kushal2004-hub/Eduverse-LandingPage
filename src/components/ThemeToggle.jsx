import React from "react";
import useThemeToggle from "../hooks/useThemeToggle";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useThemeToggle();
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setIsDark(!isDark)}
      className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
