import {
  getAllRoom,
  getType,
  getRoomAvailability,
  getRoomTypeById,
  getRoomTypeByRoomId,
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
    case getType(getRoomTypeByRoomId.getRoomTypeByRoomIdRequest):
      return {
        ...state,
      };
    case getType(getRoomTypeByRoomId.getRoomTypeByRoomIdSuccess):
      return {
        ...state,
        roomType: action.payload,
      };
    case getType(getRoomTypeByRoomId.getRoomTypeByRoomIdFailure):
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
    case getType(setRoomPrice.removeSetRoomPrice):
      return {
        ...state,
        roomPrice: {},
      };
    default:
      return state;
  }
}
