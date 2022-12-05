import React, { useEffect } from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import LocationContainer from "../../component/LocationContainer/LocationContainer";
import Navbar from "../../component/Navbar/Navbar";
import "./LocationPage.scss";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/LocationManageAction";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
export default function LocationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/location");
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
    dispatch(actions.getLocation.getLocationRequest());
  }, [navigate, dispatch]);
  return (
    <div className="main-screenLocationPage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <LocationContainer />
        </div>
      </div>
    </div>
  );
}
