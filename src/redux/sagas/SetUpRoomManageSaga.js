import * as actions from "./../actions/RoomManageAction";
import * as actionSetUpRoom from "./../actions/SetUpRoomManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { setUpRoomManage } from "../../services/SetpUpRoomManage";
import { roomManage } from "../../services/RoomManage";
function* getAllRoomToSetUp(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listRoom = yield call(() => {
      return setUpRoomManage.getAllRoom();
    });
    if (listRoom.status === STATUS_CODE.SUCCESS) {
      let arrRoom = [];
      for (let i = 0; i < listRoom.data.length; i++) {
        let roomType = yield call(() => {
          return roomManage.getRoomTypeByRoomId(listRoom.data[i].id);
        });
        if (roomType.status === STATUS_CODE.SUCCESS) {
          let newRoom = {};
          newRoom = {
            room: listRoom.data[i],
            roomType: roomType,
          };
          arrRoom.push(newRoom);
        }
      }
      yield put(
        actionSetUpRoom.getAllRoomToSetUp.getAllRoomToSetUpSuccess(arrRoom)
      );
      yield put({
        type: HIDE_LOADING,
      });
    }

    // navigate("/location")
  } catch (error) {
    yield put(
      actionSetUpRoom.getAllRoomToSetUp.getAllRoomToSetUpFailure(error)
    );
  }
}
export function* followActionGetAllRoomToSetUp() {
  yield takeLatest(
    actionSetUpRoom.getAllRoomToSetUp.getAllRoomToSetUpRequest,
    getAllRoomToSetUp
  );
}
//RoomType
function* getAllRoomTypeToSetUp(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listRoomType = yield call(() => {
      return setUpRoomManage.getAllRoomtype();
    });
    if (listRoomType.status === STATUS_CODE.SUCCESS) {
      yield put(
        actionSetUpRoom.getAllRoomTypeToSetUp.getAllRoomTypeToSetUpSuccess(
          listRoomType.data
        )
      );
      yield put({
        type: HIDE_LOADING,
      });
    }

    // navigate("/location")
  } catch (error) {
    yield put(
      actionSetUpRoom.getAllRoomTypeToSetUp.getAllRoomTypeToSetUpFailure(error)
    );
  }
}
export function* followActionGetAllRoomTypeToSetUp() {
  yield takeLatest(
    actionSetUpRoom.getAllRoomTypeToSetUp.getAllRoomTypeToSetUpRequest,
    getAllRoomTypeToSetUp
  );
}
