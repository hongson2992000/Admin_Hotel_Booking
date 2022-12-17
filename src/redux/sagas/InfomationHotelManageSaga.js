import * as actions from "./../actions/InformationHotelManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
  DISPLAY_POPUP_SUCCESS,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { infomationHotelManage } from "../../services/InfomationHotelService";
import { showModalError } from "../actions/ModalAction";
function* getInformationHotelById(action) {
  console.log(action);
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    // let formData = new FormData();
    // formData.append("id", action.payload.id);
    let infoHotel = yield call(() => {
      return infomationHotelManage.getInfomationHotelById(action.payload.id);
    });
    if (infoHotel.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getInformationHotel.getInformationHotelSuccess(infoHotel.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(actions.getInformationHotel.getInformationHotelFailure(error));
  }
}
export function* followActionGetInfoHotel() {
  yield takeLatest(
    actions.getInformationHotel.getInformationHotelRequest,
    getInformationHotelById
  );
}
function* updateInformationHotelById(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // let formData = new FormData();
    // formData.append("id", action.payload.id);
    let infoHotel = yield call(() => {
      return infomationHotelManage.updateInfomationHotelById(action.payload);
    });
    if (infoHotel.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.updateInformationHotel.updateInformationHotelSuccess(
          infoHotel.data
        )
      );
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(
      actions.updateInformationHotel.updateInformationHotelFailure(error)
    );
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}
export function* followActionUpdateInfoHotel() {
  yield takeLatest(
    actions.updateInformationHotel.updateInformationHotelRequest,
    updateInformationHotelById
  );
}
