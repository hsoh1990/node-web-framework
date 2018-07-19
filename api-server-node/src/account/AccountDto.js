'use strict';


class AccountDto {
  constructor() {
    this.id;
    this.username;
    this.name;
    this.password;
    this.email;
    this.joined;
    this.updated;
    this.role;
    this.description;
  }


  register(jsonObj) {
    this.username =jsonObj.username ;
    this.name = jsonObj.name;
    this.password = jsonObj.password;
    this.email = jsonObj.email;
    this.role = jsonObj.role;
    this.description = jsonObj.description;
  }


  response(jsonObj) {
    this.id = jsonObj.id;
    this.username = jsonObj.username;
    this.name = jsonObj.name;
    this.email = jsonObj.email;
    this.address = jsonObj.address;
    this.role = jsonObj.role;
    this.description = jsonObj.description;
  }


  signIn(jsonObj) {
    this.username = jsonObj.username;
    this.password = jsonObj.password;
  }


  update(jsonObj) {
    this.name = jsonObj.name;
    this.password = jsonObj.password;
    this.email = jsonObj.email;
    this.description = jsonObj.description;
  }
}

module.exports = AccountDto;