import { BaseServices } from "./BaseService";

class SetUpRoomManage extends BaseServices {
  getAllRoom = () => {
    return this.get(`v1/rooms`);
  };
  createNewRoom = (model) => {
    return this.post(`v1/room`, model);
  };
  updateRoom = (model) => {
    return this.put(`v1/room`, model);
  };
  deleteRoom = (id) => {
    return this.delete(`v1/room/${id}`);
  };
  //Roomtype
  getAllRoomtype = () => {
    return this.get(`v1/roomTypes`);
  };
    
}
export const setUpRoomManage = new SetUpRoomManage();
