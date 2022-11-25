import { all } from "redux-saga/effects";
import * as serviceManageSaga from "./ServiceManageSaga";
import * as locationManageSaga from "./LocationManageSaga";
import * as login from "./LoginSaga";
import * as bookingManageSaga from "./BookingManageSaga";
import * as roomManageSaga from "./RoomManageSaga";
export default function* rootSaga() {
  yield all([
    serviceManageSaga.followActionGetAllHotelService(),
    serviceManageSaga.followActionCreateHotelService(),
    serviceManageSaga.followActionDeleteHotelService(),
    serviceManageSaga.followActionUpdateHotelService(),
    locationManageSaga.followActionGetAllLocation(),
    locationManageSaga.followActionCreateLocation(),
    locationManageSaga.followActionDeleteLocation(),
    locationManageSaga.followActionUpdateLocation(),
    login.followActionLogin(),
    bookingManageSaga.followActionGetAllBooing(),
    roomManageSaga.followActionGetAllRoom()
  ]);
}
