import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
export default function CheckInContainer() {
  const dispatch = useDispatch();
  const infoUser = useSelector(infoUserBookingState$);

  console.log("Hello Son", infoUser);
  const infoBooking = useSelector(bookingItemState$);
  const formik = useFormik({
    initialValues: {
      id: infoBooking.id,
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
      phoneNumber: infoBooking.customer.phoneNumber,
      email: infoBooking.customer.email,
      idNo: infoBooking.customer.idNo,
      gender: infoBooking.customer.gender === 1 ? "Nam" : "Nữ",
      birthDate: infoBooking.customer.birthDate,
    },
    onSubmit: (values, { resetForm }) => {
      //   onSubmitService(values);
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
            {/* <div
              className="updateButton"
              onClick={() => openUpdateServiceModal(params.row.id)}
            >
              Cập nhật
            </div> */}
            {/* <Link to="" style={{ textDecoration: "none" }}>
              <div className="viewButton">Xem</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              {" "}
              Xoá
            </div>
          </div>
        );
      },
    },
  ];
  const openCreateServiceModal = useCallback(() => {
    dispatch(showModalAddUser());
  }, [dispatch]);
  return (
    <div className="CheckInContainer">
      <div className="InfoRoomBooking">
        <p>Phòng: Standard Room</p>
        <form>
          <div className="top-form">
            <div className="roomNo">
              <span style={{ width: "100px" }}>Số Phòng:</span>
              <Select
                className="title"
                required
                id="serviceCategory_Id"
                name="serviceCategory_Id"
                value={formik.values.serviceCategory_Id || ""}
                onChange={formik.handleChange}
              >
                <MenuItem value={1}>Thức ăn</MenuItem>
                <MenuItem value={2}>Đồ uống</MenuItem>
              </Select>
              <span style={{ paddingLeft: "50px" }}>Tiền Phòng:</span>
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
                <InputLabel className="label">Giới Tính</InputLabel>
                <TextField
                  className="title"
                  required
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-2 InfoRoomItem">
                <InputLabel className="label">Ngày Sinh</InputLabel>
                <TextField
                  className="title"
                  required
                  id="birthDate"
                  name="birthDate"
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                />
              </div>
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
          <a className="link">Check In</a>
        </div>
      </div>
    </div>
  );
}
