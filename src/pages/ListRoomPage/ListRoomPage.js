import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListRoomContainer from "../../component/ListRoomContainer/ListRoomContainer";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";
import "./ListRoomPage.scss";
import * as actions from "../../redux/actions/RoomManageAction";
import { roomManageState$ } from "../../redux/selectors/RoomManageSelector";
export default function ListRoomPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getAllRoom.getAllRoomRequest());
  }, [dispatch]);
  return (
    <div className="main-screenListRoom col-12">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content-main col-10">
          <Navbar />
          <ListRoomContainer />
        </div>
      </div>
    </div>
  );
}
