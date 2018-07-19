/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('actuator', {
    actuator_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    actuator_serial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    actuator_name: {
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
    model_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'model',
        key: 'model_id'
      }
    },
    device_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'device',
        key: 'device_id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'actuator'
  });
};
