import React from "react";
import "./InfomationCustomerPage.scss";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import InfomationCustomerContainer from "../../component/InfomationCustomerContainer/InfomationCustomerContainer";
import { Outlet } from "react-router-dom";
export default function InfomationCustomerPage() {
  return (
    <div className="main-screenInfomationCustomer col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <InfomationCustomerContainer />
        </div>
      </div>
      <Outlet/>
    </div>
  );
}
