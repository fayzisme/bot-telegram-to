'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {});
  customers.associate = function(models) {
    customers.hasMany(models.orders, {
      foreignKey: 'user_id',
			onDelete: 'CASCADE'
    })
  };
  return customers;
};