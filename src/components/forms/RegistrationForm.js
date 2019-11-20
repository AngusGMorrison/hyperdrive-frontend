import React, { useState } from 'react';
import { FIELD_TYPES, ICONS, THEMES } from "../../constants";
import { isValidName, isValidEmail, isValidPassword, ERROR_MESSAGES } from '../../validators/validators';
import API from '../../adapters/API';

import TextField from './fields/TextField';
import BigButton from "../buttons/BigButton";

import useForm from '../../hooks/useForm'

const initialFormState = {
  name: '',
  email: '',
  password: ''
}

const validators = { name: isValidName, email: isValidEmail, password: isValidPassword }

const RegistrationForm = props => {

  const submitAction = formData => API.signUp(formData)
    .then(props.setTokenAndRedirect)
    .catch(props.handleHttpError);


  const { formData, errors, handleInputChange, handleFormSubmission, //fieldValidators } = useForm({ initialFormState, validators, submitAction })

  console.log({ formData, errors, handleInputChange, handleFormSubmission })
  
  const {email, password, name} = formData;

  return(
    <form className="registration" onSubmit={handleFormSubmission}>
      <TextField
        type={FIELD_TYPES.TEXT}
        icon={ICONS.ACCOUNT_CIRCLE}
        name="name"
        placeholder="Name"
        value={name}
        handleChange={handleInputChange}
        errors={errors.name}
        // validate={validateName}
      />
      <TextField
        type={FIELD_TYPES.EMAIL}
        icon={ICONS.MAIL}
        name="email"
        placeholder="Email"
        value={email}
        handleChange={handleInputChange}
        errors={errors.email}
        // validate={validateEmail}
      />
      <TextField
        type={FIELD_TYPES.PASSWORD}
        icon={ICONS.KEY}
        name="password"
        placeholder="Create a password"
        value={password}
        handleChange={handleInputChange}
        errors={errors.password}
        // validate={validatePassword}
      />
      <BigButton 
        theme={THEMES.BLUE}
        icon={ICONS.THUMBS_UP.DARK}
        text={"Sign up"}
      />
    </form>
  );
}

export default RegistrationForm;