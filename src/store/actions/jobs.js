import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-main";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const start = () => {
  return {
    type: actionTypes.JOBS_START,
  };
};

export const fail = (error) => {
  return {
    type: actionTypes.JOBS_FAIL,
    error: error,
  };
};

export const addJobs = (
  name,
  categories,
  minSallary,
  maxSallary,
  minDegree,
  description
) => {
  return {
    type: actionTypes.ADD_JOBS,
    name: name,
    categories,
    minSallary: minSallary,
    maxSallary: maxSallary,
    minDegree: minDegree,
    description: description,
  };
};

export const updateJobs = (
  _id,
  name,
  categories,
  minSallary,
  maxSallary,
  minDegree,
  description
) => {
  return {
    type: actionTypes.UPDATE_JOBS,
    _id: _id,
    name: name,
    categories,
    minSallary: minSallary,
    maxSallary: maxSallary,
    minDegree: minDegree,
    description: description,
  };
};

export const fetchJobs = (query) => {
  return {
    type: actionTypes.FETCH_JOBS,
    query: query,
  };
};

export const fetchCountJobs = () => {
  return {
    type: actionTypes.FETCH_COUNT_JOB,
  };
};

export const fetchCountJobsSuccess = (totalDoc) => {
  return {
    type: actionTypes.FETCH_COUNT_JOB_SUCCESS,
    totalDoc: totalDoc,
  };
};

export const fetchJobsSuccess = (totalDoc, jobs, pagination) => {
  return {
    type: actionTypes.FETCH_JOBS_SUCCESS,
    totalDoc: totalDoc,
    jobs: jobs,
    pagination: pagination,
  };
};

export const fetchJob = (_id) => {
  return {
    type: actionTypes.FETCH_JOB,
    _id: _id,
  };
};

export const fetchJobSuccess = (job) => {
  return {
    type: actionTypes.FETCH_JOB_SUCCESS,
    job: job,
  };
};

export const deleteJob = (_id) => {
  return {
    type: actionTypes.DELETE_JOB,
    _id: _id,
  };
};

export const deleteJobSuccess = (_id) => {
  return {
    type: actionTypes.DELETE_JOB_SUCCESS,
    _id: _id,
  };
};

export const formSuccess = (success) => {
  return {
    type: actionTypes.FORM_JOBS_SUCCESS,
    success: success,
  };
};

export const applyJob = (jobId) => async (dispatch) => {
  const data = {
    jobId: jobId,
  };
  try {
    start();
    const response = await axios.post("/api/v1/jobs/apply", data, config);
    if (response)
      dispatch({
        type: actionTypes.FETCH_JOB_SUCCESS,
        job: response.data.data,
      });
  } catch (err) {
    fail(err);
  }
};
