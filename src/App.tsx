import { NAVIGATION } from "./data/navigation";
import { createTheme } from "@mui/material";
import { AppProvider, DashboardLayout } from "@toolpad/core";
import { Outlet } from "react-router-dom";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const App = () => {
  return (
    <>
      <AppProvider navigation={NAVIGATION} theme={demoTheme}>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </AppProvider>
    </>
  );
};

export default App;
