import { BaseServices } from "./BaseService";

class NewsManage extends BaseServices {
  getAllNews = () => {
    return this.get(`v1/news`);
  };
  createNews = (model) => {
    return this.post(`v1/new`, model);
  };
  updateNews = (model) => {
    return this.put(`v1/abstraction`, model);
  };
  deleteNews = (id) => {
    return this.delete(`v1/abstraction/${id}`);
  };
}
export const newsManage = new NewsManage();
