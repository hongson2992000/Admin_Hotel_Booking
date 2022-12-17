import { createActions } from "redux-actions";

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

export const checkInRoom = createActions({
  checkInRoomRequest: (payload) => payload,
  checkInRoomSuccess: (payload) => payload,
  checkInRoomFailure: (err) => err,
});
export const checkOutRoom = createActions({
  checkOutRoomRequest: (payload) => payload,
  checkOutRoomSuccess: (payload) => payload,
  checkOutRoomFailure: (err) => err,
});

export const getDashBoardOverview = createActions({
  getDashBoardOverviewRequest: (payload) => payload,
  getDashBoardOverviewSuccess: (payload) => payload,
  getDashBoardOverviewFailure: (err) => err,
});

export const getBookingByRoomId = createActions({
  getBookingByRoomIdRequest: (payload) => payload,
  getBookingByRoomIdSuccess: (payload) => payload,
  getBookingByRoomIdFailure: (err) => err,
});

export const fillFormUpdateUserBooking = createActions({
  fillFormUpdateUserBookingRequest: (payload) => payload,
});
export const updateNewUserBooking = createActions({
  updateNewUserBookingRequest: (payload) => payload,
  updateNewUserBookingSuccess: (payload) => payload,
  updateNewUserBookingFailure: (err) => err,
});
export const deleteNewUserBooking = createActions({
  deleteNewUserBookingRequest: (payload) => payload,
  deleteNewUserBookingSuccess: (payload) => payload,
  deleteNewUserBookingFailure: (err) => err,
});
export const checkInRoomInHotel = createActions({
  checkInRoomInHotelRequest: (payload) => payload,
  checkInRoomInHotelSuccess: (payload) => payload,
  checkInRoomInHotelFailure: (err) => err,
});
export const getRevenueEntireDate = createActions({
  getRevenueEntireDateRequest: (payload) => payload,
  getRevenueEntireDateSuccess: (payload) => payload,
  getRevenueEntireDateFailure: (err) => err,
});
export const checkOutInRoom = createActions({
  checkOutInRoomRequest: (payload) => payload,
  checkOutInRoomSuccess: (payload) => payload,
  checkOutInRoomFailure: (err) => err,
});

export const getRevenueCancelEntireDate = createActions({
  getRevenueCancelEntireDateRequest: (payload) => payload,
  getRevenueCancelEntireDateSuccess: (payload) => payload,
  getRevenueCancelEntireDateFailure: (err) => err,
});
