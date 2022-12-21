import { InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalAddUserState$ } from "../../../redux/selectors/ModalSelector";
import "./AddNewCustomerModal.scss";
import { hideModalAddUser } from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/BookingManageAction";
import * as Yup from "yup";
import { userState$ } from "../../../redux/selectors/UserSelector";
import moment from "moment";
import { infoUserBookingState$ } from "../../../redux/selectors/BookingManageSelector";
import { padding } from "@mui/system";
export default function AddNewCustomerModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalAddUserState$);
  const infoUser = useSelector(userState$);
  const listCustomer = useSelector(infoUserBookingState$);
  const renderListCustomerAvailability = () => {
    let newList = listCustomer.filter((item) => item.primary === true);
    return newList;
  };
  let [duplicateName, setDuplicateName] = useState("");
  const onClose = useCallback(() => {
    dispatch(hideModalAddUser());
  }, [dispatch]);
  const onSubmitInfoUser = useCallback(
    (values) => {
      let arrDate = values.birthDate.split("-");
      let formatedDate = arrDate[2] + "/" + arrDate[1] + "/" + arrDate[0];
      let infoUserCheckIn = {
        id: values.id,
        birthDate: formatedDate,
        createBy: values.createBy,
        createDate: values.createDate,
        email: values.email,
        firstName: values.firstName,
        gender: 1,
        phoneNumber: values.phoneNumber,
        lastName: values.lastName,
        middleName: values.middleName,
        passportNo: values.passportNo,
        idNo: values.idNo,
        updateDate: values.updateDate,
        lastModifyBy: values.lastModifyBy,
        primary: values.primary,
      };
      let duplicateName = listCustomer.filter(
        (item) =>
          item.firstName + " " + item.middleName + " " + item.lastName ===
          values.firstName + " " + values.middleName + " " + values.lastName
      );

      if (duplicateName.length !== 0) {
        setDuplicateName("Tên này đã được sử dụng");
      } else {
        dispatch(
          actions.addNewUserBooking.addNewUserBookingRequest(infoUserCheckIn)
        );
        dispatch(hideModalAddUser());
      }

      // navigate("/checkIn");
    },
    [dispatch,listCustomer]
  );
  const renderIdRandom = () => {
    let id = new Date().getTime();
    setId(id);
    return id;
  };
  let [id, setId] = useState(new Date().getTime());
  let currentDate = moment().format("DD/MM/YYYY");
  const formik = useFormik({
    initialValues: {
      id: id,
      birthDate: "",
      createBy:
        infoUser.firstName +
        " " +
        infoUser.middleName +
        " " +
        infoUser.lastName,
      createDate: currentDate,
      email: "",
      firstName: "",
      gender: 1,
      phoneNumber: "",
      lastName: "",
      middleName: "",
      passportNo: "",
      idNo: "",
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
      renderIdRandom();
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
      birthDate: Yup.string().required("Yêu cầu *"),
      email: Yup.string()
        .required("Yêu cầu *")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Vui lòng nhập đúng email"
        ),
      phoneNumber: Yup.string()
        .required("Yêu cầu *")
        .matches(
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
          "Vui lòng nhập đúng số điện thoại"
        ),
      idNo: Yup.string()
        .required("Yêu cầu *")
        .min(9, "Vui lòng nhập đúng CMND/CCCD")
        .max(10, "Vui lòng nhập đúng CMND/CCCD")
        .matches(/[0-9]/, "Vui lòng nhập đúng CMND/CCCD"),
    }),

    enableReinitialize: true,
  });
  const handleChangeName = () => {
    setDuplicateName("");
  };
  const body = (
    <div className="paperAddNewCustomer" id="simple-modal-title">
      <h2>Thêm khách</h2>
      <hr />
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
                  onClick={() => {
                    handleChangeName();
                  }}
                />
                <span style={{ color: "red" }}>{duplicateName}</span>
                {formik.errors.firstName && (
                  <span style={{ color: "red" }}>
                    {formik.errors.firstName}
                  </span>
                )}
              </div>
              <div className="col-4 simpleModalItem">
                <InputLabel>Tên lót</InputLabel>
                <TextField
                  className="title"
                  required
                  id="middleName"
                  name="middleName"
                  value={formik.values.middleName || ""}
                  onChange={formik.handleChange}
                  onClick={() => {
                    handleChangeName();
                  }}
                />
                <span style={{ color: "red" }}>{duplicateName}</span>
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
                  onClick={() => {
                    handleChangeName();
                  }}
                />
                <span style={{ color: "red" }}>{duplicateName}</span>
                {formik.errors.lastName && (
                  <span style={{ color: "red" }}>{formik.errors.lastName}</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Số điện thoại</InputLabel>
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
            <InputLabel>Ngày sinh</InputLabel>
            <input
              className="title"
              style={{ padding: "0.9rem", borderRadius: "5px" }}
              type="date"
              required
              max={moment().format("YYYY-MM-DD")}
              id="birthDate"
              name="birthDate"
              value={formik.values.birthDate}
              onChange={formik.handleChange}
            />
            {formik.errors.birthDate && (
              <span style={{ color: "red", marginBottom: "5px" }}>
                {formik.errors.birthDate}
              </span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Số hộ chiếu/CCCD</InputLabel>
            <TextField
              className="title"
              required
              id="idNo"
              name="idNo"
              value={formik.values.idNo || ""}
              onChange={formik.handleChange}
            />
            {formik.errors.idNo && (
              <span style={{ color: "red" }}>{formik.errors.idNo}</span>
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
              <MenuItem value={1}>Nam</MenuItem>
              <MenuItem value={0}>Nữ</MenuItem>
            </Select>
          </div>
          <div className="col-12 simpleModalItem">
            <InputLabel style={{ display: "flex" }}>Email</InputLabel>
            <TextField
              className="title"
              required
              id="email"
              name="email"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <span style={{ color: "red" }}>{formik.errors.email}</span>
            )}
          </div>
          {/* <div className="col-6 simpleModalItem">
            <InputLabel>Người Đại Diện</InputLabel>
            {renderListCustomerAvailability().length !== 0 ? (
              <Select
                className="title"
                disabled
                required
                id="primary"
                name="primary"
                value={formik.values.primary || ""}
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>Người Đại Diện</MenuItem>
                <MenuItem value={false}>Người Thường</MenuItem>
              </Select>
            ) : (
              <Select
                className="title"
                required
                id="primary"
                name="primary"
                value={formik.values.primary || ""}
                onChange={formik.handleChange}
              >
                <MenuItem value={true}>Người Đại Diện</MenuItem>
                <MenuItem value={false}>Người Thường</MenuItem>
              </Select>
            )}
          </div> */}
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
