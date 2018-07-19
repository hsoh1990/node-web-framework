'use strict';

const express = require('express');
const router = express.Router();
const AccountController = require('./AccountController');
const accountController = new AccountController;


router.post('/',accountController.register);


router.get('/', accountController.readAccounts);


router.get('/:id', accountController.readAccount);


router.put('/signIn', accountController.signIn);


router.put('/:id', accountController.update);


router.delete('/:id', accountController.remove);


module.exports = router;