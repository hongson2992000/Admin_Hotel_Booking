import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListBookingContainer from "../../component/ListBookingContainer/ListBookingContainer";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import "./ListBookingPage.scss";
import * as actions from "../../redux/actions/BookingManageAction";
import { useDispatch } from "react-redux";
export default function ListBookingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch;
  // useEffect(() => {
  //   // const userLocal = localStorage.getItem(USER_LOGIN);
  //   // if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
  //   //   navigate("/overview");
  //   // } else if (
  //   //   userLocal &&
  //   //   JSON.parse(userLocal).userRole === USER_ROLE.HOTEL_MANAGE
  //   // ) {
  //   //   navigate("/listBooking");
     
  //   // } else if (
  //   //   userLocal &&
  //   //   JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
  //   // ) {
  //   //   navigate("/listRoom");
  //   // } else if (
  //   //   userLocal &&
  //   //   JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
  //   // ) {
  //   //   navigate("/listRoom");
  //   // }
  //   dispatch(actions.getAllBooking.getAllBookingRequest());
  // }, [navigate, dispatch]);
  // useEffect(() => {
  //   const userLocal = localStorage.getItem(USER_LOGIN);
  //   if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
  //     navigate("/overview");
  //   } else if (
  //     userLocal &&
  //     JSON.parse(userLocal).userRole === USER_ROLE.HOTEL_MANAGE
  //   ) {
  //     navigate("/listBooking");
  //     // dispatch(actions.getAllBooking.getAllBookingRequest());
  //   } else if (
  //     userLocal &&
  //     JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
  //   ) {
  //     navigate("/listRoom");
  //     // dispatch(actions.getAllRoom.getAllRoomRequest());
  //   } else if (
  //     userLocal &&
  //     JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
  //   ) {
  //     navigate("/listRoom");
  //     // dispatch(actions.getAllRoom.getAllRoomRequest());
  //   }
  // }, [navigate, dispatch]);
  return (
    <div className="main-screenListBookingPage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <ListBookingContainer />
        </div>
      </div>
    </div>
  );
}
