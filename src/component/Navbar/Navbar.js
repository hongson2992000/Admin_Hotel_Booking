import React, { useCallback, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors/UserSelector";
import { useNavigate } from "react-router-dom";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import BadgeIcon from "@mui/icons-material/Badge";
import ModalProfile from "../ModalProfile/ModalProfile";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { showModalProfile } from "../../redux/actions/ModalAction";
import * as actions from "../../redux/actions/AccountManageAction";
import { USER_LOGIN } from "../../utils/constants/settingSystem";
export default function Navbar() {
  const menuRef = useRef();
  const imgRef = useRef();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const Menus = ["Đăng Xuất"];
  // const userInfo = useSelector(userState$);
  const navigate = useNavigate();
  const userLocal = localStorage.getItem(USER_LOGIN);
  const userInfo = JSON.parse(userLocal);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleProfile = useCallback(() => {
    dispatch(
      actions.filInfoProfile.filInfoProfileRequest({
        firstName: userInfo.firstName,
        middleName: userInfo.middleName,
        lastName: userInfo.lastName,
        gender: userInfo.gender,
        dateOfBirth: userInfo.dateOfBirth,
        phoneNumber: userInfo.phoneNumber,
        username: userInfo.username,
        password: userInfo.password,
      })
    );
    dispatch(showModalProfile());
  }, [dispatch, userInfo]);
  let subMenu = document.getElementById("subMenu");
  const toggleMenu = () => {
    subMenu.classList.toggle("open-menu");
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div></div>
        <div className="items">
          <div></div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          {/* <div className="item relative" onClick={() => setOpen(!open)}>
          <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <span ref={imgRef} className="username">
              {userInfo.lastName} {userInfo.firstName}
            </span>
            <KeyboardArrowDownIcon className="text-gray-400 text-14" />
          </div> */}

          {/* {open && (
            <div ref={menuRef} className="menu shadow-lg">
              {Menus.map((menu) => (
                <span
                  onClick={() => handleLogout()}
                  className="p-2 text-lg cursor-pointer rounded"
                  key={menu}
                >
                  <LogoutIcon className="text-gray-400 text-14" /> {menu}
                </span>
              ))}
            </div>
          )} */}
          <div
            className="item relative"
            onClick={() => {
              toggleMenu();
            }}
          >
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            <span ref={imgRef} className="username">
              {userInfo.lastName} {userInfo.firstName}
            </span>
            <KeyboardArrowDownIcon className="text-gray-400 text-14" />
          </div>
          <div className="sub-menu-wrap" id="subMenu">
            <div className="sub-menu">
              <div className="user-info">
                <img
                  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                  className="avatar"
                />
                <h5>{userInfo.lastName} {userInfo.firstName}</h5>
              </div>
              <hr />
              <div
                className="sub-menu-link"
                onClick={() => {
                  handleProfile();
                }}
              >
                <p>
                  <BadgeIcon className="icon" />
                </p>
                <p>Chỉnh sửa thông tin</p>
              </div>
              <div className="sub-menu-link">
                <p>
                  <SettingsIcon className="icon" />
                </p>
                <p>Cài đặt</p>
              </div>
              <div className="sub-menu-link">
                <p>
                  <HelpIcon className="icon" />
                </p>
                <p>Hỗ trợ</p>
              </div>
              <div
                className="sub-menu-link"
                onClick={() => {
                  handleLogout();
                }}
              >
                <p>
                  <LogoutIcon className="icon" />
                </p>
                <p>Đăng xuất</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalProfile />
    </div>
  );
}
