import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
  authCheckStateSaga,
  loginSaga,
  registerSaga,
  checkAuthTimeoutSaga,
  sendTokenPasswordSaga,
  checkTokenSaga,
  resetPasswordSaga,
  logoutSaga,
} from "./auth";

import {
  fetchUsersSaga,
  fetchMembersSaga,
  fetchUserSaga,
  fetchEducationsSaga,
  fetchExperiencesSaga,
  fetchMeSaga,
  addUserSaga,
  addEducationSaga,
  addExperienceSaga,
  updateUserSaga,
  updateEducationSaga,
  updateExperienceSaga,
  deleteUsersSaga,
  deleteEducationSaga,
  deleteExperienceSaga,
  changePasswordSaga,
  updateProfileSaga,
} from "./users";

import {
  fetchCategoriesSaga,
  fetchCategorySaga,
  addCategoriesSaga,
  updateCategorySaga,
  deleteCategoriesSaga,
} from "./categories";

import {
  fetchJobsSaga,
  fetchJobSaga,
  addJobsSaga,
  updateJobsSaga,
  deleteJobSaga,
  fetchCountJobsSaga,
} from "./jobs";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_LOGIN, loginSaga),
    takeEvery(actionTypes.AUTH_REGISTER, registerSaga),
    takeEvery(actionTypes.SEND_TOKEN_PASSWORD, sendTokenPasswordSaga),
    takeEvery(actionTypes.CHECK_TOKEN_PASSWORD, checkTokenSaga),
    takeEvery(actionTypes.RESET_PASSWORD, resetPasswordSaga),
    takeEvery(actionTypes.LOGOUT, logoutSaga),
  ]);
}

export function* watchUsers() {
  yield all([
    takeEvery(actionTypes.FETCH_USERS, fetchUsersSaga),
    takeEvery(actionTypes.FETCH_USER, fetchUserSaga),
    takeEvery(actionTypes.FETCH_MEMBERS, fetchMembersSaga),
    takeEvery(actionTypes.FETCH_EDUCATIONS, fetchEducationsSaga),
    takeEvery(actionTypes.FETCH_EXPERIENCES, fetchExperiencesSaga),
    takeEvery(actionTypes.ADD_USER, addUserSaga),
    takeEvery(actionTypes.ADD_EDUCATION, addEducationSaga),
    takeEvery(actionTypes.ADD_EXPERIENCE, addExperienceSaga),
    takeEvery(actionTypes.UPDATE_USER, updateUserSaga),
    takeEvery(actionTypes.UPDATE_EDUCATION, updateEducationSaga),
    takeEvery(actionTypes.UPDATE_EXPERIENCE, updateExperienceSaga),
    takeEvery(actionTypes.DELETE_MULTIPLE_USERS, deleteUsersSaga),
    takeEvery(actionTypes.DELETE_EDUCATION, deleteEducationSaga),
    takeEvery(actionTypes.DELETE_EXPERIENCE, deleteExperienceSaga),
    takeEvery(actionTypes.SET_NEW_PASSWORD, changePasswordSaga),
    takeEvery(actionTypes.UPDATE_PROFILE, updateProfileSaga),
  ]);
}

export function* watchCategories() {
  yield all([
    takeEvery(actionTypes.FETCH_CATEGORIES, fetchCategoriesSaga),
    takeEvery(actionTypes.FETCH_CATEGORY, fetchCategorySaga),
    takeEvery(actionTypes.ADD_CATEGORIES, addCategoriesSaga),
    takeEvery(actionTypes.UPDATE_CATEGORY, updateCategorySaga),
    takeEvery(actionTypes.DELETE_MULTIPLE_CATEGORIES, deleteCategoriesSaga),
  ]);
}

export function* watchJobs() {
  yield all([
    takeEvery(actionTypes.FETCH_JOBS, fetchJobsSaga),
    takeEvery(actionTypes.FETCH_JOB, fetchJobSaga),
    takeEvery(actionTypes.FETCH_ME, fetchMeSaga),
    takeEvery(actionTypes.ADD_JOBS, addJobsSaga),
    takeEvery(actionTypes.UPDATE_JOBS, updateJobsSaga),
    takeEvery(actionTypes.DELETE_JOB, deleteJobSaga),
    takeEvery(actionTypes.FETCH_COUNT_JOB, fetchCountJobsSaga),
  ]);
}
