import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getHotelService = createActions({
  getHotelServiceRequest: undefined,
  getHotelServiceSuccess: (payload) => payload,
  getHotelServiceFailure: (err) => err,
});
export const createNewHotelService = createActions({
  createHotelServiceRequest: (payload) => payload,
  createHotelServiceSuccess: (payload) => payload,
  createHotelServiceFailure: (err) => err,
});
