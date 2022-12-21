import {
  getType,
  getAccount,
  filInfoAccount,
  filInfoProfile,
  createAccount,
  updateAccount,
  // createNews,
  // updateNews,
  // deleteNews,
} from "../actions/AccountManageAction";

const initialState = {
  arrAccount: [],
  accountItem: {},
  profileItem: {},
};
export default function AccountManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAccount.getAccountRequest):
      return {
        ...state,
      };
    case getType(getAccount.getAccountSuccess):
      return {
        ...state,
        arrAccount: action.payload,
      };

    case getType(getAccount.getAccountFailure):
      return {
        ...state,
      };
    case getType(createAccount.createAccountSuccess):
      let accountCreate = [];
      accountCreate = action.payload;
      state.arrAccount = accountCreate;
      return {
        ...state,
      };
    case getType(createAccount.createAccountFailure):
      return {
        ...state,
      };
    case getType(updateAccount.updateAccountSuccess):
      let accountUpdate = [...state.arrAccount]
      let indexUpdateAccount = accountUpdate.findIndex((item)=>item.id === action.payload.id)
      if(indexUpdateAccount !==-1){
        accountUpdate[indexUpdateAccount] = action.payload
      }
      state.arrAccount = accountUpdate
      return {
        ...state,
      };
    case getType(updateAccount.updateAccountFailure):
      return {
        ...state,
      };
    // case getType(deleteLocation.deleteLocationSuccess):
    //   return {
    //     ...state,
    //     arrLocation: action.payload,
    //   };
    // case getType(deleteLocation.deleteLocationFailure):
    //   return {
    //     ...state,
    //   };
    case getType(filInfoAccount.filInfoAccountRequest):
      let accountItemUpdate = {};
      accountItemUpdate = action.payload;
      state.accountItem = accountItemUpdate;
      return {
        ...state,
      };
    case getType(filInfoProfile.filInfoProfileRequest):
      let profileItemUpdate = {};
      profileItemUpdate = action.payload;
      state.profileItem = profileItemUpdate;
      return {
        ...state,
      };
    default:
      return state;
  }
}
