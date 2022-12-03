import React, { useEffect, useState } from "react";
import "./CustomerPage.scss";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import ListCustomerContainer from "../../component/ListCustomerContainer/ListCustomerContainer";
export default function CustomerPage() {
  // console.log("arrNew", renderArr());
  return (
    <div className="main-screenCustomerPage col-12">
    <div className="row">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="content-main col-10">
        <Navbar />
        <ListCustomerContainer/>
      </div>
    </div>
  </div>
  );
}
