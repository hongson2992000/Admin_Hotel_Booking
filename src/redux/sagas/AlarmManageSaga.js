import * as actions from "./../actions/AlarmManageAction";
import {
  DISPLAY_LOADING,
  DISPLAY_POPUP_SUCCESS,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { alarmManage } from "../../services/AlarmManage";
import { bookingManage } from "../../services/BookingManage";
import { showModalError } from "../actions/ModalAction";
function* getAllRoomAlarm(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    let listRoom = yield call(() => {
      return alarmManage.getAllRoomNotEmpty();
    });
    if (listRoom.status === STATUS_CODE.SUCCESS) {
      let arrRoom = [];
      for (let i = 0; i < listRoom.data.length; i++) {
        if (listRoom.data[i].status === true) {
          let booking = yield call(() => {
            return bookingManage.getBookingByRoomId(listRoom.data[i].id);
          });
          console.log(booking)
          if (booking.status === STATUS_CODE.SUCCESS) {
            let alarm = yield call(()=>{
                return alarmManage.getRoomAlarmByBookingId(booking.data.id)
            })
            let newRoom = {};
            newRoom = {
              room: listRoom.data[i],
              booking: booking,
              alarm:alarm
            };
            arrRoom.push(newRoom);
          }
        } else {
          let newRoom = {};
          newRoom = {
            room: listRoom.data[i],
            booking: {},
            alarm:{}
          };
          arrRoom.push(newRoom);
        }
      }
      yield put(actions.getAllRoomAlarm.getAllRoomAlarmSuccess(arrRoom));
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getAllRoomAlarm.getAllRoomAlarmFailure(error));
  }
}
export function* followActionGetAllRoomAlarm() {
  yield takeLatest(
    actions.getAllRoomAlarm.getAllRoomAlarmRequest,
    getAllRoomAlarm
  );
}
function* createNewAlarm(action) {
    try {
      yield put({
        type: DISPLAY_LOADING,
      });
      // yield delay(1000);
      let alarm = yield call(() => {
        return alarmManage.createNewAlarm(action.payload);
      });
      if (alarm.status === STATUS_CODE.SUCCESS) {
        yield put(actions.createNewAlarm.createNewAlarmSuccess(alarm));
        let listRoom = yield call(() => {
            return alarmManage.getAllRoomNotEmpty();
          });
          if (listRoom.status === STATUS_CODE.SUCCESS) {
            let arrRoom = [];
            for (let i = 0; i < listRoom.data.length; i++) {
              if (listRoom.data[i].status === true) {
                let booking = yield call(() => {
                  return bookingManage.getBookingByRoomId(listRoom.data[i].id);
                });
                console.log(booking)
                if (booking.status === STATUS_CODE.SUCCESS) {
                  let alarm = yield call(()=>{
                      return alarmManage.getRoomAlarmByBookingId(booking.data.id)
                  })
                  let newRoom = {};
                  newRoom = {
                    room: listRoom.data[i],
                    booking: booking,
                    alarm:alarm
                  };
                  arrRoom.push(newRoom);
                }
              } else {
                let newRoom = {};
                newRoom = {
                  room: listRoom.data[i],
                  booking: {},
                  alarm:{}
                };
                arrRoom.push(newRoom);
              }
            }
            yield put(actions.getAllRoomAlarm.getAllRoomAlarmSuccess(arrRoom));
          }
      }
      yield put({
        type: HIDE_LOADING,
      });
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    } catch (error) {
      yield put(actions.createNewAlarm.createNewAlarmFailure(error));
      yield put({
        type: HIDE_LOADING,
      });
      yield put(showModalError())
    }
  }
  export function* followActionCreateNewAlarm() {
    yield takeLatest(
      actions.createNewAlarm.createNewAlarmRequest,
      createNewAlarm
    );
  }
  function* updateAlarm(action) {
    try {
      yield put({
        type: DISPLAY_LOADING,
      });
      // yield delay(1000);
      let alarm = yield call(() => {
        return alarmManage.updateAlarm(action.payload);
      });
      if (alarm.status === STATUS_CODE.SUCCESS) {
        yield put(actions.updateAlarm.updateAlarmSuccess(alarm));
        // let listRoom = yield call(() => {
        //     return alarmManage.getAllRoomNotEmpty();
        //   });
        //   if (listRoom.status === STATUS_CODE.SUCCESS) {
        //     let arrRoom = [];
        //     for (let i = 0; i < listRoom.data.length; i++) {
        //       if (listRoom.data[i].status === true) {
        //         let booking = yield call(() => {
        //           return bookingManage.getBookingByRoomId(listRoom.data[i].id);
        //         });
        //         console.log(booking)
        //         if (booking.status === STATUS_CODE.SUCCESS) {
        //           let alarm = yield call(()=>{
        //               return alarmManage.getRoomAlarmByBookingId(booking.data.id)
        //           })
        //           let newRoom = {};
        //           newRoom = {
        //             room: listRoom.data[i],
        //             booking: booking,
        //             alarm:alarm
        //           };
        //           arrRoom.push(newRoom);
        //         }
        //       } else {
        //         let newRoom = {};
        //         newRoom = {
        //           room: listRoom.data[i],
        //           booking: {},
        //           alarm:{}
        //         };
        //         arrRoom.push(newRoom);
        //       }
        //     }
        //     yield put(actions.getAllRoomAlarm.getAllRoomAlarmSuccess(arrRoom));
        //   }
      }
      yield put({
        type: HIDE_LOADING,
      });
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    } catch (error) {
      yield put(actions.updateAlarm.updateAlarmFailure(error));
      yield put({
        type: HIDE_LOADING,
      });
      yield put(showModalError())
    }
  }
  export function* followActionUpdateAlarm() {
    yield takeLatest(
      actions.updateAlarm.updateAlarmRequest,
      updateAlarm
    );
  }
  function* deleteAlarm(action) {
    try {
      yield put({
        type: DISPLAY_LOADING,
      });
      // yield delay(1000);
      let alarm = yield call(() => {
        return alarmManage.deleteAlarm(action.payload.id);
      });
      if (alarm.status === STATUS_CODE.SUCCESS) {
        yield put(actions.deleteAlarm.deleteAlarmSuccess(alarm));
        let listRoom = yield call(() => {
            return alarmManage.getAllRoomNotEmpty();
          });
          if (listRoom.status === STATUS_CODE.SUCCESS) {
            let arrRoom = [];
            for (let i = 0; i < listRoom.data.length; i++) {
              if (listRoom.data[i].status === true) {
                let booking = yield call(() => {
                  return bookingManage.getBookingByRoomId(listRoom.data[i].id);
                });
                console.log(booking)
                if (booking.status === STATUS_CODE.SUCCESS) {
                  let alarm = yield call(()=>{
                      return alarmManage.getRoomAlarmByBookingId(booking.data.id)
                  })
                  let newRoom = {};
                  newRoom = {
                    room: listRoom.data[i],
                    booking: booking,
                    alarm:alarm
                  };
                  arrRoom.push(newRoom);
                }
              } else {
                let newRoom = {};
                newRoom = {
                  room: listRoom.data[i],
                  booking: {},
                  alarm:{}
                };
                arrRoom.push(newRoom);
              }
            }
            yield put(actions.getAllRoomAlarm.getAllRoomAlarmSuccess(arrRoom));
          }
      }
      yield put({
        type: HIDE_LOADING,
      });
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    } catch (error) {
      yield put(actions.deleteAlarm.deleteAlarmFailure(error));
      yield put({
        type: HIDE_LOADING,
      });
      yield put(showModalError())
    }
  }
  export function* followActionDeleteAlarm() {
    yield takeLatest(
      actions.deleteAlarm.deleteAlarmRequest,
      deleteAlarm
    );
  }