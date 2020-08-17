import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

//reducer
import alertsReducer from "./reducers/alerts";
import authReducer from "./reducers/auth";
import usersReducer from "./reducers/users";
import categoriesReducer from "./reducers/categories";
import jobsReducer from "./reducers/jobs";
import layoutReducer from "./reducers/layout";
import hiresLayout from "./reducers/hires";
import { watchAuth, watchUsers, watchCategories, watchJobs } from "./sagas";

const composeEchancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducers = combineReducers({
  alerts: alertsReducer,
  auth: authReducer,
  users: usersReducer,
  categories: categoriesReducer,
  jobs: jobsReducer,
  layout: layoutReducer,
  hires: hiresLayout,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducers,
  composeEchancers(applyMiddleware(thunk, sagaMiddleware))
);

export const sagas = () => {
  sagaMiddleware.run(watchAuth);
  sagaMiddleware.run(watchUsers);
  sagaMiddleware.run(watchCategories);
  sagaMiddleware.run(watchJobs);
};
