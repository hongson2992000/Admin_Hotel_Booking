import * as actions from "./../actions/BookingManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { bookingManage } from "../../services/BookingManage";

function* getAllBooking(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(1000);
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
    console.log(error)
    yield put(actions.getAllBooking.getAllBookingFailure(error));
  }
}
export function* followActionGetAllBooing() {
  yield takeLatest(actions.getAllBooking.getAllBookingRequest, getAllBooking);
}
