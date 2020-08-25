import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../container/login/action';
import { useHistory } from 'react-router-dom';

import '../style/home.scss';
import HomeNotLogin from './HomeNotLogin';

const Home = ({ loginAction }) => {
  let history = useHistory();
  const responseGoogle = (response) => {
    if (response && response.profileObj && response.profileObj.givenName) {
      loginAction(response.profileObj.givenName, response.profileObj.imageUrl);
      history.push('/dashboard');
    }
  };

  return (
    <div>
      <HomeNotLogin responseGoogle={responseGoogle} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (name, imageUrl) => dispatch(loginAction(name, imageUrl)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
