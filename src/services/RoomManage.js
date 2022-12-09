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
  getRoomAvailability = (model) => {
    return this.post(`v1/room/checkAvaiblebilityAndType`, model);
  };
  getBookingCheckInByRoomId = () => {
    return this.get(`v1/room/getRoomCheckInToday`);
  };
  getRoomTypeByRoomId = (id) => {
    return this.get(`v1/roomType/getRoomTypeByRoom?room_id=${id}`);
  };
}
export const roomManage = new RoomManage();
