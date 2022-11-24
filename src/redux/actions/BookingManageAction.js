import { createActions,createAction } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllBooking = createActions({
    getAllBookingRequest: undefined,
    getAllBookingSuccess: (payload) => payload,
    getAllBookingFailure: (err) => err,
});