import {
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalAddLocationState$ } from "../../../redux/selectors/ModalSelector";
import "./AddNewLocationModal.scss";
import {
  hideModal,
  hideModalAddLocation,
} from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/ServiceManageAction";
import moment from "moment";
export default function AddNewLocationModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalAddLocationState$);
  let currentDate = moment().format("YYYY-MM-DD");
  const onClose = useCallback(() => {
    dispatch(hideModalAddLocation());
  }, [dispatch]);
  // let dataService = formik.values
  const onSubmitService = useCallback(
    (values) => {
      dispatch(actions.createNewHotelService.createHotelServiceRequest(values));
      dispatch(hideModal());
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      address: "",
      closeTime: "",
      openTime: "",
      hotel_Id: "",
      latidute: "",
      longtitude: "",
      description: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
  });
  const body = (
    <div className="paperAddNewLocation" id="simple-modal-title">
      <h2>Thêm mới địa điểm</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-6">
            <InputLabel>Tên địa điểm</InputLabel>
            <TextField
              className="title"
              required
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Địa chỉ</InputLabel>
            <TextField
              className="title"
              required
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Giờ mở</InputLabel>
            <input
              type="datetime-local"
              className="title"
              required
              id="openTime"
              name="openTime"
              value={formik.values.openTime}
              onChange={formik.handleChange}
              style={{height:"56px",borderRadius:"5px",border:"1px solid #c4c4c4",padding:"5px"}}
              min={`${currentDate}T00:00`}
            />
          </div>
          <div className="col-6">
            <InputLabel>Giờ đóng</InputLabel>
            <input
              type="datetime-local"
              className="title"
              required
              id="closeTime"
              name="closeTime"
              value={formik.values.closeTime}
              onChange={formik.handleChange}
              style={{height:"56px",borderRadius:"5px",border:"1px solid #c4c4c4",padding:"5px"}}
              min={`${currentDate}T00:00`}
            />
          </div>
          <div className="col-6">
            <InputLabel>Kinh độ</InputLabel>
            <TextField
              className="title"
              required
              id="longtitude"
              name="longtitude"
              value={formik.values.longtitude}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Vĩ độ</InputLabel>
            <TextField
              className="title"
              required
              id="latidute"
              name="latidute"
              value={formik.values.latidute}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-12">
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
