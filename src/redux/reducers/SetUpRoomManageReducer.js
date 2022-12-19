import {
  getType,
  getAllRoomToSetUp,
  getAllRoomTypeToSetUp,
} from "../actions/SetUpRoomManageAction";
import { createRoom, filInfoRoom } from "../actions/RoomManageAction";
const initialState = {
  arrRoom: [],
  arrRoomType: [],
  roomItem:{}
};
export default function SetUpRoomPriceManageReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case getType(getAllRoomToSetUp.getAllRoomToSetUpRequest):
      return {
        ...state,
      };
    case getType(getAllRoomToSetUp.getAllRoomToSetUpSuccess):
      return {
        ...state,
        arrRoom: action.payload,
      };
    case getType(getAllRoomToSetUp.getAllRoomToSetUpFailure):
      return {
        ...state,
      };
    case getType(getAllRoomTypeToSetUp.getAllRoomTypeToSetUpRequest):
      return {
        ...state,
      };
    case getType(getAllRoomTypeToSetUp.getAllRoomTypeToSetUpSuccess):
      return {
        ...state,
        arrRoomType: action.payload,
      };
    case getType(getAllRoomTypeToSetUp.getAllRoomTypeToSetUpFailure):
      return {
        ...state,
      };
      case getType(createRoom.createRoomRequest):
      return {
        ...state,
      };
    case getType(createRoom.createRoomSuccess):
      return {
        ...state,
        arrRoomType: action.payload,
      };
    case getType(createRoom.createRoomFailure):
      return {
        ...state,
      };
    case getType(filInfoRoom.filInfoRoomRequest):
      let roomItemNew = {};
      roomItemNew = action.payload;
      state.roomItem = roomItemNew;
      return {
        ...state,
      };
    default:
      return state;
  }
}
