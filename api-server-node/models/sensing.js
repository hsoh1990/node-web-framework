/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sensing', {
    sensing_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sensor_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'sensor',
        key: 'sensor_id'
      }
    },
    sensing_time: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    sensing_value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'sensing'
  });
};
