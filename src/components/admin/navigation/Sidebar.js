import React, { useState, useCallback, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  objectToArray,
  updateObject,
  setCurrentUrl,
} from "../../../utils/utility";
import { Link } from "react-router-dom";
import * as navActions from "../../../store/actions/nav";
import * as themeActions from "../../../store/actions/theme";

//material components
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FilterListIcon from "@material-ui/icons/FilterList";
import WorkIcon from "@material-ui/icons/Work";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { makeStyles } from "@material-ui/core/styles";

//material icons
import Dashboard from "@material-ui/icons/Dashboard";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Storage from "@material-ui/icons/Storage";

const drawerWidth = 240;

const Sidebar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { onCloseDrawer, open } = props;
  const activeMenu = useSelector((state) => state.layout.menu);
  const activeSub = useSelector((state) => state.layout.submenu);
  const light = useSelector((state) => state.layout.light);
  const [sidebarList, setSidebarList] = useState({
    dashboard: {
      label: "Dashboard",
      icon: <Dashboard />,
      to: "/dashboard",
    },
    master: {
      label: "Master",
      icon: <Storage />,
      expanded: false,
      submenu: {
        admin: {
          label: "Admin",
          icon: <AccountCircle />,
          to: "/master/admin",
        },
        members: {
          label: "Member",
          icon: <AccountCircle />,
          to: "/master/members",
        },
        categories: {
          label: "Job Categories",
          icon: <FilterListIcon />,
          to: "/master/categories",
        },
      },
    },
    jobs: {
      label: "Jobs",
      icon: <WorkIcon />,
      expanded: false,
      submenu: {
        joblist: {
          label: "Job List",
          icon: <ListAltIcon />,
          to: "/jobs/joblist",
        },
        hires: {
          label: "Hires",
          icon: <SupervisorAccountIcon />,
          to: "/jobs/hires",
        },
      },
    },
  });

  const menuExpandHandler = useCallback(
    (menu) => {
      if (sidebarList[menu]) {
        if (sidebarList[menu].expanded !== undefined) {
          const updateMenuElement = updateObject(sidebarList[menu], {
            expanded: !sidebarList[menu].expanded,
          });
          const updateSidebarList = updateObject(sidebarList, {
            [menu]: updateMenuElement,
          });
          setSidebarList(updateSidebarList);
        }
      }
    },
    [sidebarList]
  );

  const changeThemeHandler = () => {
    dispatch(themeActions.setTheme());
  };

  const onActiveMenu = (menu, to) => {
    setCurrentUrl(to);
    dispatch(navActions.setMenu(menu));
    dispatch(navActions.setSubmenu(null));
  };

  const onActiveSubmenu = (submenu, to) => {
    setCurrentUrl(to);
    dispatch(navActions.setMenu(null));
    dispatch(navActions.setSubmenu(submenu));
  };

  useEffect(() => {
    menuExpandHandler(activeMenu);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let menuElements = objectToArray(sidebarList);

  let menuItems = menuElements.map((menu) => {
    if (!menu.expanded && menu.to) {
      return (
        <ListItem
          key={menu.id}
          button
          component={Link}
          to={menu.to}
          selected={activeMenu === menu.id}
          onClick={() => onActiveMenu(menu.id, menu.to)}
        >
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <ListItemText primary={menu.label} />
        </ListItem>
      );
    } else {
      let submenu = objectToArray(menu.submenu);

      return (
        <Fragment key={menu.id}>
          <ListItem button onClick={() => menuExpandHandler(menu.id)}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
            {menu.expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={menu.expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {submenu.map((sm) => (
                <ListItem
                  key={sm.id}
                  button
                  className={classes.nested}
                  component={Link}
                  to={sm.to}
                  selected={activeSub === sm.id}
                  onClick={() => onActiveSubmenu(sm.id, sm.to)}
                >
                  <ListItemIcon>{sm.icon}</ListItemIcon>
                  <ListItemText primary={sm.label} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Fragment>
      );
    }
  });

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <FormControlLabel
          control={
            <Switch
              checked={!light}
              onChange={changeThemeHandler}
              color="primary"
              name="Night Mode"
            />
          }
          label="Night Mode"
        />
        <IconButton onClick={onCloseDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{menuItems}</List>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.down("sm")]: {
      width: "0px",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
}));

export default Sidebar;
