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

export const showModalUpdateUser = createAction("SHOW_UPDATE_USER_MODAL");
export const hideModalUpdateUser = createAction("HIDE_UPDATE_USER_MODAL");

export const showModalSuccess = createAction("SHOW_SUCCESS_MODAL");
export const hideModalSuccess = createAction("HIDE_SUCCESS_MODAL");

export const showModalError = createAction("SHOW_ERROR_MODAL");
export const hideModalError = createAction("HIDE_ERROR_MODAL");

export const showCreateAccountModel = createAction("SHOW_CREATE_ACCOUNT_MODEL");
export const hideCreateAccountModel = createAction("HIDE_CREATE_ACCOUNT_MODAL");

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
//TURNDOWN ROLE MANAGE
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
//MODAL NEWS MANAGE
export const showModalAddNews = createAction("SHOW_ADD_NEWS_MODAL");
export const hideModalAddNews = createAction("HIDE_ADD_NEWS_MODAL");

export const showModalUpdateNews = createAction("SHOW_UPDATE_NEWS_MODAL");
export const hideModalUpdateNews = createAction("HIDE_UPDATE_NEWS_MODAL");

//MODAL PROFILE
export const showModalProfile = createAction("SHOW_PROFILE_MODAL");
export const hideModalProfile = createAction("HIDE_PROFILE_MODAL");

//MODAL CHECKOUT ERRR

export const showModalCheckOutError = createAction("SHOW_MODAL_CHECKOUT");
export const hideModalCheckOutError = createAction("HIDE_MODAL_CHECKOUT");

//MODAL CHECKOUT SERVICE
export const showModalCheckOutService = createAction("SHOW_MODAL_CHECKOUT_SERVICE");
export const hideModalCheckOutService = createAction("HIDE_MODAL_CHECKOUT_SERVICE");

//MODAL SET UP ROOM
export const showModalAddNewRoom = createAction("SHOW_MODAL_ADD_ROOM");
export const hideModalAddNewRoom = createAction("HIDE_MODAL_ADD_ROOM");


export const showModalUpdateRoom = createAction("SHOW_MODAL_UPDATE_ROOM");
export const hideModalUpdateRoom = createAction("HIDE_MODAL_UPDATE_ROOM");

//MODAL Update Room Type

export const showModalUpdateRoomType = createAction("SHOW_MODAL_UPDATE_ROOMTYPE");
export const hideModalUpdateRoomType = createAction("HIDE_MODAL_UPDATE_ROOMTYPE");