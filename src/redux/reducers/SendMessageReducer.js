import { getType, sendMessage,fillFormSendMessage } from "../actions/SendMessageAction";

const initialState = {
  arrMessage: [],
  bookingIdToSend: 0,
};
export default function SendMessageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(sendMessage.sendMessageRequest):
      return {
        ...state,
      };
    case getType(sendMessage.sendMessageSuccess):
      return {
        ...state,
        arrMessage: action.payload,
      };
    case getType(sendMessage.sendMessageFailure):
      return {
        ...state,
      };
      case getType(fillFormSendMessage.fillFormSendMessageRequest):
      return {
        ...state,
        bookingIdToSend: action.payload,
      };

    default:
      return state;
  }
}
