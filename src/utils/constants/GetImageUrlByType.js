import { IMAGE } from "./settingSystem";

const getImageUrlByType = (type) => {
  let listImage = JSON.parse(localStorage.getItem(IMAGE));
  return listImage.find((itemImg) => itemImg.pictureType === type);
};
export default getImageUrlByType