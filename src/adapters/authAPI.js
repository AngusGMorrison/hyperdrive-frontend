import API, { BASE_URL } from './API'

const SIGN_IN_URL = BASE_URL + '/sign-in';
const SIGN_UP_URL = BASE_URL + '/sign-up';

const signIn = loginDetails => {
  const payload = { user: loginDetails }
  return API.post(payload, SIGN_IN_URL);
}

const signUp = newUserDetails => {
  const payload = { user: newUserDetails }
  return API.post(payload, SIGN_UP_URL);
}

const authAPI = {
  signIn,
  signUp
}

export default authAPI;