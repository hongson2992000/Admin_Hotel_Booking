import {
  getAllRoom,
  getType,
  getRoomAvailability,
  getRoomTypeById,
  getAllRoomType,
  setRoomPrice,
} from "../actions/RoomManageAction";

const initialState = {
  arrRoom: [],
  // bookingItem: {},
  // userInfoBooking: [],
  roomAvailability: [],
  roomType: {},
  arrRoomTypes: [],
  roomPrice: {},
};
export default function RoomManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAllRoom.getAllRoomRequest):
      return {
        ...state,
      };
    case getType(getAllRoom.getAllRoomSuccess):
      return {
        ...state,
        arrRoom: action.payload,
      };
    case getType(getAllRoom.getAllRoomFailure):
      return {
        ...state,
      };
    case getType(getRoomAvailability.getRoomAvailabilityRequest):
      return {
        ...state,
      };
    case getType(getRoomAvailability.getRoomAvailabilitySuccess):
      return {
        ...state,
        roomAvailability: action.payload,
      };
    case getType(getRoomAvailability.getRoomAvailabilityFailure):
      return {
        ...state,
      };
    case getType(getRoomTypeById.getRoomTypeByIdRequest):
      return {
        ...state,
      };
    case getType(getRoomTypeById.getRoomTypeByIdSuccess):
      return {
        ...state,
        roomType: action.payload,
      };
    case getType(getRoomTypeById.getRoomTypeByIdFailure):
      return {
        ...state,
      };
    case getType(getAllRoomType.getAllRoomTypeRequest):
      return {
        ...state,
      };
    case getType(getAllRoomType.getAllRoomTypeSuccess):
      return {
        ...state,
        arrRoomTypes: action.payload,
      };
    case getType(getAllRoomType.getAllRoomTypeFailure):
      return {
        ...state,
      };
    case getType(setRoomPrice.setRoomPriceRequest):
      return {
        ...state,
      };
    case getType(setRoomPrice.setRoomPriceSuccess):
      return {
        ...state,
        roomPrice: action.payload,
      };
    case getType(setRoomPrice.setRoomPriceFailure):
      return {
        ...state,
      };
    default:
      return state;
  }
}
