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
import { modalAddNewsState$ } from "../../../redux/selectors/ModalSelector";
import "./AddNewsModal.scss";
import {
  hideModalAddLocation,
  hideModalAddNews,
} from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/ServiceManageAction";
import moment from "moment";
import * as Yup from "yup";
export default function AddNewsModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalAddNewsState$);
  let currentDate = moment().format("YYYY-MM-DD");
  const onClose = useCallback(() => {
    dispatch(hideModalAddNews());
  }, [dispatch]);
  // let dataService = formik.values
  const onSubmitService = useCallback(
    (values) => {
      // dispatch(actions.createNewHotelService.createHotelServiceRequest(values));
      dispatch(hideModalAddLocation());
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      address: "",
      description: "",
      detailInformation: "",
      endDate: "",
      endTime: "",
      id: 0,
      newName: "",
      newsType: "",
      numberOfView: 0,
      startDate: "",
      startTime: "",
      status: "",
      ticketInformation: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      newsName: Yup.string().required("Yêu cầu *"),
      address: Yup.string().required("Yêu cầu *"),
      startDate: Yup.string().required("Yêu cầu *"),
      endDate: Yup.string().required("Yêu cầu *"),
      startTime: Yup.string().required("Yêu cầu *"),
      endTime: Yup.string().required("Yêu cầu *"),
      description: Yup.string().required("Yêu cầu *"),
      numberOfView: Yup.string().required("Yêu cầu *"),
      ticketInformation: Yup.string().required("Yêu cầu *"),
    }),
  });
  const body = (
    <div className="paperAddNews" id="simple-modal-title">
      <h2>Thêm mới tin tức</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-6 simpleModalItem">
            <InputLabel>Tên tin tức</InputLabel>
            <TextField
              className="title"
              required
              id="newsName"
              name="newsName"
              value={formik.values.newsName}
              onChange={formik.handleChange}
            />
            {formik.errors.newsName && (
              <span style={{ color: "red" }}>{formik.errors.newsName}</span>
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
            <InputLabel>Ngày bắt đầu</InputLabel>
            <input
              type="date"
              className="title"
              required
              id="startDate"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              // min={`${currentDate}T00:00`}
              min={moment().format("YYYY-MM-DD")}
            />
            {formik.errors.startDate && (
              <span style={{ color: "red" }}>{formik.errors.startDate}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Ngày kết thúc</InputLabel>
            <input
              type="date"
              className="title"
              required
              id="startDate"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              min={moment().format("YYYY-MM-DD")}
            />
            {formik.errors.startDate && (
              <span style={{ color: "red" }}>{formik.errors.startDate}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Giờ mở</InputLabel>
            <input
              type="time"
              className="title"
              required
              id="startTime"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              // min={`${currentDate}T00:00`}
            />
            {formik.errors.startTime && (
              <span style={{ color: "red" }}>{formik.errors.startTime}</span>
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
              // min={`${currentDate}T00:00`}
            />
            {formik.errors.closeTime && (
              <span style={{ color: "red" }}>{formik.errors.closeTime}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Số người tối da</InputLabel>
            <TextField
              className="title"
              required
              id="numberOfView"
              name="numberOfView"
              value={formik.values.numberOfView}
              onChange={formik.handleChange}
            />
            {formik.errors.numberOfView && (
              <span style={{ color: "red" }}>{formik.errors.numberOfView}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Thông tin vé</InputLabel>
            <TextField
              className="title"
              required
              id="ticketInformation"
              name="ticketInformation"
              value={formik.values.ticketInformation}
              onChange={formik.handleChange}
            />
            {formik.errors.ticketInformation && (
              <span style={{ color: "red" }}>{formik.errors.ticketInformation}</span>
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
