import { getAllPrimaryCustomer,getType } from "../actions/CustomerManageAction";

const initialState = {
  arrCustomer: [],
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
    default:
      return state;
  }
}
