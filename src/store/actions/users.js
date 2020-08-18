import * as actionTypes from "./actionTypes";
import axios from "../../axios/axios-main";
import * as alerts from "../../store/actions/alerts";
import errorHandler from "../../utils/errors";
import history from "../../utils/history";

const configFormData = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const start = () => {
  return {
    type: actionTypes.USER_START,
  };
};

export const fail = (error) => {
  return {
    type: actionTypes.USER_FAIL,
    error: error,
  };
};

export const fetchUsers = (query) => {
  return {
    type: actionTypes.FETCH_USERS,
    query: query,
  };
};

export const fetchMembers = (query) => {
  return {
    type: actionTypes.FETCH_MEMBERS,
    query: query,
  };
};

export const fetchUsersSuccess = (totalDoc, users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    totalDoc: totalDoc,
    users: users,
  };
};

export const fetchUser = (_id) => {
  return {
    type: actionTypes.FETCH_USER,
    _id: _id,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    user: user,
  };
};

export const fetchMe = () => {
  return {
    type: actionTypes.FETCH_ME,
  };
};

export const updateProfile = (
  name,
  email,
  religion,
  birthPlace,
  birthDate,
  status,
  street,
  village,
  district,
  city,
  zipcode,
  province,
  facebook,
  instagram,
  twitter,
  youtube,
  linkedin
) => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    name: name,
    email: email,
    religion: religion,
    birthPlace: birthPlace,
    birthDate: birthDate,
    status: status,
    street: street,
    village: village,
    district: district,
    city: city,
    zipcode: zipcode,
    province: province,
    facebook: facebook,
    instagram: instagram,
    twitter: twitter,
    youtube: youtube,
    linkedin: linkedin,
  };
};

export const deleteUsers = (_id) => {
  return {
    type: actionTypes.DELETE_MULTIPLE_USERS,
    _id: _id,
  };
};

export const deleteUsersSuccess = (_id) => {
  return {
    type: actionTypes.DELETE_MULTIPLE_USERS_SUCCESS,
    _id: _id,
  };
};

export const addUser = (name, email, password, confirmPassword) => {
  return {
    type: actionTypes.ADD_USER,
    name: name,
    email: email,
    password: password,
    confirm: confirmPassword,
  };
};

export const updateUser = (_id, name, email, password, confirmPassword) => {
  return {
    type: actionTypes.UPDATE_USER,
    _id: _id,
    name: name,
    email: email,
    password: password,
    confirm: confirmPassword,
  };
};

export const changePassword = (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  return {
    type: actionTypes.SET_NEW_PASSWORD,
    currentPassword: currentPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
};

export const addEducation = (
  school,
  degree,
  fieldofstudy,
  from,
  to,
  description
) => {
  return {
    type: actionTypes.ADD_EDUCATION,
    school: school,
    degree: degree,
    fieldofstudy: fieldofstudy,
    from: from,
    to: to,
    description: description,
  };
};

export const updateEducation = (
  _id,
  school,
  degree,
  fieldofstudy,
  from,
  to,
  description
) => {
  return {
    type: actionTypes.UPDATE_EDUCATION,
    _id: _id,
    school: school,
    degree: degree,
    fieldofstudy: fieldofstudy,
    from: from,
    to: to,
    description: description,
  };
};

export const addExperience = (
  title,
  company,
  location,
  from,
  to,
  description
) => {
  return {
    type: actionTypes.ADD_EXPERIENCE,
    title: title,
    company: company,
    location: location,
    from: from,
    to: to,
    description: description,
  };
};

export const updateExperience = (
  _id,
  title,
  company,
  location,
  from,
  to,
  description
) => {
  return {
    type: actionTypes.UPDATE_EXPERIENCE,
    _id: _id,
    title: title,
    company: company,
    location: location,
    from: from,
    to: to,
    description: description,
  };
};

export const deleteEducation = (_id) => {
  return {
    type: actionTypes.DELETE_EDUCATION,
    _id: _id,
  };
};

export const deleteExperience = (_id) => {
  return {
    type: actionTypes.DELETE_EXPERIENCE,
    _id: _id,
  };
};

export const fetchEducations = () => {
  return {
    type: actionTypes.FETCH_EDUCATIONS,
  };
};

export const fetchEducationsSuccess = (educations) => {
  return {
    type: actionTypes.FETCH_EDUCATIONS_SUCCESS,
    educations: educations,
  };
};

export const fetchExperiences = () => {
  return {
    type: actionTypes.FETCH_EXPERIENCES,
  };
};

export const fetchExperiencesSuccess = (experiences) => {
  return {
    type: actionTypes.FETCH_EXPERIENCES_SUCCESS,
    experiences: experiences,
  };
};

export const fetchEducation = (_id) => {
  return {
    type: actionTypes.FETCH_EDUCATION,
    _id: _id,
  };
};

export const fetchExperience = (_id) => {
  return {
    type: actionTypes.FETCH_EXPERIENCE,
    _id: _id,
  };
};

export const formSuccess = (success) => {
  return {
    type: actionTypes.FORM_USER_SUCCESS,
    success: success,
  };
};

export const updateEmail = (userId, email) => async (dispatch) => {
  const data = {
    email: email,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(start());
    const response = await axios.put(`/api/v1/users/${userId}`, data, config);
    dispatch(formSuccess(response.data.success));
    dispatch(alerts.setAlert("Update email successfuly", "success"));
  } catch (err) {
    dispatch(fail());
    dispatch(errorHandler(err.response.data.error));
  }
};

export const addResume = (resume) => async (dispatch) => {
  const data = new FormData();
  try {
    dispatch(start());
    data.append("file", resume);
    await axios.post("/api/v1/users/resume", data, configFormData);
    dispatch(alerts.setAlert("Resume file has been updated", "success"));
    history.push("/profile/resume/list");
  } catch (err) {
    dispatch(fail(err));
    dispatch(errorHandler(err.response.data.error));
  }
};
