import {
    getType,
    getAccount,
    filInfoAccount,
    // createNews,
    // updateNews,
    // deleteNews,
  } from "../actions/AccountManageAction";
  
  const initialState = {
    arrAccount: [],
    accountItem: {},
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
      // case getType(createLocation.createLocationSuccess):
      //   return {
      //     ...state,
      //     arrLocation: action.payload,
      //   };
      // case getType(createLocation.createLocationFailure):
      //   return {
      //     ...state,
      //   };
      // case getType(updateLocation.updateLocationSuccess):
      //   return {
      //     ...state,
      //     arrLocation: action.payload,
      //   };
      // case getType(updateLocation.updateLocationFailure):
      //   return {
      //     ...state,
      //   };
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
      default:
        return state;
    }
  }
  