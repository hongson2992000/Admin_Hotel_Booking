import { InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment/moment";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { hideCreateAccountModel } from "../../../redux/actions/ModalAction";
import { modelCreateAccountState$ } from "../../../redux/selectors/ModalSelector";
import {
  PHONE_VALID,
  USER_LOGIN,
} from "../../../utils/constants/settingSystem";
import * as actions from "../../../redux/actions/AccountManageAction";
import "./CreateAccountModel.scss";
const CreateAccountModel = () => {
  const dispatch = useDispatch();
  const isShow = useSelector(modelCreateAccountState$);

  const onClose = useCallback(() => {
    dispatch(hideCreateAccountModel());
  }, [dispatch]);
  const userInfo = JSON.parse(localStorage.getItem(USER_LOGIN));
  const handleAddAccount = useCallback(
    (values) => {
      let arrBirthDate = values.dateOfBirth.split("-");
      let formatDate =
        arrBirthDate[2] + "/" + arrBirthDate[1] + "/" + arrBirthDate[0];
      let account = {
        createBy:
          userInfo.firstName +
          " " +
          userInfo.middleName +
          " " +
          userInfo.lastName,
        createDate: moment().format("DD/MM/YYYY").substring(0, 10),
        dateOfBirth: formatDate,
        firstName: values.firstName,
        gender: values.gender,
        hotelId: 1,
        id: 0,
        lastModifyBy:
          userInfo.firstName +
          " " +
          userInfo.middleName +
          " " +
          userInfo.lastName,
        lastName: values.lastName,
        middleName: values.middleName,
        password: values.password,
        phoneNumber: values.phoneNumber,
        role: values.role,
        status: true,
        updateDate: moment().format("DD/MM/YYYY").substring(0, 10),
        username: values.username,
      };

      dispatch(actions.createAccount.createAccountRequest(account));
    },
    [userInfo, dispatch]
  );

  const mockRole = [
    {
      id: 2,
      name: "ROLE_MANAGER",
    },
    {
      id: 2,
      name: "ROLE_MANAGER",
    },
    {
      id: 3,
      name: "ROLE_RECEPTIONIST",
    },
    {
      id: 4,
      name: "ROLE_HOUSEKEEPING",
    },
    {
      id: 5,
      name: "ROLE_RESTAURANT",
    },
  ];

  const formik = useFormik({
    initialValues: {
      createBy: "",
      createDate: moment().format("DD/MM/YYYY").substring(0, 10),
      dateOfBirth: "",
      firstName: "",
      gender: true,
      hotelId: 0,
      id: 0,
      lastModifyBy: "",
      lastName: "",
      middleName: "",
      password: "",
      phoneNumber: "",
      role: "",
      status: "",
      updateDate: moment().format("DD/MM/YYYY").substring(0, 10),
      username: "",
    },
    onSubmit: (values, { resetForm }) => {
      handleAddAccount(values);
      resetForm({ values: "" });
    },
  });

  const body = (
    <div className="paperCreateAccount" id="simple-modal-title">
      <h2>Thêm mới Tài Khoản</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-6 simpleModalItem">
            <InputLabel>Tài Khoản</InputLabel>
            <TextField
              className="title"
              required
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Mật Khẩu</InputLabel>
            <TextField
              type={"password"}
              className="title"
              required
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-4 simpleModalItem">
            <InputLabel>Họ</InputLabel>
            <TextField
              className="title"
              required
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-4 simpleModalItem">
            <InputLabel>Tên Lót</InputLabel>
            <TextField
              className="title"
              id="middleName"
              name="middleName"
              value={formik.values.middleName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-4 simpleModalItem">
            <InputLabel>Tên</InputLabel>
            <TextField
              className="title"
              required
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Số điện thoại</InputLabel>
            <TextField
              className="title"
              required
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Ngày sinh</InputLabel>
            <input
              type="date"
              className="title"
              required
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              style={{
                height: "60px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              max={moment().format("YYYY-MM-DD")}
            />
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Giới tính</InputLabel>
            <Select
              className="title"
              required
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <MenuItem value={true}>Nam</MenuItem>
              <MenuItem value={false}>Nữ</MenuItem>
            </Select>
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Quyền Hạn</InputLabel>
            <Select
              className="title"
              required
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              {mockRole.map((role, index) => {
                return (
                  <MenuItem key={index} value={role.name}>
                    {role.name}
                  </MenuItem>
                );
              })}
            </Select>
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
};

export default CreateAccountModel;
