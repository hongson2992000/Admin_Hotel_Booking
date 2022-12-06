import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAllImage = createActions({
  getAllImageRequest: undefined,
  getAllImageSuccess: (payload) => payload,
  getAllImageFailure: (err) => err,
});
