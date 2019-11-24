import React, { useState } from 'react';
import { BANNER_TYPES, HOMEPAGE_FORMS, ICONS } from '../constants.js';
import { ServerError } from '../errors/errors';
import ERROR_HANDLERS from '../errors/errorHandlers';
import ERROR_DETAILS from '../errors/errorDetails';

import BinarySelector from '../components/selectors/BinarySelector';
import Banner from '../components/banners/Banner'
import SignInForm from '../components/forms/SignInForm';
import RegistrationForm from '../components/forms/RegistrationForm';

const HomepageFormContainer = props => {

  const [formToDisplay, setFormToDisplay] = useState(HOMEPAGE_FORMS.SIGN_IN);
  const [serverError, setServerError] = useState(null);

  const handleFormChange = formToDisplay => {
    resetErrors();
    setFormToDisplay(formToDisplay);
  }

  const resetErrors = () => {
    setServerError(null);
  }

  const setTokenAndRedirect = data => {
    localStorage.setItem('token', data.token);
    props.setLoggedIn(true);
  }

  const handleServerError = error => {
    switch (error.code) {
      case 400:
        handleBadRequest(error);
        break;
      case 403:
        setServerError(ERROR_DETAILS.INVALID_USER);
        break;
      case 500 || 404:
        setServerError(ERROR_DETAILS.GENERIC);
        break;
      default:
        console.error(error);
    }
  }

  const handleBadRequest = error => {
    if (emailIsTaken(error)) {
      setServerError(ERROR_DETAILS.EMAIL_IN_USE);
    } else {
      setServerError(ERROR_DETAILS.BAD_REQUEST);
    }
  }

  const emailIsTaken = error => {
    const emailErrors = error.details.email;
    return emailErrors && emailErrors.find(message => message === 409);
  }

  const formProps = {
    loggedIn: props.loggedIn,
    setLoggedIn: props.setLoggedIn,
    setTokenAndRedirect: setTokenAndRedirect,
    serverErrorHandler: handleServerError,
    resetErrors: resetErrors
  }

  return(
    <div>
      <BinarySelector
        heading={"Welcome to Hyperdrive"}
        icon={ICONS.SORT.YELLOW}
        selectedOption={formToDisplay}
        option1={HOMEPAGE_FORMS.REGISTER}
        option2={HOMEPAGE_FORMS.SIGN_IN}
        handleClick={handleFormChange}
      />
      {
        serverError &&
        <Banner
          type={BANNER_TYPES.ERROR}
          icon={ICONS.CLOUD_OFF.DARK}
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