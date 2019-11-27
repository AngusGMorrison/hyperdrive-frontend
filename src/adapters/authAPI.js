import API, { BASE_URL } from './API'

const SIGN_IN_URL = BASE_URL + '/sign-in';
const SIGN_UP_URL = BASE_URL + '/sign-up';

const signIn = loginDetails => {
  const payload = { user: loginDetails }
  return API.ajax("POST", SIGN_IN_URL, payload);
}

const signUp = newUserDetails => {
  const payload = { user: newUserDetails }
  return API.ajax("POST", SIGN_UP_URL, payload);
}

const authAPI = {
  signIn,
  signUp
}

export default authAPI;