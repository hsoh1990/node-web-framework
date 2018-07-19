/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('device', {
    device_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    device_serial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    device_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    device_type: {
      type: DataTypes.STRING,
      allowNull: false
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
    battery: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '100'
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
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
    cnc_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'cnc',
        key: 'cnc_id'
      }
    },
    protocol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sleep: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'device'
  });
};
