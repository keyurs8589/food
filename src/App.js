import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Routers from './components/Routers';

require('dotenv').config();
const App = () => {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
};

export default App;
