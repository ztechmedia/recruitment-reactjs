import * as actionTypes from "../actions/actionTypes";
import { addArray } from "../../utils/utility";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return setAlert(state, action.alert);
    case actionTypes.REMOVE_ALERT:
      return removeAlert(state, action.id);
    default:
      return state;
  }
}

const setAlert = (state, action) => {
  return addArray(state, action);
};

const removeAlert = (state, id) => {
  return state.filter((alert) => alert.id !== id);
};
