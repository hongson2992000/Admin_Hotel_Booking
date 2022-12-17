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
import { modalUpdateServiceState$ } from "../../../redux/selectors/ModalSelector";
import "./UpdateServiceModal.scss";
import { hideModalUpdate } from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/ServiceManageAction";
import { serviceItemManageState$ } from "../../../redux/selectors/ServiceManageSelector";
import { USER_LOGIN } from "../../../utils/constants/settingSystem";
import * as Yup from "yup";
export default function UpdateServiceModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalUpdateServiceState$);
  const serviceInfo = useSelector(serviceItemManageState$);
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
    dispatch(hideModalUpdate());
    //
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
  const onSubmitService = useCallback(
    (values) => {
      dispatch(actions.updateHotelService.updateHotelServiceRequest(values));
      dispatch(hideModalUpdate());
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      id: serviceInfo.id,
      name: serviceInfo.name,
      price: serviceInfo.price,
      majorGroup: serviceInfo.majorGroup,
      description: serviceInfo.description,
      createDate: serviceInfo.createDate,
      createBy: serviceInfo.createBy,
      updateDate: getCurrentDate(),
      updateBy:
        userInfo.firstName +
        " " +
        userInfo.middleName +
        " " +
        userInfo.lastName,
      status: serviceInfo.status,
      serviceCategory_Id: serviceInfo.serviceCategory_Id,
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
    enableReinitialize: true,
  });
  const body = (
    <div className="paperUpdate" id="simple-modal-title">
      <h2>Chỉnh sửa dịch vụ</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <div className="row">
          <div className="col-6 simpleModalItem">
            <InputLabel>Tên dịch vụ</InputLabel>
            <TextField
              className="title"
              required
              id="name"
              name="name"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <span style={{ color: "red" }}>{formik.errors.name}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Giá</InputLabel>
            <TextField
              type={"number"}
              className="title"
              required
              id="price"
              name="price"
              value={formik.values.price || ""}
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
              value={formik.values.serviceCategory_Id || ""}
              onChange={formik.handleChange}
            >
              <MenuItem value={1}>Thức ăn</MenuItem>
              <MenuItem value={2}>Đồ uống</MenuItem>
            </Select>
            {formik.errors.serviceCategory_Id && (
              <span style={{ color: "red" }}>{formik.errors.serviceCategory_Id}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Nhóm</InputLabel>
            {renderMajorGroup()}
            {formik.errors.name && (
              <span style={{ color: "red" }}>{formik.errors.name}</span>
            )}
          </div>
          <div className="col-12" style={{height:"180px"}}>
            <InputLabel>Thông tin mô tả</InputLabel>
            <TextareaAutosize
              className="title"
              minRows={5}
              maxRows={10}
              id="description"
              name="description"
              value={formik.values.description || ""}
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
            <button className="buttonClose" type="reset" onClick={onClose}>
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
