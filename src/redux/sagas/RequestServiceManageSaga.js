import * as actions from "./../actions/RequestServiceManageAction";
import * as actionSendMessage from "./../actions/SendMessageAction";
import {
  DISPLAY_LOADING,
  DISPLAY_POPUP_SUCCESS,
  HIDE_LOADING,
  STATUS_CODE,
  DONE,
  BOOKED,
  PROCESSING,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { requestServiceManage } from "../../services/RequestServiceManage";
import { sendMessageService } from "../../services/SendMessageService";
import {
  showModalListService,
  showModalRequestService,
  showModalCheckOutService,
} from "../actions/ModalAction";
import * as actionModal from "../actions/ModalAction";
import { roomManage } from "../../services/RoomManage";
import { customerManage } from "../../services/CustomerManage";
function* getAllRequestService(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    let listService = yield call(() => {
      return requestServiceManage.getAllRequestService();
    });
    if (listService.status === STATUS_CODE.SUCCESS) {
      let arrRequestService = [];
      for (let i = 0; i < listService.data.length; i++) {
        let room = yield call(() => {
          return roomManage.getRoomByOrderId(listService.data[i].id);
        });
        if (room.status === STATUS_CODE.SUCCESS) {
          let newRoom = {};
          newRoom = {
            orders: listService.data[i],
            room: room,
          };
          arrRequestService.push(newRoom);
        }
      }
      yield put(
        actions.getRequestService.getRequestServiceSuccess(arrRequestService)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(actions.getRequestService.getRequestServiceFailure(error));
  }
}

export function* followActionGetAllRequestService() {
  yield takeLatest(
    actions.getRequestService.getRequestServiceRequest,
    getAllRequestService
  );
}
function* confirmRequestService(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let formData = new FormData();
    formData.append("orderId", action.payload.orderId);
    formData.append("status", action.payload.status);
    let service = yield call(() => {
      return requestServiceManage.confirmRequestService(formData);
    });
    if (service.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.confirmRequestService.confirmRequestServiceSuccess(service.data)
      );
      let listService = yield call(() => {
        return requestServiceManage.getAllRequestService();
      });
      if (listService.status === STATUS_CODE.SUCCESS) {
        let arrRequestService = [];
        for (let i = 0; i < listService.data.length; i++) {
          let room = yield call(() => {
            return roomManage.getRoomByOrderId(listService.data[i].id);
          });
          if (room.status === STATUS_CODE.SUCCESS) {
            let newRoom = {};
            newRoom = {
              orders: listService.data[i],
              room: room,
            };
            arrRequestService.push(newRoom);
          }
        }
        yield put(
          actions.getRequestService.getRequestServiceSuccess(arrRequestService)
        );
        let requestServiceItem = arrRequestService.find(
          (item) => item.orders.id === service.data.id
        );
        yield put(
          actions.confirmRequestService.confirmRequestServiceSuccess(
            requestServiceItem
          )
        );
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({ type: DISPLAY_POPUP_SUCCESS });
    yield put(showModalListService());
  } catch (error) {
    yield put(
      actions.confirmRequestService.confirmRequestServiceFailure(error)
    );
  }
}

export function* followActionConfirmRequestService() {
  yield takeLatest(
    actions.confirmRequestService.confirmRequestServiceRequest,
    confirmRequestService
  );
}
function* cancelRequestService(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let formData = new FormData();
    formData.append("orderDetailId", action.payload.orderDetailId.id);
    formData.append("orderId", action.payload.orderId);
    let service = yield call(() => {
      return requestServiceManage.cancelRequestService(formData);
    });
    console.log(service.data);
    if (service.status === STATUS_CODE.SUCCESS) {
      let listService = yield call(() => {
        return requestServiceManage.getAllRequestService();
      });
      if (listService.status === STATUS_CODE.SUCCESS) {
        let arrRequestService = [];
        for (let i = 0; i < listService.data.length; i++) {
          let room = yield call(() => {
            return roomManage.getRoomByOrderId(listService.data[i].id);
          });
          if (room.status === STATUS_CODE.SUCCESS) {
            let newRoom = {};
            newRoom = {
              orders: listService.data[i],
              room: room,
            };
            arrRequestService.push(newRoom);
          }
        }
        yield put(
          actions.getRequestService.getRequestServiceSuccess(arrRequestService)
        );
        // let requestService = arrRequestService.find(
        //   (item) => item.orders.id === service.data.id
        // );
        // yield put(
        //   actions.cancelRequestServiceDetailById.cancelRequestServiceDetailByIdSuccess(
        //     requestService
        //   )
        // );
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({ type: DISPLAY_POPUP_SUCCESS });
    yield put(showModalListService());
  } catch (error) {
    yield put(
      actions.cancelRequestServiceDetailById.cancelRequestServiceDetailByIdFailure(
        error
      )
    );
  }
}

export function* followActionCancelRequestService() {
  yield takeLatest(
    actions.cancelRequestServiceDetailById
      .cancelRequestServiceDetailByIdRequest,
    cancelRequestService
  );
}
function* getRequestServiceByBookingId(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    let listService = yield call(() => {
      return requestServiceManage.getRequestServiceByBookingId(
        action.payload.booking_id
      );
    });
    let primaryCustomer = yield call(() => {
      return customerManage.getPrimaryCustomerByBookingId(
        action.payload.booking_id
      );
    });
    if (
      listService.status === STATUS_CODE.SUCCESS &&
      primaryCustomer.status === STATUS_CODE.SUCCESS
    ) {
      let requestServiceInRoom = {};
      requestServiceInRoom = {
        requestService: listService.data,
        primaryCustomer: primaryCustomer.data,
      };
      yield put(
        actions.getRequestServiceByBookingId.getRequestServiceByBookingIdSuccess(
          requestServiceInRoom
        )
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalRequestServiceManage());
  } catch (error) {
    yield put(
      actions.getRequestServiceByBookingId.getRequestServiceByBookingIdFailure(
        error
      )
    );
  }
}

export function* followActionGetRequestServiceByBookingId() {
  yield takeLatest(
    actions.getRequestServiceByBookingId.getRequestServiceByBookingIdRequest,
    getRequestServiceByBookingId
  );
}
function* getAllTurnDownService(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let listService = yield call(() => {
      return requestServiceManage.getAllTurnDownService();
    });
    console.log(listService.data);
    if (listService.status === STATUS_CODE.SUCCESS) {
      let arrRequestService = [];
      for (let i = 0; i < listService.data.length; i++) {
        let room = yield call(() => {
          return roomManage.getRoomByBookingId(listService.data[i].booking.id);
        });
        let primaryCustomer = yield call(() => {
          return customerManage.getPrimaryCustomerByBookingId(
            listService.data[i].booking.id
          );
        });
        if (
          room.status === STATUS_CODE.SUCCESS &&
          primaryCustomer.status === STATUS_CODE.SUCCESS
        ) {
          let newRoom = {};
          newRoom = {
            orders: listService.data[i],
            room: room,
            primaryCustomer: primaryCustomer,
          };
          arrRequestService.push(newRoom);
        }
      }
      yield put(
        actions.getTurnDownService.getTurnDownServiceSuccess(arrRequestService)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });

    // navigate("/location")
  } catch (error) {
    yield put(actions.getTurnDownService.getTurnDownServiceFailure(error));
  }
}

export function* followActionGetAllTurnDownService() {
  yield takeLatest(
    actions.getTurnDownService.getTurnDownServiceRequest,
    getAllTurnDownService
  );
}
function* confirmTurnDownService(action) {
  try {
    console.log("Action", action);
    const d = new Date();
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    yield put({
      type: DISPLAY_LOADING,
    });
    let listService = yield call(() => {
      return requestServiceManage.confirmTurnDownService(action.payload);
    });
    console.log(listService.data);
    if (listService.status === STATUS_CODE.SUCCESS) {
      if (action.payload.status === DONE) {
        let listMessage = yield call(() => {
          return sendMessageService.sendMessage({
            booking_Id: action.payload.booking_Id,
            id: 0,
            messageContent: `Phòng của quý khách đã được dọn dẹp vào ${time} ! Cảm ơn quý khách đã sử dụng dịch vụ`,
          });
        });
        if (listMessage.status === STATUS_CODE.SUCCESS) {
          yield put(
            actionSendMessage.sendMessage.sendMessageSuccess(
              listMessage.formData
            )
          );
        }
      }
      let listTurnDown = yield call(() => {
        return requestServiceManage.getAllTurnDownService();
      });
      if (listTurnDown.status === STATUS_CODE.SUCCESS) {
        let arrRequestService = [];
        for (let i = 0; i < listTurnDown.data.length; i++) {
          console.log("TURNDOWN");
          let room = yield call(() => {
            return roomManage.getRoomByBookingId(
              listTurnDown.data[i].booking.id
            );
          });
          let primaryCustomer = yield call(() => {
            return customerManage.getPrimaryCustomerByBookingId(
              listTurnDown.data[i].booking.id
            );
          });
          if (
            room.status === STATUS_CODE.SUCCESS &&
            primaryCustomer.status === STATUS_CODE.SUCCESS
          ) {
            let newRoom = {};
            newRoom = {
              orders: listTurnDown.data[i],
              room: room,
              primaryCustomer: primaryCustomer,
            };
            arrRequestService.push(newRoom);
          }
        }
        yield put(
          actions.getTurnDownService.getTurnDownServiceSuccess(
            arrRequestService
          )
        );
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
    // navigate("/location")
  } catch (error) {
    yield put(
      actions.confirmTurnDownService.confirmTurnDownServiceFailure(error)
    );
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalError());
  }
}

export function* followActionConfirmTurnDownService() {
  yield takeLatest(
    actions.confirmTurnDownService.confirmTurnDownServiceRequest,
    confirmTurnDownService
  );
}
function* confirmRequestServiceInRoom(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let formData = new FormData();
    formData.append("orderId", action.payload.orderId);
    formData.append("status", action.payload.status);
    let service = yield call(() => {
      return requestServiceManage.confirmRequestService(formData);
    });
    console.log(service.data);
    if (service.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.confirmRequestServiceInRoom.confirmRequestServiceInRoomSuccess(
          service.data
        )
      );
      let listService = yield call(() => {
        return requestServiceManage.getRequestServiceByBookingId(
          action.payload.booking_id
        );
      });
      let primaryCustomer = yield call(() => {
        return customerManage.getPrimaryCustomerByBookingId(
          action.payload.booking_id
        );
      });
      if (
        listService.status === STATUS_CODE.SUCCESS &&
        primaryCustomer.status === STATUS_CODE.SUCCESS
      ) {
        let requestServiceInRoom = {};
        requestServiceInRoom = {
          requestService: listService.data,
          primaryCustomer: primaryCustomer.data,
        };
        yield put(
          actions.getRequestServiceByBookingId.getRequestServiceByBookingIdSuccess(
            requestServiceInRoom
          )
        );
        yield put(
          actions.confirmRequestServiceInRoom.confirmRequestServiceInRoomSuccess(
            requestServiceInRoom
          )
        );
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({ type: DISPLAY_POPUP_SUCCESS });
    yield put(showModalRequestService());
  } catch (error) {
    yield put(
      actions.confirmRequestServiceInRoom.confirmRequestServiceInRoomFailure(
        error
      )
    );
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalError());
  }
}

export function* followActionConfirmRequestServiceInRoom() {
  yield takeLatest(
    actions.confirmRequestServiceInRoom.confirmRequestServiceInRoomRequest,
    confirmRequestServiceInRoom
  );
}
function* getTurnDownByBookingId(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let turnDownService = yield call(() => {
      return requestServiceManage.getTurnDownServiceByBookingId(
        action.payload.booking_id
      );
    });
    let primaryCustomer = yield call(() => {
      return customerManage.getPrimaryCustomerByBookingId(
        action.payload.booking_id
      );
    });
    if (
      turnDownService.status === STATUS_CODE.SUCCESS &&
      primaryCustomer.status === STATUS_CODE.SUCCESS
    ) {
      let turnDownServiceInRoom = {};
      turnDownServiceInRoom = {
        turnDownService: turnDownService.data,
        primaryCustomer: primaryCustomer.data,
      };
      yield put(
        actions.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdSuccess(
          turnDownServiceInRoom
        )
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalTurnDownManage());
  } catch (error) {
    yield put(
      actions.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdFailure(
        error
      )
    );
  }
}

export function* followActionGetTurnDownByBookingId() {
  yield takeLatest(
    actions.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdRequest,
    getTurnDownByBookingId
  );
}
function* confirmRequestServiceByManage(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let formData = new FormData();
    formData.append("orderId", action.payload.orderId);
    formData.append("status", action.payload.status);
    let service = yield call(() => {
      return requestServiceManage.confirmRequestService(formData);
    });
    console.log(service.data);
    if (service.status === STATUS_CODE.SUCCESS) {
      let listService = yield call(() => {
        return requestServiceManage.getRequestServiceByBookingId(
          action.payload.bookingId
        );
      });
      let primaryCustomer = yield call(() => {
        return customerManage.getPrimaryCustomerByBookingId(
          action.payload.bookingId
        );
      });
      if (
        listService.status === STATUS_CODE.SUCCESS &&
        primaryCustomer.status === STATUS_CODE.SUCCESS
      ) {
        let requestServiceInRoom = {};
        requestServiceInRoom = {
          requestService: listService.data,
          primaryCustomer: primaryCustomer.data,
        };
        yield put(
          actions.getRequestServiceByBookingId.getRequestServiceByBookingIdSuccess(
            requestServiceInRoom
          )
        );
        yield put(
          actions.confirmRequestServiceByManager.confirmRequestServiceByManagerSuccess(
            requestServiceInRoom
          )
        );
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalRequestServiceManage());
    yield put({ type: DISPLAY_POPUP_SUCCESS });
  } catch (error) {
    yield put(
      actions.confirmRequestServiceByManager.confirmRequestServiceByManagerFailure(
        error
      )
    );
  }
}

export function* followActionConfirmRequestServiceByManage() {
  yield takeLatest(
    actions.confirmRequestServiceByManager
      .confirmRequestServiceByManagerRequest,
    confirmRequestServiceByManage
  );
}
function* getRequestServiceByBookingIdStaff(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let listService = yield call(() => {
      return requestServiceManage.getRequestServiceByBookingId(
        action.payload.booking_id
      );
    });
    let primaryCustomer = yield call(() => {
      return customerManage.getPrimaryCustomerByBookingId(
        action.payload.booking_id
      );
    });
    if (
      listService.status === STATUS_CODE.SUCCESS &&
      primaryCustomer.status === STATUS_CODE.SUCCESS
    ) {
      let requestServiceInRoom = {};
      requestServiceInRoom = {
        requestService: listService.data,
        primaryCustomer: primaryCustomer.data,
      };
      yield put(
        actions.getRequestServiceByBookingId.getRequestServiceByBookingIdSuccess(
          requestServiceInRoom
        )
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalRequestService());
  } catch (error) {
    yield put(
      actions.getRequestServiceByBookingIdStaff.getRequestServiceByBookingIdStaffFailure(
        error
      )
    );
  }
}

export function* followActionGetRequestServiceByBookingIdStaff() {
  yield takeLatest(
    actions.getRequestServiceByBookingIdStaff
      .getRequestServiceByBookingIdStaffRequest,
    getRequestServiceByBookingIdStaff
  );
}

function* getTurnDownByBookingIdByStaff(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let turnDownService = yield call(() => {
      return requestServiceManage.getTurnDownServiceByBookingId(
        action.payload.booking_id
      );
    });
    let primaryCustomer = yield call(() => {
      return customerManage.getPrimaryCustomerByBookingId(
        action.payload.booking_id
      );
    });
    if (
      turnDownService.status === STATUS_CODE.SUCCESS &&
      primaryCustomer.status === STATUS_CODE.SUCCESS
    ) {
      let turnDownServiceInRoom = {};
      turnDownServiceInRoom = {
        turnDownService: turnDownService.data,
        primaryCustomer: primaryCustomer.data,
      };
      yield put(
        actions.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdSuccess(
          turnDownServiceInRoom
        )
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalTurnDown());
  } catch (error) {
    yield put(
      actions.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdFailure(
        error
      )
    );
  }
}

export function* followActionGetTurnDownByBookingIdByStaff() {
  yield takeLatest(
    actions.getTurnDownServiceByBookingIdByStaff
      .getTurnDownServiceByBookingIdByStaffRequest,
    getTurnDownByBookingIdByStaff
  );
}
function* confirmTurnDownServiceStaff(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    const d = new Date();
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let listService = yield call(() => {
      return requestServiceManage.confirmTurnDownService(action.payload.info);
    });
    console.log(listService.data);
    if (listService.status === STATUS_CODE.SUCCESS) {
      let turnDownService = yield call(() => {
        return requestServiceManage.getTurnDownServiceByBookingId(
          action.payload.bookingId
        );
      });
      let primaryCustomer = yield call(() => {
        return customerManage.getPrimaryCustomerByBookingId(
          action.payload.bookingId
        );
      });
      if (
        turnDownService.status === STATUS_CODE.SUCCESS &&
        primaryCustomer.status === STATUS_CODE.SUCCESS
      ) {
        let turnDownServiceInRoom = {};
        turnDownServiceInRoom = {
          turnDownService: turnDownService.data,
          primaryCustomer: primaryCustomer.data,
        };
        yield put(
          actions.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdSuccess(
            turnDownServiceInRoom
          )
        );
        // yield put(
        //   actions.confirmTurnDownService.confirmTurnDownServiceSuccess(
        //     listService.data
        //   )
        // );
      }
      if (action.payload.status === DONE) {
        let listMessage = yield call(() => {
          return sendMessageService.sendMessage({
            booking_Id: action.payload.booking_Id,
            id: 0,
            messageContent: `Phòng của quý khách đã được dọn dẹp vào ${time} ! Cảm ơn quý khách đã sử dụng dịch vụ`,
          });
        });
        if (listMessage.status === STATUS_CODE.SUCCESS) {
          yield put(
            actionSendMessage.sendMessage.sendMessageSuccess(
              listMessage.formData
            )
          );
        }
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalTurnDown())
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
    // navigate("/location")
  } catch (error) {
    yield put(
      actions.confirmTurnDownService.confirmTurnDownServiceFailure(error)
    );
  }
}

export function* followActionConfirmTurnDownServiceStaff() {
  yield takeLatest(
    actions.confirmTurnDownServiceStaff.confirmTurnDownServiceStaffRequest,
    confirmTurnDownServiceStaff
  );
}

function* confirmCheckOutService(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let listService = yield call(() => {
      return requestServiceManage.confirmTurnDownService(action.payload.info);
    });
    if (listService.status === STATUS_CODE.SUCCESS) {
      let listTurnDown = yield call(() => {
        return requestServiceManage.getAllTurnDownService();
      });
      if (listTurnDown.status === STATUS_CODE.SUCCESS) {
        let arrRequestService = [];
        for (let i = 0; i < listTurnDown.data.length; i++) {
          let room = yield call(() => {
            return roomManage.getRoomByBookingId(
              listTurnDown.data[i].booking.id
            );
          });
          let primaryCustomer = yield call(() => {
            return customerManage.getPrimaryCustomerByBookingId(
              listTurnDown.data[i].booking.id
            );
          });
          if (
            room.status === STATUS_CODE.SUCCESS &&
            primaryCustomer.status === STATUS_CODE.SUCCESS
          ) {
            let newRoom = {};
            newRoom = {
              orders: listTurnDown.data[i],
              room: room,
              primaryCustomer: primaryCustomer,
            };
            arrRequestService.push(newRoom);
          }
        }
        yield put(
          actions.getTurnDownService.getTurnDownServiceSuccess(
            arrRequestService
          )
        );
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
    yield put(showModalCheckOutService());
    // navigate("/location")
  } catch (error) {
    yield put(
      actions.confirmCheckOutService.confirmCheckOutServiceFailure(error)
    );
    yield put({
      type: HIDE_LOADING,
    });
    yield put(actionModal.showModalError());
  }
}

export function* followActionConfirmCheckOutService() {
  yield takeLatest(
    actions.confirmCheckOutService.confirmCheckOutServiceRequest,
    confirmCheckOutService
  );
}
function* cancelRequestServiceByStaff(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    let formData = new FormData();
    formData.append("orderDetailId", action.payload.orderDetailId.id);
    formData.append("orderId", action.payload.orderId);
    let service = yield call(() => {
      return requestServiceManage.cancelRequestService(formData);
    });
    console.log(service.data);
    if (service.status === STATUS_CODE.SUCCESS) {
      let listService = yield call(() => {
        return requestServiceManage.getRequestServiceByBookingId(
          action.payload.booking_id
        );
      });
      let primaryCustomer = yield call(() => {
        return customerManage.getPrimaryCustomerByBookingId(
          action.payload.booking_id
        );
      });
      if (
        listService.status === STATUS_CODE.SUCCESS &&
        primaryCustomer.status === STATUS_CODE.SUCCESS
      ) {
        let requestServiceInRoom = {};
        requestServiceInRoom = {
          requestService: listService.data,
          primaryCustomer: primaryCustomer.data,
        };
        yield put(
          actions.getRequestServiceByBookingId.getRequestServiceByBookingIdSuccess(
            requestServiceInRoom
          )
        );
        yield put(
          actions.confirmRequestServiceInRoom.confirmRequestServiceInRoomSuccess(
            requestServiceInRoom
          )
        );
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({ type: DISPLAY_POPUP_SUCCESS });
    yield put(showModalListService());
  } catch (error) {
    yield put(
      actions.cancelRequestServiceByStaff.cancelRequestServiceByStaffFailure(
        error
      )
    );
  }
}

export function* followActionCancelRequestServiceByStaff() {
  yield takeLatest(
    actions.cancelRequestServiceByStaff
      .cancelRequestServiceByStaffRequest,
      cancelRequestServiceByStaff
  );
}