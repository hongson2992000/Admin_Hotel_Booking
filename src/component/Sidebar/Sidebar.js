import React from "react";
import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import InfoIcon from "@mui/icons-material/Info";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors/UserSelector";
import { USER_ROLE } from "../../utils/constants/settingSystem";
import { ManageAccounts } from "@mui/icons-material";
import img from "../../assets/img/logo.png";
export default function Sidebar() {
  const navigate = useNavigate();
  const userInfo = useSelector(userState$);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const renderByAuth = () => {
    if (userInfo.userRole === USER_ROLE.ADMIN) {
      return (
        <div className="sidebar">
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src={img}
                alt=""
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                className="animate__animated animate__flipInY"
              />
              <span className="logo">5 Men Hotel</span>
            </Link>
          </div>
          <div className="center">
            <ul>
              <li>
                <NavLink
                  to="/overview"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <DashboardIcon className="icon" />
                  <span>T???ng Quan</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <RoomServiceIcon className="icon" />
                  <span>D???ch V???</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/location"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FmdGoodIcon className="icon" />
                  <span>?????a ??i???m</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <CampaignIcon className="icon" />
                  <span>Tin T???c</span>
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/greeting"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <EmojiPeopleIcon className="icon" />
                  <span>L???i Ch??o</span>
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/account"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <ManageAccounts className="icon" />
                  <span>T??i kho???n</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/infomationHotel"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <InfoIcon className="icon" />
                  <span>Th??ng Tin KS</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="bottom">
            <hr />
            <div
              onClick={() => {
                handleLogout();
              }}
              className="buttonLogout"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <LogoutIcon className="icon" style={{ marginRight: "5px" }} />
              <span>????ng Xu???t</span>
            </div>
          </div>
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.HOTEL_MANAGE) {
      return (
        <div className="sidebar">
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src={img}
                alt=""
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                className="animate__animated animate__flipInY"
              />
              <span className="logo">5 Men Hotel</span>
            </Link>
          </div>
          <div className="center" style={{ height: "70%" }}>
            <ul>
              <li>
                <NavLink
                  to="/overview"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <DashboardIcon className="icon" />
                  <span>T???ng Quan</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/setUpRoom"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <RoomPreferencesIcon className="icon" />
                  <span>C??i ?????t ph??ng</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/setUpPriceRoom"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <SettingsSuggestIcon className="icon" />
                  <span>C???u h??nh gi??</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/setupPriceRoomByDate"
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <EventRepeatIcon className="icon" />
                  <span>Gi?? theo ng??y</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="bottom" style={{ paddingTop: "10px" }}>
            <hr />
            <div
              onClick={() => {
                handleLogout();
              }}
              className="buttonLogout"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <LogoutIcon className="icon" style={{ marginRight: "5px" }} />
              <span>????ng Xu???t</span>
            </div>
          </div>
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.RECEPTIONIST) {
      return (
        <div className="sidebar" style={{ overflow: "hidden" }}>
          <div className="top" style={{ height: "100px" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <img
                src={img}
                alt=""
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                className="animate__animated animate__flipInY"
              />
              <span className="logo">5 Men Hotel</span>
            </Link>
          </div>
          <div className="center" style={{ height: "70%" }}>
            <ul>
              <li>
                <NavLink
                  to="/roomManage"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <MeetingRoomIcon className="icon" />
                  <span>S?? ????? Ph??ng</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/listBooking"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FormatListBulletedIcon className="icon" />
                  <span>Danh S??ch Booking</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/customerManage"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <PersonIcon className="icon" />
                  <span>Kh??ch H??ng</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/alarm"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <AccessAlarmIcon className="icon" />
                  <span>B??o Th???c</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="bottom" style={{ paddingTop: "20px" }}>
            <hr />
            <div
              onClick={() => {
                handleLogout();
              }}
              className="buttonLogout"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <LogoutIcon className="icon" style={{ marginRight: "5px" }} />
              <span>????ng Xu???t</span>
            </div>
          </div>
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.RESTAURANT) {
      return (
        <div className="sidebar" style={{ overflow: "hidden" }}>
          <div className="top" style={{ height: "100px" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <img
                src={img}
                alt=""
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                className="animate__animated animate__flipInY"
              />
              <span className="logo">5 Men Hotel</span>
            </Link>
          </div>
          <div className="center" style={{ height: "72%" }}>
            <ul>
              <li>
                <NavLink
                  to="/roomManage"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FormatListBulletedIcon className="icon" />
                  <span>S?? ????? Ph??ng</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/listRequestServiceStaff"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <MeetingRoomIcon className="icon" />
                  <span>Danh S??ch Y??u C???u D???ch V???</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
          <div className="bottom" style={{ paddingTop: "10px" }}>
            <div
              onClick={() => {
                handleLogout();
              }}
              className="buttonLogout"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <LogoutIcon className="icon" style={{ marginRight: "5px" }} />
              <span>????ng Xu???t</span>
            </div>
          </div>
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.HOUSEKEEPING) {
      return (
        <div className="sidebar" style={{ overflow: "hidden" }}>
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                src={img}
                alt=""
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
                className="animate__animated animate__flipInY"
              />
              <span className="logo">5 Men Hotel</span>
            </Link>
          </div>
          <div className="center" style={{ height: "72%" }}>
            <ul>
              <li>
                <NavLink
                  to="/roomManage"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FormatListBulletedIcon className="icon" />
                  <span>S?? ????? Ph??ng</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/listTurnDownService"
                  style={{
                    textDecoration: "none",
                  }}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <MeetingRoomIcon className="icon" />
                  <span>Danh S??ch Y??u C???u D???ch V???</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
          <div className="bottom" style={{ paddingTop: "10px" }}>
            <div
              onClick={() => {
                handleLogout();
              }}
              className="buttonLogout"
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              <LogoutIcon className="icon" style={{ marginRight: "5px" }} />
              <span>????ng Xu???t</span>
            </div>
          </div>
        </div>
      );
    }
  };
  return <div>{renderByAuth()}</div>;
}
