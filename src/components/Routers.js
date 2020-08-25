import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import HomeLogin from './HomeLogin';
import Error from './Error';

const Routers = () => {
  return (
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/dashboard' component={HomeLogin} />
      <Route component={Error} />
    </Switch>
  );
};

export default Routers;
