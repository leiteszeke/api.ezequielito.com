import { ApolloError } from 'apollo-server-express';
import { AxiosError } from 'axios';

export class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_FOUND');

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

export class UserNotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'USER_NOT_FOUND');

    Object.defineProperty(this, 'name', { value: 'UserNotFoundError' });
  }
}

export class UserCredentialsError extends ApolloError {
  constructor(message: string) {
    super(message, 'INVALID_CREDENTIALS');

    Object.defineProperty(this, 'name', { value: 'UserCredentialsError' });
  }
}

export class TooManyAttempsError extends ApolloError {
  constructor(message: string) {
    super(message, 'TOO_MANY_ATTEMPS');

    Object.defineProperty(this, 'name', { value: 'TooManyAttempsError' });
  }
}

export class ExistentUserError extends ApolloError {
  constructor(message: string) {
    super(message, 'EMAIL_ALREADY_EXISTS');

    Object.defineProperty(this, 'name', { value: 'ExistentUserError' });
  }
}

export class BadRequestError extends ApolloError {
  constructor(message: string) {
    super(message, 'BAD_REQUEST');

    Object.defineProperty(this, 'name', { value: 'BadRequestError' });
  }
}

export class BadRequestWithDataError extends ApolloError {
  constructor(message: string, data: unknown) {
    super(message, 'BAD_REQUEST', {
      data,
    });

    Object.defineProperty(this, 'name', {
      value: 'BadRequestWithDataError',
    });
  }
}

export class InvalidFileError extends ApolloError {
  constructor(message: string) {
    super(message, 'INVALID_FILE');

    Object.defineProperty(this, 'name', { value: 'InvalidFileError' });
  }
}

export class WithoutPermissionsError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_ALLOWED');

    Object.defineProperty(this, 'name', { value: 'NotPermissionError' });
  }
}

export const errorMessage = (error: unknown) => ({
  errorMessage: (error as Error).message,
});

export const errorData = (error: unknown) => ({
  errorData: (
    error as AxiosError<{ code: string; message: string } | undefined>
  )?.response?.data,
});

export const errorRequest = (e: unknown) => {
  const err = e as AxiosError;

  return {
    errorRequest: {
      method: err.config?.method,
      baseURL: err.config?.baseURL,
      url: err.config?.url,
      data: err.config?.data ? JSON.parse(err.config.data) : null,
      code: err.code,
      status: err.response?.status,
      statusText: err.response?.statusText,
    },
  };
};

export const mergedErrors = (e: unknown) => ({
  ...errorMessage(e),
  ...errorData(e),
  ...errorRequest(e),
});
