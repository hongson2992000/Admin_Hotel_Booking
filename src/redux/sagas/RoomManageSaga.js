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
    console.log("Action",action)
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(1000);
    let listRoom = yield call(() => {
      return roomManage.getAllHotelService();
    });
    console.log(listRoom.data);
    if (listRoom.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getAllRoom.getAllRoomSuccess(listRoom.data)
      );
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
    yield takeLatest(
      actions.getAllRoom.getAllRoomRequest,
      getAllRoom
    );
  }