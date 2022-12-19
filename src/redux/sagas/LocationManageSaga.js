import * as actions from "../actions/LocationManageAction";
import {
  DISPLAY_LOADING,
  DISPLAY_POPUP_SUCCESS,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { locationManage } from "../../services/LocationManage";
import { showModalError, showModalSuccess } from "../actions/ModalAction";
function* getAllLocation(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listLocation = yield call(() => {
      return locationManage.getAllLocation();
    });
    console.log(listLocation.data);
    if (listLocation.status === STATUS_CODE.SUCCESS) {
      yield put(actions.getLocation.getLocationSuccess(listLocation.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getLocation.getLocationFailure(error));
  }
}
function* createLocation(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let location = yield call(() => {
      return locationManage.createLocation(action.payload);
    });
    if (location.status === STATUS_CODE.SUCCESS) {
      yield put(actions.createLocation.createLocationSuccess(location.data));
      yield put({ type: DISPLAY_POPUP_SUCCESS });
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    yield put(actions.createLocation.createLocationFailure(error));
    yield put(showModalError());
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}
function* updateLocation(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let location = yield call(() => {
      return locationManage.updateLocation(action.payload);
    });
    if (location.status === STATUS_CODE.SUCCESS) {
      yield put(actions.updateLocation.updateLocationSuccess(location.data));
      yield put(showModalSuccess());
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    yield put(actions.updateLocation.updateLocationFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}

function* deleteLocation(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    console.log(action.payload);
    // yield delay(1000);
    let location = yield call(() => {
      return locationManage.deleteLocation(action.payload.id);
    });
    if (location.status === STATUS_CODE.SUCCESS) {
      yield put(actions.deleteLocation.deleteLocationSuccess(location.data));
      yield { type: DISPLAY_POPUP_SUCCESS };
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.deleteLocation.deleteLocationFailure(error));
    yield put(showModalError());
    yield put({
      type: HIDE_LOADING,
    });
  }
}

export function* followActionGetAllLocation() {
  yield takeLatest(actions.getLocation.getLocationRequest, getAllLocation);
}

export function* followActionCreateLocation() {
  yield takeLatest(
    actions.createLocation.createLocationRequest,
    createLocation
  );
}
export function* followActionUpdateLocation() {
  yield takeLatest(
    actions.updateLocation.updateLocationRequest,
    updateLocation
  );
}
export function* followActionDeleteLocation() {
  yield takeLatest(
    actions.deleteLocation.deleteLocationRequest,
    deleteLocation
  );
}
