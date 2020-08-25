import axios from 'axios';

export const getRestaurant = (start, count) => {
  return axios({
    method: 'GET',
    url: `https://developers.zomato.com/api/v2.1/search?start=${start}&count=${count}`,
    headers: {
      'user-key': '9c294a57d4d5ac7293f779780df6e0c5',
      'content-type': 'application/json',
    },
  });
};

export const getFilterRestaurant = (categories, cuisine, establishment) => {
  let queryCategories = categories.join();
  let queryCuisine = cuisine.join();
  let queryEstablishment = establishment.join();
  let queryString = '';
  if (
    queryCategories !== '' &&
    queryCuisine !== '' &&
    queryEstablishment !== ''
  ) {
    queryString = 'cuisines='.concat(
      queryCuisine,
      '&establishment_type=',
      queryEstablishment,
      '&category=',
      queryCategories
    );
  } else if (
    queryCategories !== '' &&
    queryCuisine !== '' &&
    queryEstablishment === ''
  ) {
    queryString = 'cuisines='.concat(
      queryCuisine,
      '&category=',
      queryCategories
    );
  } else if (
    queryCategories === '' &&
    queryCuisine !== '' &&
    queryEstablishment !== ''
  ) {
    queryString = 'cuisines='.concat(
      queryCuisine,
      '&establishment_type=',
      queryEstablishment
    );
  } else if (
    queryCategories !== '' &&
    queryCuisine === '' &&
    queryEstablishment !== ''
  ) {
    queryString = 'establishment_type='.concat(
      queryEstablishment,
      '&category=',
      queryCategories
    );
  } else if (queryCuisine !== '') {
    queryString = 'cuisines='.concat(queryCuisine);
  } else if (queryEstablishment !== '') {
    queryString = 'establishment_type='.concat(queryEstablishment);
  } else if (queryCategories !== '') {
    queryString = 'category='.concat(queryCategories);
  }

  return axios({
    method: 'GET',
    url: `https://developers.zomato.com/api/v2.1/search?${queryString}`,
    headers: {
      'user-key': '9c294a57d4d5ac7293f779780df6e0c5',
      'content-type': 'application/json',
    },
  });
};

export const getFilterType = (filterType) => {
  let dataUrl = '';
  if (filterType === 'categories') {
    dataUrl = `https://developers.zomato.com/api/v2.1/${filterType}`;
  } else {
    dataUrl = `https://developers.zomato.com/api/v2.1/${filterType}?city_id=25`;
  }
  return axios({
    method: 'GET',
    url: dataUrl,
    headers: {
      'user-key': '9c294a57d4d5ac7293f779780df6e0c5',
      'content-type': 'application/json',
    },
  });
};
