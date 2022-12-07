import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getInformationHotel = createActions({
  getInformationHotelRequest: (payload) => payload,
  getInformationHotelSuccess: (payload) => payload,
  getInformationHotelFailure: (err) => err,
});
export const updateInformationHotel = createActions({
  updateInformationHotelRequest: (payload) => payload,
  updateInformationHotelSuccess: (payload) => payload,
  updateInformationHotelFailure: (err) => err,
});
