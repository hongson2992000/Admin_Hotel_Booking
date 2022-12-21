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
import { modalCreateServiceState$ } from "../../../redux/selectors/ModalSelector";
import "./CreateServiceModal.scss";
import { hideModal } from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/ServiceManageAction";
import { serviceManageState$ } from "../../../redux/selectors/ServiceManageSelector";
import { useState } from "react";
import * as Yup from "yup";
import moment from "moment/moment";
import { USER_LOGIN } from "../../../utils/constants/settingSystem";
export default function CreateServiceModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalCreateServiceState$);
  const listHotelService = useSelector(serviceManageState$);
  const userInfo = JSON.parse(localStorage.getItem(USER_LOGIN));
  const getCurrentDate = () => {
    let showDate = new Date();
    let displayDate =
      showDate.getDate() +
      "/" +
      (showDate.getMonth() + 1) +
      "/" +
      showDate.getFullYear();
    return displayDate;
  };
  const onClose = useCallback(() => {
    dispatch(hideModal());
    setDuplicateName("");
  }, [dispatch]);
  const renderMajorGroup = () => {
    if (formik.values.serviceCategory_Id === 1) {
      return (
        <Select
          className="title"
          required
          id="majorGroup"
          name="majorGroup"
          value={formik.values.majorGroup}
          onChange={formik.handleChange}
        >
          <MenuItem value={"appetizer"}>Khai vị</MenuItem>
          <MenuItem value={"main_dishes"}>Món chính</MenuItem>
          <MenuItem value={"dessert"}>Tráng miệng</MenuItem>
        </Select>
      );
    } else if (formik.values.serviceCategory_Id === 2) {
      return (
        <Select
          className="title"
          required
          id="majorGroup"
          name="majorGroup"
          value={formik.values.majorGroup}
          onChange={formik.handleChange}
        >
          <MenuItem value={"coffee"}>Cà phê</MenuItem>
          <MenuItem value={"tea"}>Trà</MenuItem>
          <MenuItem value={"water_and_soft_drink"}>Nước giải khát</MenuItem>
          <MenuItem value={"mocktails"}>MockTail</MenuItem>
          <MenuItem value={"beer"}>Bia</MenuItem>
        </Select>
      );
    }
  };
  // let dataService = formik.values
  let [duplicateName, setDuplicateName] = useState("");
  const onSubmitService = useCallback(
    (values) => {
      let arrName = listHotelService.filter(
        (item) =>
          item.name.toUpperCase().trim() === values.name.toUpperCase().trim()
      );
      if (arrName.length !== 0) {
        setDuplicateName("Tên dịch vụ đã tồn tại");
      } else {
        dispatch(
          actions.createNewHotelService.createHotelServiceRequest(values)
        );
        dispatch(hideModal());
      }
    },
    [dispatch, listHotelService]
  );
  const handleChangeName = (e) => {
    setDuplicateName("");
  };
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
      price: 0,
      majorGroup: "",
      description: "",
      createDate: moment().format("DD/MM/YYYY"),
      createBy:
        userInfo.firstName +
        " " +
        userInfo.middleName +
        " " +
        userInfo.lastName,
      updateDate: moment().format("DD/MM/YYYY"),
      updateBy:
        userInfo.firstName +
        " " +
        userInfo.middleName +
        " " +
        userInfo.lastName,
      status: true,
      serviceCategory_Id: 1,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Yêu cầu *"),
      price: Yup.string().required("Yêu cầu *"),
      majorGroup: Yup.string().required("Yêu cầu *"),
      serviceCategory_Id: Yup.string().required("Yêu cầu *"),
      description: Yup.string().required("Yêu cầu *"),
    }),
  });
  const body = (
    <div className="paper" id="simple-modal-title">
      <h2>Thêm mới dịch vụ</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-6 simpleModalItem">
            <InputLabel>Tên dịch vụ</InputLabel>
            <TextField
              className="title"
              required
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onClick={() => {
                handleChangeName();
              }}
            />
            {formik.errors.name && (
              <span style={{ color: "red" }}>{formik.errors.name}</span>
            )}
            <p>{duplicateName}</p>
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Giá</InputLabel>
            <TextField
              type="number"
              className="title"
              required
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price && (
              <span style={{ color: "red" }}>{formik.errors.price}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Nhóm dịch vụ</InputLabel>
            <Select
              className="title"
              required
              id="serviceCategory_Id"
              name="serviceCategory_Id"
              value={formik.values.serviceCategory_Id}
              onChange={formik.handleChange}
            >
              <MenuItem value={1}>Thức ăn</MenuItem>
              <MenuItem value={2}>Đồ uống</MenuItem>
            </Select>
            {formik.errors.serviceCategory_Id && (
              <span style={{ color: "red" }}>
                {formik.errors.serviceCategory_Id}
              </span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Nhóm</InputLabel>
            {renderMajorGroup()}
            {formik.errors.majorGroup && (
              <span style={{ color: "red" }}>{formik.errors.majorGroup}</span>
            )}
          </div>
          <div className="col-12" style={{ height: "170px" }}>
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
          {/* <div className="InfoCreate col-12">
            <div className="row">
              <div className="col-6">
                <InputLabel>Ngày tạo</InputLabel>
                <TextField
                  className="title"
                  required
                  id="createDate"
                  name="createDate"
                  value={formik.values.createDate}
                  onChange={formik.handleChange}
                  disabled
                />
              </div>
              <div className="col-6">
                <InputLabel>Người tạo</InputLabel>
                <TextField
                  className="title"
                  required
                  id="createBy"
                  name="createBy"
                  value={formik.values.createBy}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-6">
                <InputLabel>Ngày cập nhật</InputLabel>
                <TextField
                  className="title"
                  required
                  id="updateDate"
                  name="updateDate"
                  value={formik.values.updateDate}
                  onChange={formik.handleChange}
                  disabled
                />
              </div>
              <div className="col-6">
                <InputLabel>Người cập nhật</InputLabel>
                <TextField
                  className="title"
                  required
                  id="updateBy"
                  name="updateBy"
                  value={formik.values.updateBy}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
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
