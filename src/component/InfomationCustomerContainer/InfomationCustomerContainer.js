import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./InfomationCustomerContainer.scss";
import { showModalAddUser } from "../../redux/actions/ModalAction";
import { infoUserBookingState$ } from "../../redux/selectors/BookingManageSelector";
import { roomValidState$ } from "../../redux/selectors/RoomManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
import { INFO_BOOKING_DETAIL } from "../../utils/constants/settingSystem";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function InfomationCustomerContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoUser = useSelector(infoUserBookingState$);
  const roomValid = useSelector(roomValidState$);
  const infoBooking = JSON.parse(localStorage.getItem(INFO_BOOKING_DETAIL));
  const renderCurrentDate = () => {
    let currentDate = moment().format("YYYY-MM-DD");
    return currentDate;
  };
  const [data,setData] = useState()
  console.log(renderCurrentDate());
  const renderTypeRoom = () => {
    let roomType = "";
    switch (infoBooking.roomTypeId) {
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
//   const renderRoomavailability = () => {
//     // let listRoomailAbility = roomValid.filter((item) => item.status === false);
//     let renderMenu = roomValid?.map((item, index) => (
//       <MenuItem value={item.id} key={index}>
//         {item.roomNo}
//       </MenuItem>
//     ));
//     return renderMenu;
//   };
//   const onSubmitCheckIn = useCallback(
//     (values) => {
//       let arrActualArrivalDate = values.actualArrivalDate.split("-");
//       let formatDate =
//         arrActualArrivalDate[2] +
//         "/" +
//         arrActualArrivalDate[1] +
//         "/" +
//         arrActualArrivalDate[0];
//       let arrDateActualDepartureDate = values.actualDepartureDate.split("-");
//       let formatActualDepartureDate =
//         arrDateActualDepartureDate[2] +
//         "/" +
//         arrDateActualDepartureDate[1] +
//         "/" +
//         arrDateActualDepartureDate[0];
//       let bookingRequest = {
//         actualArrivalDate: formatDate,
//         actualDepartureDate: formatActualDepartureDate,
//         arrivalDate: values.arrivalDate,
//         confirmationNo: values.confirmationNo,
//         createBy: values.createBy,
//         createDate: values.createDate,
//         customer_Id: values.customer_Id,
//         departureDate: values.departureDate,
//         hotel_Id: values.hotel_Id,
//         id: values.id,
//         lastModifyBy: "",
//         numOfAdult: values.numOfAdult,
//         numOfChildren: values.numOfChildren,
//         roomPayment: values.roomPayment,
//         roomType_Id: values.roomTypeId,
//         room_Id: values.room_Id,
//         specialNote: values.specialNote,
//         status: values.status,
//         totalAmount: values.totalAmount,
//         updateDate: "",
//       };
//       let newInfoCheckInWithUser = {
//         bookingRequest: bookingRequest,
//         customerRequests: infoUser,
//       };

//       console.log("NewCheckInFo", newInfoCheckInWithUser);
//       dispatch(
//         actions.checkInRoom.checkInRoomRequest({
//           newInfoCheckInWithUser,
//           navigate,
//         })
//       );
//     },
//     [navigate, infoUser, dispatch]
//   );
  const formik = useFormik({
    initialValues: {
      id: "",
      room_Id: "",
      name:
      "",
      createDate: "",
      numOfAdult: "",
      numOfChildren: "",
      arrivalDate: "",
      arrivalTime: "",
      departureDate: "",
      departureTime: "12:00",
      customer_Id: "",
      phoneNumber: "",
      email: "",
      idNo: "",
      gender: "",
      birthDate: "",
      status: "",
      actualArrivalDate: "",
      actualDepartureDate: "",
      confirmationNo: "",
      roomPayment: "",
      createBy: "",
      hotel_Id: "",
      roomTypeId: "",
      totalAmount: "",
      specialNote: "",
    },
    onSubmit: (values, { resetForm }) => {
    //   onSubmitCheckIn(values);
      resetForm({ values: "" });
    },
  });
  let handleDelete = () => {};
  let infoUserColumns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Tên Khách Hàng",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params?.row.firstName +
                " " +
                params?.row.middleName +
                " " +
                params?.row.lastName}
            </div>
          );
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
        width: 100,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.gender === 1 ? "Nam" : "Nữ"}
            </div>
          );
        },
      },
      {
        field: "primary",
        headerName: "Đại Diện",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.primary === true ? "Người Đại Diện" : "Người Thường"}
            </div>
          );
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
        {/* <p>Phòng: {renderTypeRoom()}</p> */}
        <p>Ghệ Đẹp Thanh An</p>
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
                  value={formik.values.arrivalDate || ""}
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
                  required
                  type="time"
                  id="arrivalTime"
                  name="arrivalTime"
                  value={formik.values.arrivalTime || ""}
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
                  id="departureTime"
                  name="departureTime"
                  value={formik.values.departureTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Loại phòng</InputLabel>
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
                  id="name"
                  name="name"
                  value={formik.values.name || ""}
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
                  id="idNo"
                  name="idNo"
                  value={formik.values.idNo}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Sinh</InputLabel>
                <TextField
                  id="birthDate"
                  type="date"
                  name="birthDate"
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
                  id="idNo"
                  name="idNo"
                  value={formik.values.idNo}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Trẻ em</InputLabel>
                <TextField
                  className="title"
                  required
                  id="idNo"
                  name="idNo"
                  value={formik.values.idNo}
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
        {/* <DataGrid
          getRowId={(row) => row.id}
          className="datagrid"
          rows={data}
          columns={infoUserColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        /> */}

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
