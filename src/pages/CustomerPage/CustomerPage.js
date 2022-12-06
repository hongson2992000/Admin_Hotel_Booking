import React from "react";
import "./CustomerPage.scss";
import Sidebar from "../../component/Sidebar/Sidebar";
import Navbar from "../../component/Navbar/Navbar";
import ListCustomerContainer from "../../component/ListCustomerContainer/ListCustomerContainer";
import { Outlet, useParams } from "react-router-dom";
export default function CustomerPage() {
  const params = useParams();
  return (
    <div className="main-screenCustomerPage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          {Object.getOwnPropertyNames(params).length === 0 ? (
            <ListCustomerContainer />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
