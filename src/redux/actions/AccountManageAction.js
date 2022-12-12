import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};
export const getAccount = createActions({
    getAccountRequest: undefined,
    getAccountSuccess: (payload) => payload,
    getAccountFailure: (err) => err,
});
export const createAccount = createActions({
    createAccountRequest: (payload) => payload,
    createAccountSuccess: (payload) => payload,
    createAccountFailure: (err) => err,
});
export const updateAccount = createActions({
    updateAccountRequest: (payload) => payload,
    updateAccountSuccess: (payload) => payload,
    updateAccountFailure: (err) => err,
});

export const deleteAccount = createActions({
    deleteAccountRequest: (payload) => payload,
    deleteAccountSuccess: (payload) => payload,
    deleteAccountFailure: (err) => err,
});

export const filInfoAccount = createActions({
    filInfoAccountRequest: (payload) => payload,
});