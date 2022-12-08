import { BaseServices } from "./BaseService";

class CustomerManage extends BaseServices {
  getAllPrimaryCustomer = () => {
    return this.get(`v1/getAllPrimaryCustomer`);
  };
  getPrimaryCustomerByBookingId = (id) => {
    return this.get(`v1/getPrimaryCustomerByBookingId?booking_id=${id}`);
  };
  getAllCustomerByBookingId = (id) => {
    return this.get(`v1/getAllCustomerByBookingId?booking_id=${id}`);
  };
}
export const customerManage = new CustomerManage();
