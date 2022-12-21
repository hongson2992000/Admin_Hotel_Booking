import {
  getHotelService,
  getType,
  createNewHotelService,
  updateHotelService,
  deleteHotelService,
  filInfoHotelService,
} from "../actions/ServiceManageAction";

const initialState = {
  arrService: [],
  serviceItem: {},
};
export default function ServiceManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getHotelService.getHotelServiceRequest):
      return {
        ...state,
      };
    case getType(getHotelService.getHotelServiceSuccess):
      return {
        ...state,
        arrService: action.payload,
      };

    case getType(getHotelService.getHotelServiceFailure):
      return {
        ...state,
      };
    case getType(createNewHotelService.createHotelServiceSuccess):
      let newCreateService = [...state.arrService];
      newCreateService.push(action.payload);
      state.arrService = newCreateService;
      return {
        ...state,
      };
    case getType(createNewHotelService.createHotelServiceFailure):
      return {
        ...state,
      };
    case getType(updateHotelService.updateHotelServiceSuccess):
      let newUpdateService = [...state.arrService];
      let index = newUpdateService.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        newUpdateService[index] = action.payload;
      }
      state.arrService = newUpdateService;
      return {
        ...state,
      };
    case getType(updateHotelService.updateHotelServiceFailure):
      return {
        ...state,
      };
    case getType(deleteHotelService.deleteHotelServiceSuccess):
      let newDeleteService = [...state.arrService];
      let indexDelete = newDeleteService.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexDelete !== -1) {
        newDeleteService[indexDelete] = action.payload;
      }
      state.arrService = newDeleteService;
      return {
        ...state,
      };
    case getType(deleteHotelService.deleteHotelServiceFailure):
      return {
        ...state,
      };
    case getType(filInfoHotelService.filInfoHotelServiceRequest):
      return {
        ...state,
        serviceItem: action.payload,
      };
    default:
      return state;
  }
}
