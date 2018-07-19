'use strict';

class AccountNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccountNotFoundException';
    this.errors = [{
      message: message +' Not exist',
      value: message
    }];
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AccountNotFoundException;