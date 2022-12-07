import * as actions from "./../actions/InformationHotelManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { infomationHotelManage } from "../../services/InfomationHotelService";
function* getInformationHotelById(action) {
    console.log(action)
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
