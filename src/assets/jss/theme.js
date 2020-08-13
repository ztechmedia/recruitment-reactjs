import { createMuiTheme } from "@material-ui/core/styles";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3a5db0",
    },
    secondary: {
      main: "#ee0873",
    },
  },
});

export const lightThemeWeb = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3a5db0",
    },
    secondary: {
      main: "#ee0873",
    },
  },
});
