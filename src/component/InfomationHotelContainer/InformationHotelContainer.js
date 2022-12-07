import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
// import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./InformationHotelContainer.scss";
import image from "../../assets/img/anhthucte3.png";
import { informationHotelManageState$ } from "../../redux/selectors/InfomationHotelManageSelector";
import { useState } from "react";
export default function InfomationHotelContainer() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const infoHotel = useSelector(informationHotelManageState$);
  const [dataHotel, setDataHotel] = useState({});
  console.log("Thanh An", infoHotel);
  // const roomValid = useSelector(roomValidState$);
  // const infoBooking = JSON.parse(localStorage.getItem(INFO_BOOKING_DETAIL));
  // // console.log("Hello Son", infoBooking);
  // const renderCurrentDate = () => {
  //   let currentDate = moment().format("YYYY-MM-DD");
  //   return currentDate;
  // };
  useEffect(() => {
    setDataHotel(infoHotel);
  }, [infoHotel]);
  const formik = useFormik({
    initialValues: dataHotel,
    onSubmit: (values, { resetForm }) => {
      //   onSubmitCheckIn(values);
      resetForm({ values: "" });
    },
    enableReinitialize: true,
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
                      id="fullName"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">
                      Tên viết tắt của khách sạn
                    </InputLabel>
                    <TextField
                      className="title"
                      required
                      id="shortName"
                      name="shortName"
                      value={formik.values.shortName || ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">Số điện thoại</InputLabel>
                    <TextField
                      className="title"
                      required
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formik.values.phoneNumber || ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">Email</InputLabel>
                    <TextField
                      className="title"
                      required
                      id="email"
                      name="email"
                      value={formik.values.email || ""}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-4 InfoRoomItem">
                    <InputLabel className="label">Website</InputLabel>
                    <TextField
                      className="title"
                      required
                      id="website"
                      name="website"
                      value={formik.values.website}
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
                  required
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Kinh độ</InputLabel>
                <TextField
                  className="title"
                  required
                  id="longitude"
                  name="longitude"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Vĩ độ</InputLabel>
                <TextField
                  className="title"
                  required
                  id="latitude"
                  name="latitude"
                  value={formik.values.latitude}
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
                  required
                  id="totalRoom"
                  name="totalRoom"
                  value={formik.values.totalRoom}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Thời gian check in</InputLabel>
                <TextField
                  className="title"
                  required
                  id="checkInTime"
                  name="checkInTime"
                  value={formik.values.checkInTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-3 InfoRoomItem">
                <InputLabel className="label">Thời gian check out</InputLabel>
                <TextField
                  className="title"
                  required
                  id="checkOutTime"
                  name="checkOutTime"
                  value={formik.values.checkOutTime}
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
