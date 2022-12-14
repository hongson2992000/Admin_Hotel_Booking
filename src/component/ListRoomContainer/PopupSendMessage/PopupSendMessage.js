import { Modal, TextareaAutosize } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModalSendMessage } from "../../../redux/actions/ModalAction";
import { modalSendMessageState$ } from "../../../redux/selectors/ModalSelector";
import "./PopupSendMessage.scss";
import * as actions from "../../../redux/actions/SendMessageAction";
export default function PopupSendMessage({bookingId}) {
  const dispatch = useDispatch();
  // const bookingItem = useSelector(bookingItemState$);
  const isShow = useSelector(modalSendMessageState$);
  const onSubmitMessage = useCallback(
    (values) => {
      dispatch(
        actions.sendMessage.sendMessageRequest({
          booking_Id: bookingId,
          messageContent: values.content,
          id: 0,
        })
      );
      dispatch(hideModalSendMessage());
    },
    [dispatch,bookingId]
  );

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSubmitMessage(values);
      resetForm({ values: "" });
      //   renderIdRandom();
    },
    enableReinitialize: true,
  });
  const onClose = useCallback(() => {
    dispatch(hideModalSendMessage());
  }, [dispatch]);
  const body = (
    <div className="paperSendMessage" id="simple-modal-title">
      <h2>Nhập thông báo bạn muốn gửi</h2>
      <hr />
      <form
        noValidate
        autoComplete="off"
        className="form"
        onSubmit={formik.handleSubmit}
      >
        <div className="simpleModalItem">
          <TextareaAutosize
            className="titleSendMessage"
            required
            id="content"
            name="content"
            value={formik.values.content || ""}
            onChange={formik.handleChange}
          />
        </div>
        <div className="footer">
          <button className="buttonSave" type="submit">
            Gửi
          </button>
          <button className="buttonClose" onClick={onClose}>
            Đóng
          </button>
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
