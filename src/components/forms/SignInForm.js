import React, { useState } from 'react';

import TextField from "./fields/TextField"
import BigButton from "../buttons/BigButton";
import { FIELD_TYPES, ICONS, THEMES } from "../../constants";
import API from "../../adapters/API"

const SignInForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    setServerError(null);
    API.signIn({email, password})
      .then(setTokenAndRedirect)
      .catch(handleError);
  }

  const setTokenAndRedirect = data => {
    if (data.errors) {
      setServerErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);
      //Placeholder for redirect
    }
  }

  const handleError = error => {
    if (error instanceof ServerError) {
      setServerError(error.details);
    } else {
      console.error(error);
    }
  }

  return(
    <form className="sign-in" onSubmit={handleSubmit}>
      { serverError && <ErrorBanner icon={ICONS.DARK.CLOUD_OFF} details={serverError} /> }
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