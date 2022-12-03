import * as actions from "./../actions/RoomManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { roomManage } from "../../services/RoomManage";
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
      let booking = yield call(() => {
        return roomManage.getBookingCheckInByRoomId();
      });
      console.log(booking.data)
      if(booking.data.length !== 0){
        for (let i = 0; i < listRoom.data.length; i++) {
          let newRoom;
          for (let j = 0; j < booking?.data.length; j++) {
            if (listRoom.data[i].id === booking?.data[j].room.id) {
              newRoom = {
                room: listRoom.data[i],
                booking: booking?.data[j],
              };
              break;
            } else {
              newRoom = {
                room: listRoom.data[i],
                booking: null,
              };
            }
          }
          arrRoom.push(newRoom)
        }
      }else{
        for (let i = 0; i < listRoom.data.length; i++){
          let newRoom = {}
          newRoom = {
            room: listRoom.data[i],
            booking: null,
          }
          arrRoom.push(newRoom)
        }
      }

      yield put(actions.getAllRoom.getAllRoomSuccess(arrRoom));
    }
    yield put({
      type: HIDE_LOADING,
    });
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
