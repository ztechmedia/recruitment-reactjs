import { put, call, all } from "redux-saga/effects";
import axios from "../../axios/axios-main";
import history from "../../utils/history";
import errorHandler from "../../utils/errors";
import * as usersActions from "../actions/users";
import { setAlert } from "../actions/alerts";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function* fetchUsersSaga(action) {
  try {
    yield put(usersActions.start());
    let url = action.query
      ? `/api/v1/users?role=admin&${action.query}`
      : "/api/v1/users";
    const response = yield axios.get(url);
    yield put(
      usersActions.fetchUsersSuccess(
        response.data.totalDocument,
        response.data.data
      )
    );
  } catch (err) {
    yield all([put(usersActions.fail(err.response.data.error))]);
  }
}

export function* fetchMembersSaga(action) {
  try {
    yield put(usersActions.start());
    let url = action.query
      ? `/api/v1/users?role=member&${action.query}`
      : "/api/v1/users";
    const response = yield axios.get(url);
    yield put(
      usersActions.fetchUsersSuccess(
        response.data.totalDocument,
        response.data.data
      )
    );
  } catch (err) {
    yield all([put(usersActions.fail(err))]);
  }
}

export function* fetchUserSaga(action) {
  try {
    yield put(usersActions.start());
    const response = yield axios.get(`/api/v1/users/${action._id}`);
    yield put(usersActions.fetchUserSuccess(response.data.data));
  } catch (err) {
    yield put(usersActions.fail(err));
  }
}

export function* fetchEducationsSaga(action) {
  try {
    yield put(usersActions.start());
    const response = yield axios.get(`/api/v1/users/educations`);
    yield put(usersActions.fetchEducationsSuccess(response.data.data));
  } catch (err) {
    yield put(usersActions.fail(err));
  }
}

export function* fetchExperiencesSaga(action) {
  try {
    yield put(usersActions.start());
    const response = yield axios.get(`/api/v1/users/experiences`);
    yield put(usersActions.fetchExperiencesSuccess(response.data.data));
  } catch (err) {
    yield put(usersActions.fail(err));
  }
}

export function* fetchMeSaga(action) {
  try {
    yield put(usersActions.start());
    const response = yield axios.get("/api/v1/auth/me");
    yield put(usersActions.fetchUserSuccess(response.data.data));
  } catch (err) {
    yield put(usersActions.fail(err));
  }
}

