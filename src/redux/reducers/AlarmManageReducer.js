import {
  getType,
  getAllRoomAlarm,
  fillInFoAlarm,
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
