import { BaseServices } from "./BaseService";

class ImageManage extends BaseServices {
  getAllImage = () => {
    return this.get(`v1/image/getImageByImageTypeContain?type=img`);
  };
}
export const imageManage = new ImageManage();
