/* jshint indent: 2 */
const Sequelize = require('Sequelize');
const sequelize = require('../configuration/sequelizeConfiguration');

const Account = sequelize.define('account', {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field:'account_id'
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'account_name'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  joined: {
    type: Sequelize.TIME,
    allowNull: false,
    defaultValue: sequelize.fn('now'),
    field: 'join_date'
  },
  updated: {
    type: Sequelize.TIME,
    allowNull: false,
    defaultValue: sequelize.fn('now'),
    field: 'modify_date',
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'ROLE_USER',
    field: 'account_role',
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  tableName: 'account',
  timestamps: false,
});


module.exports = Account;
