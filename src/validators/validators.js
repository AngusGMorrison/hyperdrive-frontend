import { REGEX } from '../constants';

export const isValidEmail = email => {
  return REGEX.EMAIL.test(email);
}

export const ERROR_MESSAGES = {
  email: "Invalid email address"
}