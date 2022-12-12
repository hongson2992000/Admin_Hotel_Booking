import * as actions from "./../actions/RoomManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { roomManage } from "../../services/RoomManage";
import { bookingManage } from "../../services/BookingManage";
function* getAllRoom(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listRoom = yield call(() => {
      return roomManage.getAllRoom();
    });
    if (listRoom.status === STATUS_CODE.SUCCESS) {
      let arrRoom = [];
      for (let i = 0; i < listRoom.data.length; i++) {
        if (listRoom.data[i].status === true) {
          let booking = yield call(() => {
            return bookingManage.getBookingByRoomId(listRoom.data[i].id);
          });
          if (booking.status === STATUS_CODE.SUCCESS) {
            let newRoom = {};
            newRoom = {
              room: listRoom.data[i],
              booking: booking,
            };
            arrRoom.push(newRoom);
          }
        } else {
          let newRoom = {};
          newRoom = {
            room: listRoom.data[i],
            booking: {},
          };
          arrRoom.push(newRoom);
        }
      }
      yield put(actions.getAllRoom.getAllRoomSuccess(arrRoom));
      yield put({
        type: HIDE_LOADING,
      });
    }

    // navigate("/location")
  } catch (error) {
    yield put(actions.getAllRoom.getAllRoomFailure(error));
  }
}
export function* followActionGetAllRoom() {
  yield takeLatest(actions.getAllRoom.getAllRoomRequest, getAllRoom);
}

function* getRoomAvailability(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let formData = new FormData();
    formData.append("booking_id", action.payload.booking_id);
    let roomValid = yield call(() => {
      return roomManage.getRoomAvailability(formData);
    });
    if (roomValid.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getRoomAvailability.getRoomAvailabilitySuccess(roomValid.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(actions.getRoomAvailability.getRoomAvailabilityFailure(error));
  }
}
export function* followActionGetRoomAvailability() {
  yield takeLatest(
    actions.getRoomAvailability.getRoomAvailabilityRequest,
    getRoomAvailability
  );
}
function* getRoomTypeById(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let roomType = yield call(() => {
      return roomManage.getRoomTypeById(action.payload.roomTypeId);
    });
    if (roomType.status === STATUS_CODE.SUCCESS) {
      yield put(actions.getRoomTypeById.getRoomTypeByIdSuccess(roomType.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(actions.getRoomTypeById.getRoomTypeByIdFailure(error));
  }
}
export function* followActionGetRoomTypeById() {
  yield takeLatest(
    actions.getRoomTypeById.getRoomTypeByIdRequest,
    getRoomTypeById
  );
}

function* getRoomTypeByRoomId(action) {
  try {
    console.log("Action", action);
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let roomType = yield call(() => {
      return roomManage.getRoomTypeByRoomId(action.payload.roomId);
    });
    if (roomType.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getRoomTypeByRoomId.getRoomTypeByRoomIdSuccess(roomType.data)
      );
      action.payload.navigate(
        `/roomManage/createNewRoom/${action.payload.roomNo}`
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getRoomTypeByRoomId.getRoomTypeByRoomIdFailure(error));
  }
}
export function* followActionGetRoomTypeByRoomId() {
  yield takeLatest(
    actions.getRoomTypeByRoomId.getRoomTypeByRoomIdRequest,
    getRoomTypeByRoomId
  );
}
