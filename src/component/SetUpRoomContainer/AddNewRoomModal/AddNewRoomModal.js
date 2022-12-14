import { InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalAddNewRoomState$ } from "../../../redux/selectors/ModalSelector";
import "./AddNewRoomModal.scss";
import {
 hideModalAddNewRoom,
} from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/RoomManageAction";
import moment from "moment";
import * as Yup from "yup";
import { USER_LOGIN } from "../../../utils/constants/settingSystem";
import { setUpRoomManageState$ } from "../../../redux/selectors/SetUpRoomPriceManageSelector";
export default function AddNewRoomModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalAddNewRoomState$);
  let currentDate = moment().format("YYYY-MM-DD");
  const userInfo = JSON.parse(localStorage.getItem(USER_LOGIN))
  const listRoom = useSelector(setUpRoomManageState$);
  const onClose = useCallback(() => {
    dispatch(hideModalAddNewRoom());
  }, [dispatch]);
  const roomType = [
    {id:1, name:"Deluxe King/ Cao cấp"},
    {id:2, name:"Deluxe Twin/ Cao cấp"},
    {id:3, name:"Superior King/ Phòng thường"},
    {id:4, name:"Superior Twin/ Phòng thường"},
    {id:5, name:"Standard King/ Phòng thường"},
    {id:6, name:"Standard Twin/ Phòng thường"}
  ]
  let [duplicateName , setDuplicateName] =useState("")
  let [duplicateRoomNo , setDuplicateRoomNo] =useState("")
  let handleDuplicate = () =>{
    setDuplicateName("")
    setDuplicateRoomNo("")
  }
  const onSubmitService = useCallback(
    (values) => {
      let duplicateRoom = listRoom.filter((item)=>item.room.name === values.name)
      let duplicateRoomNo = listRoom.filter((item)=>item.room.roomNo === values.roomNo)
      if(duplicateRoom.length !== 0){
        setDuplicateName("Tên phòng này đã tồn tại")
      }else if(duplicateRoomNo.length !==0){
        setDuplicateRoomNo("Số phòng này đã tồn tại")
      }else{
        dispatch(actions.createRoom.createRoomRequest(values));
        dispatch(hideModalAddNewRoom());
      }

    },
    [dispatch,listRoom]
  );
  const formik = useFormik({
    initialValues: {
        createBy: userInfo.firstName + " " + userInfo.middleName + " " +userInfo.lastName,
        createDate: moment().format("DD/MM/YYYY"),
        description: "",
        hotel_Id: 1,
        id: 0,
        lastModifyBy: userInfo.firstName + " " + userInfo.middleName + " " +userInfo.lastName,
        name: "",
        roomNo: "",
        roomType_Id: 1,
        status: false,
        updateDate: moment().format("DD/MM/YYYY")
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Yêu cầu *"),
      roomNo: Yup.string().required("Yêu cầu *"),
      roomType_Id: Yup.string().required("Yêu cầu *"),
      description: Yup.string().required("Yêu cầu *"),
    }),
    enableReinitialize:true
  });
  const body = (
    <div className="paperAddNewLocation" id="simple-modal-title">
      <h2>Thêm mới phòng</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-12 simpleModalItem">
            <InputLabel>Tên phòng</InputLabel>
            <TextField
              className="title"
              required
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onClick={()=>handleDuplicate()}
            />
            <span style={{ color: "red" }}>{duplicateName}</span>
            {formik.errors.name && (
              <span style={{ color: "red" }}>{formik.errors.name}</span>
            )}
          </div>
          <div className="col-12 simpleModalItem">
            <InputLabel>Số phòng</InputLabel>
            <TextField
              className="title"
              required
              id="roomNo"
              name="roomNo"
              value={formik.values.roomNo}
              onChange={formik.handleChange}
              onClick={()=>handleDuplicate()}
            />
             <span style={{ color: "red" }}>{duplicateRoomNo}</span>
            {formik.errors.roomNo && (
              <span style={{ color: "red" }}>{formik.errors.roomNo}</span>
            )}
          </div>
          <div className="col-12 simpleModalItem">
            <InputLabel>Loại phòng</InputLabel>
            <Select
              className="title"
              required
              id="roomType_Id"
              name="roomType_Id"
              value={formik.values.roomType_Id}
              onChange={formik.handleChange}
            >
              {roomType.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            {formik.errors.roomType_Id && (
              <span style={{ color: "red" }}>{formik.errors.roomType_Id}</span>
            )}
          </div>
          <div className="col-12" style={{height:"160px"}}>
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
