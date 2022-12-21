import { BaseServices } from "./BaseService";

class BookingManage extends BaseServices {
  getAllBooking = () => {
    return this.get(`v1/bookings`);
  };
  getBookingByRoomId = (id) => {
    return this.get(`v1/booking/bookingByRoomId?room_id=${id}`);
  };
  getBookingByCustomerId = (id) => {
    return this.get(`v1/booking/bookingByCustomerId?customer_id=${id}`);
  };
  checkInRoom = (model) => {
    return this.post(`v1/booking/checkIn`, model);
  };
  checkOutRoom = (model) => {
    return this.post(`v1/booking/checkOut`, model);
  };
  getDashBoard = (payload) => {
    return this.get(
      `v1/booking/dashboardBetween?startDate=${payload.startDate}&endDate=${payload.endDate}`
    );
  };
  getRevenueDashBoard = (payload) => {
    console.log(
      "dash-board: ",
      `v1/booking/revenuesEntire?dateEnd=${payload.endDate}&dateStart=${payload.startDate}`
    );
    return this.get(
      `v1/booking/revenuesEntire?dateEnd=${payload.endDate}&dateStart=${payload.startDate}`
    );
  };
  getRevenueCancelDashBoard = (payload) => {
    return this.get(
      `v1/booking/revenuesCancelEntire?dateEnd=${payload.endDate}&dateStart=${payload.startDate}`
    );
  };
  checkInRoomInHotel = (model) => {
    return this.post(`v1/booking/checkInAtHotel`, model);
  };
  cancelBooking = (id) => {
    return this.post(`v1/booking/cancleBooking?booking_id=${id}`);
  };
}
export const bookingManage = new BookingManage();
