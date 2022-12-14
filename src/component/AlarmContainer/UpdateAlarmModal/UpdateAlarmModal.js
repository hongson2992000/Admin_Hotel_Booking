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
import * as actions from "../../../redux/actions/AlarmManageAction";
import * as Yup from "yup";
import { roomAlarmItemManageState$ } from "../../../redux/selectors/AlarmManageSelector";
export default function UpdateAlarmModal({bookingId}) {
  const dispatch = useDispatch();
  const isShow = useSelector(modalUpdateAlarmState$);
  const roomAlarmItem = useSelector(roomAlarmItemManageState$);
  const onClose = useCallback(() => {
    dispatch(hideModalUpdateAlarm());
  }, [dispatch]);
  const onSubmitAlarm = useCallback(
    (values) => {
        let dateString = values.dateTime.substring(0, 10);
        let date = dateString.split("-");
        let formatDate = date[2] + "/" + date[1] + "/" + date[0];
        const alarm = {
          booking_Id: bookingId,
          dateTime: formatDate + " " + values.dateTime.substring(11) + ":00",
          id: values.id,
          status: values.status,
        };
      dispatch(actions.updateAlarm.updateAlarmRequest(alarm));
      dispatch(hideModalUpdateAlarm());
    },
    [dispatch,bookingId]
  );
  const renderDate = useCallback(() => {
    let date = roomAlarmItem.dateTime?.substring(0, 10);
    let dateFormat = date?.split("/");
    let formatDate;
    if (dateFormat) {
      formatDate =
        dateFormat[2] +
        "-" +
        dateFormat[1] +
        "-" +
        dateFormat[0] +
        " " +
        roomAlarmItem.dateTime?.substring(11, 16);
    }
    return formatDate;
  }, [roomAlarmItem]);

  const formik = useFormik({
    initialValues: {
      booking_Id: roomAlarmItem.booking_Id,
      dateTime: renderDate(),
      id: roomAlarmItem.id,
      status: roomAlarmItem.status,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitAlarm(values);
      resetForm({ values: "" });
    },
    enableReinitialize: true,
  });
  const body = (
    <div className="paperUpdateRoomPType" id="simple-modal-title">
      <h2>C???p nh???t b??o th???c</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-12 simpleModalItem">
            <InputLabel>Gi??? B??o Th???c</InputLabel>
            <input
              className="title"
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              value={formik.values.dateTime}
              onChange={formik.handleChange}
              style={{ height: "55px", padding: "5px" }}
            />
          </div>
          <div className="col-12 simpleModalItem">
            <InputLabel>Tr???ng th??i</InputLabel>
            <Select
              className="title"
              required
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <MenuItem value={true}>B???t</MenuItem>
              <MenuItem value={false}>T???t</MenuItem>
            </Select>
          </div>
          <div className="footer">
            <button className="buttonSave" type="submit">
              L??u
            </button>
            <button className="buttonClose" onClick={onClose}>
              ????ng
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
