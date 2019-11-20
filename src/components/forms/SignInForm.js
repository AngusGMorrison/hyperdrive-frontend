import React, { useState } from 'react';

import TextField from './fields/TextField'
import BigButton from '../buttons/BigButton';
import Banner from '../banners/Banner'
import { BANNER_TYPES, FIELD_TYPES, ICONS, THEMES } from '../../constants';
import API from '../../adapters/API';
import { ServerError } from '../../errors/errors';

const SignInForm = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors]=  useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    setServerError(null);
    API.signIn({email, password})
      .then(setTokenAndRedirect)
      .catch(handleHttpError);
  }

  const setTokenAndRedirect = data => {
    if (data.errors) {
      setFormErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);
      props.setLoggedIn(true);
    }
  }

  const handleHttpError = error => {
    if (error instanceof ServerError) {
      setServerError(error.details);
    } else {
      console.error(error);
    }
  }

  return(
    <form className="sign-in" onSubmit={handleSubmit}>
      { serverError && <Banner type={BANNER_TYPES.ERROR} icon={ICONS.DARK.CLOUD_OFF} content={serverError} /> }
      <TextField
        theme={THEMES.BLUE}
        icon={ICONS.BLUE.MAIL}
        placeholder="Email"
        value={email}
        handleChange={setEmail}
      />
      <TextField
        type={FIELD_TYPES.PASSWORD}
        theme={THEMES.BLUE}
        icon={ICONS.BLUE.KEY}
        placeholder="Password"
        value={password}
        handleChange={setPassword}
      />
      <BigButton 
        theme={THEMES.BLUE}
        icon={ICONS.DARK.THUMBS_UP}
        text={"Sign in"}
      />
    </form>
  );
}

export default SignInForm;