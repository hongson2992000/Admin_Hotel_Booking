import React from "react";
import "./PopupCheckOutError.scss";
import image from "../../assets/img/error.png";
import { useDispatch, useSelector } from "react-redux";
import { hideModalCheckOutError} from "../../redux/actions/ModalAction";
import { modalCheckOutErrorState$} from "../../redux/selectors/ModalSelector";
export default function PopupCheckOutError() {
  const dispatch = useDispatch();
  const isError = useSelector(modalCheckOutErrorState$);
  const closePopup = () => {
    dispatch(hideModalCheckOutError());
  };

  if (isError) {
    return (
      <div className="popupError">
        <img src={image} alt="" />
        <h2>Thất Bại</h2>
        <p>Còn dịch vụ chưa thanh toán không thể check out</p>
        <button type="button" onClick={closePopup}>
          OK
        </button>
      </div>
    );
  } else {
    return "";
  }
}
