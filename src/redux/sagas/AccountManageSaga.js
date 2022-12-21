import * as actions from "../actions/AccountManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
  DISPLAY_POPUP_SUCCESS,
  USER_LOGIN,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { accountManage } from "../../services/AccountManage";
import { showModalError } from "../actions/ModalAction";

function* getAllAccount(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listAccount = yield call(() => {
      return accountManage.getAllAccount();
    });
    if (listAccount.status === STATUS_CODE.SUCCESS) {
      yield put(actions.getAccount.getAccountSuccess(listAccount.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getAccount.getAccountFailure(error));
  }
}
function* createAccount(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let account = yield call(() => {
      return accountManage.createAccount(action.payload);
    });
    if (account.status === STATUS_CODE.SUCCESS) {
      yield put(actions.createAccount.createAccountSuccess(account.data));
      let listAccount = yield call(() => {
        return accountManage.getAllAccount();
      });
      if (listAccount.status === STATUS_CODE.SUCCESS) {
        yield put(actions.getAccount.getAccountSuccess(listAccount.data));
      }
      yield put({
        type: DISPLAY_POPUP_SUCCESS,
      });
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.createAccount.createAccountFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}
export function* followActionCreateAccount() {
  yield takeLatest(actions.createAccount.createAccountRequest, createAccount);
}
function* updateAccount(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let account = yield call(() => {
      return accountManage.updateAccount(action.payload);
    });
    if (account.status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(USER_LOGIN, JSON.stringify(account.data));
      yield put(
        actions.updateAccount.updateAccountSuccess(account.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    yield put(actions.updateAccount.updateAccountFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError())
  }
}
export function* followActionUpdateAccount() {
  yield takeLatest(
    actions.updateAccount.updateAccountRequest,
    updateAccount
  );
}
// function* deleteLocation(action) {
//   try {
//     yield put({
//       type: DISPLAY_LOADING,
//     });
//     console.log(action.payload)
//     // yield delay(1000);
//     let location = yield call(() => {
//       return locationManage.deleteLocation(action.payload);
//     });
//     console.log("Thanh An",location)
//     if (location.status === STATUS_CODE.SUCCESS) {
//       yield put(
//         actions.deleteLocation.deleteLocationSuccess(location.data)
//       );
//     }
//     yield put({
//       type: HIDE_LOADING,
//     });
//   } catch (error) {
//     yield put(actions.deleteLocation.deleteLocationFailure(error));
//   }
// }

export function* followActionGetAllAccount() {
  yield takeLatest(actions.getAccount.getAccountRequest, getAllAccount);
}

// export function* followActionDeleteLocation() {
//   yield takeLatest(
//     actions.deleteLocation.deleteLocationRequest,
//     deleteLocation
//   );
// }
