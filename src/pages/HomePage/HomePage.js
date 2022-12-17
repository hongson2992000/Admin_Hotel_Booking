/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import OverviewContainer from "../../component/OverviewContainer/OverviewContainer";
import Sidebar from "../../component/Sidebar/Sidebar";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import "./HomePage.scss";
export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/overview");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOTEL_MANAGE
    ) {
      navigate("/overview");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RECEPTIONIST
    ) {
      navigate("/roomManage");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
    ) {
      navigate("/roomManage");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
    ) {
      navigate("/roomManage");
    }
  }, []);

  return (
    <div className="main-screenDashBoard col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          {/* <Navbar /> */}
          <OverviewContainer />
        </div>
      </div>
    </div>
  );
}
