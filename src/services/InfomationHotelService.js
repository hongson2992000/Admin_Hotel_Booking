import { BaseServices } from "./BaseService";

class InfomationHotelManage extends BaseServices {
  getInfomationHotelById = (id) => {
    return this.get(`v1/hotel/${id}`);
  };
  updateInfomationHotelById = (model) => {
    return this.put(`v1/hotel/`, model);
  };
}
export const infomationHotelManage = new InfomationHotelManage();
