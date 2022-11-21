import React, { useRef, useState } from "react";
import "./Room.scss";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Room({ data }) {
  const MenusEmpty = [{ name: "Tạo đặt phòng", id: 0 }];
  const MenusNotEmpty = [{ name: "Xem thông tin khách", id: 0 }, { name: "Gửi thông báo", id: 1 }, { name: "Check out", id: 2 }];
  const [openNotEmpty, setOpenNotEmpty] = useState({ id: 0, display: false });
  const [openEmpty, setOpenEmpty] = useState({ id: 0, display: false });

  return (
    <div className="RoomItem row">
      {data &&
        data.map((item, i) => {
          if (!item.status) {
            return (
              <div className="RoomDetail col-3" key={i}>
                <div className="RoomTitile">
                  <p>{item.description}</p>
                </div>
                <div className="RoomNo">
                  <p>{item.roomNo}</p>
                </div>
                <div className="rowIcon">
                  <TouchAppIcon
                    onClick={() => {
                      setOpenNotEmpty({ id: item.id, display: !openNotEmpty.display });
                    }}
                    className="icon"
                  />
                  <RoomServiceIcon className="icon" />
                </div>
                {(openNotEmpty.display && openNotEmpty.id === item.id) && (
                  <div className="dropDownTouch">
                    <div>
                      <KeyboardArrowUpIcon />
                    </div>
                    <div onClick={() => setOpenNotEmpty({ id: item.id })}>
                      {MenusNotEmpty.map((menu) => (
                        <span onClick={() => console.log(i + ` ${menu.id}`)} className="menuhover" key={menu.id}>
                          {menu.name}
                        </span>))}
                    </div>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div className="RoomDetailEmpty col-3" key={i}>
                <div className="RoomTitile">
                  <p>{item.description}</p>
                </div>
                <div className="RoomNo">
                  <p>{item.roomNo}</p>
                </div>
                <div className="rowIcon">
                  <RoomServiceIcon
                    onClick={() => {
                      setOpenEmpty({ id: item.id, display: !openEmpty.display });
                    }}
                    className="icon"
                  />
                </div>
                {(openEmpty.display && openEmpty.id === item.id) && (
                  <div className="dropDownTouch">
                    <div>
                      <KeyboardArrowUpIcon />
                    </div>
                    <div onClick={() => setOpenEmpty({ id: item.id })}>
                      {MenusEmpty.map((menu) => (
                        <span className="menuhover" key={menu}>
                          {menu.name}
                        </span>))}
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}
    </div>
  );
}
// {open && (
//   <div className="dropDown">
//     {MenusNotEmpty.map((menu) => (
//       <span onClick={() => setOpen(false)} key={menu}>
//         {menu}
//       </span>
//     ))}
//   </div>
// )}
