import React, { useEffect, useState } from "react";
import "./CheckInPage.scss";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import CheckInContainer from "../../component/CheckInContainer/CheckInContainer";
import AddNewCustomerModal from "../../component/CheckInContainer/AddNewCustomerModal/AddNewCustomerModal";
export default function CheckInPage() {
  // console.log("arrNew", renderArr());
  return (
    <div className="main-screenCheckIn col-12">
    <div className="row">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="content-main col-10">
      <Navbar />
        <CheckInContainer />
        <AddNewCustomerModal/>
      </div>
    </div>
  </div>
  );
}
