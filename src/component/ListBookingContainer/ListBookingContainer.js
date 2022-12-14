import React, { useCallback, useMemo, useState } from "react";
import "./ListBookingContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bookingManageState$ } from "../../redux/selectors/BookingManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
import * as actionRoom from "../../redux/actions/RoomManageAction";
import moment from "moment";
import {
  BOOKED,
  CANCEL,
  CHECKIN,
  CHECKOUT,
  INFO_BOOKING_DETAIL,
  NOTSHOW,
  USER_LOGIN,
  USER_ROLE,
} from "../../utils/constants/settingSystem";
import { useEffect } from "react";
import DialogDelete from "../DialogDelete/DialogDelete";
export default function ListBookingContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  const listBooking = useSelector(bookingManageState$);
  useEffect(() => {
    dispatch(actions.getAllBooking.getAllBookingRequest());
  }, [dispatch]);
  const handleChange = (e, val) => {
    setValue(val);
  };
  const handleFillInfoCheckIn = useCallback(
    (item) => {
      const infoBooking = listBooking.find(
        (bookingItem) => bookingItem.id === item.id
      );
      dispatch(actions.getBookingById.getBookingByIdRequest(infoBooking));
      localStorage.setItem(INFO_BOOKING_DETAIL, JSON.stringify(infoBooking));
      dispatch(
        actionRoom.getRoomAvailability.getRoomAvailabilityRequest({
          booking_id: item.id,
        })
      );
      navigate("/listBooking/checkIn");
    },
    [navigate, listBooking, dispatch]
  );
  const handleCheckOut = useCallback(
    (id) => {
      dispatch(actions.checkOutRoom.checkOutRoomRequest({ id, navigate }));
    },
    [navigate, dispatch]
  );
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
  const handleCancelBooking = (id) => {
    handleDialog("B???n ch???c ch???n h???y booking n??y?", true);
    setIdBooking({
      id: id,
    });
  };
  const areUSureDelete = useCallback(
    (choose) => {
      if (choose) {
        dispatch(actions.cancelBooking.cancelBookingRequest(idBooking.id));
        handleDialog("", false);
      } else {
        handleDialog("", false);
      }
    },
    [dispatch, idBooking]
  );

  const renderTypeRoom = (roomTypeId) => {
    let roomType = "";
    switch (roomTypeId) {
      case 1:
        return (roomType = "Deluxe King/ Cao c???p");
      case 2:
        return (roomType = "Deluxe Twin/ Cao c???p");
      case 3:
        return (roomType = "Superior King/ Ph??ng th?????ng");
      case 4:
        return (roomType = "Superior Twin/ Ph??ng th?????ng");
      case 5:
        return (roomType = "Standard King/ Ph??ng th?????ng");
      case 6:
        return (roomType = "Standard Twin/ Ph??ng th?????ng");
      default:
        return roomType;
    }
  };
  const haveRequestService = (item) => {
    if (item?.orders.length > 0) {
      const existItem = item.orders.find(
        (itemOrder) =>
          itemOrder.orderDetails[0].service.id === 70 ||
          itemOrder.orderDetails[0].service.id === 71 ||
          itemOrder.orderDetails[0].service.id === 57 ||
          itemOrder.orderDetails[0].service.id === 58
      );

      if (existItem) {
        return "????a ????n s??n bay";
      } else {
        return "Kh??ng c??";
      }
    } else {
      return "Kh??ng c??";
    }
  };
  const renderArr = () => {
    let arrNew = [];
    let arrPlan = [];

    listBooking.forEach((item) => {
      arrNew.push({
        id: item.id,
        name:
          item.customer?.firstName +
          " " +
          item.customer?.middleName +
          " " +
          item.customer?.lastName,
        roomType: renderTypeRoom(item.roomTypeId),
        requestService: haveRequestService(item),
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
        status: item.status,
      });
    });
    return arrNew;
  };
  const renderArrByDateToCheckIn = () => {
    let arrNew = [];
    let currentDate = moment().format("DD/MM/YYYY");
    let listArrivalDate = listBooking.filter(
      (item) =>
        item.arrivalDate.substring(0, 10) === currentDate &&
        item.status === BOOKED
    );
    listArrivalDate.forEach((item) => {
      arrNew.push({
        id: item.id,
        name:
          item.customer?.firstName +
          " " +
          item.customer?.middleName +
          " " +
          item.customer?.lastName,
        roomType: renderTypeRoom(item.roomTypeId),
        requestService: "????a ????n S??n Bay",
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
        status: item.status,
        numOfPerson: item.numOfAdult + item.numOfChildren,
        roomTypeId: item.roomTypeId,
      });
    });
    return arrNew;
  };
  const renderArrByDateToCheckOut = () => {
    let arrNew = [];
    let currentDate = moment().format("DD/MM/YYYY");
    let listArrivalDate = listBooking.filter(
      (item) =>
        item.departureDate.substring(0, 10) === currentDate &&
        item.status === CHECKIN
    );
    listArrivalDate.forEach((item) => {
      arrNew.push({
        id: item.id,
        name:
          item.customer?.firstName +
          " " +
          item.customer?.middleName +
          " " +
          item.customer?.lastName,
        roomType: renderTypeRoom(item.roomTypeId),
        requestService: "????a ????n S??n Bay",
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
      });
    });
    return arrNew;
  };
  const renderArrCustomerCheckIn = () => {
    let arrNew = [];
    let listArrivalDate = listBooking.filter((item) => item.status === CHECKIN);
    listArrivalDate.forEach((item) => {
      arrNew.push({
        id: item.id,
        name:
          item.customer?.firstName +
          " " +
          item.customer?.middleName +
          " " +
          item.customer?.lastName,
        roomType: renderTypeRoom(item.roomTypeId),
        requestService: "????a ????n S??n Bay",
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
        status: item.status,
        numOfPerson: item.numOfAdult + item.numOfChildren,
        roomTypeId: item.roomTypeId,
      });
    });
    return arrNew;
  };
  const allBooking = useMemo(
    () => [
      {
        field: "id",
        headerName: "M?? ?????t Ph??ng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "T??n Kh??ch ?????t",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Lo???i Ph??ng",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      {
        field: "requestService",
        headerName: "D???ch V??? ??i K??m",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.requestService}</div>;
        },
      },
      {
        field: "arrivalDate",
        headerName: "Ng??y ?????n",
        width: 160,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.arrivalDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "departureDate",
        headerName: "Ng??y ??i",
        width: 160,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.departureDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "status",
        headerName: "Tr???ng Th??i",
        width: 150,
        renderCell: (params) => {
          return (
            <div
              className={`cellWithImg ${
                params.row.status === CHECKIN
                  ? "CHECKIN"
                  : params.row.status === CHECKOUT
                  ? "CHECKOUT"
                  : params.row.status === BOOKED
                  ? "BOOKED"
                  : params.row.status === NOTSHOW
                  ? "NOTSHOW"
                  : "CANCEL"
              }`}
            >
              {params.row.status === BOOKED
                ? "???? ?????t ph??ng"
                : params.row.status === CHECKIN
                ? "??ang ???"
                : params.row.status === CHECKOUT
                ? "???? r???i kh???i"
                : params.row.status === NOTSHOW
                ? "Kh??ng ?????n"
                : "???? h???y"}
            </div>
          );
        },
      },
    ],
    []
  );
  const bookingArriveInDay = useMemo(
    () => [
      {
        field: "id",
        headerName: "M?? ?????t Ph??ng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "T??n Kh??ch ?????t",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Lo???i Ph??ng",
        width: 300,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      // {
      //   field: "requestService",
      //   headerName: "D???ch V??? ??i K??m",
      //   width: 200,
      //   renderCell: (params) => {
      //     return <div className="cellWithImg">{params.row.requestService}</div>;
      //   },
      // },
      {
        field: "arrivalDate",
        headerName: "Ng??y ?????n",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.arrivalDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "departureDate",
        headerName: "Ng??y ??i",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.departureDate.substring(0, 10)}
            </div>
          );
        },
      },
    ],
    []
  );
  const bookingLeaveInDay = useMemo(
    () => [
      {
        field: "id",
        headerName: "M?? ?????t Ph??ng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "T??n Kh??ch ?????t",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Lo???i Ph??ng",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      // {
      //   field: "requestService",
      //   headerName: "D???ch V??? ??i K??m",
      //   width: 200,
      //   renderCell: (params) => {
      //     return <div className="cellWithImg">{params.row.requestService}</div>;
      //   },
      // },
      {
        field: "arrivalDate",
        headerName: "Ng??y ?????n",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.arrivalDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "departureDate",
        headerName: "Ng??y ??i",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.departureDate.substring(0, 10)}
            </div>
          );
        },
      },
    ],
    []
  );
  const customerIsCheckIn = useMemo(
    () => [
      {
        field: "id",
        headerName: "M?? ?????t Ph??ng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "T??n Kh??ch ?????t",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Lo???i Ph??ng",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      // {
      //   field: "requestService",
      //   headerName: "D???ch V??? ??i K??m",
      //   width: 200,
      //   renderCell: (params) => {
      //     return <div className="cellWithImg">{params.row.requestService}</div>;
      //   },
      // },
      {
        field: "arrivalDate",
        headerName: "Ng??y ?????n",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.arrivalDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "departureDate",
        headerName: "Ng??y ??i",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.departureDate.substring(0, 10)}
            </div>
          );
        },
      },
      {
        field: "status",
        headerName: "Tr???ng Th??i",
        width: 200,
        renderCell: (params) => {
          return (
            <div
              className={`cellWithImg ${
                params.row.status === CHECKIN
                  ? "CHECKIN"
                  : params.row.status === CHECKOUT
                  ? "CHECKOUT"
                  : "BOOKED"
              }`}
            >
              {params.row.status === CHECKIN ? "??ang ???" : " "}
            </div>
          );
        },
      },
    ],
    []
  );
  const actionColumnCheckIn = [
    {
      field: "action",
      headerName: "H??nh ?????ng",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === CHECKIN ? (
              <div
                className="checkInButton"
                style={{ pointerEvents: "none" }}
                // onClick={() =>
                //   handleFillInfoCheckIn(
                //     params.row.id,
                //     params.row.arrivalDate,
                //     // params.row.departureDate,
                //     // params.row.numOfPerson,
                //     // params.row.roomTypeId
                //   )
                // }
              >
                Check In
              </div>
            ) : (
              <div
                className="checkInButton"
                onClick={() => handleFillInfoCheckIn(params.row)}
              >
                Check In
              </div>
            )}
          </div>
        );
      },
    },
  ];
  const actionColumnAllBooking = [
    {
      field: "action",
      headerName: "H??nh ?????ng",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.status === CHECKIN ||
            params.row.status === CHECKOUT ||
            params.row.status === NOTSHOW ||params.row.status === CANCEL|| 
            params.row.arrivalDate.substring(0, 10) ===
              moment().format("DD/MM/YYYY") ||
            checkIsBefore(
              params.row.arrivalDate.substring(0, 10),
              moment().format("DD/MM/YYYY")
            ) ? (
              <div
                className="cancelBookingButtonDisable"
                style={{ pointerEvents: "none" }}
                // onClick={() =>
                //   handleFillInfoCheckIn(
                //     params.row.id,
                //     params.row.arrivalDate,
                //     // params.row.departureDate,
                //     // params.row.numOfPerson,
                //     // params.row.roomTypeId
                //   )
                // }
              >
                H???y
              </div>
            ) : (
              <div
                className="cancelBookingButton"
                onClick={() => handleCancelBooking(params.row.id)}
              >
                H???y
              </div>
            )}
          </div>
        );
      },
    },
  ];
  const actionColumnCheckOut = [
    {
      field: "action",
      headerName: "H??nh ?????ng",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="checkInButton"
              onClick={() => handleCheckOut(params.row.id)}
            >
              Check Out
            </div>
          </div>
        );
      },
    },
  ];
  const checkIsBefore = (date1, date2) => {
    let arrDate1 = date1.split("/");
    let formatDate1 = arrDate1[2] + "-" + arrDate1[1] + "-" + arrDate1[0];
    let arrDate2 = date2.split("/");
    let formatDate2 = arrDate2[2] + "-" + arrDate2[1] + "-" + arrDate2[0];
    return moment(formatDate1).isBefore(formatDate2);
  };
  return (
    <div className="datatableListBooking">
      <div className="datatableTitle">Danh S??ch Booking</div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="T???t C???" value="1" />
            <Tab label="?????n Trong Ng??y" value="2" />
            <Tab label="??i Trong Ng??y" value="3" />
            <Tab label="Kh??ch ??ang ???" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DataGrid
            className="datagrid"
            rows={renderArr()}
            columns={allBooking.concat(actionColumnAllBooking)}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </TabPanel>
        <TabPanel value="2">
          <DataGrid
            className="datagrid"
            rows={renderArrByDateToCheckIn()}
            columns={bookingArriveInDay.concat(actionColumnCheckIn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </TabPanel>
        <TabPanel value="3">
          <DataGrid
            className="datagrid"
            rows={renderArrByDateToCheckOut()}
            columns={bookingLeaveInDay.concat(actionColumnCheckOut)}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </TabPanel>
        <TabPanel value="4">
          <DataGrid
            className="datagrid"
            rows={renderArrCustomerCheckIn()}
            columns={customerIsCheckIn}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </TabPanel>
      </TabContext>
      {dialog.isLoading && (
        <DialogDelete onDialog={areUSureDelete} message={dialog.message} />
      )}
    </div>
  );
}
