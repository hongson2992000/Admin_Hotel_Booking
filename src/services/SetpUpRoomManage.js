import { BaseServices } from "./BaseService";

class SetUpRoomManage extends BaseServices {
  getAllRoom = () => {
    return this.get(`v1/rooms`);
  };
  createHotelService = (model) => {
    return this.post(`v1/service`, model);
  };
  updateService = (model) => {
    return this.put(`v1/service`, model);
  };
  deleteService = (id) => {
    return this.delete(`v1/service/${id}`);
  };
  //Roomtype
  getAllRoomtype = () => {
    return this.get(`v1/roomTypes`);
  };
}
export const setUpRoomManage = new SetUpRoomManage();
