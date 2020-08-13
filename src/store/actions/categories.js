import * as actionTypes from "./actionTypes";

export const start = () => {
  return {
    type: actionTypes.CATEGORIES_START,
  };
};

export const fail = (error) => {
  return {
    type: actionTypes.CATEGORIES_FAIL,
    error: error,
  };
};

export const fetchCategories = (query) => {
  return {
    type: actionTypes.FETCH_CATEGORIES,
    query: query,
  };
};

export const fetchCategoriesSuccess = (totalDoc, categories) => {
  return {
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    totalDoc: totalDoc,
    categories: categories,
  };
};

export const fetchCategory = (_id) => {
  return {
    type: actionTypes.FETCH_CATEGORY,
    _id: _id,
  };
};

export const fetchCategorySuccess = (category) => {
  return {
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    category: category,
  };
};

export const addCategories = (name) => {
  return {
    type: actionTypes.ADD_CATEGORIES,
    name: name,
  };
};

export const updateCategory = (_id, name) => {
  return {
    type: actionTypes.UPDATE_CATEGORY,
    _id: _id,
    name: name,
  };
};

export const deleteCategories = (_id) => {
  return {
    type: actionTypes.DELETE_MULTIPLE_CATEGORIES,
    _id: _id,
  };
};

export const deleteCategoriesSuccess = (_id) => {
  return {
    type: actionTypes.DELETE_MULTIPLE_CATEGORIES_SUCCESS,
    _id: _id,
  };
};

export const formSuccess = () => {
  return {
    type: actionTypes.FORM_CATEGORIES_SUCCESS,
  };
};
