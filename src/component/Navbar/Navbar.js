import React, { useCallback, useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors/UserSelector";
import { turnDownServiceManageState$ } from "../../redux/selectors/RequestServiceManageSelector";
import { useNavigate } from "react-router-dom";
import { NotificationsNoneOutlined } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import BadgeIcon from "@mui/icons-material/Badge";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ModalProfile from "../ModalProfile/ModalProfile";
import {
  showModalCheckOutService,
  showModalProfile,
} from "../../redux/actions/ModalAction";
import * as actions from "../../redux/actions/AccountManageAction";
import * as actionRequestService from "../../redux/actions/RequestServiceManageAction";
import {
  BOOKED,
  CHECKOUT,
  DONE,
  PROCESSING,
  USER_LOGIN,
  USER_ROLE,
} from "../../utils/constants/settingSystem";
import ModalAllRequestService from "./ModalAllRequestService/ModalAllRequestService";
export default function Navbar() {
  const menuRef = useRef();
  const imgRef = useRef();
  const dispatch = useDispatch();
  const Menus = ["Đăng Xuất"];
  // const userInfo = useSelector(userState$);
  const navigate = useNavigate();
  const userLocal = localStorage.getItem(USER_LOGIN);
  const userInfo = JSON.parse(userLocal);
  const listRequestService = useSelector(turnDownServiceManageState$);
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
        userRole: userInfo.userRole,
      })
    );
    dispatch(showModalProfile());
  }, [dispatch, userInfo]);
  let subMenu = document.getElementById("subMenu");
  let subMenuNotifi = document.getElementById("subMenuNotifi");
  const toggleMenu = () => {
    subMenuNotifi.classList.remove("open-menu-notifi");
    subMenu.classList.toggle("open-menu");
  };
  const toggleMenuNotifi = () => {
    subMenu.classList.remove("open-menu");
    subMenuNotifi.classList.toggle("open-menu-notifi");
  };
  const renderArr = () => {
    let arrNew = [];
    let listServiceNew = [];
    listServiceNew = listRequestService?.filter(
      (item, i) =>
        item.orders.requestServiceType === CHECKOUT ||
        item.orders.status !== DONE
    );
    listServiceNew.forEach((item, i) => {
      arrNew.push({
        name: item.orders.requestServiceName,
        roomNo: item.room.data.roomNo,
      });
    });
    return arrNew;
  };
  console.log("ANNNNN", renderArr().length);
  const handleViewAllNotifi = useCallback(() => {
    dispatch(showModalCheckOutService());
  }, [dispatch]);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div></div>
        <div className="items relati">
          <div
            className="item"
            onClick={() => {
              toggleMenuNotifi();
            }}
          >
            <NotificationsNoneOutlined className="icon" />
            {userInfo.userRole === USER_ROLE.RECEPTIONIST &&
            renderArr().length !== 0 ? (
              <div className="counter animate__animated animate__heartBeat animate__infinite">
                {renderArr().length}
              </div>
            ) : (
              <div className="counter">0</div>
            )}
          </div>
          <div className="sub-menu-notifi" id="subMenuNotifi">
            <div className="sub-menu">
              <div className="sub-menu-top">
                <p>Thông báo mới nhận</p>
              </div>
              {userInfo.userRole === USER_ROLE.RECEPTIONIST &&
              renderArr().length !== 0 ? (
                <div className="sub-menu-center">
                  {renderArr().map((item, index) => (
                    <div className="sub-menu-item">
                      <p style={{ fontSize: "15px" }}>
                        <LogoutIcon
                          className="icon"
                          style={{ paddingRight: "5px" }}
                        />
                        Phòng {item.roomNo} bạn có yêu cầu "{item.name}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="sub-menu-center">
                  <div className="sub-menu-item notifi">
                    <NotificationsOffIcon className="icon" />
                    <p>Bạn chưa có thông báo</p>
                  </div>
                </div>
              )}
              <div className="sub-menu-footer">
                {userInfo.userRole === USER_ROLE.RECEPTIONIST &&
                renderArr().length !== 0 ? (
                  <div
                    className="buttonViewAll"
                    onClick={() => {
                      handleViewAllNotifi();
                    }}
                  >
                    <p>Xem tất cả</p>
                  </div>
                ) : (
                  <div className="buttonViewAll">
                    <p>Xem tất cả</p>
                  </div>
                )}
              </div>
            </div>
          </div>
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
                <h5>
                  {userInfo.lastName} {userInfo.firstName}
                </h5>
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
              {/* <div className="sub-menu-link">
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
              </div> */}
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
      <ModalAllRequestService />
    </div>
  );
}
