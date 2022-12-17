import { BaseServices } from "./BaseService";

class RoomManage extends BaseServices {
  getAllRoom = () => {
    return this.get(`v1/rooms`);
  };
  getRoomById = (id) => {
    return this.get(`v1/room/${id}`);
  };
  getRoomByBookingId = (id) => {
    return this.get(`v1/room/getRoomWithBookingId?booking_id=${id}`);
  };
  getRoomByOrderId = (id) => {
    return this.get(`v1/room/getRoomWithOrderId?order_id=${id}`);
  };
  getRoomAvailability = (model) => {
    return this.post(`v1/room/checkAvaiblebilityAndType`, model);
  };
  getBookingCheckInByRoomId = () => {
    return this.get(`v1/room/getRoomCheckInToday`);
  };
  getRoomTypeByRoomId = (id) => {
    return this.get(`v1/roomType/getRoomTypeByRoom?room_id=${id}`);
  };
  getAllRoomType = () => {
    return this.get(`v1/roomTypes`);
  };
  setRoomPriceByDate = (payload) => {
    return this.post(`v1/roomPrice/setRoomPriceByDate`, payload);
  };
  createRoom = (model) => {
    return this.post(`v1/room`, model);
  };
  updateRoom = (model) => {
    return this.put(`v1/room`, model);
  };
  deleteRoom = (id) => {
    return this.delete(`v1/room/${id}`);
  };
}
export const roomManage = new RoomManage();
