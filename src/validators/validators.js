import { REGEX } from '../constants';

export const isValidEmail = email => {
  return REGEX.EMAIL.test(email);
}

export const isValidName = name => {
  return REGEX.NAME.test(name);
}

export const isValidPassword = password => {
  return REGEX.PASSWORD.test(password);
}

export const ERROR_MESSAGES = {
  email: "Invalid email address",
  name: "Name must be 2-50 chars (only letters, spaces, - and ')",
  password: "Needs min. 8 chars: 1 number, 1 upper, 1 lower, 1 special"
}