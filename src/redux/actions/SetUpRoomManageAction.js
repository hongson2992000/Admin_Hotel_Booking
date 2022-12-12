import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllRoomToSetUp = createActions({
    getAllRoomToSetUpRequest: undefined,
    getAllRoomToSetUpSuccess: (payload) => payload,
    getAllRoomToSetUpFailure: (err) => err,
});
export const createNewHotelService = createActions({
  createHotelServiceRequest: (payload) => payload,
  createHotelServiceSuccess: (payload) => payload,
  createHotelServiceFailure: (err) => err,
});
export const updateHotelService = createActions({
  updateHotelServiceRequest: (payload) => payload,
  updateHotelServiceSuccess: (payload) => payload,
  updateHotelServiceFailure: (err) => err,
});

export const deleteHotelService = createActions({
  deleteHotelServiceRequest: (payload) => payload,
  deleteHotelServiceSuccess: (payload) => payload,
  deleteHotelServiceFailure: (err) => err,
});

export const filInfoHotelService = createActions({
  filInfoHotelServiceRequest: (payload) => payload,
});
//RoomType
export const getAllRoomTypeToSetUp = createActions({
  getAllRoomTypeToSetUpRequest: undefined,
  getAllRoomTypeToSetUpSuccess: (payload) => payload,
  getAllRoomTypeToSetUpFailure: (err) => err,
});