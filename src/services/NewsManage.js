import { BaseServices } from "./BaseService";

class NewsManage extends BaseServices {
  getAllNews = () => {
    return this.get(`v1/news`);
  };
  createNews = (model) => {
    return this.post(`v1/new`, model);
  };
  updateNews = (model) => {
    return this.put(`v1/new`, model);
  };
  deleteNews = (id) => {
    return this.delete(`v1/new/${id}`);
  };
}
export const newsManage = new NewsManage();
