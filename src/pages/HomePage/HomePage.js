import React, { useEffect } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import OverviewContainer from "../../component/OverviewContainer/OverviewContainer";
import "./HomePage.scss";
import Navbar from "../../component/Navbar/Navbar";
import moment from "moment";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/BookingManageAction";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
export default function HomePage() {
  const currentDate = moment().format("DD/MM/yyyy");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const userLocal = localStorage.getItem(USER_LOGIN);
  //   if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
  //     navigate("/overview");
  //   } else if (
  //     userLocal &&
  //     JSON.parse(userLocal).userRole === USER_ROLE.HOTEL_MANAGE
  //   ) {
  //     navigate("/overview");
  //   } else if (
  //     userLocal &&
  //     JSON.parse(userLocal).userRole === USER_ROLE.RECEPTIONIST
  //   ) {
  //     navigate("/roomManage");
  //   } else if (
  //     userLocal &&
  //     JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
  //   ) {
  //     navigate("/roomManage");
  //   } else if (
  //     userLocal &&
  //     JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
  //   ) {
  //     navigate("/roomManage");
  //   }
  //   // dispatch(
  //   //   actions.getDashBoardOverview.getDashBoardOverviewRequest(currentDate)
  //   // );
  // }, [currentDate, navigate, dispatch]);
  return (
    <div className="main-screenDashBoard col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <OverviewContainer />
        </div>
      </div>
    </div>
  );
}
