"use client";
import React, { useState, useEffect } from "react";

// Elements
import { SplashScreen } from "../components/SplashScreen/SplashScreen";

export const SessionContext = React.createContext({
  isLightTheme: false,
  toggleTheme: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500)

    return () => clearTimeout(timer);
  }, [])

  const toggleTheme = () => setIsLightTheme(!isLightTheme);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsLightTheme(!prefersDarkMode);
  }, []);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme) {
      setIsLightTheme(storedTheme === "light");
    }
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.dataset.theme = isLightTheme ? "light" : "dark";
    rootElement.style.setProperty(
      "color-scheme",
      isLightTheme ? "light" : "dark"
    );
    window.localStorage.setItem("theme", isLightTheme ? "light" : "dark");
  }, [isLightTheme]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SessionContext.Provider value={{ isLightTheme, toggleTheme }}>
      {children}
    </SessionContext.Provider>
  );
}
