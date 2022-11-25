import { createActions, createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllBooking = createActions({
  getAllBookingRequest: undefined,
  getAllBookingSuccess: (payload) => payload,
  getAllBookingFailure: (err) => err,
});
export const getBookingById = createActions({
  getBookingByIdRequest: (payload) => payload,
  getBookingByIdSuccess: (payload) => payload,
  getBookingByIdFailure: (err) => err,
});
export const getInfoUserBooking = createActions({
  getInfoUserBookingRequest: undefined,
  getBookingByIdSuccess: (payload) => payload,
  getBookingByIdFailure: (err) => err,
});
export const addNewUserBooking = createActions({
  addNewUserBookingRequest: (payload) => payload,
  getBookingByIdSuccess: (payload) => payload,
  getBookingByIdFailure: (err) => err,
});
