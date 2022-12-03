import * as actions from "./../actions/SendMessageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { sendMessageService } from "../../services/SendMessageService";
function* sendMessage(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listMessage = yield call(() => {
      return sendMessageService.sendMessage(action.payload);
    });
    if (listMessage.status === STATUS_CODE.SUCCESS) {
      yield put(actions.sendMessage.sendMessageSuccess(listMessage.formData));
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(actions.sendMessage.sendMessageFailure(error));
  }
}
export function* followActionSendMessage() {
  yield takeLatest(actions.sendMessage.sendMessageRequest, sendMessage);
}
