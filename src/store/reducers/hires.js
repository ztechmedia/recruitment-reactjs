import {
  HIRES_START,
  HIRES_FAIL,
  FETCH_HIRES,
  FETCH_HIRE,
  DELETE_HIRES,
  FORM_SUBMIT_START,
} from "../actions/hires.js";
import { updateObject } from "../../utils/utility";

const initialState = {
  hires: null,
  totalDoc: 0,
  hire: null,
  loading: false,
  formSubmit: false,
  error: null,
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HIRES_START:
      return start(state, action);
    case HIRES_FAIL:
      return fail(state, action);
    case FETCH_HIRES:
      return fetchHiresSuccess(state, action);
    case FETCH_HIRE:
      return fetchHireSuccess(state, action);
    case DELETE_HIRES:
      return deleteHiresSuccess(state, action);
    case FORM_SUBMIT_START:
      return formSubmit(state, action);
    default:
      return state;
  }
};

const formSubmit = (state, action) => {
  return updateObject(state, {
    formSubmit: true,
  });
};

const start = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
  });
};

const fail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchHiresSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    totalDoc: action.totalDoc,
    hires: action.hires,
  });
};

const fetchHireSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    formSubmit: false,
    hire: action.hire,
  });
};

const deleteHiresSuccess = (state, action) => {
  return updateObject(state, {
    hires: state.hires.filter((cat) => !action._id.includes(cat._id)),
    loading: false,
  });
};

// const formSuccess = (state, action) => {
//   return updateObject(state, { loading: false, success: action.success });
// };

export default reducer;
