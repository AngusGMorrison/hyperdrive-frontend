import React, { useState } from 'react';
import { BANNER_TYPES, HOMEPAGE_FORMS, ICONS } from '../constants.js';
import { ServerError } from '../errors/errors';

import BinarySelector from '../components/selectors/BinarySelector';
import Banner from '../components/banners/Banner'
import SignInForm from '../components/forms/SignInForm';
import RegistrationForm from '../components/forms/RegistrationForm';

const HomepageFormContainer = props => {

  const [formToDisplay, setFormToDisplay] = useState(HOMEPAGE_FORMS.SIGN_IN);
  const [serverError, setServerError] = useState(null);
  const [formErrors, setFormErrors] = useState([]);

  const handleFormChange = formToDisplay => {
    resetErrors();
    setFormToDisplay(formToDisplay);
  }

  const resetErrors = () => {
    setServerError(null);
    setFormErrors([]);
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

  const formProps = {
    loggedIn: props.loggedIn,
    setLoggedIn: props.setLoggedIn,
    setTokenAndRedirect: setTokenAndRedirect,
    handleHttpError: handleHttpError,
    resetErrors: resetErrors
  }

  return(
    <div>
      <BinarySelector
        heading={"Welcome to Hyperdrive"}
        icon={ICONS.YELLOW.SORT}
        selectedOption={formToDisplay}
        option1={HOMEPAGE_FORMS.REGISTER}
        option2={HOMEPAGE_FORMS.SIGN_IN}
        handleClick={handleFormChange}
      />
      {
        serverError &&
        <Banner
          type={BANNER_TYPES.ERROR}
          icon={ICONS.DARK.CLOUD_OFF}
          content={serverError}
        />
      }
      { 
        formToDisplay === HOMEPAGE_FORMS.SIGN_IN ?
        <SignInForm { ...formProps } /> :
        <RegistrationForm { ...formProps } />
      }
    </div>
  );
}

export default HomepageFormContainer;