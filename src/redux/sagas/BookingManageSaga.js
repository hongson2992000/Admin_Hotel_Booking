import * as actions from "./../actions/BookingManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  DISPLAY_POPUP_SUCCESS,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { bookingManage } from "../../services/BookingManage";
import { customerManage } from "../../services/CustomerManage";
import { roomManage } from "../../services/RoomManage";
function* getAllBooking(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listBooking = yield call(() => {
      return bookingManage.getAllBooking();
    });
    console.log(listBooking.data);
    if (listBooking.status === STATUS_CODE.SUCCESS) {
      yield put(actions.getAllBooking.getAllBookingSuccess(listBooking.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    console.log(error);
    yield put(actions.getAllBooking.getAllBookingFailure(error));
  }
}
export function* followActionGetAllBooing() {
  yield takeLatest(actions.getAllBooking.getAllBookingRequest, getAllBooking);
}
function* checkInRoom(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listBooking = yield call(() => {
      return bookingManage.checkInRoom(action.payload.newInfoCheckInWithUser);
    });
    console.log(listBooking.data);
    if (listBooking.status === STATUS_CODE.SUCCESS) {
      yield put(actions.checkInRoom.checkInRoomSuccess(listBooking.data));
      let list = yield call(() => {
        return bookingManage.getAllBooking();
      });
      if (list.status === STATUS_CODE.SUCCESS) {
        yield put(actions.getAllBooking.getAllBookingSuccess(list.data));
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    action.payload.navigate("/listBooking");
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put(actions.checkInRoom.checkInRoomFailure(error));
  }
}
export function* followActionCheckIn() {
  yield takeLatest(actions.checkInRoom.checkInRoomRequest, checkInRoom);
}
function* checkOutRoom(action) {
  try {
    console.log("ActionCheckIn", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let formData = new FormData();
    formData.append("booking_id", action.payload.id);
    let listBooking = yield call(() => {
      return bookingManage.checkOutRoom(formData);
    });
    console.log(listBooking.data);
    if (listBooking.status === STATUS_CODE.SUCCESS) {
      yield put(actions.checkOutRoom.checkOutRoomSuccess(listBooking.data));
      let list = yield call(() => {
        return bookingManage.getAllBooking();
      });
      if (list.status === STATUS_CODE.SUCCESS) {
        yield put(actions.getAllBooking.getAllBookingSuccess(list.data));
      }
    }
    yield put({
      type: HIDE_LOADING,
    });
    action.payload.navigate("/listBooking");
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    if (error.response.status === 400) {
      yield put(
        actions.checkOutRoom.checkOutRoomFailure(error.response.data.message)
      );
    }
  }
}
export function* followActionCheckOut() {
  yield takeLatest(actions.checkOutRoom.checkOutRoomRequest, checkOutRoom);
}

function* getDashBoard(action) {
  try {
    console.log("DashBoard", action);

    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);

    let listBooking = yield call(() => {
      return bookingManage.getDashBoard(action.payload);
    });
    console.log(listBooking.data);
    if (listBooking.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getDashBoardOverview.getDashBoardOverviewSuccess(
          listBooking.data
        )
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    // yield put({
    //   type: DISPLAY_POPUP_SUCCESS,
    // });
  } catch (error) {
    yield put(actions.getDashBoardOverview.getDashBoardOverviewFailure(error));
  }
}
export function* followActionGetDashBoard() {
  yield takeLatest(
    actions.getDashBoardOverview.getDashBoardOverviewRequest,
    getDashBoard
  );
}
function* getBookingByRoomId(action) {
  console.log(action);
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    let bookingItem = yield call(() => {
      return bookingManage.getBookingByRoomId(action.payload.room_id);
    });
    if (bookingItem.status === STATUS_CODE.SUCCESS) {
      let primaryCustomer = yield call(() => {
        return customerManage.getPrimaryCustomerByBookingId(
          bookingItem.data.id
        );
      });
      let listCustomer = yield call(() => {
        return customerManage.getAllCustomerByBookingId(bookingItem.data.id);
      });
      // let room = yield call(()=>{
      //   return roomManage.getRoomById(bookingItem.data.)
      // })

      let infoCustomer = {
        booking: bookingItem.data,
        primaryCustomer: primaryCustomer.data,
        listCustomer: listCustomer.data,
      };
      yield put(
        actions.getBookingByRoomId.getBookingByRoomIdSuccess(infoCustomer)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    console.log(error);
    yield put(actions.getBookingByRoomId.getBookingByRoomIdFailure(error));
  }
}
export function* followActionGetBookingByRoomId() {
  yield takeLatest(
    actions.getBookingByRoomId.getBookingByRoomIdRequest,
    getBookingByRoomId
  );
}
