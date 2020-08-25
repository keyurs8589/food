import React, { useState, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  logoutAction,
  fetchData,
  filterFetchData,
  filterClear,
} from '../container/login/action';
import PageList from './PageList';
import RestaurantCard from './RestaurantCard';
import { getFilterType } from '../services/getRes.api';
import Filter from './Filter';

const HomeLogin = ({
  name,
  imageUrl,
  logoutAction,
  fetchData,
  restaurantData,
  filterFetchData,
  filterRestaurantData,
  filterClear,
}) => {
  let histry = useHistory();
  const [categories, setCategories] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [filterCuisine, setFilterCuisine] = useState([]);
  const [establishment, setEstablishment] = useState([]);
  const [filterEstablishment, setFilterEstablishment] = useState([]);

  useEffect(() => {
    name === '' && histry.push('/');
  }, [name, histry]);

  useEffect(() => {
    if (name !== '') {
      fetchData(1);
    }
  }, [name, fetchData]);

  useEffect(() => {
    if (name !== '') {
      getFilterType('categories')
        .then((res) => {
          res && res.data && setCategories(res.data.categories);
        })
        .catch((error) => console.log(error));
      getFilterType('cuisines')
        .then((res) => {
          res && res.data && setCuisine(res.data.cuisines);
        })
        .catch((error) => console.log(error));
      getFilterType('establishments')
        .then((res) => {
          res && res.data && setEstablishment(res.data.establishments);
        })
        .catch((error) => console.log(error));
    }
  }, [name]);

  useEffect(() => {
    if (
      filterCategories.length === 0 &&
      filterCuisine.length === 0 &&
      filterEstablishment.length === 0
    ) {
      filterClear();
    } else {
      filterFetchData(filterCategories, filterCuisine, filterEstablishment);
    }
  }, [
    filterCategories,
    filterCuisine,
    filterEstablishment,
    filterClear,
    filterFetchData,
  ]);

  const logout = () => {
    logoutAction();
    histry.push('/');
  };

  const pageChange = (event, value) => {
    fetchData((value - 1) * 10 + 1);
  };

  const filterCategoriesChanged = (event) => {
    if (
      !filterCategories.includes(event.target.value) &&
      event.target.checked
    ) {
      setFilterCategories([...filterCategories, event.target.value]);
    } else if (
      filterCategories.includes(event.target.value) &&
      !event.target.checked
    ) {
      setFilterCategories(
        filterCategories.filter((categor) => categor !== event.target.value)
      );
    }
  };

  const filterCuisineChanged = (event) => {
    if (!filterCuisine.includes(event.target.value) && event.target.checked) {
      setFilterCuisine([...filterCuisine, event.target.value]);
    } else if (
      filterCuisine.includes(event.target.value) &&
      !event.target.checked
    ) {
      setFilterCuisine(
        filterCuisine.filter((cuisin) => cuisin !== event.target.value)
      );
    }
  };

  const filterEstablishmentChanged = (event) => {
    if (
      !filterEstablishment.includes(event.target.value) &&
      event.target.checked
    ) {
      setFilterEstablishment([...filterEstablishment, event.target.value]);
    } else if (
      filterEstablishment.includes(event.target.value) &&
      !event.target.checked
    ) {
      setFilterEstablishment(
        filterEstablishment.filter(
          (establish) => establish !== event.target.value
        )
      );
    }
  };

  return (
    <div className='home-login'>
      <div className='login-header'>
        <h1 className='display-5 font-weight-bold m-2'>Food DashBoard</h1>
        <div className='login-user m-2'>
          <img src={imageUrl} alt='Profile' />
          <h3>{name}</h3>
          <GoogleLogout
            clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={logout}
          ></GoogleLogout>
        </div>
      </div>
      <div className='pagination mt-5'>
        {filterRestaurantData && filterRestaurantData.length === 0 && (
          <PageList pageCount={8} pageChange={pageChange} />
        )}
      </div>
      <div className='container-fluid login-main mt-5 row'>
        <div className='filter col-sm-2 px-0'>
          <h2 className='filter-text '>filter</h2>
          <div className='all-filter'>
            <Filter
              filterHead={'category'}
              filterData={categories}
              filterChanged={filterCategoriesChanged}
              selectedDataLength={filterCategories.length}
            />
            <Filter
              filterHead={'cuisine'}
              filterData={cuisine}
              filterChanged={filterCuisineChanged}
              selectedDataLength={filterCuisine.length}
            />
            <Filter
              filterHead={'establishment'}
              filterData={establishment}
              filterChanged={filterEstablishmentChanged}
              selectedDataLength={filterEstablishment.length}
            />
          </div>
        </div>
        <div className='restaurant-list col-sm-10'>
          {filterRestaurantData &&
          filterRestaurantData.length === 0 &&
          restaurantData
            ? restaurantData.map((res, index) => (
                <div key={index}>
                  <RestaurantCard res={res} />
                </div>
              ))
            : filterRestaurantData
            ? filterRestaurantData.map((res, index) => (
                <div key={index}>
                  <RestaurantCard res={res} />
                </div>
              ))
            : 'Something Went Wrong'}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.name,
    imageUrl: state.imageUrl,
    restaurantData: state.restaurantData,
    filterRestaurantData: state.filterRestaurantData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => dispatch(logoutAction()),
    fetchData: (start) => dispatch(fetchData(start)),
    filterFetchData: (
      selectedCategories,
      selectedCuisine,
      selectedEstablishment
    ) =>
      dispatch(
        filterFetchData(
          selectedCategories,
          selectedCuisine,
          selectedEstablishment
        )
      ),
    filterClear: () => dispatch(filterClear()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLogin);
