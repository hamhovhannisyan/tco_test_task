/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    const Account = sequelize.define('Account', {
      id: {
        type: DataTypes.STRING(32),
        allowNull: false,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.INTEGER(16),
        allowNull: false
      }
    }, {
      tableName: 'accounts',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
    Account.associate = (models) => {
      models.Account.hasMany(models.Transaction, {foreignKey: 'account_id', as: 'transactions'})
    }
    return Account
  };
  