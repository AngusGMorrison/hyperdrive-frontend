import { REGEX } from '../constants';

export const checkForNameErrors = name => {
  if (REGEX.NAME.test(name)) {
    return null;
  } else {
    return ERROR_MESSAGES.name;
  };
}

export const checkForEmailErrors = email => {
  if (REGEX.EMAIL.test(email)) {
    return null;
  } else {
    return ERROR_MESSAGES.email;
  }
}

export const checkForPasswordErrors = password => {
  if (REGEX.PASSWORD.test(password)) {
    return null;
  } else {
    return ERROR_MESSAGES.password;
  };
}

export const checkForFolderNameErrors = folderName => {
  if (REGEX.FOLDER_NAME.test(folderName)) {
    return null;
  } else {
    return ERROR_MESSAGES.folderName;
  }
}

export const ERROR_MESSAGES = {
  required: " is required",
  email: "Invalid email address",
  name: "Name must be 2-50 chars (only letters, spaces, - and ')",
  password: "Needs min. 8 chars: 1 number, 1 upper, 1 lower, 1 special",
  folderName: "Must be 1-50 chars (only letters, numbers, spaces, - and _)"
}