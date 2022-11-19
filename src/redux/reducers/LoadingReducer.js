import {
  DISPLAY_LOADING,
  HIDE_LOADING,
} from "../../utils/constants/settingSystem";
const initialState = {
  isLoading: false,
};

export default function LoadingReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
