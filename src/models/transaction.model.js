/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.INTEGER(16),
      allowNull: false,
      references: {
        model: sequelize.models.Account,
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER(16),
      allowNull: false
    }
  }, {
    tableName: 'transactions',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Transaction.associate = (models) => {
    models.Transaction.belongsTo(models.Account, {as: 'account', foreignKey: 'account_id'})
  }
  return Transaction
};
