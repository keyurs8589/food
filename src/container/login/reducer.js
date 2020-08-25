import {
  LOG_IN,
  LOG_OUT,
  FETCH_DATA,
  FILTER_FETCH_DATA,
  FILTER_CLEAR,
} from './type';

const initialState = {
  loggedIn: false,
  name: '',
  imageUrl: '',
  restaurantData: [],
  filterRestaurantData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
        name: action.payload.name,
        imageUrl: action.payload.imageUrl,
      };
    case LOG_OUT:
      return {
        loggedIn: false,
        name: '',
        imageUrl: '',
        restaurantData: [],
      };
    case FETCH_DATA:
      return {
        ...state,
        restaurantData: action.payload,
      };
    case FILTER_FETCH_DATA:
      return {
        ...state,
        filterRestaurantData: action.payload,
      };
    case FILTER_CLEAR:
      return {
        ...state,
        filterRestaurantData: [],
      };
    default:
      return state;
  }
};

export default reducer;
