import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllPrimaryCustomer = createActions({
    getAllPrimaryCustomerRequest: undefined,
    getAllPrimaryCustomerSuccess: (payload) => payload,
    getAllPrimaryCustomerFailure: (err) => err,
});
