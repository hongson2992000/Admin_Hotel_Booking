import { all } from "redux-saga/effects";
import * as serviceManageSaga from "./ServiceManageSaga";
export default function* rootSaga() {
  yield all([serviceManageSaga.followActionGetAllHotelService(),
  serviceManageSaga.followActionCreateHotelService()]);
}
