import { InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalUpdateAlarmState$ } from "../../../redux/selectors/ModalSelector";
import "./UpdateAlarmModal.scss";
import {
  hideModalUpdateAlarm,
  hideModalUpdateRoomType,
} from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/LocationManageAction";
import * as Yup from "yup";
import { roomAlarmItemManageState$ } from "../../../redux/selectors/AlarmManageSelector";
export default function UpdateAlarmModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalUpdateAlarmState$);
  const roomAlarmItem = useSelector(roomAlarmItemManageState$);
  const onClose = useCallback(() => {
    dispatch(hideModalUpdateAlarm());
  }, [dispatch]);
  const onSubmitService = useCallback(
    (values) => {
      dispatch(actions.createLocation.createLocationRequest(values));
      dispatch(hideModalUpdateRoomType());
    },
    [dispatch]
  );
  const renderDate = () => {
    let date = roomAlarmItem.dateTime.substring(0, 10);
    let dateFormat = date.split("/");
    let formatDate = dateFormat[2] + "-" + dateFormat[1] + "-" + dateFormat[0] + " " + roomAlarmItem.dateTime.substring(11,16);
    return formatDate
  };
  console.log("DATE", renderDate());
  const formik = useFormik({
    initialValues: {
      booking_Id: roomAlarmItem.booking_Id,
      dateTime: renderDate(),
      id: roomAlarmItem.id,
      status: roomAlarmItem.status,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      defaultPrice: Yup.string()
        .required("Yêu cầu *")
        .matches(/^\d+\.?\d*$/, "Vui lòng nhập đúng định dạng giá")
        .max(10, "Vui lòng nhập đúng định dạng giá"),
    }),
    enableReinitialize: true,
  });
  const body = (
    <div className="paperUpdateRoomPType" id="simple-modal-title">
      <h2>Cập nhật báo thức</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-12 simpleModalItem">
            <InputLabel>Giờ Báo Thức</InputLabel>
            <input
              className="title"
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formik.values.dateTime}
              onChange={formik.handleChange}
              style={{ height: "55px", padding: "5px" }}
            />
            {formik.errors.dateTime && (
              <span style={{ color: "red" }}>{formik.errors.dateTime}</span>
            )}
          </div>
          <div className="col-12 simpleModalItem">
            <InputLabel>Trạng thái</InputLabel>
            <Select
              className="title"
              required
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value={true}>Bật</MenuItem>
              <MenuItem value={false}>Tắt</MenuItem>
            </Select>
            {formik.errors.defaultPrice && (
              <span style={{ color: "red" }}>{formik.errors.defaultPrice}</span>
            )}
          </div>
          <div className="footer">
            <button className="buttonSave" type="submit">
              Lưu
            </button>
            <button className="buttonClose" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <Modal open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}
