import { useState } from 'react'

const useForm = ({ initialFormState = {}, validators = {}, submitAction = formData => {} } = {}) => {
  
  const [formData, setFormData] = useState(initialFormState);

  const initialErrors = Object.keys(validators).reduce((errors, key) => ({...errors, [key]: false}), {})
  const [errors, setErrors] = useState(initialErrors);
  const resetErrors = () => setErrors(initialErrors)

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleBlur = event => {
    const field = event.target;
    const validator = validators[field.name];
    setErrors({
      ...errors,
      [field.name]: validator(field.value)
    });
  }

  const formIsInvalid = () => {
    return(
      Object.values(errors).some(value => value !== null) &&
      Object.values(formData).some(value => value === "")
    )
  }

  const handleFormSubmission = event => {
    event.preventDefault();
    if (formIsInvalid) return;
    resetErrors();
    submitAction(formData)
    setFormData(initialFormState)
  }

  return { formData, errors, setErrors, handleInputChange, handleFormSubmission, handleBlur }
}

export default useForm
