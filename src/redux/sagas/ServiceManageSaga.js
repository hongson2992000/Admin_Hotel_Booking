import * as actions from "./../actions/ServiceManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
  DISPLAY_POPUP_SUCCESS
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { serviceManage } from "../../services/ServiceManage";
import { showModalError } from "../actions/ModalAction";

function* getAllHotelService(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listService = yield call(() => {
      return serviceManage.getAllHotelService();
    });
    if (listService.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getHotelService.getHotelServiceSuccess(listService.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(actions.getHotelService.getHotelServiceFailure(error));
  }
}
function* createHotelService(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let service = yield call(() => {
      return serviceManage.createHotelService(action.payload);
    });
    if (service.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.createNewHotelService.createHotelServiceSuccess(service.data)
      );
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.createNewHotelService.createHotelServiceFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}
function* updateHotelService(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let service = yield call(() => {
      return serviceManage.updateService(action.payload);
    });
    if (service.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.updateHotelService.updateHotelServiceSuccess(service.data)
      );
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.updateHotelService.updateHotelServiceFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}

function* deleteService(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let service = yield call(() => {
      return serviceManage.deleteService(action.payload);
    });
    if (service.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.deleteHotelService.deleteHotelServiceSuccess(service.data)
      );
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.deleteHotelService.deleteHotelServiceFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}

export function* followActionGetAllHotelService() {
  yield takeLatest(
    actions.getHotelService.getHotelServiceRequest,
    getAllHotelService
  );
}

export function* followActionCreateHotelService() {
  yield takeLatest(
    actions.createNewHotelService.createHotelServiceRequest,
    createHotelService
  );
}
export function* followActionUpdateHotelService() {
  yield takeLatest(
    actions.updateHotelService.updateHotelServiceRequest,
    updateHotelService
  );
}
export function* followActionDeleteHotelService() {
  yield takeLatest(
    actions.deleteHotelService.deleteHotelServiceRequest,
    deleteService
  );
}
