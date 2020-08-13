import * as actionTypes from "./actionTypes";

export const start = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const fail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const register = (name, email, password, confirmPassword) => {
  return {
    type: actionTypes.AUTH_REGISTER,
    name: name,
    email: email,
    password: password,
    confirm: confirmPassword,
  };
};

export const login = (email, password, isSignup = false) => {
  return {
    type: actionTypes.AUTH_LOGIN,
    email: email,
    password: password,
    isSignup: isSignup,
  };
};

export const authSuccess = (token, userLogged) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userLogged: userLogged,
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE,
  };
};

export const authCheckStateStart = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE_START,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime,
  };
};

export const sendPasswordToken = (email) => {
  return {
    type: actionTypes.SEND_TOKEN_PASSWORD,
    email: email,
  };
};

export const sendPasswordTokenSuccess = (success) => {
  return {
    type: actionTypes.SEND_TOKEN_PASSWORD_SUCCESS,
    success: success,
  };
};

export const checkTokenPassword = (resetToken) => {
  return {
    type: actionTypes.CHECK_TOKEN_PASSWORD,
    resetToken: resetToken,
  };
};

export const checkTokenPasswordSuccess = (success) => {
  return {
    type: actionTypes.CHECK_TOKEN_PASSWORD_SUCCESS,
    success: success,
  };
};

export const resetPassword = (resetToken, password, confirmPassword) => {
  return {
    type: actionTypes.RESET_PASSWORD,
    resetToken: resetToken,
    password: password,
    confirm: confirmPassword,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
