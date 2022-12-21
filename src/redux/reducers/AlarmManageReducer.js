import {
  getType,
  getAllRoomAlarm,
  fillInFoAlarm,
  updateAlarm,
} from "../actions/AlarmManageAction";

const initialState = {
  arrRoomAlarm: [],
  alarmItem: {},
};
export default function AlarmManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAllRoomAlarm.getAllRoomAlarmRequest):
      return {
        ...state,
      };
    case getType(getAllRoomAlarm.getAllRoomAlarmSuccess):
      return {
        ...state,
        arrRoomAlarm: action.payload,
      };

    case getType(getAllRoomAlarm.getAllRoomAlarmFailure):
      return {
        ...state,
      };
    case getType(updateAlarm.updateAlarmSuccess):
      let arrUpdateAlarm = [...state.arrRoomAlarm];
      let indexUpdate;
      let arrRoomNotEmpty = arrUpdateAlarm.filter(
        (item) => item.room.status === true
      );
      arrRoomNotEmpty.forEach((item, i) => {
        indexUpdate = item.alarm.data?.findIndex(
          (itemA) => itemA.id === action.payload.id
        );
        if (indexUpdate !== -1) {
          item.alarm.data[indexUpdate] = action.payload;
        }
      });
      state.arrRoomAlarm = arrUpdateAlarm;
      return {
        ...state,
        arrRoomAlarm: action.payload,
      };

    case getType(getAllRoomAlarm.getAllRoomAlarmFailure):
      return {
        ...state,
      };
    case getType(fillInFoAlarm.fillInFoAlarmRequest):
      let alarm = {};
      alarm = action.payload;
      state.alarmItem = alarm;
      return {
        ...state,
      };
    default:
      return state;
  }
}
