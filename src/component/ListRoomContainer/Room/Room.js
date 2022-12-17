import React, { useCallback, useEffect, useState } from "react";
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
  CHECKOUT,
  PROCESSING,
  USER_ROLE,
} from "../../../utils/constants/settingSystem";
// import RoomPopup from "./roomPopup";
import { roomManageState$ } from "../../../redux/selectors/RoomManageSelector";
import { showModalSendMessage } from "../../../redux/actions/ModalAction";
import { useNavigate } from "react-router-dom";
import PopupRequestService from "../PopupRequestService/PopupRequestService";
import PopupDetailRequestServiceInRoom from "../PopupDetailRequestServiceInRoom/PopupDetailRequestServiceInRoom";
import PopupTurnDownService from "../PopupTurnDownService/PopupTurnDownService";
import PopupRequestServiceManage from "../PopupRequestServiceManage/PopupRequestServiceManage";
import PopupTurnDownManage from "../PopupTurnDownManage/PopupTurnDownManage";
import DialogDelete from "../../DialogDelete/DialogDelete";
import PopupSendMessage from "../PopupSendMessage/PopupSendMessage";

export default function Room() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(userState$);
  const listRoom = useSelector(roomManageState$);
  useEffect(() => {
    dispatch(actionRoom.getAllRoom.getAllRoomRequest());
    if (userInfo.userRole === USER_ROLE.RECEPTIONIST) {
      dispatch(
        actionRequestService.getTurnDownService.getTurnDownServiceRequest()
      );
    }
  }, [dispatch]);

  // let [dataListRoom, setDataListRoom] = useState(listRoom);
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
  //Handle Dialog
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [idBooking, setIdBooking] = useState({
    id: 0,
  });
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };
  const handleCheckOut = useCallback((id) => {
    handleDialog("Bạn chắc chắn các dịch vụ đã được thanh toán?", true);
    setIdBooking({
      id: id,
    });
  }, []);
  const areUSureCheckOut = (choose) => {
    if (choose) {
      dispatch(
        actionBooking.checkOutInRoom.checkOutInRoomRequest({
          id: idBooking.id,
          navigate: navigate,
        })
      );
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  // const navigate = useNavigate();
  // const handlefilterRoom = (type) => {
  //   switch (type) {
  //     case 3:
  //       let listRoom1 = listRoom.filter((item) => item.room.status === true);
  //       setDataListRoom(listRoom1);
  //       break;
  //     case 2:
  //       let listRoom2 = listRoom.filter((item) => item.room.status === false);
  //       setDataListRoom(listRoom2);
  //       break;
  //     case 1:
  //       setDataListRoom(listRoom);
  //       break;
  //     default:
  //       return;
  //   }
  // };
  const handleRoomNotEmpty = useCallback(
    (menuId, room_id, bookingId) => {
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
          // dispatch(
          //   actionBooking.getBookingByRoomId.getBookingByRoomIdRequest({
          //     room_id: room_id,
          //   })
          // );
          setBookingId(bookingId);
          dispatch(showModalSendMessage());
          break;
        case 2:
          handleCheckOut(bookingId);
          break;
        default:
          break;
      }
    },
    [dispatch, navigate, handleCheckOut]
  );

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
  const handleRequestServiceByStaff = useCallback(
    (item) => {
      dispatch(
        actionRequestService.getRequestServiceByBookingIdStaff.getRequestServiceByBookingIdStaffRequest(
          { booking_id: item.booking.data.id }
        )
      );
      setBookingId(item.booking.data.id);
    },
    [dispatch]
  );
  const handleTurnDownServiceManage = useCallback(
    (item) => {
      dispatch(
        actionRequestService.getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdRequest(
          { booking_id: item.booking.data.id }
        )
      );
    },
    [dispatch]
  );
  const handleTurnDownStaff = useCallback(
    (item) => {
      dispatch(
        actionRequestService.getTurnDownServiceByBookingIdByStaff.getTurnDownServiceByBookingIdByStaffRequest(
          { booking_id: item.booking.data.id }
        )
      );
      setBookingId(item.booking.data.id);
    },
    [dispatch]
  );
  const handleCreateNewRoom = useCallback(
    (item) => {
      dispatch(
        actionRoom.getRoomTypeByRoomId.getRoomTypeByRoomIdRequest({
          roomId: item.room.id,
          navigate: navigate,
          roomNo: item.room.roomNo,
        })
      );
    },
    [navigate, dispatch]
  );
  const renderMenuByRole = (item, index) => {
    if (userInfo.userRole === USER_ROLE.RECEPTIONIST) {
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
                      handleRoomNotEmpty(
                        menu.id,
                        item.room.id,
                        item.booking.data.id
                      );
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
                      handleTurnDownServiceManage(item);
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
      let arrFood = [];
      item.booking?.data.orders.forEach((item, i) => {
        let foodItem = item.orderDetails.find(
          (itemOrder, i) =>
            itemOrder.service.id !== 70 &&
            itemOrder.service.id !== 71 &&
            itemOrder.service.id !== 57 &&
            itemOrder.service.id !== 58
        );
        if (foodItem) {
          arrFood.push(item);
        }
      });
      let arrTurnDown = arrFood.filter(
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
                  <span
                    className="menuhover"
                    key={menu.id}
                    onClick={() => {
                      handleRequestServiceByStaff(item);
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
    } else if (userInfo.userRole === USER_ROLE.HOUSEKEEPING) {
      let arrCheckOut = [];
      item.booking?.data.requestServices.forEach(
        (item, i) => {
          if(item.requestServiceType !== CHECKOUT){
            arrCheckOut.push(item);
          }
        }
      );
      let arrCheckOutNew = arrCheckOut.filter(
        (item) => item.status === BOOKED || item.status === PROCESSING
      );
      return (
        <div className="rowIcon">
          {arrCheckOutNew?.length !== 0 ? (
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
                  <span
                    className="menuhover"
                    key={menu.id}
                    onClick={() => {
                      handleTurnDownStaff(item);
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
    }
  };
  const renderMenuByRoleIsEmpty = (item, index) => {
    if (userInfo.userRole === USER_ROLE.RECEPTIONIST) {
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
                      handleCreateNewRoom(item);
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
      <div className="row Room">
        <div className="FillterRoom">
          <span
          // onClick={() => {
          //   handlefilterRoom(1);
          // }}
          >
            <div className="FillterAll">
              <p>Tất Cả</p>
            </div>
          </span>
          <span
          // onClick={() => {
          //   handlefilterRoom(2);
          // }}
          >
            <div className="FillterEmpty">
              <p>Trống</p>
            </div>
          </span>
          <span
          // onClick={() => {
          //   handlefilterRoom(3);
          // }}
          >
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
                    <p>{item.room.description}</p>
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
                    <p>{item.room.description}</p>
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
      <PopupDetailRequestServiceInRoom bookingId={bookingId} />
      <PopupRequestService />
      <PopupTurnDownService bookingId={bookingId} />
      <PopupTurnDownManage />
      <PopupRequestServiceManage bookingId={bookingId} />
      <PopupSendMessage bookingId={bookingId} />
      {dialog.isLoading && (
        <DialogDelete onDialog={areUSureCheckOut} message={dialog.message} />
      )}
    </div>
  );
}
