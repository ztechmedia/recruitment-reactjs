import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const initialState = {
  users: null,
  totalDoc: 0,
  user: null,
  educations: null,
  education: null,
  experiences: null,
  experience: null,
  loading: false,
  error: null,
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_START:
      return start(state, action);
    case actionTypes.USER_FAIL:
      return fail(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action);
    case actionTypes.FETCH_USER_SUCCESS:
      return fetchUserSuccess(state, action);
    case actionTypes.FETCH_EDUCATIONS_SUCCESS:
      return fetchEducationsSuccess(state, action);
    case actionTypes.FETCH_EDUCATION:
      return fetchEducationSuccess(state, action);
    case actionTypes.FETCH_EXPERIENCES_SUCCESS:
      return fetchExperiencesSuccess(state, action);
    case actionTypes.FETCH_EXPERIENCE:
      return fetchExperienceSuccess(state, action);
    case actionTypes.DELETE_MULTIPLE_USERS_SUCCESS:
      return deleteUsersSuccess(state, action);
    case actionTypes.FORM_USER_SUCCESS:
      return formSuccess(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

const start = (state, action) => {
  return updateObject(state, { loading: true, error: null, success: false });
};

const fail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchUsersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    users: action.users,
    totalDoc: action.totalDoc,
  });
};

const fetchUserSuccess = (state, action) => {
  return updateObject(state, { loading: false, user: action.user });
};

const fetchEducationsSuccess = (state, action) => {
  return updateObject(state, { loading: false, educations: action.educations });
};

const fetchExperiencesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    experiences: action.experiences,
  });
};

const fetchEducationSuccess = (state, action) => {
  const eduIndex = state.educations
    ? state.educations.map((edu) => edu._id).indexOf(action._id)
    : null;

  return updateObject(state, {
    loading: false,
    education: eduIndex !== null ? state.educations[eduIndex] : null,
  });
};

const fetchExperienceSuccess = (state, action) => {
  const expIndex = state.experiences
    ? state.experiences.map((exp) => exp._id).indexOf(action._id)
    : null;

  return updateObject(state, {
    loading: false,
    experience: expIndex !== null ? state.experiences[expIndex] : null,
  });
};

const deleteUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: state.users.filter((user) => !action._id.includes(user._id)),
    loading: false,
  });
};

const formSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    success: action.success,
  });
};

const logout = (state, action) => {
  return updateObject(state, initialState);
};

export default reducer;
