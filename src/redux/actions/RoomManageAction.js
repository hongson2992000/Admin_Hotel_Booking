import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllRoom = createActions({
  getAllRoomRequest: undefined,
  getAllRoomSuccess: (payload) => payload,
  getAllRoomFailure: (err) => err,
});
export const getRoomAvailability = createActions({
  getRoomAvailabilityRequest: (payload) => payload,
  getRoomAvailabilitySuccess: (payload) => payload,
  getRoomAvailabilityFailure: (err) => err,
});
export const getRoomTypeById = createActions({
  getRoomTypeByIdRequest: (payload) => payload,
  getRoomTypeByIdSuccess: (payload) => payload,
  getRoomTypeByIdFailure: (err) => err,
});
export const getRoomTypeByRoomId = createActions({
  getRoomTypeByRoomIdRequest: (payload) => payload,
  getRoomTypeByRoomIdSuccess: (payload) => payload,
  getRoomTypeByRoomIdFailure: (err) => err,
});

export const getAllRoomType = createActions({
  getAllRoomTypeRequest: undefined,
  getAllRoomTypeSuccess: (payload) => payload,
  getAllRoomTypeFailure: (err) => err,
});

export const setRoomPrice = createActions({
  setRoomPriceRequest: (payload) => payload,
  setRoomPriceSuccess: (payload) => payload,
  setRoomPriceFailure: (err) => err,
  removeSetRoomPrice: undefined,
});
export const createRoom = createActions({
  createRoomRequest: (payload) => payload,
  createRoomSuccess: (payload) => payload,
  createRoomFailure: (err) => err,
});
export const updateRoom = createActions({
  updateRoomRequest: (payload) => payload,
  updateRoomSuccess: (payload) => payload,
  updateRoomFailure: (err) => err,
});

export const deleteRoom = createActions({
  deleteRoomRequest: (payload) => payload,
  deleteRoomSuccess: (payload) => payload,
  deleteRoomFailure: (err) => err,
});

export const filInfoRoom = createActions({
  filInfoRoomRequest: (payload) => payload,
});