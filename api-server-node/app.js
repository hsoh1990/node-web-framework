'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const accountRouter = require('./src/account/AccountRouter');

app.use(morgan('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/accounts', accountRouter);

app.listen(8001,  () => {

});

module.exports = app;