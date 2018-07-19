/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_group', {
    account_group_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'account',
        key: 'account_id'
      },
      unique: true
    },
    group_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'groups',
        key: 'group_id'
      }
    },
    group_role: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'account_group'
  });
};
