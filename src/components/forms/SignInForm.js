import React, { useState } from 'react';
import { FIELD_TYPES, ICONS, THEMES } from '../../constants';
import API from '../../adapters/API';

import TextField from './fields/TextField'
import BigButton from '../buttons/BigButton';

const SignInForm = props => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    props.resetErrors();
    API.signIn({email, password})
      .then(props.setTokenAndRedirect)
      .catch(props.handleHttpError);
  }

  return(
    <form className="sign-in" onSubmit={handleSubmit}>
      <TextField
        type={FIELD_TYPES.EMAIL}
        theme={THEMES.BLUE}
        icon={ICONS.MAIL}
        placeholder="Email"
        value={email}
        handleChange={setEmail}
      />
      <TextField
        type={FIELD_TYPES.PASSWORD}
        theme={THEMES.BLUE}
        icon={ICONS.KEY}
        placeholder="Password"
        value={password}
        handleChange={setPassword}
      />
      <BigButton 
        theme={THEMES.BLUE}
        icon={ICONS.THUMBS_UP.DARK}
        text={"Sign in"}
      />
    </form>
  );
}

export default SignInForm;