import {
  getAllBooking,
  getType,
  getBookingById,
  addNewUserBooking,
  getInfoUserBooking,
  checkInRoom,
  getDashBoardOverview,
  getBookingByRoomId,
  fillFormUpdateUserBooking,
  updateNewUserBooking,
  deleteNewUserBooking,
  getRevenueEntireDate,
  getRevenueCancelEntireDate,
  cancelBooking,
} from "../actions/BookingManageAction";
import { getAllRoom } from "../actions/RoomManageAction";
const initialState = {
  arrBooking: [],
  bookingItem: {},
  userInfoBooking: [],
  arrCheckIn: [],
  dashboard: {},
  userFormUpdate: {},
  revenuesEntire: [],
  revenuesCancelEntire: [],
};
export default function BookingManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAllBooking.getAllBookingRequest):
      return {
        ...state,
      };
    case getType(getAllBooking.getAllBookingSuccess):
      let arrBookingGet = [];
      arrBookingGet = action.payload;
      state.arrBooking = arrBookingGet;
      return {
        ...state,
      };
    case getType(getAllBooking.getAllBookingFailure):
      return {
        ...state,
      };
    case getType(getBookingById.getBookingByIdRequest):
      return {
        ...state,
        bookingItem: action.payload,
        userInfoBooking: [],
      };
    case getType(getInfoUserBooking.getInfoUserBookingRequest):
      return {
        ...state,
        bookingItem: action.payload,
      };
    case getType(getAllRoom.getAllRoomRequest):
      return {
        ...state,
        userInfoBooking: [],
      };
    case getType(addNewUserBooking.addNewUserBookingRequest):
      let bookingItemNew = [...state.userInfoBooking];
      bookingItemNew.push(action.payload);
      state.userInfoBooking = bookingItemNew;
      return { ...state };
    case getType(fillFormUpdateUserBooking.fillFormUpdateUserBookingRequest):
      let newUser = {};
      newUser = action.payload;
      state.userFormUpdate = newUser;
      return { ...state };

    case getType(updateNewUserBooking.updateNewUserBookingRequest):
      // console.log("USERDAUPTE", action.payload)
      let listUserUpdate = [...state.userInfoBooking];
      let index = listUserUpdate.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log("INDEX", index);
      if (index !== -1) {
        listUserUpdate[index].birthDate = action.payload.birthDate;
        listUserUpdate[index].firstName = action.payload.firstName;
        listUserUpdate[index].middleName = action.payload.middleName;
        listUserUpdate[index].lastName = action.payload.lastName;
        listUserUpdate[index].idNo = action.payload.idNo;
        listUserUpdate[index].gender = action.payload.gender;
        listUserUpdate[index].email = action.payload.email;
        listUserUpdate[index].phoneNumber = action.payload.phoneNumber;
      }

      state.userInfoBooking = listUserUpdate;
      return { ...state };
    case getType(deleteNewUserBooking.deleteNewUserBookingRequest):
      console.log("USERDAUPTE", action.payload);
      let listUserDelete = [...state.userInfoBooking];
      listUserDelete = listUserDelete.filter(
        (item) => item.id !== action.payload.id
      );
      state.userInfoBooking = listUserDelete;
      return { ...state };
    case getType(checkInRoom.checkInRoomRequest):
      return {
        ...state,
      };
    case getType(checkInRoom.checkInRoomSuccess):
      return {
        ...state,
        arrCheckIn: action.payload,
        userInfoBooking: [],
      };
    case getType(checkInRoom.checkInRoomFailure):
      return {
        ...state,
      };
    case getType(getDashBoardOverview.getDashBoardOverviewRequest):
      return {
        ...state,
      };
    case getType(getDashBoardOverview.getDashBoardOverviewSuccess):
      return {
        ...state,
        dashboard: action.payload,
      };
    case getType(getDashBoardOverview.getDashBoardOverviewFailure):
      return {
        ...state,
      };
    case getType(getBookingByRoomId.getBookingByRoomIdRequest):
      return {
        ...state,
      };
    case getType(getBookingByRoomId.getBookingByRoomIdSuccess):
      let bookingNew = {};
      bookingNew = action.payload;
      state.bookingItem = bookingNew;
      return {
        ...state,
      };
    case getType(getBookingByRoomId.getBookingByRoomIdFailure):
      return {
        ...state,
      };
    case getType(getRevenueEntireDate.getRevenueEntireDateRequest):
      return {
        ...state,
      };
    case getType(getRevenueEntireDate.getRevenueEntireDateSuccess):
      return {
        ...state,
        revenuesEntire: action.payload,
      };
    case getType(getRevenueEntireDate.getRevenueEntireDateFailure):
      return {
        ...state,
      };
    case getType(getRevenueCancelEntireDate.getRevenueCancelEntireDateRequest):
      return {
        ...state,
      };
    case getType(getRevenueCancelEntireDate.getRevenueCancelEntireDateSuccess):
      return {
        ...state,
        revenuesCancelEntire: action.payload,
      };
    case getType(getRevenueCancelEntireDate.getRevenueCancelEntireDateFailure):
      return {
        ...state,
      };
    case getType(cancelBooking.cancelBookingSuccess):
      let arrCancelBooking = [...state.arrBooking];
      let indexCancelBooking = arrCancelBooking.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexCancelBooking !== -1) {
        arrCancelBooking[indexCancelBooking] = action.payload;
      }
      state.arrBooking = arrCancelBooking;
      return {
        ...state,
      };
    case getType(cancelBooking.cancelBookingFailure):
      return {
        ...state,
      };
    default:
      return state;
  }
}
