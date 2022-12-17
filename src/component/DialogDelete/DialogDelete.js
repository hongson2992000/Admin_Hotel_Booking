import React from "react";
import "./DialogDelete.scss";
import image from "../../assets/img/error.png";
export default function DialogDelete({ onDialog, message }) {
  return (
    <div
      className="DialogDelete"
      onClick={() => {
        onDialog(false);
      }}
    >
      <div className="DialogDeleteItem" onClick={(e) => e.stopPropagation()}>
        {/* <img src={image} alt="" /> */}
        <div
          className="top-modal"
          style={{ textAlign: "center", padding: "10px" }}
        >
          <span>Xác Nhận</span>
        </div>

        <div className="center-modal" style={{ textAlign: "center", padding: "10px" }}>
          <span stlye={{ color: "#111", fontSize: "10px" }}>{message}</span>
        </div>
        <div
          style={{ display: "flex",justifyContent:"center",padding:"10px"}}
        >
          <button className="buttonDialogAccept" onClick={() => onDialog(true)}>
            Đồng ý
          </button>
          <button
            className="buttonDialogCancel"
            onClick={() => onDialog(false)}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
