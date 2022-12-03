import React from "react";
import Sidebar from "../../component/Sidebar/Sidebar";
import LocationContainer from "../../component/LocationContainer/LocationContainer";
import Navbar from "../../component/Navbar/Navbar";
import "./LocationPage.scss";
export default function LocationPage() {
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
