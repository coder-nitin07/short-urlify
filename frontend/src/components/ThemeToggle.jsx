import { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="p-4 flex justify-end">
      <button
        onClick={() => setIsDark(!isDark)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-md hover:scale-105 transition-transform"
        aria-label="Toggle Theme"
      >
        <span className="text-lg">{isDark ? "🌙" : "☀️"}</span>
      </button>
    </div>
  );
}

export default ThemeToggle;