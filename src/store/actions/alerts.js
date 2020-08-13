import { v4 as uuidv4 } from "uuid";
import * as actionTypes from "./actionTypes";

//trigger by sagas
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuidv4 + Math.random();
  dispatch({
    type: actionTypes.SET_ALERT,
    alert: { msg, alertType, id },
  });
  setTimeout(() => {
    dispatch({
      type: actionTypes.REMOVE_ALERT,
      id: id,
    });
  }, 5000);
};
