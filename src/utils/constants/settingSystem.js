export const DOMAIN = "https://hotelservice-v5.herokuapp.com/api";
// export const DOMAIN = "http://localhost:8080/api";
export const TOKEN = "access_token";
export const USER_LOGIN = "USER_LOGIN";
export const IMAGE = "IMAGE";
export const INFO_BOOKING_DETAIL = "INFO_BOOKING_DETAIL";
export const CHECKIN = "CHECK IN";
export const CHECKOUT = "CHECK OUT";
export const BOOKED = "BOOKED";
export const PROCESSING = "PROCESSING";
export const DONE = "DONE";
export const STATUS_CODE = {
  SUCCESS: 200,
};
export const DISPLAY_LOADING = "DISPLAY_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";

export const DISPLAY_POPUP_SUCCESS = "DISPLAY_POPUP_SUCCESS";
export const HIDE_POPUP_SUCCESS = "HIDE_POPUP_SUCCESS";

export const USER_ROLE = {
  ADMIN: "ROLE_ADMIN",
  HOTEL_MANAGE: "ROLE_MANAGER",
  RECEPTIONIST: "ROLE_RECEPTIONIST",
  STAFF: "ROLE_STAFF",
  HOUSEKEEPING: "ROLE_HOUSEKEEPING",
  RESTAURANT: "ROLE_RESTAURANT",
};

export const PHONE_VALID =
  "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$";

export const VIET_NAM_TIME = [
  {
    code: 1,
    name: "Thứ Hai",
    shortKey: "T2",
  },
  {
    code: 2,
    name: "Thứ Ba",
    shortKey: "T3",
  },
  {
    code: 3,
    name: "Thứ Tư",
    shortKey: "T4",
  },
  {
    code: 4,
    name: "Thứ Năm",
    shortKey: "T5",
  },
  {
    code: 5,
    name: "Thứ Sáu",
    shortKey: "T6",
  },
  {
    code: 6,
    name: "Thứ Bảy",
    shortKey: "T7",
  },
  {
    code: 0,
    name: "Chủ Nhật",
    shortKey: "CN",
  },
];
