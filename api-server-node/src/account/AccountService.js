'use strict';
const AccountRepository = require('./AccountRepository');
const accountRepository = new AccountRepository();
const AccountDuplicatedException = require('./exception/AccountDuplicatedException');
const AccountNotFoundException = require('./exception/AccountNotFoundException');
const AccountBadCredentialsExceptionException = require('./exception/AccountBadCredentialsExceptionException')

class AccountService {
  constructor() {

  }


  register(accountDto) {
    return this.checkDuplicateUsername(accountDto)
      .then(this.checkDuplicateEmail)
      .then(accountRepository.register)
      .catch(err => {
        throw err;
      });
  }

  readAccounts() {
    return accountRepository.readAccounts()
      .catch(err => {
        throw err;
      });
  }

  readAccount(id) {
    return accountRepository.readAccount(id)
      .then(account => {
        if (!account) {
          throw new AccountNotFoundException(id);
        }
        return account;
      })
      .catch(err => {
        throw err;
      });
  }


  update(id, accountDto) {
    return this.checkHasAccount(id, accountDto)
      .then(() => {
        return accountRepository.update(id, accountDto);
      })
      .then(account => {
        return account;
      })
      .catch(err => {
        throw err;
      });
  }


  signIn(accountDto) {
    return accountRepository.findByUsername(accountDto.username)
      .then(account => {
        let accountJson = JSON.parse(JSON.stringify(account))[0];

        if (!accountJson) {
          throw new AccountNotFoundException(accountDto.username);
        }

        if (accountJson.password === accountDto.password) {
          return accountJson;
        } else {
          throw new AccountBadCredentialsExceptionException(accountDto.username);
        }
      })
      .catch(err => {
        throw err;
      });
  }


  remove(id) {
    return accountRepository.remove(id)
      .then(() => {
      })
      .catch(err => {
        throw err;
      });

  }


  checkHasAccount(id, accountDto) {
    return accountRepository.readAccount(id)
      .then(account => {
        if (!account) {
          throw new AccountNotFoundException(id);
        }
        return accountDto;
      })
      .catch(err => {
        throw err;
      });
  }


  checkDuplicateUsername(accountDto) {
    return accountRepository.findByUsername(accountDto.username)
      .then(account => {
        let accountCheck = JSON.parse(JSON.stringify(account))[0];
        if (accountCheck) {
          throw new AccountDuplicatedException(accountCheck.username);
        }
        return accountDto;
      });
  }


  checkDuplicateEmail(accountDto) {
    return accountRepository.findByEmail(accountDto.email)
      .then(account => {
        let accountCheck = JSON.parse(JSON.stringify(account))[0];
        if (accountCheck) {
          throw new AccountDuplicatedException(accountCheck.email);
        }
        return accountDto;
      });
  }
}

module.exports = AccountService;