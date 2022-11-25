import {
    getAllRoom,
    getType,

  } from "../actions/RoomManageAction";
  
  const initialState = {
    arrRoom: [],
    // bookingItem: {},
    // userInfoBooking: [],
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
      default:
        return state;
    }
  }
  