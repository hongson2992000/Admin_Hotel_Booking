import { BaseServices } from "./BaseService";

class CustomerManage extends BaseServices {
  getAllPrimaryCustomer = () => {
    return this.get(`v1/customer/getAllPrimaryCustomer`);
  };
  getPrimaryCustomerByBookingId = (id) => {
    return this.get(`v1/customer/getPrimaryCustomerByBookingId?booking_id=${id}`);
  };
  getAllCustomerByBookingId = (id) => {
    return this.get(`v1/customer/getAllCustomerByBookingId?booking_id=${id}`);
  };
}
export const customerManage = new CustomerManage();
