import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllPrimaryCustomer = createActions({
  getAllPrimaryCustomerRequest: undefined,
  getAllPrimaryCustomerSuccess: (payload) => payload,
  getAllPrimaryCustomerFailure: (err) => err,
});
export const getInfoCustomerByBookingId = createActions({
  getInfoCustomerByBookingIdRequest: (payload) => payload,
  getInfoCustomerByBookingIdSuccess: (payload) => payload,
  getInfoCustomerByBookingIdFailure: (err) => err,
});

export const getCustomerFeedbackByBetween = createActions({
  getCustomerFeedbackByBetweenRequest: (payload) => payload,
  getCustomerFeedbackByBetweenSuccess: (payload) => payload,
  getCustomerFeedbackByBetweenFailure: (err) => err,
});
