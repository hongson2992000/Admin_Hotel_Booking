import * as actions from "./../actions/ServiceManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { serviceManage } from "../../services/ServiceManage";

function* getAllHotelService(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(1000);
    let listService = yield call(() => {
      return serviceManage.getAllHotelService();
    });
    console.log(listService.data);
    if (listService.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getHotelService.getHotelServiceSuccess(listService.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getHotelService.getHotelServiceFailure(error));
  }
}
function* createHotelService(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(1000);
    let formData = new FormData();
    formData.append("description", action.payload.description);
    formData.append("id", 0);
    formData.append("majorGroup", action.payload.majorGroup);
    formData.append("name", action.payload.name);
    formData.append("price", action.payload.price);
    formData.append("serviceCategory_Id", action.payload.serviceCategory_Id);
    formData.append("status", action.payload.status);
    let service = yield call(() => {
      return serviceManage.createHotelService(action.payload);
    });
    // console.log("data", listService.data);
    // console.log("", service);
    if (service.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.createNewHotelService.createHotelServiceSuccess(service.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.createNewHotelService.createHotelServiceFailure(error));
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
