import React, { useEffect } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import "./SetupRoomPage.scss";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import SetUpRoomContainer from "../../component/SetUpRoomContainer/SetUpRoomContainer";
import * as actions from "../../redux/actions/SetUpRoomManageAction"
import { useDispatch } from "react-redux";
export default function SetupRoomPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/setUpRoom");
      dispatch(actions.getAllRoomToSetUp.getAllRoomToSetUpRequest())
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOTEL_MANAGE
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
  }, [navigate]);
  return (
    <div className="main-screenSetupRoom col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <SetUpRoomContainer/>
        </div>
      </div>
    </div>
  );
}
