import { useState } from 'react';

const useForm = ({ initialFormState = {}, submitAction = formData => {} } = {}) => {
  
  const [formFields, setFormFields] = useState(initialFormState);

  const initialErrors = Object.keys(initialFormState).reduce((errors, key) => {
    return {...errors, [key]: false}
  }, {});
  
  const [errors, setErrors] = useState(initialErrors);
  const resetErrors = () => setErrors(initialErrors);

  const handleInputChange = event => {
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
    const validator = formFields[field.name].validator;
    setErrors({
      ...errors,
      [field.name]: validator(field.value)
    });
  }

  const formIsInvalid = () => {
    return formHasErrors() && requiredFieldsAreEmpty();
  }

  const formHasErrors = () => {
    return Object.values(errors).some(value => value !== null);
  }

  const requiredFieldsAreEmpty = () => {
    Object.values(formFields).find(field => {
      return field.value === "" && field.required
    });
  }

  const handleFormSubmission = event => {
    event.preventDefault();
    if (formIsInvalid) return;
    resetErrors();
    submitAction(getFormContent());
    setFormFields(initialFormState);
  }

  const getFormContent = () => {
    Object.keys(formFields).reduce((formContent, key) => {
      return { ...formContent, [key]: formFields[key].value };
    }, {});
  }

  return { formFields, errors, setErrors, handleInputChange, validateField, handleFormSubmission };
}

export default useForm;
