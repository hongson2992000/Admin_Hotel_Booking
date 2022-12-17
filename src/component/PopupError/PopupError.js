import React from "react";
import "./PopupError.scss";
import image from "../../assets/img/error.png";
import { useDispatch, useSelector } from "react-redux";
import { successState$ } from "../../redux/selectors/LoadingSelector";
import { hideModalError } from "../../redux/actions/ModalAction";
import { modalErrorState$ } from "../../redux/selectors/ModalSelector";
export default function PopupError() {
  const dispatch = useDispatch();
  const isError = useSelector(modalErrorState$);
  const closePopup = () => {
    dispatch(hideModalError());
  };

  if (isError) {
    return (
      <div className="popupError">
        <img src={image} alt="" />
        <h2>Thất Bại</h2>
        <p>Thao tác của bạn đã thất bại</p>
        <button type="button" onClick={closePopup}>
          OK
        </button>
      </div>
    );
  } else {
    return "";
  }
}
