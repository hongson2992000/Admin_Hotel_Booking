import { InputLabel, Modal, TextareaAutosize, TextField } from "@mui/material";
import React, { useCallback} from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  modalUpdateLocationState$,
} from "../../../redux/selectors/ModalSelector";
import "./UpdateLocationModal.scss";
import { hideModalUpdateLocation } from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/LocationManageAction";
import moment from "moment";
import { locationItemManageState$ } from "../../../redux/selectors/LocationManageSelector";
import * as Yup from "yup"
export default function UpdateLocationModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalUpdateLocationState$);
  const locationItem = useSelector(locationItemManageState$);
  console.log("LOCATION",locationItem)
  let currentDate = moment().format("YYYY-MM-DD");
  const onClose = useCallback(() => {
    dispatch(hideModalUpdateLocation());
  }, [dispatch]);
  // let dataService = formik.values
  const onSubmitService = useCallback(
    (values) => {
      dispatch(actions.updateLocation.updateLocationRequest(values));
      dispatch(hideModalUpdateLocation());
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      id: locationItem?.id,
      name: locationItem?.name,
      address: locationItem?.address,
      closeTime: locationItem?.closeTime,
      openTime: locationItem?.openTime,
      hotel_Id: 1,
      latidute: locationItem?.latidute,
      longtitude: locationItem?.longtitude,
      description: locationItem?.description,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Yêu cầu *"),
      address: Yup.string().required("Yêu cầu *"),
      openTime:Yup.string().required("Yêu cầu *"),
      closeTime:Yup.string().required("Yêu cầu *"),
      longtitude:Yup.string().required("Yêu cầu *"),
      latidute:Yup.string().required("Yêu cầu *"),
      description:Yup.string().required("Yêu cầu *"),
    }),
    enableReinitialize: true,
  });
  const body = (
    <div className="paperUpdateLocation" id="simple-modal-title">
      <h2>Chỉnh sửa thông tin địa điểm</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
        <div className="col-6 simpleModalItem">
            <InputLabel>Tên địa điểm</InputLabel>
            <TextField
              className="title"
              required
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <span style={{ color: "red" }}>{formik.errors.name}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Địa chỉ</InputLabel>
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
          <div className="col-6 simpleModalItem">
            <InputLabel>Giờ mở</InputLabel>
            <input
              type="time"
              className="title"
              required
              id="openTime"
              name="openTime"
              value={formik.values.openTime}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              min={`${currentDate}T00:00`}
            />
            {formik.errors.openTime && (
              <span style={{ color: "red" }}>{formik.errors.openTime}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Giờ đóng</InputLabel>
            <input
              type="time"
              className="title"
              required
              id="closeTime"
              name="closeTime"
              value={formik.values.closeTime}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              min={`${currentDate}T00:00`}
            />
            {formik.errors.closeTime && (
              <span style={{ color: "red" }}>{formik.errors.closeTime}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Kinh độ</InputLabel>
            <TextField
              className="title"
              required
              id="longtitude"
              name="longtitude"
              value={formik.values.longtitude}
              onChange={formik.handleChange}
            />
            {formik.errors.longtitude && (
              <span style={{ color: "red" }}>{formik.errors.longtitude}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Vĩ độ</InputLabel>
            <TextField
              className="title"
              required
              id="latidute"
              name="latidute"
              value={formik.values.latidute}
              onChange={formik.handleChange}
            />
            {formik.errors.latidute && (
              <span style={{ color: "red" }}>{formik.errors.latidute}</span>
            )}
          </div>
          <div className="col-12" style={{height:"170px"}}>
            <InputLabel>Thông tin mô tả</InputLabel>
            <TextareaAutosize
              className="title" 
              minRows={5}
              maxRows={10}
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description && (
              <span style={{ color: "red" }}>{formik.errors.description}</span>
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
