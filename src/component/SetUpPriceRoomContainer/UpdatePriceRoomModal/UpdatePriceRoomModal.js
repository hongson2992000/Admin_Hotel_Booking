import { InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalUpdateRoomTypeState$ } from "../../../redux/selectors/ModalSelector";
import "./UpdatePriceRoomModal.scss";
import {
  hideModalUpdateRoomType,
} from "../../../redux/actions/ModalAction";
import {setUpRoomTypeItemManageState$} from "../../../redux/selectors/SetUpRoomPriceManageSelector"
import * as actions from "../../../redux/actions/LocationManageAction";
import moment from "moment";
import * as Yup from "yup";
export default function UpdatePriceRoomModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalUpdateRoomTypeState$);
  const roomTypeItem =useSelector(setUpRoomTypeItemManageState$)
  let currentDate = moment().format("YYYY-MM-DD");
  const onClose = useCallback(() => {
    dispatch(hideModalUpdateRoomType());
  }, [dispatch]);
  const roomType = [
    {id:1, name:"Deluxe King/ Cao cấp"},
    {id:2, name:"Deluxe Twin/ Cao cấp"},
    {id:3, name:"Superior King/ Phòng thường"},
    {id:4, name:"Superior Twin/ Phòng thường"},
    {id:5, name:"Standard King/ Phòng thường"},
    {id:6, name:"Standard Twin/ Phòng thường"}
  ]
  const onSubmitService = useCallback(
    (values) => {
      dispatch(actions.createLocation.createLocationRequest(values));
      dispatch(hideModalUpdateRoomType());
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      active: roomTypeItem?.active,
      bedType: roomTypeItem.bedType,
      defaultOccupancy: roomTypeItem.defaultOccupancy,
      defaultPrice: roomTypeItem.defaultPrice,
      description: roomTypeItem.description,
      id: roomTypeItem.id,
      maxAdult: roomTypeItem.maxAdult,
      maxChildren: roomTypeItem.maxChildren,
      maxOccupancy: roomTypeItem.maxOccupancy,
      name: roomTypeItem.name
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      defaultPrice: Yup.string().required("Yêu cầu *").matches(/^\d+\.?\d*$/,"Vui lòng nhập đúng định dạng giá").max(10,"Vui lòng nhập đúng định dạng giá")
    }),
    enableReinitialize:true
  });
  const body = (
    <div className="paperUpdateRoomPType" id="simple-modal-title">
      <h2>Cập nhật giá phòng</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-12 simpleModalItem">
            <InputLabel>Tên loại phòng</InputLabel>
            <TextField
              className="title"
              required
              id="name"
              name="name"
              disabled
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <span style={{ color: "red" }}>{formik.errors.name}</span>
            )}
          </div>
          <div className="col-12 simpleModalItem">
            <InputLabel>Giá mặc định</InputLabel>
            <TextField
              className="title"
              required
              type="number"
              id="defaultPrice"
              name="defaultPrice"
              value={formik.values.defaultPrice}
              onChange={formik.handleChange}
            />
            {formik.errors.defaultPrice && (
              <span style={{ color: "red" }}>{formik.errors.defaultPrice}</span>
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
