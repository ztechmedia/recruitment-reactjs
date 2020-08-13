import React from "react";
import { useSelector } from "react-redux";

//material components
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

//theme styles
import { lightThemeWeb, darkTheme } from "../../assets/jss/theme";

//ui component
import Footer from "../../components/web/navigation/Footer";
import Modal from "../../components/ui/Modal";

const Web = (props) => {
  const classes = useStyles();
  const { children } = props;
  const light = useSelector((state) => state.layout.light);

  return (
    <ThemeProvider theme={light ? lightThemeWeb : darkTheme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <main>{children}</main>
      </Grid>
      <Modal />
      <Footer />
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default Web;
