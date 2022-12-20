import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllRoomAlarm = createActions({
    getAllRoomAlarmRequest: undefined,
    getAllRoomAlarmSuccess: (payload) => payload,
    getAllRoomAlarmFailure: (err) => err,
});
export const createNewAlarm = createActions({
    createNewAlarmRequest: (payload) => payload,
    createNewAlarmSuccess: (payload) => payload,
    createNewAlarmFailure: (err) => err,
});
export const updateAlarm = createActions({
    updateAlarmRequest: (payload) => payload,
    updateAlarmSuccess: (payload) => payload,
    updateAlarmFailure: (err) => err,
});
export const deleteAlarm = createActions({
    deleteAlarmRequest: (payload) => payload,
    deleteAlarmSuccess: (payload) => payload,
    deleteAlarmFailure: (err) => err,
});
export const fillInFoAlarm = createActions({
    fillInFoAlarmRequest: (payload) => payload,
    
});
