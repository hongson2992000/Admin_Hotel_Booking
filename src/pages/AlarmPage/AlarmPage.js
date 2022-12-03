import React from "react";
import AlarmContainer from "../../component/AlarmContainer/AlarmContainer";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";

export default function AlarmPage() {
  return (
    <div className="main-screenAlarmPage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <AlarmContainer />
        </div>
      </div>
    </div>
  );
}
