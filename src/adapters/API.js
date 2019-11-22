import { THROWABLE_STATUS_CODES } from '../constants'
import { ServerError } from '../errors/errors';

export const BASE_URL = 'http://localhost:3000';
export const TEST_URL = BASE_URL + '/test';


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
    return selectAndThrowServerError(response);
  } else {
    return response.json();
  }
}

const selectAndThrowServerError = response => {
  if (response.status === 400) {
    return response.json()
      .then(data => {
        throw new ServerError(response.status, data.errors)
      })
  } else {
    throw new ServerError(response.status)
  }
}

const API = {
  post
}

export default API;