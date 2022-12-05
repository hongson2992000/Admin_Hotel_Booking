import React from "react";
import AccountContainer from "../../component/AccountContainer/AccountContainer";
import CreateAccountModel from "../../component/AccountContainer/CreateAccountModel/CreateAccountModel";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./AccountPage.scss"

const AccountPage = () => {
  return (
    <div className="main-screenAccountPage col-12">
    <div className="row">
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="content-main col-10">
        <Navbar />
        <CreateAccountModel />
        <AccountContainer />
      </div>
    </div>
  </div>
  );
};

export default AccountPage;
