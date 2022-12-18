import {
  getType,
  hideModal,
  showModal,
  showModalUpdate,
  hideModalUpdate,
  showModalAddUser,
  hideModalAddUser,
  showCreateAccountModel,
  hideCreateAccountModel,
  showUpdateAccountModel,
  hideUpdateAccountModel,
  showModalListService,
  hideModalListService,
  showModalSendMessage,
  hideModalSendMessage,
  showModalAddLocation,
  showModalUpdateLocation,
  hideModalAddLocation,
  hideModalUpdateLocation,
  showModalRequestService,
  hideModalRequestService,
  showModalTurnDown,
  hideModalTurnDown,
  showModalRequestServiceDetail,
  hideModalRequestServiceDetail,
  showModalRequestServiceManage,
  hideModalRequestServiceManage,
  showModalTurnDownManage,
  hideModalTurnDownManage,
  showModalUpdateUser,
  hideModalUpdateUser,
  showModalAddNews,
  hideModalAddNews,
  showModalUpdateNews,
  hideModalUpdateNews,
  showModalProfile,
  hideModalProfile,
  showModalError,
  hideModalError,
  showModalCheckOutError,
  hideModalCheckOutError,
  showModalCheckOutService,
  hideModalCheckOutService,
  showModalAddNewRoom,
  hideModalAddNewRoom,
} from "../actions/ModalAction";

const initialState = {
  isShow: false,
  isShowUpdate: false,
  isShowAddNewUser: false,
  isShowUpdateNewUser: false,
  isShowAddAccount: false,
  isShowUpdateAccount: false,
  isShowListService: false,
  isShowSendMessage: false,
  isShowAddLocation: false,
  isShowUpdateLocation: false,
  isShowRequestService: false,
  isShowRequestServiceManage: false,
  isShowRequestServiceDetail: false,
  isShowTurnDownService: false,
  isShowTurnDownServiceManage: false,
  isShowAddNews: false,
  isShowUpdateNews: false,
  isShowProfile: false,
  isShowError: false,
  isShowCheckOutErr: false,
  isShowCheckOutService: false,
  isShowAddNewRoom:false
};
export default function ModalReducer(state = initialState, action) {
  switch (action.type) {
    case getType(showModal):
      return {
        ...state,
        isShow: true,
      };

    case getType(hideModal):
      return {
        ...state,
        isShow: false,
      };
    case getType(showModalUpdate):
      return {
        ...state,
        isShowUpdate: true,
      };

    case getType(hideModalUpdate):
      return {
        ...state,
        isShowUpdate: false,
      };
    case getType(showModalAddUser):
      return {
        ...state,
        isShowAddNewUser: true,
      };

    case getType(hideModalAddUser):
      return {
        ...state,
        isShowAddNewUser: false,
      };
    case getType(showModalUpdateUser):
      return {
        ...state,
        isShowUpdateNewUser: true,
      };

    case getType(hideModalUpdateUser):
      return {
        ...state,
        isShowUpdateNewUser: false,
      };
    case getType(showCreateAccountModel):
      return {
        ...state,
        isShowAddAccount: true,
      };
    case getType(hideCreateAccountModel):
      return {
        ...state,
        isShowAddAccount: false,
      };
    case getType(showUpdateAccountModel):
      return {
        ...state,
        isShowUpdateAccount: true,
      };
    case getType(hideUpdateAccountModel):
      return {
        ...state,
        isShowUpdateAccount: false,
      };
    case getType(showModalListService):
      return {
        ...state,
        isShowListService: true,
      };

    case getType(hideModalListService):
      return {
        ...state,
        isShowListService: false,
      };
    case getType(showModalSendMessage):
      return {
        ...state,
        isShowSendMessage: true,
      };

    case getType(hideModalSendMessage):
      return {
        ...state,
        isShowSendMessage: false,
      };
    case getType(showModalAddLocation):
      return {
        ...state,
        isShowAddLocation: true,
      };

    case getType(hideModalAddLocation):
      return {
        ...state,
        isShowAddLocation: false,
      };
    case getType(showModalUpdateLocation):
      return {
        ...state,
        isShowUpdateLocation: true,
      };

    case getType(hideModalUpdateLocation):
      return {
        ...state,
        isShowUpdateLocation: false,
      };
    case getType(showModalRequestService):
      return {
        ...state,
        isShowRequestService: true,
      };

    case getType(hideModalRequestService):
      return {
        ...state,
        isShowRequestService: false,
      };
    case getType(showModalTurnDown):
      return {
        ...state,
        isShowTurnDownService: true,
      };

    case getType(hideModalTurnDown):
      return {
        ...state,
        isShowTurnDownService: false,
      };
    case getType(showModalRequestServiceDetail):
      return {
        ...state,
        isShowRequestServiceDetail: true,
      };

    case getType(hideModalRequestServiceDetail):
      return {
        ...state,
        isShowRequestServiceDetail: false,
      };
    case getType(showModalRequestServiceManage):
      return {
        ...state,
        isShowRequestServiceManage: true,
      };

    case getType(hideModalRequestServiceManage):
      return {
        ...state,
        isShowRequestServiceManage: false,
      };
    case getType(showModalTurnDownManage):
      return {
        ...state,
        isShowTurnDownServiceManage: true,
      };

    case getType(hideModalTurnDownManage):
      return {
        ...state,
        isShowTurnDownServiceManage: false,
      };
    case getType(showModalAddNews):
      return {
        ...state,
        isShowAddNews: true,
      };

    case getType(hideModalAddNews):
      return {
        ...state,
        isShowAddNews: false,
      };
    case getType(showModalUpdateNews):
      return {
        ...state,
        isShowUpdateNews: true,
      };

    case getType(hideModalUpdateNews):
      return {
        ...state,
        isShowUpdateNews: false,
      };
    case getType(showModalProfile):
      return {
        ...state,
        isShowProfile: true,
      };

    case getType(hideModalProfile):
      return {
        ...state,
        isShowProfile: false,
      };
    case getType(showModalError):
      return {
        ...state,
        isShowError: true,
      };

    case getType(hideModalError):
      return {
        ...state,
        isShowError: false,
      };

    case getType(showModalCheckOutError):
      return {
        ...state,
        isShowCheckOutErr: true,
      };

    case getType(hideModalCheckOutError):
      return {
        ...state,
        isShowCheckOutErr: false,
      };
    case getType(showModalCheckOutService):
      return {
        ...state,
        isShowCheckOutService: true,
      };

    case getType(hideModalCheckOutService):
      return {
        ...state,
        isShowCheckOutService: false,
      };
      case getType(showModalAddNewRoom):
      return {
        ...state,
        isShowAddNewRoom: true,
      };

    case getType(hideModalAddNewRoom):
      return {
        ...state,
        isShowAddNewRoom: false,
      };
    default:
      return state;
  }
}