export function* updateProfileSaga(action) {
  const data = {
    name: action.name,
    email: action.email,
    religion: action.religion,
    birthPlace: action.birthPlace,
    birthDate: action.birthDate,
    status: action.status,
    street: action.street,
    village: action.village,
    district: action.district,
    city: action.city,
    zipcode: action.zipcode,
    province: action.province,
    facebook: action.facebook,
    instagram: action.instagram,
    twitter: action.twitter,
    youtube: action.youtube,
    linkedin: action.linkedin,
  };

  try {
    yield put(usersActions.start());
    const response = yield axios.post(
      "/api/v1/users/update-profile",
      data,
      config
    );
    yield all([
      put(usersActions.fetchUserSuccess(response.data.data)),
      put(setAlert("Update profile successfully", "success")),
      call(history.push, "/profile/detail/data"),
    ]);
  } catch (err) {
    yield all([
      put(usersActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* addUserSaga(action) {
  const isAdmin = yield call([localStorage, "getItem"], "currentUrl") ===
    "/master/admin";

  if (action.password !== action.confirm) {
    yield put(errorHandler("Password doesn't match"));
    return;
  }

  const role = isAdmin ? "admin" : "member";

  const data = {
    name: action.name,
    email: action.email,
    password: action.password,
    role: role,
  };

  try {
    yield put(usersActions.start());
    const response = yield axios.post("/api/v1/users", data, config);
    yield all([
      put(usersActions.formSuccess(response.data.success)),
      put(setAlert("Add user successfully", "success")),
    ]);
  } catch (err) {
    yield all([
      put(usersActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* updateUserSaga(action) {
  const currentUrl = yield call([localStorage, "getItem"], "currentUrl");

  let data = {
    name: action.name,
    email: action.email,
  };

  if (currentUrl !== "/master/admin") {
    if (action.password || action.confirm) {
      if (action.password !== action.confirm) {
        yield put(errorHandler("Password doesn't match"));
        return;
      }
      data = { ...data, password: action.password };
    }
  }

  try {
    yield put(usersActions.start());
    yield axios.put(`/api/v1/users/${action._id}`, data, config);
    yield all([
      call(history.push, currentUrl),
      put(setAlert("Update user successfully", "success")),
    ]);
  } catch (err) {
    yield all([
      put(usersActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* deleteUsersSaga(action) {
  try {
    yield put(usersActions.start());
    const response = yield axios.delete("/api/v1/users", {
      data: {
        _id: action._id,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield all([
      put(usersActions.deleteUsersSuccess(response.data.data)),
      put(setAlert("Delete user successfully", "success")),
    ]);
  } catch (err) {
    yield all([put(usersActions.fail(err))]);
  }
}

export function* changePasswordSaga(action) {
  const data = {
    currentPassword: action.currentPassword,
    newPassword: action.newPassword,
  };

  if (action.newPassword !== action.confirmPassword) {
    yield put(errorHandler("Password doesn't match"));
    return;
  }

  try {
    yield put(usersActions.start());
    const response = yield axios.post(
      "/api/v1/users/change-password",
      data,
      config
    );
    yield all([
      put(usersActions.formSuccess(response.data.success)),
      put(setAlert("Change password successfully", "success")),
    ]);
  } catch (err) {
    yield put(usersActions.fail(err));
    yield put(errorHandler(err.response.data.error));
  }
}

export function* addEducationSaga(action) {
  const data = {
    school: action.school,
    degree: action.degree,
    fieldofstudy: action.fieldofstudy,
    from: action.from,
    to: action.to,
    description: action.description,
  };

  try {
    yield put(usersActions.start());
    const response = yield axios.post("/api/v1/users/educations", data, config);
    yield all([
      put(usersActions.formSuccess(response.data.success)),
      put(setAlert("Add education successfully", "success")),
    ]);
  } catch (err) {
    yield all([
      put(usersActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* addExperienceSaga(action) {
  const data = {
    title: action.title,
    company: action.company,
    location: action.location,
    from: action.from,
    to: action.to,
    current: action.current,
    description: action.description,
  };

  try {
    yield put(usersActions.start());
    const response = yield axios.post(
      "/api/v1/users/experiences",
      data,
      config
    );
    yield all([
      put(usersActions.formSuccess(response.data.success)),
      put(setAlert("Add experience successfully", "success")),
    ]);
  } catch (err) {
    yield all([
      put(usersActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* updateEducationSaga(action) {
  const data = {
    school: action.school,
    degree: action.degree,
    fieldofstudy: action.fieldofstudy,
    from: action.from,
    to: action.to,
    description: action.description,
  };

  try {
    yield put(usersActions.start());
    yield axios.put(`/api/v1/users/educations/${action._id}`, data, config);
    yield all([
      put(setAlert("Update education successfully", "success")),
      call(history.push, "/profile/education/list"),
    ]);
  } catch (err) {
    yield all([
      put(usersActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* updateExperienceSaga(action) {
  const data = {
    title: action.title,
    company: action.company,
    location: action.location,
    from: action.from,
    to: action.to,
    current: action.current,
    description: action.description,
  };

  try {
    yield put(usersActions.start());
    yield axios.put(`/api/v1/users/experiences/${action._id}`, data, config);
    yield all([
      put(setAlert("Update experience successfully", "success")),
      call(history.push, "/profile/experience/list"),
    ]);
  } catch (err) {
    yield all([
      put(usersActions.fail(err)),
      put(errorHandler(err.response.data.error)),
    ]);
  }
}

export function* deleteEducationSaga(action) {
  try {
    yield put(usersActions.start());
    const response = yield axios.delete(
      `/api/v1/users/educations/${action._id}`
    );
    yield all([
      put(usersActions.fetchEducationsSuccess(response.data.data)),
      put(setAlert("Delete education successfully", "success")),
    ]);
  } catch (err) {
    yield all([put(usersActions.fail(err))]);
  }
}

export function* deleteExperienceSaga(action) {
  try {
    yield put(usersActions.start());
    const response = yield axios.delete(
      `/api/v1/users/experiences/${action._id}`
    );
    yield all([
      put(usersActions.fetchExperiencesSuccess(response.data.data)),
      put(setAlert("Delete experience successfully", "success")),
    ]);
  } catch (err) {
    yield all([put(usersActions.fail(err))]);
  }
}
