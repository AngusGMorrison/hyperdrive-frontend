import { THROWABLE_STATUS_CODES } from '../constants'
import { ServerError } from '../errors/errors';

export const BASE_URL = 'http://localhost:3000';
export const TEST_URL = BASE_URL + '/test';

const ajax = (method, route, payload = null) => {
  const config = createConfig(method, payload);
  return fetch(route, config)
    .then(objectify);
}

const createConfig = (method, payload = null) => {
  const config = createBaseConfig(method);
  if (payload) { config.body = JSON.stringify(payload); }
  return config;
}

const createBaseConfig = method => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  if (localStorage.token) { config.headers["Authorization"] = localStorage.token }
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
  ajax,
  objectify,
  selectAndThrowServerError
}

export default API;