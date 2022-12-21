import {
  getType,
  getAllRoomToSetUp,
  getAllRoomTypeToSetUp,
  filInfoRoomType,
  updateRoomType,
} from "../actions/SetUpRoomManageAction";
import {
  createRoom,
  filInfoRoom,
  updateRoom,
} from "../actions/RoomManageAction";
const initialState = {
  arrRoom: [],
  arrRoomType: [],
  roomItem: {},
  roomTypeItem:{}
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
      case getType(updateRoomType.updateRoomTypeSuccess):
        let roomTypeUpdate = [...state.payload]
        let indexUpdateRoomType = roomTypeUpdate.findIndex((item)=>item.id === action.payload.id)
        if(indexUpdateRoomType !== -1){
          roomTypeUpdate[indexUpdateRoomType] = action.payload
        }
        state.arrRoomType = roomTypeUpdate
        return {
          ...state
        };
      case getType(updateRoomType.updateRoomTypeFailure):
        return {
          ...state,
        };
    case getType(createRoom.createRoomRequest):
      return {
        ...state,
      };
    case getType(createRoom.createRoomSuccess):
      let newRoomCreate = [...state.arrRoom];
      newRoomCreate.push(action.payload);
      state.arrRoom = newRoomCreate;
      return {
        ...state,
      };
    case getType(createRoom.createRoomFailure):
      return {
        ...state,
      };
    case getType(updateRoom.updateRoomRequest):
      return {
        ...state,
      };
    case getType(updateRoom.updateRoomSuccess):
      let newRoomUpdate = [...state.arrRoom];
      let indexUpdate = newRoomUpdate.findIndex(
        (item) => item.room.id === action.payload.id
      );
      console.log("INDEXUPDATE",indexUpdate)
      if (indexUpdate !== -1) {
        newRoomUpdate[indexUpdate] = action.payload;
      }
      state.arrRoom = newRoomUpdate;
      return {
        ...state,
      };
    case getType(updateRoom.updateRoomFailure):
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
      case getType(filInfoRoomType.filInfoRoomTypeRequest):
        let roomTypeItemNew = {};
        roomTypeItemNew = action.payload;
        state.roomTypeItem = roomTypeItemNew;
        return {
          ...state,
        };
    default:
      return state;
  }
}
