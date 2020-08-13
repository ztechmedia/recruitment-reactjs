import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const initialState = {
  jobs: null,
  pagination: null,
  totalDoc: 0,
  job: null,
  error: null,
  loading: false,
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.JOBS_START:
      return start(state, action);
    case actionTypes.JOBS_FAIL:
      return fail(state, action);
    case actionTypes.FORM_JOBS_SUCCESS:
      return formSuccess(state, action);
    case actionTypes.FETCH_JOBS_SUCCESS:
      return fetchJobsSuccess(state, action);
    case actionTypes.FETCH_JOB_SUCCESS:
      return fetchJobSuccess(state, action);
    case actionTypes.FETCH_COUNT_JOB_SUCCESS:
      return fechCountJobs(state, action);
    case actionTypes.DELETE_JOB_SUCCESS:
      return deleteJobSuccess(state, action);
    default:
      return state;
  }
};

const start = (state, action) => {
  return updateObject(state, {
    loading: false,
    success: false,
    error: null,
    pagination: null,
  });
};

const fail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchJobsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    totalDoc: action.totalDoc,
    jobs: action.jobs,
    pagination: action.pagination,
  });
};

const fetchJobSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    job: action.job,
  });
};

const deleteJobSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    jobs: state.jobs.filter((job) => job._id !== action._id),
  });
};

const fechCountJobs = (state, action) => {
  return updateObject(state, { loading: false, totalDoc: action.totalDoc });
};

const formSuccess = (state, action) => {
  return updateObject(state, { loading: false, success: true });
};

export default reducer;
