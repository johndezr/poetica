import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import breakpoints from "./breakpoints";
import palette from "./palette";
import cssBaseline from "./cssBaseline";

export const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const defaultTheme = createTheme({
  spacing: (factor: number) => `${0.5 * factor}rem`,
  palette,
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  breakpoints,
  components: {
    MuiCssBaseline: {
      styleOverrides: cssBaseline,
    },
  },
});

export default defaultTheme;
