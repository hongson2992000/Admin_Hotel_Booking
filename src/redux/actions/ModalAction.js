import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const showModal = createAction("SHOW_CREATE_SERVICE_MODAL");
export const hideModal = createAction("HIDE_CREATE_SERVICE_MODAL");
