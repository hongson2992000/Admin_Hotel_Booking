import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import "./AlarmContainer.scss";
import Select from "react-select";
export default function AlarmContainer() {
  const formik = useFormik({
    initialValues: {
      dataTime: "",
    },
    onSubmit: (values, { resetForm }) => {
      //   onSubmitInfoUser(values);
      resetForm({ values: "" });
    },
    enableReinitialize: true,
  });
  console.log(formik.values)
  const option = [
    { value: 1, label: "Phòng 1" },
    { value: 2, label: "Phòng 2" },
    { value: 3, label: "Phòng 3" },
    { value: 4, label: "Phòng 4" },
    { value: 5, label: "Phòng 5" },
  ];
  return (
    <div className="AlarmContainer">
      <form
        noValidate
        autoComplete="off"
        className="form col-12"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-12 simpleModalItem">
            <div className="row">
              <div className="col-4">
                <InputLabel>Giờ Báo Thức</InputLabel>
                <input
                  className="title"
                  type="datetime-local"
                  id="dataTime"
                  name="dataTime"
                  value={formik.values.dataTime || ""}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-4">
                <InputLabel>Phòng</InputLabel>
                <Select isMulti options={option} className="title"/>
              </div>
            </div>
          </div>
          <div className="footer">
            <button className="buttonSave" type="submit">
              Lưu
            </button>
            {/* <button className="buttonClose" onClick={onClose}>
              Đóng
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
}
