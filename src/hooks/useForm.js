import { useState } from 'react'

const useForm = ({ initialFormState = {}, validators = {}, submitAction = formData => {} } = {}) => {
  const initialErrors = Object.keys(validators).reduce((errors, key) => ({...errors, [key]: false}), {})
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);

  const resetErrors = () => setErrors(initialErrors)

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const checkForErrors = () => {
    const errors = {}

    for (const [key, validator] of Object.entries(validators)) {
      errors[key] = validator(formData[key])
    }

    setErrors(errors)
  }

  const formIsInvalid = Object.values(errors).some(value => value !== false)

  const handleFormSubmission = event => {
    event.preventDefault();
    checkForErrors()
    if (formIsInvalid) return
    resetErrors();
    submitAction(formData)
    setFormData(initialFormState)
  }

  return { formData, errors, handleInputChange, handleFormSubmission }
}

export default useForm
