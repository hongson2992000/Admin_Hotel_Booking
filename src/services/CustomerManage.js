import { BaseServices } from "./BaseService";

class CustomerManage extends BaseServices {
  getAllPrimaryCustomer = () => {
    return this.get(`v1/getAllPrimaryCustomer`);
  };
}
export const customerManage = new CustomerManage();
