import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { infoUserBookingState$ } from "../../redux/selectors/BookingManageSelector";
import { roomValidState$ } from "../../redux/selectors/RoomManageSelector";
import { INFO_BOOKING_DETAIL } from "../../utils/constants/settingSystem";
import "./InformationHotelContainer.scss";
import image from "../../assets/img/anhthucte3.png";
export default function InfomationHotelContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoUser = useSelector(infoUserBookingState$);
  console.log("InfoUser", infoUser);
  const roomValid = useSelector(roomValidState$);
  const infoBooking = JSON.parse(localStorage.getItem(INFO_BOOKING_DETAIL));
  // console.log("Hello Son", infoBooking);
  const renderCurrentDate = () => {
    let currentDate = moment().format("YYYY-MM-DD");
    return currentDate;
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      room_Id: "",
      name: "",
      createDate: "",
      numOfAdult: 0,
      numOfChildren: 0,
      arrivalDate: "",
      arrivalTime: "",
      departureDate: "",
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
      createBy: "",
      hotel_Id: 1,
      roomTypeId: "",
      totalAmount: "",
      specialNote: "",
    },
    onSubmit: (values, { resetForm }) => {
      //   onSubmitCheckIn(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="InfoHotelContainer">
      <div className="InfoRoomBooking">
        {/* <p>Phòng: {renderTypeRoom()}</p> */}
        <form
          noValidate
          autoComplete="off"
          className="form col-12"
          onSubmit={formik.handleSubmit}
        >
          <div
            className="col-12 InfoRoom"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="row">
              <div className="col-4 InfoRoomImage">
                <img src={image} alt="" />
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">Tên khách sạn</InputLabel>
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
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">
                      Tên viết tắt của khách sạn
                    </InputLabel>
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
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">Số điện thoại</InputLabel>
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
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">Email</InputLabel>
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
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">Website</InputLabel>
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
            </div>
          </div>

          <div className="col-12 InfoRoom">
            <hr style={{ width: "100%", marginTop: "20px" }} />
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Địa chỉ</InputLabel>
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
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Kinh độ</InputLabel>
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
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Vĩ độ</InputLabel>
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
            </div>
          </div>

          <div className="col-12 InfoRoom">
            <hr style={{ width: "100%", marginTop: "20px" }} />
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Tổng số phòng</InputLabel>
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
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Thời gian check in</InputLabel>
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
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Thời gian check out</InputLabel>
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
            </div>
          </div>
          <div className="buttonCheckIn">
            <button type="submit" className="buttonCheckInItem">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
