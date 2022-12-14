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
      arrivalTime:Yup.string().required("Y??u c???u *"),
      actualArrivalDate: Yup.string().required("Y??u c???u *"),
      birthDate:Yup.string().required("Y??u c???u *"),
      email: Yup.string()
        .required("Y??u c???u")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Vui l??ng nh???p ????ng email"
        ),
      name: Yup.string().required("Y??u c???u *"),
      phoneNumber: Yup.string().required("Y??u c???u *").matches(
        /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
        "Vui l??ng nh???p ????ng s??? ??i???n tho???i"
      ),
      idNo: Yup.string().required("Y??u c???u *").min(9,"Vui l??ng nh???p ????ng ?????nh d???ng").max(12,"Vui l??ng nh???p ????ng ?????nh d???ng"),
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
        headerName: "T??n Kh??ch H??ng",
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
        headerName: "S??? ??i???n Tho???i",
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
        headerName: "S??? H??? Chi???u",
        width: 150,
        renderCell: (params) => {
          return <div className="cellWithImg">{params.row.idNo}</div>;
        },
      },
      {
        field: "gender",
        headerName: "Gi???i T??nh",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {params.row.gender === 1 ? "Nam" : "N???"}
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
      headerName: "Ng?????i ?????i Di???n",
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
      headerName: "H??nh ?????ng",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="updateButton"
              onClick={() => handleUpdateInfoUser(params.row.id)}
            >
              C???p Nh???t
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDeleteInfoUser(params.row.id)}
            >
              X??a
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
        <p style={{ fontSize: "20px" }}>Ph??ng: {roomType.name}</p>
        <form className="form col-12" onSubmit={formik.handleSubmit}>
          <div className="top-form">
            <div className="roomNo">
              <span style={{ width: "150px", fontSize: "20px" }}>
                S??? Ph??ng: {params.roomNo}
              </span>
              <span
                style={{
                  paddingLeft: "50px",
                  fontSize: "20px",
                  width: "300px",
                }}
              >
                Ti???n ph??ng: {formatNumber(totalPrice)}
              </span>
              <div
                className="resetPriceButton"
                onClick={() => {
                  getTotalPrice();
                }}
              >
                Xem gi??
              </div>
            </div>
          </div>
          <hr />
          <div className="col-12 InfoRoom">
            <div className="row">
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Ng??y ?????n </InputLabel>
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
                <InputLabel className="label">Ng??y ??i</InputLabel>
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
                <InputLabel className="label">Gi??? ?????n</InputLabel>
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
                <InputLabel className="label">Gi??? ??i</InputLabel>
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
                <InputLabel className="label">Ng??y ?????n Th???c T???</InputLabel>
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
                <InputLabel className="label">Ng??y ?????t</InputLabel>
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
                <InputLabel className="label">Ng?????i L???n</InputLabel>
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
                <InputLabel className="label">Tr??? Em</InputLabel>
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
          <span style={{ paddingTop: "30px" }}>Th??ng Tin Kh??ch ?????t</span>
          <hr style={{ width: "20%" }} />
          <div className="col-12 InfoRoom">
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">T??n Kh??ch H??ng</InputLabel>
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
                <InputLabel className="label">S??? ??i???n Tho???i</InputLabel>
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
                <InputLabel className="label">S??? H??? Chi???u/CCCD</InputLabel>
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
                <InputLabel>Gi???i T??nh</InputLabel>
                <Select
                  className="title"
                  required
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={1}>Nam</MenuItem>
                  <MenuItem value={0}>N???</MenuItem>
                </Select>
              </div>
              <div className="col-2 simpleModalItem">
                <InputLabel className="label">Ng??y Sinh</InputLabel>
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
                Check In T???i Hotel
              </button>
            ) : (
              <button
                type="submit"
                className="buttonCheckInItem"
                disabled
                style={{ pointerEvents: "none" }}
              >
                Check In T???i Hotel
              </button>
            )}
          </div>
        </form>
        <span style={{ paddingTop: "40px" }}>Th??ng Tin Kh??ch ???</span>
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
              Th??m Kh??ch +
            </button>
          ) : (
            <button
              onClick={openCreateServiceModal}
              className="buttonAddCustomerItem"
            >
              Th??m Kh??ch +
            </button>
          )}
        </div>
      </div>
      <AddNewCustomerModal />
      <UpdateNewCustomerModal />
    </div>
  );
}
