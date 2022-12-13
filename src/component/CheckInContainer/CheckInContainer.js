import {
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useDispatch, useSelector } from "react-redux";
import "./CheckInContainer.scss";
import {
  showModalAddUser,
  showModalUpdateUser,
} from "../../redux/actions/ModalAction";
import { infoUserBookingState$ } from "../../redux/selectors/BookingManageSelector";
import { roomValidState$ } from "../../redux/selectors/RoomManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
import { INFO_BOOKING_DETAIL } from "../../utils/constants/settingSystem";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import UpdateNewCustomerModal from "./UpdateNewCustomerModal/UpdateNewCustomerModal";
export default function CheckInContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoUser = useSelector(infoUserBookingState$);
  console.log("InfoUser", infoUser);
  const roomValid = useSelector(roomValidState$);
  const infoBooking = JSON.parse(localStorage.getItem(INFO_BOOKING_DETAIL));
  const renderCurrentDate = () => {
    let currentDate = moment().format("YYYY-MM-DD");
    return currentDate;
  };
  const [selectedValue, setSelectedValue] = React.useState(1);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
  const renderRoomavailability = () => {
    // let listRoomailAbility = roomValid.filter((item) => item.status === false);
    let renderMenu = roomValid?.map((item, index) => (
      <MenuItem value={item.id} key={index}>
        {item.roomNo}
      </MenuItem>
    ));
    return renderMenu;
  };
  // const renderFormatDate = (date) => {
  //   let arrDate = date.split("-");
  //   let formatDate = arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0];
  //   return formatDate;
  // };
  let handleUpdateInfoUser = useCallback(
    (id) => {
      let userUpdate = infoUser.find((item) => item.id === id);
      dispatch(
        actions.fillFormUpdateUserBooking.fillFormUpdateUserBookingRequest(
          userUpdate
        )
      );
      dispatch(showModalUpdateUser());
    },
    [infoUser, dispatch]
  );
  const handleDeleteInfoUser = useCallback(
    (id) => {
      let userDelete = infoUser.find((item) => item.id === id);
      dispatch(
        actions.deleteNewUserBooking.deleteNewUserBookingRequest(userDelete)
      );
    },
    [dispatch, infoUser]
  );
  const onSubmitCheckIn = useCallback(
    (values) => {
      let arrActualArrivalDate = values.actualArrivalDate.split("-");
      let formatDate =
        arrActualArrivalDate[2] +
        "/" +
        arrActualArrivalDate[1] +
        "/" +
        arrActualArrivalDate[0];
      let bookingRequest = {
        actualArrivalDate: formatDate,
        actualDepartureDate: formatDate,
        arrivalDate: values.arrivalDate,
        confirmationNo: values.confirmationNo,
        createBy: values.createBy,
        createDate: values.createDate,
        customer_Id: values.customer_Id,
        departureDate: values.departureDate,
        hotel_Id: values.hotel_Id,
        id: values.id,
        lastModifyBy: "",
        numOfAdult: values.numOfAdult,
        numOfChildren: values.numOfChildren,
        roomPayment: values.roomPayment,
        roomType_Id: values.roomTypeId,
        room_Id: values.room_Id,
        specialNote: values.specialNote,
        status: values.status,
        totalAmount: values.totalAmount,
        updateDate: "",
      };
      let arrInfoUserNew = [];
      infoUser.forEach((item) => {
        arrInfoUserNew.push({
          id: item.id,
          birthDate: item.birthDate,
          createBy: item.createBy,
          createDate: item.createDate,
          email: item.email,
          firstName: item.firstName,
          gender: item.gender,
          phoneNumber: item.phoneNumber,
          lastName: item.lastName,
          middleName: item.middleName,
          passportNo: item.passportNo,
          idNo: item.idNo,
          updateDate: item.updateDate,
          lastModifyBy: item.lastModifyBy,
          primary: item.id.toString() === selectedValue ? true : false,
        });
      });
      let newInfoCheckInWithUser = {
        bookingRequest: bookingRequest,
        customerRequests: arrInfoUserNew,
      };

      console.log("NewCheckInFo", newInfoCheckInWithUser);
      dispatch(
        actions.checkInRoom.checkInRoomRequest({
          newInfoCheckInWithUser,
          navigate,
        })
      );
    },
    [selectedValue, infoUser]
  );
  const formik = useFormik({
    initialValues: {
      id: infoBooking?.id,
      room_Id: infoBooking?.room_Id,
      name:
        infoBooking?.customer.firstName +
        " " +
        infoBooking?.customer.middleName +
        " " +
        infoBooking?.customer.lastName,
      createDate: infoBooking?.createDate,
      numOfAdult: infoBooking?.numOfAdult,
      numOfChildren: infoBooking?.numOfChildren,
      arrivalDate: infoBooking?.arrivalDate.substring(0, 10),
      arrivalTime: "",
      departureDate: infoBooking?.departureDate.substring(0, 10),
      departureTime: "12:00",
      customer_Id: infoBooking?.customer.id,
      phoneNumber: infoBooking?.customer.phoneNumber,
      email: infoBooking?.customer.email,
      idNo: infoBooking?.customer.idNo,
      gender: infoBooking?.customer.gender,
      birthDate: infoBooking?.customer.birthDate,
      status: infoBooking?.status,
      actualArrivalDate: "",
      actualDepartureDate: "",
      confirmationNo: infoBooking?.confirmationNo,
      roomPayment: infoBooking?.roomPayment,
      createBy: infoBooking?.createBy,
      hotel_Id: infoBooking?.hotel_Id,
      roomTypeId: infoBooking?.roomTypeId,
      totalAmount: infoBooking?.totalAmount,
      specialNote: infoBooking?.specialNote,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitCheckIn(values);
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
        width: 150,
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
          return (
            <div className="cellWithImg">
              {params.row.gender === 1 ? "Nam" : "Nữ"}
            </div>
          );
        },
      },
    ],
    []
  );
  const actionColumn = [
    {
      field: "action1",
      headerName: "Người Đại Diện",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <input
              // checked={selectedValue === params.row.id}
              type="radio"
              onChange={handleChange}
              value={params.row.id}
              name="radio-buttons"
              // inputProps={{ "aria-label": "A" }}
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="updateButton"
              onClick={() => handleUpdateInfoUser(params.row.id)}
            >
              Cập Nhật
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDeleteInfoUser(params.row.id)}
            >
              Xóa
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
                Tiền Phòng: {infoBooking?.totalAmount}
              </span>
            </div>
          </div>
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
              {/* <div className="col-2 InfoRoomItem">
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
                <InputLabel className="label">Mã Đặt Phòng</InputLabel>
                <TextField
                  className="title"
                  required
                  disabled
                  id="id"
                  name="id"
                  value={formik.values.id || ""}
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
                  value={formik.values.name || ""}
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
                  value={formik.values.createDate || ""}
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
                  value={formik.values.numOfAdult || ""}
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
            </div>
          </div>
          <span style={{ paddingTop: "30px" }}>Thông Tin Khách Đặt</span>
          <hr style={{ width: "20%" }} />
          <div className="col-12 InfoRoom">
            <div className="row" style={{ paddingBottom: "20px" }}>
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
            </div>
          </div>
          <div className="buttonCheckIn">
            {infoUser.length !== 0 && selectedValue !== 1 ? (
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
          </div>
        </form>
        <span style={{ paddingTop: "40px" }}>Thông Tin Khách Ở</span>
        <hr style={{ width: "20%" }} />
        <DataGrid
          getRowId={(row) => row.id}
          className="datagrid"
          rows={infoUser}
          columns={infoUserColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />

        <div className="buttonAddCustomer">
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
        </div>
      </div>
      <UpdateNewCustomerModal />
    </div>
  );
}
