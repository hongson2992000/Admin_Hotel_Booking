import React, { useEffect, useState } from "react";
import "./CheckInPage.scss";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import CheckInContainer from "../../component/CheckInContainer/CheckInContainer";
export default function CheckInPage() {
  // console.log("arrNew", renderArr());
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <CheckInContainer />
      </div>
    </div>
  );
}
