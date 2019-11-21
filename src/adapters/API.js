import { ServerError } from '../errors/errors';
import { THROWABLE_STATUS_CODES } from '../constants'

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
  if (THROWABLE_STATUS_CODES.includes(response.status)) {
    throw new ServerError(response.status)
  } else {
    return response.json();
  }
}

const API = {
  signIn,
  signUp
}

export default API;