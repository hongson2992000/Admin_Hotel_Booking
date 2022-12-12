import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AccountContainer from "../../component/AccountContainer/AccountContainer";
import CreateAccountModel from "../../component/AccountContainer/CreateAccountModel/CreateAccountModel";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./AccountPage.scss"
import *as actions from "../../redux/actions/AccountManageAction"
import UpdateAccountModel from "../../component/AccountContainer/UpdateAccountModel/UpdateAccountModel";
const AccountPage = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(actions.getAccount.getAccountRequest())
  },[dispatch])
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
        <UpdateAccountModel/>
      </div>
    </div>
  </div>
  );
};

export default AccountPage;
