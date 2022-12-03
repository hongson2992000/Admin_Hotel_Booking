import React from "react";
import ListTurnDownServiceContainer from "../../component/ListRequestService/ListTurnDownServiceContainer/ListTurnDownServiceContainer";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ListTurnDownServicePage.scss";
export default function ListTurnDownServicePage() {
  // let isSuccess = useSelector(successState$);
  return (
    <div className="main-screen">
      {/* {isSuccess ? <PopupSucess /> : ""} */}
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ListTurnDownServiceContainer />
        {/* <ModalListRequestService/> */}
      </div>
    </div>
  );
}
