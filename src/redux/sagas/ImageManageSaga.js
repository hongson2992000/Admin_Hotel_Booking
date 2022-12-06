import * as actions from "./../actions/ImageManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { imageManage } from "../../services/ImageService";
function* getAllImage(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listImage = yield call(() => {
      return imageManage.getAllImage();
    });
    if (listImage.status === STATUS_CODE.SUCCESS) {
      yield put(actions.getAllImage.getAllImageSuccess(listImage.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(actions.getAllImage.getAllImageFailure(error));
  }
}
export function* followActionGetAllImage() {
  yield takeLatest(actions.getAllImage.getAllImageRequest, getAllImage);
}
