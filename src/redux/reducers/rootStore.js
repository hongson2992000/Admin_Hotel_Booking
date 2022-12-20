import { combineReducers } from "redux";
import LoadingReducer from "./LoadingReducer";
import ServiceManageReducer from "./ServiceManageReducer";
import ModalReducer from "./ModalReducer";
import LocationManageReducer from "./LocationManageReducer";
import LoginReducer from "./LoginReducer";
import BookingManageReducer from "./BookingManageReducer";
import RoomManageReducer from "./RoomManageReducer";
import RequestServiceReducer from "./RequestServiceReducer";
import SendMessageReducer from "./SendMessageReducer";
import ImageManageReducer from "./ImageManageReducer";
import NewsManageReducer from "./NewsManageReducer";
import InformationHotelManageReducer from "./InformationHotelManageReducer";
import CustomerManageReducer from "./CustomerManageReducer";
import SetUpRoomPriceManageReducer from "./SetUpRoomManageReducer";
import AccountManageReducer from "./AccountManageReducer";
import AlarmManageReducer from "./AlarmManageReducer";
export default combineReducers({
  LoadingReducer,
  ServiceManageReducer,
  ModalReducer,
  LocationManageReducer,
  LoginReducer,
  BookingManageReducer,
  RoomManageReducer,
  RequestServiceReducer,
  SendMessageReducer,
  ImageManageReducer,
  NewsManageReducer,
  InformationHotelManageReducer,
  CustomerManageReducer,
  SetUpRoomPriceManageReducer,
  AccountManageReducer,
  AlarmManageReducer
  
});
