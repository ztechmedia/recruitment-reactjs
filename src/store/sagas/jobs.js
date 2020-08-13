import { put, call, all } from "redux-saga/effects";
import axios from "../../axios/axios-main";
import history from "../../utils/history";
import errorHandler from "../../utils/errors";
import * as jobsActions from "../actions/jobs";
import { setAlert } from "../actions/alerts";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function* fetchJobsSaga(action) {
  const url = action.query ? `/api/v1/jobs?${action.query}` : "/api/v1/jobs";

  try {
    yield put(jobsActions.start());
    const response = yield axios.get(url);
    yield put(
      jobsActions.fetchJobsSuccess(
        response.data.totalDocument,
        response.data.data,
        response.data.pagination
      )
    );
  } catch (err) {
    yield put(jobsActions.fail(err));
  }
}

export function* fetchJobSaga(action) {
  try {
    yield put(jobsActions.start());
    const response = yield axios.get(`/api/v1/jobs/${action._id}`);
    yield put(jobsActions.fetchJobSuccess(response.data.data));
  } catch (err) {
    yield put(jobsActions.fail(err));
  }
}

export function* fetchCountJobsSaga(action) {
  try {
    yield put(jobsActions.start());
    const response = yield axios.get("/api/v1/jobs/total-jobs");
    yield put(jobsActions.fetchCountJobsSuccess(response.data.data));
  } catch (err) {
    yield put(jobsActions.fail(err));
  }
}

export function* addJobsSaga(action) {
  const data = {
    name: action.name,
    categories: action.categories,
    minSallary: action.minSallary,
    maxSallary: action.maxSallary,
    minDegree: action.minDegree,
    description: action.description,
  };

  try {
    yield put(jobsActions.start());
    const response = yield axios.post("/api/v1/jobs", data, config);
    yield all([
      put(jobsActions.formSuccess(response.data.success)),
      put(setAlert("Add jobs successflly", "success")),
    ]);
  } catch (err) {
    yield all([
      put(jobsActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* updateJobsSaga(action) {
  const data = {
    name: action.name,
    categories: action.categories,
    minSallary: action.minSallary,
    maxSallary: action.maxSallary,
    minDegree: action.minDegree,
    description: action.description,
  };

  try {
    yield put(jobsActions.start());
    yield axios.put(`/api/v1/jobs/${action._id}`, data, config);
    yield all([
      call(history.push, "/jobs/joblist"),
      put(setAlert("Update jobs successflly", "success")),
    ]);
  } catch (err) {
    yield all([
      put(jobsActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* deleteJobSaga(action) {
  try {
    yield put(jobsActions.start());
    const response = yield axios.delete(`/api/v1/jobs/${action._id}`);
    yield all([
      put(jobsActions.deleteJobSuccess(response.data.data)),
      put(setAlert("Delete job successflly", "success")),
    ]);
  } catch (err) {
    yield put(jobsActions.fail(err));
  }
}
