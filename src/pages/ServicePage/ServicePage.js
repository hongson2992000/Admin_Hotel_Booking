import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../component/Navbar/Navbar";
import CreateServiceModal from "../../component/ServiceContainer/CreateServiceModal/CreateServiceModal";
import ServiceContainer from "../../component/ServiceContainer/ServiceContainer";
import UpdateServiceModal from "../../component/ServiceContainer/UpdateServiceModal/UpdateServiceModal";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ServicePage.scss";
import * as actions from "../../redux/actions/ServiceManageAction";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
export default function ServicePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/service");
      dispatch(actions.getHotelService.getHotelServiceRequest());
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
  }, [navigate, dispatch]);
  return (
    <div className="main-screenServicePage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <CreateServiceModal />
          <UpdateServiceModal />
          <ServiceContainer />
        </div>
      </div>
    </div>
  );
}
