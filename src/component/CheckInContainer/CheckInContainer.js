import { InputLabel, MenuItem, Select, TextField, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookingItemState$ } from "../../redux/selectors/BookingManageSelector";
import "./CheckInContainer.scss";
import {
  showModalAddUser,
  hideModalAddUser,
} from "../../redux/actions/ModalAction";
import { infoUserBookingState$ } from "../../redux/selectors/BookingManageSelector";
import { roomManageState$ } from "../../redux/selectors/RoomManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
// import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/lab";

export default function CheckInContainer() {
  const dispatch = useDispatch();
  const infoUser = useSelector(infoUserBookingState$);
  console.log("InfoUser", infoUser);
  const listRoom = useSelector(roomManageState$);
  const infoBooking = useSelector(bookingItemState$);
  console.log("Hello Son", infoBooking);
  const renderTypeRoom = () => {
    let roomType = "";
    switch (infoBooking.roomTypeId) {
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
  const renderRoomavailability = () => {
    let listRoomailAbility = listRoom.filter((item) => item.status === false);
    let renderMenu = listRoomailAbility.map((item, index) => (
      <MenuItem value={item.id} key={index}>
        {item.roomNo}
      </MenuItem>
    ));
    return renderMenu;
  };
  const onSubmitCheckIn = useCallback(
    (values) => {
      let bookingRequest = {
        actualArrivalDate: values.actualArrivalDate,
        actualDepartureDate: values.actualDepartureDate,
        arrivalDate: values.arrivalDate,
        confirmationNo: 0,
        createBy: values.createBy,
        createDate: values.createDate,
        customer_Id: values.customer_Id,
        departureDate: values.departureDate,
        hotel_Id: values.hotel_Id,
        id: values.id,
        lastModifyBy: "",
        numOfAdult: values.numOfAdult,
        numOfChildren: values.numOfChildren,
        roomPayment: "",
        roomType_Id: values.roomTypeId,
        room_Id: values.room_Id,
        specialNote: "",
        status: true,
        totalAmount: values.totalAmount,
        updateDate: "",
      };
      // console.log("ARRRR", infoUser);
      // let infoCheckIn = {};
      // let newInfoCheckIn = Object.assign(infoCheckIn, { bookingRequest });

      let newInfoCheckInWithUser = {
        bookingRequest: bookingRequest,
        customer: infoUser,
      };

      console.log("NewCheckInFo", newInfoCheckInWithUser);
      dispatch(actions.checkInRoom.checkInRoomRequest(newInfoCheckInWithUser));
    },
    [infoUser, dispatch]
  );
  const formik = useFormik({
    initialValues: {
      id: infoBooking.id,
      room_Id: infoBooking.room_Id,
      name:
        infoBooking.customer.firstName +
        " " +
        infoBooking.customer.middleName +
        " " +
        infoBooking.customer.lastName,
      createDate: infoBooking.createDate,
      numOfAdult: infoBooking.numOfAdult,
      numOfChildren: infoBooking.numOfChildren,
      arrivalDate: infoBooking.arrivalDate,
      arrivalTime: "",
      departureDate: infoBooking.departureDate,
      departureTime: "12:00",
      customer_Id: infoBooking.customer.id,
      phoneNumber: infoBooking.customer.phoneNumber,
      email: infoBooking.customer.email,
      idNo: infoBooking.customer.idNo,
      gender: infoBooking.customer.gender,
      birthDate: infoBooking.customer.birthDate,
      status: true,
      actualArrivalDate: "",
      actualDepartureDate: "",
      confirmationNo: "",
      createBy: "",
      hotel_Id: 0,
      roomTypeId: infoBooking.roomTypeId,
      totalAmount: infoBooking.totalAmount,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitCheckIn(values);
      resetForm({ values: "" });
    },
  });
  let [dataUser, setDataUser] = useState([]);
  let handleDelete = () => { };
  let infoUserColumns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Tên Khách Hàng",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.lastName}</div>;
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
        width: 200,
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
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.gender}</div>;
        },
      },
      {
        field: "birthDate",
        headerName: "Ngày Sinh",
        width: 200,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.birthDate}</div>;
        },
      },
    ],
    []
  );
  const actionColumn = [
    {
      field: "action",
      headerName: "Chức năng",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Xoá
            </div>
          </div>
        );
      },
    },
  ];
  // const [value, setValue] = React.useState("2022-04-07");
  const openCreateServiceModal = useCallback(() => {
    dispatch(showModalAddUser());
  }, [dispatch]);
  return (
    <div className="CheckInContainer">
      <div className="InfoRoomBooking">
        <p>Phòng: {renderTypeRoom()}</p>
        <form
          noValidate
          autoComplete="off"
          className="form col-12"
          onSubmit={formik.handleSubmit}
        >
          <div className="top-form">
            <div className="roomNo">
              <span style={{ width: "100px" }}>Số Phòng:</span>
              <Select
                className="title"
                required
                id="room_Id"
                name="room_Id"
                value={formik.values.room_Id || ""}
                onChange={formik.handleChange}
              >
                {renderRoomavailability()}
              </Select>
              <span style={{ paddingLeft: "50px" }}>
                Tiền Phòng: {infoBooking.totalAmount}
              </span>
            </div>
          </div>
          <hr />
          <div className="col-12 InfoRoom">
            <div className="row">
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Mã Đặt Phòng</InputLabel>
                <TextField
                  className="title"
                  required
                  disabled
                  id="id"
                  name="id"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Tên Khách Hàng</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Đặt</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="createDate"
                  name="createDate"
                  value={formik.values.createDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Người Lớn</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="numOfAdult"
                  name="numOfAdult"
                  value={formik.values.numOfAdult}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Trẻ Em</InputLabel>
                <TextField
                  className="title"
                  disabled
                  required
                  id="numOfChildren"
                  name="numOfChildren"
                  value={formik.values.numOfChildren}
                  onChange={formik.handleChange}
                />
              </div>
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
                <InputLabel className="label">Giờ Đến</InputLabel>
                <TextField
                  className="title"
                  required
                  id="arrivalTime"
                  name="arrivalTime"
                  value={formik.values.arrivalTime}
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
            </div>
          </div>
          <p style={{ paddingTop: "20px" }}>Thông Tin Khách Đặt</p>
          <hr style={{ width: "20%" }} />
          <div className="col-12 InfoRoom">
            <div className="row">
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Tên Khách Hàng</InputLabel>
                <TextField
                  className="title"
                  required
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Số Điện Thoại</InputLabel>
                <TextField
                  className="title"
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
                  id="idNo"
                  name="idNo"
                  value={formik.values.idNo}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel>Giới Tính</InputLabel>
                <Select
                  className="title"
                  required
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={1}>Nam</MenuItem>
                  <MenuItem value={0}>Nữ</MenuItem>
                </Select>
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Sinh</InputLabel>

                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue="2017-05-24"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </div>
            <div className="buttonCheckIn" style={{ width: "100px" }}>
              <button
                type="submit"
                className="buttonCheckInItem btn btn-primary"
              >
                Check In
              </button>
            </div>
          </div>
        </form>
        {/* <div className="datatableService">
        Thông tin khách ở
          <div className="datatableTitle">
            
            <button onClick={openCreateServiceModal} className="link">
                Check In
              </button>
            {infoBooking.numOfAdult + infoBooking.numOfChildren <=
            infoUser.length ? (
              <button
                onClick={openCreateServiceModal}
                className="link"
                disabled
              >
                Thêm Khách +
              </button>
            ) : (
              <button onClick={openCreateServiceModal} className="link">
                Thêm Khách +
              </button>
            )}
          </div>
          <DataGrid
            getRowId={(row) => row.id}
            className="datagrid"
            rows={infoUser}
            columns={infoUserColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </div> */}
        <p style={{ paddingTop: "20px" }}>Thông Tin Khách Ở</p>
        <hr style={{ width: "20%" }} />
          <DataGrid
            getRowId={(row) => row.id}
            className="datagrid"
            rows={infoUser}
            columns={infoUserColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />

        <div className="buttonCheckIn">
          {infoBooking.numOfAdult + infoBooking.numOfChildren <=
            infoUser.length ? (
            <button onClick={openCreateServiceModal} className="link" disabled>
              Thêm Khách +
            </button>
          ) : (
            <button onClick={openCreateServiceModal} className="link">
              Thêm Khách +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
