export const bookingManageState$ = (state) =>
  state.BookingManageReducer.arrBooking;
export const bookingItemState$ = (state) =>
  state.BookingManageReducer.bookingItem;
export const infoUserBookingState$ = (state) =>
  state.BookingManageReducer.userInfoBooking;

export const getDashBoardState$ = (state) =>
  state.BookingManageReducer.dashboard;

  export const infoUserUpdateFormState$ = (state) =>
  state.BookingManageReducer.userFormUpdate;