import {
  getLocation,
  getType,
  createLocation,
  updateLocation,
  deleteLocation,
  filInfoLocation,
} from "../actions/LocationManageAction";

const initialState = {
  arrLocation: [],
  locationItem: {},
};
export default function ServiceManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getLocation.getLocationRequest):
      return {
        ...state,
      };
    case getType(getLocation.getLocationSuccess):
      return {
        ...state,
        arrLocation: action.payload,
      };

    case getType(getLocation.getLocationFailure):
      return {
        ...state,
      };
    case getType(createLocation.createLocationSuccess):
      return {
        ...state,
        arrLocation: action.payload,
      };
    case getType(createLocation.createLocationFailure):
      return {
        ...state,
      };
    case getType(updateLocation.updateLocationSuccess):
      return {
        ...state,
        arrLocation: action.payload,
      };
    case getType(updateLocation.updateLocationFailure):
      return {
        ...state,
      };
    case getType(deleteLocation.deleteLocationSuccess):
      return {
        ...state,
        arrLocation: action.payload,
      };
    case getType(deleteLocation.deleteLocationFailure):
      return {
        ...state,
      };
    case getType(filInfoLocation.filInfoLocationRequest):
      let newLocatinItem = {};
      newLocatinItem = action.payload;
      state.locationItem = newLocatinItem;
      return {
        ...state,
      };
    default:
      return state;
  }
}
