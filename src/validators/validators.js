import { REGEX } from '../constants';

export const isValidEmail = email => {
  return REGEX.EMAIL.test(email);
}

export const isValidName = name => {
  return REGEX.NAME.test(name);
}

export const ERROR_MESSAGES = {
  email: "Invalid email address",
  name: "Name must be 2-50 chars (only letters, spaces, - and ')"
}