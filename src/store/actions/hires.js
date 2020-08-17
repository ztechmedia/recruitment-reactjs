import axios from "../../axios/axios-main";
import * as alerts from "../../store/actions/alerts";

export const HIRES_START = "HIRES_START";
export const HIRES_FAIL = "HIRES_START";
export const FETCH_HIRES = "FETCH_HIRES";
export const FETCH_HIRE = "FETCH_HIRE";
export const DELETE_HIRES = "DELETE_HIRES";
export const FORM_SUBMIT_START = "FORM_SUBMIT_START";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchHires = (query) => async (dispatch) => {
  try {
    dispatch(hiresStart());
    const url = query ? `/api/v1/hires?${query}` : "/api/v1/hires";
    const response = await axios.get(url);
    dispatch(
      fetchHiresSuccess(response.data.totalDocument, response.data.data)
    );
  } catch (err) {
    dispatch(hiresFail(err));
  }
};

export const fetchHire = (_id) => async (dispatch) => {
  try {
    dispatch(hiresStart());
    const response = await axios.get(`/api/v1/hires/${_id}`);
    dispatch(fetchHireSuccess(response.data.data));
  } catch (err) {
    dispatch(hiresFail(err));
  }
};

export const deleteHires = (_id) => async (dispatch) => {
  try {
    dispatch(hiresStart());
    const response = await axios.delete("/api/v1/hires", {
      data: { _id: _id },
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: DELETE_HIRES,
      _id: response.data.data,
    });
    dispatch(alerts.setAlert("Delete hire successfully", "success"));
  } catch (err) {
    dispatch(hiresFail(err));
  }
};

export const sendInvititation = (hireId, appId, date) => async (dispatch) => {
  const data = {
    appId: appId,
    date: date,
  };

  try {
    dispatch({ type: FORM_SUBMIT_START });
    const response = await axios.put(`/api/v1/hires/${hireId}`, data, config);
    dispatch(fetchHireSuccess(response.data.data));
    dispatch(alerts.setAlert("Applicants has been invited", "success"));
  } catch (err) {
    dispatch(hiresFail(err));
  }
};

const fetchHiresSuccess = (totalDoc, hires) => {
  return {
    type: FETCH_HIRES,
    totalDoc: totalDoc,
    hires: hires,
  };
};

const fetchHireSuccess = (hire) => {
  return {
    type: FETCH_HIRE,
    hire: hire,
  };
};

const hiresStart = () => {
  return {
    type: HIRES_START,
  };
};

const hiresFail = (error) => {
  return {
    type: HIRES_FAIL,
    error: error,
  };
};
