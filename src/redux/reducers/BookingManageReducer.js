import {
  getAllBooking,
  getType,
  getBookingById,
  addNewUserBooking,
  getInfoUserBooking,
} from "../actions/BookingManageAction";

const initialState = {
  arrBooking: [],
  bookingItem: {},
  userInfoBooking: [],
};
export default function BookingManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAllBooking.getAllBookingRequest):
      return {
        ...state,
      };
    case getType(getAllBooking.getAllBookingSuccess):
      return {
        ...state,
        arrBooking: action.payload,
      };
    case getType(getAllBooking.getAllBookingFailure):
      return {
        ...state,
      };
    case getType(getBookingById.getBookingByIdRequest):
      return {
        ...state,
        bookingItem: action.payload,
      };
    case getType(getInfoUserBooking.getInfoUserBookingRequest):
      return {
        ...state,
        bookingItem: action.payload,
      };
    case getType(addNewUserBooking.addNewUserBookingRequest):
      let bookingItemNew = [...state.userInfoBooking];
      bookingItemNew.push(action.payload)
      state.userInfoBooking = bookingItemNew
      return { ...state };
    default:
      return state;
  }
}
