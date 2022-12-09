import {
  getTurnDownService,
  confirmRequestService,
  getRequestService,
  getRequestServiceById,
  getType,
  cancelRequestServiceDetailById,
  confirmTurnDownService,
  getRequestServiceByBookingId,
  getTurnDownServiceByBookingId,
} from "../actions/RequestServiceManageAction";

const initialState = {
  arrRequestService: [],
  arrRequestServiceInRoom: [],
  requestServiceItem: {},
  // bookingItem: {},
  // userInfoBooking: [],
  arrTurnDownService: [],
  turnDownServiceInRoom: [],
};
export default function RequestServiceReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getRequestService.getRequestServiceRequest):
      return {
        ...state,
      };
    case getType(getRequestService.getRequestServiceSuccess):
      let listRequestServiceNew = [];
      listRequestServiceNew = action.payload;
      state.arrRequestService = listRequestServiceNew;
      return {
        ...state,
        arrRequestService: action.payload,
      };
    case getType(getRequestService.getRequestServiceFailure):
      return {
        ...state,
      };
    case getType(getRequestServiceById.getRequestServiceByIdRequest):
      return {
        ...state,
        requestServiceItem: action.payload,
      };
    case getType(confirmRequestService.confirmRequestServiceRequest):
      return {
        ...state,
      };
    case getType(confirmRequestService.confirmRequestServiceSuccess):
      state.requestServiceItem = action.payload;
      // state.arrRequestService = [];
      return {
        ...state,
      };
    case getType(confirmRequestService.confirmRequestServiceFailure):
      return {
        ...state,
      };
    case getType(
      cancelRequestServiceDetailById.cancelRequestServiceDetailByIdRequest
    ):
      return {
        ...state,
      };
    case getType(
      cancelRequestServiceDetailById.cancelRequestServiceDetailByIdSuccess
    ):
      return {
        ...state,
        requestServiceItem: action.payload,
      };
    case getType(
      cancelRequestServiceDetailById.cancelRequestServiceDetailByIdFailure
    ):
      return {
        ...state,
      };
    case getType(getTurnDownService.getTurnDownServiceRequest):
      return {
        ...state,
      };
    case getType(getTurnDownService.getTurnDownServiceSuccess):
      return {
        ...state,
        arrTurnDownService: action.payload,
      };
    case getType(getTurnDownService.getTurnDownServiceFailure):
      return {
        ...state,
      };
    case getType(confirmTurnDownService.confirmTurnDownServiceRequest):
      return {
        ...state,
      };
    case getType(confirmTurnDownService.confirmTurnDownServiceSuccess):
      return {
        ...state,
        arrTurnDownService: action.payload,
      };
    case getType(confirmTurnDownService.confirmTurnDownServiceFailure):
      return {
        ...state,
      };
    case getType(
      getRequestServiceByBookingId.getRequestServiceByBookingIdRequest
    ):
      return {
        ...state,
      };
    case getType(
      getRequestServiceByBookingId.getRequestServiceByBookingIdSuccess
    ):
      let arrRequestServiceNew = [];
      arrRequestServiceNew = action.payload;
      state.arrRequestServiceInRoom = arrRequestServiceNew;
      return {
        ...state,
      };
    case getType(
      getRequestServiceByBookingId.getRequestServiceByBookingIdFailure
    ):
      return {
        ...state,
      };
    case getType(
      getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdRequest
    ):
      return {
        ...state,
      };
    case getType(
      getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdSuccess
    ):
      let newTurnDownService = [];
      newTurnDownService = action.payload;
      state.turnDownServiceInRoom = newTurnDownService;
      return {
        ...state,
      };
    case getType(
      getTurnDownServiceByBookingId.getTurnDownServiceByBookingIdFailure
    ):
      return {
        ...state,
      };
    default:
      return state;
  }
}
