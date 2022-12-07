import * as actions from "./../actions/CustomerManageAction";
import {
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../../utils/constants/settingSystem";
import { call, put, takeLatest } from "redux-saga/effects";
import { customerManage } from "../../services/CustomerManage";
import {bookingManage} from "../../services/BookingManage"
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
      let arrRoom = []
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
        actions.getAllPrimaryCustomer.getAllPrimaryCustomerSuccess(
          arrRoom
        )
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
