import React from 'react';
import GoogleLogin from 'react-google-login';
import { Button } from 'react-bootstrap';

import GoogleIcon from '../asset/image/google.svg';

const HomeNotLogin = ({ responseGoogle }) => {
  return (
    <div className='home-logout'>
      <div className='logout'>
        <h1 className='display-1 font-weight-bold'>Food Home</h1>
        <GoogleLogin
          clientId='542995313089-g7eqsir9e4j11v493pcdrghtrfik18at.apps.googleusercontent.com'
          render={(renderProps) => (
            <Button
              disabled={renderProps.disabled}
              onClick={renderProps.onClick}
              variant='light'
            >
              <img src={GoogleIcon} alt='Google Login' />
              Login with Google
            </Button>
          )}
          buttonText='Login with Google'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
};

export default HomeNotLogin;
