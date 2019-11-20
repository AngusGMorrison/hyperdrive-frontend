import { ServerError } from '../errors/errors';
import ERROR_DETAILS from '../errors/error_details';

const BASE_URL = 'http://localhost:3000';
const SIGN_IN_URL = BASE_URL + '/sign-in';
const SIGN_UP_URL = BASE_URL + '/sign-up';
const TEST_URL = 'http://localhost:3000/test';

const signIn = loginDetails => {
  const payload = { user: loginDetails }
  return post(payload, SIGN_IN_URL);
}

const signUp = newUserDetails => {
  const payload = { user: newUserDetails }
  return post(payload, SIGN_UP_URL);
}

const post = (payload, route) => {
  const config = createConfig("POST", payload);
  return fetch(route, config)
    .then(objectify);
}

const createConfig = (method, payload) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  if (localStorage.token) { config.headers["Authorization"] = localStorage.token }
  if (payload) { config.body = JSON.stringify(payload); }
  return config;
}

const objectify = response => {
  if (response.status === 500 || response.status === 404) {
    throw new ServerError(ERROR_DETAILS.GENERIC)
  } else {
    return response.json();
  }
}

const API = {
  signIn,
  signUp
}

export default API;