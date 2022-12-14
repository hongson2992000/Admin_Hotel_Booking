import {
  getType,
  getNews,
  filInfoNews,
  createNews,
  // createNews,
  // updateNews,
  // deleteNews,
} from "../actions/NewsManageAction";

const initialState = {
  arrNews: [],
  newsItem: {},
};
export default function NewsManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getNews.getNewsRequest):
      return {
        ...state,
      };
    case getType(getNews.getNewsSuccess):
      return {
        ...state,
        arrNews: action.payload,
      };

    case getType(getNews.getNewsFailure):
      return {
        ...state,
      };
    case getType(createNews.createNewsSuccess):
      let newsCreate = [];
      newsCreate = action.payload;
      state.arrNews = newsCreate;
      return {
        ...state,
      };
    case getType(createNews.createNewsFailure):
      return {
        ...state,
      };
    // case getType(updateLocation.updateLocationSuccess):
    //   return {
    //     ...state,
    //     arrLocation: action.payload,
    //   };
    // case getType(updateLocation.updateLocationFailure):
    //   return {
    //     ...state,
    //   };
    // case getType(deleteLocation.deleteLocationSuccess):
    //   return {
    //     ...state,
    //     arrLocation: action.payload,
    //   };
    // case getType(deleteLocation.deleteLocationFailure):
    //   return {
    //     ...state,
    //   };
    case getType(filInfoNews.filInfoNewsRequest):
      let newsItemUpdate = {};
      newsItemUpdate = action.payload;
      state.newsItem = newsItemUpdate;
      return {
        ...state,
      };
    default:
      return state;
  }
}
