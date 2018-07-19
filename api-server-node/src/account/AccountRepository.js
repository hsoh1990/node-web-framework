'use strict';

const Account = require('./Account');
const AccountDto = require('./AccountDto');

class AccountRepository {

  constructor() {

  }


  register(accountDto) {
    return Account.create(accountDto)
      .then(account => {
        return account;
      })
      .catch(err => {
        throw err;
      });
  }


  readAccounts() {
    return Account.findAll()
      .then(account => {
        return account;
      })
      .catch(err => {
        throw err;
      });
  }


  readAccount(id) {
    return Account.findOne({where: {id: id}})
      .then(account => {
        return account;
      })
      .catch(err => {
        return err;
      });
  }


  update(id, accountUpDateDto) {
    return Account.update(
      {
        name: accountUpDateDto.name,
        password: accountUpDateDto.password,
        email: accountUpDateDto.email,
        description: accountUpDateDto.description
      },
      {where: {id: id}, returning: true})
      .then(account => {
        return JSON.parse(JSON.stringify(account))[1][0];
      })
      .catch(err => {
        throw err;
      });
  }


  findByUsername(username) {
    return Account.findAll({where: {username: username}})
      .then(account => {
        return account;
      })
      .catch(err => {
        throw err;
      });

  }


  findByEmail(email) {
    return Account.findAll({where: {email: email}})
      .then(account => {
        return account;
      })
      .catch(err => {
        throw err;
      });
  }

  remove(id) {
    return Account.destroy({
      where:{id: id}
    })
      .then(result =>{
        return result;
      })
      .catch(err =>{
        throw err;
      });
    
  }
}

module.exports = AccountRepository;