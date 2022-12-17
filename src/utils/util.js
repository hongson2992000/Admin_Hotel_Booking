/* eslint-disable array-callback-return */
import moment from "moment";
import { VIET_NAM_TIME } from "./constants/settingSystem";

export const formatPrice = (price, countryCode, currency) => {
  return price.toLocaleString(countryCode, {
    style: "currency",
    currency: currency,
  });
};

export function isMonday(date) {
  return date.getDay() === 1;
}

export function getDayInRange(startDate, endDate) {
  let day = [];
  for (
    var d = new Date(startDate);
    d <= new Date(endDate);
    d.setDate(d.getDate() + 1)
  ) {
    day.push(new Date(d));
  }

  return day;
}

export function convertDayToVietNamTime(day) {
  let dayConvert = [];
  day.map((d) => {
    const mapDateVietNam = VIET_NAM_TIME.find((c) => c.code === d.getDay());
    dayConvert.push(mapDateVietNam);
  });

  return dayConvert;
}

export function isNumber(str) {
  if (str.match("[0-9]+")) return true;
  return false;
}

export function getFirstDateAndLastDateOfCurrentMonth() {
  var date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  return {
    firstDay: moment(firstDay).format("DD/MM/yyyy"),
    lastDay: moment(lastDay).format("DD/MM/yyyy"),
  };
}

export const convertDateDBIntoDateJS = (date) => {
  var parts = date.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function removeDuplicateInArray(arr) {
  var newArr = [];
  arr.map((element) => {
    if (newArr.length === 0) {
      newArr.push(element);
    } else {
      const duplicateElement = newArr.findIndex((x) => x.date === element.date);
      if (duplicateElement !== -1) {
        newArr[duplicateElement].totalPrice += Number(element.totalPrice);
      } else {
        newArr.push(element);
      }
    }
  });

  return newArr;
}
