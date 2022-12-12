export const roomManageState$ = (state) => state.RoomManageReducer.arrRoom;
export const roomValidState$ = (state) =>
  state.RoomManageReducer.roomAvailability;

export const roomTypeState$ = (state) => state.RoomManageReducer.roomType;
export const roomTypesState$ = (state) => state.RoomManageReducer.arrRoomTypes;

export const setRoomPriceState$ = (state) => state.RoomManageReducer.roomPrice;
