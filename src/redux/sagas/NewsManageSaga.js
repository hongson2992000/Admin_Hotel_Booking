import * as actions from "../actions/NewsManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { newsManage } from "../../services/NewsManage";

function* getAllNews(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    let listNews = yield call(() => {
      return newsManage.getAllNews();
    });
    if (listNews.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getNews.getNewsSuccess(listNews.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getNews.getNewsFailure(error));
  }
}
function* createNews(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let news = yield call(() => {
      return newsManage.createNews(action.payload);
    });
    if (news.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.createNews.createNewsSuccess(news.data)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.createNews.createNewsFailure(error));
  }
}
export function* followActionCreateNews() {
  yield takeLatest(
    actions.createNews.createNewsRequest,
    createNews
  );
}
// function* updateLocation(action) {
//   try {
//     yield put({
//       type: DISPLAY_LOADING,
//     });
//     // yield delay(1000);
//     let location = yield call(() => {
//       return locationManage.updateLocation(action.payload);
//     });
//     if (location.status === STATUS_CODE.SUCCESS) {
//       yield put(
//         actions.updateLocation.updateLocationSuccess(location.data)
//       );
//     }
//     yield put({
//       type: HIDE_LOADING,
//     });
//   } catch (error) {
//     yield put(actions.updateLocation.updateLocationFailure(error));
//   }
// }

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

export function* followActionGetAllNews() {
  yield takeLatest(
    actions.getNews.getNewsRequest,
    getAllNews
  );
}


// export function* followActionUpdateLocation() {
//   yield takeLatest(
//     actions.updateLocation.updateLocationRequest,
//     updateLocation
//   );
// }
// export function* followActionDeleteLocation() {
//   yield takeLatest(
//     actions.deleteLocation.deleteLocationRequest,
//     deleteLocation
//   );
// }
