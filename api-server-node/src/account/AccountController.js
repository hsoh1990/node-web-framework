'use strict';

const AccountDto = require('./AccountDto');
const AccountService = require('./AccountService');
const accountService = new AccountService();

class AccountController {

  constructor() {
  }


  register(req, res) {

    const accountDto = new AccountDto();
    accountDto.register(req.body);

    accountService.register(accountDto)
      .then(newAccount => {
        const accountResponse = new AccountDto();
        accountResponse.response(newAccount);
        res.status(201).json(accountResponse).end();
      })

      .catch(err => {
        if (err.name === 'AccountDuplicatedException') {
          const errorResponse = {
            code: 'AccountController-E001',
            title: 'Duplicated Account Information Exception',
            message: err.errors,
          };
          res.status(400).json(errorResponse).end();
        }
        else if (err.name === 'SequelizeValidationError') {
          const errorResponse = {
            code: 'AccountController-E001',
            title: 'Not Enough Account Information Exception',
            message: err.errors,
          };
          res.status(400).json(errorResponse).end();
        }
        else {
          const errorResponse = {
            code: 'Internal Server Error',
            message: err.name
          };
          res.status(500).json(errorResponse).end();
        }
      });
  }


  readAccounts(req, res) {
    accountService.readAccounts()
      .then(accounts => {
        let accountResponseArray = [];
        accounts.forEach(function (account, i) {
          accountResponseArray[i] = new AccountDto();
          accountResponseArray[i].response(accounts[i]);
        });
        res.status(200).json(accountResponseArray).end();
      })
      .catch(err => {
        const errorResponse = {
          code: 'Internal Server Error',
          message: err.name
        };
        res.status(500).json(errorResponse).end();
      });
  }


  readAccount(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)){
      const errorResponse = {
        code: 'AccountController-E002',
        message: 'Id must be a number.'
      };
      return res.status(400).json(errorResponse).end();
    }

    accountService.readAccount(req.params.id)
      .then(account => {
        let accountResponse = new AccountDto();
        accountResponse.response(account);
        res.status(200).json(accountResponse).end();
      })
      .catch(err => {
        if (err.name === 'AccountNotFoundException') {
          const errorResponse = {
            code: 'AccountController-E002',
            title: 'Account Not Found by Id',
            message: err.errors,
          };
          res.status(404).json(errorResponse).end();
        }
        else {
          const errorResponse = {
            code: 'Internal Server Error',
            message: err.name
          };
          res.status(500).json(errorResponse).end();
        }
      });
  }


  update(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)){
      const errorResponse = {
        code: 'AccountController-E002',
        message: 'Id must be a number.'
      };
      return res.status(400).json(errorResponse).end();
    }

    const accountDto = new AccountDto();
    accountDto.update(req.body);

    accountService.update(req.params.id, accountDto)
      .then(account => {
        let accountResponse = new AccountDto();
        accountResponse.response(account);
        res.status(200).json(accountResponse).end();
      })
      .catch(err => {
        if (err.name === 'AccountNotFoundException') {
          const errorResponse = {
            code: 'AccountController-E002',
            title: 'Account Not Found by Id',
            message: err.errors,
          };
          res.status(400).json(errorResponse).end();
        }
        else {
          const errorResponse = {
            code: 'Internal Server Error',
            message: err.name
          };
          res.status(500).json(errorResponse).end();
        }
      });
  }


  signIn(req, res) {
    const accountDto = new AccountDto();
    accountDto.signIn(req.body);

    accountService.signIn(accountDto)
      .then(account => {
        let accountResponse = new AccountDto();
        accountResponse.response(account);
        res.status(200).json(accountResponse).end();
      })
      .catch(err => {
        if (err.name === 'AccountNotFoundException'
          || err.name === 'AccountBadCredentialsExceptionException') {
          const errorResponse = {
            code: 'AccountController-E002',
            title: 'Bad Request during account sign-in process.',
            message: err.errors,
          };
          res.status(400).json(errorResponse).end();
        }
        else {
          const errorResponse = {
            code: 'Internal Server Error',
            message: err.name
          };
          res.status(500).json(errorResponse).end();
        }
      });
  }


  remove(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)){
      const errorResponse = {
        code: 'AccountController-E002',
        message: 'Id must be a number.'
      };
      return res.status(400).json(errorResponse).end();
    }

    accountService.remove(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(err => {
        const errorResponse = {
          code: 'Internal Server Error',
          message: err.name
        };
        res.status(500).json(errorResponse).end();
      });
  }
}

module.exports = AccountController;