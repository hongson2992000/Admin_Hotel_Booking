import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getRequestService = createActions({
  getRequestServiceRequest: (payload) => payload,
  getRequestServiceSuccess: (payload) => payload,
  getRequestServiceFailure: (err) => err,
});
export const getRequestServiceByBookingId = createActions({
  getRequestServiceByBookingIdRequest: (payload) => payload,
  getRequestServiceByBookingIdSuccess: (payload) => payload,
  getRequestServiceByBookingIdFailure: (err) => err,
});
export const getRequestServiceByBookingIdStaff = createActions({
  getRequestServiceByBookingIdStaffRequest: (payload) => payload,
  getRequestServiceByBookingIdStaffSuccess: (payload) => payload,
  getRequestServiceByBookingIdStaffFailure: (err) => err,
});
export const confirmRequestService = createActions({
  confirmRequestServiceRequest: (payload) => payload,
  confirmRequestServiceSuccess: (payload) => payload,
  confirmRequestServiceFailure: (err) => err,
});
export const getRequestServiceById = createActions({
  getRequestServiceByIdRequest: (payload) => payload,
});
export const cancelRequestServiceDetailById = createActions({
  cancelRequestServiceDetailByIdRequest: (payload) => payload,
  cancelRequestServiceDetailByIdSuccess: (payload) => payload,
  cancelRequestServiceDetailByIdFailure: (err) => err,
});
export const getTurnDownService = createActions({
  getTurnDownServiceRequest: undefined,
  getTurnDownServiceSuccess: (payload) => payload,
  getTurnDownServiceFailure: (err) => err,
});
export const getTurnDownServiceByBookingId = createActions({
  getTurnDownServiceByBookingIdRequest: (payload) => payload,
  getTurnDownServiceByBookingIdSuccess: (payload) => payload,
  getTurnDownServiceByBookingIdFailure: (err) => err,
});
export const confirmTurnDownService = createActions({
  confirmTurnDownServiceRequest: (payload) => payload,
  confirmTurnDownServiceSuccess: (payload) => payload,
  confirmTurnDownServiceFailure: (err) => err,
});
export const cancelTurnDownService = createActions({
  cancelTurnDownServiceRequest: (payload) => payload,
  cancelTurnDownServiceSuccess: (payload) => payload,
  cancelTurnDownServiceFailure: (err) => err,
});

export const confirmRequestServiceInRoom = createActions({
  confirmRequestServiceInRoomRequest: (payload) => payload,
  confirmRequestServiceInRoomSuccess: (payload) => payload,
  confirmRequestServiceInRoomFailure: (err) => err,
});
export const confirmRequestServiceByManager = createActions({
  confirmRequestServiceByManagerRequest: (payload) => payload,
  confirmRequestServiceByManagerSuccess: (payload) => payload,
  confirmRequestServiceByManagerFailure: (err) => err,
});
export const getTurnDownServiceByBookingIdByStaff = createActions({
  getTurnDownServiceByBookingIdByStaffRequest: (payload) => payload,
  getTurnDownServiceByBookingIdByStaffSuccess: (payload) => payload,
  getTurnDownServiceByBookingIdByStaffFailure: (err) => err,
});
export const confirmTurnDownServiceStaff = createActions({
  confirmTurnDownServiceStaffRequest: (payload) => payload,
  confirmTurnDownServiceStaffSuccess: (payload) => payload,
  confirmTurnDownServiceStaffFailure: (err) => err,
});