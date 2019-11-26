import React, { useState } from 'react';
import { BANNER_TYPES, ICONS } from '../constants.js';
import ERROR_DETAILS from '../errors/errorDetails';

import BinarySelector from '../components/menus/BinarySelector';
import Banner from '../components/banners/Banner'
import SignInForm from '../components/forms/SignInForm';
import RegistrationForm from '../components/forms/RegistrationForm';

const HomepageFormContainer = props => {

  const FORMS = {
    SIGN_IN: 'sign in',
    REGISTER: 'register'
  }

  const [formToDisplay, setFormToDisplay] = useState(FORMS.SIGN_IN);

  const handleFormChange = formToDisplay => {
    props.setServerError(null);
    setFormToDisplay(formToDisplay);
  }

  const resetErrorsAndLogin = responseData => {
    props.setServerError(null);
    props.logIn(responseData.token);
  }

  const handleServerError = error => {
    switch (error.code) {
      case 400:
        handleBadRequest(error);
        break;
      case 403:
        props.setServerError(ERROR_DETAILS.INVALID_USER);
        break;
      case 500 || 404:
        props.setServerError(ERROR_DETAILS.GENERIC);
        break;
      default:
        console.error(error);
    }
  }

  const handleBadRequest = error => {
    if (emailIsTaken(error)) {
      props.setServerError(ERROR_DETAILS.EMAIL_IN_USE);
    } else {
      props.setServerError(ERROR_DETAILS.BAD_REQUEST);
    }
  }

  const emailIsTaken = error => {
    const emailErrors = error.details.email;
    return emailErrors && emailErrors.find(message => message === 409);
  }

  const formProps = {
    resetErrorsAndLogin: resetErrorsAndLogin,
    serverErrorHandler: handleServerError,
  }

  return(
    <div>
      <BinarySelector
        heading={"Welcome to Hyperdrive"}
        icon={ICONS.SORT.YELLOW}
        selectedOption={formToDisplay}
        option1={FORMS.REGISTER}
        option2={FORMS.SIGN_IN}
        handleClick={handleFormChange}
      />
      {
        props.serverError &&
        <Banner
          type={BANNER_TYPES.ERROR}
          icon={ICONS.CLOUD_OFF.DARK}
          content={props.serverError}
        />
      }
      { 
        formToDisplay === FORMS.SIGN_IN ?
          <SignInForm { ...formProps } /> :
          <RegistrationForm { ...formProps } />
      }
    </div>
  );
}

export default HomepageFormContainer;