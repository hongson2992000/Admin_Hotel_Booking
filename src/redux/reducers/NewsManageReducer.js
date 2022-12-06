import {
  getType,
  getNews,
  // createNews,
  // updateNews,
  // deleteNews,
} from "../actions/NewsManageAction";

const initialState = {
  arrNews: [],
  newsItem: {},
};
export default function ServiceManageReducer(state = initialState, action) {
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
    // case getType(createLocation.createLocationSuccess):
    //   return {
    //     ...state,
    //     arrLocation: action.payload,
    //   };
    // case getType(createLocation.createLocationFailure):
    //   return {
    //     ...state,
    //   };
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
    // case getType(filInfoLocation.filInfoLocationRequest):
    //   return {
    //     ...state,
    //     loactionItem: action.payload,
    //   };
    default:
      return state;
  }
}
