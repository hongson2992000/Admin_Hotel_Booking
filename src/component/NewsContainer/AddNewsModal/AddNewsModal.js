import { InputLabel, Modal, TextareaAutosize, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { modalAddNewsState$ } from "../../../redux/selectors/ModalSelector";
import "./AddNewsModal.scss";
import { hideModalAddNews } from "../../../redux/actions/ModalAction";
import * as actions from "../../../redux/actions/NewsManageAction";
import moment from "moment";
import * as Yup from "yup";
export default function AddNewsModal() {
  const dispatch = useDispatch();
  const isShow = useSelector(modalAddNewsState$);
  let currentDate = moment().format("YYYY-MM-DD");
  const onClose = useCallback(() => {
    dispatch(hideModalAddNews());
  }, [dispatch]);
  // let dataService = formik.values
  const onSubmitService = useCallback(
    (values) => {
      let startDate = values.startDate.split("-");
      let formatStartDate =
        startDate[2] + "/" + startDate[1] + "/" + startDate[0];
      let endDate = values.endDate.split("-");
      let formatEndDate = endDate[2] + "/" + endDate[1] + "/" + endDate[0];
      let news = {
        address: values.address,
        description: values.description,
        detailInformation: values.detailInformation,
        endDate: formatEndDate,
        endTime: values.endTime,
        id: 0,
        newName: values.newName,
        newsType: "event",
        numberOfView: values.numberOfView,
        startDate: formatStartDate,
        startTime: values.startTime,
        status: "READY",
        ticketInformation: values.ticketInformation,
      };
      // dispatch(actions.createNews.createNewsRequest(news));
      dispatch(hideModalAddNews());
    },
    [dispatch]
  );
  const formik = useFormik({
    initialValues: {
      address: "",
      description: "",
      detailInformation: "",
      endDate: "",
      endTime: "",
      id: 0,
      newName: "",
      newsType: "",
      numberOfView: 0,
      startDate: "",
      startTime: "",
      status: "",
      ticketInformation: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitService(values);
      resetForm({ values: "" });
    },
    validationSchema: Yup.object({
      newName: Yup.string().required("Y??u c???u *"),
      address: Yup.string().required("Y??u c???u *"),
      startDate: Yup.string().required("Y??u c???u *"),
      endDate: Yup.string().required("Y??u c???u *"),
      startTime: Yup.string().required("Y??u c???u *"),
      endTime: Yup.string().required("Y??u c???u *"),
      description: Yup.string().required("Y??u c???u *"),
      numberOfView: Yup.string().required("Y??u c???u *"),
      ticketInformation: Yup.string().required("Y??u c???u *"),
    }),
    enableReinitialize: true,
  });
  const body = (
    <div className="paperAddNews" id="simple-modal-title">
      <h2>Th??m m???i tin t???c</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form col-12 simpleModalItem"
        onSubmit={formik.handleSubmit}
      >
        <div className="row">
          <div className="col-6 simpleModalItem">
            <InputLabel>T??n tin t???c</InputLabel>
            <TextField
              className="title"
              required
              id="newName"
              name="newName"
              value={formik.values.newName}
              onChange={formik.handleChange}
            />
            {formik.errors.newName && (
              <span style={{ color: "red" }}>{formik.errors.newName}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>?????a ch???</InputLabel>
            <TextField
              className="title"
              required
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && (
              <span style={{ color: "red" }}>{formik.errors.address}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Ng??y b???t ?????u</InputLabel>
            <input
              type="date"
              className="title"
              required
              id="startDate"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              // min={`${currentDate}T00:00`}
              min={moment().format("YYYY-MM-DD")}
            />
            {formik.errors.startDate && (
              <span style={{ color: "red" }}>{formik.errors.startDate}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Ng??y k???t th??c</InputLabel>
            <input
              type="date"
              className="title"
              required
              id="endDate"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              min={moment().format("YYYY-MM-DD")}
            />
            {formik.errors.endDate && (
              <span style={{ color: "red" }}>{formik.errors.endDate}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Gi??? m???</InputLabel>
            <input
              type="time"
              className="title"
              required
              id="startTime"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              // min={`${currentDate}T00:00`}
            />
            {formik.errors.startTime && (
              <span style={{ color: "red" }}>{formik.errors.startTime}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Gi??? ????ng</InputLabel>
            <input
              type="time"
              className="title"
              required
              id="endTime"
              name="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              style={{
                height: "56px",
                borderRadius: "5px",
                border: "1px solid #c4c4c4",
                padding: "5px",
              }}
              // min={`${currentDate}T00:00`}
            />
            {formik.errors.endTime && (
              <span style={{ color: "red" }}>{formik.errors.endTime}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>S??? ng?????i t???i da</InputLabel>
            <TextField
              className="title"
              required
              id="numberOfView"
              name="numberOfView"
              value={formik.values.numberOfView}
              onChange={formik.handleChange}
            />
            {formik.errors.numberOfView && (
              <span style={{ color: "red" }}>{formik.errors.numberOfView}</span>
            )}
          </div>
          <div className="col-6 simpleModalItem">
            <InputLabel>Th??ng tin v??</InputLabel>
            <TextField
              className="title"
              required
              id="ticketInformation"
              name="ticketInformation"
              value={formik.values.ticketInformation}
              onChange={formik.handleChange}
            />
            {formik.errors.ticketInformation && (
              <span style={{ color: "red" }}>
                {formik.errors.ticketInformation}
              </span>
            )}
          </div>
          <div className="col-12" style={{ height: "160px" }}>
            <InputLabel>Th??ng tin m?? t???</InputLabel>
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
              L??u
            </button>
            <button className="buttonClose" onClick={onClose}>
              ????ng
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
