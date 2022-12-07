import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InformationHotelContainer from "../../component/InfomationHotelContainer/InformationHotelContainer";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import * as actions from "../../redux/actions/InformationHotelManageAction"
export default function InfomationHotelPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/infomationHotel");
      dispatch(actions.getInformationHotel.getInformationHotelRequest({id:1}));
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
  }, [navigate, dispatch]);
  return (
    <div className="main-screenInfomationHotelPage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <InformationHotelContainer/>
        </div>
      </div>
    </div>
  );
}
