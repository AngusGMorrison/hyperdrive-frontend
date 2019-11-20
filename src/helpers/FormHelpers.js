import { ServerError } from "../errors/errors";

const setTokenAndRedirect = (data, errorCallback, loginCallback) => {
  if (data.errors) {
    errorCallback(data.errors);
  } else {
    localStorage.setItem('token', data.token);
    loginCallback(true);
  }
}

const handleHttpError = (error, callback) => {
  if (error instanceof ServerError) {
    callback(error.details);
  } else {
    console.error(error);
  }
}

const FORM_HELPERS = {
  setTokenAndRedirect,
  handleHttpError
}

export default FORM_HELPERS;