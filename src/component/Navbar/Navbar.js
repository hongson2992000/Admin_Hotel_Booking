import React, { useRef, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "./Navbar.scss";
export default function Navbar() {
  const menuRef = useRef();
  const imgRef = useRef();

  const [open, setOpen] = useState(false);
  const Menus = ["Đăng xuất"];

  // window.addEventListener("click", (e) => {
  //   if (e.target !== menuRef.current && e.target !== imgRef) {
  //     setOpen(false);
  //   }
  //   // console.log(e.target);
  // });

  return (
    <div className="navbar">
      <div className="wrapper">
        <div></div>
        <div className="items">
          <div></div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item relative" onClick={() => setOpen(!open)}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <span ref={imgRef} className="username">
              Thức Nguyễn
            </span>
            <KeyboardArrowDownIcon className="text-gray-400 text-14" />
          </div>

          {open && (
            <div ref={menuRef} className="menu shadow-lg">
              {Menus.map((menu) => (
                <span
                  onClick={() => setOpen(false)}
                  className="p-2 text-lg cursor-pointer rounded"
                  key={menu}
                >
                  {menu}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
