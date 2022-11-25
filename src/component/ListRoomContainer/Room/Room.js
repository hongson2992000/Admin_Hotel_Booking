import React, { useCallback, useState } from "react";
import "./Room.scss";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState$ } from "../../../redux/selectors/UserSelector";
import { USER_ROLE } from "../../../utils/constants/settingSystem";
import RoomPopup from "./roomPopup";

export default function Room({ data }) {
  const userInfo = useSelector(userState$);
  let MenusEmpty = [{ name: "Tạo đặt phòng", id: 0 }];;
  let MenusNotEmpty = [{ name: "Xem thông tin khách", id: 0 }, { name: "Gửi thông báo", id: 1 }, { name: "Check out", id: 2 }];
  if (userInfo.userRole === USER_ROLE.HOTEL_MANAGE) {
    MenusEmpty = [{ name: "Tạo đặt phòng", id: 0 }];
    MenusNotEmpty = [{ name: "Xem thông tin khách", id: 0 }, { name: "Gửi thông báo", id: 1 }, { name: "Check out", id: 2 }];
  } else if (userInfo.userRole === USER_ROLE.RESTAURANT) {

    MenusEmpty = [{ name: "Xem yêu cầu dịch vụ", id: 0 }];

    MenusNotEmpty = [{ name: "Xem yêu cầu dịch vụ", id: 0 }];
  }


  const [] = useState();
  const [openNotEmpty, setOpenNotEmpty] = useState({ id: 0, display: false });
  const [openEmpty, setOpenEmpty] = useState({ id: 0, display: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleFillInfoRoom = useCallback(

    (id) => {
      // const infoBooking = listBooking.find(
      //   (bookingItem) => bookingItem.id === id
      // );
      // dispatch(actions.getBookingById.getBookingByIdRequest(infoBooking));
      navigate("/checkCustomerInfo")
    },



    [navigate, dispatch]
  );

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
                  {
                    userInfo.userRole === USER_ROLE.HOTEL_MANAGE ? <TouchAppIcon
                      onClick={() => {
                        setOpenNotEmpty({ id: item.id, display: !openNotEmpty.display });
                      }}
                      className="icon"
                    /> : <RoomServiceIcon className="icon" onClick={() => {
                      setOpenNotEmpty({ id: item.id, display: !openNotEmpty.display });
                    }} />
                  }
                  {/* CleaningServicesIcon */}
                </div>
                {(openNotEmpty.display && openNotEmpty.id === item.id) && (
                  <div className="dropDownTouch">
                    <div>
                      <KeyboardArrowUpIcon />
                    </div>
                    <div onClick={() => setOpenNotEmpty({ id: item.id })}>
                      {MenusNotEmpty.map((menu) => (
                        <span className="menuhover" key={menu.id}>
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
                        <span onClick={<RoomPopup />} className="menuhover" key={menu}>
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