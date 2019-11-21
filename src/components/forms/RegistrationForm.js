import React from 'react';
import { FIELD_TYPES, ICONS, THEMES } from "../../constants";
import { checkForNameErrors, checkForEmailErrors, checkForPasswordErrors } from '../../validators/validators';
import API from '../../adapters/API';

import TextField from './fields/TextField';
import BigButton from "../buttons/BigButton";

import useForm from '../../hooks/useForm'

const RegistrationForm = props => {

  const initialFormState = {
    name: {
      name: "name",
      value: "",
      required: true,
      validator: checkForNameErrors
    },
    email: {
      name: "email",
      value: "",
      required: true,
      validator: checkForEmailErrors
    },
    password: {
      name: "password",
      value: "",
      required: true,
      validator: checkForPasswordErrors
    }
  }

  const submitAction = formData => {
    API.signUp(formData)
      .then(props.setTokenAndRedirect)
      .catch(props.handleHttpError);
  }

  const { formFields, errors, handleInputChange, handleFormSubmission } = useForm({ initialFormState, submitAction });
  const { email, password, name } = formFields;

  return(
    <form className="registration" onSubmit={handleFormSubmission}>
      <TextField
        name={name.name}
        type={FIELD_TYPES.TEXT}
        icon={ICONS.ACCOUNT_CIRCLE}    
        placeholder="Name"
        value={name.value}
        handleChange={handleInputChange}
        errors={errors.name}
      />
      <TextField
        name={email.name}
        type={FIELD_TYPES.EMAIL}
        icon={ICONS.MAIL}
        placeholder="Email"
        value={email.value}
        handleChange={handleInputChange}
        errors={errors.email}
      />
      <TextField
        name={password.name}
        type={FIELD_TYPES.PASSWORD}
        icon={ICONS.KEY}
        placeholder="Create a password"
        value={password.value}
        handleChange={handleInputChange}
        errors={errors.password}
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