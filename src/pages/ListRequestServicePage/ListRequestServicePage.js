import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ListRequestServiceContainer from "../../component/ListRequestService/ListRequestServiceContainer";
import ModalListRequestService from "../../component/ListRequestService/ModalListRequestService.js/ModalListRequestService";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ListRequestServicePage.scss";
import * as actions from "../../redux/actions/RequestServiceManageAction";
export default function ListRequestServicePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getRequestService.getRequestServiceRequest());
  }, [dispatch]);
  return (
    <div className="main-screenListRequestServicePage col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <ListRequestServiceContainer />
          <ModalListRequestService />
        </div>
      </div>
    </div>
  );
}
