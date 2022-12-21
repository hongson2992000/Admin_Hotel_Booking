/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import "./OverviewContainer.scss";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Widget from "../Widget/Widget";
import Chart from "../Chart/Chart";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import HotelIcon from "@mui/icons-material/Hotel";
import {
  getDashBoardState$,
  getRevenuesCancelEntireState$,
  getRevenuesEntireState$,
} from "../../redux/selectors/BookingManageSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  convertDateDBIntoDateJS,
  getFirstDateAndLastDateOfCurrentMonth,
  removeDuplicateInArray,
} from "../../utils/util";
import moment from "moment";
import * as actions from "../../redux/actions/BookingManageAction";
import * as customerActions from "../../redux/actions/CustomerManageAction";
import { customerFeedbackState$ } from "../../redux/selectors/CuatomerManageSelector";
import image from "../../../src/assets/img/loading13.gif";

const OverviewContainer = () => {
  const dashBoard = useSelector(getDashBoardState$);
  const revenueData = useSelector(getRevenuesEntireState$);
  const revenueCancelData = useSelector(getRevenuesCancelEntireState$);
  const feedbackData = useSelector(customerFeedbackState$);
  const dispatch = useDispatch();
  const currentDate = moment().format("DD/MM/yyyy");
  const { firstDay } = getFirstDateAndLastDateOfCurrentMonth();
  const [dataChart, setDataChart] = useState(null);
  const [feedbackDataChart, setFeedbackDataChart] = useState(null);
  const startDateRef = useRef();
  const endDateRef = useRef();

  useEffect(() => {
    if (
      Object.keys(dashBoard).length === 0 &&
      revenueData.length === 0 &&
      revenueCancelData.length === 0 &&
      feedbackData.length === 0
    ) {
      dispatch(
        actions.getDashBoardOverview.getDashBoardOverviewRequest({
          startDate: firstDay,
          endDate: currentDate,
        })
      );
      dispatch(
        actions.getRevenueEntireDate.getRevenueEntireDateRequest({
          startDate: firstDay,
          endDate: currentDate,
        })
      );
      dispatch(
        actions.getRevenueCancelEntireDate.getRevenueCancelEntireDateRequest({
          startDate: firstDay,
          endDate: currentDate,
        })
      );
      dispatch(
        customerActions.getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenRequest(
          {
            startDate: firstDay,
            endDate: currentDate,
          }
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    let newArr = [];
    revenueData.map((r) => {
      const cancelInSameDay = revenueCancelData.find(
        (rc) => rc.date === r.date
      );
      if (cancelInSameDay) {
        newArr.push({
          date: r.date,
          "Doanh thu": r.totalPrice,
          "Doanh thu hủy": cancelInSameDay.totalPrice,
        });
      } else {
        newArr.push({
          date: r.date,
          "Doanh thu": r.totalPrice,
          "Doanh thu hủy": 0,
        });
      }
    });
    revenueCancelData.map((rc) => {
      const sameDay = revenueData.find((r) => r.date === rc.date);
      if (!sameDay) {
        newArr.push({
          date: rc.date,
          "Doanh thu": 0,
          "Doanh thu hủy": rc.totalPrice,
        });
      }
    });
    const ar = newArr.sort(
      (a, b) =>
        convertDateDBIntoDateJS(a.date) - convertDateDBIntoDateJS(b.date)
    );
    setDataChart(ar);
  }, [revenueData, revenueCancelData]);

  useEffect(() => {
    let listFeedbackData = [];
    feedbackData.map((f) => {
      if (listFeedbackData.length !== 0) {
        const feedBackExistIndex = listFeedbackData.findIndex(
          (fData) => fData.content === f.feedbackContent.content
        );
        if (feedBackExistIndex !== -1) {
          listFeedbackData[feedBackExistIndex].rating += f.rating;
          listFeedbackData[feedBackExistIndex].count += 1;
        } else {
          listFeedbackData.push({
            content: f.feedbackContent.content,
            rating: f.rating,
            count: 1,
          });
        }
      } else {
        listFeedbackData.push({
          content: f.feedbackContent.content,
          rating: f.rating,
          count: 1,
        });
      }
    });
    const feedbackDataChart = listFeedbackData.map((fbd) => {
      return {
        "Dịch vụ": fbd.content,
        "Đánh giá": (fbd.rating / fbd.count).toFixed(2),
      };
    });
    setFeedbackDataChart(feedbackDataChart);
  }, [feedbackData]);

  const handleSearchBetween = () => {
    if (startDateRef.current && endDateRef.current) {
      if (startDateRef.current.value === "") {
        startDateRef.current.value = moment(
          convertDateDBIntoDateJS(firstDay)
        ).format("yyyy-MM-DD");
      }
      if (endDateRef.current.value === "") {
        endDateRef.current.value = moment(
          convertDateDBIntoDateJS(currentDate)
        ).format("yyyy-MM-DD");
      }
      dispatch(
        actions.getDashBoardOverview.getDashBoardOverviewRequest({
          startDate: moment(startDateRef.current.value).format("DD/MM/yyyy"),
          endDate: moment(endDateRef.current.value).format("DD/MM/yyyy"),
        })
      );
      dispatch(
        actions.getRevenueEntireDate.getRevenueEntireDateRequest({
          startDate: moment(startDateRef.current.value).format("DD/MM/yyyy"),
          endDate: moment(endDateRef.current.value).format("DD/MM/yyyy"),
        })
      );
      dispatch(
        actions.getRevenueCancelEntireDate.getRevenueCancelEntireDateRequest({
          startDate: moment(startDateRef.current.value).format("DD/MM/yyyy"),
          endDate: moment(endDateRef.current.value).format("DD/MM/yyyy"),
        })
      );
      dispatch(
        customerActions.getCustomerFeedbackByBetween.getCustomerFeedbackByBetweenRequest(
          {
            startDate: moment(startDateRef.current.value).format("DD/MM/yyyy"),
            endDate: moment(endDateRef.current.value).format("DD/MM/yyyy"),
          }
        )
      );
    }
  };

  if (!dashBoard) return;

  return (
    <div className="homeContainer">
      <Navbar />

      <div className="d-flex justify-content-start searchContainer">
        <div className="d-flex searchBox align-items-center justify-content-between">
          <label>Từ Ngày: </label>
          <input
            type="date"
            className="dateSelect"
            ref={startDateRef}
            defaultValue={moment(convertDateDBIntoDateJS(firstDay)).format(
              "yyyy-MM-DD"
            )}
            max={moment(convertDateDBIntoDateJS(currentDate)).format(
              "yyyy-MM-DD"
            )}
          />
        </div>
        <div className="d-flex searchBox align-items-center justify-content-between">
          <label>Đến Ngày: </label>
          <input
            type="date"
            className="dateSelect"
            ref={endDateRef}
            defaultValue={moment(convertDateDBIntoDateJS(currentDate)).format(
              "yyyy-MM-DD"
            )}
            max={moment(convertDateDBIntoDateJS(currentDate)).format(
              "yyyy-MM-DD"
            )}
          />
        </div>
        <div
          className="btn-search d-flex align-items-center justify-content-center"
          onClick={handleSearchBetween}
        >
          Tra cứu
        </div>
      </div>
      {Object.keys(dashBoard).length !== 0 ? (
        <>
          <div className="widgets">
            <Widget type="dat_hom_nay" amount={dashBoard.bookedToday} />
            <Widget type="doanh_thu" amount={dashBoard.revenue} />
            <Widget
              type="doanh_thu_luy_ke"
              amount={dashBoard.accumulateRevenue}
            />
          </div>
          <div className="widgets">
            <Widget type="huy_hom_nay" amount={dashBoard.canceledToday} />
            <Widget type="doanh_thu_huy" amount={dashBoard.cancelRevenue} />
            <Widget
              type="doanh_thu_huy_luy_ke"
              amount={dashBoard.cancelAccumulateRevenue}
            />
          </div>

          <div className="widgetHotel">
            <div className="widgethotel">
              <div className="left">
                <span className="counter">{dashBoard.actualArriveToday}</span>
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
                <span className="counter">
                  {dashBoard.actualDepartureToday}
                </span>
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
                <span className="counter">{dashBoard.roomBusy}</span>
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
                <span className="counter">{dashBoard.numOfStay}</span>
                <span className="title">Số khách ở</span>
              </div>
              <div className="right">
                <div className="percentage positive">
                  <SupervisorAccountIcon />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <img src={image} alt="" />
        </div>
      )}
      <div className=""></div>
      {dataChart && dataChart.length > 0 && (
        <div className="charts">
          <Chart
            title={`Biểu đồ tỉ lệ doanh thu và doanh thu hủy từ ngày ${moment(
              startDateRef.current.value
            ).format("DD/MM/yyyy")} đến ngày ${moment(
              endDateRef.current.value
            ).format("DD/MM/yyyy")}`}
            aspect={6 / 2}
            data={dataChart}
          />
        </div>
      )}
      {feedbackDataChart && feedbackDataChart.length > 0 && (
        <div className="charts">
          <Chart
            title={`Biểu đồ đánh giá phản hồi chất lượng dịch vụ của khách hàng ${moment(
              startDateRef.current.value
            ).format("DD/MM/yyyy")} đến ngày ${moment(
              endDateRef.current.value
            ).format("DD/MM/yyyy")}`}
            aspect={6 / 2}
            data={feedbackDataChart}
            isFeedback
          />
        </div>
      )}
    </div>
  );
};

export default OverviewContainer;
