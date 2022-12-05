import React from "react";
import ListTurnDownServiceContainer from "../../component/ListRequestService/ListTurnDownServiceContainer/ListTurnDownServiceContainer";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ListTurnDownServicePage.scss";
export default function ListTurnDownServicePage() {
  // let isSuccess = useSelector(successState$);
  return (
    <div className="main-screenListTurnDownServicePage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <ListTurnDownServiceContainer />
        </div>
      </div>
    </div>
  );
}
