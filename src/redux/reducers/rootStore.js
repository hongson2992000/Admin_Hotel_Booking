import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import ServiceManageReducer from "./ServiceManageReducer";
import ModalReducer from "./ModalReducer";
import LocationManageReducer from "./LocationManageReducer"
import LoginReducer from "./LoginReducer"
import BookingManageReducer from "./BookingManageReducer"
import RoomManageReducer from "./RoomManageReducer"
export default combineReducers({
  LoadingReducer,
  ServiceManageReducer,
  ModalReducer,
  LocationManageReducer,
  LoginReducer,
  BookingManageReducer,
  RoomManageReducer
});
