import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import CreateServiceModal from "../../component/ServiceContainer/CreateServiceModal/CreateServiceModal";
import ServiceContainer from "../../component/ServiceContainer/ServiceContainer";
import UpdateServiceModal from "../../component/ServiceContainer/UpdateServiceModal/UpdateServiceModal";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ServicePage.scss";
export default function ServicePage() {
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
