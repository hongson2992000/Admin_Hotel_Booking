import React, { useEffect } from "react";
import "./CustomerPage.scss";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { USER_LOGIN, USER_ROLE } from "../../utils/constants/settingSystem";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/CustomerManageAction"
export default function CustomerPage() {
  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const userLocal = localStorage.getItem(USER_LOGIN);
    if (userLocal && JSON.parse(userLocal).userRole === USER_ROLE.ADMIN) {
      navigate("/overview");
    } else if (
      userLocal &&
      JSON.parse(userLocal).userRole === USER_ROLE.RECEPTIONIST
    ) {
      navigate("/customerManage");
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
    <div className="main-screenCustomerPage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <Outlet/>
        </div>
      </div>
    </div>
  );
}
