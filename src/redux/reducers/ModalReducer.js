import {
  getType,
  hideModal,
  showModal,
  showModalUpdate,
  hideModalUpdate,
} from "../actions/ModalAction";

const initialState = {
  isShow: false,
  isShowUpdate: false,
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
    case getType(showModalUpdate):
      return {
        ...state,
        isShowUpdate: true,
      };

    case getType(hideModalUpdate):
      return {
        ...state,
        isShowUpdate: false,
      };
    default:
      return state;
  }
}
