import { BaseServices } from "./BaseService";

class InfomationHotelManage extends BaseServices {
  getInfomationHotelById = (id) => {
    return this.get(`v1/hotel/${id}`);
  };
}
export const infomationHotelManage = new InfomationHotelManage();
