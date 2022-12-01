import React, { useEffect } from "react";
import Room from "./Room/Room";
import "./ListRoomContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import { roomManageState$ } from "../../redux/selectors/RoomManageSelector";
import * as actions from "../../redux/actions/RoomManageAction";
export default function ListRoomContainer() {
  
  return (
    <div className="ListRoomContainer ">
      <div className="RoomContainer">
        <Room/>
      </div>
    </div>
  );
}
