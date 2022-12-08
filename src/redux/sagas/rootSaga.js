import { all } from "redux-saga/effects";
import * as serviceManageSaga from "./ServiceManageSaga";
import * as locationManageSaga from "./LocationManageSaga";
import * as login from "./LoginSaga";
import * as bookingManageSaga from "./BookingManageSaga";
import * as roomManageSaga from "./RoomManageSaga";
import * as requestServiceManageSaga from "./RequestServiceManageSaga";
import * as sendMessageSaga from "./SendMessageSaga";
import * as imageManageSaga from "./ImageManageSaga";
import * as newsManageSaga from "./NewsManageSaga";
import * as informationHotelSaga from "./InfomationHotelManageSaga";
import * as customerManageSaga from "./CustomerManageSaga"
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
    bookingManageSaga.followActionGetBookingByRoomId(),
    roomManageSaga.followActionGetAllRoom(),
    roomManageSaga.followActionGetRoomAvailability(),
    bookingManageSaga.followActionCheckIn(),
    bookingManageSaga.followActionCheckOut(),
    bookingManageSaga.followActionGetDashBoard(),
    requestServiceManageSaga.followActionGetAllRequestService(),
    requestServiceManageSaga.followActionConfirmRequestService(),
    requestServiceManageSaga.followActionCancelRequestService(),
    requestServiceManageSaga.followActionGetAllTurnDownService(),
    requestServiceManageSaga.followActionConfirmTurnDownService(),
    requestServiceManageSaga.followActionConfirmRequestServiceInRoom(),
    requestServiceManageSaga.followActionGetRequestServiceByBookingId(),
    sendMessageSaga.followActionSendMessage(),
    imageManageSaga.followActionGetAllImage(),
    newsManageSaga.followActionGetAllNews(),
    informationHotelSaga.followActionGetInfoHotel(),
    customerManageSaga.followActionGetAllPrimaryCustomer(),
    customerManageSaga.followActionGetInfoCustomerByBookingId(),

  ]);
}
