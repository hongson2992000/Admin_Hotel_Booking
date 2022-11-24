import { getAllBooking, getType } from "../actions/BookingManageAction";

const initialState = {
  arrBooking: [],
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
    default:
      return state;
  }
}
