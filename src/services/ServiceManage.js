import { BaseServices } from "./BaseService";

class ServiceManage extends BaseServices {
  getAllHotelService = () => {
    return this.get(`v1/services`);
  };
  createHotelService = (model) => {
    return this.post(`v1/service`, model);
  };
}
export const serviceManage = new ServiceManage();
