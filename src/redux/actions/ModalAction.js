import { createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const showModal = createAction("SHOW_CREATE_SERVICE_MODAL");
export const hideModal = createAction("HIDE_CREATE_SERVICE_MODAL");

export const showModalUpdate = createAction("SHOW_UPDATE_SERVICE_MODAL");
export const hideModalUpdate = createAction("HIDE_UPDATE_SERVICE_MODAL");

export const showModalAddUser = createAction("SHOW_ADD_USER_MODAL");
export const hideModalAddUser = createAction("HIDE_ADD_USER_MODAL");

export const showModalSuccess = createAction("SHOW_SUCCESS_MODAL");
export const hideModalSuccess = createAction("HIDE_SUCCESS_MODAL");

export const showModalListService = createAction("SHOW_LIST_SERVICE_MODAL");
export const hideModalListService = createAction("HIDE_LIST_SERVICE_MODAL");