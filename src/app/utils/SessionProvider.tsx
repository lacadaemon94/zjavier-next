"use client";
import React, { useState, useEffect } from "react";

// Elements
import { SplashScreen } from "../components/SplashScreen/SplashScreen";

export const SessionContext = React.createContext({
  // isLightTheme: false,
  // toggleTheme: () => {},
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  // const [isLightTheme, setIsLightTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SessionContext.Provider value={isLoading}>
        <SplashScreen />;
      </SessionContext.Provider>
    );
  }

  return (
    <SessionContext.Provider value={isLoading}>
      {children}
    </SessionContext.Provider>
  );
}
