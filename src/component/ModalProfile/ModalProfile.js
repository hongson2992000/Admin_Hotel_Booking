import { InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalUpdateUserState$ } from "../../redux/selectors/ModalSelector";
import "./ModalProfile.scss";
import {
  hideModalAddUser,
  hideModalProfile,
  hideModalUpdateUser,
} from "../../redux/actions/ModalAction";
import * as actions from "../../redux/actions/AccountManageAction";
import * as Yup from "yup";
import { userState$ } from "../../redux/selectors/UserSelector";
import moment from "moment";
import { infoUserUpdateFormState$ } from "../../redux/selectors/BookingManageSelector";
import { modalProfileState$ } from "../../redux/selectors/ModalSelector";
import { profileItemManageState$ } from "../../redux/selectors/AccountManageSelector";
import { USER_LOGIN } from "../../utils/constants/settingSystem";
export default function ModalProfile() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalProfileState$);
  const infoUser = JSON.parse(localStorage.getItem(USER_LOGIN));
  const listCustomer = useSelector(infoUserUpdateFormState$);
  const onClose = useCallback(() => {
    dispatch(hideModalProfile());
  }, [dispatch]);
  const onSubmitInfoUser = useCallback(
    (values) => {
      let arrDate = values.dateOfBirth.split("-");
      let formatedDate = arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0];
      let infoUserCheckIn = {
        createBy: values.createBy,
        createDate: moment().format("DD/MM/YYYY"),
        dateOfBirth: formatedDate,
        firstName: values.firstName,
        gender: values.gender,
        hotelId: 1,
        id: values.id,
        lastModifyBy: values.lastModifyBy,
        lastName: values.lastName,
        middleName: values.middleName,
        password: "",
        phoneNumber: values.phoneNumber,
        role: values.userRole,
        status: true,
        updateDate: moment().format("DD/MM/YYYY"),
        username: values.username,
      };
      dispatch(
        actions.updateAccount.updateAccountRequest(
          infoUserCheckIn
        )
      );
      dispatch(hideModalProfile());
      dispatch(hideModalUpdateUser());
      // navigate("/checkIn");
    },
    [dispatch]
  );
  const renderIdRandom = () => {
    let id = new Date().getTime();
    setId(id);
    return id;
  };
  let [id, setId] = useState(new Date().getTime());
  let currentDate = moment().format("DD/MM/YYYY");
  const renderBirthDate = (date) => {
    let birthDate = date?.split("/");
    let formatDate = birthDate[2] + "-" + birthDate[1] + "-" + birthDate[0];
    return formatDate;
  };
  const formik = useFormik({
    initialValues: {
      id: infoUser.id,
      username: infoUser.username,
      password: "**********",
      dateOfBirth: infoUser.dateOfBirth
        ? renderBirthDate(infoUser.dateOfBirth)
        : " ",
      userRole: infoUser.userRole,
      createBy:
        infoUser.firstName +
        " " +
        infoUser.middleName +
        " " +
        infoUser.lastName,
      createDate: currentDate,
      firstName: infoUser.firstName,
      gender: infoUser.gender,
      phoneNumber: infoUser.phoneNumber,
      lastName: infoUser.lastName,
      middleName: infoUser.middleName,
      updateDate: currentDate,
      lastModifyBy:
        infoUser.firstName +
        " " +
        infoUser.middleName +
        " " +
        infoUser.lastName,
      primary: false,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitInfoUser(values);
      resetForm({ values: "" });
      //   renderIdRandom();
    },
    validationSchema: Yup.object({
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
      phoneNumber: Yup.string()
        .required("Yêu cầu *")
        .matches(
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
          "Vui lòng nhập đúng số điện thoại"
        ),
    }),

    enableReinitialize: true,
  });
  const body = (
    <div className="ModalProfile" id="simple-modal-title">
      <div className="row" style={{ display: "flex" }}>
        <div className="col-9">
          <h2>Chỉnh sửa thông tin cá nhân</h2>
        </div>
        <div className="col-3">
          <img
            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="avatar"
          />
        </div>
      </div>
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-12 ">
            <div className="row">
              <div className="col-4 simpleModalItem">
                <InputLabel>Họ</InputLabel>
                <TextField
                  className="title"
                  required
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName || ""}
                  onChange={formik.handleChange}
                />
                {formik.errors.firstName && (
                  <span style={{ color: "red" }}>
                    {formik.errors.firstName}
                  </span>
                )}
              </div>
              <div className="col-4 simpleModalItem">
                <InputLabel>Tên Lót</InputLabel>
                <TextField
                  className="title"
                  required
                  id="middleName"
                  name="middleName"
                  value={formik.values.middleName || ""}
                  onChange={formik.handleChange}
                />
                {formik.errors.middleName && (
                  <span style={{ color: "red" }}>
                    {formik.errors.middleName}
                  </span>
                )}
              </div>
              <div className="col-4 simpleModalItem">
                <InputLabel>Tên</InputLabel>
                <TextField
                  className="title"
                  required
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName || ""}
                  onChange={formik.handleChange}
                />
                {formik.errors.lastName && (
                  <span style={{ color: "red" }}>{formik.errors.lastName}</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Giới Tính</InputLabel>
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
            <InputLabel>Ngày Sinh</InputLabel>
            <input
              className="title"
              style={{ padding: "0.9rem", borderRadius: "5px" }}
              type="date"
              required
              max={moment().format("YYYY-MM-DD")}
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
            />
            {formik.errors.dateOfBirth && (
              <span style={{ color: "red", marginBottom: "5px" }}>
                {formik.errors.dateOfBirth}
              </span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel style={{ display: "flex" }}>Username</InputLabel>
            <TextField
              className="title"
              required
              disabled
              id="username"
              name="username"
              value={formik.values.username || ""}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <span style={{ color: "red" }}>{formik.errors.username}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel style={{ display: "flex" }}>Password</InputLabel>
            <TextField
              className="title"
              type="password"
              id="password"
              name="password"
              value={formik.values.password || ""}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <span style={{ color: "red" }}>{formik.errors.password}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Số Điện Thoại</InputLabel>
            <TextField
              className="title"
              required
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber || ""}
              onChange={formik.handleChange}
            />
            {formik.errors.phoneNumber && (
              <span style={{ color: "red" }}>{formik.errors.phoneNumber}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Vai Trò</InputLabel>
            <TextField
              className="title"
              required
              disabled
              id="userRole"
              name="userRole"
              value={formik.values.userRole}
              onChange={formik.handleChange}
            />
            {formik.errors.userRole && (
              <span style={{ color: "red" }}>{formik.errors.userRole}</span>
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
