'use strict';

class AccountDuplicatedException extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccountDuplicatedException';
    this.errors = [{
      message: message +' already exist',
      type: 'unique violation',
      value: message
    }];
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AccountDuplicatedException;