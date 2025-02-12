import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "media");

  // Toggle theme between "light" and "dark"
  const toggleTheme = () => {
    const newTheme = theme === "media" ? "dark" : "media";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to `html` tag (for Tailwind dark mode)
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("media"); // ✅ Enables dark mode
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
