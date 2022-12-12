import {
  getAllRoom,
  getType,
  getRoomAvailability,
  getRoomTypeById,
  getRoomTypeByRoomId,
} from "../actions/RoomManageAction";

const initialState = {
  arrRoom: [],
  // bookingItem: {},
  // userInfoBooking: [],
  roomAvailability: [],
  roomType: {},
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
    default:
      return state;
  }
}
