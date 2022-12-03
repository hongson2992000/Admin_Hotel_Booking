import { BaseServices } from "./BaseService";

class RoomManage extends BaseServices {
  getAllRoom = () => {
    return this.get(`v1/rooms`);
  };
  getRoomAvailability = (model) => {
    return this.post(`v1/room/checkAvaiblebilityAndType`, model);
  };
  getBookingCheckInByRoomId = () => {
    return this.get(`v1/room/getRoomCheckInToday`);
  };
}
export const roomManage = new RoomManage();
