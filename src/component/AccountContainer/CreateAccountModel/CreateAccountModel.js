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
import { accountManageState$ } from "../../../redux/selectors/AccountManageSelector";
import { useState } from "react";
import * as Yup from "yup";
const CreateAccountModel = () => {
  const dispatch = useDispatch();
  const isShow = useSelector(modelCreateAccountState$);
  const listAccount = useSelector(accountManageState$);
  let [duplicateName, setDuplicateName] = useState("");
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
      let accountDuplicate = listAccount.filter(
        (item) => item.username === values.username
      );
      if (accountDuplicate.length !== 0) {
        setDuplicateName("Username này đã tồn tại");
      } else {
        dispatch(actions.createAccount.createAccountRequest(account));
        dispatch(hideCreateAccountModel());
      }
    },
    [userInfo, dispatch, listAccount]
  );
  const handleDuplicateName = () => {
    setDuplicateName("");
  };
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
    validationSchema: Yup.object({
      username: Yup.string().required("Yêu cầu *"),
      password: Yup.string()
        .required("Yêu cầu *")
        .min(10, "Vui lòng nhập đúng độ dài")
        .max(20, "Vui lòng nhập đúng độ dài"),
      firstName: Yup.string()
        .required("Yêu cầu *")
        .matches(
          /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
          "Vui lòng nhập đúng họ"
        ),
      middleName: Yup.string()
        .required("Yêu cầu *")
        .matches(
          /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
          "Vui lòng nhập đúng họ"
        ),
      lastName: Yup.string()
        .required("Yêu cầu *")
        .matches(
          /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/,
          "Vui lòng nhập đúng họ"
        ),
      dateOfBirth: Yup.string().required("Yêu cầu *"),
      role: Yup.string().required("Yêu cầu *"),
      phoneNumber: Yup.string()
        .required("Yêu cầu *")
        .matches(
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
          "Vui lòng nhập đúng số điện thoại"
        ),
    }),
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
              onClick={() => handleDuplicateName()}
            />
            {formik.errors.username && (
              <span style={{ color: "red" }}>{formik.errors.username}</span>
            )}
            <p style={{ color: "red" }}>{duplicateName}</p>
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
            {formik.errors.password && (
              <span style={{ color: "red" }}>{formik.errors.password}</span>
            )}
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
            {formik.errors.firstName && (
              <span style={{ color: "red" }}>{formik.errors.firstName}</span>
            )}
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
            {formik.errors.middleName && (
              <span style={{ color: "red" }}>{formik.errors.middleName}</span>
            )}
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
            {formik.errors.lastName && (
              <span style={{ color: "red" }}>{formik.errors.lastName}</span>
            )}
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
            {formik.errors.phoneNumber && (
              <span style={{ color: "red" }}>{formik.errors.phoneNumber}</span>
            )}
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
            {formik.errors.dateOfBirth && (
              <span style={{ color: "red" }}>{formik.errors.dateOfBirth}</span>
            )}
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
            {formik.errors.gender && (
              <span style={{ color: "red" }}>{formik.errors.gender}</span>
            )}
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
            {formik.errors.role && (
              <span style={{ color: "red" }}>{formik.errors.role}</span>
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
};

export default CreateAccountModel;
