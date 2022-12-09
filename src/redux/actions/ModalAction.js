import { createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const showModal = createAction("SHOW_CREATE_SERVICE_MODAL");
export const hideModal = createAction("HIDE_CREATE_SERVICE_MODAL");

export const showModalUpdate = createAction("SHOW_UPDATE_SERVICE_MODAL");
export const hideModalUpdate = createAction("HIDE_UPDATE_SERVICE_MODAL");

export const showModalAddLocation = createAction("SHOW_CREATE_LOCATION_MODAL");
export const hideModalAddLocation = createAction("HIDE_CREATE_LOCATION_MODAL");

export const showModalUpdateLocation = createAction(
  "SHOW_UPDATE_LOCATION_MODAL"
);
export const hideModalUpdateLocation = createAction(
  "HIDE_UPDATE_LOCATION_MODAL"
);

export const showModalAddUser = createAction("SHOW_ADD_USER_MODAL");
export const hideModalAddUser = createAction("HIDE_ADD_USER_MODAL");

export const showModalSuccess = createAction("SHOW_ADD_USER_MODAL");
export const hideModalSuccess = createAction("HIDE_ADD_USER_MODAL");

export const showCreateAccountModel = createAction("SHOW_CREATE_ACCOUNT_MODEL");
export const hideCreateAccountModel = createAction("HIDE_UPDATE_ACCOUNT_MODAL");

export const showUpdateAccountModel = createAction("SHOW_UPDATE_ACCOUNT_MODAL");
export const hideUpdateAccountModel = createAction("HIDE_UPDATE_ACCOUNT_MODAL");

export const showModalListService = createAction("SHOW_LIST_SERVICE_MODAL");
export const hideModalListService = createAction("HIDE_LIST_SERVICE_MODAL");

export const showModalSendMessage = createAction("SHOW_SEND_MESSAGE_MODAL");
export const hideModalSendMessage = createAction("HIDE_SEND_MESSAGE_MODAL");

export const showModalRequestService = createAction(
  "SHOW_REQUEST_SERVICE_MODAL"
);
export const hideModalRequestService = createAction(
  "HIDE_REQUEST_SERVICE_MODAL"
);

export const showModalRequestServiceDetail = createAction(
  "SHOW_REQUEST_SERVICE_DETAIL_MODAL"
);
export const hideModalRequestServiceDetail = createAction(
  "HIDE_REQUEST_SERVICE_DETAIL_MODAL"
);

export const showModalTurnDown = createAction("SHOW_TURN_DOWN_MODAL");
export const hideModalTurnDown = createAction("HIDE_TURN_DOWN_MODAL");

export const showModalRequestServiceManage = createAction(
  "SHOW_REQUEST_SERVICE_MANAGE_MODAL"
);
export const hideModalRequestServiceManage = createAction(
  "HIDE_REQUEST_SERVICE_MANAGE_MODAL"
);
export const showModalTurnDownManage = createAction(
  "SHOW_TURN_DOWN_MANAGE_MODAL"
);
export const hideModalTurnDownManage = createAction(
  "HIDE_TURN_DOWN_MANAGE_MODAL"
);
