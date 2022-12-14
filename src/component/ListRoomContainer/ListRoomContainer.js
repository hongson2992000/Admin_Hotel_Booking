import React from "react";
import Room from "./Room/Room";
import "./ListRoomContainer.scss";

export default function ListRoomContainer() {
  
  return (
    <div className="ListRoomContainer ">
      <div className="RoomContainer">
        <Room/>
      </div>
    </div>
  );
}
