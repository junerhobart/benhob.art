"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { useMemo } from "react";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: { main: "#d4160c" },
          background: { default: "#080808", paper: "#0d0303" },
          text: { primary: "#ede8e3", secondary: "#5a5250" },
        },
        typography: {
          fontFamily: "var(--font-body), sans-serif",
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#1e1e1e" },
                  "&:hover fieldset": { borderColor: "#d4160c" },
                  "&.Mui-focused fieldset": { borderColor: "#d4160c" },
                  backgroundColor: "#0a0a0a",
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#d4160c" },
                "& .MuiInputLabel-root": { color: "#5a5250" },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-body)",
              },
            },
          },
        },
      }),
    []
  );

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
