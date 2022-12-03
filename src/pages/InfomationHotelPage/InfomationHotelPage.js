import React from "react";
import InformationHotelContainer from "../../component/InfomationHotelContainer/InformationHotelContainer";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";

export default function InfomationHotelPage() {
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
