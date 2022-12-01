import { BaseServices } from "./BaseService";

class RoomManage extends BaseServices {
  getAllRoom = () => {
    return this.get(`v1/rooms`);
  };
  getRoomAvailability = (model) => {
    return this.post(`v1/room/checkAvaiblebilityAndType`, model);
  };
  getBookingCheckInByRoomId = (model) => {
    return this.post(`v1/room/getRoomCheckInToday`, model);
  };
}
export const roomManage = new RoomManage();
