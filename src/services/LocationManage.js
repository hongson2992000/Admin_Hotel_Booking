import { BaseServices } from "./BaseService";

class ServiceManage extends BaseServices {
  getAllLocation = () => {
    return this.get(`v1/services`);
  };
}
export const serviceManage = new ServiceManage();
