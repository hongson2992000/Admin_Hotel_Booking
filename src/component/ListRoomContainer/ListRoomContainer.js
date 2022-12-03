import React from "react";
import Room from "./Room/Room";
import "./ListRoomContainer.scss";

import PopupSendMessage from "./PopupSendMessage/PopupSendMessage";
export default function ListRoomContainer() {
  
  return (
    <div className="ListRoomContainer ">
      <div className="RoomContainer">
        <Room/>
        <PopupSendMessage/>
      </div>
    </div>
  );
}
