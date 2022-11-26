import {
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalAddUserState$ } from "../../../redux/selectors/ModalSelector";
import "./AddNewCustomerModal.scss";
import { hideModalAddUser } from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/BookingManageAction";
import { useNavigate } from "react-router-dom";
export default function AddNewCustomerModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalAddUserState$);
  const navigate = useNavigate();
  //   console.log("THanh An", isShow);
  const onClose = useCallback(() => {
    dispatch(hideModalAddUser());
  }, [dispatch]);
  // let dataService = formik.values
  const onSubmitInfoUser = useCallback(
    (values) => {
      dispatch(actions.addNewUserBooking.addNewUserBookingRequest(values));
      dispatch(hideModalAddUser());
      navigate("/checkIn");
    },
    [navigate, dispatch]
  );
  const renderIdRandom = () => {
    let id = new Date().getTime();
    setId(id)
    return id;
  };
  let [id , setId] =useState(new Date().getTime())
  const formik = useFormik({
    initialValues: {
      id: id,
      name: "",
      phoneNumber: "",
      email: "",
      idNo: "",
      gender: "",
      birthDate: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitInfoUser(values);
      resetForm({ values: "" });
      renderIdRandom()
    },
    enableReinitialize: true,
  });
  console.log(formik.values);
  const body = (
    <div className="paper" id="simple-modal-title">
      <h2>Thêm khách</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-6">
            <InputLabel>Tên khách</InputLabel>
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
            <InputLabel>Số điện thoại</InputLabel>
            <TextField
              type={"number"}
              className="title"
              required
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Email</InputLabel>
            <TextField
              className="title"
              required
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Số Hộ Chiếu/CCCD</InputLabel>
            <TextField
              className="title"
              required
              id="idNo"
              name="idNo"
              value={formik.values.idNo}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Giới Tính</InputLabel>
            <TextField
              className="title"
              required
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Ngày Sinh</InputLabel>
            <TextField
              className="title"
              required
              id="birthDate"
              name="birthDate"
              value={formik.values.birthDate}
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
