import React, { useState } from 'react';
import { FIELD_TYPES, ICONS, THEMES } from "../../constants";
import { checkForNameErrors, checkForEmailErrors, checkForPasswordErrors } from '../../validators/validators';
import API from '../../adapters/API';

import TextField from './fields/TextField';
import BigButton from "../buttons/BigButton";

import useForm from '../../hooks/useForm'

const RegistrationForm = props => {

  const initialFormState = {
    name: '',
    email: '',
    password: ''
  }

  const advancedFormState = {
    name: {
      value: "",
      required: true,
      validator: checkForNameErrors
    },
    email: {
      value: "",
      required: true,
      validator: checkForEmailErrors
    },
    password: {
      value: "",
      required: true,
      validator: checkForEmailErrors
    }
  }

  const validators = {
    name: checkForNameErrors,
    email: checkForEmailErrors,
    password: checkForPasswordErrors
  }

  const submitAction = formData => {
    API.signUp(formData)
      .then(props.setTokenAndRedirect)
      .catch(props.handleHttpError);
  }

  const { formData, errors, handleInputChange, handleFormSubmission, handleBlur } = useForm({ initialFormState, validators, submitAction }) 
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
        validate={handleBlur}
      />
      <TextField
        type={FIELD_TYPES.EMAIL}
        icon={ICONS.MAIL}
        name="email"
        placeholder="Email"
        value={email}
        handleChange={handleInputChange}
        errors={errors.email}
        validate={handleBlur}
      />
      <TextField
        type={FIELD_TYPES.PASSWORD}
        icon={ICONS.KEY}
        name="password"
        placeholder="Create a password"
        value={password}
        handleChange={handleInputChange}
        errors={errors.password}
        validate={handleBlur}
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