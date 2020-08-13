import * as alerts from "../store/actions/alerts";

const errorHandler = (errors) => (dispatch) => {
  if (Array.isArray(errors)) {
    errors.forEach((error) =>
      dispatch(alerts.setAlert(error.message, "error"))
    );
  } else {
    dispatch(alerts.setAlert(errors, "error"));
  }
};

export default errorHandler;
