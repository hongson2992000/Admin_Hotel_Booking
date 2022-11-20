import {
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
  Button,
} from "@mui/material";
import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalCreateServiceState$ } from "../../../redux/selectors/ModalSelector";
import "./CreateServiceModal.scss";
import { hideModal } from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/ServiceManageAction";
export default function CreateServiceModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalCreateServiceState$);

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
          <MenuItem value={"appetizer"}>Khai Vị</MenuItem>
          <MenuItem value={"main_dishes"}>Món Chính</MenuItem>
          <MenuItem value={"dessert"}>Tráng Miệng</MenuItem>
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
          <MenuItem value={"coffee"}>Cà Phê</MenuItem>
          <MenuItem value={"tea"}>Trà</MenuItem>
          <MenuItem value={"water_and_soft_drink"}>Nước Giải Khát</MenuItem>
          <MenuItem value={"mocktails"}>MockTail</MenuItem>
          <MenuItem value={"beer"}>Bia</MenuItem>
        </Select>
      );
    }
  };
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
      price: 0,
      majorGroup: "",
      description: "",
      createDate: getCurrentDate(),
      createBy: "hongson2992000",
      updateDate: getCurrentDate(),
      updateBy: "hongson2992000",
      status: true,
      serviceCategory_Id: 1,
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
  });
  const body = (
    <div className="paper" id="simple-modal-title">
      <h2>Thêm Dịch Vụ</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-6">
            <InputLabel>Tên Dịch Vụ</InputLabel>
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
            <InputLabel>Giá Dịch Vụ</InputLabel>
            <TextField
              type={"number"}
              className="title"
              required
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-6">
            <InputLabel>Nhóm Dịch Vụ</InputLabel>
            <Select
              className="title"
              required
              id="serviceCategory_Id"
              name="serviceCategory_Id"
              value={formik.values.serviceCategory_Id}
              onChange={formik.handleChange}
            >
              <MenuItem value={1}>Thức Ăn</MenuItem>
              <MenuItem value={2}>Đồ Uống</MenuItem>
            </Select>
          </div>
          <div className="col-6">
            <InputLabel>Nhóm</InputLabel>
            {renderMajorGroup()}
          </div>
          <div className="col-12">
            <InputLabel>Mô Tả</InputLabel>
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
          <div className="InfoCreate col-12">
            <div className="row">
              <div className="col-6">
                <InputLabel>Ngày Tạo</InputLabel>
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
                <InputLabel>Người Tạo</InputLabel>
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
                <InputLabel>Ngày Cập Nhật</InputLabel>
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
                <InputLabel>Người Cập Nhật</InputLabel>
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
          </div>
          <div className="footer">
            <button
              className="button"
              // variant="contained"
              // color="primary"
              // component="span"
              // onSubmit={onSubmitService}
              type="submit"
            >
              Lưu
            </button>
            <Button
              className="button"
              variant="contained"
              color="error"
              component="span"
              onClick={onClose}
            >
              Đóng
            </Button>
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
