import {
  getType,
  getNews,
  filInfoNews,
  createNews,
  updateNews,
  // createNews,
  // updateNews,
  deleteNews,
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
      let newsCreateNews = [...state.arrNews];
      newsCreateNews.push(action.payload);
      state.arrNews = newsCreateNews;
      return {
        ...state,
      };
    case getType(createNews.createNewsFailure):
      return {
        ...state,
      };
    case getType(updateNews.updateNewsSuccess):
      let arrUpdateNews = [...state.arrNews];
      let indexUpdate = arrUpdateNews.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexUpdate !== -1) {
        arrUpdateNews[indexUpdate] = action.payload;
      }
      state.arrNews = arrUpdateNews;
      return {
        ...state,
      };
    case getType(updateNews.updateNewsFailure):
      return {
        ...state,
      };
    case getType(deleteNews.deleteNewsSuccess):
      let arrDeleteNews = [...state.arrNews];
      let indexDelete = arrDeleteNews.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexDelete !== -1) {
        arrDeleteNews[indexDelete] = action.payload;
      }
      state.arrNews = arrDeleteNews;
      return {
        ...state

      };
    case getType(deleteNews.deleteNewsFailure):
      return {
        ...state,
      };
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
