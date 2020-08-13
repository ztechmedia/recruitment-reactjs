import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utility";

const initialState = {
  categories: null,
  totalDoc: 0,
  category: null,
  loading: false,
  error: null,
  success: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORIES_START:
      return start(state, action);
    case actionTypes.CATEGORIES_FAIL:
      return fail(state, action);
    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return fetchCategoriesSuccess(state, action);
    case actionTypes.FETCH_CATEGORY_SUCCESS:
      return fetchCategorySuccess(state, action);
    case actionTypes.DELETE_MULTIPLE_CATEGORIES_SUCCESS:
      return deleteCategoriesSuccess(state, action);
    case actionTypes.FORM_CATEGORIES_SUCCESS:
      return formSuccess(state, action);
    default:
      return state;
  }
};

const start = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
  });
};

const fail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const fetchCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    totalDoc: action.totalDoc,
    categories: action.categories,
  });
};

const fetchCategorySuccess = (state, action) => {
  return updateObject(state, { loading: false, category: action.category });
};

const deleteCategoriesSuccess = (state, action) => {
  return updateObject(state, {
    categories: state.categories.filter((cat) => !action._id.includes(cat._id)),
    loading: false,
  });
};

const formSuccess = (state, action) => {
  return updateObject(state, { loading: false, success: action.success });
};

export default reducer;
