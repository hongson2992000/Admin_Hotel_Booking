import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ListRoomPage.scss";
import * as actions from "../../redux/actions/RoomManageAction";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import { Outlet, useNavigate } from "react-router-dom";
export default function ListRoomPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/overview");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RECEPTIONIST
    ) {
      // navigate("/roomManage");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.HOUSEKEEPING
    ) {
      navigate("/roomManage");
      dispatch(actions.getAllRoom.getAllRoomRequest());
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RESTAURANT
    ) {
      navigate("/roomManage");
      dispatch(actions.getAllRoom.getAllRoomRequest());
    }
  }, [navigate, dispatch]);
  return (
    <div className="main-screenListRoom col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
