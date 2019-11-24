import React from 'react';
import { FIELD_TYPES, ICONS, THEMES } from '../../constants';
import { checkForEmailErrors } from '../../validators/validators';
import authAPI from '../../adapters/authAPI';

import TextField from './fields/TextField';
import BigButton from '../buttons/BigButton';

import useForm from '../../hooks/useForm';

const SignInForm = props => {

  const initialFormState = {
    email: {
      name: 'email',
      value: '',
      required: true,
      validator: checkForEmailErrors
    },
    password: {
      name: 'password',
      value: '',
      required: true
    }
  }

  const submitAction = formFields => {
    authAPI.signIn(formFields)
      .then(props.setTokenAndRedirect)
      .catch(props.handleHttpErrors);
  }

  const { formFields, errors, handleInputChange, handleFormSubmission } = useForm({ initialFormState, submitAction });
  const { email, password } = formFields;

  return(
    <form className="sign-in" onSubmit={handleFormSubmission} autoComplete="off" >
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
        placeholder="Password"
        value={password.value}
        handleChange={handleInputChange}
        errors={errors.password}
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