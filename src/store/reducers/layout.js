import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const currentUrl = localStorage.getItem("currentUrl");
let currentUrlArray = [];
if (currentUrl) currentUrlArray = currentUrl.split("/");

const initialState = {
  light: true,
  // menu: null,
  // submenu: null,
  menu: currentUrl ? currentUrlArray[1] : null,
  submenu: currentUrl ? currentUrlArray[2] : null,
  modalContent: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return setTheme(state, action);
    case actionTypes.SET_MENU:
      return setMenu(state, action);
    case actionTypes.SET_SUBMENU:
      return setSubmenu(state, action);
    case actionTypes.SET_MODAL_CONTENT:
      return setModalContent(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

const setTheme = (state, action) => {
  return updateObject(state, { light: !state.light });
};

const setMenu = (state, action) => {
  return updateObject(state, { menu: action.menu });
};

const setSubmenu = (state, action) => {
  return updateObject(state, { submenu: action.submenu });
};

const setModalContent = (state, action) => {
  return updateObject(state, { modalContent: action.content });
};

const logout = (state, action) => {
  return updateObject(state, initialState);
};

export default reducer;
