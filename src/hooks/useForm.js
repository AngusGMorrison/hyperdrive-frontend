import { useState } from 'react';
import { ERROR_MESSAGES } from '../validators/validators';

const useForm = ({ initialFormState = {}, submitAction = formFields => {} } = {}) => {
  
  const [formFields, setFormFields] = useState(initialFormState);

  const initialErrors = Object.keys(initialFormState).reduce((errors, key) => {
    return {...errors, [key]: null}
  }, {});
  
  const [errors, setErrors] = useState(initialErrors);
  const resetErrors = () => setErrors(initialErrors);

  const handleInputChange = event => {
    event.persist();
    updateFieldValue(event);
    validateField(event);
  }

  const updateFieldValue = event => {
    setFormFields({
      ...formFields,
      [event.target.name]: {
        ...formFields[event.target.name],
        value: event.target.value
      }
    });
  }

  const validateField = event => {
    const field = event.target;
    if (requiredFieldIsEmpty(field)) {
      setEmptyFieldError(field);
    } else if (fieldHasValidator(field)) {
      setFieldValidatorError(field);
    } else {
      clearErrors(field);
    }
  }
  
  const requiredFieldIsEmpty = field => {
    return formFields[field.name].required && !field.value;
  }

  const setEmptyFieldError = field => {
    setErrors({
      ...errors,
      [field.name]: getRequiredFieldErrorMessage(field)
    });
  }

  const setAllEmptyFieldErrors = emptyFields => {
    const emptyFieldErrors = emptyFields.reduce((errors, field) => {
      return { 
        ...errors,
        [field.name]: getRequiredFieldErrorMessage(field)
      }
    }, {});
    setErrors({
      ...errors,
      ...emptyFieldErrors
    })
  }

  const getRequiredFieldErrorMessage = field => {
    return capitalizeFieldName(field.name) + ERROR_MESSAGES.required
  }

  const capitalizeFieldName = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  const fieldHasValidator = field => {
    return formFields[field.name].validator;
  }

  const setFieldValidatorError = field => {
    const validator = formFields[field.name].validator;
    setErrors({
      ...errors,
      [field.name]: validator(field.value)
    });
  }

  const clearErrors = field => {
    setErrors({
      ...errors,
      [field.name]: null
    });
  }

  const formIsInvalid = () => {
    return formHasErrors() || anyRequiredFieldIsEmpty();
  }

  const formHasErrors = () => {
    return Object.values(errors).some(value => value !== null);
  }

  const anyRequiredFieldIsEmpty = () => {
    return Object.values(formFields).find(field => {
      return requiredFieldIsEmpty(field);
    });
  }

  const handleFormSubmission = event => {
    event.preventDefault();
    if (formIsInvalid()) {
      highlightEmptyFields();
    } else {
      submitForm()
    }
  }

  const highlightEmptyFields = () => {
    const emptyFields = findEmptyFields()
    setAllEmptyFieldErrors(emptyFields);
  }

  const findEmptyFields = () => {
    return Object.values(formFields).filter(field => {
      return requiredFieldIsEmpty(field);
    });
  }

  const submitForm = () => {
    resetErrors();
    setFormFields(initialFormState);
    submitAction(getFormContent());
  }

  const getFormContent = () => {
    return Object.keys(formFields).reduce((formContent, key) => {
      return { ...formContent, [key]: formFields[key].value };
    }, {});
  }

  return { formFields, setFormFields, errors, setErrors, resetErrors, handleInputChange, handleFormSubmission };
}

export default useForm;
