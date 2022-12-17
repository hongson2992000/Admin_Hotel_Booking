import axios from "axios";
import { DOMAIN, TOKEN } from "../utils/constants/settingSystem";

export class BaseServices {
  put = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: model,
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  postAuthor = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };

  delete = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      data: model,
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  get = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getAuthor = (url, model) => {
    console.log("Token", localStorage.getItem(TOKEN));
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  post = (url, model) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: model,
      // headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
