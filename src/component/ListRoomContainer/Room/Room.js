import React from "react";
import "./Room.scss";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
export default function Room({ data }) {
  return (
    <div className="RoomItem row">
      {data &&
        data.map((item, i) => {
          if (!item.status) {
            return (
              <div className="RoomDetail col-3">
                <div className="RoomTitile">
                  <p>{item.description}</p>
                </div>
                <div className="RoomNo">
                  <p>{item.roomNo}</p>
                </div>
                <a href="#">
                  <MenuOpenIcon className="icon" />
                </a>
              </div>
            );
          } else {
            return (
              <div className="RoomDetailEmpty col-3">
                <div className="RoomTitile">
                  <p>{item.description}</p>
                </div>
                <div className="RoomNo">
                  <p>{item.roomNo}</p>
                </div>
                <a href="#">
                  <MenuOpenIcon className="icon" />
                </a>
              </div>
            );
          }
        })}
    </div>
  );
}
