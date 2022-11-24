import { BaseServices } from "./BaseService";

class BookingManage extends BaseServices {
  getAllBooking = () => {
    return this.get(`v1/bookings`);
  };
//   createHotelService = (model) => {
//     return this.post(`v1/service`, model);
//   };
//   updateService = (model) => {
//     return this.put(`v1/service`, model);
//   };
//   deleteService = (id) => {
//     return this.delete(`v1/service/${id}`);
//   };
}
export const bookingManage = new BookingManage();
