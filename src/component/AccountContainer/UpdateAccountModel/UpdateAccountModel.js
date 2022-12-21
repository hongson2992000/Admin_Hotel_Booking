import { InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import classNames from "classnames";
import { useFormik } from "formik";
import moment from "moment/moment";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { hideUpdateAccountModel } from "../../../redux/actions/ModalAction";
import { accountItemManageState$ } from "../../../redux/selectors/AccountManageSelector";
import { modelUpdateAccountState$ } from "../../../redux/selectors/ModalSelector";
import { PHONE_VALID, USER_LOGIN, USER_ROLE } from "../../../utils/constants/settingSystem";
import Styles from "./UpdateAccountModel.scss";
import * as actions from "../../../redux/actions/AccountManageAction";
const UpdateAccountModel = () => {
  const dispatch = useDispatch();
  const isShow = useSelector(modelUpdateAccountState$);
  const accountItem = useSelector(accountItemManageState$);
  const onClose = useCallback(() => {
    dispatch(hideUpdateAccountModel());
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
        id: values.id,
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
        role: values.userRole === 1 ? "ROLE_MANAGER": values.userRole === 2 ? "ROLE_RESTAURANT":values.userRole === 3 ? "ROLE_HOUSEKEEPING":"ROLE_RECEPTIONIST",
        status: true,
        updateDate: moment().format("DD/MM/YYYY").substring(0, 10),
        username: values.username,
      };

      dispatch(actions.updateAccount.updateAccountRequest(account));
      dispatch(hideUpdateAccountModel())
    },
    [userInfo, dispatch]
  );


  const mockRole = [
    {
      id: 1,
      name: "ROLE_MANAGER",
    },
    {
      id: 2,
      name: "ROLE_RESTAURANT",
    },
    {
      id: 3,
      name: "ROLE_HOUSEKEEPING",
    },
    {
      id: 4,
      name: "ROLE_RECEPTIONIST",
    },
  ];
  const renderDate = (date) => {
    let birthDate = date?.split("/");
    let formatDate = birthDate[2] + "-" + birthDate[1] + "-" + birthDate[0];
    return formatDate;
  };
  const formik = useFormik({
    initialValues: {
      id: accountItem?.id,
      username: accountItem?.username,
      password: accountItem?.password,
      firstName: accountItem?.firstName,
      middleName: accountItem?.middleName,
      lastName: accountItem?.lastName,
      gender: accountItem?.gender,
      phoneNumber: accountItem?.phoneNumber,
      dateOfBirth: accountItem.dateOfBirth
        ? renderDate(accountItem?.dateOfBirth)
        : "",
      userRole:
        accountItem?.userRole === USER_ROLE.HOTEL_MANAGE
          ? 1
          : accountItem?.userRole === USER_ROLE.RESTAURANT
          ? 2
          : accountItem?.userRole === USER_ROLE.HOUSEKEEPING
          ? 3
          : accountItem?.userRole === USER_ROLE.RECEPTIONIST
          ? 4
          : "",
      active: accountItem?.active,
      hotel_Id: accountItem?.hotel_Id,
      createDate: accountItem?.createDate,
      createBy: accountItem?.createBy,
      updateDate: accountItem?.updateDate,
      updateBy: accountItem?.updateBy,
    },
    onSubmit: (values, { resetForm }) => {
      handleAddAccount(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Yêu cầu *"),
      password: Yup.string()
        .required("Yêu cầu *"),
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
      userRole: Yup.string().required("Yêu cầu *"),
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
    <div className="paperUpdateAccount" id="simple-modal-title">
      <h2>Chỉnh sửa tài khoản</h2>
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
              className={classNames("col-12", Styles.title)}
              required
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              disabled
            />
             {formik.errors.username && (
              <span style={{ color: "red" }}>{formik.errors.username}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Mật Khẩu</InputLabel>
            <TextField
              type={"password"}
              className={classNames("col-12", Styles.title)}
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
              className={Styles.title}
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
              className={Styles.title}
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
              className={Styles.title}
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
          <div className="col-4 simpleModalItem">
            <InputLabel>Số điện thoại</InputLabel>
            <TextField
              className={Styles.title}
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
          <div className="col-4 simpleModalItem">
            <InputLabel>Ngày sinh</InputLabel>
            <TextField
              type={"date"}
              className="title"
              required
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              max={moment().format("YYYY-MM-DD")}
            />
             {formik.errors.dateOfBirth && (
              <span style={{ color: "red" }}>{formik.errors.dateOfBirth}</span>
            )}
          </div>
          <div className="col-4 simpleModalItem">
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
            <InputLabel>Trạng Thái</InputLabel>
            <Select
              className="title"
              required
              id="active"
              name="active"
              value={formik.values.active}
              onChange={formik.handleChange}
              disabled
            >
              <MenuItem value={true}>Đang hoạt động</MenuItem>
              <MenuItem value={false}>Đang ẩn</MenuItem>
            </Select>
            {formik.errors.active && (
              <span style={{ color: "red" }}>{formik.errors.active}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Quyền Hạn</InputLabel>
            <Select
              className="title"
              required
              id="userRole"
              name="userRole"
              value={formik.values.userRole}
              onChange={formik.handleChange}
            >
              {mockRole.map((role, index) => {
                return (
                  <MenuItem key={index} value={role.id}>
                    {role.name}
                  </MenuItem>
                );
              })}
            </Select>
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
};

export default UpdateAccountModel;
