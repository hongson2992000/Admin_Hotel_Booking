import { getType, hideModal, showModal } from "../actions/ModalAction";

const initialState = {
  isShow: false,
};
export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case getType(showModal):
      return {
        ...state,
        isShow: true,
      };

    case getType(hideModal):
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
}
