const BASE_URL = 'http://localhost:3000'
const SIGN_IN_URL = BASE_URL + '/sign-in'

const signIn = loginDetails => {
  const payload = { user: loginDetails }
  return post(payload, SIGN_IN_URL);
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
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`HTTP status code ${response.status}`);
  }
}

const API = {
  signIn
}

export default API;