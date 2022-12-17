import React from "react";
import { formatPrice } from "../../utils/util";
import "./Widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function Widget({ type, amount, diff }) {
  let data;

  // //temporary
  // const amount = 0;
  // const diff = 0;
  // useEffect(() => {
  //   if(amount === ''){
  //     amount = 0;
  //   }
  // })

  switch (type) {
    case "dat_hom_nay":
      data = {
        title: "Số lượng phòng đã đặt",
        isMoney: false,
      };
      break;
    case "doanh_thu":
      data = {
        title: "Doanh thu",
        isMoney: true,
      };
      break;
    case "doanh_thu_luy_ke":
      data = {
        title: "Doanh thu luỹ kế",
        isMoney: true,
      };
      break;
    case "huy_hom_nay":
      data = {
        title: "Số lượng hủy đặt phòng hoặc khách không đến",
        isMoney: false,
      };
      break;
    case "doanh_thu_huy":
      data = {
        title: "Doanh thu huỷ",
        isMoney: true,
      };
      break;
    case "doanh_thu_huy_luy_ke":
      data = {
        title: "Doanh thu huỷ luỹ kế",
        isMoney: true,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {amount === "0" || amount === ""
            ? 0
            : data.isMoney
            ? formatPrice(Number(amount), "vi-VN", "VND")
            : amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      {/* <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div> */}
    </div>
  );
}
