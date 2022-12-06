import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getNews = createActions({
    getNewsRequest: undefined,
    getNewsSuccess: (payload) => payload,
    getNewsFailure: (err) => err,
});
export const createNews = createActions({
    createNewsRequest: (payload) => payload,
    createNewsSuccess: (payload) => payload,
    createNewsFailure: (err) => err,
});
export const updateNews = createActions({
    updateNewsRequest: (payload) => payload,
    updateNewsSuccess: (payload) => payload,
    updateNewsFailure: (err) => err,
});

export const deleteNews = createActions({
    deleteNewsRequest: (payload) => payload,
    deleteNewsSuccess: (payload) => payload,
    deleteNewsFailure: (err) => err,
});

export const filInfoNews = createActions({
    filInfoNewsRequest: (payload) => payload,
});