import { getType, getAllRoomToSetUp, getAllRoomTypeToSetUp } from "../actions/SetUpRoomManageAction";

const initialState = {
  arrRoom: [],
  arrRoomType: [],
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
    default:
      return state;
  }
}
