import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./InfomationCustomerContainer.scss";
import { showModalAddUser } from "../../redux/actions/ModalAction";
import {
  bookingItemState$,
  infoUserBookingState$,
} from "../../redux/selectors/BookingManageSelector";
import { roomValidState$ } from "../../redux/selectors/RoomManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
import { INFO_BOOKING_DETAIL } from "../../utils/constants/settingSystem";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
export default function InfomationCustomerContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoUser = useSelector(infoUserBookingState$);
  const roomValid = useSelector(roomValidState$);
  const params = useParams();
  const infoCustomer = useSelector(bookingItemState$);
  const renderCurrentDate = () => {
    let currentDate = moment().format("YYYY-MM-DD");
    return currentDate;
  };
  const renderListCustomer = () => {
    let arrNew = [];
    let listCustomerNew = infoCustomer.listCustomer?.filter(
      (item) => item.id !== infoCustomer.primaryCustomer.id
    );
    listCustomerNew?.forEach((item, index) => {
      arrNew.push({
        stt: index + 1,
        name: item.firstName + " " + item.middleName + " " + item.lastName,
        phoneNumber: item.phoneNumber,
        email: item.email,
        idNo: item.idNo,
        gender: item.gender === 1 ? "Nam" : "Nữ",
        birthDate: item.birthDate,
      });
    });
    return arrNew;
  };
  const renderListOrder = () => {
    let arrNew = [];
    infoCustomer.booking?.orders.forEach((item, i) => {
      item.orderDetails?.forEach((itemOder, index) => {
        arrNew.push({
          stt: i + 1,
          orderDate: itemOder.orderDate.substring(0,10),
          name: itemOder.service.name,
          quantity: itemOder.quantity,
          price: itemOder.service.price,
          status: "Chưa Thanh Toán",
        });
      });
    });
    return arrNew;
  };
  const [dataInfoCustomer, setDataInfoCustomer] = useState(infoCustomer);
  console.log(renderCurrentDate());
  const renderTypeRoom = (roomType_id) => {
    let roomType = "";
    switch (roomType_id) {
      case 1:
        return (roomType = "Deluxe King/ Cao cấp");
      case 2:
        return (roomType = "Deluxe Twin/ Cao cấp");
      case 3:
        return (roomType = "Superior King/ Phòng thường");
      case 4:
        return (roomType = "Superior Twin/ Phòng thường");
      case 5:
        return (roomType = "Standard King/ Phòng thường");
      case 6:
        return (roomType = "Standard Twin/ Phòng thường");
      default:
        return roomType;
    }
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      room_Id: "",
      createDate: "",
      numOfAdult: infoCustomer.booking?.numOfAdult,
      numOfChildren: infoCustomer.booking?.numOfChildren,
      arrivalDate: infoCustomer.booking?.arrivalDate.substring(0, 10),
      arrivalTime: infoCustomer.booking?.arrivalDate.substring(10),
      departureDate: infoCustomer.booking?.departureDate.substring(0, 10),
      departureTime: infoCustomer.booking?.departureDate.substring(10),
      customer_Id: "",
      nameCustomer:
        infoCustomer.primaryCustomer?.firstName +
        " " +
        infoCustomer.primaryCustomer?.middleName +
        " " +
        infoCustomer.primaryCustomer?.lastName,
      phoneNumber: infoCustomer.primaryCustomer?.phoneNumber,
      email: infoCustomer.primaryCustomer?.email,
      idNo: infoCustomer.primaryCustomer?.idNo,
      gender: infoCustomer.primaryCustomer?.gender === 1 ? "Nam" : "Nữ",
      birthDate: infoCustomer.primaryCustomer?.birthDate,
      status: "",
      actualArrivalDate: "",
      actualDepartureDate: "",
      confirmationNo: "",
      roomPayment: "",
      createBy: "",
      hotel_Id: "",
      roomType: renderTypeRoom(infoCustomer.booking?.roomTypeId),
      roomNo:infoCustomer.room.roomNo,
      totalAmount: "",
      specialNote: "",
    },
    onSubmit: (values, { resetForm }) => {
      //   onSubmitCheckIn(values);
      resetForm({ values: "" });
    },
    enableReinitialize: true,
  });
  let handleDelete = () => {};
  let infoUserColumns = useMemo(
    () => [
      {
        field: "stt",
        headerName: "STT",
        width: 100,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.stt}</div>;
        },
      },
      {
        field: "name",
        headerName: "Tên Khách Hàng",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },
      {
        field: "phoneNumber",
        headerName: "Số điện thoại",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.phoneNumber}</div>;
        },
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.email}</div>;
        },
      },

      {
        field: "idNo",
        headerName: "Số Hộ Chiếu",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.idNo}</div>;
        },
      },
      {
        field: "gender",
        headerName: "Giới Tính",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.gender}</div>;
        },
      },
      {
        field: "birthDate",
        headerName: "Ngày sinh",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.birthDate}</div>;
        },
      },
    ],
    []
  );
  let infoOrder = useMemo(
    () => [
      {
        field: "stt",
        headerName: "STT",
        width: 100,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.stt}</div>;
        },
      },
      {
        field: "name",
        headerName: "Tên dịch vụ",
        width: 350,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.name}</div>;
        },
      },
      {
        field: "price",
        headerName: "Đơn giá",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.price}</div>;
        },
      },
      {
        field: "quantity",
        headerName: "Số lượng",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.quantity}</div>;
        },
      },

      {
        field: "orderDate",
        headerName: "Ngày đặt",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.orderDate}</div>;
        },
      },
      {
        field: "status",
        headerName: "Trạng thái",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.status}</div>;
        },
      },
    ],
    []
  );
  const actionColumn = [
    {
      field: "action",
      headerName: "Chức năng",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="updateButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Cập Nhật
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="InfomationCustomerContainer">
      <div className="InfoRoomBooking">
        <h2>
          {infoCustomer.primaryCustomer?.firstName +
            " " +
            infoCustomer.primaryCustomer?.middleName +
            " " +
            infoCustomer.primaryCustomer?.lastName}
        </h2>
        <form
          noValidate
          autoComplete="off"
          className="form col-12"
          onSubmit={formik.handleSubmit}
        >
          <hr />
          <div className="col-12 InfoRoom">
            <div className="row">
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Đến</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formik.values.arrivalDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Đi</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="departureDate"
                  name="departureDate"
                  value={formik.values.departureDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Giờ Đến</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="arrivalTime"
                  name="arrivalTime"
                  value={formik.values.arrivalTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Giờ Đi</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="departureTime"
                  name="departureTime"
                  value={formik.values.departureTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Số phòng</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="roomNo"
                  name="roomNo"
                  value={formik.values.roomNo}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Loại phòng</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="roomType"
                  name="roomType"
                  value={formik.values.roomType}
                  onChange={formik.handleChange}
                />
              </div>
              {/* <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Đến Thực Tế</InputLabel>
                <input
                  className="title"
                  style={{ padding: "0.875rem", borderRadius: "5px" }}
                  type="date"
                  required
                  min={moment().format("YYYY-MM-DD")}
                  id="actualArrivalDate"
                  name="actualArrivalDate"
                  value={formik.values.actualArrivalDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Đi Thực Tế</InputLabel>
                <input
                  className="title"
                  style={{ padding: "0.875rem", borderRadius: "5px" }}
                  type="date"
                  required
                  min={moment().format("YYYY-MM-DD")}
                  id="actualDepartureDate"
                  name="actualDepartureDate"
                  value={formik.values.actualDepartureDate}
                  onChange={formik.handleChange}
                />
              </div> */}
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Tên Khách Hàng</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="nameCustomer"
                  name="nameCustomer"
                  value={formik.values.nameCustomer || ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Số Điện Thoại</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Email</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Số Hộ Chiếu/CCCD</InputLabel>
                <TextField
                  className="title"
                  required
                  disabled
                  id="idNo"
                  name="idNo"
                  value={formik.values.idNo}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Giới tính</InputLabel>
                <TextField
                  className="title"
                  required
                  disabled
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Sinh</InputLabel>
                <TextField
                  id="birthDate"
                  name="birthDate"
                  disabled
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                  // defaultValue="2022-05-24"
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Người lớn</InputLabel>
                <TextField
                  className="title"
                  required
                  id="numOfAdult"
                  name="numOfAdult"
                  value={formik.values.numOfAdult}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Trẻ em</InputLabel>
                <TextField
                  className="title"
                  required
                  id="numOfChildren"
                  name="numOfChildren"
                  value={formik.values.numOfChildren}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          {/* <div className="buttonCheckIn">
            {infoUser?.length !== 0 ? (
              <button type="submit" className="buttonCheckInItem">
                Check In
              </button>
            ) : (
              <button
                type="submit"
                className="buttonCheckInItem"
                disabled
                style={{ pointerEvents: "none" }}
              >
                Check In
              </button>
            )}
          </div> */}
        </form>
        <span style={{ paddingTop: "40px" }}>Khách Ở Cùng</span>
        <hr style={{ width: "20%" }} />
        <DataGrid
          getRowId={(row) => row.stt}
          className="datagrid"
          rows={renderListCustomer()}
          columns={infoUserColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
        <span style={{ paddingTop: "40px" }}>
          Tiền Phòng: {infoCustomer.booking?.totalAmount}
        </span>
        <hr style={{ width: "20%" }} />
        <span style={{ paddingTop: "40px" }}>Dịch Vụ Sử Dụng</span>
        <hr style={{ width: "20%" }} />
        <DataGrid
          getRowId={(row) => row.stt}
          className="datagrid"
          rows={renderListOrder()}
          columns={infoOrder}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />
        {/* <div className="buttonAddCustomer">
          {infoBooking.numOfAdult + infoBooking.numOfChildren <=
          infoUser.length ? (
            <button
              onClick={openCreateServiceModal}
              className="buttonAddCustomerItem"
              disabled
            >
              Thêm Khách +
            </button>
          ) : (
            <button
              onClick={openCreateServiceModal}
              className="buttonAddCustomerItem"
            >
              Thêm Khách +
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}
