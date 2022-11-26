import React, { useCallback, useEffect, useMemo } from "react";
import "./ListBookingContainer.scss";
import { DataGrid } from "@mui/x-data-grid";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookingManageState$ } from "../../redux/selectors/BookingManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
import * as actionRoom from "../../redux/actions/RoomManageAction";
import moment from "moment";
export default function ListBookingContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(actions.getAllBooking.getAllBookingRequest());
  }, [dispatch]);

  const [value, setValue] = React.useState("1");

  const listBooking = useSelector(bookingManageState$);

  const handleChange = (e, val) => {
    setValue(val);
  };
  const handleFillInfoCheckIn = useCallback(
    (id) => {
      const infoBooking = listBooking.find(
        (bookingItem) => bookingItem.id === id
      );
      dispatch(actions.getBookingById.getBookingByIdRequest(infoBooking));
      dispatch(actionRoom.getAllRoom.getAllRoomRequest());
      navigate("/checkIn");
    },
    [navigate, listBooking, dispatch]
  );
  const handleCheckOut = useCallback(
    (id) => {
      dispatch(actions.checkOutRoom.checkOutRoomRequest({ id, navigate }));
    },
    [navigate, dispatch]
  );
  const renderTypeRoom = (roomTypeId) => {
    let roomType = "";
    switch (roomTypeId) {
      case 1:
        return (roomType = "Standard Room");
      case 2:
        return (roomType = "Superior Room");
      case 3:
        return (roomType = "Deluxe Room");
      default:
        return roomType;
    }
  };
  const renderArr = () => {
    let arrNew = [];
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
        requestService: "Đưa Đón Sân Bay",
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
      });
    });
    return arrNew;
  };
  const renderArrByDateToCheckIn = () => {
    let arrNew = [];
    let currentDate = moment().format("DD/MM/YYYY");
    let listArrivalDate = listBooking.filter(
      (item) => item.arrivalDate.substring(0, 10) === currentDate
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
        requestService: "Đưa Đón Sân Bay",
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
      });
    });
    return arrNew;
  };
  const renderArrByDateToCheckOut = () => {
    let arrNew = [];
    let currentDate = moment().format("DD/MM/YYYY");
    let listArrivalDate = listBooking.filter(
      (item) => item.departureDate.substring(0, 10) === currentDate
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
        requestService: "Đưa Đón Sân Bay",
        arrivalDate: item.arrivalDate,
        departureDate: item.departureDate,
      });
    });
    return arrNew;
  };

  const allBooking = useMemo(
    () => [
      {
        field: "id",
        headerName: "Mã Đặt Phòng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "Tên Khách Đặt",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Loại Phòng",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      {
        field: "requestService",
        headerName: "Dịch Vụ Đi Kèm",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.requestService}</div>;
        },
      },
      {
        field: "arrivalDate",
        headerName: "Ngày Đến",
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
        headerName: "Ngày Đi",
        width: 200,
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
  const bookingArriveInDay = useMemo(
    () => [
      {
        field: "id",
        headerName: "Mã Đặt Phòng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "Tên Khách Đặt",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Loại Phòng",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      {
        field: "requestService",
        headerName: "Dịch Vụ Đi Kèm",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.requestService}</div>;
        },
      },
      {
        field: "arrivalDate",
        headerName: "Ngày Đến",
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
        headerName: "Ngày Đi",
        width: 200,
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
        headerName: "Mã Đặt Phòng",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.id}</div>;
        },
      },

      {
        field: "name",
        headerName: "Tên Khách Đặt",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },

      {
        field: "roomType",
        headerName: "Loại Phòng",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.roomType}</div>;
        },
      },
      {
        field: "requestService",
        headerName: "Dịch Vụ Đi Kèm",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.requestService}</div>;
        },
      },
      {
        field: "arrivalDate",
        headerName: "Ngày Đến",
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
        headerName: "Ngày Đi",
        width: 200,
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
  const actionColumnCheckIn = [
    {
      field: "action",
      headerName: "Hành Động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="checkInButton"
              onClick={() => handleFillInfoCheckIn(params.row.id)}
            >
              Check In
            </div>
          </div>
        );
      },
    },
  ];
  const actionColumnCheckOut = [
    {
      field: "action",
      headerName: "Hành Động",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
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
  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách booking</div>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tất Cả" value="1" />
            <Tab label="Đến Trong Ngày" value="2" />
            <Tab label="Đi Trong Ngày" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DataGrid
            className="datagrid"
            rows={renderArr()}
            columns={allBooking}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </TabPanel>
        <TabPanel value="2">
          <DataGrid
            className="datagrid"
            rows={renderArrByDateToCheckIn()}
            columns={bookingArriveInDay.concat(actionColumnCheckIn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </TabPanel>
        <TabPanel value="3">
          <DataGrid
            className="datagrid"
            rows={renderArrByDateToCheckOut()}
            columns={bookingLeaveInDay.concat(actionColumnCheckOut)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}
