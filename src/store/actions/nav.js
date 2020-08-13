import * as actionTypes from "./actionTypes";

export const setMenu = (menu) => {
  return {
    type: actionTypes.SET_MENU,
    menu: menu,
  };
};

export const setSubmenu = (submenu) => {
  return {
    type: actionTypes.SET_SUBMENU,
    submenu: submenu,
  };
};
