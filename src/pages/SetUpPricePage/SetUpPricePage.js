import React, { useEffect } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import "./SetUpPricePage.scss";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import SetUpPriceRoomContainer from "../../component/SetUpPriceRoomContainer/SetUpPriceRoomContainer";
export default function SetUpPricePage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/setUpPriceRoom");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOTEL_MANAGE
    ) {
      navigate("/listRoom");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
    ) {
      navigate("/listRoom");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
    ) {
      navigate("/listRoom");
    }
  }, [navigate]);
  return (
    <div className="main-screenSetUpPrice col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <SetUpPriceRoomContainer/>
        </div>
      </div>
    </div>
  );
}
