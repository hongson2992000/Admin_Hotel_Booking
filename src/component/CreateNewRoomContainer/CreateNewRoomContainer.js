import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateNewRoomContainer.scss";
import {
  showModalAddUser,
  showModalUpdateUser,
} from "../../redux/actions/ModalAction";
import { infoUserBookingState$ } from "../../redux/selectors/BookingManageSelector";
import {
  roomTypeState$,
  roomValidState$,
} from "../../redux/selectors/RoomManageSelector";
import * as actions from "../../redux/actions/BookingManageAction";
import {
  INFO_BOOKING_DETAIL,
  USER_LOGIN,
} from "../../utils/constants/settingSystem";
import { useNavigate, useParams } from "react-router-dom";
import AddNewCustomerModal from "../CheckInContainer/AddNewCustomerModal/AddNewCustomerModal";
import UpdateNewCustomerModal from "../CheckInContainer/UpdateNewCustomerModal/UpdateNewCustomerModal";
// import { info } from "sass";
import { useState } from "react";
import { getDayInRange, removeDuplicateInArray } from "../../utils/util";
import moment from "moment";
export default function CreateNewRoomContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoUser = useSelector(infoUserBookingState$);
  const [selectedValue, setSelectedValue] = React.useState(1);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const roomValid = useSelector(roomValidState$);
  const infoBooking = JSON.parse(localStorage.getItem(INFO_BOOKING_DETAIL));
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  const roomType = useSelector(roomTypeState$);
  const params = useParams();

  const formatNumber = (number) => {
    let numFormatted = number.toLocaleString("de-DE");
    return numFormatted;
  };
  const renderTypeRoom = () => {
    let roomType = "";
    switch (infoBooking?.roomTypeId) {
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
  let [totalPrice, setTotalPrice] = useState(0);
  // const renderFormatDate = (date) => {
  //   let arrDate = date.split("-");
  //   let formatDate = arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0];
  //   return formatDate;
  // };
  const today = (i) => {
    let today = new Date();
    let dd = today.getDate() + 1;
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    return today;
  };
  const onSubmitCheckIn = useCallback(
    (values) => {
      let arrActualArrivalDate = values.actualArrivalDate.split("-");
      let formatDate =
        arrActualArrivalDate[2] +
        "/" +
        arrActualArrivalDate[1] +
        "/" +
        arrActualArrivalDate[0];
      let arrArrivalDate = values.arrivalDate.split("-");
      let formatArrivalDate =
        arrArrivalDate[2] + "/" + arrArrivalDate[1] + "/" + arrArrivalDate[0];
      let arrDepartureDate = values.departureDate.split("-");
      let formatDepartureDate =
        arrDepartureDate[2] +
        "/" +
        arrDepartureDate[1] +
        "/" +
        arrDepartureDate[0];
      let bookingRequest = {
        actualArrivalDate: formatDate,
        actualDepartureDate: formatDate,
        arrivalDate: formatArrivalDate,
        confirmationNo: values.confirmationNo,
        createBy:
          userLogin.firstName +
          " " +
          userLogin.middleName +
          " " +
          userLogin.lastName,
        createDate: values.createDate,
        customer_Id: values.customer_Id,
        departureDate: formatDepartureDate,
        hotel_Id: 1,
        id: values.id,
        lastModifyBy:
          userLogin.firstName +
          " " +
          userLogin.middleName +
          " " +
          userLogin.lastName,
        numOfAdult: values.numOfAdult,
        numOfChildren: values.numOfChildren,
        roomPayment: "N/A",
        roomType_Id: values.roomTypeId,
        room_Id: values.room_Id,
        specialNote: values.specialNote,
        status: values.status,
        totalAmount: values.totalAmount,
        updateDate: moment().format("DD/MM/YYY"),
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

      dispatch(
        actions.checkInRoomInHotel.checkInRoomInHotelRequest({
          newInfoCheckInWithUser,
          navigate,
        })
      );
    },
    [navigate, infoUser, dispatch, userLogin, selectedValue]
  );
  const formik = useFormik({
    initialValues: {
      id: 0,
      room_Id: parseInt(params.roomId),
      name: "",
      createDate: moment().format("MM/DD/YYYY"),
      numOfAdult: roomType.maxAdult,
      numOfChildren: roomType.maxChildren,
      arrivalDate: moment().format("YYYY-MM-DD"),
      arrivalTime: "",
      departureDate: today(),
      departureTime: "12:00",
      customer_Id: "",
      phoneNumber: "",
      email: "",
      idNo: "",
      gender: 1,
      birthDate: "",
      status: "",
      actualArrivalDate: "",
      actualDepartureDate: "",
      confirmationNo: "",
      roomPayment: "",
      createBy:
        userLogin.firstName +
        " " +
        userLogin.middleName +
        " " +
        userLogin.lastName,
      hotel_Id: 1,
      roomTypeId: roomType.id,
      totalAmount: roomType.defaultPrice,
      specialNote: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitCheckIn(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      arrivalTime:Yup.string().required("Yêu cầu *"),
      actualArrivalDate: Yup.string().required("Yêu cầu *"),
      birthDate:Yup.string().required("Yêu cầu *"),
      email: Yup.string()
        .required("Yêu cầu")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Vui lòng nhập đúng email"
        ),
      name: Yup.string().required("Yêu cầu *"),
      phoneNumber: Yup.string().required("Yêu cầu *").matches(
        /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
        "Vui lòng nhập đúng số điện thoại"
      ),
      idNo: Yup.string().required("Yêu cầu *").min(9,"Vui lòng nhập đúng định dạng").max(12,"Vui lòng nhập đúng định dạng"),
    }),
  });
  let [depatureDate, setDepartureDate] = useState();
  const getTotalPrice = useCallback(() => {
    let price = 0;
    // const dayGap = moment(formik.values.departureDate).diff(moment(formik.values.arrivalDate), "days");
    // listRoomAvailability.map((roomType) => {
    // const currentRoomSelect = roomSelect.find((x) => x.id === roomType.id);
    // if (currentRoomSelect) {
    const cleanRoomPrices = removeDuplicateInArray(roomType.roomPrices);
    console.log("Ngay Den", formik.values.arrivalDate);
    console.log("Ngay Den", formik.values.departureDate);
    const dateRange = getDayInRange(
      formik.values.arrivalDate,
      formik.values.departureDate
    );
    dateRange.map((range, index) => {
      if (index < dateRange.length - 1) {
        const isFoundPriceForDate = cleanRoomPrices.find(
          (x) => x.date === moment(range).format("DD/MM/yyyy")
        );
        if (isFoundPriceForDate) {
          price += isFoundPriceForDate.price;
        } else {
          price += roomType.defaultPrice;
        }
      }
    });
    // }
    // );
    // if (arrayCheckedAirport.id !== 0) {
    //   const airPortPrice = airportShuttleList.find(
    //     (airPort) => airPort.id === arrayCheckedAirport.id
    //   );
    //   price += airPortPrice.price * roomSelect.length;
    // }
    setTotalPrice(price);
  }, [formik]);
  console.log("TOTAL PRICE", totalPrice);
  // console.log("DATE", moment(new Date(formik.values.arrivalDate)) +" " + moment(new Date(formik.values.departureDate)))
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
        headerName: "Số Điện Thoại",
        width: 170,
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
      headerName: "Hành Động",
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
    <div className="CreateNewRoomContainer">
      <div className="InfoRoomBooking">
        <p style={{ fontSize: "20px" }}>Phòng: {roomType.name}</p>
        <form className="form col-12" onSubmit={formik.handleSubmit}>
          <div className="top-form">
            <div className="roomNo">
              <span style={{ width: "150px", fontSize: "20px" }}>
                Số Phòng: {params.roomNo}
              </span>
              <span
                style={{
                  paddingLeft: "50px",
                  fontSize: "20px",
                  width: "300px",
                }}
              >
                Tiền phòng: {formatNumber(totalPrice)}
              </span>
              <div
                className="resetPriceButton"
                onClick={() => {
                  getTotalPrice();
                }}
              >
                Xem giá
              </div>
            </div>
          </div>
          <hr />
          <div className="col-12 InfoRoom">
            <div className="row">
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Ngày Đến </InputLabel>
                <input
                  className="title"
                  style={{ padding: "0.875rem", borderRadius: "5px" }}
                  type="date"
                  disabled
                  min={moment().format("YYYY-MM-DD")}
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formik.values.arrivalDate}
                  onChange={formik.handleChange}
                />
                {formik.errors.arrivalDate && (
                  <p style={{ color: "red" }}>{formik.errors.arrivalDate}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Ngày Đi</InputLabel>
                <input
                  className="title"
                  style={{ padding: "0.875rem", borderRadius: "5px" }}
                  type="date"
                  required
                  id="departureDate"
                  name="departureDate"
                  value={formik.values.departureDate}
                  onChange={formik.handleChange}
                  min={today()}
                />
              </div>
              <div className="col-2 simpleModalItem">
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
                {formik.errors.arrivalTime && (
                  <p style={{ color: "red" }}>{formik.errors.arrivalTime}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
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
                {formik.errors.departureTime && (
                  <p style={{ color: "red" }}>{formik.errors.departureTime}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
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
                {formik.errors.actualArrivalDate && (
                  <p style={{ color: "red" }}>{formik.errors.actualArrivalDate}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
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
              <div className="col-2 simpleModalItem">
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
              <div className="col-2 simpleModalItem">
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
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Tên Khách Hàng</InputLabel>
                <TextField
                  className="title"
                  required
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <p style={{ color: "red" }}>{formik.errors.name}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Số Điện Thoại</InputLabel>
                <TextField
                  className="title"
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
                {formik.errors.phoneNumber && (
                  <p style={{ color: "red" }}>{formik.errors.phoneNumber}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Email</InputLabel>
                <TextField
                  className="title"
                  required
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <p style={{ color: "red" }}>{formik.errors.email}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Số Hộ Chiếu/CCCD</InputLabel>
                <TextField
                  className="title"
                  required
                  id="idNo"
                  name="idNo"
                  value={formik.values.idNo}
                  onChange={formik.handleChange}
                />
                {formik.errors.idNo && (
                  <p style={{ color: "red" }}>{formik.errors.idNo}</p>
                )}
              </div>
              <div className="col-2 simpleModalItem">
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
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Ngày Sinh</InputLabel>
                <input
                  id="birthDate"
                  type="date"
                  name="birthDate"
                  className="title"
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                  style={{ padding: "0.875rem", borderRadius: "5px" }}
                  max={moment().format("YYYY-MM-DD")}
                />
                {formik.errors.birthDate && (
                  <p style={{ color: "red" }}>{formik.errors.birthDate}</p>
                )}
              </div>
            </div>
          </div>
          <div className="buttonCheckIn">
            {infoUser.length !== 0 && selectedValue !== 1 ? (
              <button type="submit" className="buttonCheckInItem">
                Check In Tại Hotel
              </button>
            ) : (
              <button
                type="submit"
                className="buttonCheckInItem"
                disabled
                style={{ pointerEvents: "none" }}
              >
                Check In Tại Hotel
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
          {formik.values.numOfAdult + formik.values.numOfChildren <=
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
      <AddNewCustomerModal />
      <UpdateNewCustomerModal />
    </div>
  );
}
