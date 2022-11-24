import { InputLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import "./CheckInContainer.scss";
export default function CheckInContainer() {
    const formik = useFormik({
        initialValues: {
          id: 0,
          name: "",
          price: 0,
          majorGroup: "",
          description: "",
        //   createDate: getCurrentDate(),
        //   createBy: "hongson2992000",
        //   updateDate: getCurrentDate(),
          updateBy: "hongson2992000",
          status: true,
          serviceCategory_Id: 1,
        },
        onSubmit: (values, { resetForm }) => {
        //   onSubmitService(values);
          resetForm({ values: "" });
        },
      });
  return (
    <div className="CheckInContainer">
      <div className="InfoRoomBooking">
        <p>Phòng: Standard Room</p>
        <form>
          <div className="top-form">
          <div className="roomNo">
          <span style={{width:"100px"}}>Số Phòng:</span>
            <TextField
              className="title"
              required
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <span style={{paddingLeft:"50px"}}>Tiền Phòng:</span>
          </div>
          </div>
          <hr/>
          <div className="col-12">
            
          </div>
        </form>
      </div>
    </div>
  );
}
