'use strict';

class AccountBadCredentialsExceptionException extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccountBadCredentialsExceptionException';
    this.errors = [{
      message: message + ' Passwords do not match',
      type: 'BadCredentialsException',
      value: message
    }];
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AccountBadCredentialsExceptionException;