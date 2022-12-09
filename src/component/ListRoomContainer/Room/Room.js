import React, { useCallback, useState } from "react";
import "./Room.scss";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import * as actionRequestService from "../../../redux/actions/RequestServiceManageAction";
import * as actionRoom from "../../../redux/actions/RoomManageAction";
import * as actionBooking from "../../../redux/actions/BookingManageAction";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState$ } from "../../../redux/selectors/UserSelector";
import {
  BOOKED,
  PROCESSING,
  USER_ROLE,
} from "../../../utils/constants/settingSystem";
// import RoomPopup from "./roomPopup";
import { roomManageState$ } from "../../../redux/selectors/RoomManageSelector";
import {
  showModalRequestService,
  showModalSendMessage,
} from "../../../redux/actions/ModalAction";
import { Link, useNavigate } from "react-router-dom";
import PopupRequestService from "../PopupRequestService/PopupRequestService";
import PopupDetailRequestServiceInRoom from "../PopupDetailRequestServiceInRoom/PopupDetailRequestServiceInRoom";
import PopupTurnDownService from "../PopupTurnDownService/PopupTurnDownService";
import PopupRequestServiceManage from "../PopupRequestServiceManage/PopupRequestServiceManage";

export default function Room() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(userState$);
  const listRoom = useSelector(roomManageState$);
  let [bookingId, setBookingId] = useState(1);
  let MenusEmpty = [{ name: "Tạo đặt phòng", id: 0 }];
  let MenusNotEmptyHousekeeping = [{ name: "Xem Yêu Cầu Dịch Vụ", id: 0 }];
  let MenusNotEmptyRestaurant = [{ name: "Xem Yêu Cầu Dịch Vụ", id: 0 }];
  let MenusNotEmpty = [
    { name: "Xem thông tin khách", id: 0 },
    { name: "Gửi thông báo", id: 1 },
    { name: "Check out", id: 2 },
  ];
  const [openNotEmpty, setOpenNotEmpty] = useState({ id: 0, display: false });
  const [openEmpty, setOpenEmpty] = useState({ id: 0, display: false });
  const [openNotEmptyRestaurant, setOpenNotEmptyRestaurant] = useState({
    id: 0,
    display: false,
  });
  const [openNotEmptyHouse, setOpenNotEmptyHouse] = useState({
    id: 0,
    display: false,
  });
  // const navigate = useNavigate();
  const handleRoomNotEmpty = (menuId, room_id) => {
    switch (menuId) {
      case 0:
        dispatch(
          actionBooking.getBookingByRoomId.getBookingByRoomIdRequest({
            room_id: room_id,
          })
        );
        navigate("/roomManage/customerDetail");
        break;
      case 1:
        dispatch(showModalSendMessage());
        dispatch(
          actionBooking.getBookingByRoomId.getBookingByRoomIdRequest({
            room_id: room_id,
          })
        );
        break;
      case 2:
        console.log("YEU BE AN");
        break;
      default:
        break;
    }
  };
  const handleRequestService = useCallback(
    (item) => {
      dispatch(
        actionRequestService.getRequestServiceByBookingId.getRequestServiceByBookingIdRequest(
          { booking_id: item.booking.data.id }
        )
      );
      setBookingId(item.booking.data.id);
    },
    [dispatch]
  );
  const handleTurnDownService = useCallback(
    (item) => {
      dispatch(
        actionRequestService.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdRequest(
          { booking_id: item.booking.data.id }
        )
      );
    },
    [dispatch]
  );
  const handleCreateNewRoom = useCallback(
    (item) => {
      dispatch(
        actionRoom.getRoomTypeById.getRoomTypeByIdRequest(item.room.room)
      );
    },
    [dispatch]
  );
  const renderMenuByRole = (item, index) => {
    if (userInfo.userRole === USER_ROLE.HOTEL_MANAGE) {
      let arrRequestService = item.booking.data?.orders.filter(
        (item) => item.status === BOOKED || item.status === PROCESSING
      );
      let arrTurnDown = item.booking.data?.requestServices.filter(
        (item) => item.status === BOOKED || item.status === PROCESSING
      );
      return (
        <div className="rowIcon">
          {arrRequestService?.length !== 0 ? (
            <RoomServiceIcon
              onClick={() => {
                setOpenNotEmptyRestaurant({
                  id: index,
                  display: !openNotEmptyRestaurant.display,
                });
              }}
              className="icon animate__animated animate__heartBeat animate__infinite"
              style={{ color: "red" }}
            />
          ) : (
            <RoomServiceIcon
              onClick={() => {
                setOpenNotEmptyRestaurant({
                  id: index,
                  display: !openNotEmptyRestaurant.display,
                });
              }}
              className="icon"
              style={{ pointerEvents: "none" }}
            />
          )}
          <TouchAppIcon
            onClick={() => {
              setOpenNotEmpty({
                id: index,
                display: !openNotEmpty.display,
              });
            }}
            className="icon"
          />
          {arrTurnDown?.length !== 0 ? (
            <CleaningServicesIcon
              onClick={() => {
                setOpenNotEmptyHouse({
                  id: index,
                  display: !openNotEmptyHouse.display,
                });
              }}
              className="icon animate__animated animate__heartBeat animate__infinite"
              style={{ color: "red" }}
            />
          ) : (
            <CleaningServicesIcon
              onClick={() => {
                setOpenNotEmpty({
                  id: index,
                  display: !openNotEmpty.display,
                });
              }}
              className="icon"
              style={{ pointerEvents: "none" }}
            />
          )}
          {openNotEmpty.display && openNotEmpty.id === index && (
            <div className="dropDownTouch">
              <div>
                <KeyboardArrowUpIcon />
              </div>
              <div onClick={() => setOpenNotEmpty({ id: index })}>
                {MenusNotEmpty.map((menu) => (
                  <span
                    className="menuhover"
                    key={menu.id}
                    onClick={() => {
                      handleRoomNotEmpty(menu.id, item.room.id);
                    }}
                  >
                    {menu.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {openNotEmptyRestaurant.display &&
            openNotEmptyRestaurant.id === index && (
              <div className="dropDownTouch">
                <div>
                  <KeyboardArrowUpIcon />
                </div>
                <div onClick={() => setOpenNotEmptyRestaurant({ id: index })}>
                  {MenusNotEmptyRestaurant.map((menu) => (
                    <span
                      className="menuhover"
                      key={menu.id}
                      onClick={() => {
                        handleRequestService(item);
                      }}
                    >
                      {menu.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          {openNotEmptyHouse.display && openNotEmptyHouse.id === index && (
            <div className="dropDownTouch">
              <div>
                <KeyboardArrowUpIcon />
              </div>
              <div onClick={() => setOpenNotEmptyHouse({ id: index })}>
                {MenusNotEmptyHousekeeping.map((menu) => (
                  <span
                    className="menuhover"
                    key={menu.id}
                    onClick={() => {
                      handleTurnDownService(item);
                    }}
                  >
                    {menu.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.RESTAURANT) {
      let arrTurnDown = item.booking?.data.orders.filter(
        (item) => item.status === BOOKED || item.status === PROCESSING
      );
      return (
        <div className="rowIcon">
          {arrTurnDown?.length !== 0 ? (
            <RoomServiceIcon
              onClick={() => {
                setOpenNotEmpty({
                  id: index,
                  display: !openNotEmpty.display,
                });
              }}
              className="icon animate__animated animate__heartBeat animate__infinite"
              style={{ color: "red" }}
            />
          ) : (
            <RoomServiceIcon
              onClick={() => {
                setOpenNotEmpty({
                  id: index,
                  display: !openNotEmpty.display,
                });
              }}
              className="icon"
              style={{ pointerEvents: "none" }}
            />
          )}
          {openNotEmpty.display && openNotEmpty.id === index && (
            <div className="dropDownTouch">
              <div>
                <KeyboardArrowUpIcon />
              </div>
              <div onClick={() => setOpenNotEmpty({ id: index })}>
                {MenusNotEmptyRestaurant.map((menu) => (
                  <span className="menuhover" key={menu.id}>
                    {menu.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.HOUSEKEEPING) {
      let arrTurnDown = item.booking?.data.requestService.filter(
        (item) => item.status === BOOKED || item.status === PROCESSING
      );
      return (
        <div className="rowIcon">
          {arrTurnDown?.length !== 0 ? (
            <CleaningServicesIcon
              onClick={() => {
                setOpenNotEmpty({
                  id: index,
                  display: !openNotEmpty.display,
                });
              }}
              className="icon animate__animated animate__heartBeat animate__infinite"
              style={{ color: "red" }}
            />
          ) : (
            <CleaningServicesIcon
              onClick={() => {
                setOpenNotEmpty({
                  id: index,
                  display: !openNotEmpty.display,
                });
              }}
              className="icon"
              style={{ pointerEvents: "none" }}
            />
          )}
          {openNotEmpty.display && openNotEmpty.id === index && (
            <div className="dropDownTouch">
              <div>
                <KeyboardArrowUpIcon />
              </div>
              <div onClick={() => setOpenNotEmpty({ id: index })}>
                {MenusNotEmptyHousekeeping.map((menu) => (
                  <span className="menuhover" key={menu.id}>
                    {menu.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  };
  const renderMenuByRoleIsEmpty = (item, index) => {
    if (userInfo.userRole === USER_ROLE.HOTEL_MANAGE) {
      return (
        <div className="rowIcon">
          <TouchAppIcon
            onClick={() => {
              setOpenEmpty({
                id: index,
                display: !openEmpty.display,
              });
            }}
            className="icon"
          />
          {openEmpty.display && openEmpty.id === index && (
            <div className="dropDownTouch">
              <div>
                <KeyboardArrowUpIcon />
              </div>
              <div onClick={() => setOpenEmpty({ id: index })}>
                {MenusEmpty.map((menu) => (
                  <span
                    className="menuhover"
                    key={menu.id}
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      handleCreateNewRoom();
                    }}
                  >
                    {menu.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.RESTAURANT) {
      return (
        <div className="rowIcon">
          <RoomServiceIcon
            onClick={() => {
              setOpenNotEmpty({
                id: index,
                display: !openEmpty.display,
              });
            }}
            className="icon"
          />
          {openEmpty.display && openEmpty.id === index && (
            <div className="dropDownTouch">
              <div>
                <KeyboardArrowUpIcon />
              </div>
              <div onClick={() => setOpenEmpty({ id: index })}>
                {MenusNotEmptyRestaurant.map((menu) => (
                  <span className="menuhover" key={menu.id}>
                    {menu.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    } else if (userInfo.userRole === USER_ROLE.HOUSEKEEPING) {
      return (
        <div className="rowIcon" style={{ pointerEvents: "none" }}>
          <CleaningServicesIcon
            onClick={() => {
              setOpenEmpty({
                id: index,
                display: !openEmpty.display,
              });
            }}
            className="icon"
          />
          {openEmpty.display && openEmpty.id === index && (
            <div className="dropDownTouch">
              <div>
                <KeyboardArrowUpIcon />
              </div>
              <div onClick={() => setOpenEmpty({ id: index })}>
                {MenusNotEmptyHousekeeping.map((menu) => (
                  <span className="menuhover" key={menu.id}>
                    {menu.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  };
  // const handleFillInfoRoom = useCallback(
  //   (id) => {
  //     // const infoBooking = listBooking.find(
  //     //   (bookingItem) => bookingItem.id === id
  //     // );
  //     // dispatch(actions.getBookingById.getBookingByIdRequest(infoBooking));
  //     navigate("/checkCustomerInfo");
  //   },

  //   [navigate, dispatch]
  // );

  return (
    <div className="RoomItem col-12">
      <div className="row">
        <div className="FillterRoom">
          <span>
            <div className="FillterAll">
              <p>Tất Cả</p>
            </div>
          </span>
          <span>
            <div className="FillterEmpty">
              <p>Trống</p>
            </div>
          </span>
          <span>
            <div className="FillterNotEmpty">
              <p>Có Khách</p>
            </div>
          </span>
        </div>

        {listRoom &&
          listRoom.map((item, i) => {
            if (!item.room.status) {
              return (
                <div className="RoomDetailEmpty col-4" key={i}>
                  <div className="RoomTitile">
                    <p>{item.roomType.data?.name}</p>
                  </div>
                  <div className="RoomNo">
                    <p>{item.room.roomNo}</p>
                  </div>
                  {/* <div className="CustomerName">
                    <p>...........</p>
                  </div> */}

                  {renderMenuByRoleIsEmpty(item, i)}
                </div>
              );
            } else {
              return (
                <div className="RoomDetail col-4" key={i}>
                  <div className="RoomTitile">
                    <p>{item.roomType.data?.name}</p>
                  </div>
                  <div className="RoomNo">
                    <p>{item.room.roomNo}</p>
                  </div>
                  {/* <div className="CustomerName">
                    <p>{item.primaryCustomer}</p>
                  </div> */}
                  {renderMenuByRole(item, i)}
                </div>
              );
            }
          })}
      </div>
      <PopupDetailRequestServiceInRoom booking_id={bookingId} />
      <PopupRequestService />
      <PopupTurnDownService />
      <PopupRequestServiceManage />
    </div>
  );
}
