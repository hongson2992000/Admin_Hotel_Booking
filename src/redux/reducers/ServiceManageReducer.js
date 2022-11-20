import {
  getHotelService,
  getType,
  createNewHotelService,
} from "../actions/ServiceManageAction";

const initialState = {
  arrService: [],
};
export default function ServiceManageReducer(state = initialState, action) {
  switch (action.type) {
    case getType(getHotelService.getHotelServiceRequest):
      return {
        ...state,
      };
    case getType(getHotelService.getHotelServiceSuccess):
      // let arrNew = [...state.arrService];
      // console.log("Hello Son 1", action.payload)
      //  action.payload.forEach(item => {
      //   arrNew.push({
      //     id: item.id,
      //     name: item.name,
      //     type: item.serviceCategory.name,
      //     status: item.status,
      //     image: item.image[0].pictureUrl,
      //   });
      // })
      // console.log("Hello Son", arrNew)
      // state.arrService = arrNew;
      return {
        ...state,
        arrService: action.payload,
      };

    case getType(getHotelService.getHotelServiceFailure):
      return {
        ...state,
      };
    case getType(createNewHotelService.createHotelServiceSuccess):
      return {
        ...state,
        arrService: action.payload,
      };
    case getType(createNewHotelService.createHotelServiceFailure):
      return {
        ...state,
      };
    default:
      return state;
  }
}
