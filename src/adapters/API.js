import { ServerError } from '../errors/errors';
import ERROR_DETAILS from '../errors/error_details';

const BASE_URL = 'http://localhost:3000';
const SIGN_IN_URL = BASE_URL + '/sign-in';
const TEST_URL = 'http://localhost:3000/test';

const signIn = loginDetails => {
  const payload = { user: loginDetails }
  return post(payload, TEST_URL);
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
  signIn
}

export default API;