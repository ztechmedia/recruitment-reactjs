import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import * as themeActions from "../../../store/actions/theme";
import * as modalActions from "../../../store/actions/modal";
import * as authActions from "../../../store/actions/auth";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function SearchAppBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { headerLeft } = props;
  const user = useSelector((state) => state.auth.userLogged);
  const light = useSelector((state) => state.layout.light);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const changeThemeHandler = () => {
    dispatch(themeActions.setTheme(!light));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setModalLogout = () => {
    setAnchorEl(null);
    let modal = (
      <Fragment>
        <h3>Logout?</h3>
        <p>Are you sure want to logout?</p>
        <div className={classes.btnContainer}>
          <Button
            color="secondary"
            onClick={() => dispatch(modalActions.setModalContent(null))}
          >
            No
          </Button>
          <Button
            color="primary"
            onClick={() => dispatch(authActions.logout())}
          >
            Yes
          </Button>
        </div>
      </Fragment>
    );
    dispatch(modalActions.setModalContent(modal));
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        {user ? (
          <Typography className={classes.linkContainer}>
            {headerLeft.map((left) => (
              <Link
                key={left.linkTo}
                component={RouterLink}
                to={left.linkTo}
                color="inherit"
              >
                {left.linkTitle}
              </Link>
            ))}
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" noWrap>
            Recruitment
          </Typography>
        )}

        {!user ? (
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            size="small"
            color="inherit"
            className={classes.btn}
          >
            Login
          </Button>
        ) : (
          <div>
            <IconButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="inherit"
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem onClick={setModalLogout}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </StyledMenu>
          </div>
        )}

        <IconButton
          variant="contained"
          color="inherit"
          size="small"
          onClick={changeThemeHandler}
          className={classes.btn}
        >
          {light ? <NightsStayIcon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  linkContainer: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  btn: {
    marginLeft: 5,
    marginRight: 5,
  },
}));
