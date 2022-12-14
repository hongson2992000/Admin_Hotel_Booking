import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "./InformationHotelContainer.scss";
import image from "../../assets/img/anhthucte3.png";
import { informationHotelManageState$ } from "../../redux/selectors/InfomationHotelManageSelector";
import * as actions from "../../redux/actions/InformationHotelManageAction";
import { useCallback } from "react";
export default function InfomationHotelContainer() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const infoHotel = useSelector(informationHotelManageState$);
  // const roomValid = useSelector(roomValidState$);
  // const infoBooking = JSON.parse(localStorage.getItem(INFO_BOOKING_DETAIL));
  // const renderCurrentDate = () => {
  //   let currentDate = moment().format("YYYY-MM-DD");
  //   return currentDate;
  // };
  const onSubmitCheckIn = useCallback(
    (values) => {
      dispatch(
        actions.updateInformationHotel.updateInformationHotelRequest(values)
      );
    },
    [dispatch]
  );

  const formik = useFormik({
    initialValues: {
      address: infoHotel?.address,
      breakfast: infoHotel?.breakfast,
      checkInTime: infoHotel?.checkInTime,
      checkOutTime: infoHotel?.checkOutTime,
      createBy: infoHotel?.createBy,
      createDate: infoHotel?.createDate,
      description: infoHotel?.description,
      email: infoHotel?.email,
      fullName: infoHotel?.fullName,
      id: infoHotel?.id,
      lastModifyBy: infoHotel?.lastModifyBy,
      latitude: infoHotel?.latitude,
      longitude: infoHotel?.longitude,
      phoneNumber: infoHotel?.phoneNumber,
      shortName: infoHotel?.shortName,
      status: infoHotel?.status,
      totalArea: infoHotel?.totalArea,
      totalRoom: infoHotel?.totalRoom,
      updateDate: infoHotel?.updateDate,
      website: infoHotel?.website,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitCheckIn(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Y??u c???u *"),
      shortName: Yup.string().required("Y??u c???u *"),
      phoneNumber: Yup.string()
        .required("Y??u c???u *")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Vui l??ng nh???p ????ng ?????nh d???ng"
        ),
      email: Yup.string()
        .required("Y??u c???u *")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Vui l??ng nh???p ????ng ?????nh d???ng"
        ),
      website: Yup.string()
        .required("Y??u c???u *")
        .matches(
          /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          "Vui l??ng nh???p ????ng ?????nh d???ng"
        ),
      address: Yup.string().required("Y??u c???u *"),
      longitude: Yup.string().required("Y??u c???u *"),
      latitude: Yup.string().required("Y??u c???u *"),
      totalRoom: Yup.string()
        .required("Y??u c???u *")
        .matches(
          /^(?!(?:0|0\.0|0\.00)$)[+]?\d+(\.\d|\.\d[0-9])?$/,
          "Vui l??ng nh???p ????ng ?????nh d???ng"
        )
        .min(1, "T???i thi???u 10")
        .max(3, "T???i ??a 100"),
      checkInTime: Yup.string().required("Y??u c???u *"),
      checkOutTime: Yup.string().required("Y??u c???u *"),
    }),
    enableReinitialize: true,
  });
  return (
    <div className="InfoHotelContainer">
      <div className="InfoRoomBooking">
        {/* <p>Ph??ng: {renderTypeRoom()}</p> */}
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
                  <div className="col-4 simpleModalItem">
                    <InputLabel className="label">T??n kh??ch s???n</InputLabel>
                    <TextField
                      className="title"
                      required
                      id="fullName"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.fullName && (
                      <span style={{ color: "red" }}>
                        {formik.errors.fullName}
                      </span>
                    )}
                  </div>
                  <div className="col-4 simpleModalItem">
                    <InputLabel className="label">
                      T??n vi???t t???t c???a kh??ch s???n
                    </InputLabel>
                    <TextField
                      className="title"
                      required
                      id="shortName"
                      name="shortName"
                      value={formik.values.shortName}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.shortName && (
                      <span style={{ color: "red" }}>
                        {formik.errors.shortName}
                      </span>
                    )}
                  </div>
                  <div className="col-4 simpleModalItem">
                    <InputLabel className="label">S??? ??i???n tho???i</InputLabel>
                    <TextField
                      className="title"
                      required
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.phoneNumber && (
                      <span style={{ color: "red" }}>
                        {formik.errors.phoneNumber}
                      </span>
                    )}
                  </div>
                  <div className="col-4 simpleModalItem">
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
                      <span style={{ color: "red" }}>
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                  <div className="col-4 simpleModalItem">
                    <InputLabel className="label">Website</InputLabel>
                    <TextField
                      className="title"
                      required
                      id="website"
                      name="website"
                      value={formik.values.website}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.website && (
                      <span style={{ color: "red" }}>
                        {formik.errors.website}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 InfoRoom">
            <hr style={{ width: "100%", marginTop: "20px" }} />
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-3 simpleModalItem">
                <InputLabel className="label">?????a ch???</InputLabel>
                <TextField
                  className="title"
                  required
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.errors.address && (
                  <span style={{ color: "red" }}>{formik.errors.address}</span>
                )}
              </div>
              <div className="col-3 simpleModalItem">
                <InputLabel className="label">Kinh ?????</InputLabel>
                <TextField
                  className="title"
                  required
                  id="longitude"
                  name="longitude"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                />
                {formik.errors.longitude && (
                  <span style={{ color: "red" }}>
                    {formik.errors.longitude}
                  </span>
                )}
              </div>
              <div className="col-3 simpleModalItem">
                <InputLabel className="label">V?? ?????</InputLabel>
                <TextField
                  className="title"
                  required
                  id="latitude"
                  name="latitude"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                />
                {formik.errors.latitude && (
                  <span style={{ color: "red" }}>{formik.errors.latitude}</span>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 InfoRoom">
            <hr style={{ width: "100%", marginTop: "20px" }} />
            <div className="row" style={{ paddingBottom: "20px" }}>
              <div className="col-3 simpleModalItem">
                <InputLabel className="label">T???ng s??? ph??ng</InputLabel>
                <TextField
                  className="title"
                  required
                  id="totalRoom"
                  name="totalRoom"
                  value={formik.values.totalRoom}
                  onChange={formik.handleChange}
                />
                {formik.errors.totalRoom && (
                  <span style={{ color: "red" }}>
                    {formik.errors.totalRoom}
                  </span>
                )}
              </div>
              <div className="col-3 simpleModalItem">
                <InputLabel className="label">Th???i gian check in</InputLabel>
                <TextField
                  className="title"
                  required
                  disabled
                  id="checkInTime"
                  name="checkInTime"
                  value={formik.values.checkInTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-3 simpleModalItem">
                <InputLabel className="label">Th???i gian check out</InputLabel>
                <TextField
                  className="title"
                  required
                  disabled
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
              L??u
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
