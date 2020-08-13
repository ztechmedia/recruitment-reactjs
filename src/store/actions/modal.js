import * as actionTypes from "../../store/actions/actionTypes";

export const setModalContent = (content) => {
  return {
    type: actionTypes.SET_MODAL_CONTENT,
    content: content,
  };
};
