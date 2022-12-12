/* eslint-disable no-useless-concat */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment/moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomTypesState$ } from "../../redux/selectors/RoomManageSelector";
import {
  convertDayToVietNamTime,
  formatPrice,
  getDayInRange,
  isNumber,
} from "../../utils/util";
import * as action from "./../../redux/actions/RoomManageAction.js";
import "./SetUpRoomByDateContainer.scss";
import { setRoomPriceState$ } from "./../../redux/selectors/RoomManageSelector";

const SetUpRoomByDateContainer = () => {
  const dateCheckIn = useRef();
  const dateCheckOut = useRef();
  const applyPriceRef = useRef();
  const priceRef = useRef();
  const [price, setPrice] = useState();
  const [applyPrice, setApplyPrice] = useState(false);
  const roomTypes = useSelector(roomTypesState$);
  const [roomType, setRoomType] = useState(
    roomTypes.length > 0 ? roomTypes[0].id : 1
  );
  const dispatch = useDispatch();
  const [minDate, setMinDate] = useState(moment().format("yyyy-MM-DD"));
  const [maxDate, setMaxDate] = useState(
    moment(minDate).add(6, "d").format("yyyy-MM-DD")
  );
  const day = getDayInRange(
    dateCheckIn.current?.value ?? minDate,
    dateCheckOut.current?.value ?? maxDate
  );

  const dayConvert = convertDayToVietNamTime(day);
  const [checkedState, setCheckedState] = useState(
    new Array(dayConvert.length).fill(false)
  );
  const [checkedStateAlterApply, setCheckedStateAlterApply] = useState(
    new Array(dayConvert.length).fill(false)
  );

  const setRoomPrice = useSelector(setRoomPriceState$);

  useEffect(() => {
    dispatch(action.getAllRoomType.getAllRoomTypeRequest());
    if (Object.keys(setRoomPrice).length !== 0) {
      console.log(setRoomPrice);
    }
  }, [dispatch]);

  const renderRoomTypeDropdown = () => {
    return (
      roomTypes.length > 0 && (
        <select
          onChange={(e) => {
            applyPriceRef.current.checked = false;
            setApplyPrice(false);
            setRoomType(e.target.value);
            setCheckedState(new Array(dayConvert.length).fill(false));
            setCheckedStateAlterApply(new Array(dayConvert.length).fill(false));
            priceRef.current.value = "";
          }}
          defaultValue={roomTypes[0].code}
          className="w-100"
        >
          {roomTypes.map((roomType, index) => {
            return (
              <option value={roomType.id} key={index}>
                {roomType.name}
              </option>
            );
          })}
        </select>
      )
    );
  };

  const handleOnChangeDate = () => {
    setApplyPrice(false);
    applyPriceRef.current.checked = false;
    if (dateCheckIn.current && dateCheckOut.current) {
      // setMinDate(dateCheckIn.current.value);
      const maxDate = moment(dateCheckIn.current.value)
        .add(6, "d")
        .format("yyyy-MM-DD");
      setMaxDate(maxDate);
      dateCheckOut.current.value = maxDate;
    }
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const renderDay = () => {
    return (
      <div className="col-5 d-flex row dayFilter">
        {dayConvert.map((day, index) => {
          return (
            <div className="d-flex col-auto checkboxContainer" key={index}>
              <input
                type="checkbox"
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
              <p>{day.name}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const currentRoom = () => {
    if (roomTypes.length > 0) {
      const room = roomTypes.find((r) => r.id === Number(roomType));
      return room;
    }
    return "";
  };

  const handleView = () => {
    setApplyPrice(true);
  };

  const handleApply = () => {
    if (isNumber(priceRef.current.value)) {
      if (applyPriceRef.current.checked) {
        setPrice(priceRef.current.value);
        setCheckedStateAlterApply(checkedState);
        setApplyPrice(true);
      } else {
        alert("Chọn checkbox Áp Dụng");
      }
    } else {
      alert("Xin vui lòng nhập giá và không nhập chữ");
    }
  };

  const handleSaveRoomPrice = () => {
    let listRoomPriceIndex = [];
    let listRoomPriceDate = [];
    checkedStateAlterApply.map((c, index) => {
      if (c) {
        listRoomPriceIndex.push(index + 1);
      }
    });
    day.map((d, index) => {
      const currentIndexCheck = listRoomPriceIndex.find((i) => i === index + 1);
      if (currentIndexCheck) {
        listRoomPriceDate.push(moment(d).format("DD/MM/yyyy"));
      }
    });
    //date add - price - max-booking-room -roomTypeid;
    if (listRoomPriceDate.length > 0) {
      const finalRoomPriceByDate = listRoomPriceDate.map((d) => {
        return {
          id: 0,
          price: Number(price),
          date: d,
          maxBookingRoom: currentRoom().maxBookingRoom,
          roomType_Id: currentRoom().id,
        };
      });

      if (finalRoomPriceByDate.length > 0) {
        finalRoomPriceByDate.map((finalRoom) => {
          dispatch(action.setRoomPrice.setRoomPriceRequest(finalRoom));
        });
      }
    }
  };

  const getPrice = () => {
    const room = currentRoom();
    let latestRoomPrice = currentRoom().defaultPrice;
    room.roomPrices?.map((roomPrice) => {
      const currentDate = day.find(
        (d) => moment(d).format("DD/MM/yyyy") === roomPrice.date
      );
      if (currentDate) {
        latestRoomPrice = roomPrice.price;
      }
    });

    return latestRoomPrice;
  };

  return (
    <div className="container">
      <div className="d-flex subContainer">
        <div className="col-2">
          <p>Từ Ngày:</p>
          <input
            type="date"
            ref={dateCheckIn}
            min={minDate}
            defaultValue={minDate}
            onChange={handleOnChangeDate}
            required
          />
        </div>
        <div className="col-2">
          <p>Đến Ngày:</p>
          <input
            type="date"
            ref={dateCheckOut}
            min={maxDate}
            max={maxDate}
            defaultValue={maxDate}
            required
          />
        </div>
        <div className="col-6">
          <p>Loại Phòng:</p>
          {renderRoomTypeDropdown()}
        </div>
        <div className="col-1 button-container">
          <p className="invisible">action</p>
          <button className="button" onClick={handleView}>
            Xem
          </button>
        </div>
      </div>
      <div className="d-flex subContainer2">
        {renderDay()}
        <div className="col-6 setRoomPrice">
          <div className="d-flex align-items-base-line">
            <p className="setPriceLabel">Giá Phòng</p>
            <input type="text" ref={priceRef} className="w-50" />
          </div>
          <div className="d-flex applyPrice">
            <p>Áp giá</p>
            <input type="checkbox" ref={applyPriceRef} />
          </div>
        </div>
      </div>
      <div className="d-flex subContainer3">
        <div className="button-container">
          <button className="button" onClick={handleApply}>
            Áp Dụng
          </button>
        </div>
        <div className="button-container">
          <button className="button" onClick={handleSaveRoomPrice}>
            Lưu
          </button>
        </div>
      </div>
      {applyPrice && (
        <div className="d-flex subContainer4">
          {day.length > 0 && (
            <>
              <div className="roomTypeTable ">
                <div className="titleRoomTypeTable"></div>
                <div className="contentRoomTypeTable">{currentRoom().code}</div>
                <div className="contentRoomTypeTable">
                  {"(" + currentRoom().numOfRoom + " phòng" + ")"}
                </div>
              </div>
              <div className="roomTypeTableRight col-10 ">
                <div className=" d-flex rightContent ">
                  {day.map((d, i) => {
                    return (
                      <div className="d-block dayContainer" key={i}>
                        <div className="titleShortKey">
                          {dayConvert[i].shortKey}
                        </div>
                        <div>{moment(d).format("DD/MM/yyyy")}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex subDayContainer">
                  {checkedStateAlterApply.map((check, i) => {
                    return (
                      <div className="d-block tablePriceContent" key={i}>
                        <div className="text-center">
                          {check
                            ? formatPrice(Number(price), "vi-VN", "VND")
                            : formatPrice(getPrice(), "vi-VN", "VND")}
                        </div>
                        <div>
                          <span>Số lượng có thể book: </span>
                          {Number(currentRoom().maxBookingRoom)}
                        </div>
                        <div>
                          <span> Hiện tại đã được book: </span>
                          {Number(currentRoom().numOfRoom) -
                            Number(currentRoom().maxBookingRoom)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SetUpRoomByDateContainer;
