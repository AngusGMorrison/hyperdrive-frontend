const ERROR_DETAILS = {
  GENERIC: {
    heading: "Something went wrong",
    body: "Refresh the page and try again."
  },
  INVALID_USER: {
    heading: "Invalid email or password",
    body: "Password reset is coming soon..."
  },
  BAD_REQUEST: {
    heading: "Bad request",
    body: "Your data doesn't look quite right."
  },
  EMAIL_IN_USE: {
    heading: "That email is taken",
    body: "Sign in or use another email."
  },
  FILE_NOT_FOUND: {
    heading: "File not found",
    body: "It may have been moved or deleted."
  },
  UNAUTHORIZED: {
    heading: "You don't have access to that drive",
    body: "Please sign in to view your files."
  }
}

export default ERROR_DETAILS;