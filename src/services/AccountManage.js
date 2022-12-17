import { BaseServices } from "./BaseService";

class AccountManage extends BaseServices {
  getAllAccount= () => {
    return this.get(`v1/users`);
  };
  createAccount = (model) => {
    return this.post(`v1/signup`, model);
  };
  updateAccount = (model) => {
    return this.put(`v1/abstraction`, model);
  };
  deleteAccount = (id) => {
    return this.delete(`v1/abstraction/${id}`);
  };
}
export const accountManage = new AccountManage();
