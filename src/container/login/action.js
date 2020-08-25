import {
  LOG_IN,
  LOG_OUT,
  FETCH_DATA,
  FILTER_FETCH_DATA,
  FILTER_CLEAR,
} from './type';
import { getRestaurant, getFilterRestaurant } from '../../services/getRes.api';

export const loginAction = (name, imageUrl) => {
  return (dispatch) => {
    dispatch({ type: LOG_IN, payload: { name, imageUrl } });
  };
};

export const logoutAction = () => {
  return (dispatch) =>
    dispatch({
      type: LOG_OUT,
    });
};

export const fetchData = (start) => {
  let data = [];

  return (dispatch) => {
    getRestaurant(start, 10)
      .then((response) => {
        data = response.data.restaurants;
        dispatch({ type: FETCH_DATA, payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const filterFetchData = (categories, cuisine, establishment) => {
  let data = [];

  return (dispatch) => {
    getFilterRestaurant(categories, cuisine, establishment)
      .then((response) => {
        data = response.data.restaurants;
        dispatch({ type: FILTER_FETCH_DATA, payload: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const filterClear = () => {
  return (dispatch) => {
    dispatch({ type: FILTER_CLEAR });
  };
};
