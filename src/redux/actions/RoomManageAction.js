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

export const getAllRoomType = createActions({
  getAllRoomTypeRequest: undefined,
  getAllRoomTypeSuccess: (payload) => payload,
  getAllRoomTypeFailure: (err) => err,
});

export const setRoomPrice = createActions({
  setRoomPriceRequest: (payload) => payload,
  setRoomPriceSuccess: (payload) => payload,
  setRoomPriceFailure: (err) => err,
});
