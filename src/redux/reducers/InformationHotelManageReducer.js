import {
  getType,
  getInformationHotel,
  updateInformationHotel,
} from "../actions/InformationHotelManageAction";

const initialState = {
  infoHotel: {},
};
export default function InformationHotelManageReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case getType(getInformationHotel.getInformationHotelRequest):
      return {
        ...state,
      };
    case getType(getInformationHotel.getInformationHotelSuccess):
      return {
        ...state,
        infoHotel: action.payload,
      };
    case getType(getInformationHotel.getInformationHotelFailure):
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
    case getType(updateInformationHotel.updateInformationHotelSuccess):
      let infoHotelUpdate = {};
      infoHotelUpdate = action.payload;
      state.infoHotel = infoHotelUpdate;
      return {
        ...state,
      };
    case getType(updateInformationHotel.updateInformationHotelFailure):
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
    // case getType(filInfoLocation.filInfoLocationRequest):
    //   return {
    //     ...state,
    //     loactionItem: action.payload,
    //   };
    default:
      return state;
  }
}
