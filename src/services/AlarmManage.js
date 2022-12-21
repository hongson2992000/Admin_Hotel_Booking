import { BaseServices } from "./BaseService";

class AlarmManage extends BaseServices {
  getAllRoomNotEmpty = () => {
    return this.get(`v1/rooms`);
  };
  createNewAlarm = (model) => {
    return this.post(`v1/roomAlarm`, model);
  };
  updateAlarm = (model) => {
    return this.put(`v1/roomAlarm`, model);
  };
  deleteAlarm = (id) => {
    return this.delete(`v1/roomAlarm/${id}`);
  };
  getRoomAlarmByBookingId = (id) => {
    return this.get(`v1/roomAlarmByBooking?booking_Id=${id}`);
  };
}
export const alarmManage = new AlarmManage();
