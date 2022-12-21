import * as actions from "../actions/NewsManageAction";
import {
  DISPLAY_LOADING,
  DISPLAY_POPUP_SUCCESS,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { newsManage } from "../../services/NewsManage";
import { showModalError } from "../actions/ModalAction";

function* getAllNews(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    let listNews = yield call(() => {
      return newsManage.getAllNews();
    });
    if (listNews.status === STATUS_CODE.SUCCESS) {
      yield put(actions.getNews.getNewsSuccess(listNews.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(actions.getNews.getNewsFailure(error));
  }
}
export function* followActionGetAllNews() {
  yield takeLatest(actions.getNews.getNewsRequest, getAllNews);
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
      yield put(actions.createNews.createNewsSuccess(news.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    yield put(actions.createNews.createNewsFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}
export function* followActionCreateNews() {
  yield takeLatest(actions.createNews.createNewsRequest, createNews);
}
function* updateNews(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let news = yield call(() => {
      return newsManage.updateNews(action.payload);
    });
    if (news.status === STATUS_CODE.SUCCESS) {
      yield put(actions.updateNews.updateNewsSuccess(news.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    yield put(actions.updateNews.updateNewsFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}
export function* followActionUpdateNews() {
  yield takeLatest(actions.updateNews.updateNewsRequest, updateNews);
}
function* deleteNews(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let news = yield call(() => {
      return newsManage.deleteNews(action.payload.id);
    });
    if (news.status === STATUS_CODE.SUCCESS) {
      yield put(actions.deleteNews.deleteNewsSuccess(news.data));
    }
    yield put({
      type: HIDE_LOADING,
    });
    yield put({
      type: DISPLAY_POPUP_SUCCESS,
    });
  } catch (error) {
    yield put(actions.deleteNews.deleteNewsFailure(error));
    yield put({
      type: HIDE_LOADING,
    });
    yield put(showModalError());
  }
}
export function* followActionDeleteNews() {
  yield takeLatest(actions.deleteNews.deleteNewsRequest, deleteNews);
}
