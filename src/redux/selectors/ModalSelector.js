export const modalCreateServiceState$ = (state) => state.ModalReducer.isShow;

export const modalUpdateServiceState$ = (state) =>
  state.ModalReducer.isShowUpdate;
export const modalAddLocationState$ = (state) =>
  state.ModalReducer.isShowAddLocation;

export const modalUpdateLocationState$ = (state) =>
  state.ModalReducer.isShowUpdateLocation;
export const modalAddUserState$ = (state) =>
  state.ModalReducer.isShowAddNewUser;

export const modelCreateAccountState$ = (state) =>
  state.ModalReducer.isShowAddAccount;

export const modelUpdateAccountState$ = (state) =>
  state.ModalReducer.isShowUpdateAccount;
export const modalListServiceState$ = (state) =>
  state.ModalReducer.isShowListService;
export const modalSendMessageState$ = (state) =>
  state.ModalReducer.isShowSendMessage;
