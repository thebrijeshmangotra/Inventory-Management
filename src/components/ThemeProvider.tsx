"use client";
import { createTheme, ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";

const CustomThemeProvider = ({ children }: { children: React.JSX.Element }) => {
  const theme = createTheme({
    colorSchemes: {
      dark: true
    },
    palette: {
      mode: "dark",
      primary: {
        main: "hsl(var(--primary))"
      }
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            backgroundColor: "hsl(var(--muted))",
            border: "none"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "capitalize"
          }
        }
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: "hsl(var(--muted))",
            borderRadius: "12px"
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            backgroundColor: "hsl(var(--card))"
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
