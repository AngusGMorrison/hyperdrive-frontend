import React, { useState } from 'react';
import { FIELD_TYPES, ICONS, THEMES } from "../../constants";
import { isValidEmail, isValidName, ERROR_MESSAGES } from '../../validators/validators';
import API from '../../adapters/API';

import TextField from './fields/TextField';
import BigButton from "../buttons/BigButton";

const RegistrationForm = props => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: false, email: false, password: false });

  const handleSubmit = event => {
    //Validate non-empty fields
    event.preventDefault();
    props.resetErrors();
    API.signUp({name, email, password})
      .then(props.setTokenAndRedirect)
      .catch(props.handleHttpError);
  }

  const validateName = () => {
    if (isValidName(name)) {
      setErrors({ ...errors, name: false});
    } else {
      setErrors({ ...errors, name: ERROR_MESSAGES.name })
    }
  }

  const validateEmail = () => {
    if (isValidEmail(email)) {
      setErrors({ ...errors, email: false });
    } else {
      setErrors({ ...errors, email: ERROR_MESSAGES.email });
    }
  }

  return(
    <form className="registration" onSubmit={handleSubmit}>
      <TextField
        type={FIELD_TYPES.TEXT}
        icon={ICONS.ACCOUNT_CIRCLE}
        placeholder="Name"
        value={name}
        handleChange={setName}
        errors={errors.name}
        validate={validateName}
      />
      <TextField
        type={FIELD_TYPES.EMAIL}
        icon={ICONS.MAIL}
        placeholder="Email"
        value={email}
        handleChange={setEmail}
        errors={errors.email}
        validate={validateEmail}
      />
      <TextField
        type={FIELD_TYPES.PASSWORD}
        icon={ICONS.KEY}
        placeholder="Create a password"
        value={password}
        handleChange={setPassword}
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