const Sequelize = require('Sequelize');

const sequelize = new Sequelize('nrf_api_dev', 'nrf_dev', 'dblab321', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
