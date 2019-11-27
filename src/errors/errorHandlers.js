import { ServerError } from './errors';

const handleHttpErrors = (error, serverErrorHandler) => {
  if (error instanceof ServerError) {
    serverErrorHandler(error);
  } else {
    console.error(error);
  }
}

const ERROR_HANDLERS = {
  handleHttpErrors
}

export default ERROR_HANDLERS;