import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import ServiceManageReducer from "./ServiceManageReducer";
import ModalReducer from "./ModalReducer";
export default combineReducers({
  LoadingReducer,
  ServiceManageReducer,
  ModalReducer
});
