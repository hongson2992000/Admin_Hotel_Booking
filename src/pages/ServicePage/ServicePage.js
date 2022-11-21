import React, { useEffect, useState } from "react";
import "./ServicePage.scss";
import Sidebar from "../../component/Sidebar/Sidebar";
import ServiceContainer from "../../component/ServiceContainer/ServiceContainer";
import Navbar from "../../component/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { serviceManageState$ } from "../../redux/selectors/ServiceManageSelector";
import * as actions from "../../redux/actions/ServiceManageAction";
import CreateServiceModal from "../../component/ServiceContainer/CreateServiceModal/CreateServiceModal";
import UpdateServiceModal from "../../component/ServiceContainer/UpdateServiceModal/UpdateServiceModal";
export default function ServicePage() {
  

  // console.log("arrNew", renderArr());
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <CreateServiceModal />
        <UpdateServiceModal/>
        <ServiceContainer  />
      </div>
    </div>
  );
}
