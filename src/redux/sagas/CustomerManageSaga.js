import * as actions from "./../actions/CustomerManageAction";
import * as actionBooking from "./../actions/BookingManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { customerManage } from "../../services/CustomerManage";
import { bookingManage } from "../../services/BookingManage";
import { roomManage } from "../../services/RoomManage";
function* getAllPrimaryCustomer(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);
    let listCustomer = yield call(() => {
      return customerManage.getAllPrimaryCustomer();
    });
    if (listCustomer.status === STATUS_CODE.SUCCESS) {
      let arrRoom = [];
      for (let i = 0; i < listCustomer.data.length; i++) {
        let booking = yield call(() => {
          return bookingManage.getBookingByCustomerId(listCustomer.data[i].id);
        });
        let newRoom = {};
        newRoom = {
          customer: listCustomer.data[i],
          booking: booking,
        };
        arrRoom.push(newRoom);
      }
      yield put(
        actions.getAllPrimaryCustomer.getAllPrimaryCustomerSuccess(arrRoom)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    // navigate("/location")
  } catch (error) {
    yield put(
      actions.getAllPrimaryCustomer.getAllPrimaryCustomerFailure(error)
    );
  }
}
export function* followActionGetAllPrimaryCustomer() {
  yield takeLatest(
    actions.getAllPrimaryCustomer.getAllPrimaryCustomerRequest,
    getAllPrimaryCustomer
  );
}
// if (listRoom.status === STATUS_CODE.SUCCESS) {
//   let arrRoom = [];
//   let booking = yield call(() => {
//     return roomManage.getBookingCheckInByRoomId();
//   });
//   console.log(booking.data)
//   if(booking.data.length !== 0){
//     for (let i = 0; i < listRoom.data.length; i++) {
//       let newRoom;
//       for (let j = 0; j < booking?.data.length; j++) {
//         if (listRoom.data[i].id === booking?.data[j].room.id) {
//           newRoom = {
//             room: listRoom.data[i],
//             booking: booking?.data[j],
//           };
//           break;
//         } else {
//           newRoom = {
//             room: listRoom.data[i],
//             booking: null,
//           };
//         }
//       }
//       arrRoom.push(newRoom)
//     }
//   }else{
//     for (let i = 0; i < listRoom.data.length; i++){
//       let newRoom = {}
//       newRoom = {
//         room: listRoom.data[i],
//         booking: null,
//       }
//       arrRoom.push(newRoom)
//     }
//   }
function* getInfoCustomerByBookingId(action) {
  console.log(action);

  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // let bookingItem = yield call(() => {
    //   return bookingManage.getBookingByRoomId(action.payload.room_id);
    // });
    let listCustomer = yield call(() => {
      return customerManage.getAllCustomerByBookingId(
        action.payload.booking.idBooking
      );
    });
    if (listCustomer.status === STATUS_CODE.SUCCESS) {
      let primaryCustomer = yield call(() => {
        return customerManage.getPrimaryCustomerByBookingId(
          action.payload.booking.idBooking
        );
      });
      let room = yield call(() => {
        return roomManage.getRoomByBookingId(action.payload.booking.idBooking);
      });
      let infoCustomer = {
        booking: action.payload.booking,
        primaryCustomer: primaryCustomer.data,
        listCustomer: listCustomer.data,
        room: room.data,
      };
      yield put(
        actionBooking.getBookingByRoomId.getBookingByRoomIdSuccess(infoCustomer)
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
  } catch (error) {
    yield put(
      actions.getInfoCustomerByBookingId.getInfoCustomerByBookingIdFailure(
        error
      )
    );
  }
}
export function* followActionGetInfoCustomerByBookingId() {
  yield takeLatest(
    actions.getInfoCustomerByBookingId.getInfoCustomerByBookingIdRequest,
    getInfoCustomerByBookingId
  );
}

function* getCustomerFeedbackByBetween(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    // yield delay(1000);

    let listBooking = yield call(() => {
      return customerManage.getCustomerFeedbackByBetween(action.payload);
    });
    if (listBooking.status === STATUS_CODE.SUCCESS) {
      yield put(
        actions.getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenSuccess(
          listBooking.data
        )
      );
    }
    yield put({
      type: HIDE_LOADING,
    });
    // yield put({
    //   type: DISPLAY_POPUP_SUCCESS,
    // });
  } catch (error) {
    yield put(
      actions.getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenFailure(
        error
      )
    );
  }
}

export function* followActionGetCustomerFeedbackByBetween() {
  yield takeLatest(
    actions.getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenRequest,
    getCustomerFeedbackByBetween
  );
}
