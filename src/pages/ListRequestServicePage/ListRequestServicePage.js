import React from "react";
import ListRequestServiceContainer from "../../component/ListRequestService/ListRequestServiceContainer";
import ModalListRequestService from "../../component/ListRequestService/ModalListRequestService.js/ModalListRequestService";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ListRequestServicePage.scss";
export default function ListRequestServicePage() {
  
  return (
    <div className="main-screenListRequestServicePage col-12">
    <div className="row">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="content-main col-10">
        <Navbar />
        <ListRequestServiceContainer />
        <ModalListRequestService />
      </div>
    </div>
  </div>
  );
}
