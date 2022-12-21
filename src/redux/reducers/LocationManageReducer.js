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
      let newCreateLocation = [...state.arrLocation];
      newCreateLocation.push(action.payload);
      state.arrLocation = newCreateLocation;
      return {
        ...state,
      };
    case getType(createLocation.createLocationFailure):
      return {
        ...state,
      };
    case getType(updateLocation.updateLocationSuccess):
      let newUpdateLocation = [...state.arrLocation];
      let index = newUpdateLocation.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        newUpdateLocation[index] = action.payload;
      }
      state.arrLocation = newUpdateLocation;
      return {
        ...state,
      };
    case getType(updateLocation.updateLocationFailure):
      return {
        ...state,
      };
    case getType(deleteLocation.deleteLocationSuccess):
      let newDeleteLocation = [...state.arrLocation];
      let indexDelete = newDeleteLocation.findIndex((item)=>item.id === action.payload.id);
      if(index !==-1){
        newDeleteLocation[indexDelete] = action.payload
      }
      state.arrLocation = newDeleteLocation
      return {
        ...state,
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
