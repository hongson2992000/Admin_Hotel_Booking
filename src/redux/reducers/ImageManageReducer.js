import { getAllImage,getType } from "../actions/ImageManageAction";

const initialState = {
  arrImage: [],
};
export default function ImageManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getAllImage.getAllImageRequest):
      return {
        ...state,
      };
    case getType(getAllImage.getAllImageSuccess):
      return {
        ...state,
        arrImage: action.payload,
      };
    case getType(getAllImage.getAllImageFailure):
      return {
        ...state,
      };
    default:
      return state;
  }
}
