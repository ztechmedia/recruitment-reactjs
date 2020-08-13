import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const initialState = {
  token: null,
  userLogged: null,
  loading: false,
  checkState: false,
  error: null,
  success: false,
  tokenPassword: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return start(state, action);
    case actionTypes.AUTH_FAIL:
      return fail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_CHECK_STATE_START:
      return checkStateStart(state, action);
    case actionTypes.SEND_TOKEN_PASSWORD_SUCCESS:
      return sendTokenPasswordSuccess(state, action);
    case actionTypes.CHECK_TOKEN_PASSWORD_SUCCESS:
      return checkTokenPasswordSuccess(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

const start = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
    tokenPassword: null,
  });
};

const fail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userLogged: action.userLogged,
    loading: false,
    checkState: false,
    error: null,
    tokenPassword: null,
  });
};

const checkStateStart = (state, action) => {
  return updateObject(state, { checkState: true });
};

const sendTokenPasswordSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    success: true,
  });
};

const checkTokenPasswordSuccess = (state, action) => {
  return updateObject(state, { loading: false, tokenPassword: action.success });
};

const logout = (state, action) => {
  return updateObject(state, initialState);
};

export default reducer;
