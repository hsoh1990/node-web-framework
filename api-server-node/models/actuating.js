/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('actuating', {
    actuating_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    actuator_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'actuator',
        key: 'actuator_id'
      }
    },
    actuating_time: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    actuating_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'RUNNING'
    }
  }, {
    tableName: 'actuating'
  });
};
