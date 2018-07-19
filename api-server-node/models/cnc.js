/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cnc', {
    cnc_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cnc_serial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    cnc_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'INSTALL'
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    join_date: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    modify_date: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    group_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'cnc'
  });
};
