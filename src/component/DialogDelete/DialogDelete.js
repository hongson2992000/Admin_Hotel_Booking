import React from "react";
import "./DialogDelete.scss";
import image from "../../assets/img/question.png";
export default function DialogDelete({ onDialog, message }) {
  return (
    <div
      className="DialogDelete"
      onClick={() => {
        onDialog(false);
      }}
    >
      <div className="DialogDeleteItem" onClick={(e) => e.stopPropagation()}>
      <img src={image} alt="" />
        <h4 stlye={{ color: "#111", fontSize: "10px" }}>{message}</h4>
        <div style={{ display: "flex", justifyContent: "end",marginTop:"10px" }}>
          <button className="buttonDialog" onClick={() => onDialog(true)}>
            Đồng ý
          </button>
          <button className="buttonDialog" onClick={() => onDialog(false)}>Hủy</button>
        </div>
      </div>
    </div>
  );
}
