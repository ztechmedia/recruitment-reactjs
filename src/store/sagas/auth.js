import { put, call, all, delay } from "redux-saga/effects";
import axios from "../../axios/axios-main";
import history from "../../utils/history";
import errorHandler from "../../utils/errors";
import * as auth from "../actions/auth";
import * as nav from "../actions/nav";
import * as alerts from "../actions/alerts";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function* loginSaga(action) {
  let data = {
    email: action.email,
    password: action.password,
  };

  let url = "/api/v1/auth/login";

  if (action.isSignup) {
    url = "/api/v1/auth/register";

    if (action.password !== action.confirmPassword) {
      yield all([
        put(auth.fail("Password doesn't match")),
        put(alerts.setAlert("Password doesn't match", "error")),
      ]);
      return;
    }

    data = {
      ...data,
      name: action.name,
      role: "member",
    };
  }

  try {
    yield put(auth.start());
    const response = yield axios.post(url, data, config);

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    const user = response.data.userLogged;
    const push =
      user.role === "admin" ? "/dashboard" : "/profile/education/list";
    const menu = user.role === "admin" ? "dashboard" : "profile";

    yield all([
      call([localStorage, "setItem"], "token", response.data.token),
      call([localStorage, "setItem"], "expirationDate", expirationDate),
      call([localStorage, "setItem"], "currentUrl", push),
      put(auth.authSuccess(response.data.token, response.data.userLogged)),
      put(auth.checkAuthTimeout(response.data.expiresIn)),
      put(nav.setMenu(menu)),
      put(nav.setSubmenu(null)),
      (axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${response.data.token}`),
      call(history.push, push),
    ]);
  } catch (err) {
    yield all([
      put(auth.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* registerSaga(action) {
  const data = {
    name: action.name,
    email: action.email,
    password: action.password,
    role: "member",
  };

  if (action.password !== action.confirm) {
    yield put(errorHandler("Password doesn't match"));
    return;
  }

  try {
    yield put(auth.start());
    const response = yield axios.post("/api/v1/auth/register", data, config);

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    yield all([
      call([localStorage, "setItem"], "token", response.data.token),
      call([localStorage, "setItem"], "expirationDate", expirationDate),
      call([localStorage, "setItem"], "currentUrl", "/profile/education/list"),
      put(auth.authSuccess(response.data.token, response.data.userLogged)),
      put(auth.checkAuthTimeout(response.data.expiresIn)),
      put(nav.setMenu("profile")),
      put(nav.setSubmenu(null)),
      (axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${response.data.token}`),
      call(history.push, "/profile/education/list"),
    ]);
  } catch (err) {
    yield all([
      put(auth.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* sendTokenPasswordSaga(action) {
  const data = {
    email: action.email,
  };

  try {
    yield put(auth.start());
    const response = yield axios.post(
      "/api/v1/auth/forgot-password",
      data,
      config
    );
    yield all([
      put(auth.sendPasswordTokenSuccess(response.data.success)),
      put(alerts.setAlert("Email with token has been sent", "success")),
    ]);
  } catch (err) {
    yield all([
      put(auth.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* checkTokenSaga(action) {
  try {
    yield put(auth.start());
    const response = yield axios.get(
      `/api/v1/auth/check-token/${action.resetToken}`
    );
    yield put(auth.checkTokenPasswordSuccess(response.data.success));
  } catch (err) {
    yield put(auth.fail(err));
  }
}

export function* resetPasswordSaga(action) {
  const data = {
    password: action.password,
  };

  if (action.password !== action.confirm) {
    yield put(errorHandler("Password doesn't match"));
    return;
  }

  try {
    const response = yield axios.post(
      `/api/v1/auth/reset-password/${action.resetToken}`,
      data,
      config
    );

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    const user = response.data.userLogged;
    const push =
      user.role === "admin" ? "/dashboard" : "/profile/education/list";
    const menu = user.role === "admin" ? "dashboard" : "profile";

    yield all([
      call([localStorage, "setItem"], "token", response.data.token),
      call([localStorage, "setItem"], "expirationDate", expirationDate),
      call([localStorage, "setItem"], "currentUrl", push),
      put(auth.authSuccess(response.data.token, response.data.userLogged)),
      put(auth.checkAuthTimeout(response.data.expiresIn)),
      put(nav.setMenu(menu)),
      put(nav.setSubmenu(null)),
      (axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${response.data.token}`),
      call(history.push, "/"),
    ]);
  } catch (err) {}
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(auth.logout());
}

export function* authCheckStateSaga(action) {
  const token = yield call([localStorage, "getItem"], "token");
  if (!token) {
    yield all([
      call(clearLocalStorage),
      delete axios.defaults.headers.common["authorization"],
    ]);
  } else {
    const expirationDate = yield new Date(
      yield call([localStorage, "getItem"], "expirationDate")
    );

    if (expirationDate <= new Date()) {
      yield all([
        call(clearLocalStorage),
        delete axios.defaults.headers.common["authorization"],
      ]);
    } else {
      yield all([
        (axios.defaults.headers.common["authorization"] = `Bearer ${token}`),
        put(auth.authCheckStateStart()),
      ]);

      const response = yield axios.get("api/v1/auth/me");

      yield all([
        put(auth.authSuccess(token, response.data.data)),
        put(
          auth.checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        ),
      ]);
    }
  }
}

function* clearLocalStorage() {
  yield all([
    call([localStorage, "removeItem"], "token"),
    call([localStorage, "removeItem"], "expirationDate"),
    call([localStorage, "removeItem"], "currentUrl"),
  ]);
}

export function* logoutSaga(action) {
  yield all([call(clearLocalStorage), call(history.push, "/login")]);
}
