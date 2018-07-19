/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('model', {
    model_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    model_name: {
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
    model_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'model_type',
        key: 'model_type_id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'model'
  });
};
