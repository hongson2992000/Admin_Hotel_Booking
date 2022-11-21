import React from "react";
import "./OverviewContainer.scss";

import Navbar from "../Navbar/Navbar";
import Widget from "../Widget/Widget";
import Featured from "../Featured/Featured";
import Chart from "../Chart/Chart";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

import HotelIcon from "@mui/icons-material/Hotel";

export default function OverviewContainer() {
  return (
    <div className="homeContainer">
      <Navbar />
      <div className="widgets">
        <Widget type="dat_hom_nay" />
        <Widget type="doanh_thu" />
        <Widget type="doanh_thu_luy_ke" />
      </div>
      <div className="widgets">
        <Widget type="huy_hom_nay" />
        <Widget type="doanh_thu_huy" />
        <Widget type="doanh_thu_huy_luy_ke" />
      </div>

      <div className="widgetHotel">
        <div className="widgethotel">
          <div className="left">
            <span className="counter">0</span>
            <span className="title">Phòng đến trong ngày</span>
          </div>
          <div className="right">
            <div className="percentage positive">
              <HomeIcon />
              <DirectionsRunIcon />
            </div>
          </div>
        </div>

        <div className="widgethotel">
          <div className="left">
            <span className="counter">0</span>
            <span className="title">Phòng đi trong ngày</span>
          </div>
          <div className="right">
            <div className="percentage positive">
              <DirectionsRunIcon />
              <HomeIcon />
            </div>
          </div>
        </div>

        <div className="widgethotel">
          <div className="left">
            <span className="counter">0</span>
            <span className="title">Phòng có khách</span>
          </div>
          <div className="right">
            <div className="percentage positive">
              <HotelIcon />
            </div>
          </div>
        </div>

        <div className="widgethotel">
          <div className="left">
            <span className="counter">0</span>
            <span className="title">Phòng khách ở</span>
          </div>
          <div className="right">
            <div className="percentage positive">
              <SupervisorAccountIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="charts">
        <Chart title="Doanh thu tháng" aspect={6 / 1} />
      </div>
      {/* <div className="charts">
        <Featured />
        <Featured />
      </div> */}
    </div>
  );
}
