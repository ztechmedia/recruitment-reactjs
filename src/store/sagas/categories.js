import { put, call, all } from "redux-saga/effects";
import axios from "../../axios/axios-main";
import history from "../../utils/history";
import errorHandler from "../../utils/errors";
import * as catActions from "../actions/categories";
import { setAlert } from "../actions/alerts";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function* fetchCategoriesSaga(action) {
  try {
    yield put(catActions.start());
    let url = action.query
      ? `/api/v1/categories?${action.query}`
      : "/api/v1/categories";
    const response = yield axios.get(url);
    yield put(
      catActions.fetchCategoriesSuccess(
        response.data.totalDocument,
        response.data.data
      )
    );
  } catch (err) {
    yield put(catActions.fail(err));
  }
}

export function* fetchCategorySaga(action) {
  try {
    yield put(catActions.start());
    const response = yield axios.get(`/api/v1/categories/${action._id}`);
    yield put(catActions.fetchCategorySuccess(response.data.data));
  } catch (err) {
    yield put(catActions.fail(err));
  }
}

export function* addCategoriesSaga(action) {
  const data = {
    name: action.name,
  };

  try {
    yield put(catActions.start());
    const response = yield axios.post("/api/v1/categories", data, config);
    yield all([
      put(catActions.formSuccess(response.data.success)),
      put(setAlert("Add job categories successfully", "success")),
    ]);
  } catch (err) {
    yield all([
      put(catActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* updateCategorySaga(action) {
  const data = {
    name: action.name,
  };

  try {
    yield put(catActions.start());
    yield axios.put(`/api/v1/categories/${action._id}`, data, config);
    yield all([
      call(history.push, "/master/categories"),
      put(setAlert("Update job categories successfully", "success")),
    ]);
  } catch (err) {
    yield all([
      put(catActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* deleteCategoriesSaga(action) {
  try {
    yield put(catActions.start());
    const response = yield axios.delete("/api/v1/categories", {
      data: {
        _id: action._id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield all([
      put(catActions.deleteCategoriesSuccess(response.data.data)),
      put(setAlert("Delete job categories successfully", "success")),
    ]);
  } catch (err) {
    console.log(err);
    yield all([put(catActions.fail(err))]);
  }
}
