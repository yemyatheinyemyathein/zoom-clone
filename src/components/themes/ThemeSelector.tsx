import { EuiThemeColorMode } from "@elastic/eui";
import React, { useState, useEffect, Suspense } from "react";
const LightTheme = React.lazy(() => import("../themes/LightTheme"));
const DarkTheme = React.lazy(() => import("../themes/DarkTheme"));

const ThemeSelector = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
};

export default ThemeSelector;
