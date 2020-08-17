import React from "react";
import { useSelector } from "react-redux";

//material components
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";

//theme styles
import { lightTheme, darkTheme } from "../../assets/jss/theme";

//navigation components
import Header from "../../components/admin/navigation/Header";
import Sidebar from "../../components/admin/navigation/Sidebar";

//ui components
import Content from "../../components/admin/Content";
import Modal from "../../components/ui/Modal";

const Admin = (props) => {
  const classes = useStyles();
  const { children } = props;
  const light = useSelector((state) => state.layout.light);
  const [open, setOpen] = React.useState(true);

  const drawerOpenHandler = () => {
    setOpen(true);
  };

  const drawerCloseHandler = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={light ? lightTheme : darkTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header onOpenDrawer={drawerOpenHandler} open={open} />
        <Sidebar onCloseDrawer={drawerCloseHandler} open={open} />
        <Content>{children}</Content>
        <Modal />
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

export default Admin;
