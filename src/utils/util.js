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
