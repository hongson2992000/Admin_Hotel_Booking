import {
  getAllPrimaryCustomer,
  getType,
  getCustomerFeedbackByBetween,
} from "../actions/CustomerManageAction";

const initialState = {
  arrCustomer: [],
  arrCustomerFeedback: [],
};
export default function CustomerManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAllPrimaryCustomer.getAllPrimaryCustomerRequest):
      return {
        ...state,
      };
    case getType(getAllPrimaryCustomer.getAllPrimaryCustomerSuccess):
      return {
        ...state,
        arrCustomer: action.payload,
      };
    case getType(getAllPrimaryCustomer.getAllPrimaryCustomerFailure):
      return {
        ...state,
      };
    case getType(
      getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenRequest
    ):
      return {
        ...state,
      };
    case getType(
      getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenSuccess
    ):
      return {
        ...state,
        arrCustomerFeedback: action.payload,
      };
    case getType(
      getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenFailure
    ):
      return {
        ...state,
      };
    default:
      return state;
  }
}
